import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, X } from 'lucide-react';
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Search size={28} />
                            <h1 className="text-2xl md:text-3xl font-bold">{t('resultsFor')}</h1>
                        </div>
                        <p className="text-3xl md:text-4xl font-bold text-white/90">"{query}"</p>
                        {!loading && <p className="text-white/70 mt-2">{totalResults} {t('results')}</p>}
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Filter size={18} />
                        <span className="text-sm font-medium">Filtros:</span>
                    </div>
                    
                    <select
                        value={type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                        <option value="">{t('allTypes')}</option>
                        <option value="movie">{t('movie')}</option>
                        <option value="series">{t('series')}</option>
                        <option value="episode">{t('episode')}</option>
                    </select>

                    <select
                        value={year}
                        onChange={(e) => handleFilterChange('year', e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                        <option value="">{t('allYears')}</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>

                    {(type || year) && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 transition-colors flex items-center gap-1"
                        >
                            <X size={16} />
                            {t('clearSearch')}
                        </button>
                    )}
                </div>

                {/* Results */}
                <MovieList movies={movies} loading={loading} />

                {/* No results */}
                {!loading && movies.length === 0 && (
                    <div className="text-center py-20">
                        <Search size={48} className="mx-auto text-slate-400 mb-4" />
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('noResults')}</h2>
                        <p className="text-slate-500">{t('tryDifferent')}</p>
                    </div>
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
