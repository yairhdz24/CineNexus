import { Link, NavLink } from 'react-router-dom';
import { Film, Heart, Languages } from 'lucide-react';
import { motion } from 'motion/react';
import { ToggleTheme } from './ToggleTheme';
import SearchBar from './SearchBar';
import { useLanguage } from '../context/LanguageContext';

/**
 * Componente de barra de navegación principal
 * Incluye logo animado, búsqueda, navegación y controles
 */
export default function Navbar() {
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-700/50 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 transition-all duration-300">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo animado con efecto vibrante */}
                <Link to="/" className="flex items-center space-x-3 group relative">
                    {/* Blur de fondo del logo */}
                    <motion.div 
                        className="absolute -inset-3 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{
                            background: [
                                'linear-gradient(90deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2), rgba(6,182,212,0.2))',
                                'linear-gradient(90deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2), rgba(236,72,153,0.2))',
                                'linear-gradient(90deg, rgba(236,72,153,0.2), rgba(6,182,212,0.2), rgba(139,92,246,0.2))',
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                    
                    {/* Icono de película */}
                    <motion.div 
                        className="relative"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Film size={32} className="text-purple-600 dark:text-purple-400" />
                    </motion.div>
                    
                    {/* Texto animado "Cine Nexus" */}
                    <motion.span 
                        className="text-2xl font-black tracking-tight relative"
                        style={{
                            background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                        animate={{
                            backgroundPosition: ['0% center', '200% center'],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        Cine Nexus
                    </motion.span>
                </Link>

                {/* Barra de búsqueda */}
                <div className="hidden md:block flex-1 max-w-lg mx-8">
                    <SearchBar />
                </div>

                {/* Navegación y controles */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <nav className="hidden md:flex items-center space-x-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`
                            }
                        >
                            {t('home')}
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                                    isActive 
                                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300' 
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`
                            }
                        >
                            <Heart size={18} />
                            <span>{t('favorites')}</span>
                        </NavLink>
                    </nav>
                    
                    {/* Botón de idioma */}
                    <motion.button
                        onClick={toggleLanguage}
                        className="p-2.5 rounded-xl transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Cambiar idioma"
                        title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                    >
                        <Languages size={20} />
                    </motion.button>
                    
                    {/* Toggle de tema */}
                    <ToggleTheme />
                </div>
            </div>
        </header>
    );
}
