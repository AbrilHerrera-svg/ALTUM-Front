import { useState } from 'react';
import './LoginView.css';

const STAR_COLORS = ['#fbbf24', '#f472b6', '#22d3ee', '#fb923c', '#a3e635', '#ffffff', '#e879f9', '#34d399'];

interface StarDatum {
  id: number; x: number; y: number; size: number;
  color: string; duration: number; delay: number;
}

const STAR_DATA: StarDatum[] = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  x: (i * 37.7 + 13.3) % 100,
  y: (i * 61.3 + 7.7) % 100,
  size: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
  color: STAR_COLORS[i % STAR_COLORS.length],
  duration: 1.5 + (i % 5) * 0.7,
  delay: (i % 7) * 0.5,
}));

const GRADES = ['4° de Primaria', '5° de Primaria', '6° de Primaria'];

type Mode = 'login' | 'register' | 'forgot';

interface Props {
  onLogin: (name: string, grade: string, email: string, avatar: string) => void;
}

// elimine los arreglos 
export default function VistaLogin({ onLogin }: Props) {
  const [mode, setMode] = useState<Mode>('login');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw, setShowLoginPw] = useState(false);

  const [regName, setRegName] = useState('');
  const [regGrade, setRegGrade] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [showRegPw, setShowRegPw] = useState(false);

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const cambiarModo = (m: Mode) => {
    setMode(m); setError(''); setSuccess(''); setForgotSent(false);
  };

  const IniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) { setError('Por favor completa todos los campos.'); return; }
    
    // --- CAMBIO DE ARREGLO A BASE DE DATOS ---
    try {
      const respuesta = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: loginEmail.toLowerCase(),
          contraseña: loginPassword
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || 'Correo o contraseña incorrectos. Intenta de nuevo.');
        return;
      }

      onLogin(datos.usuario.nombre, datos.usuario.grado || '4° de Primaria', datos.usuario.correo, '👨‍🚀');
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor.');
    }

  };

  const Registrarse = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!regName || !regGrade || !regEmail || !regPassword || !regConfirm) {
      setError('Por favor completa todos los campos.'); return;
    }
    if (regPassword.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (regPassword !== regConfirm) { setError('Las contraseñas no coinciden.'); return; }
    
   
    try {
      const [nombre, ...restoApellidos] = regName.trim().split(' ');
      const apellidos = restoApellidos.join(' ') || 'No especificado';

      const respuesta = await fetch('http://localhost:3000/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          apellidos,
          correo: regEmail.toLowerCase(),
          contraseña: regPassword,
          grado: regGrade,
          id_rol: 3
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.error || 'No se pudo registrar el usuario.');
        return;
      }

      setSuccess('¡Registro exitoso! Redirigiendo al inicio de sesión...');
      setTimeout(() => { setLoginEmail(regEmail.toLowerCase()); cambiarModo('login'); }, 1400);
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor.');
    }
   
  };

  const RecuperarContrasena = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!forgotEmail) { setError('Ingresa tu correo electrónico.'); return; }
    setForgotSent(true);
  };

  // telimna base datos

  return (
    <div className="space-backdrop">
      {STAR_DATA.map(s => (
        <div key={s.id} className="star" style={{
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          background: s.color,
          boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
          animationDuration: `${s.duration}s`,
          animationDelay: `${s.delay}s`,
        }} />
      ))}

      <div className="shooting-star" />
      <div className="shooting-star s2" />

      <div className="deco-saturn">
        <div className="saturn-body" />
        <div className="saturn-ring" />
      </div>

      <div className="deco-moon">
        <div className="crater" style={{ top: '22%', left: '18%', width: 13, height: 13 }} />
        <div className="crater" style={{ top: '48%', left: '52%', width: 19, height: 19 }} />
        <div className="crater" style={{ top: '68%', left: '22%', width: 9,  height: 9  }} />
        <div className="crater" style={{ top: '30%', left: '65%', width: 11, height: 11 }} />
      </div>

      <div className="deco-alien">
        <svg viewBox="0 0 70 100" width="100" height="143" xmlns="http://www.w3.org/2000/svg">
          <line x1="22" y1="8"  x2="10" y2="-6" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="9"  cy="-8" r="5" fill="#f0abfc"/>
          <line x1="48" y1="8"  x2="60" y2="-6" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="61" cy="-8" r="5" fill="#f0abfc"/>
          <ellipse cx="35" cy="32" rx="26" ry="30" fill="#4ade80"/>
          <ellipse cx="22" cy="26" rx="10" ry="13" fill="#0d1a0d"/>
          <ellipse cx="48" cy="26" rx="10" ry="13" fill="#0d1a0d"/>
          <circle cx="23" cy="23" r="4" fill="white" opacity="0.9"/>
          <circle cx="49" cy="23" r="4" fill="white" opacity="0.9"/>
          <circle cx="25" cy="25" r="2" fill="#a0f0c0"/>
          <circle cx="51" cy="25" r="2" fill="#a0f0c0"/>
          <path d="M 22 44 Q 35 54 48 44" stroke="#0d1a0d" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <ellipse cx="35" cy="72" rx="17" ry="22" fill="#4ade80"/>
          <line x1="18" y1="65" x2="5"  y2="78" stroke="#4ade80" strokeWidth="6" strokeLinecap="round"/>
          <line x1="52" y1="65" x2="65" y2="78" stroke="#4ade80" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="space-card">
        <h1 className="space-title">ALTUM</h1>
        <p className="space-tagline">Explora el universo matemático</p>

        {mode !== 'forgot' && (
          <div className="space-tabs">
            <button className={`space-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => cambiarModo('login')}>
              Iniciar sesión
            </button>
            <button className={`space-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => cambiarModo('register')}>
              Registrarse
            </button>
          </div>
        )}

        {error   && <div className="space-alert error">{error}</div>}
        {success && <div className="space-alert success">{success}</div>}

        {mode === 'login' && (
          <form onSubmit={IniciarSesion} className="space-form">
            <div className="space-field">
              <label>Correo electrónico</label>
              <input type="email" className="space-input" placeholder="explorador@cosmos.com"
                value={loginEmail} onChange={e => setLoginEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="space-field">
              <label>Contraseña</label>
              <div className="input-wrap">
                <input type={showLoginPw ? 'text' : 'password'} className="space-input" placeholder="••••••••"
                  value={loginPassword} onChange={e => setLoginPassword(e.target.value)} autoComplete="current-password" />
                <button type="button" className="toggle-pw" onClick={() => setShowLoginPw(p => !p)}>
                  {showLoginPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" className="space-btn primary">Despegar 🚀</button>
            <button type="button" className="space-link" onClick={() => cambiarModo('forgot')}>
              ¿Olvidaste tu contraseña?
            </button>
          </form>
        )}

        {mode === 'register' && (
          <form onSubmit={Registrarse} className="space-form">
            <div className="space-field">
              <label>Nombre completo</label>
              <input type="text" className="space-input" placeholder="Tu nombre de explorador"
                value={regName} onChange={e => setRegName(e.target.value)} maxLength={40} autoComplete="name" />
            </div>
            <div className="space-field">
              <label>Grado escolar</label>
              <select className="space-input space-select" value={regGrade} onChange={e => setRegGrade(e.target.value)}>
                <option value="">Selecciona tu grado</option>
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="space-field">
              <label>Correo electrónico</label>
              <input type="email" className="space-input" placeholder="explorador@cosmos.com"
                value={regEmail} onChange={e => setRegEmail(e.target.value)} autoComplete="email" />
            </div>
            <div className="space-field">
              <label>Contraseña</label>
              <div className="input-wrap">
                <input type={showRegPw ? 'text' : 'password'} className="space-input" placeholder="Mínimo 6 caracteres"
                  value={regPassword} onChange={e => setRegPassword(e.target.value)} autoComplete="new-password" />
                <button type="button" className="toggle-pw" onClick={() => setShowRegPw(p => !p)}>
                  {showRegPw ? '🙈' : '👁️'}
                </button>
              </div>
              {regPassword.length > 0 && (
                <div className="pw-strength">
                  <div className="pw-bar" style={{
                    width: `${Math.min(100, (regPassword.length / 10) * 100)}%`,
                    background: regPassword.length < 6 ? '#ef4444' : regPassword.length < 9 ? '#f59e0b' : '#10b981',
                  }} />
                </div>
              )}
            </div>
            <div className="space-field">
              <label>Confirmar contraseña</label>
              <input type="password" className="space-input" placeholder="Repite tu contraseña"
                value={regConfirm} onChange={e => setRegConfirm(e.target.value)} autoComplete="new-password" />
            </div>
            <button type="submit" className="space-btn primary">Comenzar misión 🛸</button>
          </form>
        )}

        {mode === 'forgot' && (
          <div className="forgot-wrapper">
            <h2 className="space-subtitle">Recuperar contraseña</h2>
            {!forgotSent ? (
              <form onSubmit={RecuperarContrasena} className="space-form">
                <p className="forgot-desc">
                  Ingresa tu correo y te enviaremos las instrucciones para recuperar tu contraseña.
                </p>
                <div className="space-field">
                  <label>Correo electrónico</label>
                  <input type="email" className="space-input" placeholder="explorador@cosmos.com"
                    value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} autoComplete="email" />
                </div>
                <button type="submit" className="space-btn primary">Enviar instrucciones 📡</button>
              </form>
            ) : (
              <div className="forgot-success">
                <div className="forgot-icon">📡</div>
                <p>¡Señal enviada! Revisa tu correo <strong>{forgotEmail}</strong> para recuperar tu contraseña.</p>
              </div>
            )}
            <button type="button" className="space-link mt" onClick={() => cambiarModo('login')}>
              ← Volver al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
