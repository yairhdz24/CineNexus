import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Film } from 'lucide-react';
import Navbar from './components/Navbar';
import TabsResponsive from './components/TabsResponsive';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import { BackgroundBeams } from './components/ui/BackgroundBeams';
import { Sparkles } from './components/ui/Sparkles';
import { CinemaBackground } from './components/ui/CinemaBackground';

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAppLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:bg-dark-bg transition-colors duration-300 font-sans relative overflow-hidden">
        {/* Fondo de iconos de cine */}
        <CinemaBackground className="fixed inset-0 -z-20" />
        
        {/* Global Background Effects */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <BackgroundBeams className="opacity-20 dark:opacity-30" />
          <Sparkles id="global-sparkles" sparklesCount={15} className="opacity-30 dark:opacity-50" />
        </div>

        {appLoading ? (
          <div className="min-h-screen flex items-center justify-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative px-10 py-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xl backdrop-blur-2xl flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/40"
              >
                <Film size={32} />
              </motion.div>
              <div className="text-center space-y-1">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Cine Nexus
                </p>
                <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  Cargando tu experiencia de cine
                </p>
              </div>
              <div className="w-40 h-1.5 rounded-full bg-slate-200/80 dark:bg-slate-800/80 overflow-hidden">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary-500 via-sky-400 to-purple-500"
                  animate={{ x: ['-30%', '110%'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>
        ) : (
          <>
            <Navbar />
            <div className="pt-16 flex flex-col min-h-[calc(100vh-4rem)] relative z-10">
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/movie/:id" element={<MovieDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
            <TabsResponsive />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
