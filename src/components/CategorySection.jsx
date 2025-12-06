import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import MovieList from './MovieList';

export default function CategorySection({
    title,
    movies,
    loading,
    viewAllLink,
    icon: Icon
}) {
    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                {/* Cabecera de la sección - Optimizada sin animaciones pesadas */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white flex items-center gap-4 relative">
                        {/* Icono con tema rojo */}
                        {Icon && (
                            <span className="relative p-3 bg-gradient-to-br from-red-500 via-rose-500 to-red-600 rounded-2xl text-white shadow-xl shadow-red-500/30">
                                <Icon size={28} />
                            </span>
                        )}

                        {/* Título con gradiente rojo */}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 dark:from-white dark:via-red-200 dark:to-white">
                            {title}
                        </span>

                        {/* Decoración de destellos */}
                        <Sparkles size={20} className="text-yellow-500" />

                        {/* Línea decorativa estática - más eficiente */}
                        <div className="absolute -bottom-2 left-0 h-1 w-3/5 bg-gradient-to-r from-red-600 via-rose-600 to-transparent rounded-full" />
                    </h2>

                    {/* Enlace para "Ver todo" */}
                    {viewAllLink && (
                        <Link
                            to={viewAllLink}
                            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
                        >
                            Ver todo
                            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>

                {/* Lista de películas */}
                <MovieList movies={movies} loading={loading} />
            </div>
        </section>
    );
}
