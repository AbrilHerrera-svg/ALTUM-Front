import { useState } from 'react';
import { TOPICS } from '../data/topics';
import type { Progress, User } from '../types';
import './ProfileView.css';

const GRADES = ['4° de Primaria', '5° de Primaria', '6° de Primaria'];
const AVATARS = ['👨‍🚀','👩‍🚀','👾','🤖','🦸','🧑‍🔬','👽','🌟','🚀','🪐','🌙','☄️','🦊','🐉','🦁'];

function obtenerUsuarios(): User[] {
  try { return JSON.parse(localStorage.getItem('altum_users') || '[]') as User[]; } catch { return []; }
}
function guardarUsuarios(users: User[]): void {
  localStorage.setItem('altum_users', JSON.stringify(users));
}

function obtenerEstadisticas(progress: Progress) {
  let stars = 0, levels = 0;
  TOPICS.forEach(t => {
    if (!progress[t.id]) return;
    Object.values(progress[t.id]).forEach(l => {
      if (l.completed) { levels++; stars += l.stars ?? 0; }
    });
  });
  return { stars, levels };
}

interface ProfileUpdate { name: string; grade: string; avatar: string; }

interface Props {
  userName: string;
  userGrade: string;
  userEmail: string;
  userAvatar: string;
  progress: Progress;
  onBack: () => void;
  onUpdate: (u: ProfileUpdate) => void;
  onLogout: () => void;
  onResetProgress: () => void;
}

type Tab = 'profile' | 'password';

export default function VistaPerfil({ userName, userGrade, userEmail, userAvatar, progress, onBack, onUpdate, onLogout, onResetProgress }: Props) {
  const [tab, setTab] = useState<Tab>('profile');

  const [name, setName] = useState(userName);
  const [grade, setGrade] = useState(userGrade);
  const [avatar, setAvatar] = useState(userAvatar || '👨‍🚀');
  const [profileMsg, setProfileMsg] = useState('');

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMsg, setPwMsg] = useState<{ text: string; ok: boolean }>({ text: '', ok: false });

  const [confirmReset, setConfirmReset] = useState(false);

  const stats = obtenerEstadisticas(progress);

  const alGuardarPerfil = () => {
    if (!name.trim()) { setProfileMsg('El nombre no puede estar vacío.'); return; }
    const users = obtenerUsuarios();
    const idx = users.findIndex(u => u.email === userEmail);
    if (idx !== -1) {
      users[idx].name = name.trim();
      users[idx].grade = grade;
      users[idx].avatar = avatar;
      guardarUsuarios(users);
    }
    onUpdate({ name: name.trim(), grade, avatar });
    setProfileMsg('✅ ¡Perfil actualizado!');
    setTimeout(() => setProfileMsg(''), 2500);
  };

  const alCambiarContrasena = () => {
    setPwMsg({ text: '', ok: false });
    const users = obtenerUsuarios();
    const user = users.find(u => u.email === userEmail);
    if (!user || user.password !== currentPw) {
      setPwMsg({ text: 'La contraseña actual es incorrecta.', ok: false }); return;
    }
    if (newPw.length < 6) {
      setPwMsg({ text: 'La nueva contraseña debe tener al menos 6 caracteres.', ok: false }); return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ text: 'Las contraseñas nuevas no coinciden.', ok: false }); return;
    }
    const idx = users.findIndex(u => u.email === userEmail);
    users[idx].password = newPw;
    guardarUsuarios(users);
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setPwMsg({ text: '✅ ¡Contraseña actualizada!', ok: true });
    setTimeout(() => setPwMsg({ text: '', ok: false }), 2500);
  };

  return (
    <div className="pv-backdrop">
      <div className="pv-header">
        <button className="pv-back" onClick={onBack}>←</button>
        <span className="pv-header-title">Mi Perfil</span>
        <div style={{ width: 40 }} />
      </div>

      <div className="pv-content">
        <div className="pv-hero">
          <div className="pv-avatar-big">{avatar}</div>
          <div className="pv-hero-name">{userName}</div>
          <div className="pv-hero-grade">{userGrade} · {userEmail}</div>
        </div>

        <div className="pv-stats">
          <div className="pv-stat">
            <span className="pv-stat-val">⭐ {stats.stars}</span>
            <span className="pv-stat-label">Estrellas</span>
          </div>
          <div className="pv-stat-divider" />
          <div className="pv-stat">
            <span className="pv-stat-val">🏆 {stats.levels}</span>
            <span className="pv-stat-label">Niveles</span>
          </div>
          <div className="pv-stat-divider" />
          <div className="pv-stat">
            <span className="pv-stat-val">📚 {TOPICS.length}</span>
            <span className="pv-stat-label">Temas</span>
          </div>
        </div>

        <div className="pv-tabs">
          <button className={`pv-tab ${tab === 'profile' ? 'active' : ''}`} onClick={() => setTab('profile')}>
            ✏️ Editar perfil
          </button>
          <button className={`pv-tab ${tab === 'password' ? 'active' : ''}`} onClick={() => setTab('password')}>
            🔐 Contraseña
          </button>
        </div>

        {tab === 'profile' && (
          <div className="pv-card">
            <p className="pv-section-label">Elige tu avatar</p>
            <div className="pv-avatar-grid">
              {AVATARS.map(a => (
                <button key={a} className={`pv-avatar-opt ${avatar === a ? 'selected' : ''}`} onClick={() => setAvatar(a)}>
                  {a}
                </button>
              ))}
            </div>

            <p className="pv-section-label">Nombre</p>
            <input className="pv-input" value={name} onChange={e => setName(e.target.value)} maxLength={30} placeholder="Tu nombre" />

            <p className="pv-section-label">Grado</p>
            <div className="pv-grade-opts">
              {GRADES.map(g => (
                <button key={g} className={`pv-grade-btn ${grade === g ? 'selected' : ''}`} onClick={() => setGrade(g)}>
                  {g}
                </button>
              ))}
            </div>

            {profileMsg && <p className="pv-msg">{profileMsg}</p>}
            <button className="pv-save-btn" onClick={alGuardarPerfil}>💾 Guardar cambios</button>
          </div>
        )}

        {tab === 'password' && (
          <div className="pv-card">
            <p className="pv-section-label">Contraseña actual</p>
            <input className="pv-input" type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="••••••••" />

            <p className="pv-section-label">Nueva contraseña</p>
            <input className="pv-input" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="Mínimo 6 caracteres" />

            <p className="pv-section-label">Confirmar nueva contraseña</p>
            <input className="pv-input" type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="••••••••" />

            {pwMsg.text && <p className={`pv-msg ${pwMsg.ok ? 'ok' : 'err'}`}>{pwMsg.text}</p>}
            <button className="pv-save-btn" onClick={alCambiarContrasena}>🔐 Cambiar contraseña</button>
          </div>
        )}

        <div className="pv-danger">
          {!confirmReset ? (
            <button className="pv-danger-btn" onClick={() => setConfirmReset(true)}>🗑️ Borrar mi progreso</button>
          ) : (
            <div className="pv-confirm-box">
              <p className="pv-confirm-text">⚠️ ¿Seguro? Se borrarán todas tus estrellas y niveles.</p>
              <div className="pv-confirm-row">
                <button className="pv-confirm-yes" onClick={() => { onResetProgress(); setConfirmReset(false); }}>Sí, borrar</button>
                <button className="pv-confirm-no" onClick={() => setConfirmReset(false)}>Cancelar</button>
              </div>
            </div>
          )}
          <button className="pv-logout-btn" onClick={onLogout}>↩ Cerrar sesión</button>
        </div>
      </div>
    </div>
  );
}
