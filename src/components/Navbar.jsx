import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-outline-variant shadow-sm">
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center shadow-pokeball group-hover:scale-110 transition-transform duration-200">
            <div className="w-4 h-0.5 bg-white rounded-full" />
          </div>
          <span className="font-headline font-extrabold text-h3 text-primary leading-none">
            Poké<span className="text-on-surface">Dex</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {[
            { to: '/',        label: 'Home' },
            { to: '/catalog', label: 'Catalog' },
            { to: '/tips',    label: 'Trainer Tips' },
            { to: '/pokedex', label: 'Resource' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 font-headline font-semibold text-label-bold rounded-md transition-colors duration-150
                ${isActive
                  ? 'text-primary'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-red rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-secondary-container/40 px-3 py-1.5 rounded-full border border-secondary-container">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-headline font-bold text-caption text-secondary">
            151 Species
          </span>
        </div>
      </div>
    </header>
  );
}
