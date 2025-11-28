import { Link, NavLink } from 'react-router-dom';
import { Film, Heart, Home, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { ToggleTheme } from './ToggleTheme';
import SearchBar from './SearchBar';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { t } = useLanguage();
    
    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 shadow-md"
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:opacity-80 transition-opacity">
                        <Film size={28} className="animate-pulse-glow" />
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">
                            Cine Nexus
                        </span>
                    </Link>
                </motion.div>

                <div className="hidden md:block flex-1 max-w-md mx-8">
                    <SearchBar />
                </div>

                <div className="flex items-center space-x-4">
                    <nav className="hidden md:flex items-center space-x-6">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `font-medium transition-all duration-300 hover:text-primary-500 relative flex items-center space-x-1.5 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Home size={18} className={isActive ? "text-primary-600 dark:text-primary-400" : ""} />
                                    <span>{t('home')}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                `font-medium transition-all duration-300 hover:text-primary-500 flex items-center space-x-1.5 relative ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Heart size={18} className={isActive ? "fill-current text-primary-600 dark:text-primary-400" : ""} />
                                    <span>{t('favorites')}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    </nav>
                    <div className="flex items-center space-x-2">
                        <LanguageToggle />
                        <ToggleTheme />
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
