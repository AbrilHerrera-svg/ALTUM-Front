import MostrarEstrellas from '../components/StarDisplay';
import { LEVEL_NAMES } from '../data/topics';
import type { Topic, Progress } from '../types';
import './ConstellationView.css';

type NodeState = 'locked' | 'unlocked' | 'completed';
interface LevelStatus { state: NodeState; stars: number; }

interface Props {
  topic: Topic;
  progress: Progress;
  onSelectLevel: (idx: number) => void;
  onBack: () => void;
}

export default function VistaConstelacion({ topic, progress, onSelectLevel, onBack }: Props) {
  const levelNames = LEVEL_NAMES[topic.id] ?? [];
  const topicProgress = progress[topic.id] ?? {};

  const obtenerEstado = (levelIdx: number): LevelStatus => {
    const lvl = topicProgress[levelIdx];
    if (lvl?.completed) return { state: 'completed', stars: lvl.stars };
    if (levelIdx === 0) return { state: 'unlocked', stars: 0 };
    const prev = topicProgress[levelIdx - 1];
    if (prev?.completed) return { state: 'unlocked', stars: 0 };
    return { state: 'locked', stars: 0 };
  };

  const totalLevels = levelNames.length || 8;

  return (
    <div className="const-backdrop">
      <div className="const-header">
        <button className="const-back" onClick={onBack}>← Temas</button>
        <div className="const-header-info">
          <span className="const-planet">{topic.planet}</span>
          <div>
            <h2 className="const-title">{topic.title}</h2>
            <p className="const-sub">Elige tu nivel</p>
          </div>
        </div>
      </div>

      <div className="const-grid-wrap">
        <div className="const-grid">
          {Array.from({ length: totalLevels }, (_, idx) => {
            const { state, stars } = obtenerEstado(idx);
            const name = levelNames[idx] ?? `Nivel ${idx + 1}`;
            return (
              <button
                key={idx}
                className={`lcb lcb--${state}`}
                onClick={() => state !== 'locked' && onSelectLevel(idx)}
                disabled={state === 'locked'}
                style={{ '--tc': topic.color, '--tg': topic.gradient } as React.CSSProperties}
              >
                <div className="lcb-num">{idx + 1}</div>
                <div className="lcb-body">
                  <span className="lcb-name">{name}</span>
                  {state === 'completed' && (
                    <div className="lcb-stars">
                      <MostrarEstrellas stars={stars} max={3} size="sm" />
                    </div>
                  )}
                  {state === 'unlocked' && <span className="lcb-badge">¡Disponible!</span>}
                  {state === 'locked'   && <span className="lcb-lock">🔒 Bloqueado</span>}
                </div>
                {state === 'unlocked' && <div className="lcb-pulse" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
