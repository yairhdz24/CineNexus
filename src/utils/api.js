const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchTerm, page = 1, type = '', year = '') => {
    if (!searchTerm) return { Search: [], totalResults: 0, Response: 'False', Error: 'No query provided' };

    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('s', searchTerm);
    url.searchParams.append('page', page);
    if (type) url.searchParams.append('type', type);
    if (year) url.searchParams.append('y', year);

    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching movies:', error);
        return { Response: 'False', Error: error.message };
    }
};

export const fetchMovieDetails = async (id) => {
    if (!id) return { Response: 'False', Error: 'No ID provided' };

    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('i', id);
    url.searchParams.append('plot', 'full');

    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return { Response: 'False', Error: error.message };
    }
};
