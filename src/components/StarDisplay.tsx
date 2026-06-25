
import type { StarSize } from '../types';
import './StarDisplay.css';

interface Props {
  stars: number;
  max?: number;
  size?: StarSize;
}

export default function MostrarEstrellas({ stars, max = 3, size = 'md' }: Props) {
  return (
    <div className={`star-display star-display--${size}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`sd-star ${i < stars ? 'filled' : 'empty'}`}>
          ★
        </span>
      ))}
    </div>
  );
}
