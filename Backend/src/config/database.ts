// ============================================================
// database.ts — CONFIGURACIÓN DE LA BASE DE DATOS (patrón Taller Mecánico)
// Reemplaza a db.ts. Ahora apunta a la base de datos REAL "altum"
// (la del script crear_altum.sql), no a "proyecto_educativo".
// ============================================================

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host:     'localhost',
  user:     'root',
  password: 'root',        // pon aquí tu contraseña de MySQL si tienes una
  database: 'altum',   // ← antes decía 'proyecto_educativo'

  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0
});

pool.getConnection()
  .then(connection => {
    console.log('¡Conexión exitosa a MySQL (altum)! 💾🚀');
    connection.release();
  })
  .catch(error => {
    console.error('Error crítico al conectarse a MySQL:', error.message);
  });

export default pool;