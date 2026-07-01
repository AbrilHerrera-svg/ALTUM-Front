// ============================================================
// ResultView.tsx — PANTALLA DE RESULTADOS
// Se muestra cuando el alumno termina todas las preguntas de un nivel.
// Muestra:
//   - Trofeo según las estrellas: 🏆 (3) / 🥈 (2) / 🥉 (1)
//   - Las estrellas ganadas animadas (aparecen una por una)
//   - Una frase motivacional aleatoria
//   - Botones para ir al siguiente nivel, reintentar o volver al mapa
// ============================================================

import { useEffect, useState }  from 'react';
import MostrarEstrellas          from '../components/StarDisplay';
import { LEVEL_NAMES }           from '../data/topics';
import type { Topic }            from '../types';
import './ResultView.css';

// Frases de felicitación aleatorias — se elige una diferente cada vez
const CONGRATS = [
  '¡Eres increíble! 🚀', '¡Misión cumplida! 🌟', '¡Explorador experto! 🏆',
  '¡Brillante trabajo! 💫', '¡Eso es matemáticas de otro planeta! 🪐',
];

// Frases motivacionales según cuántas estrellas sacó el alumno
const MOTIVATIONS_BY_STARS: Record<number, string[]> = {
  3: ['¡Perfecto! ¡Sin ningún error! Eres una supernova 🌟', '¡3 estrellas! ¡Eres el mejor explorador! 🚀'],
  2: ['¡Muy bien! Solo cometiste 1 error. ¡Sigue practicando! 💪', '¡Casi perfecto! Un poco más y llegarás a 3 estrellas ⭐'],
  1: ['¡Lo lograste! La práctica hace al maestro 🌱', '¡Completaste el nivel! Intenta de nuevo para más estrellas 🔄'],
};

// Función auxiliar: elige un elemento al azar de un array
function elegir<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

// Props que recibe de App.tsx
interface Props {
  topic:    Topic;
  levelIdx: number;
  stars:    number;      // 1, 2 o 3 — las estrellas que ganó el alumno
  onNext:   () => void;  // ir al siguiente nivel
  onRetry:  () => void;  // volver a jugar este mismo nivel
  onBack:   () => void;  // volver al mapa de constelación
}

export default function VistaResultado({ topic, levelIdx, stars, onNext, onRetry, onBack }: Props) {

  // showStars controla cuántas estrellas se han "revelado" en la animación
  // Empieza en 0 y va aumentando de una en una cada 500ms
  const [showStars, setShowStars] = useState(0);

  const levelName     = LEVEL_NAMES[topic.id]?.[levelIdx]      ?? `Nivel ${levelIdx + 1}`;
  const nextLevelName = LEVEL_NAMES[topic.id]?.[levelIdx + 1]; // nombre del siguiente nivel (puede ser undefined)
  const hasNext       = levelIdx + 1 < 8; // hay siguiente nivel si el índice actual es menor que 7

  // ── ANIMACIÓN DE ESTRELLAS ───────────────────────────────────
  // useEffect hace aparecer las estrellas una por una con un retraso de 500ms entre cada una
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    for (let i = 1; i <= stars; i++) {
      // setTimeout programa que en i*500ms se muestre la estrella número i
      t = setTimeout(() => setShowStars(i), i * 500);
    }
    // La función de limpieza cancela el último timeout si el componente se desmonta antes
    return () => clearTimeout(t);
  }, [stars]);

  return (
    <div className="res-backdrop">
      <div className="res-content">

        {/* Trofeo según las estrellas: oro, plata o bronce */}
        <div className="res-trophy">{stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉'}</div>

        {/* Frase de felicitación aleatoria */}
        <h1 className="res-congrats">{elegir(CONGRATS)}</h1>

        {/* Nombre del nivel que acaba de completar */}
        <p className="res-level-name">{levelName}</p>

        {/* Estrellas animadas — showStars va de 0 a stars conforme pasan los timeouts */}
        <div className="res-stars">
          <MostrarEstrellas stars={showStars} max={3} size="lg" />
        </div>

        {/* Frase motivacional según el puntaje — ?? usa las de 1 estrella si stars no existe */}
        <p className="res-motivation">{elegir(MOTIVATIONS_BY_STARS[stars] ?? MOTIVATIONS_BY_STARS[1])}</p>

        {/* Botones de acción */}
        <div className="res-actions">
          {/* Solo muestra "Siguiente nivel" si existe un nivel siguiente */}
          {hasNext && (
            <button className="res-btn res-btn--next" onClick={onNext}>
              ¡Siguiente nivel! → {nextLevelName}
            </button>
          )}
          <button className="res-btn res-btn--retry" onClick={onRetry}>🔄 Jugar de nuevo</button>
          <button className="res-btn res-btn--back"  onClick={onBack}>🗺️ Volver al mapa</button>
        </div>
      </div>
    </div>
  );
}
