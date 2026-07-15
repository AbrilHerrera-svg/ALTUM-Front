// ============================================================
// ProgresoManager.ts — CAPA DE SERVICIO para el progreso (equivalente
// a ServicioManager.ts de Taller Mecánico). Aquí, y solo aquí, se
// ejecuta SQL real contra la tabla `progreso_catalogo`.
//
// NOTA: usamos `progreso_catalogo` (no `estrellas`) porque el catálogo
// de ejercicios sigue siendo un objeto hardcodeado en EjercicioController
// (identificado por grado + tema_key + nivel_idx), no filas reales de
// la tabla `niveles`. Corre primero agregar_progreso_catalogo.sql.
// ============================================================

import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export class ProgresoManager {

  // Progreso completo de un alumno (todos sus temas y niveles)
  // Se devuelve en la misma forma anidada que usaba el objeto en RAM:
  // { "basic_arithmetic": { "0": { completed: true, stars: 3 }, ... }, ... }
  public static async obtenerPorUsuario(id_usuario: number): Promise<Record<string, any>> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT tema_key, nivel_idx, completado, estrellas FROM progreso_catalogo WHERE id_usuario = ?',
      [id_usuario]
    );

    const progreso: Record<string, any> = {};
    for (const row of rows) {
      if (!progreso[row.tema_key]) progreso[row.tema_key] = {};
      progreso[row.tema_key][String(row.nivel_idx)] = {
        completed: !!row.completado,
        stars: row.estrellas,
      };
    }
    return progreso;
  }

  // Guarda/actualiza un nivel completado. Nunca baja las estrellas
  // (igual que hacía Math.max en la versión en RAM), gracias al
  // GREATEST() dentro del ON DUPLICATE KEY UPDATE.
  public static async guardarNivel(datos: {
    id_usuario: number;
    grado: string;
    tema_key: string;
    nivel_idx: number;
    estrellas: number;
  }): Promise<Record<string, any>> {
    await pool.query(
      `INSERT INTO progreso_catalogo (id_usuario, grado, tema_key, nivel_idx, completado, estrellas)
       VALUES (?, ?, ?, ?, 1, ?)
       ON DUPLICATE KEY UPDATE
         completado = 1,
         estrellas  = GREATEST(estrellas, VALUES(estrellas))`,
      [datos.id_usuario, datos.grado, datos.tema_key, datos.nivel_idx, datos.estrellas]
    );

    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT nivel_idx, completado, estrellas FROM progreso_catalogo WHERE id_usuario = ? AND tema_key = ?',
      [datos.id_usuario, datos.tema_key]
    );

    const temaCompleto: Record<string, any> = {};
    for (const row of rows) {
      temaCompleto[String(row.nivel_idx)] = { completed: !!row.completado, stars: row.estrellas };
    }
    return temaCompleto;
  }
}