import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { EjercicioController } from '../controllers/EjercicioController';
const router = Router();
const controller = new UsuarioController();
const controlador = new EjercicioController();

// Mapeo de Endpoints REST estándar con req y res
router.get('/', (req, res) => controller.listar(req, res));
router.post('/', (req, res) => controller.crear(req, res));
router.put('/:id', (req, res) => controller.actualizar(req, res));
router.delete('/:id', (req, res) => controller.eliminar(req, res));
router.get('/:tema/:nivel', (req, res) => controlador.obtenerPorTemaYNivel(req, res));

// 🚨 ESTA LÍNEA ES LA MÁS IMPORTANTE, ASEGÚRATE DE QUE QUEDE ASÍ:
export default router;