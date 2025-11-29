import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../utils/api';
import { ArrowRight, TrendingUp, Tv, Film, Popcorn, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';
import { Sparkles as SparklesBackground } from '../components/ui/Sparkles';
import StackList from '../components/ui/StackList';

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

                if (trendingData.Search) setTrending(trendingData.Search.slice(0, 5));
                if (seriesData.Search) setSeries(seriesData.Search.slice(0, 5));
            } catch (error) {
                console.error("Failed to load home data", error);
            } finally {
                setLoading(false);
            }
        };

        loadHomeData();
    }, []);

    return (
        <div className="min-h-screen pb-20 md:pb-0 relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-black">
            {/* Hero principal estilo cinepolis */}
            <section className="relative w-full overflow-hidden">
                {/* Fondo degradado cinematografico segun tema */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-black" />

                <div className="relative z-10 container mx-auto px-4 pt-28 pb-16 md:pt-28 md:pb-20">
                    <div className="grid md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-center">
                        {/* Texto principal */}
                        <div className="space-y-6 relative">
                            <SparklesBackground
                                id="hero-brand"
                                sparklesCount={28}
                                className="opacity-60 -inset-10"
                            />
                            {/* Etiqueta Cine Nexus con efecto cristal */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.05 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg shadow-slate-900/20"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs uppercase tracking-[0.2em] text-slate-100/80">
                                    Cine Nexus
                                </span>
                                <span className="text-[11px] text-slate-300/80">
                                    Cartelera en tiempo real
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                            >
                                {(() => {
                                    const full = t('welcome');
                                    const [first, ...rest] = full.split(' ');
                                    const restText = rest.join(' ');
                                    return (
                                        <>
                                            <span className="block text-hero-gradient">
                                                {first}
                                            </span>
                                            {restText && (
                                                <span className="block text-white">
                                                    {restText}
                                                </span>
                                            )}
                                        </>
                                    );
                                })()}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-sm sm:text-base md:text-lg text-slate-300 max-w-xl"
                            >
                                {t('subtitle')}
                            </motion.p>

                            {/* Chips de atajos rapidos */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-wrap gap-3 pt-2"
                            >
                                <Link
                                    to="/search?q=marvel"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition-colors"
                                >
                                    <Film size={16} />
                                    <span>Marvel</span>
                                </Link>
                                <Link
                                    to="/search?q=star wars&type=series"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-100 text-sm font-semibold hover:bg-slate-700 transition-colors"
                                >
                                    <Tv size={16} />
                                    <span>Star Wars</span>
                                </Link>
                                <Link
                                    to="/favorites"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/90 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
                                >
                                    <Popcorn size={16} />
                                    <span>{t('favorites')}</span>
                                </Link>
                            </motion.div>

                        </div>

                        {/* Carrusel sencillo de posters (usando las tendencias si existen) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hidden sm:flex justify-end"
                        >
                            <div className="flex gap-4 md:gap-6">
                                {(trending.length ? trending.slice(0, 3) : [null, null, null]).map((movie, index) => (
                                    <div
                                        key={index}
                                        className={`relative w-24 h-40 md:w-32 md:h-52 lg:w-36 lg:h-56 rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700 shadow-2xl ${
                                            index === 1 ? 'translate-y-4' : index === 2 ? 'translate-y-8' : ''
                                        }`}
                                    >
                                        {movie && movie.Poster && movie.Poster !== 'N/A' ? (
                                            <img
                                                src={movie.Poster}
                                                alt={movie.Title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                                                <Film size={32} className="mb-2" />
                                                <span className="text-xs text-center px-2">Cine Nexus</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-4 py-12 space-y-16 relative z-10">
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center space-x-4">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="p-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-purple-500/20"
                            >
                                <TrendingUp className="text-primary-600 dark:text-primary-400" size={24} />
                            </motion.div>
                            <div className="space-y-1">
                                <TextGenerateEffect 
                                    words={t('trending')}
                                    className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                                    duration={0.2}
                                />
                                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                                    Lo mas famoso hoy en Cine Nexus
                                </p>
                            </div>
                        </div>
                        <Link 
                            to="/search?q=marvel" 
                            className="btn-secondary flex items-center group hover:scale-105 transition-transform"
                        >
                            {t('seeAll')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <MovieList movies={trending} loading={loading} />
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center space-x-4">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                            >
                                <Tv className="text-purple-600 dark:text-purple-400" size={24} />
                            </motion.div>
                            <TextGenerateEffect 
                                words={t('popularSeries')}
                                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                                duration={0.2}
                            />
                        </div>
                        <Link 
                            to="/search?q=star wars&type=series" 
                            className="btn-secondary flex items-center group hover:scale-105 transition-transform"
                        >
                            {t('seeAll')} <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <MovieList movies={series} loading={loading} />
                </motion.section>
            </main>
        </div>
    );
}
