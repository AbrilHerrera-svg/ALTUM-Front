// ============================================================
// api.ts — EL "TRADUCTOR" AL BACKEND (patrón services/api.ts de
// Taller Mecánico). Este es el ÚNICO archivo del frontend que
// conoce las URLs del backend. App.tsx solo llama a estas funciones,
// nunca hace fetch() directo.
// ============================================================

const BASE_URL = 'http://localhost:3000/api';

// ── USUARIOS ──────────────────────────────────────────────────

// Login real con correo + contraseña → POST /api/usuarios/login
// OJO: la clave se llama "contrasena" (SIN tilde), igual que en el backend.
export async function iniciarSesion(datos: { correo: string; contrasena: string }) {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

// Lista todos los usuarios → GET /api/usuarios (para checar correos duplicados, etc.)
export async function listarUsuarios() {
  const res = await fetch(`${BASE_URL}/usuarios`);
  return res.json();
}

export async function iniciarSesionORegistrar(datos: {
  nombre: string;
  grado?: string;
  correo: string;
  role?: 'estudiante' | 'tutor' | 'administrador';
  contrasena?: string;
  classCode?: string;
}) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function actualizarPerfil(
  id: number,
  datos: { nombre: string; grado: string; correo: string; avatar: string }
) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function eliminarCuenta(id: number) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function cambiarContrasena(id: number, contrasenaActual: string, contrasenaNueva: string) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contrasenaActual, contrasenaNueva }),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

// ── PROGRESO ──────────────────────────────────────────────────

export async function obtenerProgreso(nombreAlumno: string) {
  const res = await fetch(`${BASE_URL}/progreso/${nombreAlumno}`);
  return res.json();
}

// Se llama al TERMINAR un nivel completo (envía las estrellas ganadas)
export async function guardarProgresoDeNivel(datos: {
  alumnoNombre: string;
  topicId: string;
  levelIndex: number;
  stars: number;
}) {
  const res = await fetch(`${BASE_URL}/progreso/guardar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

// Se llama al RESPONDER cada pregunta (verifica si es correcta)
export async function verificarRespuesta(datos: {
  alumnoNombre: string;
  userGrade: string;
  topicId: string;
  levelIndex: number;
  exerciseIndex: number;
  respuestaUsuario: string;
}) {
  const res = await fetch(`${BASE_URL}/progreso/verificar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

// ── EJERCICIOS ────────────────────────────────────────────────

export async function obtenerEjercicios(tema: string, nivel: number, grado: string) {
  const res = await fetch(`${BASE_URL}/ejercicios/${tema}/${nivel}?grade=${encodeURIComponent(grado)}`);
  return res.json();
}

// ── GRUPOS DE CLASE (TEACHER) ─────────────────────────────────

export async function crearGrupo(nombreGrupo: string, idTutor: number) {
  const res = await fetch(`${BASE_URL}/teacher/grupos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre_grupo: nombreGrupo, id_tutor: idTutor }),
  });
  return res.json();
}

export async function obtenerMisGrupos(idTutor: number) {
  const res = await fetch(`${BASE_URL}/teacher/mis-grupos/${idTutor}`);
  return res.json();
}

export async function obtenerGrupoDeEstudiante(idEstudiante: number) {
  const res = await fetch(`${BASE_URL}/teacher/mi-grupo/${idEstudiante}`);
  return res.json();
}

// ── ADMIN: CRUD DE EJERCICIOS (panel de administrador) ────────
// NOTA: hoy AdminController.ts todavía guarda esto en un arreglo en
// RAM (se borra al reiniciar el servidor). No es una tabla real de
// `altum` todavía — ver conversación sobre EjercicioManager pendiente.

export async function obtenerEjerciciosAdmin() {
  const res = await fetch(`${BASE_URL}/admin/ejercicios`);
  return res.json();
}

export async function crearEjercicioAdmin(payload: any) {
  const res = await fetch(`${BASE_URL}/admin/ejercicios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function actualizarEjercicioAdmin(id: number, payload: any) {
  const res = await fetch(`${BASE_URL}/admin/ejercicios/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function eliminarEjercicioAdmin(id: number) {
  const res = await fetch(`${BASE_URL}/admin/ejercicios/${id}`, { method: 'DELETE' });
  return res.json();
}