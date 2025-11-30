
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';


export const fetchMovies = async (searchTerm, page = 1, type = '', year = '') => {
    if (!searchTerm) {
        return { Search: [], totalResults: 0, Response: 'False', Error: 'No query provided' };
    }

    let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
    
    if (type) {
        url += `&type=${type}`;
    }
    if (year) {
        url += `&y=${year}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching movies:', error);
        return { Search: [], Response: 'False', Error: error.message };
    }
};


export const fetchMovieDetails = async (id) => {
    if (!id) {
        return { Response: 'False', Error: 'No ID provided' };
    }

    const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return { Response: 'False', Error: error.message };
    }
};

/**
 * Genera una URL de búsqueda de YouTube para el tráiler de una película
 * @param {string} title - Título de la película
 * @param {string} year - Año de lanzamiento
 * @returns {Object|null} Objeto con la URL de búsqueda de YouTube
 */
export const fetchTrailer = async (title, year) => {
    try {
        const searchQuery = `${title} ${year} official trailer`;
        const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
        
        return {
            youtubeUrl: youtubeSearchUrl,
            embedUrl: null
        };
    } catch (error) {
        console.error('Error fetching trailer:', error);
        return null;
    }
};
