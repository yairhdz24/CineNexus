import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../utils/api';
import { Tv, Loader2, ChevronLeft, ChevronRight, Play, Sparkles, Monitor, Radio } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FilterBar from '../components/FilterBar';

export default function Series() {
    const { t } = useLanguage();
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Filtros unificados
    const [filters, setFilters] = useState({
        type: 'series',
        year: 'all',
        genre: 'all',
        sortBy: 'popularity.desc'
    });

    // Construir query basado en género
    const getQueryFromGenre = (genre) => {
        const genreQueries = {
            action: 'action',
            adventure: 'adventure',
            comedy: 'comedy',
            drama: 'drama',
            scifi: 'space',
            horror: 'horror',
            romance: 'love',
            thriller: 'thriller',
            animation: 'animated',
            fantasy: 'fantasy',
            crime: 'crime',
            documentary: 'documentary'
        };
        return genreQueries[genre] || 'drama';
    };

    // Cargar series
    useEffect(() => {
        const loadSeries = async () => {
            setLoading(true);
            try {
                const query = filters.genre !== 'all' ? getQueryFromGenre(filters.genre) : 'drama';
                const yearParam = filters.year !== 'all' ? filters.year : '';
                const data = await fetchMovies(query, page, 'series', yearParam);
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
    }, [page, filters.genre, filters.year]);

    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="min-h-screen pt-28 pb-24 md:pb-8 bg-slate-50 dark:bg-slate-950">
            {/* Header Premium - Rose/Coral theme con iconos de TV */}
            <div className="relative bg-gradient-to-br from-rose-600 via-pink-600 to-rose-800 py-16 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-400 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300 rounded-full blur-3xl opacity-30" />
                </div>

                {/* TV/Broadcast icons pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-16 left-16">
                        <Tv size={100} className="text-white" />
                    </div>
                    <div className="absolute top-20 right-32">
                        <Monitor size={80} className="text-white" />
                    </div>
                    <div className="absolute bottom-24 left-1/4">
                        <Radio size={60} className="text-white" />
                    </div>
                    <div className="absolute bottom-16 right-16">
                        <Tv size={120} className="text-white" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Play size={150} className="text-white" />
                    </div>
                </div>

                {/* Signal waves decoration */}
                <div className="absolute top-8 right-8 opacity-20">
                    <div className="w-20 h-20 border-4 border-white rounded-full" />
                    <div className="absolute top-2 left-2 w-16 h-16 border-4 border-white rounded-full" />
                    <div className="absolute top-4 left-4 w-12 h-12 border-4 border-white rounded-full" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative">
                            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <Tv className="text-white" size={40} />
                            </div>
                            <div className="absolute -top-1 -right-1 flex items-center gap-0.5">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-yellow-400" />
                                <span className="text-yellow-400/80 text-sm font-medium">{t('popularSeries')}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{t('series')}</h1>
                            <p className="text-white/80 text-lg">{t('discoverSeries')}</p>
                        </div>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                                <Play size={18} />
                                <span className="font-medium">{totalResults}+ {t('series')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave decoration */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 48" fill="none" className="w-full">
                        <path d="M0 48h1440V0s-360 48-720 48S0 0 0 0v48z" fill="currentColor" className="text-slate-50 dark:text-slate-950" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                {/* FilterBar */}
                <div className="mb-8">
                    <FilterBar
                        filters={filters}
                        onFilterChange={(key, value) => {
                            setFilters(prev => ({ ...prev, [key]: value }));
                            setPage(1);
                        }}
                        showType={false}
                        showGenres={true}
                        showYear={true}
                        showSort={false}
                    />
                </div>

                {/* Lista de series */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={28} className="animate-spin text-rose-500" />
                        <span className="ml-3 text-slate-500">{t('loading')}</span>
                    </div>
                ) : (
                    <MovieList movies={series} loading={false} />
                )}

                {/* Paginación */}
                {totalPages > 1 && !loading && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors duration-200"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (page <= 3) {
                                    pageNum = i + 1;
                                } else if (page >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = page - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPage(pageNum)}
                                        className={`w-10 h-10 rounded-xl font-medium transition-colors duration-200 ${page === pageNum
                                            ? 'bg-rose-600 text-white shadow-lg'
                                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-900/20'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setPage(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors duration-200"
                        >
                            <ChevronRight size={20} />
                        </button>

                        <span className="ml-4 text-sm text-slate-500">
                            {page} / {totalPages}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
