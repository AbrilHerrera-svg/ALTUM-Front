import { Router } from 'express';
import { TeacherController } from '../controllers/TeacherController';

const router     = Router();
const controller = new TeacherController(); // ← esto faltaba: los métodos son de instancia, no static

// Gestión de grupos
router.post('/grupos', (req, res) => controller.createGrupo(req, res));
router.get('/grupos/:id', (req, res) => controller.getGrupo(req, res));
router.get('/mis-grupos/:id_tutor', (req, res) => controller.getMisGrupos(req, res));
router.get('/mi-grupo/:id_estudiante', (req, res) => controller.getGrupoDeEstudiante(req, res));

// Gestión de estudiantes en grupos
router.get('/grupos/:id/estudiantes', (req, res) => controller.getEstudiantesDeGrupo(req, res));
router.post('/grupos/:id/estudiantes', (req, res) => controller.addEstudianteToGrupo(req, res));
router.delete('/grupos/:id/estudiantes/:id_usuario', (req, res) => controller.removeEstudianteFromGrupo(req, res));

// Gestión de temas en grupos
router.post('/grupos/:id/temas', (req, res) => controller.assignTemaToGrupo(req, res));
router.delete('/grupos/:id/temas/:id_tema', (req, res) => controller.removeTemaFromGrupo(req, res));

// Gestión de ejercicios en grupos (pendiente de diseño — ver TeacherController)
router.post('/grupos/:id/ejercicios', (req, res) => controller.assignEjercicioToGrupo(req, res));
router.delete('/grupos/:id/ejercicios/:id_ejercicio', (req, res) => controller.removeEjercicioFromGrupo(req, res));

export default router;