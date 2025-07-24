'use client';

import { useState } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import TopSellersCard from "@/modules/home/components/TopSellerCard";
import { motion } from "framer-motion";

const font = Poppins({
    subsets: ["latin"],
    weight: ["100", "300", "400", "700", "900"],
});

interface SliderProps {
    games?: SliderGameProps[];
}

interface SliderGameProps {
    id: string;
    title: string;
    allImages: string[];
    description: string;
    SpecialPrice: string;
    price: string;
}

const dummyPrograms: SliderGameProps[] = [
    {
        id: "1",
        title: "Elite HIIT Conditioning",
        allImages: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        description: "High-intensity interval training to boost endurance and strength.",
        SpecialPrice: "$49.99",
        price: "$79.99",
    },
    {
        id: "2",
        title: "Strength & Power",
        allImages: [
            "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        description: "Build explosive power and muscle with our advanced strength training.",
        SpecialPrice: "$59.99",
        price: "$89.99",
    },
    {
        id: "3",
        title: "Speed & Agility",
        allImages: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        description: "Enhance your speed and agility with drills for competitive athletes.",
        SpecialPrice: "$39.99",
        price: "$69.99",
    },
    {
        id: "4",
        title: "Core Stability",
        allImages: [
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        description: "Strengthen your core for better performance and injury prevention.",
        SpecialPrice: "$29.99",
        price: "$49.99",
    },
    {
        id: "5",
        title: "Athlete Recovery Yoga",
        allImages: [
            "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        description: "Improve flexibility and recovery with yoga tailored for athletes.",
        SpecialPrice: "$24.99",
        price: "$39.99",
    },
];

const TopSellers = ({ games = dummyPrograms }: SliderProps) => {
    const [active, setActive] = useState<string>("2");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    return (
        <div className="w-full mx-auto flex flex-col max-w-7xl">
            <h1 className={cn("text-2xl sm:text-3xl font-bold text-white mb-8 text-center", font.className)}>
                Programlarımız
            </h1>
            <motion.div
                className="flex flex-col md:flex-row min-h-[60vh] gap-4 pt-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {games.map((item) => (
                    <TopSellersCard
                        key={item.id}
                        description={item.description}
                        imageUrl={item.allImages[0]}
                        active={active}
                        setActive={setActive}
                        id={item.id}
                        name={item.title}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default TopSellers;