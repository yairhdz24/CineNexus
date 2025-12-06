import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { fetchMovieDetails, fetchMovies } from '../utils/api';
import FavoriteButton from '../components/FavoriteButton';
import CategorySection from '../components/CategorySection';
import { Star, Calendar, Clock, Film, Share2, Award, ArrowLeft, User, PenTool, Users, Globe, DollarSign, Play, ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MovieDetail() {
    const { id } = useParams();
    const { t } = useLanguage();
    const [movie, setMovie] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            if (!id) {
                setError(t('movieNotFound'));
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const data = await fetchMovieDetails(id);
                if (data && data.Response === 'True') {
                    setMovie(data);

                    // Cargar similares basados en el primer género
                    const firstGenre = data.Genre?.split(',')[0]?.trim();
                    if (firstGenre) {
                        const similarData = await fetchMovies(firstGenre, 1, data.Type || 'movie');
                        if (similarData.Search) {
                            setSimilarMovies(similarData.Search.slice(0, 5));
                        }
                    }
                } else {
                    setError(data?.Error || t('movieNotFound'));
                }
            } catch (err) {
                setError(t('errorLoading'));
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [id, t]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">{t('loading')}</p>
                </div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">
                <div className="text-center">
                    <Film size={48} className="mx-auto text-slate-400 mb-4" />
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('error')}</h2>
                    <p className="text-slate-500 mb-4">{error || t('movieNotFound')}</p>
                    <Link to="/" className="text-red-600 hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft size={18} /> {t('goBack')}
                    </Link>
                </div>
            </div>
        );
    }

    const hasPoster = movie.Poster && movie.Poster !== 'N/A';
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.Title} ${movie.Year || ''} trailer`)}`;

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
            {/* Hero */}
            <div className="relative bg-slate-900">
                {hasPoster && (
                    <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm" style={{ backgroundImage: `url(${movie.Poster})` }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900" />

                <div className="relative container mx-auto px-4 pt-32 pb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
                        <ArrowLeft size={20} /> {t('goBack')}
                    </Link>

                    <div className="flex flex-col md:flex-row gap-6">
                        {hasPoster && (
                            <motion.img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="w-48 md:w-56 rounded-xl shadow-2xl mx-auto md:mx-0"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            />
                        )}

                        <div className="flex-1 text-white">
                            <motion.h1 className="text-3xl md:text-4xl font-bold mb-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                {movie.Title}
                            </motion.h1>

                            <div className="flex flex-wrap items-center gap-3 mb-4 text-white/80">
                                {movie.Year && <span>{movie.Year}</span>}
                                {movie.Runtime && movie.Runtime !== 'N/A' && (
                                    <><span className="w-1 h-1 bg-white/50 rounded-full" /><span>{movie.Runtime}</span></>
                                )}
                                {movie.Rated && movie.Rated !== 'N/A' && (
                                    <><span className="w-1 h-1 bg-white/50 rounded-full" /><span className="px-2 py-0.5 bg-white/20 rounded text-sm">{movie.Rated}</span></>
                                )}
                            </div>

                            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex items-center gap-1.5 bg-yellow-500/20 px-3 py-1.5 rounded-lg">
                                        <Star className="text-yellow-400" size={20} fill="currentColor" />
                                        <span className="text-xl font-bold">{movie.imdbRating}</span>
                                        <span className="text-white/60">/10</span>
                                    </div>
                                    {movie.imdbVotes && <span className="text-white/50 text-sm">({movie.imdbVotes} {t('votes')})</span>}
                                </div>
                            )}

                            {movie.Genre && movie.Genre !== 'N/A' && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {movie.Genre.split(', ').map(g => (
                                        <span key={g} className="px-3 py-1 bg-red-600/80 rounded-full text-sm">{g}</span>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-3">
                                <FavoriteButton movie={movie} />
                                <button
                                    onClick={() => navigator.share ? navigator.share({ title: movie.Title, url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}
                                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                                    title={t('share')}
                                >
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Synopsis */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('plot')}</h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : t('synopsisNotAvailable')}
                            </p>
                        </div>

                        {/* Cast */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('castCrew')}</h2>
                            <div className="space-y-4">
                                {movie.Director && movie.Director !== 'N/A' && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                            <User className="text-red-600 dark:text-red-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('director')}</p>
                                            <p className="font-medium text-slate-900 dark:text-white">{movie.Director}</p>
                                        </div>
                                    </div>
                                )}
                                {movie.Writer && movie.Writer !== 'N/A' && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                                            <PenTool className="text-rose-600 dark:text-rose-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('writers')}</p>
                                            <p className="font-medium text-slate-900 dark:text-white">{movie.Writer}</p>
                                        </div>
                                    </div>
                                )}
                                {movie.Actors && movie.Actors !== 'N/A' && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                                            <Users className="text-pink-600 dark:text-pink-400" size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{t('actors')}</p>
                                            <p className="font-medium text-slate-900 dark:text-white">{movie.Actors}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Trailer */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('trailer')}</h2>
                            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video bg-slate-900 rounded-lg overflow-hidden group">
                                {hasPoster && (
                                    <>
                                        <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity" style={{ backgroundImage: `url(${movie.Poster})` }} />
                                        <div className="absolute inset-0 bg-black/40" />
                                    </>
                                )}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                        <Play size={28} className="text-white ml-1" fill="currentColor" />
                                    </div>
                                    <p className="mt-3 text-white text-sm font-medium flex items-center gap-1">
                                        {t('watchOnYouTube')} <ExternalLink size={14} />
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('information')}</h2>
                            <div className="space-y-4">
                                {movie.Released && movie.Released !== 'N/A' && (
                                    <div className="flex items-center gap-3">
                                        <Calendar className="text-orange-500" size={22} />
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{t('releaseDate')}</p>
                                            <p className="font-medium text-slate-900 dark:text-white">{movie.Released}</p>
                                        </div>
                                    </div>
                                )}
                                {movie.Country && movie.Country !== 'N/A' && (
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-red-500" size={22} />
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{t('country')}</p>
                                            <p className="font-medium text-slate-900 dark:text-white">{movie.Country}</p>
                                        </div>
                                    </div>
                                )}
                                {movie.Language && movie.Language !== 'N/A' && (
                                    <div className="flex items-center gap-3">
                                        <Globe className="text-green-500" size={22} />
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{t('language')}</p>
                                            <p className="font-medium text-slate-900 dark:text-white">{movie.Language}</p>
                                        </div>
                                    </div>
                                )}
                                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                                    <div className="flex items-center gap-3">
                                        <DollarSign className="text-green-600" size={22} />
                                        <div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{t('boxOffice')}</p>
                                            <p className="font-bold text-green-600">{movie.BoxOffice}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Award className="text-yellow-500" size={22} />
                                {t('ratings')}
                            </h2>
                            <div className="space-y-3">
                                {movie.Ratings && movie.Ratings.map((r) => (
                                    <div key={r.Source} className="flex justify-between items-center">
                                        <span className="text-slate-600 dark:text-slate-400 text-sm">{r.Source}</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{r.Value}</span>
                                    </div>
                                ))}
                                {movie.Metascore && movie.Metascore !== 'N/A' && (
                                    <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                                        <span className="text-slate-600 dark:text-slate-400 text-sm">Metascore</span>
                                        <span className={`px-3 py-1 rounded font-bold text-white ${parseInt(movie.Metascore) >= 60 ? 'bg-green-500' :
                                            parseInt(movie.Metascore) >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}>{movie.Metascore}</span>
                                    </div>
                                )}
                            </div>
                            {movie.Awards && movie.Awards !== 'N/A' && (
                                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <p className="text-xs text-slate-500 mb-1">🏆 {t('awards')}</p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300">{movie.Awards}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Similar Titles Section */}
                {similarMovies.length > 0 && (
                    <div className="mt-12">
                        <CategorySection
                            title={t('similarTitles') || "Títulos Similares"}
                            movies={similarMovies}
                            loading={false}
                            icon={Sparkles}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
