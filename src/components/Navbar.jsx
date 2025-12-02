import { Link, NavLink } from 'react-router-dom';
import { Film, Home, Heart, Languages, Clapperboard, Tv } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import ToggleTheme from './ToggleTheme';
import { useLanguage } from '../context/LanguageContext';
import logoDark from '../../public/CineNexus/2.png';
import logoLight from '../../public/CineNexus/1.png';

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

        return () => observer.disconnect();
    }, []);

    const navLinks = [
        { to: '/', icon: Home, label: t('home') },
        { to: '/movies', icon: Clapperboard, label: t('movies') },
        { to: '/series', icon: Tv, label: t('series') },
        { to: '/favorites', icon: Heart, label: t('favorites') },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2.5">
                        {isDark ? (
                            <img src={logoDark} alt="CineNexus Logo" className="w-42 h-44" />
                        ) : (
                            <img src={logoLight} alt="CineNexus Logo" className="w-42 h-44" />
                        )}
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) => `flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                                    isActive 
                                        ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30' 
                                        : 'text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                <link.icon size={18} />
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Languages size={20} className="text-violet-500" />
                            <span className="text-sm font-medium">{language === 'es' ? '🇺🇸' : '🇪🇸'}</span>
                        </motion.button>
                        <ToggleTheme />
                    </div>
                </div>
            </div>
        </nav>
    );
}
