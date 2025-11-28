import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'motion/react';
import { fetchMovieDetails } from '../utils/api';
import FavoriteButton from '../components/FavoriteButton';
import MovieList from '../components/MovieList';
import { Star, Calendar, Clock, Film } from 'lucide-react';
import { Spotlight } from '../components/ui/Spotlight';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';
import { Sparkles } from '../components/ui/Sparkles';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';

export default function MovieDetail() {
    const { id } = useParams();
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
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

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

    if (!movie) return <div className="text-center py-20">Movie not found</div>;

    return (
        <div className="min-h-screen pb-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <BackgroundBeams />
                <Sparkles id="detail-sparkles" sparklesCount={25} />
            </div>

            {/* Hero Section with Backdrop */}
            <motion.div 
                ref={heroRef}
                style={{ opacity, scale }}
                className="relative h-[50vh] md:h-[70vh] overflow-hidden"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : ''})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent backdrop-blur-sm" />
                </div>

                {/* Spotlight Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spotlight className="-top-40 left-0 md:left-60 md:-top-20 opacity-20" fill="white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 container mx-auto flex flex-col md:flex-row items-end gap-8 z-20">
                    <motion.img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-32 md:w-64 rounded-lg shadow-2xl border-4 border-white dark:border-slate-800 hidden md:block"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    />
                    <div className="flex-1 text-white space-y-4 mb-4">
                        <TextGenerateEffect 
                            words={movie.Title}
                            className="text-4xl md:text-6xl font-bold"
                            duration={0.15}
                        />
                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-slate-300">
                            <span className="flex items-center"><Star className="text-yellow-400 mr-1" size={16} /> {movie.imdbRating}</span>
                            <span className="flex items-center"><Calendar className="mr-1" size={16} /> {movie.Year}</span>
                            <span className="flex items-center"><Clock className="mr-1" size={16} /> {movie.Runtime}</span>
                            <span className="px-2 py-1 bg-slate-800 rounded text-xs">{movie.Rated}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {movie.Genre.split(', ').map(g => (
                                <span key={g} className="px-3 py-1 bg-primary-600/80 rounded-full text-sm backdrop-blur-md">{g}</span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4 flex space-x-4">
                        <FavoriteButton movie={movie} className="w-12 h-12 !p-3 bg-white/10 hover:bg-white/20" />
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: movie.Title,
                                        text: `Check out ${movie.Title} on MovieStream!`,
                                        url: window.location.href,
                                    });
                                } else {
                                    alert('Web Share API not supported in this browser');
                                }
                            }}
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
                            aria-label="Share"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-8 relative z-10">
                <div className="md:col-span-2 space-y-8">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <TextGenerateEffect 
                            words="Plot"
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                            duration={0.2}
                        />
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{movie.Plot}</p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <TextGenerateEffect 
                            words="Cast & Crew"
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                            duration={0.2}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">Director</h3>
                                <p className="text-slate-600 dark:text-slate-400">{movie.Director}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">Writers</h3>
                                <p className="text-slate-600 dark:text-slate-400">{movie.Writer}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <h3 className="font-semibold text-slate-900 dark:text-white">Actors</h3>
                                <p className="text-slate-600 dark:text-slate-400">{movie.Actors}</p>
                            </div>
                        </div>
                    </section>

                    {/* Trailer Placeholder */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <TextGenerateEffect 
                            words="Trailer"
                            className="text-2xl font-bold text-slate-900 dark:text-white mb-4"
                            duration={0.2}
                        />
                        <motion.div 
                            className="aspect-video bg-black rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${movie.Poster})` }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <motion.div 
                                className="z-10 bg-red-600 p-4 rounded-full group-hover:scale-110 transition-transform"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                            >
                                <Film className="text-white" size={32} />
                            </motion.div>
                            <p className="absolute bottom-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">Watch Trailer (Demo)</p>
                        </motion.div>
                    </motion.section>
                </div>

                <div className="space-y-6">
                    <motion.div 
                        className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                        <TextGenerateEffect 
                            words="Ratings"
                            className="font-bold text-slate-900 dark:text-white mb-4"
                            duration={0.2}
                        />
                        <div className="space-y-3">
                            {movie.Ratings.map((r) => (
                                <div key={r.Source} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-2 last:border-0">
                                    <span className="text-sm text-slate-600 dark:text-slate-400">{r.Source}</span>
                                    <span className="font-medium text-slate-900 dark:text-white">{r.Value}</span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-sm text-slate-600 dark:text-slate-400">Metascore</span>
                                <span className={`font-bold px-2 py-0.5 rounded ${parseInt(movie.Metascore) > 60 ? 'bg-green-500 text-white' :
                                    parseInt(movie.Metascore) > 40 ? 'bg-yellow-500 text-black' : 'bg-red-500 text-white'
                                    }`}>{movie.Metascore}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
