import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-inverse mt-xl">
      <div className="section-container py-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center">
                <div className="w-4 h-0.5 bg-white rounded-full" />
              </div>
              <span className="font-headline font-extrabold text-h3 text-white">
                PokéDex
              </span>
            </div>
            <p className="font-body text-body-md text-inverse-on-surface/70 max-w-sm">
              The ultimate trainer resource for all 151 original Pokémon. Stats, moves, abilities, and evolution paths — all in one place.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-headline font-bold text-label-bold text-inverse-on-surface mb-3 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/catalog', label: 'Pokémon Catalog' },
                { to: '/tips',    label: 'Trainer Tips' },
                { to: '/pokedex', label: 'Resource Hub' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-body-md text-inverse-on-surface/60 hover:text-secondary-container transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-label-bold text-inverse-on-surface mb-3 uppercase tracking-wider">
              Info
            </h4>
            <ul className="space-y-2">
              {['About Us', 'API Docs', 'Privacy Policy', 'Community'].map((item) => (
                <li key={item}>
                  <span className="font-body text-body-md text-inverse-on-surface/60 cursor-not-allowed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-lg pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-caption text-inverse-on-surface/40">
            © 2024 PokéDex Showcase. Data from{' '}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noreferrer"
              className="text-secondary-container hover:underline"
            >
              PokéAPI
            </a>
            . All rights reserved for Trainers.
          </p>
          <div className="flex items-center gap-2 text-caption text-inverse-on-surface/40 font-body">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            PokéAPI — Live
          </div>
        </div>
      </div>
    </footer>
  );
}
