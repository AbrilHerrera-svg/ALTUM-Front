// ============================================================
// ProgresoController.ts — CONTROLADOR DE PROGRESO
//
// El progreso se guarda en un OBJETO ANIDADO (no un arreglo).
// Un objeto usa llaves { } y guarda pares de clave:valor.
//
// Estructura del objeto progresoAlumnos:
// {
//   "Abril": {                              ← clave: nombre del alumno
//     "numeric": {                          ← clave: id del tema
//       "0": { completed: true, stars: 3 }, ← clave: índice del nivel
//       "1": { completed: true, stars: 2 }
//     },
//     "statistics": {
//       "0": { completed: true, stars: 1 }
//     }
//   },
//   "Melina": {
//     "logic": {
//       "0": { completed: true, stars: 3 }
//     }
//   }
// }
//
// La diferencia entre arreglo [] y objeto {}:
//   Arreglo → accedes por NÚMERO:  lista[0], lista[1], lista[2]
//   Objeto  → accedes por NOMBRE:  obj["Abril"], obj["numeric"]
// ============================================================

import { Request, Response } from 'express';
import { EjercicioController } from './EjercicioController';

// Objeto vacío que actúa como base de datos en memoria RAM.
// Record<string, any> = objeto cuyas claves son strings y valores pueden ser cualquier cosa.
export const progresoAlumnos: Record<string, any> = {};


export class ProgresoController {

  // ── OBTENER PROGRESO → GET /api/progreso/:alumnoNombre ───────
  public obtenerProgreso(req: Request, res: Response): void {
    const { alumnoNombre } = req.params;

    // ── IF #1: Validar que el nombre sea texto ────────────────
    // typeof comprueba el tipo de dato de una variable
    // typeof "Abril" → "string"
    // typeof 123     → "number"
    // typeof undefined → "undefined"
    if (typeof alumnoNombre !== 'string') {
      res.status(400).json({ error: 'Falta el nombre del alumno' });
      return;
    }

    // Accedemos al objeto con la clave del alumno.
    // Si el alumno no tiene progreso todavía, progresoAlumnos["Abril"] es undefined.
    // El operador || {} devuelve el objeto vacío como valor por defecto.
    //
    // Ejemplo:
    //   progresoAlumnos["Abril"] existe     → devuelve su progreso
    //   progresoAlumnos["Nuevo"] no existe  → devuelve {}
    const progreso = progresoAlumnos[alumnoNombre] || {};

    res.status(200).json(progreso);
  }


  // ── GUARDAR / VERIFICAR → POST /api/progreso/guardar y /verificar ─
  public guardarProgreso(req: Request, res: Response): void {
    const { alumnoNombre, userGrade, topicId, levelIndex, exerciseIndex, respuestaUsuario, stars } = req.body;

    // String() convierte el número a texto para usarlo como clave del objeto.
    // Los objetos de JavaScript usan strings como claves, aunque escribas un número.
    // String(2) → "2"
    const levelIdx = String(levelIndex);

    // ── IF #2: Validar que llegaron los datos mínimos ─────────
    // La condición tiene 3 partes unidas por || (OR lógico):
    //   - !alumnoNombre → true si el nombre no llegó
    //   - !topicId      → true si el tema no llegó
    //   - levelIndex === undefined → true si el nivel no llegó
    // Si CUALQUIERA de los tres es true, respondemos con error
    if (!alumnoNombre || !topicId || levelIndex === undefined) {
      res.status(400).json({ error: 'Faltan datos requeridos.' });
      return;
    }

    const DB = progresoAlumnos as any;

    // ── IF #3 y #4: Crear la estructura anidada si no existe ──
    // Antes de guardar datos, verificamos que existan las "carpetas" del objeto.
    // Es como crear directorios antes de guardar un archivo.
    //
    // IF #3: ¿Existe la "carpeta" del alumno?
    if (!DB[alumnoNombre]) {
      DB[alumnoNombre] = {}; // crea un objeto vacío para ese alumno
    }
    // Ahora DB["Abril"] = {} existe seguro.

    // IF #4: ¿Existe la "carpeta" del tema dentro del alumno?
    if (!DB[alumnoNombre][topicId]) {
      DB[alumnoNombre][topicId] = {}; // crea un objeto vacío para ese tema
    }
    // Ahora DB["Abril"]["numeric"] = {} existe seguro.

    const temaProgreso = DB[alumnoNombre][topicId]; // acceso directo al nivel de profundidad correcto

    // ── IF #5: ¿Llegaron estrellas? (CASO A: Guardar nivel completado) ─
    // "stars !== undefined" es true cuando el body SÍ trajo el campo stars.
    // Este caso se activa al terminar todas las preguntas de un nivel.
    if (stars !== undefined) {

      // ?. es "optional chaining":
      // temaProgreso[levelIdx]?.stars
      // Si temaProgreso[levelIdx] NO existe → devuelve undefined (no rompe el código)
      // Si temaProgreso[levelIdx] SÍ existe → accede a .stars normalmente
      // El || 0 al final usa 0 si el resultado es undefined
      const estrellasAnteriores = temaProgreso[levelIdx]?.stars || 0;

      // Guardamos el progreso del nivel.
      // Math.max(a, b) devuelve el mayor de los dos números.
      // Así NUNCA bajamos las estrellas: si antes tenías 3 y ahora sacas 1, queda en 3.
      //
      // Ejemplo:
      //   Math.max(1, 3) → 3  (tenías 3 antes, mantenemos 3)
      //   Math.max(3, 1) → 3  (ganaste 3 ahora, actualizamos a 3)
      //   Math.max(2, 2) → 2  (igual, se queda igual)
      temaProgreso[levelIdx] = {
        completed: true,
        stars: Math.max(Number(stars), estrellasAnteriores)
      };

      res.status(200).json({
        success: true,
        progresoActualizado: temaProgreso // devuelve el tema completo actualizado
      });
      return; // salimos aquí, no necesitamos ejecutar el CASO B
    }

    // ── CASO B: Verificar si la respuesta del alumno es correcta ─
    // Si llegamos aquí, es porque NO llegaron estrellas en el body.
    // Esto pasa cuando el alumno hace clic en una opción de respuesta.

    const exerciseIdx = Number(exerciseIndex); // índice de la pregunta actual (0-3)
    // Accede al catálogo de ejercicios por grado del usuario
    const catalogoPorGrado: any = EjercicioController.catalogoEjerciciosPorGrado;
    const normalizedGrade = this.normalizeGrade(userGrade);
    const catalogo: any = catalogoPorGrado[normalizedGrade];
    let esCorrecto = false; // empieza como false por seguridad

    // ── IF #6: Verificar que exista el ejercicio en el catálogo ─
    // Es una condición de 3 partes unidas con && (AND lógico):
    //   - catalogo                       → el catálogo existe
    //   - catalogo[topicId]              → el tema existe en el catálogo
    //   - catalogo[topicId][Number(levelIdx)] → el nivel existe en ese tema
    // Si las 3 son true, accedemos al ejercicio para comparar la respuesta
    if (catalogo && catalogo[topicId] && catalogo[topicId][Number(levelIdx)]) {
      const ejercicioReal = catalogo[topicId][Number(levelIdx)][exerciseIdx];

      // ── IF #7: Verificar que el ejercicio y la respuesta existen ─
      if (ejercicioReal && respuestaUsuario) {
        // Función que limpia texto para comparar de forma justa:
        //   .trim()              → quita espacios al inicio y al final
        //   .toLowerCase()       → convierte a minúsculas
        //   .replace(/\s+/g, '') → quita TODOS los espacios internos
        //     /\s+/g es una expresión regular:
        //       \s  → cualquier espacio en blanco
        //       +   → uno o más
        //       g   → global (reemplaza TODOS, no solo el primero)
        const limpiar = (txt: string) => txt.trim().toLowerCase().replace(/\s+/g, '');

        // Comparamos la respuesta del alumno con la correcta del catálogo
        // === verifica igualdad estricta (mismo valor Y mismo tipo)
        esCorrecto = limpiar(ejercicioReal.getCorrect()) === limpiar(respuestaUsuario);
      }
    }

    // Devolvemos si la respuesta fue correcta o no
    // El frontend usa esto para mostrar ✓ o ✗ y restar vida si fue incorrecta
    res.status(200).json({ esCorrecto });
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
