"use client";
import React from "react";
import { Film, Clapperboard, Video, Popcorn, Ticket, Camera, Play, Star } from "lucide-react";
import { motion } from "motion/react";

const cinemaIcons = [
    { Icon: Film, size: 24 },
    { Icon: Clapperboard, size: 28 },
    { Icon: Video, size: 26 },
    { Icon: Popcorn, size: 22 },
    { Icon: Ticket, size: 24 },
    { Icon: Camera, size: 26 },
    { Icon: Play, size: 24 },
    { Icon: Star, size: 22 },
];

export const CinemaBackground = ({ className }) => {
    const rows = 8;
    const cols = 12;

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="flex items-center justify-center gap-12 md:gap-16 lg:gap-20 xl:gap-24 py-6 md:py-8"
                        style={{
                            animation: `slideHorizontal ${25 + rowIndex * 3}s linear infinite`,
                            animationDelay: `${rowIndex * 2.5}s`,
                        }}
                    >
                        {Array.from({ length: cols }).map((_, colIndex) => {
                            const iconIndex = (rowIndex * cols + colIndex) % cinemaIcons.length;
                            const { Icon, size } = cinemaIcons[iconIndex];
                            return (
                                <motion.div
                                    key={colIndex}
                                    className="text-slate-300 dark:text-slate-700"
                                    animate={{
                                        y: [0, -8, 0],
                                        opacity: [0.4, 0.6, 0.4],
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{
                                        duration: 4 + Math.random() * 3,
                                        repeat: Infinity,
                                        delay: Math.random() * 3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <Icon size={size} strokeWidth={1.5} />
                                </motion.div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
