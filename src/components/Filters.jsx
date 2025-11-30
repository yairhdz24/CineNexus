import { useLanguage } from '../context/LanguageContext';
import { Filter, X } from 'lucide-react';

export default function Filters({ type, setType, year, setYear }) {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    const hasFilters = type || year;

    const clearFilters = () => {
        setType('');
        setYear('');
    };

    return (
        <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Filter size={18} />
            </div>

            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-white focus:outline-none focus:border-violet-500 cursor-pointer shadow-sm"
            >
                <option value="">🎬 {t('all')}</option>
                <option value="movie">🎥 {t('movies')}</option>
                <option value="series">📺 {t('series')}</option>
            </select>

            <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-white focus:outline-none focus:border-violet-500 cursor-pointer shadow-sm"
            >
                <option value="">📅 {t('year')}</option>
                {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                ))}
            </select>

            {hasFilters && (
                <button
                    onClick={clearFilters}
                    className="p-2.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
