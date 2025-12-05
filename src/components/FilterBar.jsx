// ============================================
// COMPONENTE: FilterBar
// Descripción: Barra de filtros completa con diseño Premium y Tabs para móvil
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
    Map,
    ListFilter,
    ArrowUpDown
} from 'lucide-react';
import SearchBar from './SearchBar';

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
    const [activeTab, setActiveTab] = useState('genres'); // 'genres', 'filters', 'sort'

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

    // Obtener etiqueta del filtro
    const getFilterLabel = (type, value) => {
        if (value === 'all') return null;
        switch (type) {
            case 'genre': return genres.find(g => g.id === value)?.label;
            case 'year': return years.find(y => y.id === value)?.label;
            case 'quality': return qualities.find(q => q.id === value)?.label;
            case 'type': return contentTypes.find(t => t.id === value)?.label;
            default: return value;
        }
    };

    return (
        <div className={`relative z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg transition-all duration-300 ${className}`}>
            <div className="container mx-auto px-4 py-4">

                {/* Header Premium con Estrella */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <Star size={20} className="text-white fill-white" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                            Explorar Catálogo
                        </h2>
                    </div>
                </div>

                {/* Filtros Activos (Chips) */}
                {hasActiveFilters() && (
                    <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
                        {Object.entries(filters).map(([key, value]) => {
                            if (key === 'sort' || value === 'all') return null;
                            const label = getFilterLabel(key, value);
                            if (!label) return null;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleFilterChange(key, 'all')}
                                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 rounded-full text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400 transition-all group"
                                >
                                    <span>{label}</span>
                                    <X size={12} className="group-hover:scale-110" />
                                </button>
                            );
                        })}
                        <button
                            onClick={clearFilters}
                            className="text-xs font-bold text-slate-500 hover:text-red-500 transition-colors ml-2 underline decoration-dotted"
                        >
                            Limpiar todo
                        </button>
                    </div>
                )}

                {/* Botón móvil para expandir filtros */}
                <div className="md:hidden mb-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-2xl font-bold shadow-lg shadow-violet-500/30 active:scale-95 transition-all"
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
                <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>

                    {/* SearchBar para Móvil */}
                    <div className="md:hidden">
                        <SearchBar className="w-full" />
                    </div>

                    {/* TABS PARA MÓVIL */}
                    <div className="md:hidden flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4">
                        <button
                            onClick={() => setActiveTab('genres')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'genres'
                                ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400'
                                }`}
                        >
                            Géneros
                        </button>
                        <button
                            onClick={() => setActiveTab('filters')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'filters'
                                ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400'
                                }`}
                        >
                            Filtros
                        </button>
                        <button
                            onClick={() => setActiveTab('sort')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'sort'
                                ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
                                : 'text-slate-500 dark:text-slate-400'
                                }`}
                        >
                            Ordenar
                        </button>
                    </div>

                    {/* SECCION: Filtros de Tipo de Contenido (Visible siempre en Desktop, en Tab 'filters' en móvil) */}
                    <div className={`space-y-3 ${activeTab === 'filters' ? 'block' : 'hidden md:block'}`}>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden md:block">
                            Tipo de Contenido
                        </label>
                        <div className="flex items-center gap-3 flex-wrap">
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
                                                ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-violet-500/40'
                                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm'
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

                    {/* SECCION: Filtros de Género (Visible siempre en Desktop, en Tab 'genres' en móvil) */}
                    <div className={`space-y-3 ${activeTab === 'genres' ? 'block' : 'hidden md:block'}`}>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden md:block">
                            Género
                        </label>
                        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide pb-2 mask-linear-fade">
                            {genres.map((genre) => {
                                const isActive = filters.genre === genre.id;
                                const Icon = genre.icon;

                                return (
                                    <button
                                        key={genre.id}
                                        onClick={() => handleFilterChange('genre', genre.id)}
                                        className={`
                                            group flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap
                                            transition-all duration-300 transform hover:scale-105 border
                                            ${isActive
                                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-transparent shadow-lg shadow-cyan-500/40'
                                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 shadow-sm'
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

                    {/* SECCION: Filtros Avanzados (Año, Calidad, Orden) */}
                    <div className={`flex items-center gap-3 flex-wrap pt-2 md:border-t border-slate-200 dark:border-slate-800 ${activeTab === 'filters' || activeTab === 'sort' ? 'block' : 'hidden md:flex'}`}>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hidden md:block mr-2">
                            Filtros:
                        </label>

                        {/* Dropdown de Año (Visible en Tab 'filters' o Desktop) */}
                        <div className={`relative ${activeTab === 'filters' ? 'block w-full md:w-auto' : 'hidden md:block'}`}>
                            <button
                                onClick={() => setShowYearDropdown(!showYearDropdown)}
                                className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2.5 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm border border-slate-200 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500"
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-violet-500" />
                                    {years.find(y => y.id === filters.year)?.label || 'Año'}
                                </div>
                                <ChevronDown size={14} className={`transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Menu desplegable de años */}
                            {showYearDropdown && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowYearDropdown(false)}
                                    />
                                    <div className="absolute top-full mt-2 left-0 w-full md:w-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50 min-w-[200px] max-h-60 overflow-y-auto">
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
                                                        ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
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

                        {/* Filtros de Calidad (Visible en Tab 'filters' o Desktop) */}
                        <div className={`flex flex-wrap gap-2 ${activeTab === 'filters' ? 'block w-full md:w-auto' : 'hidden md:flex'}`}>
                            {qualities.map((quality) => {
                                const isActive = filters.quality === quality.id;
                                const Icon = quality.icon;

                                return (
                                    <button
                                        key={quality.id}
                                        onClick={() => handleFilterChange('quality', quality.id)}
                                        className={`
                                            group flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs
                                            transition-all duration-300 transform hover:scale-105 border
                                            ${isActive
                                                ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/40'
                                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:text-amber-600 shadow-sm'
                                            }
                                        `}
                                    >
                                        <Icon size={14} className={`${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                                        {quality.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Selector de Ordenamiento (Visible en Tab 'sort' o Desktop) */}
                        <div className={`relative group ${activeTab === 'sort' ? 'block w-full md:w-auto' : 'hidden md:block'}`}>
                            <select
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                                className="w-full md:w-auto appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm border border-slate-200 dark:border-slate-700 hover:border-violet-500 cursor-pointer outline-none"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-violet-500 transition-colors" />
                        </div>

                        {/* Botón para limpiar filtros */}
                        {hasActiveFilters() && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm transition-all ml-auto shadow-sm hover:shadow border border-red-200 dark:border-red-900/50 w-full md:w-auto mt-4 md:mt-0"
                            >
                                <X size={16} />
                                Limpiar
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
