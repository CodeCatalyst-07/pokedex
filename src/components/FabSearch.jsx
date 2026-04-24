import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FabSearch() {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState('');
  const navigate          = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    navigate(`/pokemon/${q}`);
    setQuery('');
    setOpen(false);
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Search modal */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-card-hover p-4 w-72 animate-fadeUp border border-outline-variant">
          <p className="font-headline font-bold text-label-bold text-on-surface mb-2">
            Quick Search
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name or #ID…"
              className="dex-input flex-1 text-sm"
            />
            <button type="submit" className="btn-primary text-sm px-3 py-2">
              Go
            </button>
          </form>
          <p className="font-body text-caption text-on-surface-variant mt-2">
            e.g. "pikachu" or "25"
          </p>
        </div>
      )}

      {/* FAB button — Pokéball */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Quick Search"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full
                   bg-brand-red shadow-fab
                   flex items-center justify-center
                   hover:scale-110 active:scale-95
                   transition-transform duration-150"
      >
        {/* Pokéball icon */}
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="white" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="white" />
        </svg>
      </button>
    </>
  );
}
