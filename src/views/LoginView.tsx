// ============================================================
// LoginView.tsx — PANTALLA DE INICIO DE SESIÓN Y REGISTRO
// Es la primera pantalla que ve el usuario al abrir la app.
// Tiene 3 modos que se alternan sin cambiar de pantalla:
//   'login'   → formulario de correo y contraseña
//   'register'→ formulario completo para crear cuenta nueva
//   'forgot'  → formulario para recuperar contraseña
// ============================================================

import { useState } from 'react';
import SpaceBackdrop from '../components/SpaceBackdrop'; // fondo animado del espacio
import SpacePlanets  from '../components/SpacePlanets';  // planetas decorativos
import './LoginView.css';

// Opciones del selector de grado escolar
const GRADES = ['4° de Primaria', '5° de Primaria', '6° de Primaria'];

// Tipo que define los 3 modos posibles de esta pantalla
type Mode = 'login' | 'register' | 'forgot';

// Props: lo que el componente padre (App.tsx) le pasa a este componente.
// onLogin es una función que se ejecuta cuando el usuario inicia sesión correctamente.
interface Props {
  onLogin: (name: string, grade: string, email: string, avatar: string) => void;
}

export default function VistaLogin({ onLogin }: Props) {

  // ── ESTADO DEL MODO ─────────────────────────────────────────
  const [mode, setMode] = useState<Mode>('login'); // empieza mostrando el formulario de login

  // ── ESTADOS DEL FORMULARIO DE LOGIN ─────────────────────────
  const [loginEmail,    setLoginEmail]    = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPw,   setShowLoginPw]   = useState(false); // controla si la contraseña es visible

  // ── ESTADOS DEL FORMULARIO DE REGISTRO ──────────────────────
  const [regName,     setRegName]     = useState('');
  const [regGrade,    setRegGrade]    = useState('');
  const [regEmail,    setRegEmail]    = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm,  setRegConfirm]  = useState('');
  const [showRegPw,   setShowRegPw]   = useState(false);

  // ── ESTADOS DEL FORMULARIO DE RECUPERAR CONTRASEÑA ──────────
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent,  setForgotSent]  = useState(false); // true cuando "se envió" el correo

  // ── MENSAJES DE ERROR Y ÉXITO ────────────────────────────────
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');

  // ── ÍCONO DEL OJO ───────────────────────────────────────────
  // Componente inline que dibuja un SVG del ojo (abierto o cerrado)
  // según si la contraseña es visible o no
  const IconoOjo = ({ visible }: { visible: boolean }) => visible ? (
    // Ojo tachado (contraseña visible → clic para ocultar)
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    // Ojo abierto (contraseña oculta → clic para mostrar)
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  // Limpia errores y mensajes al cambiar de modo
  const cambiarModo = (m: Mode) => {
    setMode(m); setError(''); setSuccess(''); setForgotSent(false);
  };

  // ── FUNCIÓN: INICIAR SESIÓN ──────────────────────────────────
  // e.preventDefault() evita que el formulario recargue la página (comportamiento por defecto de HTML)
  const IniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginEmail || !loginPassword) { setError('Por favor completa todos los campos.'); return; }

    try {
      // Consultamos al backend la lista de todos los usuarios registrados
      const respuesta      = await fetch('http://localhost:3000/api/usuarios');
      const usuariosServer = await respuesta.json();

      // Buscamos si existe un usuario con ese correo
      // .toLowerCase() para no distinguir entre mayúsculas y minúsculas
      const usuario = usuariosServer.find((u: any) => u.correo === loginEmail.toLowerCase());

      if (!usuario) {
        setError('Correo o contraseña incorrectos. Intenta de nuevo.');
        return;
      }

      // Si encontramos el usuario, notificamos al App.tsx con sus datos
      onLogin(usuario.nombre, usuario.grado, usuario.correo, usuario.avatar || '👨‍🚀');
    } catch (err) {
      setError('Error de red al conectar con el servidor.');
    }
  };

  // ── FUNCIÓN: REGISTRARSE ─────────────────────────────────────
  const Registrarse = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones del formulario antes de mandar al backend
    if (!regName || !regGrade || !regEmail || !regPassword || !regConfirm) {
      setError('Por favor completa todos los campos.'); return;
    }
    if (regPassword.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (regPassword !== regConfirm) { setError('Las contraseñas no coinciden.'); return; }

    try {
      // 1. Verificamos primero si el correo ya está registrado
      const respuestaGet   = await fetch('http://localhost:3000/api/usuarios');
      const usuariosServer = await respuestaGet.json();

      if (usuariosServer.find((u: any) => u.correo === regEmail.toLowerCase())) {
        setError('Ya existe una cuenta con ese correo.'); return;
      }

      // 2. Si el correo está libre, mandamos el POST para registrar al nuevo usuario
      const respuestaPost = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:     regName.trim(),
          grado:      regGrade,
          correo:     regEmail.toLowerCase(),
          contraseña: regPassword,
          avatar:     '👨‍🚀'
        })
      });

      const datos = await respuestaPost.json();

      if (respuestaPost.ok) {
        setSuccess('¡Registro exitoso! Redirigiendo...');
        // Después de 1.4 segundos, llevamos al usuario al login con su correo ya puesto
        setTimeout(() => {
          setLoginEmail(regEmail.toLowerCase());
          cambiarModo('login');
        }, 1400);
      } else {
        setError(datos.error || 'Error al registrar el usuario.');
      }
    } catch (err) {
      setError('Error de red. No se pudo guardar el usuario en el BackEnd.');
    }
  };

  // ── FUNCIÓN: RECUPERAR CONTRASEÑA ────────────────────────────
  // Solo muestra un mensaje de confirmación visual — no envía correo real
  const RecuperarContrasena = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!forgotEmail) { setError('Ingresa tu correo electrónico.'); return; }
    setForgotSent(true); // activa el mensaje de "señal enviada"
  };

  // ── RENDERIZADO ──────────────────────────────────────────────
  return (
    <SpaceBackdrop className="space-backdrop-layout">
      <SpacePlanets show={['saturn', 'moon']} />

      {/* Alienígena decorativo dibujado con SVG puro (sin imágenes externas) */}
      <div className="deco-alien">
        <svg viewBox="0 0 70 100" width="100" height="143" xmlns="http://www.w3.org/2000/svg">
          {/* Antenas */}
          <line x1="22" y1="8"  x2="10" y2="-6" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="9"  cy="-8" r="5" fill="#f0abfc"/>
          <line x1="48" y1="8"  x2="60" y2="-6" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="61" cy="-8" r="5" fill="#f0abfc"/>
          {/* Cabeza */}
          <ellipse cx="35" cy="32" rx="26" ry="30" fill="#4ade80"/>
          {/* Ojos */}
          <ellipse cx="22" cy="26" rx="10" ry="13" fill="#0d1a0d"/>
          <ellipse cx="48" cy="26" rx="10" ry="13" fill="#0d1a0d"/>
          <circle cx="23" cy="23" r="4" fill="white" opacity="0.9"/>
          <circle cx="49" cy="23" r="4" fill="white" opacity="0.9"/>
          <circle cx="25" cy="25" r="2" fill="#a0f0c0"/>
          <circle cx="51" cy="25" r="2" fill="#a0f0c0"/>
          {/* Sonrisa */}
          <path d="M 22 44 Q 35 54 48 44" stroke="#0d1a0d" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Cuerpo y brazos */}
          <ellipse cx="35" cy="72" rx="17" ry="22" fill="#4ade80"/>
          <line x1="18" y1="65" x2="5"  y2="78" stroke="#4ade80" strokeWidth="6" strokeLinecap="round"/>
          <line x1="52" y1="65" x2="65" y2="78" stroke="#4ade80" strokeWidth="6" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Tarjeta principal del formulario */}
      <div className="space-card">
        <h1 className="space-title">ALTUM</h1>
        <p className="space-tagline">Explora el universo matemático</p>

        {/* Tabs de login/registro — se ocultan en modo "forgot" */}
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

        {/* Mensajes de error o éxito — solo se muestran si tienen contenido */}
        {error   && <div className="space-alert error">{error}</div>}
        {success && <div className="space-alert success">{success}</div>}

        {/* ── FORMULARIO DE LOGIN ── */}
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
                {/* El tipo cambia entre 'text' y 'password' según showLoginPw */}
                <input type={showLoginPw ? 'text' : 'password'} className="space-input" placeholder="••••••••"
                  value={loginPassword} onChange={e => setLoginPassword(e.target.value)} autoComplete="current-password" />
                {/* Botón del ojo: p => !p invierte el valor booleano actual */}
                <button type="button" className="toggle-pw" onClick={() => setShowLoginPw(p => !p)}>
                  <IconoOjo visible={showLoginPw} />
                </button>
              </div>
            </div>
            <button type="submit" className="space-btn primary">Despegar 🚀</button>
            <button type="button" className="space-link" onClick={() => cambiarModo('forgot')}>
              ¿Olvidaste tu contraseña?
            </button>
          </form>
        )}

        {/* ── FORMULARIO DE REGISTRO ── */}
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
                {/* .map() genera una opción por cada grado del array GRADES */}
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
                  <IconoOjo visible={showRegPw} />
                </button>
              </div>
              {/* Barra de fuerza de contraseña — solo aparece si hay algo escrito */}
              {regPassword.length > 0 && (
                <div className="pw-strength">
                  <div className="pw-bar" style={{
                    // El ancho crece conforme aumentan los caracteres (máximo 100%)
                    width: `${Math.min(100, (regPassword.length / 10) * 100)}%`,
                    // El color cambia según la longitud: rojo < 6, amarillo < 9, verde >= 9
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

        {/* ── FORMULARIO DE RECUPERAR CONTRASEÑA ── */}
        {mode === 'forgot' && (
          <div className="forgot-wrapper">
            <h2 className="space-subtitle">Recuperar contraseña</h2>
            {/* Muestra el formulario O el mensaje de confirmación según forgotSent */}
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
              // Mensaje visual de confirmación (no envía correo real)
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
    </SpaceBackdrop>
  );
}
