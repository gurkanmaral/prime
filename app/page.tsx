'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/modules/common/components/Navbar";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { HeroSection } from "@/modules/home/components/HeroSection";
import { Trainers } from "@/modules/home/components/Trainers";
import { BlogPreview } from "@/modules/home/components/Blog";
import { CTABanner } from "@/modules/home/components/CTABanner";
import {Testimonials} from "@/modules/home/components/TestiMonials";

const videos = [
    { id: 1, title: "Morning HIIT Workout", description: "Kickstart your day with this high-intensity interval training session.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 2, title: "Yoga for Flexibility", description: "Join our relaxing yoga session to improve flexibility and reduce stress.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 3, title: "Strength Training Basics", description: "Learn the fundamentals of strength training with our professional coaches.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 4, title: "Cardio Blast", description: "Burn calories with this high-energy cardio workout.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 5, title: "Pilates Core Strength", description: "Strengthen your core with this Pilates session.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export default function Home() {
    return (
        <div className="w-screen min-h-screen bg-gray-100">
            <div className="grid grid-cols-12">
                <Navbar />
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-20 mx-4">
                <HeroSection />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} id="aboutUs" className="mt-8 mb-10 mx-4 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Hakkımızda</h1>
                <p className="text-gray-600 leading-relaxed mb-4">Firmamız, 2010 yılında kurulmuş olup, sağlıklı yaşam ve spor kültürünü yaygınlaştırmayı amaçlamaktadır...</p>
                <p className="text-gray-600 leading-relaxed mb-4">Salonumuzda hem bireysel antrenman alanları hem de grup dersleri mevcut...</p>
                <p className="text-gray-600 leading-relaxed">Amacımız, sadece fiziksel değil zihinsel olarak da güçlü bireyler yetiştirmek...</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} id="testimonials" className="mt-12 mb-16 mx-4">
                <Testimonials />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }} id="trainers" className="mt-12 mb-16 mx-4">
                <Trainers />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }} id="ourContent" className="mt-12 mb-16 mx-4">
                <div className="relative flex justify-center max-w-6xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Our Workout Videos</h1>
                    <Button asChild className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700 text-gray-100 hover:bg-gray-600">
                        <Link href="/content">Daha Fazla</Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {videos.map((video) => (
                        <Card key={video.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50">
                            <CardHeader className="min-h-[6rem]">
                                <CardTitle className="text-xl font-semibold text-gray-800">{video.title}</CardTitle>
                                <CardDescription className="text-gray-500">{video.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <video controls className="w-full h-48 rounded-md object-cover" src={video.videoUrl} poster="https://placehold.co/600x400?text=Video+Thumbnail">
                                    Your browser does not support the video tag.
                                </video>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.4 }} id="blog" className="mt-12 mb-16 mx-4">
                <BlogPreview />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.6 }} id="contactUs" className="mt-12 mb-16 mx-4">
                <div className="bg-gradient-to-br from-gray-800 via-black to-gray-900 p-12 rounded-lg text-gray-100 shadow-lg max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center">İletişim</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <div className="w-full max-w-xs">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-auto">
                                    <circle cx="100" cy="100" r="100" fill="#2d2d2d" />
                                </svg>
                            </div>
                        </div>
                        <form className="space-y-6">
                            <div>
                                <Label htmlFor="name" className="block mb-1 text-gray-100 font-semibold">Ad Soyad</Label>
                                <Input id="name" type="text" placeholder="Adınızı ve soyadınızı girin" className="mt-1 w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:border-gray-400 focus:ring-gray-400" required />
                            </div>
                            <div>
                                <Label htmlFor="email" className="block mb-1 text-gray-100 font-semibold">E-posta</Label>
                                <Input id="email" type="email" placeholder="E-posta adresinizi girin" className="mt-1 w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:border-gray-400 focus:ring-gray-400" required />
                            </div>
                            <div>
                                <Label htmlFor="message" className="block mb-1 text-gray-100 font-semibold">Mesaj</Label>
                                <Textarea id="message" placeholder="Mesajınızı buraya yazın" className="mt-1 w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-gray-100 focus:border-gray-400 focus:ring-gray-400 min-h-[160px]" required />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit" className="bg-gray-700 text-gray-100 hover:bg-gray-600 px-10 py-3">Gönder</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.8 }} className="mt-12 mb-16 mx-4">
                <CTABanner />
            </motion.div>
        </div>
    );
}