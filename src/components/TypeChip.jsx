import { TYPE_COLORS } from '../data/types';

export default function TypeChip({ type, size = 'md' }) {
  const bg = TYPE_COLORS[type] ?? 'bg-[#A8A878]';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-caption',
    lg: 'px-4 py-1.5 text-label-bold',
  };

  return (
    <span
      className={`type-chip ${bg} ${sizeClasses[size]} shadow-sm`}
      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}
    >
      {type}
    </span>
  );
}
