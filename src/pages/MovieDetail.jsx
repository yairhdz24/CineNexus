import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { fetchMovieDetails } from '../utils/api';
import FavoriteButton from '../components/FavoriteButton';
import MovieList from '../components/MovieList';
import { Star, Calendar, Clock, Film, Share2, Users, User, PenTool, Award, Globe, DollarSign, Box, Languages as LanguagesIcon, Play } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MovieDetail() {
    const { id } = useParams();
    const { t } = useLanguage();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            setLoading(true);
            setError(null);
            setMovie(null);
            
            if (!id) {
                console.error('MovieDetail: No ID provided in URL params');
                setError('ID de pelicula no proporcionado');
                setLoading(false);
                return;
            }
            
            console.log('MovieDetail: Starting to load details for ID:', id);
            
            try {
                const data = await fetchMovieDetails(id);
                console.log('MovieDetail: Data received from API:', {
                    hasData: !!data,
                    response: data?.Response,
                    hasImdbID: !!data?.imdbID,
                    title: data?.Title,
                    error: data?.Error
                });
                
                // Verificar si la respuesta es valida
                if (!data) {
                    setError('No se recibieron datos de la API');
                    setMovie(null);
                } else if (data.Response === 'False') {
                    const errorMsg = data.Error || 'No se pudo cargar la informacion de la pelicula';
                    console.error('API returned error:', errorMsg);
                    setError(errorMsg);
                    setMovie(null);
                } else if (data.imdbID) {
                    // Datos validos - establecer la pelicula
                    console.log('Setting movie data:', data.Title, data.imdbID);
                setMovie(data);
                    setError(null);
                } else {
                    console.error('Datos invalidos - no imdbID found:', data);
                    setError('Datos de pelicula invalidos o no encontrados. La API no retorno un ID valido.');
                    setMovie(null);
                }
            } catch (error) {
                console.error("Failed to load movie details", error);
                setError('Error al cargar los detalles de la pelicula: ' + (error.message || 'Error desconocido'));
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };
        
        loadDetails();
    }, [id]);

    const containerRef = useRef(null);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
                </div>
            </div>
        );
    }

    if (!loading && error && !movie) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-black">
                <div className="text-center max-w-md">
                    <Film size={64} className="mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Error al cargar
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    if (!loading && !movie) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-black">
                <div className="text-center max-w-md">
                    <Film size={64} className="mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {t('movieNotFound')}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        La pelicula o serie no se encontro.
                    </p>
                </div>
            </div>
        );
    }

    if (!movie) {
        return null;
    }

    return (
        <div ref={containerRef} className="min-h-screen pb-20 md:pb-8 relative bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-slate-950">
            {/* Hero Section - Estilo Cinépolis */}
            <div className="relative w-full">
                {/* Fondo con imagen de la pelicula - estilo cinematografico */}
                <div className="relative h-[85vh] md:h-[90vh] overflow-hidden">
                    {/* Imagen de fondo con blur y oscurecimiento */}
                    {movie.Poster && movie.Poster !== 'N/A' ? (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                            style={{ 
                                backgroundImage: `url(${movie.Poster})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            {/* Overlay oscuro para mejor legibilidad */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
                </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
                    )}

                    {/* Contenido del Hero - Layout estilo Cinépolis */}
                    <div className="relative z-10 h-full flex items-end">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 w-full">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
                                {/* Poster grande - estilo Cinépolis */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="flex-shrink-0"
                                >
                                    {movie.Poster && movie.Poster !== 'N/A' ? (
                                        <motion.img
                        src={movie.Poster}
                        alt={movie.Title}
                                            className="w-32 h-48 sm:w-40 sm:h-60 md:w-56 md:h-80 lg:w-64 lg:h-96 rounded-lg shadow-2xl border-2 border-white/20 object-cover"
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    ) : (
                                        <div className="w-32 h-48 sm:w-40 sm:h-60 md:w-56 md:h-80 lg:w-64 lg:h-96 rounded-lg bg-slate-800 flex items-center justify-center border-2 border-slate-700">
                                            <Film className="text-slate-600" size={48} />
                                        </div>
                                    )}
                                </motion.div>

                                {/* Informacion principal */}
                                <div className="flex-1 text-white space-y-4 md:space-y-6 pb-4">
                                    {/* Titulo */}
                                    <motion.h1
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                                    >
                                        {movie.Title || 'Sin titulo'}
                                    </motion.h1>

                                    {/* Informacion secundaria */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="flex flex-wrap items-center gap-3 sm:gap-4"
                                    >
                                        {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                                            <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-yellow-500/30">
                                                <Star className="text-yellow-400" size={18} fill="currentColor" />
                                                <span className="font-bold text-lg">{movie.imdbRating}</span>
                                                <span className="text-sm text-slate-300">/10</span>
                                            </div>
                                        )}
                                        {movie.Year && (
                                            <div className="flex items-center gap-2 text-slate-200">
                                                <Calendar size={18} />
                                                <span className="text-lg font-medium">{movie.Year}</span>
                        </div>
                                        )}
                                        {movie.Runtime && movie.Runtime !== 'N/A' && (
                                            <div className="flex items-center gap-2 text-slate-200">
                                                <Clock size={18} />
                                                <span className="text-lg font-medium">{movie.Runtime}</span>
                        </div>
                                        )}
                                        {movie.Rated && movie.Rated !== 'N/A' && (
                                            <div className="px-3 py-1.5 bg-red-600/80 rounded-lg text-sm font-bold border border-red-500/50">
                                                {movie.Rated}
                    </div>
                                        )}
                                    </motion.div>

                                    {/* Generos */}
                                    {movie.Genre && movie.Genre !== 'N/A' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                            className="flex flex-wrap gap-2"
                                        >
                                            {movie.Genre.split(', ').map((g, index) => (
                                                <span
                                                    key={g}
                                                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-colors"
                                                >
                                                    {g}
                                                </span>
                                            ))}
                                        </motion.div>
                                    )}

                                    {/* Botones de accion */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className="flex items-center gap-4 pt-2"
                                    >
                                        <FavoriteButton 
                                            movie={movie} 
                                            className="w-12 h-12 md:w-14 md:h-14 !p-0 bg-white/10 hover:bg-red-500/80 backdrop-blur-sm border border-white/20" 
                                        />
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
                                            className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm border border-white/20"
                                            aria-label={t('share')}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <Share2 size={20} />
                                        </motion.button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid md:grid-cols-3 gap-6 md:gap-8 relative z-10 bg-black">
                {/* Columna principal con informacion detallada */}
                <div className="md:col-span-2 space-y-6 md:space-y-8">
                    {/* Sinopsis - Siempre mostrar */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                            {t('plot')}
                        </h2>
                        {movie.Plot && movie.Plot !== 'N/A' && movie.Plot.trim() !== '' ? (
                            <p className="text-slate-300 leading-relaxed text-sm sm:text-base md:text-lg text-justify sm:text-left max-w-none whitespace-pre-wrap">{movie.Plot}</p>
                        ) : (
                            <div className="text-center py-8">
                                <Film className="mx-auto text-slate-600 mb-3" size={32} />
                                <p className="text-slate-500 italic">Sinopsis no disponible para esta pelicula o serie</p>
                            </div>
                        )}
                    </motion.section>

                    {/* Reparto y Equipo - Siempre mostrar la seccion */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                            {t('castCrew')}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {movie.Director && movie.Director !== 'N/A' ? (
                                <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <User className="text-primary-400 mt-0.5 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{t('director')}</h3>
                                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed break-words">{movie.Director}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <User className="text-slate-500 mt-0.5 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{t('director')}</h3>
                                        <p className="text-sm sm:text-base text-slate-500 italic">No disponible</p>
                                    </div>
                                </div>
                            )}
                            {movie.Writer && movie.Writer !== 'N/A' ? (
                                <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <PenTool className="text-purple-400 mt-0.5 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{t('writers')}</h3>
                                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed break-words">{movie.Writer}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <PenTool className="text-slate-500 mt-0.5 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{t('writers')}</h3>
                                        <p className="text-sm sm:text-base text-slate-500 italic">No disponible</p>
                                    </div>
                                </div>
                            )}
                            {movie.Actors && movie.Actors !== 'N/A' ? (
                                <div className="sm:col-span-2 flex items-start space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <Users className="text-pink-400 mt-0.5 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{t('actors')}</h3>
                                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed break-words">{movie.Actors}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="sm:col-span-2 flex items-start space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <Users className="text-slate-500 mt-0.5 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">{t('actors')}</h3>
                                        <p className="text-sm sm:text-base text-slate-500 italic">No disponible</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.section>

                    {/* Informacion adicional */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50"
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Informacion Adicional</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {movie.Language && movie.Language !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <LanguagesIcon className="text-blue-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-400 mb-1">Idioma</p>
                                        <p className="text-sm font-medium text-white break-words">{movie.Language}</p>
                                    </div>
                                </div>
                            )}
                            {movie.Country && movie.Country !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <Globe className="text-green-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-400 mb-1">Pais</p>
                                        <p className="text-sm font-medium text-white break-words">{movie.Country}</p>
                                    </div>
                                </div>
                            )}
                            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <DollarSign className="text-yellow-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-400 mb-1">Taquilla</p>
                                        <p className="text-sm font-medium text-white break-words">{movie.BoxOffice}</p>
                                    </div>
                                </div>
                            )}
                            {movie.Production && movie.Production !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <Box className="text-purple-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-400 mb-1">Produccion</p>
                                        <p className="text-sm font-medium text-white break-words">{movie.Production}</p>
                                    </div>
                                </div>
                            )}
                            {movie.Released && movie.Released !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <Calendar className="text-red-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-400 mb-1">Fecha de Estreno</p>
                                        <p className="text-sm font-medium text-white break-words">{movie.Released}</p>
                                    </div>
                                </div>
                            )}
                            {movie.DVD && movie.DVD !== 'N/A' && (
                                <div className="flex items-center space-x-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                                    <Film className="text-indigo-400 flex-shrink-0" size={20} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-slate-400 mb-1">Fecha DVD</p>
                                        <p className="text-sm font-medium text-white break-words">{movie.DVD}</p>
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
                        className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-slate-700/50 overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-white">
                                {t('trailer')}
                            </h2>
                            {movie.Title && (
                                <motion.button
                                    onClick={() => {
                                        const searchQuery = `${movie.Title} ${movie.Year || ''} official trailer`;
                                        const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
                                        window.open(youtubeUrl, '_blank');
                                    }}
                                    className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Film size={14} />
                                    <span>Buscar en YouTube</span>
                                </motion.button>
                            )}
                            </div>
                        
                        {/* Contenedor del trailer */}
                        <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
                            <motion.div 
                                className="w-full h-full flex items-center justify-center relative cursor-pointer"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => {
                                    const searchQuery = `${movie.Title} ${movie.Year || ''} official trailer`;
                                    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
                                    window.open(youtubeUrl, '_blank');
                                }}
                            >
                                {movie.Poster && movie.Poster !== 'N/A' ? (
                                    <>
                                        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${movie.Poster})` }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />
                                    </>
                                ) : (
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
                                )}
                                <motion.div 
                                    className="z-10 bg-red-600 p-5 sm:p-7 rounded-full group-hover:scale-110 transition-transform shadow-2xl border-4 border-white/20"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Play className="text-white w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="currentColor" />
                                </motion.div>
                                <p className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity z-10 px-4 py-2 bg-black/70 rounded-lg backdrop-blur-sm font-semibold">
                                    {t('watchTrailer')}
                                </p>
                            </motion.div>
                        </div>
                        
                        {/* Informacion del trailer */}
                        {movie.Title && (
                            <div className="mt-4 text-center">
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2">
                                    Haz clic en el boton de play para buscar el trailer en YouTube
                                </p>
                                <motion.button
                                    onClick={() => {
                                        const searchQuery = `${movie.Title} ${movie.Year || ''} official trailer`;
                                        const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
                                        window.open(youtubeUrl, '_blank');
                                    }}
                                    className="text-xs sm:text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Play size={16} fill="currentColor" />
                                    <span>Buscar Trailer en YouTube</span>
                                </motion.button>
                            </div>
                        )}
                    </motion.section>
                </div>

                {/* Columna lateral con calificaciones */}
                <div className="space-y-4 md:space-y-6">
                    <motion.div 
                        className="bg-slate-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-slate-700/50 shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="flex items-center space-x-2 mb-4">
                            <Award className="text-yellow-500" size={24} />
                            <h2 className="text-lg sm:text-xl font-bold text-white">
                                {t('ratings')}
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {movie.Ratings && movie.Ratings.length > 0 && movie.Ratings.map((r) => (
                                <div key={r.Source} className="flex justify-between items-center p-2 rounded-lg bg-slate-800/50 border-b border-slate-700 last:border-0">
                                    <span className="text-xs sm:text-sm text-slate-300 font-medium">{r.Source}</span>
                                    <span className="text-xs sm:text-sm font-bold text-white bg-primary-500/20 px-2 py-1 rounded">{r.Value}</span>
                                </div>
                            ))}
                            {movie.Metascore && movie.Metascore !== 'N/A' && (
                                <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-700">
                                    <span className="text-xs sm:text-sm text-slate-300 font-medium">Metascore</span>
                                    <span className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg ${parseInt(movie.Metascore) > 60 ? 'bg-green-500 text-white' :
                                    parseInt(movie.Metascore) > 40 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                                    }`}>{movie.Metascore}</span>
                            </div>
                            )}
                            {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-xs sm:text-sm text-slate-300 font-medium">Votos IMDB</span>
                                    <span className="text-xs sm:text-sm font-bold text-white">{movie.imdbVotes}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
