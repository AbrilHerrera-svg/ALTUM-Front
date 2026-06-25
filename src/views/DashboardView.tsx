import React from 'react';
import MostrarEstrellas from '../components/StarDisplay';
import { TOPICS } from '../data/topics';
import type { Progress } from '../types';
import './DashboardView.css';

interface StarDatum {
  id: number; x: number; y: number; size: number;
  color: string; dur: number; del: number;
}

const BG_STARS: StarDatum[] = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: (i * 37.7 + 13) % 100,
  y: (i * 61.3 + 7) % 100,
  size: i % 3 === 0 ? 3 : 2,
  color: ['#fbbf24','#f472b6','#22d3ee','#a3e635','#ffffff'][i % 5],
  dur: 1.5 + (i % 5) * 0.6,
  del: (i % 7) * 0.4,
}));

interface Props {
  userName: string;
  userGrade: string;
  userAvatar: string;
  progress: Progress;
  onSelectTopic: (topic: (typeof TOPICS)[number]) => void;
  onProfile: () => void;
  onLogout: () => void;
}

export default function VistaPrincipal({ userName, userGrade, userAvatar, progress, onSelectTopic, onProfile, onLogout }: Props) {
  const obtenerEstrellas = (topicId: string, levelCount: number) => {
    if (!progress[topicId]) return { earned: 0, total: levelCount * 3 };
    const earned = Object.values(progress[topicId]).reduce((s, l) => s + (l.stars ?? 0), 0);
    return { earned, total: levelCount * 3 };
  };

  const obtenerProgresoTema = (topicId: string) => {
    if (!progress[topicId]) return 0;
    return Object.values(progress[topicId]).filter(l => l.completed).length;
  };

  return (
    <div className="dash-backdrop">
      {BG_STARS.map(s => (
        <div key={s.id} className="dash-star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          background: s.color,
          boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
          animationDuration: `${s.dur}s`,
          animationDelay: `${s.del}s`,
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
            </button>
            <div>
              <h1 className="dash-welcome">¡Hola, {userName}!</h1>
              <p className="dash-grade">{userGrade} · Explorador del Universo</p>
            </div>
            <button className="dash-logout" onClick={onLogout} title="Cerrar sesión">↩</button>
          </div>
          <p className="dash-tagline">Elige tu misión matemática 🌌</p>
        </div>

        <div className="dash-topics">
          {TOPICS.map((topic) => {
            const { earned, total } = obtenerEstrellas(topic.id, topic.levelCount);
            const completed = obtenerProgresoTema(topic.id);
            const pct = Math.round((completed / topic.levelCount) * 100);

            return (
              <button
                key={topic.id}
                className="dash-topic-card"
                onClick={() => onSelectTopic(topic)}
                style={{ '--tc': topic.color, '--tg': topic.gradient, '--ts': topic.shadow } as React.CSSProperties}
              >
                <div className="dtc-planet">{topic.planet}</div>
                <div className="dtc-body">
                  <h2 className="dtc-title">{topic.title}</h2>
                  <p className="dtc-desc">{topic.description}</p>
                  <div className="dtc-progress-row">
                    <div className="dtc-pbar-track">
                      <div className="dtc-pbar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="dtc-pct">{completed}/{topic.levelCount} niveles</span>
                  </div>
                  <div className="dtc-stars-row">
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
