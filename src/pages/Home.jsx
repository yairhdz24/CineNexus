import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../utils/api';
import { ArrowRight, TrendingUp, Tv, Film, Popcorn, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Vortex } from '../components/ui/Vortex';

export default function Home() {
    const { t } = useLanguage();
    const [trending, setTrending] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                const [trendingData, seriesData] = await Promise.all([
                    fetchMovies('marvel', 1, 'movie'),
                    fetchMovies('star wars', 1, 'series')
                ]);
                if (trendingData.Search) setTrending(trendingData.Search.slice(0, 10));
                if (seriesData.Search) setSeries(seriesData.Search.slice(0, 10));
            } catch (error) {
                console.error("Failed to load home data", error);
            } finally {
                setLoading(false);
            }
        };
        loadHomeData();
    }, []);

    return (
        <div className="min-h-screen pb-20 md:pb-0 bg-slate-50 dark:bg-slate-950">
            {/* Hero con Vortex */}
            <section className="relative w-full h-[500px] md:h-[550px] overflow-hidden">
                <Vortex
                    backgroundColor="transparent"
                    baseHue={280}
                    rangeHue={60}
                    particleCount={500}
                    baseSpeed={0.1}
                    rangeSpeed={1.2}
                    containerClassName="absolute inset-0"
                    className="h-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/90" />
                </Vortex>

                <div className="absolute inset-0 z-20">
                    <div className="container mx-auto px-4 h-full flex items-center">
                        <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                            {/* Text */}
                            <div className="text-center lg:text-left">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4"
                                >
                                    <span className="block text-white mb-2">{t('welcomeTo')}</span>
                                    <motion.span 
                                        className="block"
                                        style={{
                                            background: 'linear-gradient(90deg, #a78bfa, #f472b6, #22d3ee, #a78bfa)',
                                            backgroundSize: '200% auto',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                        animate={{ backgroundPosition: ['0% center', '200% center'] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                    >
                                        Cine Nexus
                                    </motion.span>
                                </motion.h1>
                                
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-6"
                                >
                                    {t('subtitle')}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex flex-wrap justify-center lg:justify-start gap-3"
                                >
                                    <Link to="/movies" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-all shadow-lg hover:-translate-y-0.5">
                                        <Film size={18} /> {t('movies')}
                                    </Link>
                                    <Link to="/series" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 text-white text-sm font-bold hover:bg-white/30 transition-all hover:-translate-y-0.5 backdrop-blur-sm">
                                        <Tv size={18} /> {t('series')}
                                    </Link>
                                    <Link to="/favorites" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold transition-all shadow-lg hover:-translate-y-0.5">
                                        <Popcorn size={18} /> {t('favorites')}
                                    </Link>
                                </motion.div>
                            </div>

                            {/* 3 Cards Draggables */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="hidden md:flex justify-center lg:justify-end"
                            >
                                <div className="relative flex items-end gap-4">
                                    {(trending.length >= 3 ? trending.slice(0, 3) : [null, null, null]).map((movie, index) => (
                                        <motion.div
                                            key={movie?.imdbID || index}
                                            className={`relative cursor-grab active:cursor-grabbing ${index === 1 ? 'z-20' : 'z-10'}`}
                                            style={{ marginTop: index === 1 ? 0 : index === 0 ? '1.5rem' : '2.5rem' }}
                                            drag
                                            dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                                            dragElastic={0.1}
                                            whileDrag={{ scale: 1.1, zIndex: 30, rotate: 5 }}
                                            whileHover={{ scale: 1.08, y: -10, rotate: index === 0 ? -5 : index === 2 ? 5 : 0 }}
                                            initial={{ opacity: 0, y: 50, rotate: index === 0 ? -8 : index === 2 ? 8 : 0 }}
                                            animate={{ opacity: 1, y: 0, rotate: index === 0 ? -5 : index === 2 ? 5 : 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 + index * 0.15, type: "spring" }}
                                        >
                                            <div className={`w-28 h-40 sm:w-32 sm:h-48 md:w-36 md:h-52 rounded-xl overflow-hidden bg-slate-800 border-4 border-white/20 shadow-2xl ${index === 1 ? 'ring-4 ring-violet-500/50' : ''}`}>
                                                {movie?.Poster && movie.Poster !== 'N/A' ? (
                                                    <Link to={`/movie/${movie.imdbID}`}>
                                                        <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" draggable={false} />
                                                    </Link>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-slate-500">
                                                        <Film size={32} />
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-30" />
            </section>

            {/* Content */}
            <main className="container mx-auto px-4 py-8 space-y-12">
                {/* Películas en Tendencia */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                                <TrendingUp className="text-violet-600 dark:text-violet-400" size={24} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{t('trending')}</h2>
                        </div>
                        <Link to="/movies" className="flex items-center gap-2 px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-medium rounded-xl hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors">
                            {t('seeAll')} <ArrowRight size={18} />
                        </Link>
                    </div>
                    
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-violet-500" />
                            <span className="ml-3 text-slate-500">{t('loading')}</span>
                        </div>
                    ) : (
                        <MovieList movies={trending} loading={false} />
                    )}
                </section>

                {/* Series Populares */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                                <Tv className="text-pink-600 dark:text-pink-400" size={24} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{t('popularSeries')}</h2>
                        </div>
                        <Link to="/series" className="flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 font-medium rounded-xl hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors">
                            {t('seeAll')} <ArrowRight size={18} />
                        </Link>
                    </div>
                    
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-pink-500" />
                            <span className="ml-3 text-slate-500">{t('loading')}</span>
                        </div>
                    ) : (
                        <MovieList movies={series} loading={false} />
                    )}
                </section>
            </main>
        </div>
    );
}
