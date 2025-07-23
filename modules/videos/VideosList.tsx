'use client';

import React, { useState } from 'react';
import { Loader2, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VideoPlayerModal } from "@/modules/videos/VideoPlayerModal";
import Navbar from "@/modules/videos/Navbar";
import {Poppins} from "next/font/google";
const font = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
});
interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail: { url: string };
    video_file: { url: string };
}

interface StrapiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface VideoListProps {
    initialVideos: Video[];
    initialPagination: StrapiPagination;
    strapiUrl: string;
}

const cache: { [key: string]: { data: Video[], pagination: StrapiPagination, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const videosPerPage = 6;

export function VideoList({ initialVideos, initialPagination, strapiUrl }: VideoListProps) {
    const [videos, setVideos] = useState<Video[]>(initialVideos);
    const [pagination, setPagination] = useState<StrapiPagination>(initialPagination);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(initialPagination.page + 1);
    const [hasMore, setHasMore] = useState(initialPagination.page < initialPagination.pageCount);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

    const loadMoreVideos = async () => {
        if (loading) return;

        const cacheKey = `videos-page-${page}`;
        const cached = cache[cacheKey];

        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            setVideos(prevVideos => [...prevVideos, ...cached.data]);
            setPagination(cached.pagination);
            setHasMore(cached.pagination.page < cached.pagination.pageCount);
            setPage(page + 1);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${strapiUrl}/api/videos?populate=*&pagination[page]=${page}&pagination[pageSize]=${videosPerPage}`,
                { cache: 'force-cache' }
            );
            if (!response.ok) throw new Error('Failed to fetch more videos');

            const result = await response.json();

            cache[cacheKey] = {
                data: result.data,
                pagination: result.meta.pagination,
                timestamp: Date.now(),
            };

            setVideos(prevVideos => [...prevVideos, ...result.data]);
            setPagination(result.meta.pagination);
            setHasMore(result.meta.pagination.page < result.meta.pagination.pageCount);
            setPage(page + 1);
        } catch (error) {
            console.error("Error fetching more videos from Strapi:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleWatchVideo = (videoFileUrl: string) => {
        setSelectedVideoUrl(`${strapiUrl}${videoFileUrl}`);
    };

    const handleCloseModal = () => {
        setSelectedVideoUrl(null);
    };

    return (
        <>
            <div
                className={cn("w-screen min-h-screen bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_#232526_0%,_#414345_90%)] text-white", font.className)}>
                <Navbar/>
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Workout Library</h1>
                        <p className="mt-4 text-lg leading-8 text-gray-300">Browse our collection of expert-led workout
                            videos to match your fitness goals.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[50vh]">
                        {videos.map((video) => (
                            <div key={video.id}
                                 className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-800/50 shadow-lg border border-white/10 transition-all duration-300 hover:shadow-indigo-500/20 hover:border-indigo-500/50">
                                <div className="relative overflow-hidden cursor-pointer"
                                     onClick={() => handleWatchVideo(video.video_file.url)}>
                                    {video.thumbnail?.url && (
                                        <img src={`${strapiUrl}${video.thumbnail.url}`} alt={video.title}
                                             className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"/>
                                    )}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <PlayCircle className="h-12 w-12 text-white/80"/>
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow p-6">
                                    <h2 className="text-xl font-bold text-white mb-2">{video.title}</h2>
                                    <p className="text-gray-400 text-sm flex-grow mb-4">{video.description.substring(0, 200)}</p>
                                    <Button onClick={() => handleWatchVideo(video.video_file.url)}
                                            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                                        Watch Video
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        {loading && <Loader2 className="h-8 w-8 animate-spin text-indigo-400"/>}
                        {!loading && hasMore && (
                            <Button onClick={loadMoreVideos} size="lg"
                                    className="bg-indigo-600 text-white hover:bg-indigo-500">
                                Daha Fazla Yükle
                            </Button>
                        )}
                        {!loading && !hasMore && videos.length > 0 && (
                            <p className="text-gray-400">You've reached the end!</p>
                        )}
                    </div>

                    <VideoPlayerModal videoUrl={selectedVideoUrl} onClose={handleCloseModal}/>
                </main>
            </div>
        </>
    );
}