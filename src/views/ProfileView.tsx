// ============================================================
// ProfileView.tsx — PANTALLA DE PERFIL
// Permite al alumno ver sus estadísticas y editar su información.
// Tiene dos pestañas (tabs):
//   'profile'  → cambiar nombre, grado y avatar
//   'password' → cambiar contraseña
//
// También tiene una sección de "zona de peligro" con:
//   - Botón para borrar todo el progreso (con confirmación)
//   - Botón para cerrar sesión
// ============================================================

import { useState }         from 'react';
import { TOPICS }           from '../data/topics';
import { CHARACTERS, SHOP_ITEMS, obtenerRango } from '../data/shop';
import type { Progress, User, ShopData } from '../types';
import './ProfileView.css';

// Opciones del selector de grado
const GRADES = ['4° de Primaria', '5° de Primaria', '6° de Primaria'];

// Funciones auxiliares para leer/guardar usuarios en localStorage
// localStorage guarda datos en el navegador aunque se recargue la página
function obtenerUsuarios(): User[] {
  try { return JSON.parse(localStorage.getItem('altum_users') || '[]') as User[]; } catch { return []; }
}
function guardarUsuarios(users: User[]): void {
  localStorage.setItem('altum_users', JSON.stringify(users));
}

// Calcula las estadísticas totales del alumno recorriendo todo su progreso
function obtenerEstadisticas(progress: Progress) {
  let stars = 0, levels = 0;
  TOPICS.forEach(t => {
    if (!progress[t.id]) return; // si no hay progreso en ese tema, lo salta
    Object.values(progress[t.id]).forEach(l => {
      if (l.completed) {
        levels++;              // cuenta el nivel como completado
        stars += l.stars ?? 0; // suma las estrellas (si es undefined, suma 0)
      }
    });
  });
  return { stars, levels };
}

// Tipo que define los datos que onUpdate espera
interface ProfileUpdate { name: string; grade: string; avatar: string; }

// Props que recibe de App.tsx
interface Props {
  userName:        string;
  userGrade:       string;
  userEmail:       string;
  userAvatar:      string;
  progress:        Progress;
  shopData:        ShopData;                      // accesorios comprados/puestos
  onBack:          () => void;                    // volver al dashboard
  onUpdate:        (u: ProfileUpdate) => void;    // guardar cambios en App.tsx y backend
  onLogout:        () => void;                    // cerrar sesión / eliminar cuenta
  onResetProgress: () => void;                    // borrar el progreso localmente
  onGoShop:        () => void;                    // ir a la pantalla de la tienda
}

// Los dos modos de la pantalla
type Tab = 'profile' | 'password';

export default function VistaPerfil({ userName, userGrade, userEmail, userAvatar, progress, shopData, onBack, onUpdate, onLogout, onResetProgress, onGoShop }: Props) {

  // ── ESTADO DE PESTAÑAS ───────────────────────────────────────
  const [tab, setTab] = useState<Tab>('profile'); // empieza en la pestaña de perfil

  // ── ESTADOS DEL FORMULARIO DE PERFIL ────────────────────────
  // Se inicializan con los valores actuales del usuario
  const [name,       setName]       = useState(userName);
  const [grade,      setGrade]      = useState(userGrade);
  const [avatar,     setAvatar]     = useState(userAvatar || '👨‍🚀');
  const [profileMsg, setProfileMsg] = useState(''); // mensaje de éxito/error al guardar

  // ── ESTADOS DEL FORMULARIO DE CONTRASEÑA ────────────────────
  const [currentPw, setCurrentPw] = useState('');
  const [newPw,     setNewPw]     = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  // El mensaje de contraseña tiene texto y un flag de si es ok o error
  const [pwMsg, setPwMsg] = useState<{ text: string; ok: boolean }>({ text: '', ok: false });

  // ── ESTADO DE CONFIRMACIÓN DE BORRADO ───────────────────────
  // Cuando es true, muestra el mensaje "¿Estás seguro?" antes de borrar
  const [confirmReset, setConfirmReset] = useState(false);

  // ── ESTADO DEL PORTAL DE CONSULTA ───────────────────────────
  // Un pequeño panel de ayuda que se muestra/oculta con un botón
  const [showHelp, setShowHelp] = useState(false);

  // Calculamos las estadísticas una sola vez al renderizar
  const stats = obtenerEstadisticas(progress);
  const rango = obtenerRango(stats.stars); // título según las estrellas acumuladas

  // Accesorio que el alumno tiene puesto actualmente (o undefined si ninguno)
  const accesorioPuesto = SHOP_ITEMS.find(i => i.id === shopData.equipped);

  // ── FUNCIÓN: ELEGIR PERSONAJE BASE ───────────────────────────
  // Al elegir astronauta/alíen, se actualiza el avatar de inmediato (igual que Guardar)
  const alElegirPersonaje = (emoji: string) => {
    setAvatar(emoji);
    onUpdate({ name: name.trim() || userName, grade, avatar: emoji });
  };

  // ── FUNCIÓN: GUARDAR PERFIL ──────────────────────────────────
  const alGuardarPerfil = () => {
    if (!name.trim()) { setProfileMsg('El nombre no puede estar vacío.'); return; }

    // Actualiza también en localStorage para consistencia local
    const users = obtenerUsuarios();
    const idx   = users.findIndex(u => u.email === userEmail);
    if (idx !== -1) {
      users[idx].name   = name.trim();
      users[idx].grade  = grade;
      users[idx].avatar = avatar;
      guardarUsuarios(users);
    }

    // Notifica a App.tsx para que haga el PUT al backend
    onUpdate({ name: name.trim(), grade, avatar });
    setProfileMsg('✅ ¡Perfil actualizado!');
    // Borra el mensaje después de 2.5 segundos
    setTimeout(() => setProfileMsg(''), 2500);
  };

  // ── FUNCIÓN: CAMBIAR CONTRASEÑA ──────────────────────────────
  const alCambiarContrasena = () => {
    setPwMsg({ text: '', ok: false });

    // Verifica la contraseña actual contra localStorage
    const users = obtenerUsuarios();
    const user  = users.find(u => u.email === userEmail);
    if (!user || user.password !== currentPw) {
      setPwMsg({ text: 'La contraseña actual es incorrecta.', ok: false }); return;
    }
    if (newPw.length < 6) {
      setPwMsg({ text: 'La nueva contraseña debe tener al menos 6 caracteres.', ok: false }); return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ text: 'Las contraseñas nuevas no coinciden.', ok: false }); return;
    }

    // Guarda la nueva contraseña en localStorage
    const idx = users.findIndex(u => u.email === userEmail);
    users[idx].password = newPw;
    guardarUsuarios(users);

    // Limpia los campos y muestra mensaje de éxito
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setPwMsg({ text: '✅ ¡Contraseña actualizada!', ok: true });
    setTimeout(() => setPwMsg({ text: '', ok: false }), 2500);
  };

  return (
    <div className="pv-backdrop">

      {/* ── Encabezado con botón de regreso ── */}
      <div className="pv-header">
        <button className="pv-back" onClick={onBack}>←</button>
        <span className="pv-header-title">Mi Perfil</span>
        <div style={{ width: 40 }} /> {/* Espacio vacío para centrar el título */}
      </div>

      <div className="pv-content">

        {/* ── Panel superior: tarjeta de identidad + selección/tienda ── */}
        <div className="pv-top-grid">

          {/* ── Columna izquierda: avatar, nombre, rango, estrellas ── */}
          <div className="pv-id-card">
            <div className="pv-avatar-circle">
              <span>{avatar}</span>
              {/* Insignia del accesorio puesto, si tiene uno */}
              {accesorioPuesto && <span className="pv-avatar-badge">{accesorioPuesto.emoji}</span>}
            </div>
            <div className="pv-id-name">( {userName || 'Usuario explorador'} )</div>
            <div className="pv-id-email">( {userEmail || 'correo'} )</div>
            <div className="pv-id-rank">{rango} ☀️</div>
            <div className="pv-id-divider" />
            <div className="pv-id-stars">
              <span className="pv-id-stars-num">{String(stats.stars).padStart(2, '0')}</span>
              <span className="pv-id-stars-label">⭐ Estrellas Obtenidas</span>
            </div>
          </div>

          {/* ── Columna derecha: elegir personaje + accesorios comprados ── */}
          <div className="pv-side-col">
            <div className="pv-panel">
              <p className="pv-panel-title">🛸 Selecciona tu personaje</p>
              <div className="pv-char-row">
                {CHARACTERS.map(c => (
                  <button
                    key={c.id}
                    className={`pv-char-card ${avatar === c.emoji ? 'selected' : ''}`}
                    onClick={() => alElegirPersonaje(c.emoji)}
                  >
                    <span className="pv-char-emoji">{c.emoji}</span>
                    <span className="pv-char-label">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pv-panel">
              <p className="pv-panel-title">👕 Tus accesorios comprados</p>
              {shopData.ownedItems.length === 0 ? (
                <p className="pv-empty-msg">Aún no has comprado accesorios. ¡Visita la tienda!</p>
              ) : (
                <div className="pv-items-row">
                  {shopData.ownedItems.map(id => {
                    const item = SHOP_ITEMS.find(i => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="pv-item-card">
                        <span className="pv-item-emoji">{item.emoji}</span>
                        <span className="pv-item-name">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Botones principales ── */}
        <div className="pv-actions-row">
          <button className="pv-action-btn" onClick={onGoShop}>🛍️ Visitar la Tienda</button>
          <button className="pv-action-btn" onClick={() => setShowHelp(h => !h)}>📖 Portal de Consulta</button>
        </div>

        {/* ── Portal de consulta: panel de ayuda rápida ── */}
        {showHelp && (
          <div className="pv-card">
            <p className="pv-section-label">Preguntas frecuentes</p>
            <p className="pv-help-text">⭐ Ganas estrellas al completar niveles con buenas respuestas.</p>
            <p className="pv-help-text">🛍️ Usa tus estrellas en la Tienda para comprar accesorios.</p>
            <p className="pv-help-text">🛸 Elige tu personaje base gratis cuando quieras.</p>
          </div>
        )}

        {/* ── Pestañas: Editar perfil / Contraseña ── */}
        <div className="pv-tabs">
          <button className={`pv-tab ${tab === 'profile'  ? 'active' : ''}`} onClick={() => setTab('profile')}>
            ✏️ Editar perfil
          </button>
          <button className={`pv-tab ${tab === 'password' ? 'active' : ''}`} onClick={() => setTab('password')}>
            🔐 Contraseña
          </button>
        </div>

        {/* ── PESTAÑA: EDITAR PERFIL ── */}
        {/* El avatar ahora se elige arriba, en "Selecciona tu personaje" */}
        {tab === 'profile' && (
          <div className="pv-card">
            <p className="pv-section-label">Nombre</p>
            <input className="pv-input" value={name} onChange={e => setName(e.target.value)} maxLength={30} placeholder="Tu nombre" />

            <p className="pv-section-label">Grado</p>
            {/* Botones de grado — el seleccionado tiene clase 'selected' */}
            <div className="pv-grade-opts">
              {GRADES.map(g => (
                <button key={g} className={`pv-grade-btn ${grade === g ? 'selected' : ''}`} onClick={() => setGrade(g)}>
                  {g}
                </button>
              ))}
            </div>

            {/* Mensaje de éxito o error al guardar */}
            {profileMsg && <p className="pv-msg">{profileMsg}</p>}
            <button className="pv-save-btn" onClick={alGuardarPerfil}>💾 Guardar cambios</button>
          </div>
        )}

        {/* ── PESTAÑA: CAMBIAR CONTRASEÑA ── */}
        {tab === 'password' && (
          <div className="pv-card">
            <p className="pv-section-label">Contraseña actual</p>
            <input className="pv-input" type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••" />

            <p className="pv-section-label">Nueva contraseña</p>
            <input className="pv-input" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Mínimo 6 caracteres" />

            <p className="pv-section-label">Confirmar nueva contraseña</p>
            <input className="pv-input" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="••••••••" />

            {/* Mensaje de resultado — clase 'ok' o 'err' según el flag */}
            {pwMsg.text && <p className={`pv-msg ${pwMsg.ok ? 'ok' : 'err'}`}>{pwMsg.text}</p>}
            <button className="pv-save-btn" onClick={alCambiarContrasena}>🔐 Cambiar contraseña</button>
          </div>
        )}

        {/* ── ZONA DE PELIGRO ── */}
        <div className="pv-danger">
          {/* Botón de borrar progreso con confirmación de dos pasos */}
          {!confirmReset ? (
            // Primer clic: muestra el mensaje de confirmación
            <button className="pv-danger-btn" onClick={() => setConfirmReset(true)}>🗑️ Borrar mi progreso</button>
          ) : (
            // Segundo paso: confirmar o cancelar
            <div className="pv-confirm-box">
              <p className="pv-confirm-text">⚠️ ¿Seguro? Se borrarán todas tus estrellas y niveles.</p>
              <div className="pv-confirm-row">
                <button className="pv-confirm-yes" onClick={() => { onResetProgress(); setConfirmReset(false); }}>
                  Sí, borrar
                </button>
                <button className="pv-confirm-no" onClick={() => setConfirmReset(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          )}
          {/* onLogout en App.tsx hace el DELETE al backend y luego cierra sesión */}
          <button className="pv-logout-btn" onClick={onLogout}>↩ Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}
