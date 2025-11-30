import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import FavoriteButton from './FavoriteButton';
import { Calendar, Film, Tv, Clapperboard, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Componente de tarjeta de película responsiva
 * Muestra el poster completo sin interferencias y la información debajo
 * @param {Object} movie - Objeto de la película con sus propiedades
 */
export default function MovieCard({ movie }) {
    const { t } = useLanguage();
    const hasPoster = movie.Poster && movie.Poster !== 'N/A';

    // Determinar el icono y texto según el tipo
    const getTypeInfo = () => {
        switch(movie.Type) {
            case 'movie':
                return { icon: Film, label: 'Película', color: 'bg-blue-500' };
            case 'series':
                return { icon: Tv, label: 'Serie', color: 'bg-purple-500' };
            default:
                return { icon: Clapperboard, label: movie.Type, color: 'bg-slate-500' };
        }
    };

    const typeInfo = getTypeInfo();
    const TypeIcon = typeInfo.icon;

    return (
        <motion.div 
            className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 h-full flex flex-col"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Poster - Imagen completa sin interferencias */}
            <Link to={`/movie/${movie.imdbID}`} className="block relative aspect-[2/3] overflow-hidden">
                {hasPoster ? (
                    <motion.img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
                        <Film size={48} className="text-slate-400 dark:text-slate-500 mb-3" />
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Sin Póster</span>
                    </div>
                )}
            </Link>

            {/* Información debajo del poster */}
            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1 flex flex-col">
                {/* Título */}
                <Link to={`/movie/${movie.imdbID}`} className="block">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-tight line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {movie.Title}
                    </h3>
                </Link>

                {/* Año y Tipo */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{movie.Year}</span>
                    </div>
                    
                    {/* Badge de tipo */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold text-white ${typeInfo.color}`}>
                        <TypeIcon size={10} className="sm:w-3 sm:h-3" />
                        <span className="hidden xs:inline">{typeInfo.label}</span>
                    </span>
                </div>

                {/* Espaciador flexible */}
                <div className="flex-1" />

                {/* Botones de acción */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    {/* Botón Ver Detalles */}
                    <Link 
                        to={`/movie/${movie.imdbID}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all hover:shadow-lg"
                    >
                        <Eye size={14} className="sm:w-4 sm:h-4" />
                        <span>{t('viewDetails')}</span>
                    </Link>
                    
                    {/* Botón de favorito */}
                    <FavoriteButton movie={movie} />
                </div>
            </div>
        </motion.div>
    );
}
