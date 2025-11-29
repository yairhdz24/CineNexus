import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (movie) => {
        if (!movie || !movie.imdbID) {
            console.error('Intento de agregar favorito invalido:', movie);
            return;
        }
        setFavorites((prev) => {
            // Filtrar favoritos invalidos y duplicados
            const valid = prev.filter(fav => fav && fav.imdbID);
            if (valid.some((fav) => fav.imdbID === movie.imdbID)) return valid;
            return [...valid, movie];
        });
    };

    const removeFavorite = (imdbID) => {
        setFavorites((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
    };

    const isFavorite = (imdbID) => {
        return favorites.some((movie) => movie.imdbID === imdbID);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
