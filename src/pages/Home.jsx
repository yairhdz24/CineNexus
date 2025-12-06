// ============================================
// COMPONENTE: Home Page
// Descripción: Página principal con Hero, Filtros y Secciones de Películas/Series
// ============================================

import { useEffect, useState } from 'react';
import { fetchMovies } from '../utils/api';
import { Film, Tv } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import FilterBar from '../components/FilterBar';
import CategorySection from '../components/CategorySection';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
    const { t } = useLanguage();
    // Estados para las películas y series
    const [heroMovies, setHeroMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado de filtros
    const [filters, setFilters] = useState({
        year: 'all',
        type: 'all',
        genre: 'all',
    });

    // Mapeo de géneros a términos de búsqueda
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

    // Cargar datos cuando cambian los filtros
    useEffect(() => {
        const loadHomeData = async () => {
            try {
                setLoading(true);

                // Query de búsqueda basado en género
                const movieQuery = filters.genre !== 'all' ? getQueryFromGenre(filters.genre) : 'avengers';
                const seriesQuery = filters.genre !== 'all' ? getQueryFromGenre(filters.genre) : 'star wars';

                // Filtro de año si está seleccionado
                const yearQuery = filters.year !== 'all' && filters.year.length === 4 ?
                    filters.year : '';

                // Cargar películas si el filtro lo permite
                if (filters.type === 'all' || filters.type === 'movie') {
                    const moviesData = await fetchMovies(movieQuery, 1, 'movie', yearQuery);
                    if (moviesData.Search) {
                        setMovies(moviesData.Search);
                    } else {
                        setMovies([]);
                    }
                } else {
                    setMovies([]);
                }

                // Cargar series si el filtro lo permite
                if (filters.type === 'all' || filters.type === 'series') {
                    const seriesData = await fetchMovies(seriesQuery, 1, 'series', yearQuery);
                    if (seriesData.Search) {
                        setSeries(seriesData.Search);
                    } else {
                        setSeries([]);
                    }
                } else {
                    setSeries([]);
                }

                // Cargar datos para el Hero siempre películas
                const heroData = await fetchMovies('dune', 1, 'movie');
                if (heroData.Search) setHeroMovies(heroData.Search.slice(0, 5));

            } catch (error) {
                console.error("Error al cargar datos del home", error);
            } finally {
                setLoading(false);
            }
        };

        loadHomeData();
    }, [filters.year, filters.type, filters.genre]);


    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-28">

            {/* SECCION: Hero Carousel */}
            <HeroCarousel movies={heroMovies} />

            {/* SECCION: Barra de Filtros */}
            <FilterBar
                filters={filters}
                onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                showSort={false}
            />

            {/* SECCION: Contenido Principal */}
            <main className="pb-4 space-y-12">

                {/* Sección de Películas */}
                {(filters.type === 'all' || filters.type === 'movie') && (
                    <CategorySection
                        title={t('trending')}
                        movies={movies}
                        loading={loading}
                        icon={Film}
                    />
                )}

                {/* Sección de Series */}
                {(filters.type === 'all' || filters.type === 'series') && (
                    <CategorySection
                        title={t('popularSeries')}
                        movies={series}
                        loading={loading}
                        icon={Tv}
                    />
                )}

                {/* Mensaje cuando no hay resultados */}
                {!loading && movies.length === 0 && series.length === 0 && (
                    <div className="container mx-auto px-4 py-20 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                                <Film size={48} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {t('noResults')}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                {t('tryDifferent')}
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
