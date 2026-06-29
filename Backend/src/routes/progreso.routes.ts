
import { Router } from 'express';
import { ProgresoController } from '../controllers/ProgresoController';

const router = Router();
const controlador = new ProgresoController();

// Ruta GET para leer: http://localhost:3000/api/progreso/Melina
router.get('/:alumnoNombre', (req, res) => controlador.obtenerProgreso(req, res));

// Ruta POST para guardar: http://localhost:3000/api/progreso/guardar
router.post('/guardar', (req, res) => controlador.guardarProgreso(req, res));
router.post('/verificar', (req, res) => controlador.guardarProgreso(req, res));
export default router;