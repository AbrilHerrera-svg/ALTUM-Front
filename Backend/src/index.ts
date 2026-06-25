import express from 'express';
import cors from 'cors';
import pool from './config/db';
import { setupRoutes } from './usuarios.routes'; // <-- Importa tus rutas corregidas

const app = express();
const PORT = 3000;

// 🔓 MIDDLEWARES (¡Van antes de las rutas!)
app.use(cors()); // Permite que React (puerto 5173) se comunique con Node (puerto 3000)
app.use(express.json()); // Permite que tu backend entienda los JSON que envía el Fetch

// 🛣️ RUTAS
// Le pasamos el pool de MySQL a tu archivo de rutas
app.use('/usuarios', setupRoutes(pool));

// ARRANCAR SERVIDOR

app.listen(PORT, () => {
  
  console.log('🚀 Servidor Express ejecutándose con éxito');
  console.log(`🌐 Dirección local: http://localhost:${PORT}`);
  
});