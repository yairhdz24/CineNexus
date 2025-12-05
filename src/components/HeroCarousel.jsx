import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Info, Star, Clock, TrendingUp, Sparkles } from 'lucide-react';

export default function HeroCarousel({ movies = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(1);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Efecto parallax 
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
    const springConfig = { stiffness: 100, damping: 30 };
    const x = useSpring(rotateX, springConfig);
    const y = useSpring(rotateY, springConfig);

    // Auto-rotar carousel
    useEffect(() => {
        if (!isAutoPlaying || movies.length === 0) return;

        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % movies.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [isAutoPlaying, movies.length]);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(event.clientX - centerX);
        mouseY.set(event.clientY - centerY);
    };

    const goToPrevious = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
        setIsAutoPlaying(false);
    };

    const goToNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % movies.length);
        setIsAutoPlaying(false);
    };

    if (movies.length === 0) {
        return null;
    }

    const currentMovie = movies[currentIndex];
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 800 : -800,
            opacity: 0,
            scale: 0.8
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 800 : -800,
            opacity: 0,
            scale: 0.8,
            transition: { duration: 0.5 }
        })
    };

    return (
        <div
            className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-black group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onMouseMove={handleMouseMove}
        >
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.5 },
                        scale: { duration: 0.5 }
                    }}
                    className="absolute inset-0"
                    style={{
                        rotateX: x,
                        rotateY: y,
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Background Image con efecto parallax */}
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            translateZ: -50,
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transform scale-110"
                            style={{
                                backgroundImage: `url(${currentMovie.Poster !== 'N/A' ? currentMovie.Poster : ''})`,
                                filter: 'blur(8px) brightness(0.4)'
                            }}
                        />

                        {/* Efecto de gradientes animados */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                        {/* Efecto de partículas flotantes */}
                        <div className="absolute inset-0 opacity-30">
                            {[...Array(30)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-white rounded-full"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        y: [0, -30, 0],
                                        opacity: [0.2, 0.8, 0.2],
                                        scale: [1, 1.5, 1]
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Contenedor de contenido*/}
                    <div className="relative h-full container mx-auto px-4 md:px-8 flex items-center">
                        <div className="max-w-3xl space-y-6 z-10" style={{ transformStyle: "preserve-3d" }}>
                            {/* Top 10 Badge */}
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1, type: "spring" }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full font-bold text-sm shadow-2xl"
                                style={{ translateZ: 30 }}
                            >
                                <TrendingUp size={18} className="animate-pulse" />
                                <span>TENDENCIA #</span>
                                <span className="text-lg font-black">{currentIndex + 1}</span>
                            </motion.div>

                            {/* Titulo con animacion */}
                            <motion.h1
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                className="text-5xl md:text-5xl lg:text-5xl font-black text-white leading-tight"
                                style={{
                                    translateZ: 50,
                                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                }}
                            >
                                {currentMovie.Title}
                            </motion.h1>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center gap-4 text-white/95"
                                style={{ translateZ: 40 }}
                            >
                                <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full font-black text-base shadow-xl">
                                    <Star size={18} fill="currentColor" />
                                    8.5
                                </div>

                                <div className="flex items-center gap-2 font-bold text-lg">
                                    <Clock size={18} />
                                    <span>{currentMovie.Year}</span>
                                </div>

                                <span className="uppercase px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-base font-black border border-white/30 shadow-xl">
                                    {currentMovie.Type === 'movie' ? 'PELÍCULA' : 'SERIE'}
                                </span>

                            </motion.div>

                            {/* Description */}
                            <motion.p
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-white/90 line-clamp-3 leading-relaxed font-medium"
                                style={{
                                    translateZ: 35,
                                    textShadow: '0 4px 8px rgba(0,0,0,0.5)'
                                }}
                            >
                                Descubre esta increíble {currentMovie.Type === 'movie' ? 'película' : 'serie'} en CINENEXUS.
                                Disfruta de contenido premium en la más alta calidad con la mejor experiencia de streaming.
                                Una experiencia cinematográfica que no olvidarás.
                            </motion.p>

                            {/* Botones de acción con efecto premium */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4"
                                style={{ translateZ: 45 }}
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to={`/movie/${currentMovie.imdbID}`}
                                        className="group inline-flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 hover:from-primary-500 hover:via-purple-500 hover:to-pink-500 text-white font-black rounded-full shadow-2xl hover:shadow-primary-500/50 transition-all text-lg relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                        <Play size={24} fill="currentColor" className="relative z-10" />
                                        <span className="relative z-10">Ver Ahora</span>
                                        {/* <Sparkles size={20} className="relative z-10 animate-pulse" /> */}
                                    </Link>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to={`/movie/${currentMovie.imdbID}`}
                                        className="inline-flex items-center gap-3 px-5 py-4 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-black rounded-full border-2 border-white/40 hover:border-white/60 transition-all shadow-2xl text-lg"
                                    >
                                        <Info size={24} />
                                        Más Información
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Barra de progreso */}
                            {/* <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 6, ease: "linear" }}
                                className="h-1 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 rounded-full shadow-lg origin-left"
                                style={{ translateZ: 30 }}
                                key={currentIndex}
                            /> */}
                        </div>

                        {/* Tarjeta de poster destacada */}
                        {currentMovie.Poster !== 'N/A' && (
                            <motion.div
                                initial={{ x: 200, opacity: 0, rotateY: -20 }}
                                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="hidden lg:block absolute right-52 top-1/5 -translate-y-1/2"
                                style={{
                                    transformStyle: "preserve-3d",
                                    translateZ: 80
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="relative"
                                >
                                    <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600 rounded-3xl opacity-60 blur-2xl" />
                                    <img
                                        src={currentMovie.Poster}
                                        alt={currentMovie.Title}
                                        className="relative w-72 h-[400px] object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Flechas de navegación con estilo premium */}
            <motion.button
                onClick={goToPrevious}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-full transition-all opacity-0 group-hover:opacity-100 z-20 border border-white/20 shadow-2xl"
                aria-label="Previous"
            >
                <ChevronLeft size={32} strokeWidth={3} />
            </motion.button>

            <motion.button
                onClick={goToNext}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-full transition-all opacity-0 group-hover:opacity-100 z-20 border border-white/20 shadow-2xl"
                aria-label="Next"
            >
                <ChevronRight size={32} strokeWidth={3} />
            </motion.button>

            {/* Indicador de puntos con animaciones */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
                {movies.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1);
                            setCurrentIndex(index);
                            setIsAutoPlaying(false);
                        }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                        className={`relative transition-all ${index === currentIndex
                            ? 'w-12 h-3'
                            : 'w-3 h-3'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    >
                        <div className={`absolute inset-0 rounded-full ${index === currentIndex
                            ? 'bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 shadow-lg'
                            : 'bg-white/40 hover:bg-white/70'
                            }`} />
                        {index === currentIndex && (
                            <motion.div
                                className="absolute inset-0 bg-white/50 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 6, ease: "linear" }}
                                style={{ transformOrigin: 'left' }}
                            />
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Efecto de vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60 pointer-events-none" />
        </div>
    );
}
