import { Filter, Calendar, Star, ArrowUpDown, Film, Tv, Sparkles, ChevronDown, Swords, Compass, Laugh, Drama, Rocket, Skull, Heart, AlertTriangle, Wand2, Castle, Search as SearchIcon, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FilterBar({
    filters = {},
    onFilterChange,
    className = '',
    showGenres = true,
    showSort = true,
    showType = true,
    showYear = true
}) {
    const { t } = useLanguage();

    // Datos de filtros con íconos
    const genres = [
        { id: 'action', label: t('action'), icon: Swords },
        { id: 'adventure', label: t('adventure'), icon: Compass },
        { id: 'comedy', label: t('comedy'), icon: Laugh },
        { id: 'drama', label: t('drama'), icon: Drama },
        { id: 'scifi', label: t('scifi'), icon: Rocket },
        { id: 'horror', label: t('horror'), icon: Skull },
        { id: 'romance', label: t('romance'), icon: Heart },
        { id: 'thriller', label: t('thriller'), icon: AlertTriangle },
        { id: 'animation', label: t('animation'), icon: Wand2 },
        { id: 'fantasy', label: t('fantasy'), icon: Castle },
        { id: 'crime', label: t('crime'), icon: SearchIcon },
        { id: 'documentary', label: t('documentary'), icon: FileText }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    const sortOptions = [
        { id: 'popularity.desc', label: t('mostPopular') },
        { id: 'vote_average.desc', label: t('topRated') },
        { id: 'primary_release_date.desc', label: t('newest') },
        { id: 'primary_release_date.asc', label: t('oldest') }
    ];

    // Obtener el ícono del género seleccionado
    const selectedGenre = genres.find(g => g.id === filters.genre);
    const GenreIcon = selectedGenre?.icon || Filter;

    return (
        <div className={`w-full z-40 transition-colors duration-200 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 dark:border-slate-700/50">

                    {/* Header Compact */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                            <Star size={16} className="text-white fill-white" />
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
                            {t('exploreCatalog')}
                        </h2>
                    </div>

                    {/* Filtros Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">

                        {/* 1. Tipo de Contenido (Botones) */}
                        {showType && (
                            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center relative">
                                {['all', 'movie', 'series'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => onFilterChange('type', type)}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-bold transition-all duration-200 relative z-10 ${filters.type === type
                                            ? 'text-white bg-gradient-to-r from-red-600 to-rose-600 shadow-lg'
                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                            }`}
                                    >
                                        {type === 'all' && <Sparkles size={14} />}
                                        {type === 'movie' && <Film size={14} />}
                                        {type === 'series' && <Tv size={14} />}
                                        <span className="capitalize">
                                            {type === 'all' ? t('allTypes') : type === 'movie' ? t('movies') : t('series')}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* 2. Géneros (Dropdown con íconos) */}
                        {showGenres && (
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                                    <GenreIcon size={16} />
                                </div>
                                <select
                                    value={filters.genre || 'all'}
                                    onChange={(e) => onFilterChange('genre', e.target.value)}
                                    className="w-full pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750"
                                >
                                    <option value="all">{t('allGenres')}</option>
                                    {genres.map((genre) => (
                                        <option key={genre.id} value={genre.id}>
                                            {genre.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        )}

                        {/* 3. Años (Dropdown) */}
                        {showYear && (
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                                    <Calendar size={16} />
                                </div>
                                <select
                                    value={filters.year || 'all'}
                                    onChange={(e) => onFilterChange('year', e.target.value)}
                                    className="w-full pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750"
                                >
                                    <option value="all">{t('allYears')}</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        )}

                        {/* 4. Ordenar (Dropdown) */}
                        {showSort && (
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
                                    <ArrowUpDown size={16} />
                                </div>
                                <select
                                    value={filters.sortBy || 'popularity.desc'}
                                    onChange={(e) => onFilterChange('sortBy', e.target.value)}
                                    className="w-full pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all duration-200 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-750"
                                >
                                    {sortOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
