import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import FavoriteButton from './FavoriteButton';
import { Calendar, Film, Tv, Clapperboard, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MovieCard({ movie }) {
    const { t } = useLanguage();
    const hasPoster = movie.Poster && movie.Poster !== 'N/A';

    const getTypeInfo = () => {
        switch(movie.Type) {
            case 'movie': return { icon: Film, label: t('movie'), color: 'bg-violet-500' };
            case 'series': return { icon: Tv, label: t('series'), color: 'bg-pink-500' };
            default: return { icon: Clapperboard, label: movie.Type, color: 'bg-slate-500' };
        }
    };

    const typeInfo = getTypeInfo();
    const TypeIcon = typeInfo.icon;

    return (
        <motion.div 
            className="group relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: -3, z: 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
        >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl gradient-border-animated opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
            
            {/* Glassmorphic card */}
            <div className="relative bg-white/90 dark:bg-slate-800/90 glass-strong rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-white/20 dark:border-slate-700/50 h-full flex flex-col">
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
                
                <Link to={`/movie/${movie.imdbID}`} className="block relative aspect-[2/3] overflow-hidden">
                    {hasPoster ? (
                        <>
                            <img 
                                src={movie.Poster} 
                                alt={movie.Title} 
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2" 
                                loading="lazy" 
                            />
                            {/* Shimmer overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-[100%] transform transition-transform duration-1000" />
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 relative overflow-hidden">
                            {/* Decorative film strip pattern */}
                            <div className="absolute top-0 left-0 right-0 h-8 bg-black/10 flex items-center justify-around px-2">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-3 h-4 bg-white/20 rounded-sm" />
                                ))}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/10 flex items-center justify-around px-2">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-3 h-4 bg-white/20 rounded-sm" />
                                ))}
                            </div>
                            
                            {/* Main content */}
                            <div className="z-10 flex flex-col items-center justify-center text-center px-6 space-y-4 animate-float-smooth">
                                <Film size={64} className="text-white/90 drop-shadow-2xl" strokeWidth={1.5} />
                                <div className="space-y-1">
                                    <p className="text-white font-bold text-lg tracking-wide drop-shadow-lg">CineNexus</p>
                                    <p className="text-white/90 text-sm font-medium">Póster No Disponible</p>
                                    <p className="text-white/80 text-xs">Poster Not Available</p>
                                </div>
                            </div>
                            
                            {/* Subtle overlay pattern */}
                            <div className="absolute inset-0 opacity-10" style={{
                                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
                            }} />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                <div className="p-4 space-y-3 flex-1 flex flex-col backdrop-blur-sm">
                    <Link to={`/movie/${movie.imdbID}`}>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-600 transition-all duration-300">
                            {movie.Title}
                        </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <Calendar size={14} />
                            <span>{movie.Year}</span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${typeInfo.color} shadow-lg`}>
                            <TypeIcon size={10} />
                            {typeInfo.label}
                        </span>
                    </div>

                    <div className="flex-1" />

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100/50 dark:border-slate-700/50">
                        <Link 
                            to={`/movie/${movie.imdbID}`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold rounded-full transition-all shadow-lg hover:shadow-xl hover:shadow-violet-500/50 hover:scale-105"
                        >
                            <Eye size={14} />
                            {t('viewDetails')}
                        </Link>
                        <FavoriteButton movie={movie} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
