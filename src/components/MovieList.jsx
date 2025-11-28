import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';

export default function MovieList({ movies, loading, viewMode = 'grid' }) {
    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <MovieCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!movies?.length) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 dark:text-slate-400 text-lg">No movies found.</p>
            </div>
        );
    }

    return (
        <div className={viewMode === 'grid'
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
            : "space-y-4"
        }>
            {movies.map((movie, index) => (
                <div key={movie.imdbID} className="stagger-enter" style={{ animationDelay: `${index * 0.05}s` }}>
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    );
}
