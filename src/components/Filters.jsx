import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Filter, Calendar, Film } from 'lucide-react';

/**
 * Componente de filtros premium para búsqueda de películas
 * Permite filtrar por tipo (película, serie, episodio) y año
 * @param {string} type - Tipo seleccionado actualmente
 * @param {Function} setType - Función para actualizar el tipo
 * @param {string} year - Año seleccionado actualmente
 * @param {Function} setYear - Función para actualizar el año
 */
export default function Filters({ type, setType, year, setYear }) {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    return (
        <motion.div 
            className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Icono de filtros */}
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Filter size={20} className="text-primary-500" />
                <span className="text-sm font-semibold hidden sm:block">Filtros:</span>
            </div>

            {/* Filtro de tipo */}
            <div className="relative">
                <Film size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all cursor-pointer appearance-none shadow-sm hover:shadow-md"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                    }}
                >
                    <option value="">{t('allTypes')}</option>
                    <option value="movie">{t('movies')}</option>
                    <option value="series">{t('series')}</option>
                    <option value="episode">{t('episodes')}</option>
                </select>
            </div>

            {/* Filtro de año */}
            <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="pl-10 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all cursor-pointer appearance-none shadow-sm hover:shadow-md"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                    }}
                >
                    <option value="">{t('allYears')}</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            {/* Botón para limpiar filtros */}
            {(type || year) && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => {
                        setType('');
                        setYear('');
                    }}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                    Limpiar
                </motion.button>
            )}
        </motion.div>
    );
}
