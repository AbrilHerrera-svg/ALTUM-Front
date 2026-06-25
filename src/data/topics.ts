import type { Topic } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 'proportionality',
    title: 'Proporcionalidad y Funciones',
    emoji: '⚖️',
    planet: '🪐',
    description: 'Proporciones, porcentajes y escalas',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #4338ca)',
    shadow: 'rgba(124,58,237,0.4)',
    levelCount: 8,
  },
  {
    id: 'statistics',
    title: 'Análisis de Datos y Probabilidad',
    emoji: '📊',
    planet: '🌍',
    description: 'Gráficas, promedios y probabilidad',
    color: '#0891b2',
    gradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
    shadow: 'rgba(8,145,178,0.4)',
    levelCount: 8,
  },
  {
    id: 'numeric',
    title: 'Sentido Numérico y Aritmética',
    emoji: '🔢',
    planet: '🌑',
    description: 'Múltiplos, divisores, primos, MCM y MCD',
    color: '#db2777',
    gradient: 'linear-gradient(135deg, #db2777, #9d174d)',
    shadow: 'rgba(219,39,119,0.4)',
    levelCount: 8,
  },
  {
    id: 'measurement',
    title: 'Unidades de Medida y Conversiones',
    emoji: '📏',
    planet: '🟢',
    description: 'Longitud, masa, tiempo, ángulos y superficies',
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669, #0d9488)',
    shadow: 'rgba(5,150,105,0.4)',
    levelCount: 8,
  },
  {
    id: 'logic',
    title: 'Pensamiento Lógico y Precálculo',
    emoji: '🧩',
    planet: '🌟',
    description: 'Sucesiones, patrones y ecuaciones',
    color: '#d97706',
    gradient: 'linear-gradient(135deg, #d97706, #b45309)',
    shadow: 'rgba(217,119,6,0.4)',
    levelCount: 8,
  },
  {
    id: 'finance',
    title: 'Educación Financiera',
    emoji: '💰',
    planet: '🌕',
    description: 'Dinero, presupuestos, IVA y compras inteligentes',
    color: '#16a34a',
    gradient: 'linear-gradient(135deg, #16a34a, #15803d)',
    shadow: 'rgba(22,163,74,0.4)',
    levelCount: 8,
  },
];

export const LEVEL_NAMES: Record<string, string[]> = {
  proportionality: [
    'Proporciones Básicas', 'Tablas de Proporcionalidad', 'Porcentajes Básicos',
    'Cálculo de Porcentajes', 'Descuentos y Aumentos', 'Lectura de Escalas',
    'Regla de Tres', '¡Desafío Final!',
  ],
  statistics: [
    'Gráficas de Barras', 'Tablas de Frecuencia', 'La Media (Promedio)',
    'La Mediana', 'La Moda', 'Probabilidad Básica',
    'Calculando Probabilidad', '¡Desafío Final!',
  ],
  numeric: [
    'Múltiplos', 'Divisores', 'Divisibilidad (2, 5 y 10)',
    'Divisibilidad (3 y 9)', 'Números Primos y Compuestos',
    'Mínimo Común Múltiplo (MCM)', 'Máximo Común Divisor (MCD)', '¡Desafío Final!',
  ],
  measurement: [
    'Longitud (m, cm, km)', 'Masa (g y kg)', 'Capacidad (L y mL)',
    'Tiempo (h, min, s)', 'Tiempo (días, décadas, siglos)',
    'Ángulos', 'Superficies y Hectáreas', '¡Desafío Final!',
  ],
  logic: [
    'Sucesiones con Suma', 'Sucesiones con Multiplicación', 'Patrones y Figuras',
    'Sucesiones Mixtas', 'Progresiones Geométricas',
    'La Caja Misteriosa (Ecuaciones)', 'Ecuaciones un poco más difíciles', '¡Desafío Final!',
  ],
  finance: [
    'Sumas y Restas con Dinero', 'El Cambio Correcto', 'Valor Unitario y Comparar Precios',
    'Presupuesto Familiar', 'Descuentos en Compras',
    'El IVA (16%)', 'Lectura de Recibos y Facturas', '¡Desafío Final!',
  ],
};

export const ENCOURAGEMENTS_WRONG: string[] = [
  '¡Casi lo logras! Revisa bien el problema 🤔',
  '¡No te rindas! Los errores nos enseñan 💪',
  '¡Sigue intentándolo! Tú puedes 🌟',
  '¡Piénsalo de nuevo! Estás muy cerca 🔍',
  '¡Equivocado, pero sigues en pie! Vuelve a intentarlo 🚀',
  '¡Lee el problema con calma! Tómate tu tiempo ⏰',
  'Hmm... ¿revisaste bien los números? 🧐',
  '¡Un paso a la vez! Lo vas a lograr 🌈',
];

export const ENCOURAGEMENTS_CORRECT: string[] = [
  '¡Excelente! Eres un genio 🧠',
  '¡Correcto! ¡Así se hace! 🎉',
  '¡Perfecto! Sigue así 🌟',
  '¡Genial! Tu cerebro está trabajando muy bien 🚀',
  '¡Increíble! Lo lograste 💥',
  '¡Wow, correcto! Eres un explorador matemático 🏆',
  '¡Sí! ¡Exactamente! Vas muy bien 🎯',
  '¡Brillante! Eso es pensar como un científico 🔬',
];
