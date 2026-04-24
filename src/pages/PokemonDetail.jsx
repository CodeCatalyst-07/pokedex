import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePokemonDetail } from '../hooks/usePokemon';
import TypeChip from '../components/TypeChip';
import StatBar from '../components/StatBar';
import { TYPE_HEX } from '../data/types';

const STAT_MAP = [
  { key: 'hp',      label: 'HP' },
  { key: 'attack',  label: 'ATK' },
  { key: 'defense', label: 'DEF' },
  { key: 'spAtk',   label: 'SP.ATK' },
  { key: 'spDef',   label: 'SP.DEF' },
  { key: 'speed',   label: 'SPD' },
];

export default function PokemonDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { data: pokemon, loading, error } = usePokemonDetail(id);

  if (loading) {
    return (
      <div className="section-container py-xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="h-64 skeleton rounded-xl" />
          <div className="h-8 skeleton rounded-md w-48" />
          <div className="h-4 skeleton rounded-md w-full" />
          <div className="h-4 skeleton rounded-md w-3/4" />
          <div className="space-y-3 mt-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-4 skeleton rounded-md" />)}
          </div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="section-container py-xl text-center">
        <p className="text-6xl mb-4">❓</p>
        <h1 className="font-headline text-h1 text-on-surface mb-2">Pokémon Not Found</h1>
        <p className="font-body text-body-md text-on-surface-variant mb-6">{error}</p>
        <Link to="/catalog" className="btn-primary">← Back to Catalog</Link>
      </div>
    );
  }

  const primaryType = pokemon.types[0] ?? 'normal';
  const typeHex     = TYPE_HEX[primaryType] ?? '#A8A878';
  const totalStats  = Object.values(pokemon.stats).reduce((a, b) => a + b, 0);

  return (
    <div className="animate-fadeUp">
      {/* ── Hero banner ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${typeHex}22 0%, #f9f9f9 60%)` }}
      >
        <div className="section-container py-lg">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 font-body text-caption text-on-surface-variant">
            <Link to="/catalog" className="hover:text-primary transition-colors">Catalog</Link>
            <span>/</span>
            <span className="capitalize text-on-surface">{pokemon.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image column — image breaks top edge */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Background circle */}
                <div
                  className="w-64 h-64 rounded-full opacity-20"
                  style={{ background: typeHex }}
                />
                {/* Pokémon image */}
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl -translate-y-4"
                />
              </div>
            </div>

            {/* Info column */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-headline font-bold text-h3 text-outline">
                  #{String(pokemon.id).padStart(3, '0')}
                </span>
                <div className="flex gap-2">
                  {pokemon.types.map((t) => <TypeChip key={t} type={t} size="lg" />)}
                </div>
              </div>

              <h1 className="font-headline text-display text-on-surface capitalize mb-4">
                {pokemon.name}
              </h1>

              {pokemon.flavourText && (
                <p className="font-body text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                  {pokemon.flavourText}
                </p>
              )}

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 bg-surface-card rounded-xl p-4 shadow-card border border-outline-variant mb-6">
                {[
                  { label: 'Height', value: `${pokemon.height} m` },
                  { label: 'Weight', value: `${pokemon.weight} kg` },
                  { label: 'Base EXP', value: pokemon.baseExperience ?? '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="font-headline font-extrabold text-h2 text-on-surface">{value}</p>
                    <p className="font-body text-caption text-on-surface-variant uppercase tracking-wide">{label}</p>
                  </div>
                ))}
              </div>

              {/* Nav buttons */}
              <div className="flex gap-3">
                {pokemon.id > 1 && (
                  <button onClick={() => navigate(`/pokemon/${pokemon.id - 1}`)} className="btn-secondary text-sm px-4 py-2">
                    ← #{pokemon.id - 1}
                  </button>
                )}
                {pokemon.id < 151 && (
                  <button onClick={() => navigate(`/pokemon/${pokemon.id + 1}`)} className="btn-primary text-sm px-4 py-2">
                    #{pokemon.id + 1} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats + Abilities + Moves ────────────────────── */}
      <section className="section-container py-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Base Stats */}
          <div className="bg-surface-card rounded-xl p-6 shadow-card border border-outline-variant">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-headline text-h2 text-on-surface">Base Stats</h2>
              <span className="font-headline font-bold text-label-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                Total: {totalStats}
              </span>
            </div>
            <div className="space-y-3">
              {STAT_MAP.map(({ key, label }) => (
                <StatBar key={key} label={label} value={pokemon.stats[key]} max={255} />
              ))}
            </div>
          </div>

          {/* Abilities + Moves */}
          <div className="space-y-6">
            {/* Abilities */}
            <div className="bg-surface-card rounded-xl p-6 shadow-card border border-outline-variant">
              <h2 className="font-headline text-h2 text-on-surface mb-4">Abilities</h2>
              <div className="flex flex-wrap gap-3">
                {pokemon.abilities.map((ability) => (
                  <div
                    key={ability.name}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-body text-body-md capitalize
                      ${ability.hidden
                        ? 'border-secondary-container bg-secondary-container/20 text-secondary'
                        : 'border-outline-variant bg-surface-container text-on-surface'}`}
                  >
                    {ability.hidden && <span className="text-caption font-bold text-secondary">HIDDEN</span>}
                    {ability.name.replace(/-/g, ' ')}
                  </div>
                ))}
              </div>
            </div>

            {/* Combat Skills / Moves */}
            <div className="bg-surface-card rounded-xl p-6 shadow-card border border-outline-variant">
              <h2 className="font-headline text-h2 text-on-surface mb-4">⚔️ Combat Skills</h2>
              <div className="space-y-2">
                {pokemon.moves.map((move) => (
                  <div
                    key={move}
                    className="flex items-center gap-3 p-3 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="font-body text-body-md text-on-surface capitalize">
                      {move.replace(/-/g, ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section
        className="mx-4 mb-xl rounded-2xl p-8 text-center"
        style={{ background: `linear-gradient(135deg, ${typeHex}33, ${typeHex}11)`, border: `1px solid ${typeHex}44` }}
      >
        <h2 className="font-headline text-h1 text-on-surface mb-2">
          Add {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} to Your Collection?
        </h2>
        <p className="font-body text-body-md text-on-surface-variant mb-6">
          This Pokémon is level 5 and ready for battle. Base EXP: {pokemon.baseExperience ?? '—'}.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary">Catch It! 🎯</button>
          <Link to="/catalog" className="btn-secondary">← Back to Catalog</Link>
        </div>
      </section>
    </div>
  );
}
