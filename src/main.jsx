import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';

/**
 * Punto de entrada de la aplicación
 * Configura los proveedores de contexto y renderiza la aplicación principal
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
);
