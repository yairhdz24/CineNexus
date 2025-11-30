import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { fetchMovies } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

/**
 * Componente de barra de búsqueda con autocompletado
 * Busca en tiempo real mientras el usuario escribe
 * @param {string} initialValue - Valor inicial del campo de búsqueda
 * @param {string} className - Clases CSS adicionales
 */
export default function SearchBar({ initialValue = '', className = '' }) {
    const [query, setQuery] = useState(initialValue);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const { t } = useLanguage();

    // Debounce para búsqueda en tiempo real
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length >= 2) {
                setLoading(true);
                try {
                    const data = await fetchMovies(query.trim(), 1);
                    if (data.Search) {
                        setResults(data.Search.slice(0, 5));
                        setShowResults(true);
                    } else {
                        setResults([]);
                    }
                } catch (error) {
                    console.error('Search error:', error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Cerrar resultados al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /**
     * Maneja el envío del formulario de búsqueda
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setShowResults(false);
        }
    };

    /**
     * Navega a los detalles de una película
     */
    const handleSelectMovie = (movie) => {
        navigate(`/movie/${movie.imdbID}`);
        setShowResults(false);
        setQuery('');
    };

    /**
     * Limpia el campo de búsqueda
     */
    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    };

    return (
        <div ref={searchRef} className={`relative w-full max-w-xl ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                {/* Input de búsqueda redondeado */}
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => results.length > 0 && setShowResults(true)}
                        placeholder={`${t('search')} películas, series...`}
                        className="w-full py-3 pl-12 pr-12 text-slate-800 dark:text-white bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-full shadow-lg focus:shadow-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-300"
                        aria-label="Campo de búsqueda"
                    />
                    
                    {/* Icono de búsqueda */}
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                    
                    {/* Botón limpiar / loading */}
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-slate-300 border-t-primary-500 rounded-full animate-spin" />
                            ) : (
                                <X size={18} />
                            )}
                        </button>
                    )}
                </div>
            </form>

            {/* Resultados de autocompletado */}
            <AnimatePresence>
                {showResults && results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
                    >
                        {results.map((movie, index) => (
                            <motion.button
                                key={movie.imdbID}
                                onClick={() => handleSelectMovie(movie)}
                                className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                {/* Mini poster */}
                                {movie.Poster && movie.Poster !== 'N/A' ? (
                                    <img 
                                        src={movie.Poster} 
                                        alt={movie.Title}
                                        className="w-10 h-14 object-cover rounded-lg shadow"
                                    />
                                ) : (
                                    <div className="w-10 h-14 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                                        <Search size={16} className="text-slate-400" />
                                    </div>
                                )}
                                
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-slate-900 dark:text-white truncate">
                                        {movie.Title}
                                    </p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {movie.Year} • {movie.Type === 'movie' ? 'Película' : movie.Type === 'series' ? 'Serie' : movie.Type}
                                    </p>
                                </div>
                            </motion.button>
                        ))}

                        {/* Ver todos los resultados */}
                        <button
                            onClick={handleSubmit}
                            className="w-full p-3 text-center text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors border-t border-slate-200 dark:border-slate-700"
                        >
                            Ver todos los resultados para "{query}"
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
