
import { Router } from 'express';
import { ProgresoController } from '../controllers/ProgresoController';

const router = Router();
const controlador = new ProgresoController();

// Ruta GET
router.get('/:alumnoNombre', (req, res) => controlador.obtenerProgreso(req, res));

// Ruta POST
router.post('/guardar', (req, res) => controlador.guardarProgreso(req, res));
router.post('/verificar', (req, res) => controlador.guardarProgreso(req, res));
export default router;