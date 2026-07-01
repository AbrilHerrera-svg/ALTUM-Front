// ============================================================
// db.ts — CONFIGURACIÓN DE LA BASE DE DATOS
// Este archivo crea la conexión a MySQL y la exporta para que
// otros archivos puedan usarla sin tener que reconectarse.
// ============================================================

import mysql from 'mysql2/promise'; // mysql2 es el driver que conecta Node.js con MySQL
                                    // /promise significa que soporta async/await

// createPool crea un GRUPO de conexiones reutilizables.
// Es más eficiente que abrir y cerrar una conexión por cada petición.
// Imagínalo como tener 10 teléfonos disponibles en lugar de solo 1.
const pool = mysql.createPool({
  host:     'localhost',           // dónde está MySQL (en la misma computadora)
  user:     'root',                // usuario de MySQL
  password: '',                    // contraseña (vacía en entorno local)
  database: 'proyecto_educativo',  // nombre de la base de datos a usar

  waitForConnections: true, // si todas las conexiones están ocupadas, espera en vez de fallar
  connectionLimit:    10,   // máximo 10 conexiones simultáneas abiertas
  queueLimit:         0     // 0 = cola ilimitada de peticiones esperando turno
});

// Prueba automática al arrancar el servidor:
// Intenta agarrar una conexión para verificar que MySQL esté disponible
pool.getConnection()
  .then(connection => {
    console.log('¡Conexión exitosa a MySQL (proyecto_educativo)! 💾🚀');
    connection.release(); // IMPORTANTE: devuelve la conexión al pool para que otros la usen
  })
  .catch(error => {
    console.error('Error crítico al conectarse a MySQL:', error.message);
  });

export default pool; // Exportamos el pool para usarlo en controllers y routes
