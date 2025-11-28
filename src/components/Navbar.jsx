import { Link, NavLink } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { ToggleTheme } from './ToggleTheme';
import SearchBar from './SearchBar';

export default function Navbar() {
    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 shadow-sm"
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
                                `font-medium transition-all duration-300 hover:text-primary-500 relative ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    Inicio
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
                                `font-medium transition-all duration-300 hover:text-primary-500 flex items-center space-x-1 relative ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Heart size={18} className={isActive ? "fill-current" : ""} />
                                    <span>Favoritos</span>
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
                    <ToggleTheme />
                </div>
            </div>
        </motion.header>
    );
}
