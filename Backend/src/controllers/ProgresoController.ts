// Backend/src/controllers/ProgresoController.ts
import { Request, Response } from 'express';
import { EjercicioController } from './EjercicioController';


export const progresoAlumnos: Record<string, any> = {};

export class ProgresoController {
  
//progreso de un alumno
public obtenerProgreso(req: Request, res: Response): void {
  const { alumnoNombre } = req.params;

  if (typeof alumnoNombre !== 'string') {
    res.status(400).json({ error: 'Falta el nombre del alumno' });
    return;
  }

  const progreso = progresoAlumnos[alumnoNombre] || {};

  res.status(200).json(progreso);
}

// guardar avance
public guardarProgreso(req: Request, res: Response): void {
  const { alumnoNombre, topicId, levelIndex, exerciseIndex, respuestaUsuario, stars } = req.body;
  const levelIdx = String(levelIndex);

  if (!alumnoNombre || !topicId || levelIndex === undefined) {
    res.status(400).json({ error: 'Faltan datos requeridos.' });
    return;
  }

  
  const DB = progresoAlumnos as any;

  if (!DB[alumnoNombre]) {
    DB[alumnoNombre] = {};
  }

  if (!DB[alumnoNombre][topicId]) {
    DB[alumnoNombre][topicId] = {};
  }

  const temaProgreso = DB[alumnoNombre][topicId];

  // guardar estrellas
  if (stars !== undefined) {
    const estrellasAnteriores = temaProgreso[levelIdx]?.stars || 0;
    temaProgreso[levelIdx] = {
      completed: true,
      stars: Math.max(Number(stars), estrellasAnteriores)
    };

    res.status(200).json({
      success: true,
      progresoActualizado: temaProgreso
    });
    return;
  }

  // CASO B: Validación de opción individual al hacer clic
  const exerciseIdx = Number(exerciseIndex);
  const catalogo: any = EjercicioController.catalogoEjercicios;
  let esCorrecto = false;

  if (catalogo && catalogo[topicId] && catalogo[topicId][Number(levelIdx)]) {
    const ejercicioReal = catalogo[topicId][Number(levelIdx)][exerciseIdx];
    if (ejercicioReal && respuestaUsuario) {
      const limpiar = (txt: string) => txt.trim().toLowerCase().replace(/\s+/g, '');
      esCorrecto = limpiar(ejercicioReal.correct) === limpiar(respuestaUsuario);
    }
  }

  res.status(200).json({ esCorrecto });
}}