import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300 font-sans relative overflow-hidden">
        {/* Global Background Effects */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <BackgroundBeams className="opacity-30" />
          <Sparkles id="global-sparkles" sparklesCount={15} className="opacity-50" />
        </div>

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
      </div>
    </Router>
  );
}

export default App;
