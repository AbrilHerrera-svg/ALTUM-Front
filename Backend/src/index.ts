import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuario.routes';
import ejercicioRoutes from './routes/ejercicio.routes';
import progresoRoutes from './routes/progreso.routes'; // <-- CAMBIA ESTA LÍNEA

const app = express();
const PORT = 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Enrutadores de la API
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ejercicios', ejercicioRoutes); // <-- CAMBIA ESTA LÍNEA

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en: http://localhost:${PORT}`);
});
app.use('/api/progreso', progresoRoutes);