// ============================================================
// UsuarioManager.ts — CAPA DE SERVICIO (equivalente a ServicioManager.ts
// en Taller Mecánico). Aquí, y solo aquí, se ejecuta SQL real contra
// la base de datos "altum". El controller ya NO sabe nada de SQL.
// ============================================================

import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface UsuarioRow extends RowDataPacket {
  id_usuario: number;
  nombre:     string;
  correo:     string;
  contrasena: string;
  id_rol:     number;
  nombre_rol: string;
  grado:      string | null; // viene de estudiantes.id_grado → grados.nombre_grado (LEFT JOIN, null si no es estudiante)
}

export class UsuarioManager {

  // Traduce el nombre del rol ('estudiante' | 'tutor' | 'administrador') a su id_rol.
  // Requiere que la tabla `roles` ya tenga sembradas esas 3 filas:
  //   INSERT INTO roles (nombre_rol) VALUES ('estudiante'), ('tutor'), ('administrador');
  private static async obtenerIdRol(nombreRol: string): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id_rol FROM roles WHERE nombre_rol = ?',
      [nombreRol]
    );
    if (rows.length === 0) {
      throw new Error(`El rol "${nombreRol}" no existe en la tabla roles. Siémbralo primero.`);
    }
    return rows[0].id_rol;
  }

  // Lista todos los usuarios (usado por el registro para checar correos duplicados
  // y por vistas de administración).
  public static async listarTodos(): Promise<UsuarioRow[]> {
    const [rows] = await pool.query<UsuarioRow[]>(
      `SELECT u.*, r.nombre_rol, g.nombre_grado AS grado
         FROM usuarios u
         JOIN roles r ON r.id_rol = u.id_rol
         LEFT JOIN estudiantes e ON e.id_usuario = u.id_usuario
         LEFT JOIN grados g ON g.id_grado = e.id_grado
        ORDER BY u.id_usuario ASC`
    );
    return rows;
  }

  public static async buscarPorId(id: number): Promise<UsuarioRow | null> {
    const [rows] = await pool.query<UsuarioRow[]>(
      `SELECT u.*, r.nombre_rol, g.nombre_grado AS grado
         FROM usuarios u
         JOIN roles r ON r.id_rol = u.id_rol
         LEFT JOIN estudiantes e ON e.id_usuario = u.id_usuario
         LEFT JOIN grados g ON g.id_grado = e.id_grado
        WHERE u.id_usuario = ? LIMIT 1`,
      [id]
    );
    return rows[0] ?? null;
  }

  public static async buscarPorNombre(nombre: string): Promise<UsuarioRow | null> {
    const [rows] = await pool.query<UsuarioRow[]>(
      `SELECT u.*, r.nombre_rol, g.nombre_grado AS grado
         FROM usuarios u
         JOIN roles r ON r.id_rol = u.id_rol
         LEFT JOIN estudiantes e ON e.id_usuario = u.id_usuario
         LEFT JOIN grados g ON g.id_grado = e.id_grado
        WHERE u.nombre = ? LIMIT 1`,
      [nombre]
    );
    return rows[0] ?? null;
  }

  public static async buscarPorCorreo(correo: string): Promise<UsuarioRow | null> {
    const [rows] = await pool.query<UsuarioRow[]>(
      `SELECT u.*, r.nombre_rol, g.nombre_grado AS grado
         FROM usuarios u
         JOIN roles r ON r.id_rol = u.id_rol
         LEFT JOIN estudiantes e ON e.id_usuario = u.id_usuario
         LEFT JOIN grados g ON g.id_grado = e.id_grado
        WHERE u.correo = ? LIMIT 1`,
      [correo]
    );
    return rows[0] ?? null;
  }

  // Crea el usuario base y, según el rol, también su fila en la
  // tabla de especialización (estudiantes o tutores).
  public static async crear(datos: {
    nombre: string;
    correo: string;
    contrasena: string;
    role: 'estudiante' | 'tutor' | 'administrador';
    grado?: string;
    classCode?: string; // código de grupo, solo aplica si role === 'estudiante'
  }): Promise<UsuarioRow | null> {
    const id_rol = await this.obtenerIdRol(datos.role);

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO usuarios (nombre, correo, contrasena, id_rol) VALUES (?, ?, ?, ?)',
      [datos.nombre, datos.correo, datos.contrasena, id_rol]
    );
    const id_usuario = result.insertId;

    if (datos.role === 'estudiante') {
      let id_grado: number | null = null;
      if (datos.grado) {
        const [gradoRows] = await pool.query<RowDataPacket[]>(
          'SELECT id_grado FROM grados WHERE nombre_grado = ?',
          [datos.grado]
        );
        id_grado = gradoRows[0]?.id_grado ?? null;
      }

      let id_grupo: number | null = null;
      if (datos.classCode && datos.classCode.trim()) {
        const [grupoRows] = await pool.query<RowDataPacket[]>(
          'SELECT id_grupo FROM grupos WHERE codigo_grupo = ?',
          [datos.classCode.trim().toUpperCase()]
        );
        id_grupo = grupoRows[0]?.id_grupo ?? null;
      }

      await pool.query(
        'INSERT INTO estudiantes (id_usuario, id_grado, id_grupo) VALUES (?, ?, ?)',
        [id_usuario, id_grado, id_grupo]
      );
    }

    if (datos.role === 'tutor') {
      await pool.query('INSERT INTO tutores (id_usuario) VALUES (?)', [id_usuario]);
    }

    return this.buscarPorId(id_usuario);
  }

  public static async actualizar(
    id: number,
    datos: { nombre: string; correo: string; grado?: string; avatar?: string }
  ): Promise<UsuarioRow | null> {
    await pool.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, avatar = COALESCE(?, avatar) WHERE id_usuario = ?',
      [datos.nombre, datos.correo, datos.avatar || null, id]
    );

    // Si mandaron grado, actualiza estudiantes.id_grado (solo aplica si es estudiante;
    // si el usuario no tiene fila en `estudiantes`, este UPDATE simplemente no afecta filas).
    if (datos.grado) {
      const [gradoRows] = await pool.query<RowDataPacket[]>(
        'SELECT id_grado FROM grados WHERE nombre_grado = ?',
        [datos.grado]
      );
      const id_grado = gradoRows[0]?.id_grado ?? null;
      if (id_grado !== null) {
        await pool.query(
          'UPDATE estudiantes SET id_grado = ? WHERE id_usuario = ?',
          [id_grado, id]
        );
      }
    }

    return this.buscarPorId(id);
  }

  // Verifica la contraseña actual y, si coincide, guarda la nueva.
  // Devuelve false si el usuario no existe o la contraseña actual no coincide.
  public static async cambiarContrasena(
    id: number,
    contrasenaActual: string,
    contrasenaNueva: string
  ): Promise<boolean> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT contrasena FROM usuarios WHERE id_usuario = ? LIMIT 1',
      [id]
    );
    const usuario = rows[0];

    if (!usuario || usuario.contrasena !== contrasenaActual) {
      return false;
    }

    await pool.query(
      'UPDATE usuarios SET contrasena = ? WHERE id_usuario = ?',
      [contrasenaNueva, id]
    );
    return true;
  }

  public static async eliminar(id: number): Promise<void> {
    // ON DELETE CASCADE en tu script se encarga de estudiantes/tutores/medallas/estrellas
    await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
  }
}