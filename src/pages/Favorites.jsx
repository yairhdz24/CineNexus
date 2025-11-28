import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'motion/react';
import MovieList from '../components/MovieList';
import { Heart } from 'lucide-react';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';
import { Sparkles } from '../components/ui/Sparkles';

export default function Favorites() {
    const { favorites } = useFavorites();

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen pb-20 relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <Sparkles id="favorites-sparkles" sparklesCount={25} className="opacity-30" />
            </div>

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
                <TextGenerateEffect 
                    words="Tus Favoritos"
                    className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                    duration={0.15}
                />
            </motion.div>

            {favorites.length === 0 ? (
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
                        <Heart size={48} className="mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                    </motion.div>
                    <p className="text-xl text-slate-600 dark:text-slate-400">Aún no tienes favoritos.</p>
                    <p className="text-slate-500 dark:text-slate-500 mt-2">¡Comienza a agregar películas para construir tu colección!</p>
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
    );
}
