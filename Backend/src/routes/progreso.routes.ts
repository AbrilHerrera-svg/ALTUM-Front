// ============================================================
// progreso.routes.ts — RUTAS DE PROGRESO
//
// Endpoints disponibles:
//   GET  /api/progreso/:alumnoNombre → descarga el progreso de un alumno
//        Ejemplo: GET /api/progreso/Abril
//
//   POST /api/progreso/guardar       → guarda estrellas al terminar un nivel
//   POST /api/progreso/verificar     → verifica si la respuesta del alumno es correcta
//        (ambas POST usan el mismo método del controller, distingue por el body)
// ============================================================

import { Router } from 'express';
import { ProgresoController } from '../controllers/ProgresoController';

const router     = Router();
const controlador = new ProgresoController();

// GET: descarga el progreso completo de un alumno por su nombre
router.get('/:alumnoNombre', (req, res) => controlador.obtenerProgreso(req, res));

// POST guardar: se llama al terminar un nivel → recibe stars, topicId, levelIndex
router.post('/guardar',   (req, res) => controlador.guardarProgreso(req, res));

// POST verificar: se llama al responder una pregunta → recibe respuestaUsuario, exerciseIndex
// Usa el mismo método que /guardar porque el controller distingue el caso por el body
router.post('/verificar', (req, res) => controlador.guardarProgreso(req, res));

// DELETE: borra TODO el progreso guardado de un alumno (botón "Borrar mi progreso")
router.delete('/:idUsuario', (req, res) => controlador.borrarProgreso(req, res));

export default router;