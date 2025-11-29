// Obtener API key de las variables de entorno o usar una por defecto
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '38a89049';
const BASE_URL = 'https://www.omdbapi.com/';

// Log para debug (solo en desarrollo)
if (import.meta.env.DEV) {
    console.log('API Key configurada:', API_KEY ? 'SI' : 'NO');
    if (!import.meta.env.VITE_OMDB_API_KEY) {
        console.warn('Usando API key por defecto. Para usar tu propia key, crea un archivo .env con VITE_OMDB_API_KEY=tu_key');
    }
}

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
    if (!id) {
        console.error('No ID provided to fetchMovieDetails');
        return { Response: 'False', Error: 'No ID provided' };
    }

    // Verificar que la API key existe
    if (!API_KEY) {
        console.error('OMDb API Key no encontrada. Verifica que VITE_OMDB_API_KEY este configurada en .env');
        return { Response: 'False', Error: 'API Key no configurada' };
    }

    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('i', id);
    url.searchParams.append('plot', 'full');

    console.log('Fetching movie details for ID:', id);
    console.log('API URL:', url.toString().replace(API_KEY, 'API_KEY_HIDDEN'));

    try {
        const response = await fetch(url.toString());
        
        if (!response.ok) {
            console.error('HTTP Error:', response.status, response.statusText);
            return { Response: 'False', Error: `HTTP Error: ${response.status} ${response.statusText}` };
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Verificar si hay error en la respuesta
        if (data.Response === 'False') {
            console.error('OMDb API Error:', data.Error);
            return data;
        }
        
        // Verificar que tenemos datos validos
        if (!data.imdbID) {
            console.error('Datos invalidos recibidos:', data);
            return { Response: 'False', Error: 'Datos invalidos recibidos de la API' };
        }
        
        console.log('Movie details loaded successfully:', data.Title);
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return { Response: 'False', Error: error.message || 'Error desconocido al cargar detalles' };
    }
};

// Funcion para buscar trailer en YouTube
export const fetchTrailer = async (title, year) => {
    try {
        // Buscar en YouTube usando el titulo y año
        const searchQuery = `${title} ${year} official trailer`;
        const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
        
        // Alternativa: usar YouTube Data API si tienes una clave
        // Por ahora, retornamos una URL de busqueda que el usuario puede usar
        return {
            youtubeUrl: youtubeSearchUrl,
            embedUrl: null // Se puede obtener con YouTube Data API
        };
    } catch (error) {
        console.error('Error fetching trailer:', error);
        return null;
    }
};
