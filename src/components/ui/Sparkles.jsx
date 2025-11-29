"use client";
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const Sparkles = ({
  id,
  className,
  sparklesCount = 20,
  colors = ["#0ea5e9", "#8b5cf6", "#ec4899"],
  ...props
}) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: sparklesCount }, (_, i) => ({
      id: `${id}-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 4 + 2,
    }));
  }, [sparklesCount, colors, id]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      {...props}
    >
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};


