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

/* Posiciones (left%, top%) de cada estrella */
const STAR_POS = [
  [8,  68], [21, 32], [34, 60], [48, 24],
  [59, 56], [71, 28], [83, 62], [93, 38],
];

/* Estrellas de fondo */
const BG_STARS = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: (i * 37.7 + 13) % 100,
  y: (i * 61.3 + 7)  % 100,
  size: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
  dur:   1.4 + (i % 5) * 0.6,
  delay: (i % 7) * 0.4,
}));

export default function VistaConstelacion({ topic, progress, onSelectLevel, onBack }: Props) {
  const levelNames  = LEVEL_NAMES[topic.id] ?? [];
  const topicProg   = progress[topic.id] ?? {};
  const totalLevels = levelNames.length || 8;

  const obtenerEstado = (idx: number): LevelStatus => {
    const lvl = topicProg[idx];
    if (lvl?.completed) return { state: 'completed', stars: lvl.stars };
    if (idx === 0)      return { state: 'unlocked',  stars: 0 };
    if (topicProg[idx - 1]?.completed) return { state: 'unlocked', stars: 0 };
    return { state: 'locked', stars: 0 };
  };

  const totalStars     = Object.values(topicProg).reduce((s, l) => s + (l.stars ?? 0), 0);
  const completedCount = Object.values(topicProg).filter(l => l.completed).length;
  const maxStars       = totalLevels * 3;

  const levels = Array.from({ length: totalLevels }, (_, i) => ({
    idx: i,
    name: levelNames[i] ?? `Nivel ${i + 1}`,
    pos: STAR_POS[i] ?? [10 + i * 11, 50],
    ...obtenerEstado(i),
  }));

  return (
    <div className="const-backdrop">

      {/* Estrellas de fondo */}
      {BG_STARS.map(s => (
        <div key={s.id} className="const-bg-star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          background: '#ffffff',
          animationDuration: `${s.dur}s`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}

      {/* Estrellas fugaces */}
      <div className="const-shoot" style={{
        top: '14%', width: 130,
        background: 'linear-gradient(90deg, transparent, #fbbf24, transparent)',
        transform: 'rotate(30deg)',
        animationDuration: '9s',
      }} />
      <div className="const-shoot" style={{
        top: '60%', width: 80,
        background: 'linear-gradient(90deg, transparent, #f472b6, transparent)',
        transform: 'rotate(28deg)',
        animationDuration: '13s', animationDelay: '5s',
      }} />

      {/* ── Planetas decorativos ── */}

      {/* Saturno — arriba derecha */}
      <div className="cdeco-saturn">
        <div className="cdeco-saturn-body" />
        <div className="cdeco-saturn-ring" />
      </div>

      {/* Luna — abajo izquierda */}
      <div className="cdeco-moon">
        <div className="cdeco-crater" style={{ top: '22%', left: '18%', width: 11, height: 11 }} />
        <div className="cdeco-crater" style={{ top: '48%', left: '52%', width: 16, height: 16 }} />
        <div className="cdeco-crater" style={{ top: '68%', left: '22%', width: 8,  height: 8  }} />
      </div>

      {/* Marte — derecha media */}
      <div className="cdeco-mars" />

      {/* Urano — arriba izquierda */}
      <div className="cdeco-uranus" />

      {/* ── Header ── */}
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

      {/* ── Mapa de constelación ── */}
      <div className="const-map-wrap">
        <div className="const-map">

          {/* Líneas SVG */}
          <svg className="const-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {levels.map((lv, i) => {
              if (i === levels.length - 1) return null;
              const next = levels[i + 1];
              const lit  = lv.state !== 'locked' && next.state !== 'locked';
              return (
                <line
                  key={i}
                  x1={lv.pos[0]}   y1={lv.pos[1]}
                  x2={next.pos[0]} y2={next.pos[1]}
                  stroke={lit ? 'rgba(251,191,36,0.5)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth="0.45"
                  strokeDasharray={lit ? 'none' : '1.4,1.4'}
                />
              );
            })}
          </svg>

          {/* Nodos */}
          {levels.map(lv => (
            <div
              key={lv.idx}
              className={`star-node star-node--${lv.state}`}
              style={{ left: `${lv.pos[0]}%`, top: `${lv.pos[1]}%` }}
              onClick={() => lv.state !== 'locked' && onSelectLevel(lv.idx)}
            >
              {/* Halo pulsante */}
              {lv.state === 'unlocked' && (
                <div className="star-halo" style={{ width: 68, height: 68, background: 'rgba(167,139,250,0.4)' }} />
              )}

              {/* Estrella con forma de clip-path */}
              <div className={`star-dot star-dot--${lv.state}`}>
                {lv.state === 'locked'
                  ? <span className="star-lock">🔒</span>
                  : <span className="star-num">{lv.idx + 1}</span>
                }
              </div>

              {/* Puntuación */}
              {lv.state === 'completed' && (
                <div className="star-score">
                  {[1,2,3].map(n => (
                    <span key={n} className={`score-pip ${n <= lv.stars ? 'score-pip--on' : 'score-pip--off'}`}>★</span>
                  ))}
                </div>
              )}

              {lv.state === 'unlocked' && (
                <span className="score-play">¡Jugar!</span>
              )}

              {/* Tooltip */}
              <div className="star-label">{lv.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="const-footer">
        <div className="footer-stat">
          <span className="footer-icon">⭐</span>
          <div className="footer-text">
            <span className="footer-value">
              {totalStars}
              <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>/{maxStars}</span>
            </span>
            <span className="footer-desc">Estrellas</span>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-stat">
          <span className="footer-icon">🏆</span>
          <div className="footer-text">
            <span className="footer-value">
              {completedCount}
              <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>/{totalLevels}</span>
            </span>
            <span className="footer-desc">Completados</span>
          </div>
        </div>
      </div>
    </div>
  );
}
