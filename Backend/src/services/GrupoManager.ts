// ============================================================
// GrupoManager.ts — CAPA DE SERVICIO para grupos de clase.
//
// IMPORTANTE: los temas asignados a un grupo viven en la tabla
// PUENTE `grupo_temas` (muchos-a-muchos), NO en temas.id_grupo.
// Eso permite que el mismo tema del catálogo global (ej. "numeric")
// pueda estar asignado a varios grupos distintos a la vez, sin
// quitárselo a los estudiantes independientes.
// ============================================================

import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

function generarCodigoUnico(): string {
  const CARACTERES = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 6 }, () => CARACTERES[Math.floor(Math.random() * CARACTERES.length)]).join('');
}

export class GrupoManager {

  // Crea el grupo. Ahora también guarda el grado (4°/5°/6°).
  public static async crear(nombre_grupo: string, id_tutor: number, grado?: string) {
    for (let intento = 0; intento < 5; intento++) {
      const codigo = generarCodigoUnico();
      try {
        const [result] = await pool.query<ResultSetHeader>(
          'INSERT INTO grupos (nombre_grupo, codigo_grupo, grado, fecha, id_tutor) VALUES (?, ?, ?, CURDATE(), ?)',
          [nombre_grupo, codigo, grado || null, id_tutor]
        );
        return this.buscarPorId(result.insertId);
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY') continue;
        throw error;
      }
    }
    throw new Error('No se pudo generar un código de grupo único. Intenta de nuevo.');
  }

  // Arma el objeto completo de un grupo (fila + estudiantes + temas),
  // en el formato exacto que espera el frontend.
  private static async construirGrupoCompleto(fila: RowDataPacket): Promise<any> {
    const estudiantes = await this.estudiantesDelGrupo(fila.id_grupo);
    const temas = await this.temasAsignados(fila.id_grupo);
    const ejercicios = await this.nivelesAsignados(fila.id_grupo);
    return {
      id_grupo: fila.id_grupo,
      nombre_grupo: fila.nombre_grupo,
      grado: fila.grado,
      codigo: fila.codigo_grupo,
      fecha: fila.fecha,
      id_tutor: fila.id_tutor,
      estudiantes,
      temas,
      ejercicios,
    };
  }

  public static async buscarPorId(id: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM grupos WHERE id_grupo = ?', [id]);
    if (rows.length === 0) return null;
    return this.construirGrupoCompleto(rows[0]);
  }

  public static async buscarPorCodigo(codigo: string) {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM grupos WHERE codigo_grupo = ?',
      [codigo.trim().toUpperCase()]
    );
    if (rows.length === 0) return null;
    return this.construirGrupoCompleto(rows[0]);
  }

  public static async listarPorTutor(id_tutor: number) {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM grupos WHERE id_tutor = ?', [id_tutor]);
    return Promise.all(rows.map(fila => this.construirGrupoCompleto(fila)));
  }

  // Une a un estudiante YA REGISTRADO al grupo mediante el código.
  public static async unirEstudiantePorCodigo(codigo: string, id_estudiante: number) {
    const [grupoRows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM grupos WHERE codigo_grupo = ?',
      [codigo.trim().toUpperCase()]
    );
    if (grupoRows.length === 0) return null;

    await pool.query('UPDATE estudiantes SET id_grupo = ? WHERE id_usuario = ?', [grupoRows[0].id_grupo, id_estudiante]);
    return this.construirGrupoCompleto(grupoRows[0]);
  }

  // El grupo al que pertenece un estudiante (o null si es independiente),
  // ya con sus temas asignados (slugs) listos para App.tsx.
  public static async grupoDeEstudiante(id_estudiante: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT g.*
         FROM grupos g
         JOIN estudiantes e ON e.id_grupo = g.id_grupo
        WHERE e.id_usuario = ?`,
      [id_estudiante]
    );
    if (rows.length === 0) return null;
    return this.construirGrupoCompleto(rows[0]);
  }

  // ── ESTUDIANTES DEL GRUPO ──────────────────────────────────

  public static async estudiantesDelGrupo(id_grupo: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT u.id_usuario, u.nombre, u.correo, g.nombre_grado AS grado
         FROM estudiantes e
         JOIN usuarios u ON u.id_usuario = e.id_usuario
         LEFT JOIN grados g ON g.id_grado = e.id_grado
        WHERE e.id_grupo = ?`,
      [id_grupo]
    );
    return rows;
  }

  public static async agregarEstudiante(id_grupo: number, id_usuario: number) {
    // El grado del grupo manda: si el maestro agrega a un alumno de otro
    // grado, lo sincronizamos para que sus temas asignados sí le aparezcan.
    const [grupoRows] = await pool.query<RowDataPacket[]>('SELECT grado FROM grupos WHERE id_grupo = ?', [id_grupo]);
    const gradoGrupo = grupoRows[0]?.grado;

    if (gradoGrupo) {
      const [gradoRows] = await pool.query<RowDataPacket[]>('SELECT id_grado FROM grados WHERE nombre_grado = ?', [gradoGrupo]);
      const id_grado = gradoRows[0]?.id_grado ?? null;
      await pool.query('UPDATE estudiantes SET id_grupo = ?, id_grado = ? WHERE id_usuario = ?', [id_grupo, id_grado, id_usuario]);
    } else {
      await pool.query('UPDATE estudiantes SET id_grupo = ? WHERE id_usuario = ?', [id_grupo, id_usuario]);
    }
  }

  public static async quitarEstudiante(id_usuario: number) {
    await pool.query('UPDATE estudiantes SET id_grupo = NULL WHERE id_usuario = ?', [id_usuario]);
  }

  // ── TEMAS ASIGNADOS AL GRUPO (tabla puente grupo_temas) ────
  // El frontend identifica los temas por su SLUG (ej. "numeric"),
  // no por el id_tema numérico — estos métodos traducen por dentro.

  public static async temasAsignados(id_grupo: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.id_tema AS id_tema, t.nombre_tema, t.slug
         FROM grupo_temas gt
         JOIN temas t ON t.id_tema = gt.id_tema
        WHERE gt.id_grupo = ?`,
      [id_grupo]
    );
    // El frontend compara "id_tema" contra el slug (topic.id) — se lo damos así.
    return rows.map(r => ({ id_tema: r.slug, nombre_tema: r.nombre_tema }));
  }

  public static async asignarTema(id_grupo: number, slugTema: string) {
    const [temaRows] = await pool.query<RowDataPacket[]>('SELECT id_tema FROM temas WHERE slug = ?', [slugTema]);
    if (temaRows.length === 0) throw new Error(`El tema "${slugTema}" no existe en el catálogo.`);

    await pool.query(
      'INSERT IGNORE INTO grupo_temas (id_grupo, id_tema) VALUES (?, ?)',
      [id_grupo, temaRows[0].id_tema]
    );
  }

  public static async quitarTema(id_grupo: number, slugTema: string) {
    await pool.query(
      `DELETE gt FROM grupo_temas gt
         JOIN temas t ON t.id_tema = gt.id_tema
        WHERE gt.id_grupo = ? AND t.slug = ?`,
      [id_grupo, slugTema]
    );
  }

  // ── NIVELES ESPECÍFICOS ASIGNADOS AL GRUPO (tabla grupo_niveles) ──
  // La UI del maestro le llama "ejercicios" a esto, pero en realidad es
  // "qué niveles concretos, dentro de un tema ya asignado, puede jugar
  // el grupo". El frontend identifica cada nivel con un id compuesto
  // "slugDelTema-ordenDelNivel" (ej. "numeric-3"), así que estos métodos
  // traducen ese formato hacia/desde las tablas reales.

  public static async nivelesAsignados(id_grupo: number) {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT t.slug, n.orden
         FROM grupo_niveles gn
         JOIN niveles n ON n.id_nivel = gn.id_nivel
         JOIN temas t   ON t.id_tema  = n.id_tema
        WHERE gn.id_grupo = ?`,
      [id_grupo]
    );
    return rows.map(r => ({ id_ejercicio: `${r.slug}-${r.orden}` }));
  }

  public static async asignarNivel(id_grupo: number, slugTema: string, ordenNivel: number) {
    const [nivelRows] = await pool.query<RowDataPacket[]>(
      `SELECT n.id_nivel
         FROM niveles n
         JOIN temas t ON t.id_tema = n.id_tema
        WHERE t.slug = ? AND n.orden = ?`,
      [slugTema, ordenNivel]
    );
    if (nivelRows.length === 0) throw new Error(`No existe el nivel ${ordenNivel} del tema "${slugTema}".`);

    await pool.query(
      'INSERT IGNORE INTO grupo_niveles (id_grupo, id_nivel) VALUES (?, ?)',
      [id_grupo, nivelRows[0].id_nivel]
    );
  }

  public static async quitarNivel(id_grupo: number, slugTema: string, ordenNivel: number) {
    await pool.query(
      `DELETE gn FROM grupo_niveles gn
         JOIN niveles n ON n.id_nivel = gn.id_nivel
         JOIN temas t   ON t.id_tema  = n.id_tema
        WHERE gn.id_grupo = ? AND t.slug = ? AND n.orden = ?`,
      [id_grupo, slugTema, ordenNivel]
    );
  }

  // Elimina el grupo. `grupo_temas` y `grupo_niveles` se borran solos
  // (ON DELETE CASCADE), y los alumnos que estaban en el grupo quedan
  // como independientes (ON DELETE SET NULL en estudiantes.id_grupo).
  public static async eliminar(id_grupo: number): Promise<void> {
    await pool.query('DELETE FROM grupos WHERE id_grupo = ?', [id_grupo]);
  }
}