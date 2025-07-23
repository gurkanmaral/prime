
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    cover_image: {
        url: string;
    };
    category: string;
}

interface BlogGridProps {
    strapiUrl: string;
}
const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL!;
export const BlogPreview = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${strapiApiUrl}/api/blogs?populate=cover_image&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=3`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch blog posts');
                }

                const data = await response.json();
                setPosts(data.data || []);
            } catch (error) {
                console.error("Error fetching latest posts:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center mt-16">
                <p className="text-gray-400">No blog posts found.</p>
            </div>
        )
    }

    return (
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post, index) => (
                <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 transition-all duration-300 hover:scale-105"
                >
                    <img src={`${strapiApiUrl}${post.cover_image.url}`} alt={post.title} className="absolute inset-0 -z-10 h-full w-full object-cover" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
                    <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                    <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                        <span className="inline-flex items-center rounded-md bg-gray-50/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
                            {post.category}
                        </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                        <Link href={`/blog/${post.slug}`}>
                            <span className="absolute inset-0" />
                            {post.title}
                        </Link>
                    </h3>
                </motion.article>
            ))}
        </div>
    );
};