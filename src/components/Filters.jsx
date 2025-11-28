export default function Filters({ type, setType, year, setYear }) {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    return (
        <div className="flex flex-wrap gap-4 mb-6 animate-fade-in">
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all hover:border-primary-400"
            >
                <option value="">Todos los Tipos</option>
                <option value="movie">Películas</option>
                <option value="series">Series</option>
                <option value="episode">Episodios</option>
            </select>

            <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all hover:border-primary-400"
            >
                <option value="">Todos los Años</option>
                {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                ))}
            </select>
        </div>
    );
}
