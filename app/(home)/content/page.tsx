'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const videos = [
    {
        id: 1,
        title: "Morning HIIT Workout",
        description: "Kickstart your day with this high-intensity interval training session led by our expert trainers.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: 2,
        title: "Yoga for Flexibility",
        description: "Join our relaxing yoga session to improve flexibility and reduce stress.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: 3,
        title: "Strength Training Basics",
        description: "Learn the fundamentals of strength training with our professional coaches.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: 4,
        title: "Cardio Blast",
        description: "Get your heart pumping with this high-energy cardio workout.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: 5,
        title: "Pilates Core Strength",
        description: "Strengthen your core with this focused Pilates session.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: 6,
        title: "Kickboxing Fundamentals",
        description: "Learn the basics of kickboxing with our expert instructors.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
];

export default function VideosPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 6;
    const totalPages = Math.ceil(videos.length / videosPerPage);

    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

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
            <div className="mt-10 mb-16 mx-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Workout Videos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {currentVideos.map((video) => (
                        <Card key={video.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="min-h-[6rem]">
                                <CardTitle className="text-xl font-semibold text-gray-800">{video.title}</CardTitle>
                                <CardDescription className="text-gray-600">{video.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <video
                                    controls
                                    className="w-full h-48 rounded-md object-cover"
                                    src={video.videoUrl}
                                    poster="https://placehold.co/600x400?text=Video+Thumbnail"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-8 gap-4">
                    <Button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-green-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Previous
                    </Button>
                    <span className="text-gray-600 font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-green-500 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next →
                    </Button>
                </div>
            </div>
        </div>
    );
}