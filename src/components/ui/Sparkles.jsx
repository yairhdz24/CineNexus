import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const Sparkles = ({ id, sparklesCount = 20, className }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const newSparkles = [];
    for (let i = 0; i < sparklesCount; i++) {
      newSparkles.push({
        id: `${id}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 3,
        size: 2 + Math.random() * 4,
      });
    }
    setSparkles(newSparkles);
  }, [id, sparklesCount]);

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full bg-primary-400/60 dark:bg-primary-500/60"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

