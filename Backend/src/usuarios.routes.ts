import { Router, Request, Response } from 'express';
import mysql from 'mysql2/promise';

const router = Router();

// Reutilizamos el pool de conexión (Pasado desde el archivo principal)
export const setupRoutes = (pool: mysql.Pool) => {

  // 1. Obtener todos los usuarios
  router.get('/', async (req: Request, res: Response) => {
    try {
      const [rows] = await pool.query(`
        SELECT u.id_usuario, u.nombre, u.apellidos, u.correo, u.grado, r.nombre_rol 
        FROM USUARIOS u
        LEFT JOIN ROLES r ON u.id_rol = r.id_rol
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  });

  // 2. Registrar usuario
  router.post('/', async (req: Request, res: Response) => {
    const { nombre, apellidos, correo, contrasena, grado, id_rol } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO USUARIOS (nombre, apellidos, correo, contrasena, grado, id_rol) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, apellidos, correo, contrasena, grado, id_rol]
      );
      res.status(201).json({ message: 'Usuario creado con éxito', id: (result as any).insertId });
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el usuario' });
    }
  });

  // 3. ENDPOINT DE LOGIN (POST)
  router.post('/login', async (req: Request, res: Response) : Promise<any> => {
    const { correo, contrasena } = req.body;

    // Validación básica si faltan campos
    if (!correo || !contrasena) {
      return res.status(400).json({ error: 'Faltan correo o contraseña' });
    }

    try {
      // Buscamos al usuario por su correo en la base de datos
      const [rows] = await pool.query('SELECT * FROM USUARIOS WHERE correo = ?', [correo]);
      const usuarios = rows as any[];

      // Si no encuentra ninguna coincidencia
      if (usuarios.length === 0) {
        return res.status(401).json({ error: 'El correo electrónico no está registrado' });
      }

      const usuario = usuarios[0];

      // Verificamos si la contraseña coincide (Texto plano por ahora para simplificar)
      if (usuario.contrasena !== contrasena) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      // Si todo coincide, devolvemos los datos del usuario con éxito
      res.json({
        message: '¡Login exitoso!',
        usuario: {
          id_usuario: usuario.id_usuario,
          nombre: usuario.nombre,
          correo: usuario.correo,
          id_rol: usuario.id_rol
        }
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno en el servidor durante el login' });
    }
  });

  return router;
};