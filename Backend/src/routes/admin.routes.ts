import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';

const router = Router();

// CRUD de ejercicios
router.get('/ejercicios', AdminController.getEjercicios);
router.post('/ejercicios', AdminController.createEjercicio);
router.put('/ejercicios/:id', AdminController.updateEjercicio);
router.delete('/ejercicios/:id', AdminController.deleteEjercicio);

export default router;
