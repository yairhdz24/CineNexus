import { NavLink } from 'react-router-dom';
import { Home, Search, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BottomNav() {
    const { t } = useLanguage();

    const navLinks = [
        { to: '/', icon: Home, label: t('home') },
        { to: '/search', icon: Search, label: t('search') },
        { to: '/favorites', icon: Heart, label: t('favorites') },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 pb-safe">
            <div className="flex justify-around items-center h-16">
                {navLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) => `
                            flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200
                            ${isActive
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                            }
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`relative p-1.5 rounded-xl transition-colors duration-200 ${isActive ? 'bg-red-100 dark:bg-red-900/30' : ''}`}>
                                    <link.icon size={20} className={isActive ? 'fill-current' : ''} />
                                    {isActive && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full" />
                                    )}
                                </div>
                                <span className="text-[10px] font-bold tracking-wide">{link.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
