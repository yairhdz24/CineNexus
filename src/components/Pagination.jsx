import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Componente de paginación para los resultados de búsqueda
 * La API de OMDb devuelve 10 resultados por página
 * @param {number} currentPage - Página actual
 * @param {number} totalResults - Total de resultados encontrados
 * @param {Function} onPageChange - Función que se ejecuta al cambiar de página
 */
export default function Pagination({ currentPage, totalResults, onPageChange }) {
    const totalPages = Math.ceil(totalResults / 10);

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex justify-center items-center space-x-4 mt-12 mb-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg text-slate-700 dark:text-slate-200"
                aria-label="Página anterior"
            >
                <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
                Página {currentPage} de {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg text-slate-700 dark:text-slate-200"
                aria-label="Página siguiente"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
