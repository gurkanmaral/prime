'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';

interface VideoPlayerModalProps {
    videoUrl: string | null;
    onClose: () => void;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const VideoPlayerModal = ({ videoUrl, onClose }: VideoPlayerModalProps) => {
    if (!videoUrl) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
            >
                <motion.div
                    className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl"
                    variants={modalVariants}
                    onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                >
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 z-10 p-2 text-white bg-black/30 rounded-full hover:bg-black/60 transition-colors"
                    >
                        <X size={24} />
                    </button>
                    <div className="aspect-video">
                        <video
                            className="w-full h-full"
                            src={videoUrl}
                            controls
                            autoPlay // Automatically play the video when the modal opens
                            onEnded={onClose} // Optional: close modal when video finishes
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};