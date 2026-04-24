import { Link } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';

const FEATURED_IDS = [6, 9, 25]; // Charizard, Blastoise, Pikachu

const FEATURES = [
  {
    icon: '🎯',
    title: 'Capture Mechanics',
    desc: 'Learn the nuances of Poké Ball types, capture rates, and status condition advantages to fill your Dex faster.',
  },
  {
    icon: '🌿',
    title: 'Evolutionary Mastery',
    desc: 'From simple leveling to friendship triggers and rare stone exposure — unlock every stage of your companion\'s potential.',
  },
  {
    icon: '⚔️',
    title: 'Battle Ready',
    desc: 'Advanced combat mechanics and move-set analysis for every matchup across all 151 species.',
  },
  {
    icon: '🌍',
    title: 'Global Map',
    desc: 'Track habitats and regional variations across Kanto, Johto, and beyond.',
  },
  {
    icon: '🏆',
    title: 'Community Hub',
    desc: 'Share your collection milestones and compete in monthly challenges with trainers worldwide.',
  },
  {
    icon: '⚡',
    title: 'Live Data',
    desc: 'Powered by PokéAPI — every stat, ability, and move is fetched live for all 151 original Pokémon.',
  },
];

export default function Home() {
  const { pokemon, loading } = usePokemonList(151);
  const featured = pokemon.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <div className="animate-fadeUp">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#e00] to-[#c00100] text-white">
        {/* Decorative pokéballs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border-[32px] border-white/10 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border-[40px] border-white/5 pointer-events-none" />

        <div className="section-container py-xl relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
              <span className="font-headline font-bold text-caption uppercase tracking-widest">
                Collection Item #001 — Official PokéDex Core
              </span>
            </span>

            <h1 className="font-headline text-display text-white mb-4 text-balance">
              Explore the Ultimate<br />
              <span className="text-secondary-container">Adventure Dex</span>
            </h1>

            <p className="font-body text-body-lg text-white/80 mb-8 max-w-xl">
              Dive deep into the world of Pokémon. Detailed stats, evolutionary paths, and tactical insights for every trainer across the Kanto region.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/catalog" className="btn-primary bg-white text-primary border-b-4 border-gray-200 hover:bg-gray-50">
                Browse All 151 →
              </Link>
              <Link to="/pokedex" className="btn-secondary border-white text-white hover:bg-white/10">
                Open PokéDex
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ticker ────────────────────────────────────── */}
      <section className="bg-surface-container border-b border-outline-variant">
        <div className="section-container py-md">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: '1,025', label: 'Total Entries' },
              { val: '151',   label: 'Gen I Pokémon' },
              { val: '18',    label: 'Types' },
              { val: '∞',     label: 'Adventures' },
            ].map(({ val, label }) => (
              <div key={label}>
                <p className="font-headline font-extrabold text-h1 text-primary">{val}</p>
                <p className="font-body text-caption text-on-surface-variant uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Pokémon ────────────────────────────────── */}
      <section className="section-container py-lg">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-headline text-h1 text-on-surface">Featured Pokémon</h2>
            <p className="font-body text-body-md text-on-surface-variant mt-1">Daily highlights from the Global Dex</p>
          </div>
          <Link to="/catalog" className="font-headline font-bold text-label-bold text-primary hover:underline">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 skeleton rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featured.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </section>

      {/* ── Rare Catch banner ───────────────────────────────── */}
      <section className="bg-secondary-container/30 border-y border-secondary-container/50">
        <div className="section-container py-md flex items-center gap-4">
          <span className="text-2xl">✨</span>
          <div>
            <p className="font-headline font-bold text-label-bold text-secondary">Rare Catch!</p>
            <p className="font-body text-body-md text-on-surface">
              Shiny odds are increased by 20% today in the Safari Zone! Don't miss out, Trainer.
            </p>
          </div>
        </div>
      </section>

      {/* ── Feature grid ────────────────────────────────────── */}
      <section className="section-container py-lg">
        <h2 className="font-headline text-h1 text-on-surface mb-2">Discover the World of Pokémon</h2>
        <p className="font-body text-body-md text-on-surface-variant mb-8">Everything a trainer needs to become a master.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-surface-card rounded-lg p-6 shadow-card border border-outline-variant hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4">
                {icon}
              </div>
              <h3 className="font-headline font-bold text-h3 text-on-surface mb-2">{title}</h3>
              <p className="font-body text-body-md text-on-surface-variant">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ──────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-tertiary to-tertiary-container text-white">
        <div className="section-container py-lg text-center">
          <h2 className="font-headline text-h1 text-white mb-3">Stay Updated, Trainer!</h2>
          <p className="font-body text-body-lg text-white/80 mb-6 max-w-md mx-auto">
            Get weekly tips, rare spawn alerts, and event reminders delivered to you.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="dex-input flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:ring-secondary-container"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe →
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
