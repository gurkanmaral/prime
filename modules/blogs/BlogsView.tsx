'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BlogPost, BlogPostCard } from "@/modules/blogs/BlogPostCard";
import {cn} from "@/lib/utils";
import Navbar from "@/modules/videos/Navbar";
import {Poppins} from "next/font/google";


const font = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
});

interface StrapiPagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface BlogListProps {
    initialPosts: BlogPost[];
    initialPagination: StrapiPagination;
    strapiUrl: string;
}

const cache: { [key: string]: { data: BlogPost[], pagination: StrapiPagination, timestamp: number } } = {};
const CACHE_DURATION = 5 * 60 * 1000;

export function BlogList({ initialPosts, initialPagination, strapiUrl }: BlogListProps) {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [pagination, setPagination] = useState<StrapiPagination>(initialPagination);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(initialPagination.page + 1);
    const [hasMore, setHasMore] = useState(initialPagination.page < initialPagination.pageCount);
    const postsPerPage = 6;

    const loadMorePosts = async () => {
        if (loading) return;

        const cacheKey = `posts-page-${page}`;
        const cached = cache[cacheKey];

        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            setPosts(prevPosts => [...prevPosts, ...cached.data]);
            setPagination(cached.pagination);
            setHasMore(cached.pagination.page < cached.pagination.pageCount);
            setPage(page + 1);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${strapiUrl}/api/blogs?populate[author][populate]=avatar&populate=cover_image&pagination[page]=${page}&pagination[pageSize]=${postsPerPage}&sort=publishedAt:desc`,
                { cache: 'force-cache' }
            );
            if (!response.ok) throw new Error('Failed to fetch more posts');

            const result = await response.json();

            cache[cacheKey] = {
                data: result.data,
                pagination: result.meta.pagination,
                timestamp: Date.now(),
            };

            setPosts(prevPosts => [...prevPosts, ...result.data]);
            setPagination(result.meta.pagination);
            setHasMore(result.meta.pagination.page < result.meta.pagination.pageCount);
            setPage(page + 1);
        } catch (error) {
            console.error("Error fetching more posts from Strapi:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className={cn("w-screen min-h-screen bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_#232526_0%,_#414345_90%)] text-white", font.className)}>
                <Navbar/>
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <motion.h1 initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}}
                                   transition={{duration: 0.5}}
                                   className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                            Bloglarımız
                        </motion.h1>
                        <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.2}}
                                  className="mt-4 text-lg leading-8 text-gray-300">
                            Stay updated with the latest trends in fitness, nutrition, and wellness from our expert
                            trainers.
                        </motion.p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.div key={post.id} initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
                                        transition={{duration: 0.5, delay: (index % 6) * 0.1}}>
                                <BlogPostCard post={post} strapiUrl={strapiUrl}/>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center">
                        {loading && <Loader2 className="h-8 w-8 animate-spin text-indigo-400"/>}
                        {!loading && hasMore && (
                            <Button onClick={loadMorePosts} size="lg"
                                    className="bg-indigo-600 text-white hover:bg-indigo-500">
                                Daha Fazla Yükle
                            </Button>
                        )}
                        {!loading && !hasMore && posts.length > 0 && (
                            <p className="text-gray-400"></p>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}