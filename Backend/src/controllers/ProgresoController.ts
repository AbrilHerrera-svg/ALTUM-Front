// ============================================================
// ProgresoController.ts — refactorizado al patrón "recepcionista"
// (igual que UsuarioController/TeacherController). Ya NO guarda nada
// en un objeto en RAM: todo vive en MySQL vía ProgresoManager.
//
// Mantenemos el mismo "alumnoNombre" que ya usa el frontend en
// services/api.ts, para no tener que tocar las vistas: aquí adentro
// lo traducimos a id_usuario antes de hablar con la base de datos.
// ============================================================

import { Request, Response } from 'express';
import { EjercicioController } from './EjercicioController';
import { ProgresoManager } from '../services/ProgresoManager';
import { UsuarioManager } from '../services/UsuarioManager';

export class ProgresoController {

  // ── OBTENER PROGRESO → GET /api/progreso/:alumnoNombre ───────
  public async obtenerProgreso(req: Request, res: Response): Promise<void> {
    try {
      const { alumnoNombre } = req.params;

      if (typeof alumnoNombre !== 'string' || !alumnoNombre.trim()) {
        res.status(400).json({ error: 'Falta el nombre del alumno' });
        return;
      }

      const usuario = await UsuarioManager.buscarPorNombre(alumnoNombre);
      if (!usuario) {
        // Igual que antes: si el alumno no existe todavía, no es un error fatal.
        res.status(200).json({});
        return;
      }

      const progreso = await ProgresoManager.obtenerPorUsuario(usuario.id_usuario);
      res.status(200).json(progreso);
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener el progreso', detalle: error.message });
    }
  }

  // ── GUARDAR / VERIFICAR → POST /api/progreso/guardar y /verificar ─
  public async guardarProgreso(req: Request, res: Response): Promise<void> {
    try {
      const { alumnoNombre, userGrade, topicId, levelIndex, exerciseIndex, respuestaUsuario, stars } = req.body;
      const levelIdx = Number(levelIndex);

      if (!alumnoNombre || !topicId || levelIndex === undefined) {
        res.status(400).json({ error: 'Faltan datos requeridos.' });
        return;
      }

      // ── CASO A: llegaron estrellas → nivel completado, se persiste ──
      if (stars !== undefined) {
        const usuario = await UsuarioManager.buscarPorNombre(alumnoNombre);
        if (!usuario) {
          res.status(404).json({ error: 'Alumno no encontrado' });
          return;
        }

        const temaProgreso = await ProgresoManager.guardarNivel({
          id_usuario: usuario.id_usuario,
          grado: this.normalizeGrade(userGrade),
          tema_key: topicId,
          nivel_idx: levelIdx,
          estrellas: Number(stars),
        });

        res.status(200).json({ success: true, progresoActualizado: temaProgreso });
        return;
      }

      // ── CASO B: verificar si la respuesta es correcta (sin tocar DB) ──
      const exerciseIdx = Number(exerciseIndex);
      const catalogoPorGrado: any = EjercicioController.catalogoEjerciciosPorGrado;
      const normalizedGrade = this.normalizeGrade(userGrade);
      const catalogo: any = catalogoPorGrado[normalizedGrade];
      let esCorrecto = false;

      if (catalogo && catalogo[topicId] && catalogo[topicId][levelIdx]) {
        const ejercicioReal = catalogo[topicId][levelIdx][exerciseIdx];
        if (ejercicioReal && respuestaUsuario) {
          const limpiar = (txt: string) => txt.trim().toLowerCase().replace(/\s+/g, '');
          esCorrecto = limpiar(ejercicioReal.getCorrect()) === limpiar(respuestaUsuario);
        }
      }

      res.status(200).json({ esCorrecto });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al procesar el progreso', detalle: error.message });
    }
  }

  private normalizeGrade(grade: string): string {
    if (!grade) return '6°';
    const normalized = grade.toLowerCase().trim();
    if (normalized.includes('4')) return '4°';
    if (normalized.includes('5')) return '5°';
    if (normalized.includes('6')) return '6°';
    return '6°';
  }
}