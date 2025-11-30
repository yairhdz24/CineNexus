import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Componente para mostrar y reproducir tráilers de YouTube
 * Busca el tráiler usando la API de YouTube y lo reproduce directamente
 * @param {Object} movie - Objeto de la película
 */
export default function TrailerEmbed({ movie }) {
    const { t } = useLanguage();
    const [trailerId, setTrailerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const searchTrailer = async () => {
            if (!movie?.Title) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const searchQuery = `${movie.Title} ${movie.Year || ''} official trailer`;
                const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
                
                if (apiKey) {
                    try {
                        const response = await fetch(
                            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}&maxResults=1`
                        );
                        const data = await response.json();
                        
                        if (data.items && data.items.length > 0) {
                            setTrailerId(data.items[0].id.videoId);
                            return;
                        }
                    } catch (apiErr) {
                        console.warn('Error con API de YouTube, usando método alternativo:', apiErr);
                    }
                }
                
                setError('No se encontró tráiler');
            } catch (err) {
                console.error('Error buscando tráiler:', err);
                setError('Error al buscar tráiler');
            } finally {
                setLoading(false);
            }
        };

        searchTrailer();
    }, [movie]);

    if (loading) {
        return (
            <div className="aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl overflow-hidden relative flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
        );
    }

    if (error || !trailerId) {
        return (
            <div className="aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl overflow-hidden relative group">
                {movie.Poster && movie.Poster !== 'N/A' ? (
                    <>
                        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${movie.Poster})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />
                    </>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        className="z-10 bg-red-600 p-5 sm:p-7 rounded-full group-hover:scale-110 transition-transform shadow-2xl border-4 border-white/20 cursor-pointer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        onClick={() => {
                            const searchQuery = `${movie.Title} ${movie.Year || ''} official trailer`;
                            const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
                            window.open(youtubeUrl, '_blank');
                        }}
                    >
                        <Play className="text-white w-8 h-8 sm:w-10 sm:h-10 ml-1" fill="currentColor" />
                    </motion.div>
                </div>
                <p className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity z-10 px-4 py-2 bg-black/70 rounded-lg backdrop-blur-sm font-semibold">
                    {t('watchTrailer')}
                </p>
            </div>
        );
    }

    return (
        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=0&rel=0`}
                title={`${movie.Title} - Tráiler`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
            />
        </div>
    );
}

