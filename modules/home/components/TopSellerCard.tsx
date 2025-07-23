"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TopSellersCardProps {
    imageUrl: string;
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
    id: string;
    name: string;
    description: string;
}

const TopSellersCard = ({
                            description,
                            imageUrl,
                            active,
                            setActive,
                            id,
                            name,
                        }: TopSellersCardProps) => {
    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            onClick={() => setActive(id)}
            className={`relative h-[400px] md:h-auto rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out
                ${active === id ? "flex-[3] md:flex-[4]" : "flex-[1] md:flex-[0.7]"}
            `}
            variants={cardVariants}
            layout // This prop enables smooth layout animations
        >
            <img
                src={imageUrl}
                alt={name}
                className="absolute w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {active !== id ? (
                <div className="absolute bottom-8 left-4 md:left-8 flex items-center justify-center">
                    <h3 className="text-lg md:text-2xl font-bold text-white [writing-mode:vertical-rl] rotate-180">
                        {name}
                    </h3>
                </div>
            ) : (
                <motion.div
                    className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end h-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{name}</h2>
                    <p className="mt-2 text-sm text-gray-300 max-w-xs">{description}</p>
                    <Button asChild className="mt-4 w-fit bg-indigo-500 text-white hover:bg-indigo-400">
                        <Link href={`/programs/${id}`}>View Program</Link>
                    </Button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default TopSellersCard;