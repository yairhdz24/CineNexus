import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFavorites } from '../context/FavoritesContext';
import { useState, useCallback } from 'react';


// Boton de favoritos con animacion
export default function FavoriteButton({ movie, className = '' }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [isAnimating, setIsAnimating] = useState(false);
    
    const favorite = movie?.imdbID ? isFavorite(movie.imdbID) : false;

    const handleClick = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!movie?.imdbID) return;

        if (!favorite) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 600);
        }
        
        toggleFavorite(movie);
    }, [movie, favorite, toggleFavorite]);

    if (!movie?.imdbID) return null;

    return (
        <motion.button
            type="button"
            onClick={handleClick}
            className={`relative p-2.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
                favorite
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/40'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500'
            } ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
        >
            <motion.div
                key={favorite ? 'filled' : 'empty'}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
                <Heart 
                    size={18} 
                    fill={favorite ? 'currentColor' : 'none'}
                    strokeWidth={2.5}
                />
            </motion.div>
            
            <AnimatePresence>
                {isAnimating && (
                    <>
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ 
                                    scale: 2,
                                    opacity: 0,
                                    x: Math.cos(i * 60 * Math.PI / 180) * 30,
                                    y: Math.sin(i * 60 * Math.PI / 180) * 30,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <Heart size={8} fill="currentColor" className="text-red-400" />
                            </motion.div>
                        ))}
                        <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-red-400 pointer-events-none"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
