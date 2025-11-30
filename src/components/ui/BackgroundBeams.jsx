import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

/**
 * Componente BackgroundBeams - Crea un efecto de rayos de luz animados en el fondo
 * @param {string} className - Clases CSS adicionales
 */
export const BackgroundBeams = ({ className }) => {
  const containerRef = useRef(null);
  const [beams, setBeams] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const newBeams = [];
    for (let i = 0; i < 3; i++) {
      newBeams.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
      });
    }
    setBeams(newBeams);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
    >
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute w-px h-full bg-gradient-to-b from-transparent via-primary-500/50 to-transparent"
          initial={{
            x: `${beam.x}%`,
            y: '-100%',
            opacity: 0,
          }}
          animate={{
            y: '200%',
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            boxShadow: '0 0 20px rgba(14, 165, 233, 0.5)',
          }}
        />
      ))}
    </div>
  );
};


