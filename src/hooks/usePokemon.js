import { useState, useEffect } from 'react';

const BASE = 'https://pokeapi.co/api/v2';
const ARTWORK = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

// Fetch the full list of first 151 Pokémon with all detail fields
export function usePokemonList(limit = 151) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        setLoading(true);
        // 1. Get the index list
        const listRes  = await fetch(`${BASE}/pokemon?limit=${limit}&offset=0`);
        const listData = await listRes.json();

        // 2. Fetch every Pokémon's detail in parallel
        const details = await Promise.all(
          listData.results.map(({ url }) => fetch(url).then((r) => r.json()))
        );

        if (cancelled) return;

        const normalised = details.map((d) => ({
          id:         d.id,
          name:       d.name,
          image:      ARTWORK(d.id),
          types:      d.types.map((t) => t.type.name),
          abilities:  d.abilities.map((a) => a.ability.name),
          stats: {
            hp:      d.stats.find((s) => s.stat.name === 'hp')?.base_stat       ?? 0,
            attack:  d.stats.find((s) => s.stat.name === 'attack')?.base_stat   ?? 0,
            defense: d.stats.find((s) => s.stat.name === 'defense')?.base_stat  ?? 0,
            speed:   d.stats.find((s) => s.stat.name === 'speed')?.base_stat    ?? 0,
            spAtk:   d.stats.find((s) => s.stat.name === 'special-attack')?.base_stat ?? 0,
            spDef:   d.stats.find((s) => s.stat.name === 'special-defense')?.base_stat ?? 0,
          },
          height: d.height / 10,  // decimetres → metres
          weight: d.weight / 10,  // hectograms → kg
          baseExperience: d.base_experience,
        }));

        setPokemon(normalised);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, [limit]);

  return { pokemon, loading, error };
}

// Fetch a single Pokémon by id or name
export function usePokemonDetail(idOrName) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!idOrName) return;
    let cancelled = false;

    async function fetchOne() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE}/pokemon/${idOrName}`);
        if (!res.ok) throw new Error(`Pokémon "${idOrName}" not found`);
        const d = await res.json();

        // Fetch species for flavour text
        let flavourText = '';
        try {
          const specRes  = await fetch(`${BASE}/pokemon-species/${d.id}`);
          const specData = await specRes.json();
          const entry = specData.flavor_text_entries?.find(
            (e) => e.language.name === 'en'
          );
          flavourText = entry?.flavor_text?.replace(/\f/g, ' ') ?? '';
        } catch (_) { /* optional */ }

        if (cancelled) return;

        setData({
          id:         d.id,
          name:       d.name,
          image:      ARTWORK(d.id),
          types:      d.types.map((t) => t.type.name),
          abilities:  d.abilities.map((a) => ({
            name:     a.ability.name,
            hidden:   a.is_hidden,
          })),
          stats: {
            hp:      d.stats.find((s) => s.stat.name === 'hp')?.base_stat       ?? 0,
            attack:  d.stats.find((s) => s.stat.name === 'attack')?.base_stat   ?? 0,
            defense: d.stats.find((s) => s.stat.name === 'defense')?.base_stat  ?? 0,
            speed:   d.stats.find((s) => s.stat.name === 'speed')?.base_stat    ?? 0,
            spAtk:   d.stats.find((s) => s.stat.name === 'special-attack')?.base_stat ?? 0,
            spDef:   d.stats.find((s) => s.stat.name === 'special-defense')?.base_stat ?? 0,
          },
          moves:  d.moves.slice(0, 6).map((m) => m.move.name),
          height: d.height / 10,
          weight: d.weight / 10,
          baseExperience: d.base_experience,
          flavourText,
        });
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchOne();
    return () => { cancelled = true; };
  }, [idOrName]);

  return { data, loading, error };
}
