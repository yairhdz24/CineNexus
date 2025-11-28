import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFavorites } from '../context/FavoritesContext';
import clsx from 'clsx';

export default function FavoriteButton({ movie, className }) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(movie.imdbID);
    const [showParticles, setShowParticles] = useState(false);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
            setShowParticles(true);
            setTimeout(() => setShowParticles(false), 1000);
        }
    };

    // Particulas que salen del corazon
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i * 360) / 12,
        delay: i * 0.05,
    }));

    return (
        <div className="relative">
            <motion.button
                onClick={toggleFavorite}
                className={clsx(
                    "w-10 h-10 rounded-full transition-all duration-300 transform focus:outline-none flex items-center justify-center",
                    favorite
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
                        : "bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:bg-red-500 hover:text-white",
                    className
                )}
                aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Heart 
                    size={20} 
                    fill={favorite ? "currentColor" : "none"}
                    className={favorite ? "animate-pulse" : ""}
                />
            </motion.button>

            {/* Particulas animadas */}
            <AnimatePresence>
                {showParticles && (
                    <div className="absolute inset-0 pointer-events-none">
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute w-2 h-2 rounded-full bg-red-500"
                                initial={{ 
                                    x: 0, 
                                    y: 0, 
                                    scale: 0,
                                    opacity: 1 
                                }}
                                animate={{
                                    x: Math.cos((particle.angle * Math.PI) / 180) * 40,
                                    y: Math.sin((particle.angle * Math.PI) / 180) * 40,
                                    scale: [0, 1, 0],
                                    opacity: [1, 1, 0],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: particle.delay,
                                    ease: "easeOut"
                                }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
