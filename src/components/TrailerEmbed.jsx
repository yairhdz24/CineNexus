import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Loader2, Youtube } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Componente para embeber tráilers de YouTube
 * Busca automáticamente el primer video de YouTube y lo reproduce
 * @param {Object} movie - Objeto de la película
 */
export default function TrailerEmbed({ movie }) {
    const { t } = useLanguage();
    const [videoId, setVideoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        const searchTrailer = async () => {
            if (!movie?.Title) {
                setLoading(false);
                return;
            }

            setLoading(true);
            
            try {
                const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
                
                if (apiKey) {
                    const searchQuery = `${movie.Title} ${movie.Year || ''} official trailer`;
                    const response = await fetch(
                        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=1&key=${apiKey}`
                    );
                    
                    if (response.ok) {
                        const data = await response.json();
                        if (data.items && data.items.length > 0) {
                            setVideoId(data.items[0].id.videoId);
                        }
                    }
                }
            } catch (error) {
                console.error('Error buscando tráiler:', error);
            } finally {
                setLoading(false);
            }
        };

        searchTrailer();
    }, [movie]);

    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie?.Title || ''} ${movie?.Year || ''} official trailer`)}`;
    const hasPoster = movie?.Poster && movie.Poster !== 'N/A';

    // Estado de carga
    if (loading) {
        return (
            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
        );
    }

    // Si hay video y el usuario hizo clic, mostrar el reproductor
    if (videoId && showPlayer) {
        return (
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={`${movie.Title} - Tráiler`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
        );
    }

    // Vista previa con botón
    return (
        <div 
            className="aspect-video rounded-xl overflow-hidden relative group cursor-pointer"
            onClick={() => {
                if (videoId) {
                    setShowPlayer(true);
                } else {
                    window.open(youtubeSearchUrl, '_blank');
                }
            }}
        >
            {/* Fondo */}
            {hasPoster ? (
                <>
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${movie.Poster})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
                </>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            )}

            {/* Botón de play */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div 
                    className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Play size={28} className="text-white ml-1" fill="currentColor" />
                </motion.div>
                
                <p className="mt-3 text-white text-sm font-medium flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <Youtube size={14} className="text-red-500" />
                    {videoId ? t('watchTrailer') : 'Buscar en YouTube'}
                </p>
            </div>

            {/* Badge */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 px-2 py-1 rounded-full backdrop-blur-sm">
                <Youtube size={12} className="text-red-500" />
                <span className="text-white text-xs">YouTube</span>
            </div>
        </div>
    );
}
