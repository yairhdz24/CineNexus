import { motion } from 'motion/react';
import { Heart, Film, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import MovieList from '../components/MovieList';

export default function Favorites() {
    const { favorites, clearFavorites } = useFavorites();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen pt-28 pb-24 md:pb-8 bg-slate-50 dark:bg-slate-950">
            {/* Header - Compact */}
            <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 py-10 md:py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-white"
                    >
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <Heart size={28} className="text-white" fill="currentColor" />
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold mb-1">{t('yourFavorites')}</h1>
                            <p className="text-white/80 text-sm">
                                {favorites.length > 0
                                    ? `${favorites.length} ${favorites.length === 1 ? 'película' : 'películas'}`
                                    : t('noFavorites')
                                }
                            </p>
                        </div>

                        {favorites.length > 0 && (
                            <button
                                onClick={clearFavorites}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-bold backdrop-blur-sm transition-all border border-white/10 hover:border-white/30"
                            >
                                {t('clearFavorites') || 'Borrar Todo'}
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {favorites.length > 0 ? (
                    <MovieList movies={favorites} loading={false} />
                ) : (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
                            <Film size={48} className="text-slate-400" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {t('noFavorites')}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                            {t('startAdding')}
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all"
                        >
                            {t('exploreCatalog')}
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
