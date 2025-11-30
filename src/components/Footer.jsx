import { Film, Heart, Github, Linkedin, Twitter, Instagram, Mail, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t, language, toggleLanguage } = useLanguage();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub', hoverBg: 'hover:bg-slate-700' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', hoverBg: 'hover:bg-blue-600' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', hoverBg: 'hover:bg-sky-500' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', hoverBg: 'hover:bg-pink-600' },
    ];

    return (
        <footer className="bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-pink-900/20 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid md:grid-cols-4 gap-10 mb-12">
                    <div className="md:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-3 mb-6">
                            <motion.div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg" whileHover={{ rotate: 360, scale: 1.1 }} transition={{ duration: 0.5 }}>
                                <Film size={28} />
                            </motion.div>
                            <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Cine Nexus</span>
                        </Link>
                        <p className="text-slate-400 max-w-md mb-8 leading-relaxed">{t('footerDescription')}</p>
                        
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <motion.a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={`p-3 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all ${social.hoverBg}`} whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }}>
                                    <social.icon size={22} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">{t('explore')}</h3>
                        <ul className="space-y-4">
                            {[
                                { to: '/', label: t('home') },
                                { to: '/search?q=popular', label: t('movies') },
                                { to: '/search?q=top&type=series', label: t('series') },
                                { to: '/favorites', label: t('favorites') },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">{t('settings')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <button onClick={toggleLanguage} className="text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-3">
                                    <Globe size={18} />
                                    {language === 'es' ? '🇺🇸 English' : '🇪🇸 Español'}
                                </button>
                            </li>
                            <li>
                                <a href="mailto:contact@cinenexus.com" className="text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-3">
                                    <Mail size={18} />
                                    {t('contact')}
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                            <p className="text-xs text-slate-500 mb-1">{t('dataProvidedBy')}</p>
                            <p className="font-semibold text-slate-300">OMDb API</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm flex items-center gap-2">
                            © {currentYear} Cine Nexus • {t('madeWith')} 
                            <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> 
                            {t('by')} <span className="font-semibold text-violet-400">Tu Nombre</span>
                        </p>
                        
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#" className="text-slate-500 hover:text-violet-400 transition-colors">{t('privacy')}</a>
                            <a href="#" className="text-slate-500 hover:text-violet-400 transition-colors">{t('terms')}</a>
                            <span className="flex items-center gap-2 text-slate-500">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                Online
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
