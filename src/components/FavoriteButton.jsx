import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import clsx from 'clsx';

export default function FavoriteButton({ movie, className }) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(movie.imdbID);

    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            removeFavorite(movie.imdbID);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className={clsx(
                "p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none",
                favorite
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/30"
                    : "bg-black/30 backdrop-blur-sm text-white hover:bg-red-500 hover:text-white",
                className
            )}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
            <Heart size={20} fill={favorite ? "currentColor" : "none"} />
        </button>
    );
}
