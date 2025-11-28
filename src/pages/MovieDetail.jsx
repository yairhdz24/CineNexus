import { useEffect, useState, useRef, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { fetchMovieDetails } from '../utils/api';
import FavoriteButton from '../components/FavoriteButton';
import MovieList from '../components/MovieList';
import { Star, Calendar, Clock, Film, Share2, Users, User, PenTool, Award, Globe, DollarSign, Box, Languages as LanguagesIcon } from 'lucide-react';
import { Spotlight } from '../components/ui/Spotlight';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';
import { Sparkles } from '../components/ui/Sparkles';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';
import { useLanguage } from '../context/LanguageContext';

export default function MovieDetail() {
    const { id } = useParams();
    const { t } = useLanguage();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDetails = async () => {
            setLoading(true);
            try {
                const data = await fetchMovieDetails(id);
                setMovie(data);
            } catch (error) {
                console.error("Failed to load movie details", error);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [id]);

    const heroRef = useRef(null);
    const containerRef = useRef(null);
    
    // Usar el contenedor como target inicial, luego cambiar al hero cuando este listo
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
        layoutEffect: false
    });
    
    // Valores por defecto seguros - las transformaciones funcionan incluso si scrollYProgress es null inicialmente
    const opacity = useTransform(scrollYProgress || 0, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress || 0, [0, 0.5], [1, 0.95]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
                    <Sparkles id="loading-sparkles" className="absolute inset-0" sparklesCount={20} />
                </div>
            </div>
        );
    }

    if (!movie) return <div className="text-center py-20">{t('movieNotFound')}</div>;

    return (
        <div ref={containerRef} className="min-h-screen pb-20 md:pb-8 relative overflow-hidden">
            {/* Efectos de fondo con posicionamiento mejorado */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <BackgroundBeams />
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2">
                    <Sparkles id="detail-sparkles-1" sparklesCount={8} />
                </div>
                <div className="absolute top-1/2 right-1/4 w-1/3 h-1/3">
                    <Sparkles id="detail-sparkles-2" sparklesCount={6} />
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-1/4 h-1/4">
                    <Sparkles id="detail-sparkles-3" sparklesCount={5} />
                </div>
            </div>

            {/* Seccion Hero con fondo de imagen mejorado */}
            <motion.div 
                ref={heroRef}
                style={{ opacity, scale }}
                className="relative h-[60vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] overflow-hidden"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ 
                        backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : ''})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/50 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/90" />
                </div>

                {/* Efecto Spotlight de iluminacion */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 opacity-20" fill="white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 container mx-auto flex flex-col md:flex-row items-end gap-4 md:gap-8 z-20">
                    {/* Poster principal de la pelicula */}
                    <motion.img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-24 h-36 sm:w-32 sm:h-48 md:w-48 md:h-72 lg:w-64 lg:h-96 rounded-xl shadow-2xl border-4 border-white dark:border-slate-800 hidden sm:block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    />
                    
                    {/* Informacion principal del hero */}
                    <div className="flex-1 text-white space-y-3 sm:space-y-4 mb-4 w-full">
                        <TextGenerateEffect 
                            words={movie.Title}
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                            duration={0.15}
                        />
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base text-slate-200">
                            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                                <span className="flex items-center bg-yellow-500/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                                    <Star className="text-yellow-400 mr-1" size={14} /> 
                                    <span className="font-semibold">{movie.imdbRating}</span>
                                </span>
                            )}
                            <span className="flex items-center bg-slate-800/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                                <Calendar className="mr-1" size={14} /> 
                                {movie.Year}
                            </span>
                            {movie.Runtime && movie.Runtime !== 'N/A' && (
                                <span className="flex items-center bg-slate-800/50 px-2 py-1 rounded-lg backdrop-blur-sm">
                                    <Clock className="mr-1" size={14} /> 
                                    {movie.Runtime}
                                </span>
                            )}
                            {movie.Rated && movie.Rated !== 'N/A' && (
                                <span className="px-2 py-1 bg-red-600/80 rounded-lg text-xs font-semibold backdrop-blur-sm">{movie.Rated}</span>
                            )}
                        </div>
                        {movie.Genre && movie.Genre !== 'N/A' && (
                            <div className="flex flex-wrap gap-2">
                                {movie.Genre.split(', ').map(g => (
                                    <motion.span 
                                        key={g} 
                                        className="px-3 py-1 bg-primary-600/80 rounded-full text-xs sm:text-sm backdrop-blur-md border border-primary-400/30"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        {g}
                                    </motion.span>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Botones de accion principales */}
                    <div className="mb-4 flex space-x-3 sm:space-x-4">
                        <FavoriteButton movie={movie} className="w-10 h-10 sm:w-12 sm:h-12 !p-2 sm:!p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm" />
                        <motion.button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: movie.Title,
                                        text: `¡Mira ${movie.Title} en Cine Nexus!`,
                                        url: window.location.href,
                                    });
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert('Enlace copiado al portapapeles');
                                }
                            }}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                            aria-label={t('share')}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Share2 size={18} className="sm:w-5 sm:h-5" />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 grid md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                {/* Columna principal con informacion detallada */}
                <div className="md:col-span-2 space-y-6 md:space-y-8">
                    {/* Sinopsis */}
                    {movie.Plot && movie.Plot !== 'N/A' && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50"
                        >
                            <TextGenerateEffect 
                                words={t('plot')}
                                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2"
                                duration={0.2}
                            />
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg text-justify sm:text-left max-w-none">{movie.Plot}</p>
                        </motion.section>
                    )}

                    {/* Reparto y Equipo */}
                    {(movie.Director || movie.Writer || movie.Actors) && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50"
                        >
                            <TextGenerateEffect 
                                words={t('castCrew')}
                                className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4"
                                duration={0.2}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {movie.Director && movie.Director !== 'N/A' && (
                                    <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                        <User className="text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" size={20} />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">{t('director')}</h3>
                                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed break-words">{movie.Director}</p>
                                        </div>
                                    </div>
                                )}
                                {movie.Writer && movie.Writer !== 'N/A' && (
                                    <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                        <PenTool className="text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" size={20} />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">{t('writers')}</h3>
                                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed break-words">{movie.Writer}</p>
                                        </div>
                                    </div>
                                )}
                                {movie.Actors && movie.Actors !== 'N/A' && (
                                    <div className="sm:col-span-2 flex items-start space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                        <Users className="text-pink-600 dark:text-pink-400 mt-0.5 flex-shrink-0" size={20} />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">{t('actors')}</h3>
                                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed break-words">{movie.Actors}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    )}

                    {/* Informacion adicional */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">Informacion Adicional</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {movie.Language && movie.Language !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                    <LanguagesIcon className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Idioma</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white break-words">{movie.Language}</p>
                                    </div>
                                </div>
                            )}
                            {movie.Country && movie.Country !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                    <Globe className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Pais</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white break-words">{movie.Country}</p>
                                    </div>
                                </div>
                            )}
                            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                    <DollarSign className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Taquilla</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white break-words">{movie.BoxOffice}</p>
                                    </div>
                                </div>
                            )}
                            {movie.Production && movie.Production !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                    <Box className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Produccion</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white break-words">{movie.Production}</p>
                                    </div>
                                </div>
                            )}
                            {movie.Released && movie.Released !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                    <Calendar className="text-red-600 dark:text-red-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Fecha de Estreno</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white break-words">{movie.Released}</p>
                                    </div>
                                </div>
                            )}
                            {movie.DVD && movie.DVD !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-700/50">
                                    <Film className="text-indigo-600 dark:text-indigo-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Fecha DVD</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white break-words">{movie.DVD}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.section>

                    {/* Seccion de trailer */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
                    >
                        <TextGenerateEffect 
                            words={t('trailer')}
                            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4"
                            duration={0.2}
                        />
                        <motion.div 
                            className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${movie.Poster})` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <motion.div 
                                className="z-10 bg-red-600 p-4 sm:p-6 rounded-full group-hover:scale-110 transition-transform shadow-2xl"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                                <Film className="text-white w-7 h-7 sm:w-8 sm:h-8" />
                            </motion.div>
                            <p className="absolute bottom-4 text-white text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity z-10 px-4 py-2 bg-black/50 rounded-lg backdrop-blur-sm">{t('watchTrailer')}</p>
                        </motion.div>
                    </motion.section>
                </div>

                {/* Columna lateral con calificaciones */}
                <div className="space-y-4 md:space-y-6">
                    <motion.div 
                        className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                        <div className="flex items-center space-x-2 mb-4">
                            <Award className="text-yellow-500" size={24} />
                            <TextGenerateEffect 
                                words={t('ratings')}
                                className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white"
                                duration={0.2}
                            />
                        </div>
                        <div className="space-y-3">
                            {movie.Ratings && movie.Ratings.length > 0 && movie.Ratings.map((r) => (
                                <div key={r.Source} className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 last:border-0">
                                    <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">{r.Source}</span>
                                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white bg-primary-500/10 px-2 py-1 rounded">{r.Value}</span>
                                </div>
                            ))}
                            {movie.Metascore && movie.Metascore !== 'N/A' && (
                                <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-200 dark:border-slate-700">
                                    <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Metascore</span>
                                    <span className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg ${parseInt(movie.Metascore) > 60 ? 'bg-green-500 text-white' :
                                        parseInt(movie.Metascore) > 40 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                                        }`}>{movie.Metascore}</span>
                                </div>
                            )}
                            {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">Votos IMDB</span>
                                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{movie.imdbVotes}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
