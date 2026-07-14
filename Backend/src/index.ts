// ============================================================
// index.ts — PUNTO DE ENTRADA DEL SERVIDOR
// Este archivo es el primero que se ejecuta cuando corres el backend.
// Su trabajo es: crear el servidor, activar middlewares y registrar rutas.
// ============================================================

import express from 'express'; // Express es el framework que nos permite crear el servidor web
import cors from 'cors';        // CORS permite que el frontend (puerto 5173) hable con el backend (puerto 3000)
                                // Sin esto, el navegador bloquearía todas las peticiones entre puertos distintos

// Importamos los archivos de rutas — cada uno agrupa las URLs de un tema
import usuariosRoutes  from './routes/usuario.routes';
import ejercicioRoutes from './routes/ejercicio.routes';
import progresoRoutes  from './routes/progreso.routes';
import adminRoutes     from './routes/admin.routes';
import teacherRoutes   from './routes/teacher.routes';

const app  = express(); // Creamos la aplicación de Express (el servidor)
const PORT = 3000;      // Puerto donde escuchará el servidor. El frontend lo llama en http://localhost:3000

// ── MIDDLEWARES ──────────────────────────────────────────────
// Los middlewares son funciones que se ejecutan ANTES de que llegue cada petición al controller.
// Es como una cadena de filtros/preparativos.

app.use(cors());           // Activa CORS → permite peticiones desde cualquier origen (el frontend)
app.use(express.json());   // Activa el lector de JSON → sin esto, req.body llegaría como undefined

// ── RUTAS ───────────────────────────────────────────────────
// Aquí le decimos al servidor: "si la URL empieza con X, usa este archivo de rutas"

app.use('/api/usuarios',   usuariosRoutes);  // GET/POST/PUT/DELETE /api/usuarios
app.use('/api/ejercicios', ejercicioRoutes); // GET /api/ejercicios/:tema/:nivel
app.use('/api/progreso',   progresoRoutes);  // GET/POST /api/progreso
app.use('/api/admin',      adminRoutes);     // GET/POST/PUT/DELETE /api/admin/ejercicios
app.use('/api/teacher',    teacherRoutes);   // Gestión de grupos y asignaciones

// ── ARRANCAR EL SERVIDOR ─────────────────────────────────────
// .listen() hace que el servidor empiece a esperar peticiones en el puerto indicado
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en: http://localhost:${PORT}`);
});
