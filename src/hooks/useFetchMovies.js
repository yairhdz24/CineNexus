import { useState, useEffect, useCallback } from 'react';
import { fetchMovies } from '../utils/api';

const CACHE_EXPIRATION = 1000 * 60 * 5; // 5 minutes

export function useFetchMovies(searchTerm, page = 1, type = '', year = '') {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCacheKey = (term, p, t, y) => `search_${term}_${p}_${t}_${y}`;

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
