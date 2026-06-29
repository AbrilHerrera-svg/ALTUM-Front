// Backend/src/data/progreso.ts

export interface ProgresoTema {
  nivelesCompletados: number[];              
  estrellasPorNivel: Record<number, number>;   
  puntosTotales: number;
}


export const progresoAlumnos: Record<string, Record<string, ProgresoTema>> = {
  "": {
    "proportionality": {
      nivelesCompletados: [0],
      estrellasPorNivel: { 0: 3 },
      puntosTotales: 30
    }
  }
};