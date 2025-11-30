import { motion } from 'motion/react';
import { Heart, Film, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useLanguage } from '../context/LanguageContext';
import MovieList from '../components/MovieList';

export default function Favorites() {
    const { favorites } = useFavorites();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
            {/* Header */}
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
                            <Heart size={32} className="text-white" fill="currentColor" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('yourFavorites')}</h1>
                        <p className="text-white/80">
                            {favorites.length > 0 
                                ? `${favorites.length} ${favorites.length === 1 ? 'película' : 'películas'}`
                                : t('noFavorites')
                            }
                        </p>
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
                            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full transition-all"
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
