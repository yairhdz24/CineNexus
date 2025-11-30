import { NavLink } from 'react-router-dom';
import { Home, Search, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * Componente de navegación inferior para móviles
 * Muestra tabs de navegación fijos en la parte inferior de la pantalla
 */
export default function TabsResponsive() {
    const { t } = useLanguage();
    
    const navItems = [
        { path: '/', icon: Home, label: t('home') },
        { path: '/search?q=', icon: Search, label: t('search') },
        { path: '/favorites', icon: Heart, label: t('favorites') },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 shadow-2xl md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-semibold transition-all duration-200 ${
                                isActive
                                    ? 'text-primary-600 dark:text-primary-400 scale-105'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`
                        }
                    >
                        <Icon size={22} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
