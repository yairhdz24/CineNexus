import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Sparkles, LayoutGrid, List, Loader2 } from 'lucide-react';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import { fetchMovies } from '../utils/api';
import { useLanguage } from '../context/LanguageContext';
import FilterBar from '../components/FilterBar';

export default function SearchResults() {
    const { t } = useLanguage();
    const navigate = useNavigate();
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
    const [viewMode, setViewMode] = useState('grid');

    // Estado para búsqueda local (cuando no hay query)
    const [localQuery, setLocalQuery] = useState('');

    // Cargar resultados - si no hay query, cargar "popular"
    useEffect(() => {
        const loadResults = async () => {
            setLoading(true);
            try {
                // Si hay query usarla, si no, buscar contenido popular
                const searchTerm = query || 'action';
                const data = await fetchMovies(searchTerm, page, type, year);
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
        if (value && value !== 'all') {
            newParams.set(filterType, value);
        } else {
            newParams.delete(filterType);
        }
        setSearchParams(newParams);

        if (filterType === 'type') setType(value === 'all' ? '' : value);
        if (filterType === 'year') setYear(value === 'all' ? '' : value);
        setPage(1);
    };

    // Manejar búsqueda local
    const handleLocalSearch = (e) => {
        e.preventDefault();
        if (localQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(localQuery.trim())}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-28 pb-24">
            {/* Header - Responsive y compacto */}
            <div className="relative bg-gradient-to-r from-red-600 via-rose-600 to-red-700 py-8 md:py-12 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-5 left-5 w-20 h-20 md:w-32 md:h-32 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-5 right-5 w-24 h-24 md:w-40 md:h-40 bg-orange-400 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-white">
                        {/* Título y icono - Compacto en móvil */}
                        <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4">
                            <div className="p-2 md:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Search size={20} className="md:w-7 md:h-7" strokeWidth={2.5} />
                            </div>
                            <h1 className="text-xl md:text-3xl font-black">
                                {query ? t('resultsFor') : t('exploreCatalog')}
                            </h1>
                        </div>

                        {/* Si hay query, mostrarla */}
                        {query && (
                            <p className="text-xl md:text-3xl font-bold mb-3">
                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl border border-white/30 inline-block">
                                    "{query}"
                                </span>
                            </p>
                        )}

                        {/* Si NO hay query, mostrar campo de búsqueda */}
                        {!query && (
                            <form onSubmit={handleLocalSearch} className="mb-3">
                                <div className="flex gap-2 max-w-md">
                                    <input
                                        type="text"
                                        value={localQuery}
                                        onChange={(e) => setLocalQuery(e.target.value)}
                                        placeholder={t('searchPlaceholder') || "Buscar películas, series..."}
                                        className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-white/50"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 md:px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-white/90 transition-colors"
                                    >
                                        <Search size={18} />
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Results count */}
                        {!loading && (
                            <div className="flex items-center gap-2 text-white/90 text-sm md:text-base">
                                <Sparkles size={16} className="animate-pulse" />
                                <span className="font-bold">{totalResults}</span>
                                <span>{t('results')}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Wave decoration */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 48" fill="none" className="w-full">
                        <path d="M0 48h1440V0s-360 48-720 48S0 0 0 0v48z" fill="currentColor" className="text-slate-50 dark:text-slate-950" />
                    </svg>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 md:py-8">
                {/* Filters - Compacto en móvil */}
                <div className="mb-6 md:mb-8 flex flex-col gap-4">
                    <FilterBar
                        filters={{
                            type: type || 'all',
                            year: year || 'all'
                        }}
                        onFilterChange={(key, value) => {
                            handleFilterChange(key, value);
                        }}
                        showGenres={false}
                        showSort={false}
                        showType={true}
                        showYear={true}
                    />

                    {/* View Toggle - Más pequeño en móvil */}
                    <div className="flex justify-end">
                        <div className="flex bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 md:p-2 rounded-md transition-colors duration-200 ${viewMode === 'grid' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'text-slate-400 hover:text-slate-600'}`}
                                title="Grid View"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 md:p-2 rounded-md transition-colors duration-200 ${viewMode === 'list' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'text-slate-400 hover:text-slate-600'}`}
                                title="List View"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 size={28} className="animate-spin text-red-500" />
                        <span className="ml-3 text-slate-500">{t('loading')}</span>
                    </div>
                )}

                {/* Results */}
                {!loading && <MovieList movies={movies} loading={false} viewMode={viewMode} />}

                {/* No results */}
                {!loading && movies.length === 0 && (
                    <div className="text-center py-16 md:py-20">
                        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                            <Search size={36} className="text-white md:w-12 md:h-12" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">{t('noResults')}</h2>
                        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">{t('tryDifferent')}</p>
                    </div>
                )}

                {/* Pagination */}
                {totalResults > 10 && !loading && (
                    <div className="mt-6 md:mt-8">
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
