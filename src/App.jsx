import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import ScrollToTop from './components/ScrollToTop';
import { Loader2 } from 'lucide-react';

// Lazy loading pages
const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const Series = lazy(() => import('./pages/Series'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
    <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
    </div>
);

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
                <Navbar />
                <div className="flex flex-col min-h-[calc(100vh-4rem)]">
                    <div className="flex-grow pb-16 md:pb-0"> {/* Padding bottom for mobile nav */}
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/movies" element={<Movies />} />
                                <Route path="/series" element={<Series />} />
                                <Route path="/search" element={<SearchResults />} />
                                <Route path="/movie/:id" element={<MovieDetail />} />
                                <Route path="/favorites" element={<Favorites />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Suspense>
                    </div>
                    <Footer />
                    <BottomNav />
                </div>
            </div>
        </Router>
    );
}

export default App;
