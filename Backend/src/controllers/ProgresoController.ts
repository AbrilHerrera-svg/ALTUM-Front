// ============================================================
// ProgresoController.ts — CONTROLADOR DE PROGRESO
// Maneja el guardado y consulta del progreso de cada alumno.
//
// El progreso se guarda en MEMORIA RAM como un objeto anidado:
// {
//   "Abril": {                        ← nombre del alumno
//     "numeric": {                    ← id del tema
//       "0": { completed: true, stars: 3 },  ← nivel 0, 3 estrellas
//       "1": { completed: true, stars: 2 }   ← nivel 1, 2 estrellas
//     }
//   }
// }
// ============================================================

import { Request, Response } from 'express';
import { EjercicioController } from './EjercicioController'; // para acceder al catálogo de ejercicios

// Base de datos en memoria: objeto vacío que se va llenando conforme los alumnos juegan
export const progresoAlumnos: Record<string, any> = {};

export class ProgresoController {

  // ── OBTENER PROGRESO ─────────────────────────────────────────
  // Responde a: GET /api/progreso/:alumnoNombre
  // Devuelve todo el progreso de un alumno específico
  public obtenerProgreso(req: Request, res: Response): void {
    const { alumnoNombre } = req.params; // el nombre viene en la URL: /api/progreso/Abril

    if (typeof alumnoNombre !== 'string') {
      res.status(400).json({ error: 'Falta el nombre del alumno' });
      return;
    }

    // Si el alumno no tiene progreso todavía, devuelve un objeto vacío {}
    // El || {} evita que devuelva undefined
    const progreso = progresoAlumnos[alumnoNombre] || {};

    res.status(200).json(progreso);
  }

  // ── GUARDAR / VERIFICAR ──────────────────────────────────────
  // Responde a: POST /api/progreso/guardar   → guarda estrellas al terminar un nivel
  // Responde a: POST /api/progreso/verificar → verifica si la respuesta del alumno es correcta
  //
  // Usa el mismo método para ambas rutas porque distingue el caso por el body:
  //   - Si llega "stars"           → CASO A: guardar progreso del nivel
  //   - Si llega "respuestaUsuario"→ CASO B: verificar si la respuesta es correcta
  public guardarProgreso(req: Request, res: Response): void {
    const { alumnoNombre, topicId, levelIndex, exerciseIndex, respuestaUsuario, stars } = req.body;

    // String() convierte el número a texto para usarlo como clave del objeto
    // (las claves de objetos en JS siempre son strings)
    const levelIdx = String(levelIndex);

    // Validación: los tres campos básicos son obligatorios para cualquier caso
    if (!alumnoNombre || !topicId || levelIndex === undefined) {
      res.status(400).json({ error: 'Faltan datos requeridos.' });
      return;
    }

    const DB = progresoAlumnos as any;

    // Creamos la estructura anidada si no existe — como crear carpetas vacías
    if (!DB[alumnoNombre])          DB[alumnoNombre] = {};          // crea la "carpeta" del alumno
    if (!DB[alumnoNombre][topicId]) DB[alumnoNombre][topicId] = {}; // crea la "carpeta" del tema

    const temaProgreso = DB[alumnoNombre][topicId]; // acceso directo al progreso de este tema

    // ── CASO A: Guardar estrellas al completar el nivel ────────
    if (stars !== undefined) {
      // ?. es "optional chaining": si temaProgreso[levelIdx] no existe, devuelve undefined en vez de error
      const estrellasAnteriores = temaProgreso[levelIdx]?.stars || 0;

      temaProgreso[levelIdx] = {
        completed: true,
        // Math.max guarda siempre el mayor puntaje — si antes tenías 3 estrellas y ahora sacas 1, queda en 3
        stars: Math.max(Number(stars), estrellasAnteriores)
      };

      res.status(200).json({
        success: true,
        progresoActualizado: temaProgreso // devuelve el progreso completo del tema actualizado
      });
      return;
    }

    // ── CASO B: Verificar si la respuesta del alumno es correcta ─
    const exerciseIdx = Number(exerciseIndex);

    // Accedemos al catálogo de ejercicios del EjercicioController para comparar la respuesta
    const catalogo: any = EjercicioController.catalogoEjercicios;
    let esCorrecto = false;

    // Verificamos que exista el tema, el nivel y el ejercicio en el catálogo
    if (catalogo && catalogo[topicId] && catalogo[topicId][Number(levelIdx)]) {
      const ejercicioReal = catalogo[topicId][Number(levelIdx)][exerciseIdx];

      if (ejercicioReal && respuestaUsuario) {
        // Limpiamos ambas respuestas antes de comparar:
        // .trim()       → quita espacios al inicio y al final
        // .toLowerCase()→ convierte a minúsculas
        // .replace(/\s+/g, '') → quita todos los espacios internos
        const limpiar = (txt: string) => txt.trim().toLowerCase().replace(/\s+/g, '');
        esCorrecto = limpiar(ejercicioReal.correct) === limpiar(respuestaUsuario);
      }
    }

    // Devuelve al frontend si la respuesta fue correcta o no
    res.status(200).json({ esCorrecto });
  }
}
