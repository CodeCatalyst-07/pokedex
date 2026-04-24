import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';

const HIGHLIGHTED = [1, 4, 7, 25, 52, 54, 63, 66, 72]; // Curated Kanto favourites

export default function Pokedex() {
  const { pokemon, loading } = usePokemonList(151);
  const [query, setQuery]    = useState('');
  const navigate             = useNavigate();

  const highlighted = pokemon.filter((p) => HIGHLIGHTED.includes(p.id));

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    navigate(`/pokemon/${q}`);
  }

  return (
    <div className="animate-fadeUp">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a1c1c] to-[#2f3131] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-tertiary/5 blur-3xl" />
        </div>
        <div className="section-container py-xl relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="font-headline font-bold text-caption uppercase tracking-widest text-white/70">
              Ultimate Trainer Resource
            </span>
          </span>
          <h1 className="font-headline text-display text-white mb-4">
            PokéDex <span className="text-brand-red">Database</span>
          </h1>
          <p className="font-body text-body-lg text-white/70 max-w-xl mx-auto mb-8">
            The world's most complete Pokémon reference — all 151 original species, live stats, and tactical insights for trainers of every level.
          </p>
          {/* Search */}
          <form onSubmit={handleSearch} className="flex max-w-md mx-auto gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or #ID…"
              className="dex-input flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-secondary-container"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Search →
            </button>
          </form>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────── */}
      <section className="bg-brand-red text-white">
        <div className="section-container py-sm">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            {[
              { val: '151', label: 'Pokémon' },
              { val: '18',  label: 'Types' },
              { val: '165', label: 'Abilities' },
              { val: '826', label: 'Moves' },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="font-headline font-extrabold text-h2 text-white">{val}</span>
                <span className="font-body text-caption text-white/70 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured picks ───────────────────────────────── */}
      <section className="section-container py-lg">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-headline text-h1 text-on-surface">Dex Highlights</h2>
            <p className="font-body text-body-md text-on-surface-variant mt-1">A curated selection of iconic Kanto Pokémon</p>
          </div>
          <Link to="/catalog" className="font-headline font-bold text-label-bold text-primary hover:underline">
            Full Catalog →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 skeleton rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {highlighted.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Map callout ──────────────────────────────────── */}
      <section className="bg-gradient-to-r from-tertiary/10 via-surface-container to-tertiary/5 border-y border-outline-variant">
        <div className="section-container py-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-headline text-h1 text-on-surface mb-3">🌍 Global Habitat Map</h2>
            <p className="font-body text-body-lg text-on-surface-variant mb-4">
              Track habitats and regional variations across all 8 Kanto routes. Discover where your favourite Pokémon spawn in the wild.
            </p>
            <Link to="/tips" className="btn-secondary">
              Trainer Tips →
            </Link>
          </div>
          <div className="bg-surface-card rounded-2xl shadow-card border border-outline-variant h-48 flex items-center justify-center">
            <div className="text-center text-on-surface-variant">
              <p className="text-5xl mb-2">🗺️</p>
              <p className="font-body text-body-md">Interactive map — coming soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
