import { LinkPreview } from "./ui/link-preview";
import { Github, Twitter, Linkedin, Film } from "lucide-react";

/**
 * Componente de pie de página
 * Incluye logo, enlaces sociales y créditos
 */
export default function Footer() {
    return (
        <footer className="w-full py-10 mt-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-inner">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
                        <Film size={28} className="text-purple-600 dark:text-purple-400 relative" />
                        <span className="logo-text text-xl font-black tracking-tight relative">
                            CINENEXUS
                        </span>
                    </div>

                    {/* Enlaces sociales */}
                    <div className="flex items-center space-x-4">
                        <a 
                            href="https://github.com/yairhdz" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <Github size={20} />
                        </a>
                        <a 
                            href="https://twitter.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <Twitter size={20} />
                        </a>
                        <a 
                            href="https://linkedin.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p className="text-slate-600 dark:text-slate-400">
                        © {new Date().getFullYear()} <span className="font-semibold">CINENEXUS</span>. Todos los derechos reservados.
                    </p>
                    <p className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        Desarrollado por{" "}
                        <LinkPreview
                            url="https://github.com/yairhdz"
                            className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:underline"
                        >
                            Yair Hernandez
                        </LinkPreview>
                    </p>
                </div>
            </div>
        </footer>
    );
}
