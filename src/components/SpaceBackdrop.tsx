import type { ReactNode } from 'react';
import './SpaceBackdrop.css';

const STAR_COLORS = ['#fbbf24', '#f472b6', '#22d3ee', '#fb923c', '#a3e635', '#ffffff', '#e879f9', '#34d399'];

const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  x: (i * 37.7 + 13.3) % 100,
  y: (i * 61.3 + 7.7)  % 100,
  size: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
  color: STAR_COLORS[i % STAR_COLORS.length],
  duration: 1.5 + (i % 5) * 0.7,
  delay: (i % 7) * 0.5,
}));

interface Props {
  gradient?: string;
  children?: ReactNode;
  className?: string;
}

export default function SpaceBackdrop({ gradient, children, className = '' }: Props) {
  const bg = gradient ?? 'linear-gradient(135deg, #3b0764 0%, #6d28d9 30%, #8b5cf6 55%, #7c3aed 75%, #4338ca 100%)';

  return (
    <div className={`sb-backdrop ${className}`} style={{ background: bg }}>
      {STARS.map(s => (
        <div
          key={s.id}
          className="sb-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      <div className="sb-shoot" />
      <div className="sb-shoot sb-shoot--s2" />

      {children}
    </div>
  );
}
