// Backend/src/data/progreso.ts

export interface ProgresoTema {
  nivelesCompletados: number[];              // Ej: [0, 1] (completó nivel 1 y 2)
  estrellasPorNivel: Record<number, number>;   // Ej: { 0: 3, 1: 2 } (Nivel 1 -> 3 estrellas)
  puntosTotales: number;
}

// Objeto estático en memoria que simula las tablas de tu base de datos
export const progresoAlumnos: Record<string, Record<string, ProgresoTema>> = {
  "Melina": {
    "proportionality": {
      nivelesCompletados: [0],
      estrellasPorNivel: { 0: 3 },
      puntosTotales: 30
    }
  }
};