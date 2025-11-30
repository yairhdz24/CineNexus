import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

/**
 * Proveedor de contexto para el tema de la aplicación (claro/oscuro)
 * Almacena la preferencia del usuario en localStorage
 */
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'dark';
        }
        return 'dark';
    });

    /**
     * Aplica el tema al documento HTML y lo guarda en localStorage
     */
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    /**
     * Alterna entre tema claro y oscuro
     */
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * Hook para acceder al contexto del tema
 * @returns {Object} Objeto con el tema actual y la función para alternarlo
 */
export function useTheme() {
    return useContext(ThemeContext);
}
