import express from 'express';
import mysql from 'mysql2/promise';
import { setupRoutes } from './usuarios.routes';

const app = express();
const PORT = 3000;

app.use(express.json());

// Conexión a tu XAMPP
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'altum',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Conectamos las rutas usando el prefijo '/usuarios'
app.use('/usuarios', setupRoutes(pool));

app.get('/', (req, res) => {
  res.send('Backend corriendo de forma modular.');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});