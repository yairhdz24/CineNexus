import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, Calendar, Film, Star, Sparkles as SparklesIcon } from 'lucide-react';
import FavoriteButton from './FavoriteButton';
import { CardContainer, CardBody, CardItem } from './ui/ThreeDCard';
import { useLanguage } from '../context/LanguageContext';

export default function MovieCard({ movie }) {
    const { t } = useLanguage();
    const hasPoster = movie.Poster && movie.Poster !== 'N/A';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <CardContainer className="inter-var w-full">
                <CardBody className="bg-white dark:bg-slate-800 relative group/card w-full h-full rounded-2xl p-0 border border-slate-200 dark:border-slate-700 transition-all duration-500 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-2xl hover:shadow-slate-900/10 dark:hover:shadow-slate-900/30 overflow-hidden backdrop-blur-sm">
                    {/* Efecto de brillo sutil en hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/0 to-slate-100/0 dark:from-slate-700/0 dark:to-slate-800/0 group-hover/card:from-slate-50/50 group-hover/card:to-slate-100/50 dark:group-hover/card:from-slate-700/30 dark:group-hover/card:to-slate-800/30 transition-all duration-500 pointer-events-none z-0" />
                    
                    {/* Contenedor de la imagen con efectos 3D */}
                    <CardItem
                        translateZ="100"
                        className="w-full relative overflow-hidden rounded-t-2xl"
                    >
                        <Link to={`/movie/${movie.imdbID}`} className="block w-full">
                            <div className="aspect-[2/3] w-full overflow-hidden relative group/image">
                                {hasPoster ? (
                                    <>
                                        {/* Imagen principal */}
                                        <motion.img
                                            src={movie.Poster}
                                            alt={movie.Title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                                            loading="lazy"
                                        />
                                        {/* Overlay con gradiente animado */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                                        {/* Efecto de brillo sutil (glow) */}
                                        <div className="absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 pointer-events-none">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-slate-100/10 to-white/20 dark:from-slate-400/20 dark:via-slate-500/10 dark:to-slate-400/20 blur-2xl" style={{
                                                boxShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(255, 255, 255, 0.2)'
                                            }} />
                                        </div>
                                        {/* Icono de play flotante */}
                                        <motion.div
                                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                                            initial={{ scale: 0 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
                                                <Eye className="text-white" size={24} />
                                            </div>
                                        </motion.div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 text-slate-500 dark:text-slate-400 relative overflow-hidden">
                                        {/* Patron de fondo animado */}
                                        <div className="absolute inset-0 opacity-10">
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)`
                                            }} />
                                        </div>
                                        <Film size={48} className="mb-3 opacity-60 relative z-10" />
                                        <span className="text-sm font-medium relative z-10">{t('noPoster')}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </CardItem>

                    {/* Contenido de la card */}
                    <div className="p-4 space-y-3 relative z-10">
                        {/* Titulo */}
                        <CardItem
                            translateZ="80"
                            className="text-base font-bold text-neutral-700 dark:text-white line-clamp-2 min-h-[3rem] leading-tight"
                        >
                            {movie.Title}
                        </CardItem>

                        {/* Informacion adicional */}
                        <CardItem
                            translateZ="60"
                            className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400"
                        >
                            <span className="flex items-center space-x-1">
                                <Calendar size={12} />
                                <span>{movie.Year}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                                <Film size={12} />
                                <span className="capitalize">{movie.Type}</span>
                            </span>
                        </CardItem>

                        {/* Botones de accion */}
                        <div className="flex justify-between items-center pt-2 gap-2">
                            <CardItem
                                translateZ={40}
                                as={Link}
                                to={`/movie/${movie.imdbID}`}
                                className="flex-1 px-3 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 hover:from-slate-700 hover:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                            >
                                <Eye size={14} />
                                <span>{t('viewDetails')}</span>
                            </CardItem>
                            <CardItem translateZ={40}>
                                <FavoriteButton movie={movie} className="!p-2.5 !rounded-lg hover:scale-110 active:scale-95 transition-transform" />
                            </CardItem>
                        </div>
                    </div>

                    {/* Efecto de borde sutil en hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-200/30 via-slate-300/20 to-slate-200/30 dark:from-slate-600/20 dark:via-slate-500/15 dark:to-slate-600/20 blur-xl" />
                    </div>
                </CardBody>
            </CardContainer>
        </motion.div>
    );
}
