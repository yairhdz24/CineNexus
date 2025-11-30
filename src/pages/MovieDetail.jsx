import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { fetchMovieDetails } from '../utils/api';
import FavoriteButton from '../components/FavoriteButton';
import { Star, Calendar, Clock, Film, Share2, Users, User, PenTool, Award, Globe, DollarSign, ArrowLeft, Play, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Página de detalle de película
 * Muestra toda la información de una película o serie seleccionada
 */
export default function MovieDetail() {
    const { id } = useParams();
    const { t } = useLanguage();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            if (!id) {
                setError('ID de película no proporcionado');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            
            try {
                const data = await fetchMovieDetails(id);
                
                if (data && data.Response === 'True') {
                setMovie(data);
                } else {
                    setError(data?.Error || 'No se encontró la película');
                }
            } catch (err) {
                console.error('Error loading movie:', err);
                setError('Error al cargar los detalles');
            } finally {
                setLoading(false);
            }
        };
        
        loadDetails();
    }, [id]);

    // Estado de carga
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">{t('loading')}</p>
                </div>
            </div>
        );
    }

    // Estado de error
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
                <div className="text-center max-w-md">
                    <Film size={64} className="mx-auto text-slate-400 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Error</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Volver al inicio
                    </Link>
                </div>
            </div>
        );
    }

    // Sin película
    if (!movie) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <p className="text-slate-600 dark:text-slate-400">{t('movieNotFound')}</p>
            </div>
        );
    }

    const hasPoster = movie.Poster && movie.Poster !== 'N/A';
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.Title} ${movie.Year || ''} official trailer`)}`;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
            {/* Hero con fondo de imagen */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                {/* Imagen de fondo */}
                {hasPoster && (
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${movie.Poster})` }}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
                
                {/* Botón de regreso */}
                <Link 
                    to="/"
                    className="absolute top-20 left-4 md:left-8 z-20 p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-colors"
                >
                    <ArrowLeft size={24} />
                </Link>

                {/* Contenido del hero */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto flex flex-col md:flex-row gap-6 md:gap-10 items-end">
                        {/* Poster */}
                        {hasPoster && (
                    <motion.img
                        src={movie.Poster}
                        alt={movie.Title}
                                className="w-32 h-48 md:w-48 md:h-72 lg:w-56 lg:h-84 rounded-2xl shadow-2xl border-4 border-white/20 object-cover hidden sm:block"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            />
                        )}

                        {/* Info principal */}
                        <div className="flex-1 text-white space-y-4">
                            <motion.h1 
                                className="text-3xl md:text-5xl lg:text-6xl font-bold"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {movie.Title}
                            </motion.h1>

                            {/* Badges de info */}
                            <motion.div 
                                className="flex flex-wrap gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/20 backdrop-blur-sm rounded-lg text-sm font-semibold">
                                        <Star size={16} className="text-yellow-400" fill="currentColor" />
                                        {movie.imdbRating}/10
                                </span>
                            )}
                            {movie.Year && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-sm">
                                        <Calendar size={16} />
                                    {movie.Year}
                                </span>
                            )}
                            {movie.Runtime && movie.Runtime !== 'N/A' && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-lg text-sm">
                                        <Clock size={16} />
                                    {movie.Runtime}
                                </span>
                            )}
                            {movie.Rated && movie.Rated !== 'N/A' && (
                                    <span className="px-3 py-1.5 bg-red-500/80 rounded-lg text-sm font-bold">
                                        {movie.Rated}
                                    </span>
                            )}
                            </motion.div>

                            {/* Géneros */}
                        {movie.Genre && movie.Genre !== 'N/A' && (
                                <motion.div 
                                    className="flex flex-wrap gap-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {movie.Genre.split(', ').map(genre => (
                                        <span 
                                            key={genre}
                                            className="px-4 py-1.5 bg-primary-600/80 backdrop-blur-sm rounded-full text-sm font-medium"
                                        >
                                            {genre}
                                        </span>
                                    ))}
                                </motion.div>
                            )}

                            {/* Botones de acción */}
                            <motion.div 
                                className="flex gap-3 pt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <FavoriteButton movie={movie} />
                                <button
                            onClick={() => {
                                if (navigator.share) {
                                            navigator.share({ title: movie.Title, url: window.location.href });
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                        }
                                    }}
                                    className="p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors"
                                >
                                    <Share2 size={20} />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="container mx-auto px-4 md:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Columna principal */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Sinopsis */}
                    <motion.section
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                                <Film className="text-primary-500" size={28} />
                                {t('plot')}
                            </h2>
                            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                                {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'Sinopsis no disponible.'}
                            </p>
                    </motion.section>

                        {/* Reparto y equipo */}
                    <motion.section
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <Users className="text-primary-500" size={28} />
                                {t('castCrew')}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {movie.Director && movie.Director !== 'N/A' && (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <User className="text-blue-500" size={20} />
                                            <span className="font-semibold text-slate-900 dark:text-white">{t('director')}</span>
                                    </div>
                                        <p className="text-slate-600 dark:text-slate-400 pl-8">{movie.Director}</p>
                                </div>
                            )}
                                {movie.Writer && movie.Writer !== 'N/A' && (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <PenTool className="text-purple-500" size={20} />
                                            <span className="font-semibold text-slate-900 dark:text-white">{t('writers')}</span>
                                    </div>
                                        <p className="text-slate-600 dark:text-slate-400 pl-8">{movie.Writer}</p>
                                </div>
                            )}
                                {movie.Actors && movie.Actors !== 'N/A' && (
                                    <div className="md:col-span-2 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Users className="text-pink-500" size={20} />
                                            <span className="font-semibold text-slate-900 dark:text-white">{t('actors')}</span>
                                    </div>
                                        <p className="text-slate-600 dark:text-slate-400 pl-8">{movie.Actors}</p>
                                </div>
                            )}
                        </div>
                    </motion.section>

                        {/* Tráiler */}
                    <motion.section
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <Play className="text-red-500" size={28} />
                                {t('trailer')}
                            </h2>
                            
                            {/* Botón de tráiler con preview */}
                            <a 
                                href={youtubeSearchUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
                                    {hasPoster && (
                                        <>
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"
                                                style={{ backgroundImage: `url(${movie.Poster})` }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        </>
                                    )}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <motion.div 
                                            className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Play size={36} className="text-white ml-1" fill="currentColor" />
                                        </motion.div>
                                        <p className="mt-4 text-white font-semibold flex items-center gap-2">
                                            {t('watchTrailer')}
                                            <ExternalLink size={16} />
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </motion.section>

                        {/* Información adicional */}
                        <motion.section
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <Globe className="text-primary-500" size={28} />
                                Información Adicional
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {movie.Language && movie.Language !== 'N/A' && (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Idioma</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{movie.Language}</p>
                                </div>
                            )}
                                {movie.Country && movie.Country !== 'N/A' && (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">País</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{movie.Country}</p>
                                </div>
                            )}
                            {movie.Released && movie.Released !== 'N/A' && (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Fecha de Estreno</p>
                                        <p className="font-semibold text-slate-900 dark:text-white">{movie.Released}</p>
                                    </div>
                                )}
                                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl flex items-center gap-3">
                                        <DollarSign className="text-green-500" size={24} />
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Taquilla</p>
                                            <p className="font-semibold text-slate-900 dark:text-white">{movie.BoxOffice}</p>
                                </div>
                                    </div>
                                )}
                            </div>
                    </motion.section>
                </div>

                    {/* Sidebar con calificaciones */}
                    <div className="space-y-6">
                    <motion.div 
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-700 sticky top-24"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Award className="text-yellow-500" size={24} />
                                {t('ratings')}
                            </h3>
                            
                            <div className="space-y-4">
                                {/* Rating principal de IMDB */}
                                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                                    <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Star className="text-yellow-500" size={32} fill="currentColor" />
                                            <span className="text-4xl font-bold text-slate-900 dark:text-white">{movie.imdbRating}</span>
                                            <span className="text-slate-500">/10</span>
                                        </div>
                                        {movie.imdbVotes && movie.imdbVotes !== 'N/A' && (
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                {movie.imdbVotes} votos
                                            </p>
                                        )}
                        </div>
                                )}

                                {/* Otras calificaciones */}
                                {movie.Ratings && movie.Ratings.length > 0 && movie.Ratings.map((rating) => (
                                    <div 
                                        key={rating.Source}
                                        className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl"
                                    >
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{rating.Source}</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{rating.Value}</span>
                                </div>
                            ))}

                                {/* Metascore */}
                            {movie.Metascore && movie.Metascore !== 'N/A' && (
                                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                                        <span className="text-sm text-slate-600 dark:text-slate-400">Metascore</span>
                                        <span className={`px-3 py-1 rounded-lg font-bold text-white ${
                                            parseInt(movie.Metascore) >= 60 ? 'bg-green-500' :
                                            parseInt(movie.Metascore) >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}>
                                            {movie.Metascore}
                                        </span>
                            </div>
                            )}

                                {/* Premios */}
                                {movie.Awards && movie.Awards !== 'N/A' && (
                                    <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl mt-4">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Premios</p>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{movie.Awards}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
