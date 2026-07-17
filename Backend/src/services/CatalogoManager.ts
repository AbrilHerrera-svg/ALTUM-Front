// ============================================================
// CatalogoManager.ts — CAPA DE SERVICIO para el catálogo de
// temas/niveles/ejercicios/opciones. A partir de ahora, esta es
// la ÚNICA fuente de verdad — ya no el arreglo hardcodeado.
// ============================================================

import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export interface EjercicioDTO {
  question: string;
  options:  string[];
  correct:  string;
  tip:      string | null;
}

export class CatalogoManager {

  // Temas del catálogo general de un grado (id_grupo IS NULL = no son
  // temas personalizados de un maestro, son los del juego para todos).
  public static async obtenerTemasPorGrado(grado: string) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.id_tema, t.nombre_tema, t.slug, t.grado,
              (SELECT COUNT(*) FROM niveles n WHERE n.id_tema = t.id_tema) AS nivelCount
         FROM temas t
        WHERE t.grado = ? AND t.id_grupo IS NULL
        ORDER BY t.id_tema ASC`,
      [grado]
    );
    return rows;
  }

  // Niveles de un tema, identificado por su slug (ej: "numeric") + grado.
  public static async obtenerNivelesDeTema(slug: string, grado: string) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT n.id_nivel, n.nombre_nivel, n.orden
         FROM niveles n
         JOIN temas t ON t.id_tema = n.id_tema
        WHERE t.slug = ? AND t.grado = ?
        ORDER BY n.orden ASC`,
      [slug, grado]
    );
    return rows;
  }

  // Ejercicios (con sus 4 opciones cada uno) de un nivel específico,
  // identificado por tema (slug) + grado + índice de orden (0-7).
  // Devuelve null si no existe ese tema/nivel para ese grado.
  public static async obtenerEjerciciosDeNivel(
    slug: string,
    grado: string,
    nivelIdx: number
  ): Promise<EjercicioDTO[] | null> {
    const [nivelRows] = await pool.query<RowDataPacket[]>(
      `SELECT n.id_nivel
         FROM niveles n
         JOIN temas t ON t.id_tema = n.id_tema
        WHERE t.slug = ? AND t.grado = ? AND n.orden = ?
        LIMIT 1`,
      [slug, grado, nivelIdx]
    );

    if (nivelRows.length === 0) return null;
    const idNivel = nivelRows[0].id_nivel;

    const [ejercicioRows] = await pool.query<RowDataPacket[]>(
      `SELECT id_ejercicio, descripcion, tip
         FROM ejercicios
        WHERE id_nivel = ?
        ORDER BY id_ejercicio ASC`,
      [idNivel]
    );

    const ejercicios: EjercicioDTO[] = [];
    for (const ej of ejercicioRows) {
      const [opcionRows] = await pool.query<RowDataPacket[]>(
        'SELECT texto_opcion, es_correcta FROM opciones WHERE id_ejercicio = ?',
        [ej.id_ejercicio]
      );
      const options    = opcionRows.map(o => o.texto_opcion);
      const correcta   = opcionRows.find(o => o.es_correcta);

      ejercicios.push({
        question: ej.descripcion,
        options,
        correct:  correcta ? correcta.texto_opcion : options[0],
        tip:      ej.tip,
      });
    }
    return ejercicios;
  }
}