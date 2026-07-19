// ============================================================
// TeacherView.tsx — PANEL DEL MAESTRO
// Permite al maestro crear grupos, ver sus grupos existentes
// y gestionarlos: agregar estudiantes, asignar temas y ejercicios
// del catálogo ya existente en la app.
// ============================================================

import { useState, useEffect } from 'react';
import { TOPICS_BY_GRADE, LEVEL_NAMES } from '../data/topics';
import ConfirmModal from '../components/ConfirmModal';
import '../components/ConfirmModal.css';
import {
  crearGrupo,
  obtenerMisGrupos,
  obtenerGrupo,
  quitarEstudianteDeGrupo,
  asignarTemaAGrupo,
  quitarTemaDeGrupo,
  asignarNivelAGrupo,
  quitarNivelDeGrupo,
  eliminarGrupo,
  obtenerEjercicios,
} from '../services/api';
import './TeacherView.css';

interface Props {
  userId: number;
  userEmail: string;
  onBack: () => void;
}

type Tab = 'grupos' | 'crear' | 'gestionar';
type ManageTab = 'estudiantes' | 'temas' | 'ejercicios';
const GRADES = ['4°', '5°', '6°'];

export default function TeacherView({ userId, userEmail, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('grupos');
  const [grupos, setGrupos] = useState<any[]>([]);
  const [formData, setFormData] = useState({ nombre_grupo: '', descripcion: '', grado: '4°' });
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  // ── Estado de gestión de un grupo específico ──
  // ── ÍCONO DEL OJO (mismo SVG que en el login, para mostrar/ocultar) ──
  const IconoOjo = ({ tachado }: { tachado: boolean }) => tachado ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );

  const [selectedGrupo, setSelectedGrupo] = useState<any | null>(null);
  const [manageTab, setManageTab] = useState<ManageTab>('estudiantes');
  const [busquedaEstudiante, setBusquedaEstudiante] = useState('');

  // Vista previa de preguntas: qué nivel está expandido, y un caché de sus
  // preguntas ya descargadas (para no volver a pedirlas si lo cierras y abres).
  const [nivelExpandido, setNivelExpandido] = useState<string | null>(null);
  const [preguntasPreview, setPreguntasPreview] = useState<Record<string, any[]>>({});
  const [cargandoPreview, setCargandoPreview] = useState<string | null>(null);

  const toggleVerPreguntas = async (idTema: string, idNivel: number) => {
    const clave = `${idTema}-${idNivel}`;

    if (nivelExpandido === clave) {
      setNivelExpandido(null); // ya estaba abierto → lo cierra
      return;
    }

    setNivelExpandido(clave);

    if (!preguntasPreview[clave]) {
      setCargandoPreview(clave);
      try {
        const data = await obtenerEjercicios(idTema, idNivel, selectedGrupo?.grado || '');
        setPreguntasPreview(prev => ({ ...prev, [clave]: data.ejercicios || data || [] }));
      } catch (error) {
        console.error('Error al obtener la vista previa:', error);
        setPreguntasPreview(prev => ({ ...prev, [clave]: [] }));
      } finally {
        setCargandoPreview(null);
      }
    }
  };
  const [codigoCopiado, setCodigoCopiado] = useState(false);

  const handleCopiarCodigo = (codigo: string) => {
    navigator.clipboard?.writeText(codigo).catch(() => {});
    setCodigoCopiado(true);
    setTimeout(() => setCodigoCopiado(false), 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFetchGrupos = async () => {
    try {
      const data = await obtenerMisGrupos(userId);
      setGrupos(data.data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Carga tus grupos automáticamente al entrar al panel, sin esperar
  // a que le des clic manual a la pestaña "Mis Grupos".
  useEffect(() => {
    if (userId) handleFetchGrupos();
  }, [userId]);

  const handleCreateGrupo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre_grupo.trim()) {
      setMsg({ text: 'El nombre del grupo es obligatorio.', ok: false });
      return;
    }
    try {
      await crearGrupo(formData.nombre_grupo.trim(), userId, formData.grado);
      setMsg({ text: '✅ ¡Grupo creado!', ok: true });
      setFormData({ nombre_grupo: '', descripcion: '', grado: '4°' });
      setTimeout(() => { setMsg(null); setTab('grupos'); handleFetchGrupos(); }, 1200);
    } catch (error) {
      console.error('Error:', error);
      setMsg({ text: 'Error al crear el grupo.', ok: false });
    }
  };

  const [grupoAEliminar, setGrupoAEliminar] = useState<number | null>(null);

  const handleDeleteGrupo = (idGrupo: number) => {
    setGrupoAEliminar(idGrupo); // abre el modal bonito, en vez del confirm() nativo
  };

  const confirmarEliminarGrupo = async () => {
    if (grupoAEliminar === null) return;
    try {
      await eliminarGrupo(grupoAEliminar);
      handleFetchGrupos();
    } catch (error) {
      console.error('Error al eliminar el grupo:', error);
    } finally {
      setGrupoAEliminar(null);
    }
  };

  // ── Abrir la pantalla de gestión de un grupo ──
  const handleManageGrupo = async (idGrupo: number) => {
    try {
      const data = await obtenerGrupo(idGrupo);
      setSelectedGrupo(data.data);
      setManageTab('estudiantes');
      setBusquedaEstudiante('');
      setNivelExpandido(null);
      setPreguntasPreview({});
      setTab('gestionar');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const refrescarGrupoSeleccionado = async () => {
    if (!selectedGrupo) return;
    const data = await obtenerGrupo(selectedGrupo.id_grupo);
    setSelectedGrupo(data.data);
  };

  // ── Estudiantes ──
  const handleRemoveEstudiante = async (idUsuario: number) => {
    await quitarEstudianteDeGrupo(selectedGrupo.id_grupo, idUsuario);
    refrescarGrupoSeleccionado();
  };

  // ── Temas ──
  const handleToggleTema = async (idTema: string, _nombreTema: string, yaAsignado: boolean) => {
    if (yaAsignado) {
      await quitarTemaDeGrupo(selectedGrupo.id_grupo, idTema);
    } else {
      await asignarTemaAGrupo(selectedGrupo.id_grupo, idTema);
    }
    refrescarGrupoSeleccionado();
  };

  // ── Ejercicios (por nivel dentro de un tema) ──
  const handleToggleEjercicio = async (idTema: string, idNivel: number, _nombreNivel: string, yaAsignado: boolean) => {
    if (yaAsignado) {
      await quitarNivelDeGrupo(selectedGrupo.id_grupo, idTema, idNivel);
    } else {
      await asignarNivelAGrupo(selectedGrupo.id_grupo, idTema, idNivel);
    }
    refrescarGrupoSeleccionado();
  };

  const handleBackClick = () => {
    if (tab === 'gestionar') {
      setTab('grupos');
      handleFetchGrupos();
    } else {
      onBack();
    }
  };

  const temasDelGrado = selectedGrupo ? (TOPICS_BY_GRADE[selectedGrupo.grado] || []) : [];

  return (
    <div className="tv-backdrop">

      {/* ── Encabezado ── */}
      <div className="tv-header">
        <button className="tv-back" onClick={handleBackClick}>←</button>
        <span className="tv-header-title">👨‍🏫 Panel del Maestro</span>
        <div style={{ width: 40 }} />
      </div>

      <div className="tv-content">

        {tab !== 'gestionar' && (
          <>
            {/* ── Tarjeta de identidad del maestro ── */}
            <div className="tv-id-card">
              <div className="tv-avatar-circle"><span>👨‍🏫</span></div>
              <div className="tv-id-email">{userEmail || 'correo@ejemplo.com'}</div>
              <div className="tv-id-rank">Maestro 📚</div>
            </div>

            {/* ── Tabs ── */}
            <div className="tv-tabs">
              <button className={`tv-tab ${tab === 'grupos' ? 'active' : ''}`} onClick={() => { setTab('grupos'); handleFetchGrupos(); }}>
                📚 Mis Grupos
              </button>
              <button className={`tv-tab ${tab === 'crear' ? 'active' : ''}`} onClick={() => setTab('crear')}>
                ➕ Crear Grupo
              </button>
            </div>
          </>
        )}

        {/* ── PESTAÑA: MIS GRUPOS ── */}
        {tab === 'grupos' && (
          <div className="tv-card">
            <p className="tv-section-label">Grupos activos</p>
            {grupos.length === 0 ? (
              <div className="tv-empty">
                <span className="tv-empty-icon">🛸</span>
                <p className="tv-empty-msg">Aún no tienes grupos. ¡Crea el primero!</p>
                <button className="tv-empty-btn" onClick={() => setTab('crear')}>➕ Crear mi primer grupo</button>
              </div>
            ) : (
              <div className="tv-grupos-grid">
                {grupos.map((grupo: any, idx: number) => (
                  <div key={idx} className="tv-grupo-card">
                    <h3 className="tv-grupo-name">{grupo.nombre_grupo}</h3>
                    <div className="tv-grupo-stats">
                      <span>🎓 {grupo.grado}</span>
                      <span>👥 {grupo.estudiantes?.length || 0} estudiantes</span>
                      <span>📚 {grupo.temas?.length || 0} temas</span>
                      <span>📝 {grupo.ejercicios?.length || 0} ejercicios</span>
                    </div>
                    <button className="tv-codigo-chip" onClick={() => handleCopiarCodigo(grupo.codigo)} title="Copiar código">
                      🔑 {grupo.codigo} <span className="tv-codigo-copy">copiar</span>
                    </button>
                    <div className="tv-grupo-actions">
                      <button className="tv-btn-edit" onClick={() => handleManageGrupo(grupo.id_grupo)}>⚙️ Gestionar</button>
                      <button className="tv-btn-delete" onClick={() => handleDeleteGrupo(grupo.id_grupo)}>❌</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PESTAÑA: CREAR GRUPO ── */}
        {tab === 'crear' && (
          <div className="tv-card">
            <p className="tv-section-label">Nombre del grupo</p>
            <input
              className="tv-input"
              name="nombre_grupo"
              value={formData.nombre_grupo}
              onChange={handleInputChange}
              placeholder="Ej: Grupo 4A - Matemáticas"
              maxLength={50}
            />

            <p className="tv-section-label">Grado</p>
            <select className="tv-input" name="grado" value={formData.grado} onChange={handleInputChange}>
              {GRADES.map(g => <option key={g} value={g}>{g} de Primaria</option>)}
            </select>

            <p className="tv-section-label">Descripción (opcional)</p>
            <textarea
              className="tv-input tv-textarea"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe el propósito o contenido del grupo..."
              rows={3}
            />

            {msg && <p className={`tv-msg ${msg.ok ? 'ok' : 'err'}`}>{msg.text}</p>}

            <button className="tv-save-btn" onClick={handleCreateGrupo}>🚀 Crear grupo</button>

            <div className="tv-info-box">
              <p className="tv-info-title">📋 Próximos pasos</p>
              <ul className="tv-info-list">
                <li>Agrega estudiantes al grupo</li>
                <li>Selecciona los temas que trabajarán</li>
                <li>Elige los ejercicios específicos</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── PESTAÑA: GESTIONAR GRUPO ── */}
        {tab === 'gestionar' && selectedGrupo && (
          <>
            <div className="tv-id-card">
              <div className="tv-avatar-circle"><span>📚</span></div>
              <div className="tv-id-email">{selectedGrupo.nombre_grupo}</div>
              <div className="tv-id-rank">{selectedGrupo.grado} de Primaria</div>
              <button className="tv-codigo-big" onClick={() => handleCopiarCodigo(selectedGrupo.codigo)}>
                <span className="tv-codigo-label">Código de la clase</span>
                <span className="tv-codigo-value">{selectedGrupo.codigo} {codigoCopiado ? '✅' : '📋'}</span>
              </button>
              <p className="tv-codigo-hint">Compártelo con tus alumnos para que se unan al registrarse</p>
            </div>

            <div className="tv-tabs">
              <button className={`tv-tab ${manageTab === 'estudiantes' ? 'active' : ''}`} onClick={() => setManageTab('estudiantes')}>
                👥 Estudiantes
              </button>
              <button className={`tv-tab ${manageTab === 'temas' ? 'active' : ''}`} onClick={() => setManageTab('temas')}>
                📚 Temas
              </button>
              <button className={`tv-tab ${manageTab === 'ejercicios' ? 'active' : ''}`} onClick={() => setManageTab('ejercicios')}>
                📝 Ejercicios
              </button>
            </div>

            {/* ── Estudiantes ── */}
            {manageTab === 'estudiantes' && (
              <div className="tv-card">
                <p className="tv-section-label">En el grupo ({selectedGrupo.estudiantes?.length || 0})</p>

                {selectedGrupo.estudiantes && selectedGrupo.estudiantes.length > 0 && (
                  <input
                    type="text"
                    className="tv-search-input"
                    placeholder="🔎 Buscar alumno por nombre o correo..."
                    value={busquedaEstudiante}
                    onChange={e => setBusquedaEstudiante(e.target.value)}
                  />
                )}

                {(!selectedGrupo.estudiantes || selectedGrupo.estudiantes.length === 0) ? (
                  <p className="tv-empty-msg">Aún no hay estudiantes en este grupo. Comparte el código para que se unan al registrarse.</p>
                ) : (
                  <div className="tv-list">
                    {selectedGrupo.estudiantes
                      .filter((e: any) => {
                        const q = busquedaEstudiante.trim().toLowerCase();
                        if (!q) return true;
                        return e.nombre.toLowerCase().includes(q) || e.correo.toLowerCase().includes(q);
                      })
                      .map((e: any) => (
                        <div key={e.id_usuario} className="tv-list-item">
                          <span>
                            👤 {e.nombre} <small>({e.correo})</small>
                            <br />
                            <small className="tv-progreso">
                              ⭐ {e.total_estrellas ?? 0} estrellas · ✅ {e.niveles_completados ?? 0} niveles completados
                            </small>
                          </span>
                          <button className="tv-btn-delete" onClick={() => handleRemoveEstudiante(e.id_usuario)}>❌</button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Temas ── */}
            {manageTab === 'temas' && (
              <div className="tv-card">
                <p className="tv-section-label">Temas del catálogo ({selectedGrupo.grado})</p>
                <div className="tv-list">
                  {temasDelGrado.map((topic) => {
                    const asignado = (selectedGrupo.temas || []).some((t: any) => t.id_tema === topic.id);
                    return (
                      <div key={topic.id} className="tv-list-item">
                        <span>{topic.emoji} {topic.title}</span>
                        <button
                          className={asignado ? 'tv-btn-delete' : 'tv-btn-edit'}
                          onClick={() => handleToggleTema(topic.id, topic.title, asignado)}
                        >
                          {asignado ? '❌ Quitar' : '➕ Asignar'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Ejercicios (por nivel dentro de cada tema asignado) ── */}
            {manageTab === 'ejercicios' && (
              <div className="tv-card">
                {(!selectedGrupo.temas || selectedGrupo.temas.length === 0) ? (
                  <div className="tv-empty">
                    <span className="tv-empty-icon">📚</span>
                    <p className="tv-empty-msg">Primero asigna al menos un tema para elegir sus ejercicios.</p>
                    <button className="tv-empty-btn" onClick={() => setManageTab('temas')}>📚 Ir a Temas</button>
                  </div>
                ) : (
                  selectedGrupo.temas.map((tema: any) => {
                    const nombresNiveles = LEVEL_NAMES[tema.id_tema] || [];
                    return (
                      <div key={tema.id_tema} style={{ marginBottom: 16 }}>
                        <p className="tv-section-label">{tema.nombre_tema}</p>
                        <div className="tv-list">
                          {nombresNiveles.map((nombreNivel, nivelIdx) => {
                            const idEjercicio = `${tema.id_tema}-${nivelIdx}`;
                            const asignado = (selectedGrupo.ejercicios || []).some((e: any) => e.id_ejercicio === idEjercicio);
                            const expandido = nivelExpandido === idEjercicio;
                            return (
                              <div key={idEjercicio}>
                                <div className="tv-list-item">
                                  <span>Nivel {nivelIdx + 1}: {nombreNivel}</span>
                                  <div style={{ display: 'flex', gap: 6 }}>
                                    <button
                                      className="tv-btn-preview"
                                      onClick={() => toggleVerPreguntas(tema.id_tema, nivelIdx)}
                                    >
                                      <IconoOjo tachado={expandido} /> {expandido ? 'Ocultar' : 'Ver preguntas'}
                                    </button>
                                    <button
                                      className={asignado ? 'tv-btn-delete' : 'tv-btn-edit'}
                                      onClick={() => handleToggleEjercicio(tema.id_tema, nivelIdx, nombreNivel, asignado)}
                                    >
                                      {asignado ? '❌ Quitar' : '➕ Asignar'}
                                    </button>
                                  </div>
                                </div>

                                {expandido && (
                                  <div className="tv-preview-box">
                                    {cargandoPreview === idEjercicio ? (
                                      <p className="tv-empty-msg">Cargando preguntas...</p>
                                    ) : (preguntasPreview[idEjercicio] || []).length === 0 ? (
                                      <p className="tv-empty-msg">Este nivel todavía no tiene preguntas cargadas.</p>
                                    ) : (
                                      <ol className="tv-preview-list">
                                        {preguntasPreview[idEjercicio].map((ej: any, i: number) => (
                                          <li key={i}>
                                            <strong>{ej.question}</strong>
                                            <br />
                                            <small>Opciones: {ej.options?.join(' · ')}</small>
                                          </li>
                                        ))}
                                      </ol>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmModal
        open={grupoAEliminar !== null}
        title="Eliminar grupo"
        message="¿Eliminar este grupo? Esto no se puede deshacer. Los alumnos que estaban en él quedarán como independientes."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        danger
        onConfirm={confirmarEliminarGrupo}
        onCancel={() => setGrupoAEliminar(null)}
      />
    </div>
  );
}
