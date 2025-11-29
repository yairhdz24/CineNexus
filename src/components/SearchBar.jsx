import { Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ initialValue = '', className = '' }) {
    const [query, setQuery] = useState(initialValue);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`relative w-full max-w-xl ${className}`}
        >
            <div className="relative w-full rounded-full bg-white/10 dark:bg-slate-900/40 border border-white/30 dark:border-white/10 shadow-lg shadow-slate-900/10 dark:shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:border-primary-400/70 hover:shadow-primary-500/30">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-primary-500/90 text-white shadow-md">
                    <Search size={18} />
                </span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar peliculas, series..."
                    className="w-full py-3 pl-12 pr-4 text-sm md:text-base text-slate-900 bg-transparent rounded-full focus:outline-none focus:ring-0 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                />
            </div>
        </form>
    );
}
