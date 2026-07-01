// ============================================================
// ejercicio.routes.ts — RUTAS DE EJERCICIOS
//
// Endpoint disponible:
//   GET /api/ejercicios/:tema/:nivel
//   Ejemplo: GET /api/ejercicios/numeric/2
//            → devuelve las 4 preguntas del nivel 2 del tema "numeric"
//
// El frontend llama a esta ruta al entrar a un nivel para descargar las preguntas.
// ============================================================

import { Router } from 'express';
import { UsuarioController }  from '../controllers/UsuarioController';
import { EjercicioController } from '../controllers/EjercicioController';

const router     = Router();
const controller  = new UsuarioController();
const controlador = new EjercicioController();

// Rutas de usuarios (heredadas aquí también)
router.get('/',      (req, res) => controller.listar(req, res));
router.post('/',     (req, res) => controller.crear(req, res));
router.put('/:id',   (req, res) => controller.actualizar(req, res));
router.delete('/:id',(req, res) => controller.eliminar(req, res));

// Ruta principal de ejercicios:
// :tema  → id del tema   (ej: "proportionality", "numeric", "statistics"...)
// :nivel → índice 0-7    (ej: 0 = primer nivel, 7 = desafío final)
router.get('/:tema/:nivel', (req, res) => controlador.obtenerPorTemaYNivel(req, res));

export default router;
