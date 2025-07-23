'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  cover_image: { url: string } | null;
  author: { name: string; avatar: { url: string } | null };
  publishedAt: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  strapiUrl: string;
}

export const BlogPostCard = ({ post, strapiUrl }: BlogPostCardProps) => {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article
      className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 transition-all duration-300 hover:scale-105"
    >
      {post.cover_image ? (
        <img
          src={`${strapiUrl}${post.cover_image.url}`}
          alt={post.title}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 -z-10 h-full w-full bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400">Resim yok</span>
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
        <div className="flex items-center gap-x-4">
          <span className="inline-flex items-center rounded-md bg-gray-50/10 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">
            {post.category.toUpperCase()}
          </span>
        </div>
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
        <Link href={`/blog/${post.slug}`}>
          <span className="absolute inset-0" />
          {post.title}
        </Link>
      </h3>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {post.author.avatar && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={`${strapiUrl}${post.author.avatar.url}`} alt={post.author.name} />
            </Avatar>
          )}
          <div>
            <p className="text-sm font-semibold text-white">{post.author.name}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="p-2 rounded-full bg-gray-700/50 group-hover:bg-indigo-600 transition-colors"
        >
          <ArrowUpRight className="h-5 w-5 text-white" />
        </Link>
      </div>
    </article>
  );
};