// ============================================================
// EjercicioController.ts — CONTROLADOR DE EJERCICIOS
// Ya NO tiene el catálogo hardcodeado en memoria. Ahora lee todo
// de MySQL a través de CatalogoManager (temas, niveles, ejercicios,
// opciones). El catálogo viejo se migró una sola vez con
// scripts/migrarCatalogo.ts — ver ese archivo para el detalle.
// ============================================================

import { Request, Response } from 'express';
import { CatalogoManager } from '../services/CatalogoManager';

export class EjercicioController {

  // GET /api/ejercicios/:tema/:nivel?grade=4°
  public async obtenerPorTemaYNivel(req: Request, res: Response): Promise<void> {
    try {
      const { tema, nivel } = req.params;
      const { grade } = req.query;
      const nivelIdx = Number(nivel);
      const normalizedGrade = this.normalizeGrade((grade as string) || '6°');

      const ejercicios = await CatalogoManager.obtenerEjerciciosDeNivel(tema as string, normalizedGrade, nivelIdx);

      if (!ejercicios) {
        res.status(404).json({
          error: `Ejercicios no encontrados para el nivel ${nivelIdx} del tema "${tema}" (grado ${normalizedGrade})`,
        });
        return;
      }

      res.status(200).json({
        grade: normalizedGrade,
        tema,
        nivel: nivelIdx,
        ejercicios,
      });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener ejercicios', detalle: error.message });
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