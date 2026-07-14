import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';

const router = Router();

// Gestión de grupos
router.post('/grupos', TeacherController.createGrupo);
router.get('/grupos/:id', TeacherController.getGrupo);
router.get('/mis-grupos/:id_profesor', TeacherController.getMisGrupos);
router.get('/mi-grupo/:correo', TeacherController.getGrupoDeEstudiante);

// Gestión de estudiantes en grupos
router.post('/grupos/:id/estudiantes', TeacherController.addEstudianteToGrupo);
router.delete('/grupos/:id/estudiantes/:id_usuario', TeacherController.removeEstudianteFromGrupo);

// Gestión de temas en grupos
router.post('/grupos/:id/temas', TeacherController.assignTemaToGrupo);
router.delete('/grupos/:id/temas/:id_tema', TeacherController.removeTemaFromGrupo);

// Gestión de ejercicios en grupos
router.post('/grupos/:id/ejercicios', TeacherController.assignEjercicioToGrupo);
router.delete('/grupos/:id/ejercicios/:id_ejercicio', TeacherController.removeEjercicioFromGrupo);

export default router;
