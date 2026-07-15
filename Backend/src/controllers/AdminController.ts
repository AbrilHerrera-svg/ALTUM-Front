// ============================================================
// AdminController.ts — "recepcionista" del panel de administrador.
// Ya NO guarda nada en un arreglo en RAM: todo vive en MySQL a
// través de AdminManager, sobre las mismas tablas del catálogo real.
// ============================================================

import { Request, Response } from 'express';
import { AdminManager } from '../services/AdminManager';

export class AdminController {

  // GET /api/admin/ejercicios - Listar todos los ejercicios
  static async getEjercicios(req: Request, res: Response) {
    try {
      const data = await AdminManager.listarEjercicios();
      res.json({ message: 'GET todos los ejercicios', data });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener ejercicios', detalle: error.message });
    }
  }

  // POST /api/admin/ejercicios - Crear nuevo ejercicio
  static async createEjercicio(req: Request, res: Response) {
    try {
      const { descripcion, tip, id_tema, id_nivel, grado, options, correct } = req.body;

      if (!descripcion) {
        res.status(400).json({ error: 'Falta el campo obligatorio: descripcion' });
        return;
      }
      if (!id_tema || id_nivel === undefined || id_nivel === '' || !grado) {
        res.status(400).json({ error: 'Faltan id_tema, id_nivel o grado' });
        return;
      }

      const error = AdminController.validarOpciones(options, correct);
      if (error) {
        res.status(400).json({ error });
        return;
      }

      const nuevo = await AdminManager.crearEjercicio({ descripcion, tip, id_tema, id_nivel, grado, options, correct });
      res.status(201).json({ message: 'Ejercicio creado', data: nuevo });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al crear ejercicio', detalle: error.message });
    }
  }

  // PUT /api/admin/ejercicios/:id - Editar ejercicio
  static async updateEjercicio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { descripcion, tip, id_tema, id_nivel, grado, options, correct } = req.body;

      if (!id_tema || id_nivel === undefined || id_nivel === '' || !grado) {
        res.status(400).json({ error: 'Faltan id_tema, id_nivel o grado' });
        return;
      }

      const error = AdminController.validarOpciones(options, correct);
      if (error) {
        res.status(400).json({ error });
        return;
      }

      const actualizado = await AdminManager.actualizarEjercicio(Number(id), { descripcion, tip, id_tema, id_nivel, grado, options, correct });
      res.json({ message: `Ejercicio ${id} actualizado`, data: actualizado });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al actualizar ejercicio', detalle: error.message });
    }
  }

  // Valida que vengan exactamente 4 respuestas no vacías y que "correct" sea una de ellas
  private static validarOpciones(options: any, correct: any): string | null {
    if (!Array.isArray(options) || options.length !== 4 || options.some((op: any) => !op || !String(op).trim())) {
      return 'Debes ingresar las 4 respuestas';
    }
    if (!correct || !options.includes(correct)) {
      return 'Debes elegir cuál respuesta es la correcta';
    }
    return null;
  }

  // DELETE /api/admin/ejercicios/:id - Eliminar ejercicio
  static async deleteEjercicio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await AdminManager.eliminarEjercicio(Number(id));
      res.json({ message: `Ejercicio ${id} eliminado` });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al eliminar ejercicio', detalle: error.message });
    }
  }
}