// ============================================
// COMPONENTE: MovieCard
// Descripción: Tarjeta de película con efectos 3D (Adaptada para móvil)
// ============================================

import logoDark from '../assets/2.png';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import FavoriteButton from './FavoriteButton';
import { Calendar, Film, Tv, Info, Star } from 'lucide-react';
import { useState } from 'react';


export default function MovieCard({ movie }) {
    // Estados
    const hasPoster = movie.Poster && movie.Poster !== 'N/A';
    const [imageError, setImageError] = useState(false);

    // Detección de dispositivo (simplificada para efectos)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        // Todo el card es clickeable para ir a los detalles
        <Link to={`/movie/${movie.imdbID}`}>
            <motion.div
                className="group relative h-full cursor-pointer"
                // Animaciones de entrada
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // Efecto 3D solo en desktop (hover)
                whileHover={!isMobile ? {
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: -3,
                    z: 50,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                } : {}}
                style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1200
                }}
            >
                {/* Glow animado en hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-500 -z-10 hidden md:block" />

                {/* Contenedor principal del card */}
                <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg md:group-hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50 h-full flex flex-col">

                    {/* SECCION: Poster de la película */}
                    <div className="block relative aspect-[2/3] overflow-hidden">

                        {/* Badges de calidad */}
                        <div className="absolute top-2 left-2 z-10 flex gap-1">
                            <span className="px-2 py-1 bg-red-600 text-white text-[10px] md:text-xs font-bold rounded shadow-lg">
                                HD
                            </span>
                            <span className="px-2 py-1 bg-yellow-500 text-black text-[10px] md:text-xs font-bold rounded shadow-lg flex items-center gap-1">
                                <Star size={10} fill="currentColor" />
                                8.5
                            </span>
                        </div>

                        {/* Botón de favoritos que previene la navegación */}
                        <div
                            className="absolute top-2 right-2 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 opacity-100"
                            onClick={(e) => e.preventDefault()}
                        >
                            <FavoriteButton movie={movie} />
                        </div>

                        {/* Imagen del poster o logo de CineNexus si falla */}
                        {hasPoster && !imageError ? (
                            <>
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className="w-full h-full object-cover transition-all duration-700 md:group-hover:scale-125 md:group-hover:rotate-2"
                                    loading="lazy"
                                    onError={() => setImageError(true)}
                                />
                                {/* Efecto shimmer al hacer hover solo desktop */}
                                <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
                            </>
                        ) : (
                            // Placeholder cuando no hay poster
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                                <img
                                    src={logoDark}
                                    alt="CineNexus"
                                    className="w-32 md:w-36 h-auto mb-4 opacity-50"
                                />
                                {/* <p className="text-white/60 text-xs md:text-sm font-semibold">Sin Póster</p> */}
                            </div>
                        )}

                        {/* Overlay de información al hacer hover (Solo Desktop) */}
                        <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-end justify-center pb-6">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                whileHover={{ y: 0, opacity: 1 }}
                                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
                            >
                                <Info size={16} className="text-white" />
                                <span className="text-white text-sm font-bold">Ver Detalles</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* SECCION: Información de la película */}
                    <div className="p-3 md:p-4 flex-1 flex flex-col">

                        {/* Título */}
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm md:text-sm leading-tight line-clamp-2 md:group-hover:text-transparent md:group-hover:bg-clip-text md:group-hover:bg-gradient-to-r md:group-hover:from-violet-600 md:group-hover:to-pink-600 transition-all duration-300">
                            {movie.Title}
                        </h3>

                        {/* Metadata año y tipo */}
                        <div className="flex items-center gap-2 mt-2 text-xs">
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                <Calendar size={12} />
                                <span>{movie.Year}</span>
                            </div>
                            <span className={`
                                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold text-white shadow-lg
                                ${movie.Type === 'movie' ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-gradient-to-r from-pink-600 to-rose-600'}
                            `}>
                                {movie.Type === 'movie' ? <Film size={10} /> : <Tv size={10} />}
                                {movie.Type === 'movie' ? 'Película' : 'Serie'}
                            </span>
                        </div>

                        {/* Espaciador flexible */}
                        <div className="flex-1" />

                        {/* Botón de ver detalles (Visible siempre en mobile) */}
                        <div className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 md:group-hover:from-violet-500 md:group-hover:to-purple-500 text-white text-xs font-semibold rounded-full transition-all shadow-lg md:group-hover:shadow-xl md:group-hover:shadow-violet-500/50 md:transform md:group-hover:scale-105">
                            <Info size={14} />
                            Ver Detalles
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
