import { NavLink } from 'react-router-dom';
import { Home, Search, Heart } from 'lucide-react';

export default function TabsResponsive() {
    const navItems = [
        { path: '/', icon: Home, label: 'Inicio' },
        { path: '/search', icon: Search, label: 'Buscar' },
        { path: '/favorites', icon: Heart, label: 'Favoritos' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 md:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex - col items - center justify - center w - full h - full space - y - 1 text - xs font - medium transition - colors duration - 200 ${isActive
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            } `
                        }
                    >
                        <Icon size={24} />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
