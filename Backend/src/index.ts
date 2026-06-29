import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuario.routes';
import ejercicioRoutes from './routes/ejercicio.routes';
import progresoRoutes from './routes/progreso.routes'; 

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ejercicios', ejercicioRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en: http://localhost:${PORT}`);
});
app.use('/api/progreso', progresoRoutes);