import React, { useState } from 'react';
import '../App.css';

export default function LoginView({ onLogin }) {
  // AVANCE: Se puede cargar un nickname guardado previamente en localStorage
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // AVANCE: Aquí se conectaría con una API para registrar o autenticar al niño en la base de datos
    // Si no introduce nombre, usamos un valor por defecto simpático
    onLogin(name.trim() || 'Aventurero');
  };

  return (
    <div className="play-card login-container">
      {/* Mascota Interactiva en SVG (Un robot matemático amigable) */}
      <div className="mascot-container">
        <svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Sombras */}
          <ellipse cx="80" cy="145" rx="45" ry="10" fill="#e2e8f0" />
          
          {/* Cuerpo principal */}
          <rect x="35" y="45" width="90" height="85" rx="25" fill="#2b9eed" stroke="#1b6cb0" strokeWidth="4" />
          
          {/* Pantalla de la cara */}
          <rect x="47" y="57" width="66" height="48" rx="12" fill="#1e293b" />
          
          {/* Ojos brillantes */}
          <circle cx="65" cy="77" r="10" fill="#10b981" />
          <circle cx="65" cy="77" r="4" fill="#ffffff" />
          
          <circle cx="95" cy="77" r="10" fill="#10b981" />
          <circle cx="95" cy="77" r="4" fill="#ffffff" />
          
          {/* Boca sonriente */}
          <path d="M 68 92 Q 80 102 92 92" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          
          {/* Antena con signo de suma (+) */}
          <line x1="80" y1="45" x2="80" y2="20" stroke="#1b6cb0" strokeWidth="5" strokeLinecap="round" />
          <circle cx="80" cy="18" r="8" fill="#a855f7" stroke="#7e22ce" strokeWidth="3" />
          {/* Signo + dentro del circulo */}
          <line x1="77" y1="18" x2="83" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="80" y1="15" x2="80" y2="21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          
          {/* Manos / Brazos de resorte */}
          <path d="M 35 85 Q 15 90 25 105" fill="none" stroke="#1b6cb0" strokeWidth="4" strokeLinecap="round" />
          <path d="M 125 85 Q 145 90 135 105" fill="none" stroke="#1b6cb0" strokeWidth="4" strokeLinecap="round" />
          <circle cx="25" cy="105" r="7" fill="#f59e0b" />
          <circle cx="135" cy="105" r="7" fill="#f59e0b" />
        </svg>
      </div>

      <h1 className="app-title">ALTUM</h1>
      <p className="app-subtitle">¡Tu aventura matemática favorita! 🧠✨</p>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div className="playful-input-group">
          <label className="playful-label" htmlFor="nickname">
            ¿Cómo te llamas?
          </label>
          <input
            id="nickname"
            type="text"
            className="playful-input"
            placeholder="Escribe tu nombre aquí..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={15}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn-3d btn-success">
          ¡Empezar Aventura! 🚀
        </button>
      </form>
    </div>
  );
}
