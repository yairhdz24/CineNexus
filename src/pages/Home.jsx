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

export default function Home() {
    // Estados para las películas y series
    const [heroMovies, setHeroMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado de filtros
    const [filters, setFilters] = useState({
        genre: 'all',
        year: 'all',
        quality: 'all',
        sort: 'popular',
        type: 'all'
    });

    // Cargar datos cuando cambian los filtros
    useEffect(() => {
        const loadHomeData = async () => {
            try {
                setLoading(true);

                // Determinar query de búsqueda basado en género
                const searchQuery = filters.genre !== 'all' ?
                    getGenreSearchQuery(filters.genre) :
                    'popular';

                // Filtro de año si está seleccionado
                const yearQuery = filters.year !== 'all' && filters.year.length === 4 ?
                    filters.year : '';

                // Cargar películas si el filtro lo permite
                if (filters.type === 'all' || filters.type === 'movie') {
                    const moviesData = await fetchMovies(searchQuery, 1, 'movie', yearQuery);
                    if (moviesData.Search) {
                        setMovies(moviesData.Search);
                    }
                }

                // Cargar series si el filtro lo permite
                if (filters.type === 'all' || filters.type === 'series') {
                    const seriesData = await fetchMovies(searchQuery, 1, 'series', yearQuery);
                    if (seriesData.Search) {
                        setSeries(seriesData.Search);
                    }
                }

                // Cargar datos para el Hero siempre películas
                const heroData = await fetchMovies('batman', 1, 'movie');
                if (heroData.Search) setHeroMovies(heroData.Search.slice(0, 5));

            } catch (error) {
                console.error("Error al cargar datos del home", error);
            } finally {
                setLoading(false);
            }
        };

        loadHomeData();
    }, [filters.genre, filters.year, filters.type]);

    // Mapeo de géneros a queries de búsqueda
    const getGenreSearchQuery = (genreId) => {
        const genreMap = {
            action: 'action',
            comedy: 'comedy',
            drama: 'drama',
            horror: 'horror',
            scifi: 'star trek',
            romance: 'romance',
            thriller: 'thriller',
            animation: 'pixar',
            adventure: 'adventure',
        };
        return genreMap[genreId] || 'popular';
    };

    return (
        <div className="min-h-screen pb-20 md:pb-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">

            {/* SECCION: Hero Carousel */}
            <HeroCarousel movies={heroMovies} />

            {/* SECCION: Barra de Filtros */}
            <FilterBar
                filters={filters}
                onFilterChange={setFilters}
            />

            {/* SECCION: Contenido Principal */}
            <main className="pb-4 space-y-12">

                {/* Sección de Películas */}
                {(filters.type === 'all' || filters.type === 'movie') && (
                    <CategorySection
                        title="Películas"
                        movies={movies}
                        loading={loading}
                        icon={Film}
                    />
                )}

                {/* Sección de Series */}
                {(filters.type === 'all' || filters.type === 'series') && (
                    <CategorySection
                        title="Series"
                        movies={series}
                        loading={loading}
                        icon={Tv}
                    />
                )}

                {/* Mensaje cuando no hay resultados */}
                {!loading && movies.length === 0 && series.length === 0 && (
                    <div className="container mx-auto px-4 py-20 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                                <Film size={48} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                No se encontraron resultados
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Intenta ajustar los filtros para ver más contenido
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
