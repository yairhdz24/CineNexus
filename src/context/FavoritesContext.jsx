import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

/**
 * Proveedor de contexto para gestionar las películas favoritas
 * Almacena los favoritos en localStorage para persistencia
 */
export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return saved ? JSON.parse(saved) : [];
    });

    /**
     * Sincroniza los favoritos con localStorage cada vez que cambian
     */
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    /**
     * Agrega una película a favoritos si no está ya agregada
     * @param {Object} movie - Objeto de la película a agregar
     */
    const addFavorite = (movie) => {
        setFavorites((prev) => {
            if (prev.some((fav) => fav.imdbID === movie.imdbID)) {
                return prev;
            }
            return [...prev, movie];
        });
    };

    /**
     * Elimina una película de favoritos por su ID de IMDb
     * @param {string} imdbID - ID de IMDb de la película a eliminar
     */
    const removeFavorite = (imdbID) => {
        setFavorites((prev) => prev.filter((movie) => movie.imdbID !== imdbID));
    };

    /**
     * Verifica si una película está en favoritos
     * @param {string} imdbID - ID de IMDb de la película a verificar
     * @returns {boolean} true si la película está en favoritos, false en caso contrario
     */
    const isFavorite = (imdbID) => {
        return favorites.some((movie) => movie.imdbID === imdbID);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

/**
 * Hook para acceder al contexto de favoritos
 * @returns {Object} Objeto con la lista de favoritos y funciones para gestionarlos
 */
export function useFavorites() {
    return useContext(FavoritesContext);
}
