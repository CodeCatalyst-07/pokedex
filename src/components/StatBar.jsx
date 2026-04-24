import { useEffect, useRef } from 'react';

const STAT_COLORS = {
  HP:      'bg-green-500',
  ATK:     'bg-brand-red',
  DEF:     'bg-tertiary',
  SPD:     'bg-brand-yellow',
  'SP.ATK':'bg-[#F85888]',
  'SP.DEF':'bg-[#78C850]',
};

export default function StatBar({ label, value, max = 255 }) {
  const barRef = useRef(null);
  const pct    = Math.min(Math.round((value / max) * 100), 100);
  const color  = STAT_COLORS[label] ?? 'bg-primary';

  useEffect(() => {
    if (!barRef.current) return;
    barRef.current.style.setProperty('--stat-pct', `${pct}%`);
    // Trigger reflow so animation replays on mount
    barRef.current.style.width = '0%';
    void barRef.current.offsetWidth;
    barRef.current.style.width = '';
  }, [pct]);

  return (
    <div className="flex items-center gap-3">
      <span className="font-headline font-bold text-caption text-on-surface-variant w-14 shrink-0 uppercase tracking-wide">
        {label}
      </span>
      <span className="font-headline font-bold text-label-bold text-on-surface w-8 shrink-0 text-right">
        {value}
      </span>
      <div className="flex-1 h-2.5 rounded-full bg-surface-container overflow-hidden shadow-inner">
        <div
          ref={barRef}
          className={`h-full rounded-full animate-charge ${color}`}
          style={{ '--stat-pct': `${pct}%` }}
        />
      </div>
    </div>
  );
}
