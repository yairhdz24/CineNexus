import { Heart, Github, Linkedin, Twitter, Instagram, Mail, Globe, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';
import logoDark from '../assets/2.png';
import logoLight from '../assets/1.png';

export default function Footer() {
    const { t, language, toggleLanguage } = useLanguage();
    const currentYear = new Date().getFullYear();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains('dark'));
        };
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const socialLinks = [
        { icon: Github, href: 'https://github.com/yairhdz24', label: 'GitHub', color: 'group-hover:text-white', bg: 'group-hover:bg-slate-800', border: 'group-hover:border-slate-600' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/yairhdz24/', label: 'LinkedIn', color: 'group-hover:text-white', bg: 'group-hover:bg-[#0077b5]', border: 'group-hover:border-[#0077b5]' },
        { icon: Instagram, href: 'https://instagram.com/yair_hdz24', label: 'Instagram', color: 'group-hover:text-white', bg: 'group-hover:bg-pink-600', border: 'group-hover:border-pink-600' },
    ];

    // Links simplificados - solo rutas directas
    const footerLinks = [
        { to: '/', label: t('home') },
        { to: '/movies', label: t('movies') },
        { to: '/series', label: t('series') },
        { to: '/favorites', label: t('favorites') },
    ];

    return (
        <footer className="relative bg-[#0a0a0a] text-white overflow-hidden pt-10 pb-24 md:pb-6 border-t border-white/5">
            {/* --- Fondo Ambiental con colores rojos --- */}
            <div className="absolute top-0 left-1/4 w-96 h-90 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-90 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-4">

                    {/* --- Columna 1: Brand --- */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <Link to="/" className="inline-block w-fit">
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                <img
                                    src={logoDark}
                                    alt="CineNexus Logo"
                                    className={`w-40 h-42`}
                                />
                            </motion.div>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            {t('footerDescription')}
                        </p>

                        {/* Botón de Idioma - con colores rojos */}
                        <div className="mt-2">
                            <button
                                onClick={toggleLanguage}
                                className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
                            >
                                <Globe size={14} className="text-red-400 group-hover:rotate-180 transition-transform duration-500" />
                                <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                                    {language === 'es' ? 'English' : 'Español'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* --- Columna 2: Explorar --- */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-200">
                            <Sparkles size={14} className="text-yellow-400" />
                            {t('explore')}
                        </h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-slate-400 hover:text-white transition-colors py-0.5 text-sm">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Columna 3: Conectar --- */}
                    <div className="lg:col-span-4">
                        <h3 className="text-sm font-bold mb-4 text-slate-200">{t('contact')}</h3>

                        {/* Email Card - con colores rojos */}
                        <a href="mailto:yairhdz@cinenexus.com" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-red-500/30 hover:shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)] transition-all duration-300 mb-6 group">
                            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                                <Mail size={14} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{t('emailUs')}</p>
                                <p className="text-slate-200 group-hover:text-white transition-colors text-sm">yairhdz@cinenexus.com</p>
                            </div>
                        </a>

                        {/* Social Icons */}
                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 transition-all duration-300 ${social.bg} ${social.border}`}
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon size={16} className={`text-slate-400 transition-colors duration-300 ${social.color}`} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Barra Inferior --- */}
                <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-xs">
                        © {currentYear} CineNexus. {t('allRightsReserved')}
                    </p>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                        <span className="text-slate-400 text-xs">Created by</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 font-bold text-xs">
                            Yair Hernandez
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}