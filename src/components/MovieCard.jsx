// ============================================
// COMPONENTE: MovieCard
// Descripción: Tarjeta de película optimizada con tema rojo
// ============================================

import logoDark from '../assets/2.png';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { Calendar, Film, Tv, Info, Star } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function MovieCard({ movie, viewMode = 'grid' }) {
    // Estados
    const hasPoster = movie.Poster && movie.Poster !== 'N/A';
    const [imageError, setImageError] = useState(false);

    // Detección de dispositivo - memorizada
    const isMobile = useMemo(() =>
        typeof window !== 'undefined' && window.innerWidth < 768,
        []);
    const isList = viewMode === 'list';

    return (
        <Link to={`/movie/${movie.imdbID}`} className="block h-full">
            <div
                className={`group relative cursor-pointer transform-gpu transition-all duration-300 ${isList ? 'h-48' : 'h-full'} ${!isMobile && !isList ? 'hover:scale-105 hover:-rotate-1' : ''} ${!isMobile && isList ? 'hover:translate-x-2' : ''}`}
            >
                {/* Glow animado en hover - ROJO */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-opacity duration-300 -z-10 hidden md:block ${isList ? 'rounded-xl' : ''}`} />

                {/* Contenedor principal del card */}
                <div className={`relative bg-white dark:bg-slate-800 overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300 border border-white/20 dark:border-slate-700/50 h-full flex ${isList ? 'flex-row rounded-xl' : 'flex-col rounded-2xl'}`}>

                    {/* SECCION: Poster de la película */}
                    <div className={`block relative overflow-hidden ${isList ? 'w-32 shrink-0' : 'aspect-[2/3]'}`}>

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

                        {/* Botón de favoritos */}
                        <div
                            className="absolute top-2 right-2 z-10 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 opacity-100"
                            onClick={(e) => e.preventDefault()}
                        >
                            <FavoriteButton movie={movie} />
                        </div>

                        {/* Imagen del poster */}
                        {hasPoster && !imageError ? (
                            <>
                                <img
                                    src={movie.Poster}
                                    alt={movie.Title}
                                    className={`w-full h-full object-cover transition-transform duration-500 ${!isList ? 'group-hover:scale-110' : 'group-hover:scale-105'}`}
                                    loading="lazy"
                                    onError={() => setImageError(true)}
                                />
                                {/* Efecto shimmer simplificado */}
                                <div className="hidden md:block absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                                <img
                                    src={logoDark}
                                    alt="CineNexus"
                                    className="w-32 md:w-36 h-auto mb-4 opacity-50"
                                />
                            </div>
                        )}

                        {/* Overlay de información (Solo Desktop y GRID) */}
                        {/* {!isList && (
                            <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-end justify-center pb-6">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                                    <Info size={16} className="text-white" />
                                    <span className="text-white text-sm font-bold">Ver Detalles</span>
                                </div>
                            </div>
                        )} */}
                    </div>

                    {/* SECCION: Información de la película */}
                    <div className={`flex-1 flex flex-col ${isList ? 'p-4 justify-center' : 'p-3 md:p-4'}`}>

                        {/* Título - ROJO en hover */}
                        <h3 className={`font-bold text-slate-900 dark:text-white leading-tight transition-colors duration-200 ${isList ? 'text-lg mb-2' : 'text-sm md:text-sm line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-400'}`}>
                            {movie.Title}
                        </h3>

                        {/* Metadata año y tipo - ROJO */}
                        <div className="flex items-center gap-2 mt-2 text-xs">
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                <Calendar size={12} />
                                <span>{movie.Year}</span>
                            </div>
                            <span className={`
                                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold text-white shadow-lg
                                ${movie.Type === 'movie' ? 'bg-gradient-to-r from-red-600 to-rose-600' : 'bg-gradient-to-r from-rose-600 to-pink-600'}
                            `}>
                                {movie.Type === 'movie' ? <Film size={10} /> : <Tv size={10} />}
                                {movie.Type === 'movie' ? 'Película' : 'Serie'}
                            </span>
                        </div>

                        {/* Descripción extra para List View */}
                        {isList && (
                            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 line-clamp-2 hidden md:block">
                                Disfruta de {movie.Title} en la mejor calidad. Explora más detalles, reparto y sinopsis completa.
                            </p>
                        )}

                        <div className="flex-1" />

                        {/* Botón de ver detalles - Más pequeño en móvil */}
                        <div className={`mt-2 md:mt-3 w-full inline-flex items-center justify-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2.5 bg-gradient-to-r from-red-600 to-rose-600 group-hover:from-red-500 group-hover:to-rose-500 text-white text-[10px] md:text-xs font-semibold rounded-full transition-all shadow-lg group-hover:shadow-xl group-hover:shadow-red-500/30 ${isList ? 'w-auto self-start' : ''}`}>
                            <Info size={12} className="md:w-3.5 md:h-3.5" />
                            Ver Detalles
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
