import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import { motion } from 'motion/react';

/**
 * Componente de lista de películas
 * Muestra una grilla de películas con animación de entrada escalonada
 * @param {Array} movies - Array de objetos de películas
 * @param {boolean} loading - Indica si está cargando los datos
 */
export default function MovieList({ movies, loading }) {
    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!movies?.length) {
        return (
            <motion.div 
                className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    No se encontraron películas.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie, index) => (
                <motion.div 
                    key={movie.imdbID}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                    <MovieCard movie={movie} />
                </motion.div>
            ))}
        </div>
    );
}
