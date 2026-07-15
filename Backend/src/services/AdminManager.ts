// ============================================================
// AdminManager.ts — CAPA DE SERVICIO para el panel de administrador.
// CRUD de ejercicios, pero sobre las MISMAS tablas reales que usa
// el juego (ejercicios, opciones, temas, niveles) — no hay un
// catálogo paralelo. Lo que el admin crea/edita/borra aquí, los
// alumnos lo ven de inmediato en su partida.
// ============================================================

import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface EjercicioAdminDTO {
  descripcion: string;
  tip?: string;
  id_tema:  string; // slug del tema, ej. "numeric"
  id_nivel: string; // orden del nivel dentro del tema, "0" a "7"
  grado:    string; // "4" | "5" | "6" (sin el símbolo °)
  options:  string[];
  correct:  string;
}

export class AdminManager {

  // Lista TODOS los ejercicios del catálogo (de cualquier grado/tema),
  // con sus 4 opciones, en el formato que espera AdminView.tsx.
  public static async listarEjercicios() {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT e.id_ejercicio, e.descripcion, e.tip,
              t.slug AS id_tema, t.grado, n.orden AS id_nivel
         FROM ejercicios e
         JOIN niveles n ON n.id_nivel = e.id_nivel
         JOIN temas t   ON t.id_tema  = n.id_tema
        ORDER BY e.id_ejercicio DESC`
    );

    const resultado = [];
    for (const row of rows) {
      const [opciones] = await pool.query<RowDataPacket[]>(
        'SELECT texto_opcion, es_correcta FROM opciones WHERE id_ejercicio = ?',
        [row.id_ejercicio]
      );
      const options  = opciones.map(o => o.texto_opcion);
      const correcta = opciones.find(o => o.es_correcta);

      resultado.push({
        id: row.id_ejercicio,
        descripcion: row.descripcion,
        tip: row.tip,
        id_tema: row.id_tema,
        id_nivel: String(row.id_nivel),
        grado: row.grado ? String(row.grado).replace('°', '') : '',
        options,
        correct: correcta ? correcta.texto_opcion : options[0],
      });
    }
    return resultado;
  }

  // Traduce (slug del tema + grado "4"/"5"/"6" + orden 0-7) al id_nivel real.
  private static async resolverIdNivel(idTemaSlug: string, gradoNum: string, ordenNivel: number): Promise<number> {
    const grado = gradoNum.includes('°') ? gradoNum : `${gradoNum}°`;
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT n.id_nivel
         FROM niveles n
         JOIN temas t ON t.id_tema = n.id_tema
        WHERE t.slug = ? AND t.grado = ? AND n.orden = ?`,
      [idTemaSlug, grado, ordenNivel]
    );
    if (rows.length === 0) {
      throw new Error(`No existe el nivel ${ordenNivel} del tema "${idTemaSlug}" para el grado ${grado}`);
    }
    return rows[0].id_nivel;
  }

  public static async crearEjercicio(datos: EjercicioAdminDTO) {
    const idNivel = await this.resolverIdNivel(datos.id_tema, datos.grado, Number(datos.id_nivel));

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO ejercicios (descripcion, tip, id_nivel) VALUES (?, ?, ?)',
      [datos.descripcion, datos.tip || null, idNivel]
    );
    const idEjercicio = result.insertId;

    for (const opcion of datos.options) {
      await pool.query(
        'INSERT INTO opciones (texto_opcion, es_correcta, id_ejercicio) VALUES (?, ?, ?)',
        [opcion, opcion === datos.correct ? 1 : 0, idEjercicio]
      );
    }

    return { id: idEjercicio, ...datos };
  }

  public static async actualizarEjercicio(id: number, datos: EjercicioAdminDTO) {
    const idNivel = await this.resolverIdNivel(datos.id_tema, datos.grado, Number(datos.id_nivel));

    await pool.query(
      'UPDATE ejercicios SET descripcion = ?, tip = ?, id_nivel = ? WHERE id_ejercicio = ?',
      [datos.descripcion, datos.tip || null, idNivel, id]
    );

    // Reemplaza las 4 opciones: borra las viejas e inserta las nuevas
    // (más simple y seguro que tratar de calcular cuáles cambiaron).
    await pool.query('DELETE FROM opciones WHERE id_ejercicio = ?', [id]);
    for (const opcion of datos.options) {
      await pool.query(
        'INSERT INTO opciones (texto_opcion, es_correcta, id_ejercicio) VALUES (?, ?, ?)',
        [opcion, opcion === datos.correct ? 1 : 0, id]
      );
    }

    return { id, ...datos };
  }

  // ON DELETE CASCADE en `opciones` se encarga de borrar sus 4 opciones también.
  public static async eliminarEjercicio(id: number): Promise<void> {
    await pool.query('DELETE FROM ejercicios WHERE id_ejercicio = ?', [id]);
  }
}