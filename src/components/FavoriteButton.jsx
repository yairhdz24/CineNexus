import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useFavorites } from '../context/FavoritesContext';
import { useState } from 'react';

/**
 * Componente de botón para agregar o quitar películas de favoritos
 * Con animación de corazón y explosión de partículas al hacer clic
 * @param {Object} movie - Objeto de la película a agregar/quitar de favoritos
 * @param {string} className - Clases CSS adicionales
 */
export default function FavoriteButton({ movie, className = '' }) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(movie.imdbID);
    const [isAnimating, setIsAnimating] = useState(false);

    /**
     * Maneja el evento de clic para agregar o quitar de favoritos
     */
    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!favorite) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 700);
        }
        
        if (favorite) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <motion.button
            onClick={toggleFavorite}
            className={`relative p-2.5 rounded-xl transition-all duration-300 focus:outline-none ${
                favorite
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500'
            } ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.85 }}
            aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
            {/* Icono del corazón con animación */}
            <motion.div
                animate={favorite ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
            >
                <Heart 
                    size={20} 
                    fill={favorite ? 'currentColor' : 'none'}
                    className="transition-all duration-300"
                />
            </motion.div>
            
            {/* Efecto de explosión de corazones */}
            <AnimatePresence>
                {isAnimating && (
                    <>
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{ 
                                    scale: 2,
                                    opacity: 0,
                                    x: Math.cos(i * 45 * Math.PI / 180) * 40,
                                    y: Math.sin(i * 45 * Math.PI / 180) * 40,
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <Heart size={10} fill="currentColor" className="text-red-400" />
                            </motion.div>
                        ))}
                        
                        {/* Círculo de onda */}
                        <motion.div
                            className="absolute inset-0 rounded-xl border-2 border-red-400 pointer-events-none"
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    </>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
