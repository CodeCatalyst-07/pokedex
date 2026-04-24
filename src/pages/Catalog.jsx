import { useState, useMemo } from 'react';
import { usePokemonList } from '../hooks/usePokemon';
import PokemonCard from '../components/PokemonCard';
import TypeChip from '../components/TypeChip';
import { ALL_TYPES } from '../data/types';

const SORT_OPTIONS = [
  { value: 'id',      label: '#ID' },
  { value: 'name',    label: 'Name' },
  { value: 'hp',      label: 'HP' },
  { value: 'attack',  label: 'Attack' },
  { value: 'speed',   label: 'Speed' },
];

export default function Catalog() {
  const { pokemon, loading, error } = usePokemonList(151);
  const [search,      setSearch]    = useState('');
  const [activeType,  setActiveType] = useState('');
  const [sort,        setSort]       = useState('id');

  const filtered = useMemo(() => {
    let list = [...pokemon];

    // Filter by name
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.includes(q) || String(p.id).includes(q)
      );
    }

    // Filter by type
    if (activeType) {
      list = list.filter((p) => p.types.includes(activeType));
    }

    // Sort
    list.sort((a, b) => {
      if (sort === 'id')     return a.id - b.id;
      if (sort === 'name')   return a.name.localeCompare(b.name);
      if (sort === 'hp')     return b.stats.hp     - a.stats.hp;
      if (sort === 'attack') return b.stats.attack - a.stats.attack;
      if (sort === 'speed')  return b.stats.speed  - a.stats.speed;
      return 0;
    });

    return list;
  }, [pokemon, search, activeType, sort]);

  return (
    <div className="animate-fadeUp">
      {/* ── Header ──────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-surface-container to-surface border-b border-outline-variant">
        <div className="section-container py-lg">
          <h1 className="font-headline text-display text-on-surface mb-2">
            Pokémon <span className="text-primary">Catalog</span>
          </h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-xl">
            Browse the world's most comprehensive database of Pokémon — all 151 original species with live stats, types, and abilities.
          </p>
        </div>
      </section>

      {/* ── Filters ─────────────────────────────────────── */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-outline-variant shadow-sm">
        <div className="section-container py-4 flex flex-col gap-3">
          {/* Search + Sort row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-outline text-body-md">🔍</span>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or #ID…"
                className="dex-input w-full pl-9"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="dex-input sm:w-40"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>Sort: {o.label}</option>
              ))}
            </select>
          </div>

          {/* Type filter chips */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveType('')}
              className={`type-chip transition-all duration-150 ${
                activeType === ''
                  ? 'bg-primary text-white scale-105 shadow-md'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              All
            </button>
            {ALL_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? '' : type)}
                className={`transition-all duration-150 ${activeType === type ? 'scale-105 shadow-md' : 'opacity-70 hover:opacity-100'}`}
              >
                <TypeChip type={type} size="sm" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Results count ───────────────────────────────── */}
      <div className="section-container pt-6 pb-2">
        <p className="font-body text-caption text-on-surface-variant">
          {loading ? 'Loading…' : `Showing ${filtered.length} of 151 Pokémon`}
          {activeType && !loading && (
            <span className="ml-2 font-bold text-primary capitalize">· {activeType}</span>
          )}
        </p>
      </div>

      {/* ── Grid ────────────────────────────────────────── */}
      <section className="section-container pb-xl">
        {error && (
          <div className="bg-error-container border border-error rounded-lg p-4 text-error font-body text-body-md mb-6">
            ⚠️ {error} — please check your connection and try again.
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="h-64 skeleton rounded-lg" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-xl">
            <p className="text-6xl mb-4">🔍</p>
            <h2 className="font-headline text-h2 text-on-surface mb-2">No Pokémon found</h2>
            <p className="font-body text-body-md text-on-surface-variant">
              Try a different name, ID, or type filter.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveType(''); }}
              className="btn-primary mt-6"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((p) => (
              <PokemonCard key={p.id} pokemon={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
