'use client';

import Link from "next/link";
import {ArrowLeft, Calendar, Loader2, Tag} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import Navbar from "@/modules/videos/Navbar";

import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import React, {useEffect, useState} from "react";
import {useScroll, useTransform} from "framer-motion";
import {BlogPost} from "@/modules/blogs/BlogPostCard";
import {marked} from "marked";

const font = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
});

const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL!;

interface Props {
    post:any;
}

type FullBlogPost = BlogPost & { content: string };

const BlogDetailView =({post}:Props) => {

    const { scrollYProgress } = useScroll();
    const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    if (!post) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />
            </div>
        );
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const htmlContent = marked(post.content);

    return (
        <div className={cn('bg-gray-900 text-white', font.className)}>
            <Navbar />

            <header className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={`${strapiApiUrl}${post.cover_image?.url}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                </div>
                <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-indigo-300 hover:text-white transition-colors mb-4 text-sm font-medium"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Blog
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
                        {post.title}
                    </h1>
                </div>
            </header>

            <article className="relative z-20 -mt-16">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage
                                    src={`${strapiApiUrl}${post.author?.avatar?.url}`}
                                    alt={post.author?.name}
                                />
                            </Avatar>
                            <div>
                                <p className="font-bold text-white">{post.author?.name}</p>
                                <p className="text-sm text-gray-400">Author</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                                <Calendar className="h-5 w-5 text-indigo-400" />
                                <div>
                                    <p className="font-medium">{formattedDate}</p>
                                    <p className="text-xs text-gray-400">Publish Date</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <Tag className="h-5 w-5 text-indigo-400" />
                                <div>
                                    <p className="font-medium">{post.category}</p>
                                    <p className="text-xs text-gray-400">Category</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-invert prose-lg max-w-none prose-h2:text-indigo-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-blockquote:border-l-indigo-400 prose-figcaption:text-center prose-figcaption:text-sm prose-figcaption:italic"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            </article>

            <footer className="mt-24 text-center pb-12">
                <Link
                    href="/blog"
                    className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-500 transition-colors"
                >
                    Explore More Articles
                </Link>
            </footer>
        </div>
    );
}

export default BlogDetailView