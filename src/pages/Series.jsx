import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../utils/api';
import { Tv, Search, X, Loader2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Series() {
    const { t } = useLanguage();
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [filterYear, setFilterYear] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [searchPage, setSearchPage] = useState(1);
    const [searchTotalResults, setSearchTotalResults] = useState(0);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    // Cargar series iniciales
    useEffect(() => {
        const loadSeries = async () => {
            setLoading(true);
            try {
                const data = await fetchMovies('drama', page, 'series');
                if (data.Search) {
                    setSeries(data.Search);
                    setTotalResults(parseInt(data.totalResults) || 0);
                }
            } catch (error) {
                console.error("Error loading series", error);
            } finally {
                setLoading(false);
            }
        };
        loadSeries();
    }, [page]);

    // Búsqueda en tiempo real
    useEffect(() => {
        const search = async () => {
            if (searchQuery.trim().length < 2) {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            setSearchLoading(true);
            setIsSearching(true);

            try {
                const data = await fetchMovies(searchQuery.trim(), searchPage, 'series', filterYear);
                setSearchResults(data.Search || []);
                setSearchTotalResults(parseInt(data.totalResults) || 0);
            } catch (error) {
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        };

        const timer = setTimeout(search, 400);
        return () => clearTimeout(timer);
    }, [searchQuery, filterYear, searchPage]);

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setIsSearching(false);
        setFilterYear('');
        setSearchPage(1);
    };

    const currentResults = isSearching ? searchResults : series;
    const currentTotal = isSearching ? searchTotalResults : totalResults;
    const currentPage = isSearching ? searchPage : page;
    const setCurrentPage = isSearching ? setSearchPage : setPage;
    const totalPages = Math.ceil(currentTotal / 10);

    return (
        <div className="min-h-screen pb-24 md:pb-8 bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 py-10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Tv className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">{t('series')}</h1>
                            <p className="text-white/70">{t('discoverSeries')}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* Barra de búsqueda y filtros */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-md border border-slate-200 dark:border-slate-700 mb-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => { setSearchQuery(e.target.value); setSearchPage(1); }}
                                placeholder={t('searchSeries')}
                                className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            {searchQuery && (
                                <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select
                                value={filterYear}
                                onChange={(e) => { setFilterYear(e.target.value); setSearchPage(1); }}
                                className="pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer min-w-[120px]"
                            >
                                <option value="">{t('allYears')}</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>

                    {searchLoading && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-slate-500">
                            <Loader2 size={16} className="animate-spin" />
                            <span>{t('searchingSeries')}...</span>
                        </div>
                    )}
                    
                    {isSearching && !searchLoading && (
                        <p className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-slate-500">
                            {searchTotalResults} {t('results')} "{searchQuery}"
                        </p>
                    )}
                </div>

                {/* Lista de series */}
                {loading || searchLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={28} className="animate-spin text-pink-500" />
                        <span className="ml-3 text-slate-500">{t('loading')}</span>
                    </div>
                ) : (
                    <MovieList movies={currentResults} loading={false} />
                )}

                {/* Paginación */}
                {totalPages > 1 && !loading && !searchLoading && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }
                                
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                                            currentPage === pageNum
                                                ? 'bg-pink-600 text-white shadow-lg'
                                                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-pink-900/20'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>

                        <span className="ml-4 text-sm text-slate-500">
                            {currentPage} / {totalPages}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
