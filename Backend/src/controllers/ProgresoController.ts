// ============================================================
// ProgresoController.ts — patrón "recepcionista". Todo vive en MySQL:
// el progreso vía ProgresoManager, y ahora también la verificación
// de respuestas vía CatalogoManager (ya no el catálogo hardcodeado).
// ============================================================

import { Request, Response } from 'express';
import { CatalogoManager } from '../services/CatalogoManager';
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

      // ── CASO B: verificar si la respuesta es correcta (consulta MySQL) ──
      const exerciseIdx = Number(exerciseIndex);
      const normalizedGrade = this.normalizeGrade(userGrade);
      const ejerciciosDelNivel = await CatalogoManager.obtenerEjerciciosDeNivel(topicId, normalizedGrade, levelIdx);
      let esCorrecto = false;

      if (ejerciciosDelNivel && ejerciciosDelNivel[exerciseIdx] && respuestaUsuario) {
        const limpiar = (txt: string) => txt.trim().toLowerCase().replace(/\s+/g, '');
        esCorrecto = limpiar(ejerciciosDelNivel[exerciseIdx].correct) === limpiar(respuestaUsuario);
      }

      res.status(200).json({ esCorrecto });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al procesar el progreso', detalle: error.message });
    }
  }

  // ── BORRAR PROGRESO → DELETE /api/progreso/:idUsuario ────────
  // Botón "Borrar mi progreso" del perfil. Antes solo limpiaba la
  // pantalla; ahora sí borra las filas reales en progreso_catalogo.
  public async borrarProgreso(req: Request, res: Response): Promise<void> {
    try {
      const { idUsuario } = req.params;
      await ProgresoManager.borrarProgreso(Number(idUsuario));
      res.status(200).json({ mensaje: 'Progreso borrado' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al borrar el progreso', detalle: error.message });
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