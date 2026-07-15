// ============================================================
// TemaController.ts — "recepcionista" para el catálogo de temas.
// El Dashboard y la Constelación ya no importan topics.ts para la
// ESTRUCTURA (títulos, cantidad de niveles): la piden aquí, a MySQL.
// El estilo visual (emoji, color, degradado) sigue en el frontend
// porque es puramente cosmético, no es "dato" del negocio.
// ============================================================

import { Request, Response } from 'express';
import { CatalogoManager } from '../services/CatalogoManager';

export class TemaController {

  // GET /api/temas?grado=4°
  public async obtenerTemasPorGrado(req: Request, res: Response): Promise<void> {
    try {
      const { grado } = req.query;

      if (!grado) {
        res.status(400).json({ error: 'Falta el parámetro grado' });
        return;
      }

      const temas = await CatalogoManager.obtenerTemasPorGrado(grado as string);
      res.status(200).json({ data: temas });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener temas', detalle: error.message });
    }
  }

  // GET /api/temas/:slug/niveles?grado=6°
  public async obtenerNivelesDeTema(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const { grado } = req.query;

      if (!grado) {
        res.status(400).json({ error: 'Falta el parámetro grado' });
        return;
      }

      const niveles = await CatalogoManager.obtenerNivelesDeTema(slug as string, grado as string);
      res.status(200).json({ data: niveles });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al obtener niveles', detalle: error.message });
    }
  }
}