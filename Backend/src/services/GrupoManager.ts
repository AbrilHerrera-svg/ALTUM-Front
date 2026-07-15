// ============================================================
// GrupoManager.ts — CAPA DE SERVICIO para grupos de clase.
// Usa la columna `codigo_grupo` (UNIQUE) de la tabla `grupos`
// para que los estudiantes puedan unirse con un código.
// ============================================================

import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

function generarCodigoUnico(): string {
  // sin 0/O ni 1/I para evitar confusión al compartirlo
  const CARACTERES = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => CARACTERES[Math.floor(Math.random() * CARACTERES.length)]).join('');
}

export class GrupoManager {

  // Crea el grupo. Si por mala suerte el código generado ya existe
  // (choque con la restricción UNIQUE), reintenta con uno nuevo.
  public static async crear(nombre_grupo: string, id_tutor: number) {
    for (let intento = 0; intento < 5; intento++) {
      const codigo = generarCodigoUnico();
      try {
        const [result] = await pool.query<ResultSetHeader>(
          'INSERT INTO grupos (nombre_grupo, codigo_grupo, fecha, id_tutor) VALUES (?, ?, CURDATE(), ?)',
          [nombre_grupo, codigo, id_tutor]
        );
        return this.buscarPorId(result.insertId);
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') continue; // vuelve a intentar con otro código
        throw error;
      }
    }
    throw new Error('No se pudo generar un código de grupo único. Intenta de nuevo.');
  }

  public static async buscarPorId(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM grupos WHERE id_grupo = ?',
      [id]
    );
    return rows[0] ?? null;
  }

  public static async buscarPorCodigo(codigo: string) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM grupos WHERE codigo_grupo = ?',
      [codigo.trim().toUpperCase()]
    );
    return rows[0] ?? null;
  }

  public static async listarPorTutor(id_tutor: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM grupos WHERE id_tutor = ?',
      [id_tutor]
    );
    return rows;
  }

  // Une a un estudiante YA REGISTRADO al grupo mediante el código.
  // Usado por UsuarioManager.crear() cuando el estudiante trae classCode.
  public static async unirEstudiantePorCodigo(codigo: string, id_estudiante: number) {
    const grupo = await this.buscarPorCodigo(codigo);
    if (!grupo) return null;

    await pool.query(
      'UPDATE estudiantes SET id_grupo = ? WHERE id_usuario = ?',
      [grupo.id_grupo, id_estudiante]
    );
    return grupo;
  }

  // El grupo al que pertenece un estudiante (o null si es independiente)
  public static async grupoDeEstudiante(id_estudiante: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT g.*
         FROM grupos g
         JOIN estudiantes e ON e.id_grupo = g.id_grupo
        WHERE e.id_usuario = ?`,
      [id_estudiante]
    );
    return rows[0] ?? null;
  }

  // Temas asignados a un grupo (join con la tabla temas)
  public static async temasDelGrupo(id_grupo: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM temas WHERE id_grupo = ?',
      [id_grupo]
    );
    return rows;
  }

  // ── ESTUDIANTES DEL GRUPO ──────────────────────────────────

  public static async estudiantesDelGrupo(id_grupo: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT u.id_usuario, u.nombre, u.correo, e.id_grado
         FROM estudiantes e
         JOIN usuarios u ON u.id_usuario = e.id_usuario
        WHERE e.id_grupo = ?`,
      [id_grupo]
    );
    return rows;
  }

  // Añade a un estudiante YA REGISTRADO a un grupo (usado desde el panel del maestro).
  public static async agregarEstudiante(id_grupo: number, id_usuario: number) {
    await pool.query(
      'UPDATE estudiantes SET id_grupo = ? WHERE id_usuario = ?',
      [id_grupo, id_usuario]
    );
  }

  // Saca a un estudiante de su grupo (queda independiente, id_grupo = NULL).
  public static async quitarEstudiante(id_usuario: number) {
    await pool.query(
      'UPDATE estudiantes SET id_grupo = NULL WHERE id_usuario = ?',
      [id_usuario]
    );
  }

  // ── TEMAS DEL GRUPO ────────────────────────────────────────

  public static async asignarTema(id_grupo: number, id_tema: number) {
    await pool.query(
      'UPDATE temas SET id_grupo = ? WHERE id_tema = ?',
      [id_grupo, id_tema]
    );
  }

  public static async quitarTema(id_tema: number) {
    await pool.query(
      'UPDATE temas SET id_grupo = NULL WHERE id_tema = ?',
      [id_tema]
    );
  }
}