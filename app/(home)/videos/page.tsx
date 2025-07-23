'use client';
import React, {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight, Loader2, PlayCircle} from "lucide-react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { VideoPlayerModal } from "@/modules/videos/VideoPlayerModal";
import Navbar from "@/modules/videos/Navbar";
const font = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});
interface Video {
  id: number;
    title: string;
    description: string;
    thumbnail: {
          url: string;
    };
    video_file: {
          url: string;
    };
}

interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [pagination, setPagination] = useState<StrapiPagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  const strapiApiUrl = 'http://localhost:1337';
  const videosPerPage = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
            `${strapiApiUrl}/api/videos?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${videosPerPage}`
        );

        if (!response.ok) throw new Error('Failed to fetch videos');

        const result = await response.json();
        setVideos(result.data);
        setPagination(result.meta.pagination);

      } catch (error) {
        console.error("Error fetching videos from Strapi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage, strapiApiUrl]);

  const handleWatchVideo = (videoFileUrl: string) => {
    setSelectedVideoUrl(`${strapiApiUrl}${videoFileUrl}`);
  };

  const handleCloseModal = () => {
    setSelectedVideoUrl(null);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (pagination?.pageCount || 1)) {
      setCurrentPage(page);
    }
  };

  const renderPaginationNumbers = () => {
    if (!pagination) return null;
    const pages = [];
    for (let i = 1; i <= pagination.pageCount; i++) {
      pages.push(
          <Button key={i} variant="ghost" size="icon" className={cn("h-10 w-10 rounded-full text-white hover:bg-gray-700", currentPage === i && "bg-indigo-600 hover:bg-indigo-500")} onClick={() => handlePageChange(i)}>
            {i}
          </Button>
      );
    }
    return pages;
  };


  return (
      <div className={cn("w-screen min-h-screen bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_#232526_0%,_#414345_90%)] text-white", font.className)}>
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">Workout Library</h1>
            <p className="mt-4 text-lg leading-8 text-gray-300">Browse our collection of expert-led workout videos to match your fitness goals.</p>
          </div>

          {loading ? (
              <div className="flex justify-center items-center h-96">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />
              </div>
          ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[50vh]">
                  {videos.map((video) => (
                      <div key={video.id} className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-800/50 shadow-lg border border-white/10 transition-all duration-300 hover:shadow-indigo-500/20 hover:border-indigo-500/50">
                        <div className="relative overflow-hidden cursor-pointer" onClick={() => handleWatchVideo(video.video_file.url)}>
                          {video.thumbnail?.url && (
                              <img src={`${strapiApiUrl}${video.thumbnail.url}`} alt={video.title} className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <PlayCircle className="h-12 w-12 text-white/80" />
                          </div>
                        </div>
                        <div className="flex flex-col flex-grow p-6">
                          <h2 className="text-xl font-bold text-white mb-2">{video.title}</h2>
                          <p className="text-gray-400 text-sm flex-grow mb-4">{video.description.substring(0, 200)}</p>
                          <Button onClick={() => handleWatchVideo(video.video_file.url)} className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                            Watch Video
                          </Button>
                        </div>
                      </div>
                  ))}
                </div>

                {pagination && pagination.pageCount > 1 && (
                    <div className="flex justify-center items-center mt-16 space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="h-10 w-10 rounded-full bg-gray-800/50 border-white/20 text-white hover:bg-gray-700 disabled:opacity-50">
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      {renderPaginationNumbers()}
                      <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pagination.pageCount} className="h-10 w-10 rounded-full bg-gray-800/50 border-white/20 text-white hover:bg-gray-700 disabled:opacity-50">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                )}
              </>
          )}
        </main>

        <VideoPlayerModal videoUrl={selectedVideoUrl} onClose={handleCloseModal} />
      </div>
  );
}
