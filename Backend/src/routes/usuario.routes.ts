// ============================================================
// usuario.routes.ts — RUTAS DE USUARIOS
// Mapea cada URL + método HTTP a su función en el controller.
// Es como una guía de teléfonos: "esta dirección → este controller"
//
// Endpoints disponibles:
//   GET    /api/usuarios       → lista todos los usuarios
//   POST   /api/usuarios       → crea/loguea un usuario
//   PUT    /api/usuarios/:id   → actualiza un usuario por su ID
//   DELETE /api/usuarios/:id   → elimina un usuario por su ID
// ============================================================

import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router     = Router();                // Router() crea un "mini-servidor" solo para estas rutas
const controller = new UsuarioController(); // instanciamos el controller para usar sus métodos

// Cada línea conecta: MÉTODO + URL → función del controller
// (req, res) => es necesario para que TypeScript pase los tipos correctamente
router.get('/',      (req, res) => controller.listar(req, res));    // GET    /api/usuarios
router.post('/login',(req, res) => controller.login(req, res));     // POST   /api/usuarios/login
router.post('/',     (req, res) => controller.crear(req, res));     // POST   /api/usuarios
router.put('/:id',   (req, res) => controller.actualizar(req, res));// PUT    /api/usuarios/5
router.put('/:id/password', (req, res) => controller.cambiarContrasena(req, res)); // PUT /api/usuarios/5/password
router.delete('/:id',(req, res) => controller.eliminar(req, res));  // DELETE /api/usuarios/5
// /:id es un parámetro dinámico → el número cambia según el usuario
// Se lee desde el controller con: req.params.id

export default router; // exportamos para que index.ts pueda registrarlo con app.use()