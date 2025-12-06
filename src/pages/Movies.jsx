import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { fetchMovies } from '../utils/api';
import { Clapperboard, Loader2, ChevronLeft, ChevronRight, Star, Film } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FilterBar from '../components/FilterBar';

export default function Movies() {
    const { t } = useLanguage();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    // Filtros unificados
    const [filters, setFilters] = useState({
        type: 'movie',
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
        return genreQueries[genre] || 'popular';
    };

    // Cargar películas
    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                const query = filters.genre !== 'all' ? getQueryFromGenre(filters.genre) : 'action';
                const yearParam = filters.year !== 'all' ? filters.year : '';
                const data = await fetchMovies(query, page, 'movie', yearParam);
                if (data.Search) {
                    setMovies(data.Search);
                    setTotalResults(parseInt(data.totalResults) || 0);
                }
            } catch (error) {
                console.error("Error loading movies", error);
            } finally {
                setLoading(false);
            }
        };
        loadMovies();
    }, [page, filters.genre, filters.year]);

    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="min-h-screen pt-28 pb-24 md:pb-8 bg-slate-50 dark:bg-slate-950">
            {/* Header Premium - Red/Wine theme con cinta de película */}
            <div className="relative bg-gradient-to-br from-red-600 via-rose-600 to-red-800 py-16 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-400 rounded-full blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-300 rounded-full blur-3xl opacity-30" />
                </div>

                {/* Film strip decoration - TOP */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-black/40 flex items-center overflow-hidden">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div key={`top-${i}`} className="w-4 h-3 bg-white/20 mx-1.5 rounded-sm shrink-0" />
                    ))}
                </div>

                {/* Film strip decoration - BOTTOM */}
                <div className="absolute bottom-12 left-0 right-0 h-6 bg-black/40 flex items-center overflow-hidden">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <div key={`bottom-${i}`} className="w-4 h-3 bg-white/20 mx-1.5 rounded-sm shrink-0" />
                    ))}
                </div>

                {/* Film reel icons pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-20">
                        <Film size={120} className="text-white" />
                    </div>
                    <div className="absolute bottom-20 right-20">
                        <Clapperboard size={100} className="text-white" />
                    </div>
                    <div className="absolute top-1/2 left-1/4">
                        <Film size={80} className="text-white" />
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <div className="relative">
                            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                <Clapperboard className="text-white" size={40} />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-yellow-400/80 text-sm font-medium">{t('topRated')}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{t('movies')}</h1>
                            <p className="text-white/80 text-lg">{t('discoverMovies')}</p>
                        </div>
                        <div className="flex items-center gap-4 text-white/80">
                            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                                <Film size={18} />
                                <span className="font-medium">{totalResults}+ {t('movies')}</span>
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

                {/* Lista de películas */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={28} className="animate-spin text-red-500" />
                        <span className="ml-3 text-slate-500">{t('loading')}</span>
                    </div>
                ) : (
                    <MovieList movies={movies} loading={false} />
                )}

                {/* Paginación */}
                {totalPages > 1 && !loading && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <button
                            onClick={() => setPage(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
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
                                            ? 'bg-red-600 text-white shadow-lg'
                                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20'
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
                            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
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
