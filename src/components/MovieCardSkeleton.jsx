export default function MovieCardSkeleton() {
    return (
        <div className="w-full rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 overflow-hidden shadow-sm animate-pulse backdrop-blur-sm">
            <div className="aspect-[2/3] bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-800 dark:to-slate-700" />
            <div className="p-4 space-y-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-1/2" />
            </div>
        </div>
    );
}
