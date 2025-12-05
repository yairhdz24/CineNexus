import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import MovieList from './MovieList';

export default function CategorySection({
    title,
    movies,
    loading,
    viewAllLink,
    icon: Icon
}) {
    // Renderizado del componente de sección de categoría
    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                {/* Cabecera de la sección con animaciones */}
                <motion.div
                    className="flex items-center justify-between mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-4 relative"
                        whileHover={{ scale: 1.02 }}
                    >
                        {/* Icono Animado */}
                        {Icon && (
                            <span
                                className="relative p-3 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-xl"
                            >
                                <Icon size={28} />
                                {/* Efecto de brillo detrás del icono */}
                                <div
                                    className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-pink-500 rounded-2xl opacity-30 blur-lg -z-10"
                                />
                            </span>
                        )}

                        {/* Título con gradiente de texto */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-white">
                            {title}
                        </span>

                        {/* Decoración de destellos */}
                        <Sparkles size={20} className="text-yellow-500" />

                        {/* Línea decorativa animada debajo del título */}
                        <motion.div
                            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-violet-600 via-pink-600 to-transparent rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        />
                    </motion.h2>

                    {/* Enlace para "Ver todo" si existe */}
                    {viewAllLink && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to={viewAllLink}
                                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl group"
                            >
                                Ver todo
                                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    )}
                </motion.div>

                {/* Lista de películas */}
                <MovieList movies={movies} loading={loading} />
            </div>
        </section>
    );
}
