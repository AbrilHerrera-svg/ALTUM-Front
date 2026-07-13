import type { Exercise } from '../types';

// Este archivo mantiene la compatibilidad pero los ejercicios se obtienen del backend
// por GET /api/ejercicios/:tema/:nivel?grade=4°

// Ejercicios organizados por grado y tema (para referencia)
export const EXERCISES_BY_GRADE: Record<string, Record<string, Exercise[][]>> = {
  '4°': {},
  '5°': {},
  '6°': {},
};

// Función para obtener ejercicios según grado y tema
// Nota: En la práctica, estos se obtienen del backend, no de aquí
export function getExercisesByGradeAndTopic(grade: string, topicId: string): Exercise[][] {
  // Normaliza el grado (convierte "4° de Primaria" a "4°", etc.)
  const normalizedGrade = grade.toLowerCase().includes('4') ? '4°' :
                         grade.toLowerCase().includes('5') ? '5°' :
                         grade.toLowerCase().includes('6') ? '6°' : '6°';

  // Intenta obtener los ejercicios del grado y tema especificado
  const gradeExercises = EXERCISES_BY_GRADE[normalizedGrade];
  if (gradeExercises && gradeExercises[topicId]) {
    return gradeExercises[topicId];
  }

  // Si no encuentra el tema, intenta con 6° como fallback
  const fallbackExercises = EXERCISES_BY_GRADE['6°'];
  if (fallbackExercises && fallbackExercises[topicId]) {
    return fallbackExercises[topicId];
  }

  // Si no hay nada, devuelve un arreglo vacío
  return [];
}

// Mantener EXERCISES para compatibilidad hacia atrás
export const EXERCISES: Exercise[][] = [];
