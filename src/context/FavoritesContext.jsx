import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext(null);

/**
 * Proveedor de contexto para gestionar las películas favoritas
 */
export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    // Cargar favoritos de localStorage al iniciar
    useEffect(() => {
        try {
            const saved = localStorage.getItem('cine-nexus-favorites');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setFavorites(parsed);
                }
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    }, []);

    // Guardar favoritos en localStorage cuando cambian
    useEffect(() => {
        try {
            localStorage.setItem('cine-nexus-favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    }, [favorites]);

    const addFavorite = (movie) => {
        if (!movie || !movie.imdbID) return;
        
        setFavorites(prev => {
            // Verificar si ya existe
            if (prev.some(fav => fav.imdbID === movie.imdbID)) {
                return prev;
            }
            // Agregar nuevo favorito
            return [...prev, {
                imdbID: movie.imdbID,
                Title: movie.Title || 'Sin título',
                Year: movie.Year || '',
                Poster: movie.Poster || 'N/A',
                Type: movie.Type || 'movie'
            }];
        });
    };

    const removeFavorite = (imdbID) => {
        if (!imdbID) return;
        setFavorites(prev => prev.filter(movie => movie.imdbID !== imdbID));
    };

    const isFavorite = (imdbID) => {
        if (!imdbID) return false;
        return favorites.some(movie => movie.imdbID === imdbID);
    };

    const toggleFavorite = (movie) => {
        if (!movie || !movie.imdbID) return;
        
        if (isFavorite(movie.imdbID)) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <FavoritesContext.Provider value={{ 
            favorites, 
            addFavorite, 
            removeFavorite, 
            isFavorite,
            toggleFavorite 
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
}
