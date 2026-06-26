import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'proyecto_educativo', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 🔍 PRUEBA DE CONEXIÓN AUTOMÁTICA
pool.getConnection()
  .then(connection => {
    console.log('¡Conexión exitosa a MySQL (proyecto_educativo)! 💾🚀');
    connection.release(); // Libera la conexión para que otros la usen
  })
  .catch(error => {
    console.error('Error crítico al conectarse a MySQL:', error.message);
  });

export default pool;