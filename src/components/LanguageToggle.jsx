import { motion } from 'motion/react';
import { Languages, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.button
            onClick={toggleLanguage}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary-500/10 to-purple-500/10 hover:from-primary-500/20 hover:to-purple-500/20 border border-primary-500/20 dark:border-primary-400/20 transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Cambiar idioma"
        >
            <motion.div
                animate={{ rotate: language === 'en' ? 360 : 0 }}
                transition={{ duration: 0.5 }}
            >
                <Globe 
                    size={18} 
                    className="text-primary-600 dark:text-primary-400 group-hover:text-primary-500 dark:group-hover:text-primary-300 transition-colors" 
                />
            </motion.div>
            
            {/* Badge con el idioma actual */}
            <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-purple-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg"
            >
                {language.toUpperCase()}
            </motion.span>

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 hidden group-hover:block z-50">
                <div className="bg-slate-900 dark:bg-slate-800 text-white text-xs rounded-lg py-1.5 px-3 whitespace-nowrap shadow-xl border border-slate-700">
                    {language === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish'}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-slate-900 dark:border-t-slate-800"></div>
                    </div>
                </div>
            </div>
        </motion.button>
    );
}

