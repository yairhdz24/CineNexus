import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ParallaxHeader from '../components/ParallaxHeader';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../utils/api';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuroraBackground } from '../components/ui/AuroraBackground';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';

export default function Home() {
    const [trending, setTrending] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

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
        <div ref={containerRef} className="min-h-screen pb-20 md:pb-0 relative overflow-hidden">
            {/* Aurora Background for sections */}
            <div className="absolute inset-0 -z-10">
                <AuroraBackground showRadialGradient={true}>
                    <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50" />
                </AuroraBackground>
            </div>

            <motion.div style={{ opacity, scale }}>
                <ParallaxHeader
                    title="Bienvenido a Cine Nexus"
                    subtitle="Descubre millones de películas, series y personas. Explora ahora."
                />
            </motion.div>

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
                            <span className="w-1 h-12 bg-gradient-to-b from-primary-500 to-purple-500 rounded-full"></span>
                            <TextGenerateEffect 
                                words="Películas en Tendencia"
                                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                                duration={0.2}
                            />
                        </div>
                        <Link 
                            to="/search?q=marvel" 
                            className="btn-secondary flex items-center group hover:scale-105 transition-transform"
                        >
                            Ver Todo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
                            <span className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
                            <TextGenerateEffect 
                                words="Series Populares"
                                className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                                duration={0.2}
                            />
                        </div>
                        <Link 
                            to="/search?q=star wars&type=series" 
                            className="btn-secondary flex items-center group hover:scale-105 transition-transform"
                        >
                            Ver Todo <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <MovieList movies={series} loading={loading} />
                </motion.section>
            </main>
        </div>
    );
}
