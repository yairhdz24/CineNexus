import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetchMovies } from '../hooks/useFetchMovies';
import MovieList from '../components/MovieList';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { SearchX, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Página de resultados de búsqueda
 * Muestra las películas encontradas según el término de búsqueda
 */
export default function SearchResults() {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const initialType = searchParams.get('type') || '';

    const [page, setPage] = useState(1);
    const [type, setType] = useState(initialType);
    const [year, setYear] = useState('');

    const { data, loading, error } = useFetchMovies(query, page, type, year);

    useEffect(() => {
        setPage(1);
    }, [query, type, year]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 md:pb-8">
            <div className="container mx-auto px-4 py-8">
                {/* Header de búsqueda */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                            <Search className="text-primary-600 dark:text-primary-400" size={24} />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            {t('resultsFor')}
                        </h1>
                    </div>
                    <p className="text-xl text-slate-600 dark:text-slate-400 ml-14">
                        "<span className="font-semibold text-primary-600 dark:text-primary-400">{query}</span>"
                    </p>
                </div>

                {/* Filtros */}
                <Filters type={type} setType={setType} year={year} setYear={setYear} />

                {/* Resultados */}
                {error ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg">
                        <SearchX size={64} className="mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                        <p className="text-xl text-slate-700 dark:text-slate-300 font-medium">{error}</p>
                    </div>
                ) : (
                    <>
                        <MovieList movies={data?.Search} loading={loading} />
                        {data?.totalResults && (
                            <Pagination
                                currentPage={page}
                                totalResults={parseInt(data.totalResults)}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
