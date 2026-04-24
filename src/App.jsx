import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import FabSearch from './components/FabSearch';
import Home          from './pages/Home';
import Catalog        from './pages/Catalog';
import PokemonDetail  from './pages/PokemonDetail';
import TrainerTips    from './pages/TrainerTips';
import Pokedex        from './pages/Pokedex';

function NotFound() {
  return (
    <div className="section-container py-xl text-center">
      <p className="text-6xl mb-4">🌑</p>
      <h1 className="font-headline text-h1 text-on-surface mb-2">Page Not Found</h1>
      <p className="font-body text-body-md text-on-surface-variant mb-6">
        This route doesn't exist in the Dex.
      </p>
      <a href="/" className="btn-primary">← Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-surface">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/catalog"    element={<Catalog />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/tips"       element={<TrainerTips />} />
            <Route path="/pokedex"    element={<Pokedex />} />
            <Route path="*"           element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FabSearch />
      </div>
    </BrowserRouter>
  );
}
