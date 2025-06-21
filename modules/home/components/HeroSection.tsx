import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const videos = [
    { id: 1, title: "Morning HIIT Workout", description: "Kickstart your day with this high-intensity interval training session.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 2, title: "Yoga for Flexibility", description: "Join our relaxing yoga session to improve flexibility and reduce stress.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 3, title: "Strength Training Basics", description: "Learn the fundamentals of strength training with our professional coaches.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 4, title: "Cardio Blast", description: "Burn calories with this high-energy cardio workout.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: 5, title: "Pilates Core Strength", description: "Strengthen your core with this Pilates session.", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

export const HeroSection = () => (
    <div className="bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_#4b4b4b_0%,_#1a1a1a_90%)] rounded-lg p-4 sm:p-8 mx-auto max-w-7xl">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 px-10 min-h-[400px] md:min-h-[500px]"
        >
            <div className="flex flex-col justify-center items-start text-gray-100 px-4 py-8 md:px-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Join Our Gym Today!</h2>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6">Experience world-class training with expert coaches.</p>
                <Button className="bg-gray-700 text-gray-100 hover:bg-gray-600 px-6 py-3">Join Now</Button>
            </div>
            <div className="flex justify-center items-center px-4 py-8 md:px-8">
                <img
                    src="/assets/loog.svg"
                    alt="Gym Facility"
                    className="w-full max-w-[400px] md:max-w-[500px] h-auto rounded-lg shadow-lg object-cover"
                />
            </div>
        </motion.div>
        <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-100 mb-6 text-center">Our Workout Videos</h3>
            <Carousel className="w-full">
                <CarouselContent>
                    {videos.map((video) => (
                        <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-50">
                                <CardHeader className="min-h-[6rem]">
                                    <CardTitle className="text-xl font-semibold text-gray-800">{video.title}</CardTitle>
                                    <CardDescription className="text-gray-500">{video.description}</CardDescription>
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
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-gray-700 text-gray-100 hover:bg-gray-600" />
                <CarouselNext className="right-4 bg-gray-700 text-gray-100 hover:bg-gray-600" />
            </Carousel>
        </div>
    </div>
);