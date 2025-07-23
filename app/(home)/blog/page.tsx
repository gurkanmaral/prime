'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Poppins } from 'next/font/google';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BlogPostCard, BlogPost } from "@/modules/blogs/BlogPostCard";
import Navbar from "@/modules/videos/Navbar";

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

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [pagination, setPagination] = useState<StrapiPagination | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    console.log(pagination)
    const strapiApiUrl = 'http://localhost:1337';
    const postsPerPage = 6;

    const fetchPosts = async (pageNum: number) => {
        setLoading(true);
        try {
            const response = await fetch(
                `${strapiApiUrl}/api/blogs?populate[author][populate]=avatar&populate=cover_image&pagination[page]=${pageNum}&pagination[pageSize]=${postsPerPage}&sort=publishedAt:desc`
            );
            if (!response.ok) throw new Error('Failed to fetch posts');

            const result = await response.json();

            if (pageNum === 1) {
                setPosts(result.data);
            } else {
                setPosts(prevPosts => [...prevPosts, ...result.data]);
            }

            setPagination(result.meta.pagination);

            if (result.meta.pagination.page >= result.meta.pagination.pageCount) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching posts from Strapi:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(1);
    }, []);

    const loadMorePosts = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
    };

    return (
        <div className={cn("w-screen min-h-screen bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_#232526_0%,_#414345_90%)] text-white", font.className)}>
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        Our Blog & Insights
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-lg leading-8 text-gray-300">
                        Stay updated with the latest trends in fitness, nutrition, and wellness from our expert trainers.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}>
                            <BlogPostCard post={post} strapiUrl={strapiApiUrl}/>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    {loading && <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />}
                    {!loading && hasMore && (
                        <Button onClick={loadMorePosts} size="lg" className="bg-indigo-600 text-white hover:bg-indigo-500">
                            Daha Fazla Yükle
                        </Button>
                    )}
                    {!hasMore && posts.length > 0 && (
                        <p className="text-gray-400"></p>
                    )}
                </div>
            </main>
        </div>
    );
}