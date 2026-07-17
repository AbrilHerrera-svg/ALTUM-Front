// ============================================================
// tema.routes.ts — RUTAS DEL CATÁLOGO DE TEMAS
//
// Endpoints disponibles:
//   GET /api/temas?grado=4°              → temas del catálogo general para ese grado
//   GET /api/temas/:slug/niveles?grado=4° → niveles de un tema específico
// ============================================================

import { Router } from 'express';
import { TemaController } from '../controllers/TemaController';

const router     = Router();
const controller = new TemaController();

router.get('/', (req, res) => controller.obtenerTemasPorGrado(req, res));
router.get('/:slug/niveles', (req, res) => controller.obtenerNivelesDeTema(req, res));

export default router;