import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

/**
 * Componente de página 404 - Página no encontrada
 * Se muestra cuando el usuario intenta acceder a una ruta que no existe
 */
export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50 dark:bg-slate-950">
            <div className="relative">
                <h1 className="text-9xl font-black text-slate-200 dark:text-slate-800 animate-pulse">404</h1>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Página No Encontrada</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8">La película que buscas está en otro castillo.</p>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-bold"
                    >
                        <Home size={20} className="mr-2" />
                        Ir al Inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
