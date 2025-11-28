import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        return saved || 'es';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

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
        }
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

