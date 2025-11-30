import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../utils/api';
import { ArrowRight, TrendingUp, Tv, Film, Popcorn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
    const { t } = useLanguage();
    const [trending, setTrending] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                // Cargar películas y series populares
                const [trendingData, seriesData] = await Promise.all([
                    fetchMovies('marvel', 1, 'movie'),
                    fetchMovies('star wars', 1, 'series')
                ]);

                // Mostrar 10 resultados en cada sección
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
            {/* Hero principal */}
            <section className="relative w-full overflow-hidden">
                {/* Fondo con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-slate-950" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

                <div className="relative z-10 container mx-auto px-4 pt-28 pb-16 md:pt-32 md:pb-24">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        {/* Texto principal */}
                        <div className="text-center lg:text-left">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl mb-8"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-sm text-white/90 font-medium">
                                    Cine Nexus • Tu portal de entretenimiento
                                </span>
                            </motion.div>

                            {/* Título con "Cine Nexus" animado */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
                            >
                                <span className="block text-white mb-2">
                                    Bienvenido a
                                </span>
                                <motion.span 
                                    className="block"
                                    style={{
                                        background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
                                        backgroundSize: '200% auto',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                    animate={{
                                        backgroundPosition: ['0% center', '200% center'],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                >
                                    Cine Nexus
                                </motion.span>
                            </motion.h1>
                            
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-lg md:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-10"
                            >
                                {t('subtitle')}
                            </motion.p>

                            {/* Chips de acceso rápido */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="flex flex-wrap justify-center lg:justify-start gap-4"
                            >
                                <Link
                                    to="/search?q=marvel"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-bold hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <Film size={18} />
                                    <span>Películas Marvel</span>
                                </Link>
                                <Link
                                    to="/search?q=star wars&type=series"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/80 backdrop-blur-sm text-white text-sm font-bold hover:bg-slate-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <Tv size={18} />
                                    <span>Series Star Wars</span>
                                </Link>
                                <Link
                                    to="/favorites"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold hover:from-amber-400 hover:to-orange-400 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <Popcorn size={18} />
                                    <span>{t('favorites')}</span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* 3 Cards animadas interactivas */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden md:flex justify-center lg:justify-end"
                        >
                            <div className="relative flex items-end gap-4 lg:gap-6">
                                {(trending.length >= 3 ? trending.slice(0, 3) : [null, null, null]).map((movie, index) => (
                                    <motion.div
                                        key={movie?.imdbID || index}
                                        className={`relative cursor-grab active:cursor-grabbing ${
                                            index === 0 ? 'z-10' : index === 1 ? 'z-20' : 'z-10'
                                        }`}
                                        style={{
                                            marginTop: index === 1 ? 0 : index === 0 ? '2rem' : '3rem',
                                        }}
                                        drag
                                        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                                        dragElastic={0.1}
                                        whileDrag={{ scale: 1.1, zIndex: 30, rotate: 5 }}
                                        whileHover={{ 
                                            scale: 1.08, 
                                            y: -15,
                                            rotate: index === 0 ? -5 : index === 2 ? 5 : 0,
                                            transition: { type: "spring", stiffness: 300 }
                                        }}
                                        initial={{ 
                                            opacity: 0, 
                                            y: 50,
                                            rotate: index === 0 ? -8 : index === 2 ? 8 : 0
                                        }}
                                        animate={{ 
                                            opacity: 1, 
                                            y: 0,
                                            rotate: index === 0 ? -5 : index === 2 ? 5 : 0
                                        }}
                                        transition={{ 
                                            duration: 0.6, 
                                            delay: 0.4 + index * 0.15,
                                            type: "spring"
                                        }}
                                    >
                                        <div className={`
                                            w-28 h-40 sm:w-32 sm:h-48 md:w-36 md:h-52 lg:w-44 lg:h-64
                                            rounded-2xl overflow-hidden bg-slate-800 
                                            border-4 border-white/20 shadow-2xl
                                            ${index === 1 ? 'ring-4 ring-primary-500/50' : ''}
                                        `}>
                                            {movie && movie.Poster && movie.Poster !== 'N/A' ? (
                                                <Link to={`/movie/${movie.imdbID}`}>
                                                    <img
                                                        src={movie.Poster}
                                                        alt={movie.Title}
                                                        className="w-full h-full object-cover"
                                                        draggable={false}
                                                    />
                                                </Link>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-slate-500">
                                                    <Film size={32} className="mb-2" />
                                                    <span className="text-xs text-center px-2">Cargando...</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Efecto de brillo */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-white/10 pointer-events-none" />
                                        
                                        {/* Título debajo de la card central */}
                                        {index === 1 && movie && (
                                            <motion.p 
                                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-xs font-semibold whitespace-nowrap bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1 }}
                                            >
                                                {movie.Title?.substring(0, 20)}{movie.Title?.length > 20 ? '...' : ''}
                                            </motion.p>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                {/* Gradiente de transición */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent" />
            </section>

            {/* Contenido principal */}
            <main className="container mx-auto px-4 py-12 space-y-20">
                {/* Sección de películas en tendencia */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 shadow-lg shadow-primary-500/30"
                            >
                                <TrendingUp className="text-white" size={28} />
                            </motion.div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                    {t('trending')}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                    Lo más popular esta semana
                                </p>
                            </div>
                        </div>
                        <Link 
                            to="/search?q=marvel&type=movie" 
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:-translate-y-0.5"
                        >
                            {t('seeAll')} 
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <MovieList movies={trending} loading={loading} />
                </motion.section>

                {/* Sección de series populares */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30"
                            >
                                <Tv className="text-white" size={28} />
                            </motion.div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                    {t('popularSeries')}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                                    Series que no te puedes perder
                                </p>
                            </div>
                        </div>
                        <Link 
                            to="/search?q=star wars&type=series" 
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold shadow-lg hover:shadow-xl transition-all border border-slate-200 dark:border-slate-700 hover:-translate-y-0.5"
                        >
                            {t('seeAll')} 
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <MovieList movies={series} loading={loading} />
                </motion.section>
            </main>
        </div>
    );
}
