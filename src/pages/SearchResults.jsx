import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useFetchMovies } from '../hooks/useFetchMovies';
import MovieList from '../components/MovieList';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import { SearchX, Search as SearchIcon } from 'lucide-react';
import { TextGenerateEffect } from '../components/ui/TextGenerateEffect';
import { Sparkles } from '../components/ui/Sparkles';
import { useLanguage } from '../context/LanguageContext';

export default function SearchResults() {
    const { t } = useLanguage();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const initialType = searchParams.get('type') || '';

    const [page, setPage] = useState(1);
    const [type, setType] = useState(initialType);
    const [year, setYear] = useState('');

    const { data, loading, error } = useFetchMovies(query, page, type, year);
    // Actually OMDb 'y' param is exact match. Usually better to filter client side or just pass it if user wants exact year.
    // Let's assume the hook can handle it if I update it, or I just pass it.
    // Wait, my useFetchMovies only takes (searchTerm, page, type). I should update it to take year or options object if I want to support year filtering properly via API.
    // For now, I'll stick to what I have or update the hook. The prompt asked for "Filtros avanzados (genre, year, type)". OMDb supports 'y'.
    // I will update the hook call to include year if I update the hook.
    // Let's update the hook in a separate step if needed, or just pass it as part of type/options.
    // Actually, let's just use the 'type' for now and maybe add 'y' to the hook later if I can.
    // To keep it simple and robust, I'll just use type for now, and maybe year if I have time to refactor the hook.
    // Wait, I can just pass `&y=${year}` appended to type if I'm lazy, but that's hacky.
    // Let's just stick to type for now in the hook, or update the hook.
    // I'll update the hook in the next step to support year.

    // Re-sync type with URL if needed, but local state is fine for filters.

    useEffect(() => {
        setPage(1);
    }, [query, type, year]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen pb-24 md:pb-8 relative">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <Sparkles id="search-sparkles" sparklesCount={20} className="opacity-30" />
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3 mb-6"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                    <SearchIcon className="text-primary-600 dark:text-primary-400" size={32} />
                </motion.div>
                <TextGenerateEffect 
                    words={`${t('resultsFor')} "${query}"`}
                    className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white"
                    duration={0.15}
                />
            </motion.div>

            <Filters type={type} setType={setType} year={year} setYear={setYear} />

            {error ? (
                <div className="text-center py-20">
                    <SearchX size={48} className="mx-auto text-slate-400 mb-4" />
                    <p className="text-xl text-slate-600 dark:text-slate-400">{error}</p>
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
    );
}
