// ============================================================
// UsuarioController.ts — "RECEPCIONISTA" (patrón ServicioController.ts
// de Taller Mecánico). Ya NO conoce SQL ni arreglos en memoria:
// solo recibe la petición, llama al Manager, y responde JSON.
// ============================================================

import { Request, Response } from 'express';
import { UsuarioManager } from '../services/UsuarioManager';

export class UsuarioController {

  // ── LISTAR → GET /api/usuarios ────────────────────────────────
  public async listar(req: Request, res: Response): Promise<void> {
    try {
      const usuarios = await UsuarioManager.listarTodos();
      res.status(200).json(usuarios);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al listar usuarios', detalle: error.message });
    }
  }

  // ── LOGIN → POST /api/usuarios/login ─────────────────────────
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { correo, contrasena } = req.body;

      if (!correo || !contrasena) {
        res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
        return;
      }

      const usuario = await UsuarioManager.buscarPorCorreo(correo);

      if (!usuario || usuario.contrasena !== contrasena) {
        res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        return;
      }

      res.status(200).json({ mensaje: 'Sesión iniciada', usuario });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al iniciar sesión', detalle: error.message });
    }
  }

  // ── CREAR / REGISTRAR → POST /api/usuarios ───────────────────
  // Si el nombre ya existe, actúa como login (igual que la versión en memoria)
  public async crear(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, grado, correo, role, contrasena, classCode } = req.body;

      if (!nombre) {
        res.status(400).json({ error: 'Falta el campo obligatorio: nombre' });
        return;
      }

      const existente = await UsuarioManager.buscarPorNombre(nombre);
      if (existente) {
        res.status(200).json({
          mensaje: 'Sesión iniciada (Usuario ya existía)',
          usuario: existente,
        });
        return;
      }

      const nuevo = await UsuarioManager.crear({
        nombre,
        correo: correo || '',
        contrasena: contrasena || '',
        role: role || 'estudiante',
        grado,
        classCode,
      });

      res.status(201).json({ mensaje: 'Creado con éxito', usuario: nuevo });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al crear usuario', detalle: error.message });
    }
  }

  // ── ACTUALIZAR → PUT /api/usuarios/:id ────────────────────────
  public async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nombre, correo, grado, avatar } = req.body;

      const actualizado = await UsuarioManager.actualizar(Number(id), { nombre, correo, grado, avatar });

      if (!actualizado) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.status(200).json({ mensaje: 'Actualizado con éxito', usuario: actualizado });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al actualizar usuario', detalle: error.message });
    }
  }

  // ── CAMBIAR CONTRASEÑA → PUT /api/usuarios/:id/password ──────
  public async cambiarContrasena(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { contrasenaActual, contrasenaNueva } = req.body;

      if (!contrasenaActual || !contrasenaNueva) {
        res.status(400).json({ error: 'Faltan datos: contraseñaActual y contraseñaNueva son obligatorios' });
        return;
      }

      const ok = await UsuarioManager.cambiarContrasena(Number(id), contrasenaActual, contrasenaNueva);

      if (!ok) {
        res.status(401).json({ error: 'La contraseña actual es incorrecta' });
        return;
      }

      res.status(200).json({ mensaje: 'Contraseña actualizada con éxito' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al cambiar la contraseña', detalle: error.message });
    }
  }

  // ── RECUPERAR CONTRASEÑA (sin correo real) → POST /api/usuarios/recuperar ──
  // Verifica correo + nombre completo (los mismos datos del registro).
  // Si coinciden, deja poner una contraseña nueva directo, sin correo de por medio.
  public async recuperarContrasena(req: Request, res: Response): Promise<void> {
    try {
      const { correo, nombre, contrasenaNueva } = req.body;

      if (!correo || !nombre || !contrasenaNueva) {
        res.status(400).json({ error: 'Faltan datos: correo, nombre y contraseñaNueva son obligatorios' });
        return;
      }

      const ok = await UsuarioManager.recuperarContrasena(correo, nombre, contrasenaNueva);

      if (!ok) {
        res.status(404).json({ error: 'No encontramos una cuenta con ese correo y nombre. Revisa que estén escritos igual que al registrarte.' });
        return;
      }

      res.status(200).json({ mensaje: 'Contraseña actualizada con éxito' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al recuperar la contraseña', detalle: error.message });
    }
  }

  // ── ELIMINAR → DELETE /api/usuarios/:id ──────────────────────
  public async eliminar(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await UsuarioManager.eliminar(Number(id));
      res.status(200).json({ mensaje: 'Usuario eliminado' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al eliminar usuario', detalle: error.message });
    }
  }
}