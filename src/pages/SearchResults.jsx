import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, X, Film, Tv, Calendar, Sparkles } from 'lucide-react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { fetchMovies } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

export default function SearchResults() {
    const { t } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const initialType = searchParams.get('type') || '';
    const initialYear = searchParams.get('year') || '';

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);
    const [page, setPage] = useState(1);
    const [type, setType] = useState(initialType);
    const [year, setYear] = useState(initialYear);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    useEffect(() => {
        const loadResults = async () => {
            if (!query) {
                setMovies([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const data = await fetchMovies(query, page, type, year);
                setMovies(data.Search || []);
                setTotalResults(parseInt(data.totalResults) || 0);
            } catch (error) {
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        loadResults();
    }, [query, page, type, year]);

    const handleFilterChange = (filterType, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(filterType, value);
        } else {
            newParams.delete(filterType);
        }
        setSearchParams(newParams);

        if (filterType === 'type') setType(value);
        if (filterType === 'year') setYear(value);
        setPage(1);
    };

    const clearFilters = () => {
        setType('');
        setYear('');
        const newParams = new URLSearchParams();
        newParams.set('q', query);
        setSearchParams(newParams);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pb-24">
            {/* Amazing Header */}
            <div className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 py-16 overflow-hidden">
                {/* Animated background patterns */}
                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-white"
                    >
                        {/* Search Icon with glow */}
                        <motion.div
                            className="flex items-center gap-4 mb-4"
                            animate={{
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="relative">
                                <Search size={40} strokeWidth={2.5} />
                                <motion.div
                                    className="absolute -inset-2 bg-white/30 rounded-full blur-xl"
                                    animate={{
                                        opacity: [0.3, 0.6, 0.3],
                                        scale: [0.8, 1.2, 0.8]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity
                                    }}
                                />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black">{t('resultsFor')}</h1>
                        </motion.div>

                        {/* Query with gradient */}
                        <motion.p
                            className="text-4xl md:text-6xl font-black mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-white/30">
                                "{query}"
                            </span>
                        </motion.p>

                        {/* Results count with icon */}
                        {!loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-2 text-white/90 text-lg"
                            >
                                <Sparkles size={20} className="animate-pulse" />
                                <span className="font-bold">{totalResults}</span>
                                <span>{t('results')}</span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Bottom wave decoration */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 48h1440V0s-360 48-720 48S0 0 0 0v48z" fill="currentColor" className="text-slate-50 dark:text-slate-950" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Enhanced Filters */}
                <motion.div
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 mb-8 border border-slate-200 dark:border-slate-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg">
                            <Filter size={20} className="text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filtros de Búsqueda</h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {/* Type Filter */}
                        <div className="flex gap-2">
                            {['', 'movie', 'series'].map((typeValue) => (
                                <button
                                    key={typeValue}
                                    onClick={() => handleFilterChange('type', typeValue)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm
                                        transition-all duration-300 transform hover:scale-105
                                        ${type === typeValue
                                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                        }
                                    `}
                                >
                                    {typeValue === '' && <Sparkles size={16} />}
                                    {typeValue === 'movie' && <Film size={16} />}
                                    {typeValue === 'series' && <Tv size={16} />}
                                    {typeValue === '' ? t('allTypes') : typeValue === 'movie' ? t('movie') : t('series')}
                                </button>
                            ))}
                        </div>

                        {/* Year Filter */}
                        <select
                            value={year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 hover:border-violet-400 transition-colors cursor-pointer"
                        >
                            <option value="">{t('allYears')}</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>

                        {/* Clear Filters */}
                        {(type || year) && (
                            <motion.button
                                onClick={clearFilters}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="ml-auto px-4 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-500/20 transition-colors flex items-center gap-2 font-bold"
                            >
                                <X size={16} />
                                {t('clearSearch')}
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                {/* Results */}
                <MovieList movies={movies} loading={loading} />

                {/* No results */}
                {!loading && movies.length === 0 && (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                            <Search size={48} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('noResults')}</h2>
                        <p className="text-slate-600 dark:text-slate-400">{t('tryDifferent')}</p>
                    </motion.div>
                )}

                {/* Pagination */}
                {totalResults > 10 && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={page}
                            totalResults={totalResults}
                            onPageChange={setPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
