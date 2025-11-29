import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'motion/react';
import MovieList from '../components/MovieList';
import { Heart, HeartOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMemo } from 'react';

export default function Favorites() {
    const { favorites } = useFavorites();
    const { t } = useLanguage();

    // Filtrar favoritos duplicados y validar que tengan imdbID
    const validFavorites = useMemo(() => {
        const seen = new Set();
        return favorites.filter(movie => {
            if (!movie || !movie.imdbID) return false;
            if (seen.has(movie.imdbID)) return false;
            seen.add(movie.imdbID);
            return true;
        });
    }, [favorites]);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen pb-20 relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-black">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3 mb-8"
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                    <Heart className="text-red-500" size={32} fill="currentColor" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    {t('yourFavorites')}
                </h1>
            </motion.div>

            {validFavorites.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <HeartOff size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                    </motion.div>
                    <p className="text-xl text-slate-600 dark:text-slate-400">{t('noFavorites')}</p>
                    <p className="text-slate-500 dark:text-slate-500 mt-2">{t('startAdding')}</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <MovieList movies={validFavorites} />
                </motion.div>
            )}
        </div>
    );
}
