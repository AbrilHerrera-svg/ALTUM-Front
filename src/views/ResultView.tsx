import { useEffect, useState } from 'react';
import MostrarEstrellas from '../components/StarDisplay';
import { LEVEL_NAMES } from '../data/topics';
import type { Topic } from '../types';
import './ResultView.css';

const CONGRATS = [
  '¡Eres increíble! 🚀', '¡Misión cumplida! 🌟', '¡Explorador experto! 🏆',
  '¡Brillante trabajo! 💫', '¡Eso es matemáticas de otro planeta! 🪐',
];

const MOTIVATIONS_BY_STARS: Record<number, string[]> = {
  3: ['¡Perfecto! ¡Sin ningún error! Eres una supernova 🌟', '¡3 estrellas! ¡Eres el mejor explorador! 🚀'],
  2: ['¡Muy bien! Solo cometiste 1 error. ¡Sigue practicando! 💪', '¡Casi perfecto! Un poco más y llegarás a 3 estrellas ⭐'],
  1: ['¡Lo lograste! La práctica hace al maestro 🌱', '¡Completaste el nivel! Intenta de nuevo para más estrellas 🔄'],
};

function elegir<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

interface Props {
  topic: Topic;
  levelIdx: number;
  stars: number;
  onNext: () => void;
  onRetry: () => void;
  onBack: () => void;
}

export default function VistaResultado({ topic, levelIdx, stars, onNext, onRetry, onBack }: Props) {
  const [showStars, setShowStars] = useState(0);
  const levelName = LEVEL_NAMES[topic.id]?.[levelIdx] ?? `Nivel ${levelIdx + 1}`;
  const nextLevelName = LEVEL_NAMES[topic.id]?.[levelIdx + 1];
  const hasNext = levelIdx + 1 < 8;

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    for (let i = 1; i <= stars; i++) {
      t = setTimeout(() => setShowStars(i), i * 500);
    }
    return () => clearTimeout(t);
  }, [stars]);

  return (
    <div className="res-backdrop">
      <div className="res-content">
        <div className="res-trophy">{stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉'}</div>
        <h1 className="res-congrats">{elegir(CONGRATS)}</h1>
        <p className="res-level-name">{levelName}</p>
        <div className="res-stars">
          <MostrarEstrellas stars={showStars} max={3} size="lg" />
        </div>
        <p className="res-motivation">{elegir(MOTIVATIONS_BY_STARS[stars] ?? MOTIVATIONS_BY_STARS[1])}</p>
        <div className="res-actions">
          {hasNext && (
            <button className="res-btn res-btn--next" onClick={onNext}>
              ¡Siguiente nivel! → {nextLevelName}
            </button>
          )}
          <button className="res-btn res-btn--retry" onClick={onRetry}>🔄 Jugar de nuevo</button>
          <button className="res-btn res-btn--back" onClick={onBack}>🗺️ Volver al mapa</button>
        </div>
      </div>
    </div>
  );
}
