import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { EjercicioController } from '../controllers/EjercicioController';
const router = Router();
const controller = new UsuarioController();
const controlador = new EjercicioController();


router.get('/', (req, res) => controller.listar(req, res));
router.post('/', (req, res) => controller.crear(req, res));
router.put('/:id', (req, res) => controller.actualizar(req, res));
router.delete('/:id', (req, res) => controller.eliminar(req, res));
router.get('/:tema/:nivel', (req, res) => controlador.obtenerPorTemaYNivel(req, res));


export default router;