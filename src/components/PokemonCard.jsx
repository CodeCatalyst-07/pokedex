import { useState } from 'react';
import { Link } from 'react-router-dom';
import TypeChip from './TypeChip';
import { TYPE_HEX } from '../data/types';

export default function PokemonCard({ pokemon }) {
  const [imgError, setImgError] = useState(false);
  const primaryType = pokemon.types[0] ?? 'normal';
  const typeHex     = TYPE_HEX[primaryType] ?? '#A8A878';

  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block">
      <article
        className="pokemon-card group relative flex flex-col"
        style={{
          borderTop: `3px solid ${typeHex}`,
        }}
      >
        {/* Pokémon number badge */}
        <span className="absolute top-3 right-3 font-headline font-bold text-caption text-outline bg-surface-container rounded-md px-2 py-0.5">
          #{String(pokemon.id).padStart(3, '0')}
        </span>

        {/* Image — breaks top container edge slightly */}
        <div className="flex justify-center pt-4 pb-2 bg-gradient-to-b from-surface-container-low to-white">
          {!imgError ? (
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-28 h-28 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 -mt-4"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center text-4xl">
              🔴
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pb-4 flex flex-col gap-2 flex-1">
          {/* Types */}
          <div className="flex gap-1.5 flex-wrap">
            {pokemon.types.map((t) => (
              <TypeChip key={t} type={t} size="sm" />
            ))}
          </div>

          {/* Name */}
          <h3 className="font-headline font-bold text-h3 text-on-surface capitalize leading-tight">
            {pokemon.name}
          </h3>

          {/* Stats mini-row */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
            {[
              { label: 'HP',  val: pokemon.stats.hp },
              { label: 'ATK', val: pokemon.stats.attack },
              { label: 'DEF', val: pokemon.stats.defense },
              { label: 'SPD', val: pokemon.stats.speed },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="font-headline font-bold text-caption text-outline uppercase w-7 shrink-0">
                  {label}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/70"
                    style={{ width: `${Math.min((val / 255) * 100, 100)}%` }}
                  />
                </div>
                <span className="font-body text-caption text-on-surface-variant w-6 text-right">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Abilities */}
          {pokemon.abilities?.length > 0 && (
            <div className="mt-1 flex gap-1.5 flex-wrap">
              {pokemon.abilities.slice(0, 2).map((ability) => (
                <span
                  key={ability}
                  className="font-body text-caption text-on-surface-variant bg-surface-container rounded-full px-2 py-0.5 capitalize"
                >
                  {ability.replace('-', ' ')}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
