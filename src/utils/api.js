/**
 * Configuración de la API de OMDb
 */
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'trilogy';
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Busca películas por término de búsqueda
 */
export const fetchMovies = async (searchTerm, page = 1, type = '', year = '') => {
    if (!searchTerm || searchTerm.trim().length === 0) {
        return { Search: [], totalResults: '0', Response: 'False' };
    }

    try {
        let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm.trim())}&page=${page}`;
        if (type) url += `&type=${type}`;
        if (year) url += `&y=${year}`;

        console.log('Fetching:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { Search: [], totalResults: '0', Response: 'False', Error: error.message };
    }
};

/**
 * Obtiene los detalles de una película por su ID de IMDb
 */
export const fetchMovieDetails = async (id) => {
    if (!id) {
        return { Response: 'False', Error: 'No ID provided' };
    }

    try {
        const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
        console.log('Fetching details:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('Details response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching details:', error);
        return { Response: 'False', Error: error.message };
    }
};

/**
 * Genera una URL de búsqueda de YouTube para el tráiler
 */
export const fetchTrailer = async (title, year) => {
    const searchQuery = `${title} ${year || ''} official trailer`;
    return {
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
        embedUrl: null
    };
};
