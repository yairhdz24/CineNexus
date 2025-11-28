import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-bold text-primary-200 dark:text-slate-800 animate-pulse">404</h1>
            <div className="absolute">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Page Not Found</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">The movie you are looking for is in another castle.</p>
                <Link
                    to="/"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors duration-300 shadow-lg hover:shadow-primary-500/30"
                >
                    <Home size={20} className="mr-2" />
                    Go Home
                </Link>
            </div>
        </div>
    );
}
