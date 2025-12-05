// ============================================
// COMPONENTE: FilterBar
// Descripción: Barra de filtros completa con géneros, años, calidad y ordenamiento
// ============================================

import { useState } from 'react';
import {
    Film,
    Tv,
    Calendar,
    Star,
    Sparkles,
    Filter,
    X,
    ChevronDown,
    Zap,
    Laugh,
    Drama,
    Ghost,
    Rocket,
    Heart,
    Skull,
    Palette,
    Map
} from 'lucide-react';

// Configuración de géneros con iconos
const genres = [
    { id: 'all', label: 'Todos', icon: Sparkles, search: '' },
    { id: 'action', label: 'Acción', icon: Zap, search: 'action' },
    { id: 'comedy', label: 'Comedia', icon: Laugh, search: 'comedy' },
    { id: 'drama', label: 'Drama', icon: Drama, search: 'drama' },
    { id: 'horror', label: 'Terror', icon: Ghost, search: 'horror' },
    { id: 'scifi', label: 'Ciencia Ficción', icon: Rocket, search: 'science fiction' },
    { id: 'romance', label: 'Romance', icon: Heart, search: 'romance' },
    { id: 'thriller', label: 'Suspenso', icon: Skull, search: 'thriller' },
    { id: 'animation', label: 'Animación', icon: Palette, search: 'animation' },
    { id: 'adventure', label: 'Aventura', icon: Map, search: 'adventure' },
];

// Opciones de años
const years = [
    { id: 'all', label: 'Todos los años' },
    { id: '2024', label: '2024' },
    { id: '2023', label: '2023' },
    { id: '2022', label: '2022' },
    { id: '2021', label: '2021' },
    { id: '2020', label: '2020' },
    { id: '2010s', label: '2010-2019' },
    { id: '2000s', label: '2000-2009' },
    { id: '90s', label: '1990-1999' },
];

// Opciones de calidad
const qualities = [
    { id: 'all', label: 'Todas', icon: Sparkles },
    { id: 'hd', label: 'HD', icon: Star },
    { id: 'fullhd', label: 'Full HD', icon: Star },
    { id: '4k', label: '4K', icon: Sparkles },
];

// Opciones de ordenamiento
const sortOptions = [
    { id: 'popular', label: 'Más Populares' },
    { id: 'recent', label: 'Más Recientes' },
    { id: 'title', label: 'Título A-Z' },
    { id: 'rating', label: 'Mejor Valoradas' },
];

// Tipos de contenido
const contentTypes = [
    { id: 'all', label: 'Todo', icon: Sparkles },
    { id: 'movie', label: 'Películas', icon: Film },
    { id: 'series', label: 'Series', icon: Tv },
];

export default function FilterBar({
    filters = {},
    onFilterChange,
    className = ''
}) {
    // Estados
    const [isExpanded, setIsExpanded] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    // Manejar cambio de filtro
    const handleFilterChange = (filterType, value) => {
        onFilterChange({
            ...filters,
            [filterType]: value
        });
    };

    // Limpiar todos los filtros
    const clearFilters = () => {
        onFilterChange({
            genre: 'all',
            year: 'all',
            quality: 'all',
            sort: 'popular',
            type: 'all'
        });
    };

    // Verificar si hay filtros activos
    const hasActiveFilters = () => {
        return filters.genre !== 'all' ||
            filters.year !== 'all' ||
            filters.quality !== 'all' ||
            filters.type !== 'all' ||
            filters.sort !== 'popular';
    };

    return (
        <div className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg ${className}`}>
            <div className="container mx-auto px-4 py-5">

                {/* Botón móvil para expandir filtros */}
                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                    >
                        <span className="flex items-center gap-2.5">
                            <Filter size={20} />
                            Filtros y Búsqueda
                        </span>
                        <ChevronDown
                            size={20}
                            className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        />
                    </button>
                </div>

                {/* Contenedor de filtros */}
                <div className={`space-y-5 ${isExpanded ? 'block' : 'hidden md:block'}`}>

                    {/* SECCION: Filtros de Tipo de Contenido */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden md:block">
                            Tipo de Contenido
                        </label>
                        <div className="flex items-center gap-2.5 flex-wrap">
                            {contentTypes.map((type) => {
                                const isActive = filters.type === type.id;
                                const Icon = type.icon;

                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => handleFilterChange('type', type.id)}
                                        className={`
                                            group flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-bold text-sm
                                            transition-all duration-300 transform hover:scale-105
                                            ${isActive
                                                ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg shadow-primary-500/40'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-md'
                                            }
                                        `}
                                    >
                                        <Icon size={18} className={`${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                                        {type.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECCION: Filtros de Género */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden md:block">
                            Género
                        </label>
                        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide pb-2">
                            {genres.map((genre) => {
                                const isActive = filters.genre === genre.id;
                                const Icon = genre.icon;

                                return (
                                    <button
                                        key={genre.id}
                                        onClick={() => handleFilterChange('genre', genre.id)}
                                        className={`
                                            group flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap
                                            transition-all duration-300 transform hover:scale-105
                                            ${isActive
                                                ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/40'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm'
                                            }
                                        `}
                                    >
                                        <Icon size={16} className={`${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                                        {genre.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECCION: Filtros Avanzados */}
                    <div className="flex items-center gap-3 flex-wrap">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden md:block">
                            Filtros Avanzados:
                        </label>

                        {/* Dropdown de Año */}
                        <div className="relative">
                            <button
                                onClick={() => setShowYearDropdown(!showYearDropdown)}
                                className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                <Calendar size={16} />
                                {years.find(y => y.id === filters.year)?.label || 'Año'}
                                <ChevronDown size={14} className={`transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Menu desplegable de años */}
                            {showYearDropdown && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowYearDropdown(false)}
                                    />
                                    <div className="absolute top-full mt-2 left-0 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 min-w-[200px]">
                                        {years.map((year) => (
                                            <button
                                                key={year.id}
                                                onClick={() => {
                                                    handleFilterChange('year', year.id);
                                                    setShowYearDropdown(false);
                                                }}
                                                className={`
                                                    w-full px-4 py-2.5 text-left text-sm font-semibold transition-all
                                                    ${filters.year === year.id
                                                        ? 'bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/30 dark:to-purple-900/30 text-primary-600 dark:text-primary-400'
                                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                                                    }
                                                `}
                                            >
                                                {year.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Filtros de Calidad */}
                        {qualities.map((quality) => {
                            const isActive = filters.quality === quality.id;
                            const Icon = quality.icon;

                            return (
                                <button
                                    key={quality.id}
                                    onClick={() => handleFilterChange('quality', quality.id)}
                                    className={`
                                        group flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs
                                        transition-all duration-300 transform hover:scale-105
                                        ${isActive
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/40'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-md'
                                        }
                                    `}
                                >
                                    <Icon size={14} className={`${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                                    {quality.label}
                                </button>
                            );
                        })}

                        {/* Selector de Ordenamiento */}
                        <select
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg border-none outline-none cursor-pointer transform hover:scale-105"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Botón para limpiar filtros */}
                        {hasActiveFilters() && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm transition-all ml-auto shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                <X size={16} />
                                Limpiar Filtros
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
