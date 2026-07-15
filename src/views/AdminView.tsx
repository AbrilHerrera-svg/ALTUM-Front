import { useState, useEffect } from 'react';
import { TOPICS_BY_GRADE, LEVEL_NAMES } from '../data/topics';
import ConfirmModal from '../components/ConfirmModal';
import '../components/ConfirmModal.css';
import {
  obtenerEjerciciosAdmin,
  crearEjercicioAdmin,
  actualizarEjercicioAdmin,
  eliminarEjercicioAdmin,
} from '../services/api';
import './AdminView.css';

interface Props {
  onBack: () => void;
}

const GRADES = ['4', '5', '6'];

const emptyForm = {
  descripcion: '', tip: '', id_tema: '', id_nivel: '', grado: '',
  options: ['', '', '', ''] as string[],
  correctIndex: '' as string,
};

export default function AdminView({ onBack }: Props) {
  const [tab, setTab] = useState<'list' | 'create'>('list');
  const [ejercicios, setEjercicios] = useState<any[]>([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const gradoKey = formData.grado ? `${formData.grado}°` : '';
  const temasDisponibles = gradoKey ? (TOPICS_BY_GRADE[gradoKey] || []) : [];
  const nivelesDisponibles = formData.id_tema ? (LEVEL_NAMES[formData.id_tema] || []) : [];

  const nombreTema = (id_tema: string) => {
    for (const lista of Object.values(TOPICS_BY_GRADE)) {
      const encontrado = lista.find(t => t.id === id_tema);
      if (encontrado) return encontrado.title;
    }
    return id_tema;
  };

  const nombreNivel = (id_tema: string, id_nivel: string) => {
    const niveles = LEVEL_NAMES[id_tema];
    const idx = Number(id_nivel);
    return niveles && niveles[idx] ? niveles[idx] : `Nivel ${id_nivel}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const next = { ...prev, [name]: value };
      // Al cambiar el grado, el tema y nivel elegidos ya no aplican — se limpian
      if (name === 'grado') { next.id_tema = ''; next.id_nivel = ''; }
      // Al cambiar el tema, el nivel elegido ya no aplica
      if (name === 'id_tema') { next.id_nivel = ''; }
      return next;
    });
  };

  const handleOptionChange = (idx: number, value: string) => {
    setFormData(prev => {
      const options = [...prev.options];
      options[idx] = value;
      return { ...prev, options };
    });
  };

  useEffect(() => { handleFetchEjercicios(); }, []);

  const handleFetchEjercicios = async () => {
    try {
      const data = await obtenerEjerciciosAdmin();
      setEjercicios(data.data || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.options.some(op => !op.trim())) {
      setMsg({ text: 'Completa las 4 respuestas.', ok: false });
      return;
    }
    if (formData.correctIndex === '') {
      setMsg({ text: 'Elige cuál respuesta es la correcta.', ok: false });
      return;
    }

    const payload = {
      descripcion: formData.descripcion,
      tip: formData.tip,
      id_tema: formData.id_tema,
      id_nivel: formData.id_nivel,
      grado: formData.grado,
      options: formData.options,
      correct: formData.options[Number(formData.correctIndex)],
    };

    try {
      if (editingId) {
        await actualizarEjercicioAdmin(editingId, payload);
      } else {
        await crearEjercicioAdmin(payload);
      }
      setMsg({ text: editingId ? '✅ ¡Ejercicio actualizado!' : '✅ ¡Ejercicio creado!', ok: true });
      resetForm();
      await handleFetchEjercicios();
      setTimeout(() => { setMsg(null); setTab('list'); }, 900);
    } catch (error) {
      console.error('Error:', error);
      setMsg({ text: 'Error al guardar el ejercicio.', ok: false });
    }
  };

  const handleEditEjercicio = (ej: any) => {
    const options: string[] = ej.options && ej.options.length === 4 ? ej.options : ['', '', '', ''];
    const correctIndex = options.findIndex((op: string) => op === ej.correct);
    setFormData({
      descripcion: ej.descripcion || '',
      tip: ej.tip || '',
      id_tema: ej.id_tema || '',
      id_nivel: String(ej.id_nivel ?? ''),
      grado: String(ej.grado || ''),
      options,
      correctIndex: correctIndex >= 0 ? String(correctIndex) : '',
    });
    setEditingId(ej.id);
    setMsg(null);
    setTab('create');
  };

  const [ejercicioAEliminar, setEjercicioAEliminar] = useState<number | null>(null);

  const handleDeleteEjercicio = (id: number) => {
    setEjercicioAEliminar(id);
  };

  const confirmarEliminarEjercicio = async () => {
    if (ejercicioAEliminar === null) return;
    try {
      await eliminarEjercicioAdmin(ejercicioAEliminar);
      handleFetchEjercicios();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setEjercicioAEliminar(null);
    }
  };

  return (
    <div className="admin-view">
      <div className="admin-body">

        <div className="admin-header">
          <div className="admin-header-top">
            <span className="admin-avatar">🛠️</span>
            <div>
              <h1>Panel de Administrador</h1>
              <p className="admin-subtitle">Gestiona el catálogo de ejercicios</p>
            </div>
            <button onClick={onBack} className="btn-back" title="Volver">↩</button>
          </div>
        </div>

        <div className="admin-tabs">
          <button
            className={`tab ${tab === 'list' ? 'active' : ''}`}
            onClick={() => { setTab('list'); handleFetchEjercicios(); }}
          >
            📋 Listar ({ejercicios.length})
          </button>
          <button
            className={`tab ${tab === 'create' ? 'active' : ''}`}
            onClick={() => { resetForm(); setTab('create'); }}
          >
            ➕ Crear Ejercicio
          </button>
        </div>

        <div className="admin-content">
          {tab === 'list' && (
            <div className="ejercicios-list">
              <h2>Ejercicios del sistema</h2>
              {ejercicios.length === 0 ? (
                <div className="empty-state">
                  <span style={{ fontSize: '2.6rem' }}>🛸</span>
                  <p style={{ margin: 0 }}>No hay ejercicios aún</p>
                  <button className="btn-empty-create" onClick={() => { resetForm(); setTab('create'); }}>
                    ➕ Crear el primero
                  </button>
                </div>
              ) : (
                <div className="ejercicios-grid">
                  {ejercicios.map((ej: any) => (
                    <div key={ej.id} className="ejercicio-card">
                      <span className="ej-icon">🪐</span>
                      <div className="ej-body">
                        <p className="ej-desc">{ej.descripcion}</p>
                        <small className="ej-meta">
                          {ej.grado ? `${ej.grado}° Primaria` : 'Sin grado'}
                          {ej.id_tema ? ` · ${nombreTema(ej.id_tema)}` : ''}
                          {ej.id_nivel !== undefined && ej.id_nivel !== '' ? ` · ${nombreNivel(ej.id_tema, ej.id_nivel)}` : ''}
                        </small>
                        {ej.options && ej.options.length > 0 && (
                          <div className="ej-options">
                            {ej.options.map((op: string, i: number) => (
                              <span key={i} className={`ej-option ${op === ej.correct ? 'is-correct' : ''}`}>
                                {op === ej.correct ? '✅' : '▫️'} {op}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="ej-actions">
                        <button className="btn-edit" onClick={() => handleEditEjercicio(ej)}>✏️ Editar</button>
                        <button className="btn-delete" onClick={() => handleDeleteEjercicio(ej.id)}>❌ Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'create' && (
            <div className="form-container">
              <h2>{editingId ? 'Editar ejercicio' : 'Crear nuevo ejercicio'}</h2>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Grado *</label>
                    <select name="grado" value={formData.grado} onChange={handleInputChange} required>
                      <option value="">Seleccionar...</option>
                      {GRADES.map(g => <option key={g} value={g}>{g}to Primaria</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Tema *</label>
                    <select
                      name="id_tema"
                      value={formData.id_tema}
                      onChange={handleInputChange}
                      required
                      disabled={!gradoKey}
                    >
                      <option value="">{gradoKey ? 'Seleccionar...' : 'Elige un grado primero'}</option>
                      {temasDisponibles.map(t => <option key={t.id} value={t.id}>{t.emoji} {t.title}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Nivel *</label>
                    <select
                      name="id_nivel"
                      value={formData.id_nivel}
                      onChange={handleInputChange}
                      required
                      disabled={!formData.id_tema}
                    >
                      <option value="">{formData.id_tema ? 'Seleccionar...' : 'Elige un tema primero'}</option>
                      {nivelesDisponibles.map((nombre, idx) => (
                        <option key={idx} value={idx}>Nivel {idx + 1}: {nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Descripción *</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="¿Cuánto es 2 + 2?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Respuestas * <span className="form-hint">(elige la correcta)</span></label>
                  <div className="options-list">
                    {formData.options.map((op, idx) => (
                      <label key={idx} className={`option-row ${formData.correctIndex === String(idx) ? 'is-correct' : ''}`}>
                        <input
                          type="radio"
                          name="correctIndex"
                          checked={formData.correctIndex === String(idx)}
                          onChange={() => setFormData(prev => ({ ...prev, correctIndex: String(idx) }))}
                        />
                        <input
                          type="text"
                          className="option-input"
                          value={op}
                          onChange={e => handleOptionChange(idx, e.target.value)}
                          placeholder={`Respuesta ${idx + 1}`}
                          required
                        />
                        {formData.correctIndex === String(idx) && <span className="option-check">✅</span>}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Pista (Tip)</label>
                  <textarea
                    name="tip"
                    value={formData.tip}
                    onChange={handleInputChange}
                    placeholder="Ayuda para resolver..."
                  />
                </div>

                {msg && <p className={`admin-msg ${msg.ok ? 'ok' : 'err'}`}>{msg.text}</p>}

                <div className="form-actions">
                  {editingId && (
                    <button type="button" className="btn-cancel" onClick={() => { resetForm(); setTab('list'); }}>
                      Cancelar
                    </button>
                  )}
                  <button type="submit" className="btn-submit">
                    {editingId ? '💾 Guardar cambios' : '🚀 Crear ejercicio'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>

      <ConfirmModal
        open={ejercicioAEliminar !== null}
        title="Eliminar ejercicio"
        message="¿Eliminar este ejercicio? Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        danger
        onConfirm={confirmarEliminarEjercicio}
        onCancel={() => setEjercicioAEliminar(null)}
      />
    </div>
  );
}
