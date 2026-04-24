import { Link } from 'react-router-dom';
import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';

const FEATURED_IDS = [6, 9, 25]; // Charizard, Blastoise, Pikachu

// Floating Pokémon in hero — decorative, right side
const HERO_POKEMON = [
  { id: 25,  size: 180, top: '-10%', right: '8%',  rotate: '-8deg',  delay: '0s',   z: 3 },  // Pikachu — front
  { id: 6,   size: 220, top: '-5%',  right: '22%', rotate: '5deg',   delay: '0.3s', z: 2 },  // Charizard — behind
  { id: 150, size: 160, top: '30%',  right: '2%',  rotate: '-5deg',  delay: '0.6s', z: 2 },  // Mewtwo — lower right
  { id: 94,  size: 120, top: '45%',  right: '28%', rotate: '10deg',  delay: '0.9s', z: 1 },  // Gengar — back
];

// Horizontal ticker Pokémon (just sprites)
const TICKER_IDS = [1,4,7,25,52,131,143,6,9,54,63,66,72,79,92,94,113,130,132,135,136,137,143,147,149,150];

const FEATURES = [
  {
    icon: '🎯',
    title: 'Capture Mechanics',
    type: 'normal',
    typeColor: '#A8A878',
    desc: 'Learn the nuances of Poké Ball types, capture rates, and status condition advantages to fill your Dex faster.',
  },
  {
    icon: '🌿',
    title: 'Evolutionary Mastery',
    type: 'grass',
    typeColor: '#78C850',
    desc: 'From simple leveling to friendship triggers and rare stone exposure — unlock every stage of your companion\'s potential.',
  },
  {
    icon: '⚔️',
    title: 'Battle Ready',
    type: 'fighting',
    typeColor: '#C03028',
    desc: 'Advanced combat mechanics and move-set analysis for every matchup across all 151 species.',
  },
  {
    icon: '🌍',
    title: 'Global Map',
    type: 'flying',
    typeColor: '#A890F0',
    desc: 'Track habitats and regional variations across Kanto, Johto, and beyond.',
  },
  {
    icon: '🏆',
    title: 'Community Hub',
    type: 'psychic',
    typeColor: '#F85888',
    desc: 'Share your collection milestones and compete in monthly challenges with trainers worldwide.',
  },
  {
    icon: '⚡',
    title: 'Live Data',
    type: 'electric',
    typeColor: '#F8D030',
    desc: 'Powered by PokéAPI — every stat, ability, and move is fetched live for all 151 original Pokémon.',
  },
];

const ARTWORK = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
const SPRITE = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export default function Home() {
  const { pokemon, loading } = usePokemonList(151);
  const featured = pokemon.filter((p) => FEATURED_IDS.includes(p.id));

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#cc0000] via-[#e00] to-[#a80000] text-white min-h-[540px] flex items-center">

        {/* Pokéball background pattern */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Giant half-Pokéball top right */}
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border-[60px] border-white/[0.07]" />
          <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full border-[4px] border-white/[0.12]" />
          {/* Centre line of Pokéball */}
          <div className="absolute top-[208px] -right-32 w-[480px] h-[8px] bg-white/[0.07]" />
          {/* Inner circle of Pokéball */}
          <div className="absolute top-[160px] right-[160px] w-[96px] h-[96px] rounded-full border-[12px] border-white/10 bg-white/5" />

          {/* Small pokéballs scattered */}
          <div className="absolute top-8 left-1/3 w-16 h-16 rounded-full border-[8px] border-white/5" />
          <div className="absolute bottom-12 left-1/4 w-10 h-10 rounded-full border-[5px] border-white/5" />
          <div className="absolute top-1/2 left-16 w-8 h-8 rounded-full border-[4px] border-white/5" />
        </div>

        {/* Left — text content */}
        <div className="section-container relative z-10 py-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
          <div className="animate-fadeUp">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFDE00] animate-pulse" />
              <span className="font-headline font-bold text-caption uppercase tracking-widest">
                Collection Item #001 — Official PokéDex Core
              </span>
            </span>

            <h1 className="font-headline text-display text-white mb-4 leading-tight">
              Explore the Ultimate<br />
              <span className="text-[#FFDE00] drop-shadow-[0_2px_8px_rgba(255,222,0,0.4)]">
                Adventure Dex
              </span>
            </h1>

            <p className="font-body text-body-lg text-white/80 mb-8 max-w-lg">
              Dive deep into the world of Pokémon. Detailed stats, evolutionary paths, and tactical insights for every trainer across the Kanto region.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center gap-2 bg-[#FFDE00] text-[#8B0000] font-headline font-extrabold text-label-bold px-6 py-3 rounded-xl border-b-4 border-[#c4a800] shadow-[0_4px_24px_rgba(255,222,0,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(255,222,0,0.4)] active:translate-y-0.5 transition-all duration-150"
              >
                🎮 Browse All 151
              </Link>
              <Link
                to="/pokedex"
                className="inline-flex items-center gap-2 bg-white/15 text-white border-2 border-white/40 font-headline font-bold text-label-bold px-6 py-3 rounded-xl backdrop-blur-sm hover:bg-white/25 transition-all duration-150"
              >
                📖 Open PokéDex
              </Link>
            </div>

            {/* Type badges row */}
            <div className="flex flex-wrap gap-2 mt-8 opacity-80">
              {['fire','water','electric','grass','psychic','dragon'].map((type) => (
                <span
                  key={type}
                  className="font-headline font-bold text-caption uppercase tracking-wide px-3 py-1 rounded-full text-white border border-white/20 bg-white/10 backdrop-blur-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Right — floating Pokémon artwork */}
          <div className="relative hidden lg:block h-[440px]">
            {HERO_POKEMON.map(({ id, size, top, right, rotate, delay, z }) => (
              <img
                key={id}
                src={ARTWORK(id)}
                alt=""
                aria-hidden="true"
                style={{
                  position:    'absolute',
                  top,
                  right,
                  width:       size,
                  height:      size,
                  objectFit:   'contain',
                  transform:   `rotate(${rotate})`,
                  zIndex:      z,
                  filter:      'drop-shadow(0 8px 32px rgba(0,0,0,0.35))',
                  animation:   `heroFloat 4s ease-in-out ${delay} infinite alternate`,
                }}
              />
            ))}
            {/* Glow under Pokémon */}
            <div
              className="absolute bottom-8 right-16 w-48 h-12 rounded-full bg-black/20 blur-xl"
              style={{ zIndex: 0 }}
            />
          </div>
        </div>
      </section>

      {/* Floating keyframe */}
      <style>{`
        @keyframes heroFloat {
          0%   { transform: translateY(0px)   rotate(var(--rot, 0deg)); }
          100% { transform: translateY(-14px) rotate(var(--rot, 0deg)); }
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── POKÉMON SPRITE TICKER ───────────────────────── */}
      <div className="bg-[#1a1c1c] border-y border-white/10 overflow-hidden py-2">
        <div
          className="flex gap-1 w-max"
          style={{ animation: 'tickerScroll 30s linear infinite' }}
        >
          {/* Duplicate for seamless loop */}
          {[...TICKER_IDS, ...TICKER_IDS].map((id, i) => (
            <img
              key={`${id}-${i}`}
              src={SPRITE(id)}
              alt=""
              aria-hidden="true"
              className="w-12 h-12 object-contain opacity-80 hover:opacity-100 hover:scale-125 transition-all duration-150"
              style={{ imageRendering: 'pixelated' }}
            />
          ))}
        </div>
      </div>

      {/* ── STATS TICKER ─────────────────────────────────── */}
      <section className="bg-surface-container border-b border-outline-variant">
        <div className="section-container py-md">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: '1,025', label: 'Total Entries',   emoji: '📖' },
              { val: '151',   label: 'Gen I Pokémon',   emoji: '🔴' },
              { val: '18',    label: 'Types',            emoji: '⚡' },
              { val: '∞',     label: 'Adventures',       emoji: '🌟' },
            ].map(({ val, label, emoji }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-2xl mb-1">{emoji}</span>
                <p className="font-headline font-extrabold text-h1 text-primary">{val}</p>
                <p className="font-body text-caption text-on-surface-variant uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED POKÉMON ─────────────────────────────── */}
      <section className="section-container py-lg">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-brand-red" />
              <span className="font-headline font-bold text-caption uppercase tracking-widest text-outline">
                Daily Highlights
              </span>
            </div>
            <h2 className="font-headline text-h1 text-on-surface">Featured Pokémon</h2>
            <p className="font-body text-body-md text-on-surface-variant mt-1">
              Hand-picked from the Global Dex
            </p>
          </div>
          <Link to="/catalog" className="font-headline font-bold text-label-bold text-primary hover:underline flex items-center gap-1">
            View all 151 →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => <div key={i} className="h-72 skeleton rounded-lg" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featured.map((p) => <PokemonCard key={p.id} pokemon={p} />)}
          </div>
        )}
      </section>

      {/* ── RARE CATCH BANNER ────────────────────────────── */}
      <section className="mx-4 rounded-2xl overflow-hidden relative bg-gradient-to-r from-[#FFDE00] to-[#f5c900] border border-[#c4a800]/40 shadow-[0_4px_24px_rgba(255,222,0,0.25)]">
        <div className="section-container py-md flex items-center gap-4 relative z-10">
          <img
            src={ARTWORK(25)}
            alt="Pikachu"
            className="w-20 h-20 object-contain drop-shadow-lg -mt-4 shrink-0"
          />
          <div>
            <p className="font-headline font-extrabold text-h3 text-[#8B0000]">✨ Rare Catch!</p>
            <p className="font-body text-body-md text-[#8B0000]/80">
              Shiny odds are increased by 20% today in the Safari Zone! Don't miss out, Trainer.
            </p>
          </div>
          <Link
            to="/catalog"
            className="ml-auto shrink-0 bg-[#8B0000] text-white font-headline font-bold text-label-bold px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all duration-150 shadow-md"
          >
            Catch Now →
          </Link>
        </div>
        {/* Decorative Pokéballs */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-[10px] border-[#8B0000]/10 pointer-events-none" />
        <div className="absolute right-16 top-0 w-12 h-12 rounded-full border-[6px] border-[#8B0000]/10 pointer-events-none" />
      </section>

      {/* ── FEATURE GRID ─────────────────────────────────── */}
      <section className="section-container py-lg">
        <div className="text-center mb-10">
          <h2 className="font-headline text-h1 text-on-surface mb-2">Discover the World of Pokémon</h2>
          <p className="font-body text-body-md text-on-surface-variant">
            Everything a trainer needs to become a Pokémon Master.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon, title, type, typeColor, desc }) => (
            <div
              key={title}
              className="bg-surface-card rounded-xl p-6 shadow-card border border-outline-variant hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 group relative overflow-hidden"
            >
              {/* Type colour top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                style={{ background: typeColor }}
              />
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 mt-0.5"
                  style={{ background: `${typeColor}22`, border: `1px solid ${typeColor}44` }}
                >
                  {icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-headline font-bold text-h3 text-on-surface">{title}</h3>
                    <span
                      className="font-headline font-bold text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
                      style={{ background: typeColor }}
                    >
                      {type}
                    </span>
                  </div>
                  <p className="font-body text-body-md text-on-surface-variant">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STARTER TRIO SHOWCASE ────────────────────────── */}
      <section className="bg-gradient-to-b from-surface-container to-surface border-y border-outline-variant">
        <div className="section-container py-lg text-center">
          <h2 className="font-headline text-h1 text-on-surface mb-2">Choose Your Starter</h2>
          <p className="font-body text-body-md text-on-surface-variant mb-10">
            Every great journey begins with a single choice.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {[
              { id: 1,  name: 'Bulbasaur',  type: 'Grass',    color: '#78C850', emoji: '🌿' },
              { id: 4,  name: 'Charmander', type: 'Fire',     color: '#F08030', emoji: '🔥' },
              { id: 7,  name: 'Squirtle',   type: 'Water',    color: '#6890F0', emoji: '💧' },
            ].map(({ id, name, type, color, emoji }) => (
              <Link
                key={id}
                to={`/pokemon/${id}`}
                className="group flex flex-col items-center gap-3 p-6 bg-surface-card rounded-2xl shadow-card border border-outline-variant hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
                style={{ borderTop: `4px solid ${color}` }}
              >
                <div
                  className="w-32 h-32 rounded-full flex items-center justify-center"
                  style={{ background: `${color}15` }}
                >
                  <img
                    src={ARTWORK(id)}
                    alt={name}
                    className="w-24 h-24 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-xl">{emoji}</span>
                <div>
                  <p className="font-headline font-extrabold text-h3 text-on-surface">{name}</p>
                  <span
                    className="font-headline font-bold text-caption uppercase tracking-wide px-3 py-1 rounded-full text-white inline-block mt-1"
                    style={{ background: color }}
                  >
                    {type}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#1a1c1c] to-[#2f3131] relative overflow-hidden">
        {/* Decorative sprites */}
        <img src={ARTWORK(150)} alt="" aria-hidden className="absolute right-8 bottom-0 w-40 opacity-10 pointer-events-none" />
        <img src={ARTWORK(130)} alt="" aria-hidden className="absolute left-8 bottom-0 w-32 opacity-10 pointer-events-none" />

        <div className="section-container py-lg text-center relative z-10">
          <span className="text-4xl block mb-3">📬</span>
          <h2 className="font-headline text-h1 text-white mb-3">Stay Updated, Trainer!</h2>
          <p className="font-body text-body-lg text-white/70 mb-6 max-w-md mx-auto">
            Get weekly tips, rare spawn alerts, and event reminders delivered to you.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="dex-input flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-[#FFDE00]/60"
            />
            <button
              type="submit"
              className="bg-[#FFDE00] text-[#8B0000] font-headline font-extrabold text-label-bold px-6 py-3 rounded-xl border-b-4 border-[#c4a800] hover:-translate-y-0.5 active:translate-y-0.5 transition-all duration-150 whitespace-nowrap"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
