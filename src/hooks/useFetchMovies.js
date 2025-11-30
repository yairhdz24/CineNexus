import { useState, useEffect, useCallback } from 'react';
import { fetchMovies } from '../utils/api';

/**
 * Tiempo de expiración del caché en milisegundos (5 minutos)
 */
const CACHE_EXPIRATION = 1000 * 60 * 5;

/**
 * Hook personalizado para buscar películas con caché en localStorage
 * Implementa un sistema de caché para reducir llamadas a la API
 * @param {string} searchTerm - Término de búsqueda
 * @param {number} page - Número de página (por defecto 1)
 * @param {string} type - Tipo de contenido: 'movie', 'series', 'episode' o vacío
 * @param {string} year - Año de lanzamiento (opcional)
 * @returns {Object} Objeto con data, loading y error
 */
export function useFetchMovies(searchTerm, page = 1, type = '', year = '') {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Genera una clave única para el caché basada en los parámetros de búsqueda
     * @param {string} term - Término de búsqueda
     * @param {number} p - Página
     * @param {string} t - Tipo
     * @param {string} y - Año
     * @returns {string} Clave del caché
     */
    const getCacheKey = (term, p, t, y) => `search_${term}_${p}_${t}_${y}`;

    /**
     * Función que realiza la búsqueda de películas
     * Primero verifica el caché, si no existe o expiró, hace la petición a la API
     */
    const fetchData = useCallback(async () => {
        if (!searchTerm) {
            setData(null);
            return;
        }

        const cacheKey = getCacheKey(searchTerm, page, type, year);
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            const { data: cachedData, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_EXPIRATION) {
                setData(cachedData);
                return;
            }
        }

        setLoading(true);
        setError(null);

        try {
            const result = await fetchMovies(searchTerm, page, type, year);
            if (result.Response === 'True') {
                setData(result);
                localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
            } else {
                setError(result.Error);
                setData(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, page, type, year]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error };
}
