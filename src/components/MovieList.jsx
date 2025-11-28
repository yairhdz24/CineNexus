import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import { useLanguage } from '../context/LanguageContext';

export default function MovieList({ movies, loading, viewMode = 'grid' }) {
    const { t } = useLanguage();

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!movies?.length) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No se encontraron peliculas.</p>
            </div>
        );
    }

    // Eliminar duplicados basado en imdbID
    const uniqueMovies = movies.filter((movie, index, self) => 
        index === self.findIndex((m) => m.imdbID === movie.imdbID)
    );

    return (
        <div className={viewMode === 'grid'
            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            : "space-y-4"
        }>
            {uniqueMovies.map((movie, index) => (
                <div key={movie.imdbID} className="stagger-enter" style={{ animationDelay: `${index * 0.05}s` }}>
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
}
