import { LinkPreview } from "./ui/link-preview";
import { Github, Twitter, Linkedin, Film } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full py-8 mt-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    {/* Brand */}
                    <div className="flex items-center space-x-2">
                        <Film size={24} className="text-primary-600 dark:text-primary-400" />
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">
                            CINENEXUS
                        </span>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-6">
                        <a href="https://github.com/yairhdz" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <p>© {new Date().getFullYear()} CINENEXUS. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Developed by{" "}
                        <LinkPreview
                            url="https://github.com/yairhdz"
                            className="font-bold text-primary-600 dark:text-primary-400 hover:underline"
                        >
                            Yair Hernandez
                        </LinkPreview>
                    </p>
                </div>
            </div>
        </footer>
    );
}
