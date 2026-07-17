// ============================================================
// ConstellationView.tsx — MAPA DE CONSTELACIÓN (NIVELES)
// Muestra los 8 niveles de un tema como estrellas en el espacio.
// ============================================================

import { useState, useEffect } from 'react';
import { obtenerNivelesDeTema } from '../services/api';
import type { Topic, Progress } from '../types';
import SpaceBackdrop            from '../components/SpaceBackdrop';
import SpacePlanets             from '../components/SpacePlanets';
import './ConstellationView.css';

type NodeState = 'locked' | 'unlocked' | 'completed';
interface LevelStatus { state: NodeState; stars: number; }

interface Props {
  topic:         Topic;
  progress:      Progress;
  userGrade:     string;
  // Si el alumno pertenece a un grupo de clase, aquí llegan solo los índices de
  // nivel que su maestro asignó dentro de este tema. null = sin restricción.
  nivelesPermitidos?: number[] | null;
  onSelectLevel: (idx: number) => void;
  onBack:        () => void;
}

// ── ARREGLO DE POSICIONES ────────────────────────────────────
// Un arreglo de arreglos (arreglo bidimensional / matriz).
// Cada elemento interno es un par [left%, top%] que indica
// dónde se coloca cada estrella en el mapa.
//
// Visualización:
//   STAR_POS[0] = [8,  68] → estrella 1: left:8%,  top:68%  (abajo izquierda)
//   STAR_POS[1] = [21, 32] → estrella 2: left:21%, top:32%  (arriba)
//   STAR_POS[2] = [34, 60] → estrella 3: left:34%, top:60%  (abajo)
//   ... etc.
// Se zigzaguean arriba y abajo para formar una constelación visual.
const STAR_POS = [
  [8,  68], [21, 32], [34, 60], [48, 24],
  [59, 56], [71, 28], [83, 62], [93, 38],
];

export default function VistaConstelacion({ topic, progress, userGrade, nivelesPermitidos = null, onSelectLevel, onBack }: Props) {

  // ── NOMBRES DE NIVEL (ahora vienen de MySQL, no de un arreglo) ──
  const [levelNames, setLevelNames] = useState<string[]>([]);

  useEffect(() => {
    if (!topic?.id || !userGrade) return;

    obtenerNivelesDeTema(topic.id, userGrade)
      .then((res) => {
        const filas = res.data || [];
        // Las filas ya vienen ordenadas por `orden` (0-7) desde el backend
        setLevelNames(filas.map((f: any) => f.nombre_nivel));
      })
      .catch((err) => console.error('❌ Error al obtener niveles:', err));
  }, [topic?.id, userGrade]);

  const topicProg   = progress[topic.id] ?? {}; // progreso del alumno en este tema (o {} si no hay)
  const totalNiveles = levelNames.length || 8;  // siempre 8 (|| 8 por si aún no cargó)

  // ── ÍNDICES VISIBLES ─────────────────────────────────────────
  // Si el alumno pertenece a un grupo, solo se muestran los niveles que
  // su maestro asignó — el resto ni siquiera aparece en el mapa.
  // Si no pertenece a ningún grupo (null), se muestran los 8 de siempre.
  const indicesVisibles = nivelesPermitidos === null
    ? Array.from({ length: totalNiveles }, (_, i) => i)
    : [...nivelesPermitidos].sort((a, b) => a - b);

  // ── FUNCIÓN: DETERMINAR EL ESTADO DE UN NIVEL ────────────────
  // posEnVisibles = posición del nivel dentro de la lista YA FILTRADA,
  // así el desbloqueo depende del nivel visible anterior, no del índice crudo.
  const obtenerEstado = (idx: number, posEnVisibles: number): LevelStatus => {
    const lvl = topicProg[idx]; // accedemos al progreso del nivel con índice idx

    // ── IF #1: ¿El nivel ya está completado? ─────────────────
    // lvl?.completed usa optional chaining: si lvl no existe, no rompe el código
    if (lvl?.completed) return { state: 'completed', stars: lvl.stars };

    // ── IF #2: ¿Es el primer nivel visible? ──────────────────
    // El primer nivel de la lista siempre está disponible
    if (posEnVisibles === 0) return { state: 'unlocked', stars: 0 };

    // ── IF #3: ¿El nivel visible anterior está completado? ───
    const idxAnterior = indicesVisibles[posEnVisibles - 1];
    if (topicProg[idxAnterior]?.completed) return { state: 'unlocked', stars: 0 };

    // Si ninguno de los anteriores fue true → el nivel está bloqueado
    return { state: 'locked', stars: 0 };
  };

  // ── ESTADÍSTICAS TOTALES DEL TEMA ────────────────────────────
  // Solo contamos los niveles que el alumno realmente puede ver/jugar
  const totalStars = indicesVisibles.reduce((s, idx) => s + (topicProg[idx]?.stars ?? 0), 0);
  const completedCount = indicesVisibles.filter(idx => topicProg[idx]?.completed).length;
  const totalLevels = indicesVisibles.length;
  const maxStars     = totalLevels * 3; // máximo = 3 estrellas × niveles visibles

  // ── CONSTRUIR EL ARREGLO DE NIVELES VISIBLES ─────────────────
  // La posición en el mapa (pos) se reasigna en orden 0,1,2... según cuántos
  // niveles hay visibles, para que la constelación se vea completa sin huecos.
  const levels = indicesVisibles.map((idx, i) => ({
    idx,
    name: levelNames[idx] ?? `Nivel ${idx + 1}`,
    pos:  STAR_POS[i] ?? [10 + i * 11, 50],
    ...obtenerEstado(idx, i),
  }));

  return (
    <SpaceBackdrop className="const-backdrop">
      <SpacePlanets />

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

      {levels.length === 0 ? (
        <div className="const-empty">
          <span style={{ fontSize: '2.6rem' }}>🛰️</span>
          <p>Tu maestro todavía no asignó ejercicios de este tema.</p>
        </div>
      ) : (
      <div className="const-map-wrap">
        <div className="const-map">

          {/* ── Líneas SVG entre estrellas ── */}
          <svg className="const-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
            {levels.map((lv, i) => {

              // ── IF #4: ¿Es el último nivel? ──────────────
              // La última estrella no tiene siguiente, así que no dibujamos línea
              if (i === levels.length - 1) return null;

              const next = levels[i + 1]; // el siguiente nivel en el arreglo

              // La línea se ilumina (dorada) si AMBOS niveles están desbloqueados/completados
              // !== 'locked' → true si el estado es 'unlocked' O 'completed'
              // && → ambas condiciones deben ser true
              const lit = lv.state !== 'locked' && next.state !== 'locked';

              return (
                <line
                  key={i}
                  x1={lv.pos[0]}   y1={lv.pos[1]}   // lv.pos[0] = left%, lv.pos[1] = top%
                  x2={next.pos[0]} y2={next.pos[1]}
                  // OPERADOR TERNARIO: si lit → color dorado, si no → color gris transparente
                  stroke={lit ? 'rgba(251,191,36,0.5)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth="0.45"
                  // Si está iluminada → línea continua, si no → punteada
                  strokeDasharray={lit ? 'none' : '1.4,1.4'}
                />
              );
            })}
          </svg>

          {/* ── Nodos (estrellas) del mapa ── */}
          {levels.map(lv => (
            <div
              key={lv.idx}
              // Template literal para construir la clase CSS según el estado:
              // 'star-node star-node--completed', 'star-node star-node--locked', etc.
              className={`star-node star-node--${lv.state}`}
              style={{ left: `${lv.pos[0]}%`, top: `${lv.pos[1]}%` }}
              // ── IF en línea (&&): solo ejecuta onSelectLevel si NO está bloqueado ─
              // lv.state !== 'locked' && onSelectLevel(lv.idx)
              // Si lv.state es 'locked' → la primera parte es false → no ejecuta lo segundo
              // Es equivalente a: if (lv.state !== 'locked') onSelectLevel(lv.idx)
              onClick={() => lv.state !== 'locked' && onSelectLevel(lv.idx)}
            >
              {/* ── IF con && (renderizado condicional) ── */}
              {/* Solo muestra el halo si el nivel está disponible para jugar */}
              {lv.state === 'unlocked' && (
                <div className="star-halo" style={{ width: 68, height: 68, background: 'rgba(167,139,250,0.4)' }} />
              )}

              <div className={`star-dot star-dot--${lv.state}`}>
                {/* TERNARIO: si está bloqueado muestra 🔒, si no muestra el número */}
                {lv.state === 'locked'
                  ? <span className="star-lock">🔒</span>
                  : <span className="star-num">{lv.idx + 1}</span>
                  // +1 porque los índices van de 0 a 7 pero mostramos del 1 al 8
                }
              </div>

              {/* Solo muestra las estrellas ★★★ si el nivel está completado */}
              {lv.state === 'completed' && (
                <div className="star-score">
                  {/* Arreglo [1,2,3] para generar 3 puntos de estrellas */}
                  {/* Cada punto se "enciende" si su número n es ≤ las estrellas ganadas */}
                  {[1, 2, 3].map(n => (
                    <span
                      key={n}
                      // TERNARIO: si n ≤ lv.stars → encendida, si no → apagada
                      className={`score-pip ${n <= lv.stars ? 'score-pip--on' : 'score-pip--off'}`}
                    >★</span>
                  ))}
                </div>
              )}

              {/* Solo muestra "¡Jugar!" si está disponible */}
              {lv.state === 'unlocked' && (
                <span className="score-play">¡Jugar!</span>
              )}

              <div className="star-label">{lv.name}</div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* ── Pie de página con estadísticas ── */}
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
    </SpaceBackdrop>
  );
}
