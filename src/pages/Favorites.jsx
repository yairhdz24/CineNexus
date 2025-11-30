import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'motion/react';
import MovieList from '../components/MovieList';
import { Heart, HeartOff } from 'lucide-react';
import { Sparkles } from '../components/ui/Sparkles';
import { useLanguage } from '../context/LanguageContext';

/**
 * Página de películas favoritas
 * Muestra las películas guardadas por el usuario
 */
export default function Favorites() {
    const { favorites } = useFavorites();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <Sparkles id="favorites-sparkles" sparklesCount={25} className="opacity-20 dark:opacity-30" />
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 mb-10"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 shadow-lg"
                    >
                        <Heart className="text-red-500" size={32} fill="currentColor" />
                    </motion.div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            {t('yourFavorites')}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                            {favorites.length} {favorites.length === 1 ? 'película guardada' : 'películas guardadas'}
                        </p>
                    </div>
                </motion.div>

                {/* Contenido */}
                {favorites.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-20 bg-white dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 shadow-lg"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <HeartOff size={64} className="mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                        </motion.div>
                        <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            {t('noFavorites')}
                        </p>
                        <p className="text-slate-500 dark:text-slate-500">
                            {t('startAdding')}
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <MovieList movies={favorites} />
                    </motion.div>
                )}
            </div>
        </div>
    );
}
