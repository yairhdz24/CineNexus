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
            className="group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, rotateY: 3, rotateX: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
        >
            <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-violet-500/20 transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full flex flex-col">
                <Link to={`/movie/${movie.imdbID}`} className="block relative aspect-[2/3] overflow-hidden">
                    {hasPoster ? (
                        <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
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
                            <div className="z-10 flex flex-col items-center justify-center text-center px-6 space-y-4">
                                <Film size={64} className="text-white/90 drop-shadow-lg" strokeWidth={1.5} />
                                <div className="space-y-1">
                                    <p className="text-white font-bold text-lg tracking-wide drop-shadow-md">CineNexus</p>
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                <div className="p-4 space-y-3 flex-1 flex flex-col">
                    <Link to={`/movie/${movie.imdbID}`}>
                        <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {movie.Title}
                        </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                            <Calendar size={14} />
                            <span>{movie.Year}</span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-white ${typeInfo.color}`}>
                            <TypeIcon size={10} />
                            {typeInfo.label}
                        </span>
                    </div>

                    <div className="flex-1" />

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                        <Link 
                            to={`/movie/${movie.imdbID}`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-xs font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
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
