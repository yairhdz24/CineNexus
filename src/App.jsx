import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
                <Navbar />
                <div className="pt-16 flex flex-col min-h-[calc(100vh-4rem)]">
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route path="/series" element={<Series />} />
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/movie/:id" element={<MovieDetail />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
