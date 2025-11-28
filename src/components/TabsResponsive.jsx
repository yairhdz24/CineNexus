import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, Search, Heart } from 'lucide-react';

export default function TabsResponsive() {
    const navItems = [
        { path: '/', icon: Home, label: 'Inicio' },
        { path: '/search', icon: Search, label: 'Buscar' },
        { path: '/favorites', icon: Heart, label: 'Favoritos' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 md:hidden pb-safe shadow-lg">
            <div className="flex justify-around items-center h-20 px-4">
                {navItems.map(({ path, icon: Icon, label }) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full space-y-1 text-xs font-medium transition-all duration-300 relative ${isActive
                                ? 'text-primary-600 dark:text-primary-400'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-2 rounded-xl ${isActive ? 'bg-primary-500/10' : ''}`}
                                >
                                    <Icon size={24} className={isActive ? 'text-primary-600 dark:text-primary-400' : ''} />
                                </motion.div>
                                <span className="text-[10px]">{label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-t-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
