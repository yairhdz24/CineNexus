import { motion } from 'motion/react';

/**
 * Componente skeleton para las tarjetas de película
 * Muestra un placeholder animado mientras carga el contenido
 */
export default function MovieCardSkeleton() {
    return (
        <motion.div 
            className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {/* Skeleton del poster */}
            <div className="aspect-[2/3] bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
            
            {/* Skeleton de la información */}
            <div className="p-4 space-y-3">
                {/* Título */}
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 animate-pulse" />
                
                {/* Año y tipo */}
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse" />
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20 animate-pulse" />
                </div>
                
                {/* Botón favorito */}
                <div className="flex justify-end">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
}
