// ============================================================
// DashboardView.tsx — MAPA ESPACIAL (MENÚ PRINCIPAL)
// Muestra una tarjeta por cada tema con progreso y estrellas.
// ============================================================

import React, { useState, useEffect } from 'react';
import MostrarEstrellas from '../components/StarDisplay';
import { obtenerTemasPorGrado } from '../services/api';
import { obtenerEstiloDeTema } from '../data/temaEstilos';
import type { Progress, Topic } from '../types';
import './DashboardView.css';

// ── ¿QUÉ ES ESTE OBJETO? (INTERFACE) ────────────────────────
// StarDatum es un "molde" que describe qué propiedades tiene cada estrella de fondo.
// No es un arreglo — es la DEFINICIÓN de cómo se ve cada elemento del arreglo.
interface StarDatum {
  id: number;    // número único para identificar cada estrella (clave de React)
  x: number;     // posición horizontal en % (0 = izquierda, 100 = derecha)
  y: number;     // posición vertical en %   (0 = arriba,    100 = abajo)
  size: number;  // tamaño en píxeles (2 o 3)
  color: string; // color en hexadecimal (ej: '#fbbf24')
  dur: number;   // duración de la animación de parpadeo en segundos
  del: number;   // retraso antes de que empiece a parpadear (para que no parpaden juntas)
}

// ── ARREGLO DE ESTRELLAS DE FONDO ───────────────────────────
// Array.from({ length: 80 }, función) crea un arreglo de 80 elementos.
// El segundo parámetro es una función que se ejecuta por cada elemento:
//   _ → el elemento (lo ignoramos, por eso es _)
//   i → el índice actual (0, 1, 2, ..., 79)
//
// Usamos fórmulas matemáticas en vez de Math.random() para que las estrellas
// siempre aparezcan en las mismas posiciones (son predecibles, no aleatorias).
const BG_STARS: StarDatum[] = Array.from({ length: 80 }, (_, i) => ({
  id: i,

  // % es el operador módulo (residuo de la división).
  // (i * 37.7 + 13) % 100 siempre da un número entre 0 y 99.9
  // Distribuye las estrellas de forma que no se amontonen.
  x: (i * 37.7 + 13) % 100,
  y: (i * 61.3 + 7)  % 100,

  // i % 3 === 0 → cada 3 estrellas (0, 3, 6, 9...) el tamaño es 3, las demás son 2
  size: i % 3 === 0 ? 3 : 2,
  // ↑ Esto es un OPERADOR TERNARIO: condición ? valorSiTrue : valorSiFalse
  // Es un if/else en una sola línea.

  // i % 5 da 0, 1, 2, 3, 4, 0, 1, 2... → elige uno de los 5 colores de forma cíclica
  color: ['#fbbf24', '#f472b6', '#22d3ee', '#a3e635', '#ffffff'][i % 5],
  // ↑ Arreglo de 5 colores, accedemos con [i % 5] para rotar entre ellos

  dur: 1.5 + (i % 5) * 0.6,  // duración entre 1.5s y 4.1s
  del: (i % 7) * 0.4,        // retraso entre 0s y 2.4s (ciclo de 7)
}));

// ── PROPS ────────────────────────────────────────────────────
interface Props {
  userName:      string;
  userGrade:     string;
  userAvatar:    string;
  progress:      Progress;
  // Si el alumno pertenece a un grupo de clase, aquí llegan solo los ids de los
  // temas que su maestro asignó. null = no pertenece a ningún grupo → ve todos.
  temasPermitidos?: string[] | null;
  // Niveles específicos curados por el maestro (formato "slug-orden"). Se usa
  // para calcular el total real de niveles/estrellas de cada tarjeta — si
  // el maestro no curó nada para un tema, se usan los 8 niveles completos.
  ejerciciosDelGrupo?: { id_ejercicio: string }[];
  onSelectTopic: (topic: Topic) => void;
  onProfile:     () => void;
  onLogout:      () => void;
}

export default function VistaPrincipal({ userName, userGrade, userAvatar, progress, temasPermitidos = null, ejerciciosDelGrupo = [], onSelectTopic, onProfile, onLogout }: Props) {

  // Cuenta cuántos niveles curó el maestro para un tema en particular.
  // Si no curó ninguno, devuelve null → se usa el total real del tema (8).
  const nivelesCuradosDe = (topicId: string): number | null => {
    const count = ejerciciosDelGrupo.filter(e => e.id_ejercicio.startsWith(`${topicId}-`)).length;
    return count > 0 ? count : null;
  };

  // ── TEMAS DEL GRADO (ahora vienen de MySQL, no de un arreglo) ──
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    if (!userGrade) return;

    obtenerTemasPorGrado(userGrade)
      .then((res) => {
        const filas = res.data || [];
        // Convertimos cada fila de la base (nombre_tema, slug, nivelCount)
        // en un objeto Topic completo, combinándola con su estilo visual.
        const temasCompletos: Topic[] = filas.map((fila: any) => {
          const estilo = obtenerEstiloDeTema(fila.slug);
          return {
            id:          fila.slug,
            title:       fila.nombre_tema,
            description: '',
            levelCount:  fila.nivelCount || 8,
            ...estilo,
          };
        });
        setTopics(temasCompletos);
      })
      .catch((err) => console.error('❌ Error al obtener temas:', err));
  }, [userGrade]);

  // ── FUNCIÓN: CALCULAR ESTRELLAS DE UN TEMA ───────────────────
  const obtenerEstrellas = (topicId: string, levelCount: number) => {

    // ── IF #1: ¿El alumno tiene progreso en este tema? ────────
    // Si progress["numeric"] no existe, devuelve 0 estrellas ganadas
    // y el total máximo (levelCount × 3)
    if (!progress[topicId]) return { earned: 0, total: levelCount * 3 };

    // Object.values(objeto) extrae SOLO LOS VALORES del objeto (ignora las claves).
    // Ejemplo:
    //   progress["numeric"] = { "0": {stars:3}, "1": {stars:2}, "2": {stars:1} }
    //   Object.values(...)  = [ {stars:3}, {stars:2}, {stars:1} ]
    //   → un ARREGLO con los objetos de progreso de cada nivel
    //
    // .reduce(función, valorInicial) recorre el arreglo acumulando un resultado.
    //   s  → acumulador (empieza en 0)
    //   l  → elemento actual del arreglo
    //   s + (l.stars ?? 0) → suma las estrellas del nivel actual al acumulador
    //   ?? 0 → si l.stars es null o undefined, usa 0
    //
    // Ejemplo paso a paso:
    //   valores = [ {stars:3}, {stars:2}, {stars:1} ]
    //   iteración 1: s=0,  l={stars:3} → resultado: 3
    //   iteración 2: s=3,  l={stars:2} → resultado: 5
    //   iteración 3: s=5,  l={stars:1} → resultado: 6
    //   earned = 6
    const earned = Object.values(progress[topicId]).reduce((s, l) => s + (l.stars ?? 0), 0);
    return { earned, total: levelCount * 3 };
  };

  // ── FUNCIÓN: CONTAR NIVELES COMPLETADOS ─────────────────────
  const obtenerProgresoTema = (topicId: string) => {

    // ── IF #2: ¿Hay progreso en este tema? ───────────────────
    if (!progress[topicId]) return 0;

    // .filter(condición) crea un NUEVO arreglo solo con los elementos que cumplen la condición.
    // .filter(l => l.completed) → solo los niveles donde completed es true
    //
    // Ejemplo:
    //   valores = [ {completed:true}, {completed:false}, {completed:true} ]
    //   .filter(l => l.completed) = [ {completed:true}, {completed:true} ]
    //   .length = 2  (dos niveles completados)
    return Object.values(progress[topicId]).filter(l => l.completed).length;
  };

  return (
    <div className="dash-backdrop">

      {/* ── Renderizar las 80 estrellas de fondo ── */}
      {/* .map() transforma cada objeto del arreglo BG_STARS en un elemento <div> de React */}
      {BG_STARS.map(s => (
        <div key={s.id} className="dash-star" style={{
          left:             `${s.x}%`,
          top:              `${s.y}%`,
          width:            s.size,
          height:           s.size,
          background:       s.color,
          boxShadow:        `0 0 ${s.size * 2}px ${s.color}`,
          animationDuration:`${s.dur}s`,
          animationDelay:   `${s.del}s`,
        }} />
      ))}

      <div className="dash-saturn">
        <div className="dash-saturn-body" />
        <div className="dash-saturn-ring" />
      </div>

      <div className="dash-content">
        <div className="dash-header">
          <div className="dash-header-top">
            <button className="dash-avatar-btn" onClick={onProfile} title="Ver perfil">
              <span className="dash-avatar">{userAvatar || '🚀'}</span>
              {/* || '🚀' → si userAvatar está vacío, muestra el cohete por defecto */}
            </button>
            <div>
              <h1 className="dash-welcome">¡Hola, {userName}!</h1>
              <p className="dash-grade">{userGrade} · Explorador del Universo</p>
            </div>
            <button className="dash-logout" onClick={onLogout} title="Cerrar sesión">↩</button>
          </div>
          <p className="dash-tagline">Elige tu misión matemática 🌌</p>
        </div>

        {/* ── Tarjetas de temas ── */}
        {/* topics ahora viene de MySQL (fetch en el useEffect de arriba) */}
        {/* .map() genera una tarjeta <button> por cada tema */}
        {temasPermitidos !== null && temasPermitidos.length === 0 && (
          <div className="dash-empty-class">
            <span style={{ fontSize: '2.4rem' }}>🛰️</span>
            <p>Tu maestro todavía no asignó temas a tu clase. ¡Vuelve pronto!</p>
          </div>
        )}

        <div className="dash-topics">
          {topics
            .filter(topic => temasPermitidos === null || temasPermitidos.includes(topic.id))
            .map((topic) => {
            // Si el maestro curó niveles específicos para este tema, usamos
            // ESE total; si no curó nada, usamos el total real del tema (8).
            const levelCountEfectivo = nivelesCuradosDe(topic.id) ?? topic.levelCount;

            // Para cada tema calculamos sus estadísticas
            const { earned, total } = obtenerEstrellas(topic.id, levelCountEfectivo);
            const completed = obtenerProgresoTema(topic.id);

            // Math.round() redondea al entero más cercano
            // (completed / levelCountEfectivo) * 100 da el porcentaje de progreso
            // Ejemplo: 3 completados de 8 niveles → (3/8)*100 = 37.5 → Math.round = 38%
            const pct = Math.round((completed / levelCountEfectivo) * 100);

            return (
              <button
                key={topic.id} // React necesita una "key" única por cada elemento del .map()
                className="dash-topic-card"
                onClick={() => onSelectTopic(topic)}
                style={{ '--tc': topic.color, '--tg': topic.gradient, '--ts': topic.shadow } as React.CSSProperties}
              >
                <div className="dtc-planet">{topic.planet}</div>
                <div className="dtc-body">
                  <h2 className="dtc-title">{topic.title}</h2>
                  <p className="dtc-desc">{topic.description}</p>
                  <div className="dtc-progress-row">
                    {/* La barra crece dinámicamente según el porcentaje calculado */}
                    <div className="dtc-pbar-track">
                      <div className="dtc-pbar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="dtc-pct">{completed}/{levelCountEfectivo} niveles</span>
                  </div>
                  <div className="dtc-stars-row">
                    {/* Math.floor → redondea hacia abajo (piso) */}
                    {/* Math.max(1, completed) → evita dividir entre 0 si no hay completados */}
                    {/* Math.min(3, ...) → nunca muestra más de 3 estrellas */}
                    <MostrarEstrellas stars={Math.min(3, Math.floor(earned / Math.max(1, completed)))} size="sm" />
                    <span className="dtc-star-count">⭐ {earned}/{total}</span>
                  </div>
                </div>
                <div className="dtc-arrow">›</div>
              </button>
            );
          })}
        </div>

        <div className="dash-footer">
          <p>🌟 ¡Cada nivel que completes te hace más sabio! 🌟</p>
        </div>
      </div>
    </div>
  );
}
