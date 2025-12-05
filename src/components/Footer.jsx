import { Heart, Github, Linkedin, Twitter, Instagram, Mail, Globe, ArrowUpRight, Sparkles } from 'lucide-react';
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
        { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'group-hover:text-white', bg: 'group-hover:bg-slate-800', border: 'group-hover:border-slate-600' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'group-hover:text-white', bg: 'group-hover:bg-[#0077b5]', border: 'group-hover:border-[#0077b5]' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'group-hover:text-white', bg: 'group-hover:bg-sky-500', border: 'group-hover:border-sky-500' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'group-hover:text-white', bg: 'group-hover:bg-pink-600', border: 'group-hover:border-pink-600' },
    ];

    const footerLinks = [
        { to: '/', label: t('home') },
        { to: '/search?q=popular', label: t('movies') },
        { to: '/search?q=top&type=series', label: t('series') },
        { to: '/favorites', label: t('favorites') },
    ];

    return (
        <footer className="relative bg-[#0a0a0a] text-white overflow-hidden pt-20 pb-10 border-t border-white/5">
            {/* --- Fondo Ambiental & Efectos 2025 --- */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

                    {/* --- Columna 1: Brand --- */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <Link to="/" className="inline-block w-fit">
                            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                                {/* Forzamos logoDark o Light según prefieras, o mantenemos tu lógica */}
                                <img
                                    src={isDark ? logoDark : logoLight}
                                    alt="CineNexus Logo"
                                    className={`w-48 h-auto object-contain ${!isDark ? 'brightness-0 invert' : ''}`} // Truco: Invertir brillo si el footer es negro pero el modo es light
                                />
                            </motion.div>
                        </Link>
                        <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                            {t('footerDescription')}
                        </p>

                        {/* Botón de Idioma Estilizado */}
                        <div className="mt-4">
                            <button
                                onClick={toggleLanguage}
                                className="group relative inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
                            >
                                <Globe size={16} className="text-violet-400 group-hover:rotate-180 transition-transform duration-500" />
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                                    {language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* --- Columna 2: Explorar --- */}
                    <div className="lg:col-span-3">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <Sparkles size={16} className="text-yellow-400" />
                            {t('explore')}
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="group flex items-center justify-between text-slate-400 hover:text-white transition-colors py-1">
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                                        <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-violet-400 transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* --- Columna 3: Conectar --- */}
                    <div className="lg:col-span-4">
                        <h3 className="text-lg font-bold mb-6">{t('contact')}</h3>

                        {/* Email Card */}
                        <a href="mailto:contact@cinenexus.com" className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-violet-500/30 hover:shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)] transition-all duration-300 mb-8 group">
                            <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                                <Mail size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Email us</p>
                                <p className="text-slate-200 group-hover:text-white transition-colors">contact@cinenexus.com</p>
                            </div>
                        </a>

                        {/* Social Icons 2025 Style */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 ${social.bg} ${social.border}`}
                                    whileHover={{ y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon size={20} className={`text-slate-400 transition-colors duration-300 ${social.color}`} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Barra Inferior --- */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} CineNexus. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm">
                        <span className="text-slate-400 text-sm">{t('madeWith')}</span>
                        <Heart size={14} className="text-red-500 fill-red-500 animate-[pulse_1.5s_ease-in-out_infinite]" />
                        <span className="text-slate-400 text-sm">{t('by')}</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400 font-bold text-sm">
                            Yair Hernandez
                        </span>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">{t('privacy')}</a>
                        <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">{t('terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}