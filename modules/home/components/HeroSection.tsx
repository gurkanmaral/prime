import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {ChevronRight} from "lucide-react";

export const HeroSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="relative w-full h-[85vh] min-h-[600px] max-h-[800px] overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/hero.jpg"
                    alt="Fitness enthusiast working out"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#232526] via-[#232526]/80 to-transparent"></div>
            </div>

            <div className="relative z-10 flex h-full items-center justify-center text-center text-white">
                <motion.div
                    className="mx-auto max-w-3xl px-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1
                        className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
                        variants={itemVariants}
                    >
                        <span className="block">PrimePerformance</span>
                    </motion.h1>
                    <motion.div variants={itemVariants}>
                        <span className="block text-indigo-400 mt-2 text-2xl">  Potansiyelini Ortaya Çıkar,</span>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <h2 className="text-lg font-semibold tracking-wider text-indigo-300 uppercase">
                            Sınırlarını Zorla
                        </h2>
                    </motion.div>
                    <motion.p
                        className="mt-6 max-w-xl mx-auto text-lg leading-8 text-gray-300"
                        variants={itemVariants}
                    >
                        En son teknoloji ekipmanlar, uzman eğitmenler ve sizi motive edecek bir toplulukla hedeflerinize
                        ulaşın.
                    </motion.p>
                    <motion.div className="mt-10 flex justify-center gap-x-6" variants={itemVariants}>
                        <Button asChild size="lg" className="bg-indigo-500 text-white hover:bg-indigo-400">
                            <Link href="#aboutUs">
                                Keşfet & Başla
                                <ChevronRight className="ml-2 h-5 w-5"/>
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline"
                                className="text-white border-white/50 hover:bg-white/10 hover:text-white">
                            <Link href="#contactUs">
                                Bize Ulaşın
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};