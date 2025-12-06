import { Link, NavLink } from 'react-router-dom';
import { Film, Home, Heart, Languages, Clapperboard, Tv } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import logoDark from '../assets/2.png';
import logoLight from '../assets/1.png';
import ToggleTheme from './ToggleTheme';
import { useLanguage } from '../context/LanguageContext';


import SearchBar from './SearchBar';

export default function Navbar() {
    const { t, language, toggleLanguage } = useLanguage();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { to: '/', icon: Home, label: t('home') },
        { to: '/movies', icon: Clapperboard, label: t('movies') },
        { to: '/series', icon: Tv, label: t('series') },
        { to: '/favorites', icon: Heart, label: t('favorites') },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm backdrop-blur-xl">
            {/* Gradient Line Top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-600 to-orange-500" />

            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-24 gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 transform hover:scale-105 transition-transform">
                        {isDark ? (
                            <img src={logoDark} alt="CineNexus Logo" className="w-auto h-36" />
                        ) : (
                            <img src={logoLight} alt="CineNexus Logo" className="w-auto h-36" />
                        )}
                    </Link>

                    {/* Search Bar - Hidden on mobile, visible on desktop */}
                    <div className="hidden md:block flex-1 max-w-md mx-4">
                        <SearchBar className="w-full" />
                    </div>

                    {/* Nav Links & Actions */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.to === '/'}
                                    className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${isActive
                                        ? 'text-white bg-gradient-to-r from-red-600 to-rose-600 shadow-lg'
                                        : 'text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-700'
                                        }`}
                                >
                                    <link.icon size={16} />
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
                            <motion.button
                                onClick={toggleLanguage}
                                className="flex items-center justify-center w-10 h-10 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Languages size={20} />
                            </motion.button>
                            <ToggleTheme />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

