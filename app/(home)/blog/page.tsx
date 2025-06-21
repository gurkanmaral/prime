'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Navbar from "@/modules/common/components/Navbar";
import { motion } from "framer-motion";

const blogPosts = [
    {
        id: 1,
        title: "5 Tips for Better Workouts",
        excerpt: "Maximize your gym time with these expert tips.",
        image: "https://placehold.co/600x400?text=Blog+1",
        category: "Fitness",
    },
    {
        id: 2,
        title: "Healthy Eating Guide",
        excerpt: "Learn how to fuel your body for fitness.",
        image: "https://placehold.co/600x400?text=Blog+2",
        category: "Nutrition",
    },
    {
        id: 3,
        title: "Yoga for Beginners",
        excerpt: "Start your yoga journey with these basics.",
        image: "https://placehold.co/600x400?text=Blog+3",
        category: "Yoga",
    },
    {
        id: 4,
        title: "Cardio for Heart Health",
        excerpt: "Boost your cardiovascular fitness with these tips.",
        image: "https://placehold.co/600x400?text=Blog+4",
        category: "Fitness",
    },
    {
        id: 5,
        title: "Mindful Eating Practices",
        excerpt: "Learn how to eat with intention and improve your health.",
        image: "https://placehold.co/600x400?text=Blog+5",
        category: "Nutrition",
    },
    {
        id: 6,
        title: "Advanced Yoga Poses",
        excerpt: "Take your yoga practice to the next level with these poses.",
        image: "https://placehold.co/600x400?text=Blog+6",
        category: "Yoga",
    },
    {
        id: 7,
        title: "Strength Training Myths",
        excerpt: "Debunk common myths about lifting weights.",
        image: "https://placehold.co/600x400?text=Blog+7",
        category: "Fitness",
    },
];

export default function BlogPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="w-screen min-h-screen">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-20 mb-16 mx-4 max-w-6xl mx-auto"
            >
                <div className="relative flex justify-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Fitness Tips & Blog</h1>
                    <Button
                        asChild
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-500 hover:to-teal-600"
                    >
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPosts.map((post) => (
                        <Card key={post.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-lg font-semibold text-gray-800">{post.title}</CardTitle>
                                    <Badge className="bg-teal-500 text-white">{post.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-500 hover:to-teal-600"
                                >
                                    <Link href={`/blog/${post.id}`}>Read More</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-8 gap-4">
                    <Button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Previous
                    </Button>
                    <span className="text-gray-600 font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next →
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}