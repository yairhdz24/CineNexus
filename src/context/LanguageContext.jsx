import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

/**
 * Hook para acceder al contexto de idioma
 * @returns {Object} Objeto con el idioma actual, función para alternarlo y función de traducción
 * @throws {Error} Si se usa fuera de LanguageProvider
 */
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

/**
 * Proveedor de contexto para la gestión de idiomas (español/inglés)
 * Almacena la preferencia del usuario en localStorage
 */
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        return saved || 'es';
    });

    /**
     * Sincroniza el idioma con localStorage cada vez que cambia
     */
    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    /**
     * Alterna entre español e inglés
     */
    const toggleLanguage = () => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    };

    const translations = {
        es: {
            welcome: 'Bienvenido a Cine Nexus',
            subtitle: 'Descubre millones de películas, series y personas. Explora ahora.',
            trending: 'Películas en Tendencia',
            popularSeries: 'Series Populares',
            seeAll: 'Ver Todo',
            favorites: 'Favoritos',
            home: 'Inicio',
            search: 'Buscar',
            noFavorites: 'Aún no tienes favoritos.',
            startAdding: '¡Comienza a agregar películas para construir tu colección!',
            yourFavorites: 'Tus Favoritos',
            resultsFor: 'Resultados para',
            plot: 'Sinopsis',
            castCrew: 'Reparto y Equipo',
            director: 'Director',
            writers: 'Guionistas',
            actors: 'Actores',
            trailer: 'Tráiler',
            watchTrailer: 'Ver Tráiler (Demo)',
            ratings: 'Calificaciones',
            movieNotFound: 'Película no encontrada',
            share: 'Compartir',
            viewDetails: 'Ver detalles',
            noPoster: 'Sin Póster',
            year: 'Año',
            type: 'Tipo',
            loading: 'Cargando...',
            additionalInfo: 'Información Adicional',
            noPlot: 'Sinopsis no disponible para esta película o serie',
            allTypes: 'Todos los Tipos',
            movies: 'Películas',
            series: 'Series',
            episodes: 'Episodios',
            allYears: 'Todos los Años',
        },
        en: {
            welcome: 'Welcome to Cine Nexus',
            subtitle: 'Discover millions of movies, series and people. Explore now.',
            trending: 'Trending Movies',
            popularSeries: 'Popular Series',
            seeAll: 'See All',
            favorites: 'Favorites',
            home: 'Home',
            search: 'Search',
            noFavorites: 'No favorites yet.',
            startAdding: 'Start adding movies to build your collection!',
            yourFavorites: 'Your Favorites',
            resultsFor: 'Results for',
            plot: 'Plot',
            castCrew: 'Cast & Crew',
            director: 'Director',
            writers: 'Writers',
            actors: 'Actors',
            trailer: 'Trailer',
            watchTrailer: 'Watch Trailer (Demo)',
            ratings: 'Ratings',
            movieNotFound: 'Movie not found',
            share: 'Share',
            viewDetails: 'View details',
            noPoster: 'No Poster',
            year: 'Year',
            type: 'Type',
            loading: 'Loading...',
            additionalInfo: 'Additional Information',
            noPlot: 'Plot not available for this movie or series',
            allTypes: 'All Types',
            movies: 'Movies',
            series: 'Series',
            episodes: 'Episodes',
            allYears: 'All Years',
        }
    };

    /**
     * Función de traducción que devuelve el texto traducido según el idioma actual
     * @param {string} key - Clave de la traducción
     * @returns {string} Texto traducido o la clave si no se encuentra
     */
    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

