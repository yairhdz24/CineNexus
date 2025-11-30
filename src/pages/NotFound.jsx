import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Film } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
            <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="inline-flex items-center justify-center w-24 h-24 bg-violet-100 dark:bg-violet-900/30 rounded-full mb-6"
                >
                    <Film size={48} className="text-violet-600 dark:text-violet-400" />
                </motion.div>
                
                <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                    {t('pageNotFound')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                    {t('pageNotFoundDesc')}
                </p>
                
                <Link 
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full transition-all"
                >
                    <Home size={20} />
                    {t('backToHome')}
                </Link>
            </motion.div>
        </div>
    );
}
