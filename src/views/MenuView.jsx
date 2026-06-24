import React from 'react';
import '../App.css';

export default function MenuView({ userName, userGrade, onSelectLevel, onBack }) {
  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1 className="menu-title">¡Hola, {userName}! 👋</h1>
        <p className="menu-subtitle">
          {userGrade ? `${userGrade} • ` : ''}¿Listo para el reto del día? Elige tu nivel:
        </p>
      </div>

      {/* AVANCE: Se pueden renderizar dinámicamente los niveles haciendo un fetch desde la base de datos */}
      <div className="levels-grid">
        {/* Nivel Fácil */}
        <div 
          className="level-card easy"
          onClick={() => onSelectLevel('easy')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectLevel('easy')}
        >
          <div>
            <span className="level-badge">Nivel 1</span>
            <h2 className="level-card-title">Fácil 🟢</h2>
            <p className="level-card-desc">
              Practica sumas y restas divertidas con dibujos y números pequeños. ¡Ideal para calentar motores!
            </p>
          </div>
          <div style={{ marginTop: '20px', width: '100%' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--success)' }}>
              ¡Jugar Sumas y Restas! ➔
            </span>
          </div>
        </div>

        {/* AVANCE: Se puede deshabilitar esta tarjeta (bloqueada) si el niño no ha superado el nivel anterior en la base de datos */}
        {/* Nivel Difícil */}
        <div 
          className="level-card hard"
          onClick={() => onSelectLevel('hard')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectLevel('hard')}
        >
          <div>
            <span className="level-badge">Nivel 2</span>
            <h2 className="level-card-title">Difícil 🔥</h2>
            <p className="level-card-desc">
              Acepta el desafío con multiplicaciones, divisiones y acertijos matemáticos un poco más grandes.
            </p>
          </div>
          <div style={{ marginTop: '20px', width: '100%' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--purple)' }}>
              ¡Jugar Multiplicaciones! ➔
            </span>
          </div>
        </div>
      </div>

      <button 
        type="button" 
        className="btn-3d btn-secondary" 
        onClick={onBack}
        style={{ maxWidth: '200px', margin: '0 auto', display: 'block' }}
      >
        ◀ Salir
      </button>
    </div>
  );
}
