import { NavLink } from 'react-router-dom';
import { Home, Heart, Clapperboard, Tv } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function TabsResponsive() {
    const { t } = useLanguage();

    const tabs = [
        { to: '/', icon: Home, label: t('home') },
        { to: '/movies', icon: Clapperboard, label: t('movies') },
        { to: '/series', icon: Tv, label: t('series') },
        { to: '/favorites', icon: Heart, label: t('favorites') },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800">
            <div className="flex justify-around items-center h-16 px-2">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.to}
                        to={tab.to}
                        end={tab.to === '/'}
                        className={({ isActive }) => `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                            isActive 
                                ? 'text-violet-600 dark:text-violet-400' 
                                : 'text-slate-400'
                        }`}
                    >
                        {({ isActive }) => (
                            <>
                                <motion.div animate={isActive ? { scale: 1.1 } : { scale: 1 }}>
                                    <tab.icon size={22} fill={isActive ? 'currentColor' : 'none'} />
                                </motion.div>
                                <span className="text-[10px] font-medium">{tab.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
