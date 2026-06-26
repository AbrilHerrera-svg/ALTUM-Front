import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();
const controller = new UsuarioController();

// Mapeo de Endpoints REST
router.get('/', (req, res) => controller.listar(req, res));
router.post('/', (req, res) => controller.crear(req, res));
router.put('/:id', (req, res) => controller.actualizar(req, res));
router.delete('/:id', (req, res) => controller.eliminar(req, res));

export default router;