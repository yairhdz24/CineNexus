import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const translations = {
    es: {
        welcomeTo: 'Bienvenido a',
        subtitle: 'Descubre películas, series y más. Explora ahora.',
        home: 'Inicio',
        favorites: 'Favoritos',
        movies: 'Películas',
        series: 'Series',
        search: 'Buscar',
        trending: 'Películas en Tendencia',
        popularSeries: 'Series Populares',
        seeAll: 'Ver todo',
        loading: 'Cargando...',

        // Movies & Series pages
        discoverMovies: 'Descubre las mejores películas',
        discoverSeries: 'Descubre las mejores series',
        searchMovies: 'Buscar películas...',
        searchSeries: 'Buscar series...',
        searchingMovies: 'Buscando películas',
        searchingSeries: 'Buscando series',
        allYears: 'Todos los años',
        results: 'resultados para',

        // Movie Detail
        plot: 'Sinopsis',
        synopsisNotAvailable: 'Sinopsis no disponible.',
        castCrew: 'Reparto y Equipo',
        director: 'Director',
        writers: 'Guionistas',
        actors: 'Actores',
        trailer: 'Tráiler',
        watchTrailer: 'Ver Tráiler',
        watchOnYouTube: 'Ver en YouTube',
        ratings: 'Calificaciones',
        votes: 'votos',
        similarTitles: 'Títulos Similares',
        awards: 'Premios',
        information: 'Información',
        releaseDate: 'Estreno',
        country: 'País',
        language: 'Idioma',
        boxOffice: 'Taquilla',
        goBack: 'Volver',
        error: 'Error',
        movieNotFound: 'No encontrado',
        errorLoading: 'Error al cargar',

        // Favorites
        yourFavorites: 'Tus Favoritos',
        noFavorites: 'No tienes favoritos aún',
        startAdding: '¡Agrega películas a tu colección!',
        exploreCatalog: 'Explorar catálogo',

        // Actions
        viewDetails: 'Ver detalles',
        share: 'Compartir',
        clearSearch: 'Limpiar',

        // Search Results
        resultsFor: 'Resultados para',
        noResults: 'Sin resultados',
        tryDifferent: 'Intenta con otro término',
        allTypes: 'Todos',
        movie: 'Película',
        episode: 'Episodio',

        // Footer
        footerDescription: 'Tu destino para descubrir películas y series.',
        explore: 'Explorar',
        settings: 'Configuración',
        contact: 'Contacto',
        privacy: 'Privacidad',
        terms: 'Términos',
        by: 'por',
        dataProvidedBy: 'Datos de',

        // Filters & Sort
        allGenres: 'Todos los Géneros',
        sortBy: 'Ordenar por',
        mostPopular: 'Más Populares',
        topRated: 'Mejor Valorados',
        newest: 'Más Recientes',
        oldest: 'Más Antiguos',

        // Genres
        action: 'Acción',
        adventure: 'Aventura',
        comedy: 'Comedia',
        drama: 'Drama',
        scifi: 'Ciencia Ficción',
        horror: 'Terror',
        romance: 'Romance',
        thriller: 'Thriller',
        animation: 'Animación',
        fantasy: 'Fantasía',
        crime: 'Crimen',
        documentary: 'Documental',

        // Footer
        emailUs: 'Escríbenos',
        allRightsReserved: 'Todos los derechos reservados.',
        madeWith: 'Hecho con',

        // 404
        pageNotFound: 'Página no encontrada',
        pageNotFoundDesc: 'La página que buscas no existe.',
        backToHome: 'Volver al inicio',
    },
    en: {
        welcomeTo: 'Welcome to',
        subtitle: 'Discover movies, series and more. Explore now.',
        home: 'Home',
        favorites: 'Favorites',
        movies: 'Movies',
        series: 'Series',
        search: 'Search',
        trending: 'Trending Movies',
        popularSeries: 'Popular Series',
        seeAll: 'See all',
        loading: 'Loading...',

        // Movies & Series pages
        discoverMovies: 'Discover the best movies',
        discoverSeries: 'Discover the best series',
        searchMovies: 'Search movies...',
        searchSeries: 'Search series...',
        searchingMovies: 'Searching movies',
        searchingSeries: 'Searching series',
        allYears: 'All years',
        results: 'results for',

        // Movie Detail
        plot: 'Synopsis',
        synopsisNotAvailable: 'Synopsis not available.',
        castCrew: 'Cast & Crew',
        director: 'Director',
        writers: 'Writers',
        actors: 'Actors',
        trailer: 'Trailer',
        watchTrailer: 'Watch Trailer',
        watchOnYouTube: 'Watch on YouTube',
        ratings: 'Ratings',
        votes: 'votes',
        similarTitles: 'Similar Titles',
        awards: 'Awards',
        information: 'Information',
        releaseDate: 'Release',
        country: 'Country',
        language: 'Language',
        boxOffice: 'Box Office',
        goBack: 'Go Back',
        error: 'Error',
        movieNotFound: 'Not found',
        errorLoading: 'Error loading',

        // Favorites
        yourFavorites: 'Your Favorites',
        noFavorites: 'No favorites yet',
        startAdding: 'Add movies to your collection!',
        exploreCatalog: 'Explore catalog',

        // Actions
        viewDetails: 'View details',
        share: 'Share',
        clearSearch: 'Clear',

        // Search Results
        resultsFor: 'Results for',
        noResults: 'No results',
        tryDifferent: 'Try another term',
        allTypes: 'All',
        movie: 'Movie',
        episode: 'Episode',

        // Filters & Sort
        allGenres: 'All Genres',
        sortBy: 'Sort by',
        mostPopular: 'Most Popular',
        topRated: 'Top Rated',
        newest: 'Newest',
        oldest: 'Oldest',

        // Genres
        action: 'Action',
        adventure: 'Adventure',
        comedy: 'Comedy',
        drama: 'Drama',
        scifi: 'Sci-Fi',
        horror: 'Horror',
        romance: 'Romance',
        thriller: 'Thriller',
        animation: 'Animation',
        fantasy: 'Fantasy',
        crime: 'Crime',
        documentary: 'Documentary',

        // Footer
        footerDescription: 'Your destination to discover movies and series.',
        explore: 'Explore',
        settings: 'Settings',
        contact: 'Contact',
        privacy: 'Privacy',
        terms: 'Terms',
        emailUs: 'Email us',
        allRightsReserved: 'All rights reserved.',
        madeWith: 'Made with',
        by: 'by',
        dataProvidedBy: 'Data from',

        // 404
        pageNotFound: 'Page not found',
        pageNotFoundDesc: 'The page you are looking for does not exist.',
        backToHome: 'Back to home',
    }
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        try {
            return localStorage.getItem('cine-nexus-lang') || 'es';
        } catch {
            return 'es';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cine-nexus-lang', language);
            document.documentElement.lang = language;
        } catch (error) {
            console.error('Error saving language:', error);
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'es' ? 'en' : 'es');
    };

    const t = (key) => {
        return translations[language]?.[key] || translations['es']?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
