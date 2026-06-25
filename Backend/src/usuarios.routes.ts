import { Router } from 'express';
import { Pool } from 'mysql2/promise';

export function setupRoutes(pool: Pool) {
  const router = Router();

  // 1. 📝 RUTA PARA REGISTRAR (GUARDAR) USUARIO
  router.post('/registro', async (req, res) => {
    const { nombre, apellidos, correo, contraseña, grado, id_rol } = req.body;

    if (!nombre || !apellidos || !correo || !contraseña || !id_rol) {
      return res.status(400).json({ error: 'Faltan campos obligatorios en la petición.' });
    }

    try {
      // Cambiado 'usuarios' por 'USUARIOS' en mayúsculas para coincidir con tu script SQL
      const query = `
        INSERT INTO USUARIOS (nombre, apellidos, correo, contraseña, grado, id_rol) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      await pool.query(query, [
        nombre,
        apellidos,
        correo.toLowerCase(),
        contraseña,
        grado || null, 
        id_rol         
      ]);

      return res.status(201).json({ mensaje: '¡Usuario guardado con éxito! 🎉' });

    } catch (error: any) {
      console.error('Error al insertar en MySQL:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Este correo ya existe.' });
      }
      return res.status(500).json({ error: 'Hubo un error en la base de datos.' });
    }
  });

  // 2. 🔑 RUTA PARA EL LOGIN
  router.post('/login', async (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      return res.status(400).json({ error: 'Por favor, escribe tu correo y contraseña.' });
    }

    try {
      // Cambiado 'usuarios' por 'USUARIOS'
      const [rows]: any = await pool.query('SELECT * FROM USUARIOS WHERE correo = ?', [correo.toLowerCase()]);

      if (rows.length === 0) {
        return res.status(404).json({ error: 'El usuario no existe.' });
      }

      const usuarioBD = rows[0];

      if (usuarioBD.contraseña !== contraseña) {
        return res.status(401).json({ error: 'Contraseña incorrecta.' });
      }

      return res.status(200).json({
        mensaje: '¡Login correcto! 🎉',
        usuario: {
          nombre: usuarioBD.nombre,
          grado: usuarioBD.grado,
          correo: usuarioBD.correo
        }
      });

    } catch (error) {
      console.error('Error en el login:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  });

  return router;
}