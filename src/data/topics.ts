import type { Topic } from '../types';

export const TOPICS_BY_GRADE: Record<string, Topic[]> = {
  '4°': [
    {
      id: 'basic_arithmetic',
      title: 'La Ruta de los Números',
      emoji: '➕',
      planet: '🌟',
      description: 'Sumas y restas en el viaje cósmico',
      color: '#f97316',
      gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
      shadow: 'rgba(249,115,22,0.4)',
      levelCount: 8,
    },
    {
      id: 'multiplication',
      title: 'Los Portales Multiplicadores',
      emoji: '✖️',
      planet: '🌙',
      description: 'Tablas de multiplicar y poderes cósmicos',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      shadow: 'rgba(59,130,246,0.4)',
      levelCount: 8,
    },
    {
      id: 'division_basic',
      title: 'Los Fragmentos del Espacio',
      emoji: '➗',
      planet: '🔴',
      description: 'Repartir recursos en el universo',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
      shadow: 'rgba(239,68,68,0.4)',
      levelCount: 8,
    },
    {
      id: 'fractions_intro',
      title: 'Los Pedazos de Estrellas',
      emoji: '🍰',
      planet: '💛',
      description: 'Fracciones en las constelaciones',
      color: '#eab308',
      gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
      shadow: 'rgba(234,179,8,0.4)',
      levelCount: 8,
    },
    {
      id: 'measurement_basic',
      title: 'Las Distancias Estelares',
      emoji: '📏',
      planet: '💚',
      description: 'Medidas en el infinito cósmico',
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
      shadow: 'rgba(34,197,94,0.4)',
      levelCount: 8,
    },
    {
      id: 'geometry_intro',
      title: 'Las Formas del Universo',
      emoji: '⬜',
      planet: '🟣',
      description: 'Figuras en el cosmos',
      color: '#a855f7',
      gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
      shadow: 'rgba(168,85,247,0.4)',
      levelCount: 8,
    },
  ],
  '5°': [
    {
      id: 'fractions_advanced',
      title: 'Los Fragmentos Galácticos',
      emoji: '🥧',
      planet: '🌟',
      description: 'Operaciones con fracciones cósmicas',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
      shadow: 'rgba(236,72,153,0.4)',
      levelCount: 8,
    },
    {
      id: 'decimals',
      title: 'Precisión Cósmica',
      emoji: '🔵',
      planet: '🌙',
      description: 'Números decimales en el universo',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      shadow: 'rgba(6,182,212,0.4)',
      levelCount: 8,
    },
    {
      id: 'percentages',
      title: 'El Equilibrio del Universo',
      emoji: '💯',
      planet: '🔴',
      description: 'Porcentajes y proporciones estelares',
      color: '#f43f5e',
      gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
      shadow: 'rgba(244,63,94,0.4)',
      levelCount: 8,
    },
    {
      id: 'algebra_intro',
      title: 'Descifrando el Universo',
      emoji: '📐',
      planet: '💛',
      description: 'Misterios algebraicos del cosmos',
      color: '#eab308',
      gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
      shadow: 'rgba(234,179,8,0.4)',
      levelCount: 8,
    },
    {
      id: 'area_perimeter',
      title: 'Cartografiando Planetas',
      emoji: '📊',
      planet: '💚',
      description: 'Territorios y límites cósmicos',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      shadow: 'rgba(16,185,129,0.4)',
      levelCount: 8,
    },
    {
      id: 'data_graphs',
      title: 'Los Registros Estelares',
      emoji: '📈',
      planet: '🟣',
      description: 'Datos y observaciones del espacio',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      shadow: 'rgba(139,92,246,0.4)',
      levelCount: 8,
    },
  ],
  '6°': [
    {
      id: 'proportionality',
      title: 'Las Proporciones del Cosmos',
      emoji: '⚖️',
      planet: '🪐',
      description: 'Razones y equilibrio en el universo',
      color: '#7c3aed',
      gradient: 'linear-gradient(135deg, #7c3aed, #4338ca)',
      shadow: 'rgba(124,58,237,0.4)',
      levelCount: 8,
    },
    {
      id: 'statistics',
      title: 'Observando las Estrellas',
      emoji: '📊',
      planet: '🌍',
      description: 'Análisis y patrones en el espacio',
      color: '#0891b2',
      gradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
      shadow: 'rgba(8,145,178,0.4)',
      levelCount: 8,
    },
    {
      id: 'numeric',
      title: 'El Lenguaje de los Números',
      emoji: '🔢',
      planet: '🌑',
      description: 'Divisores, múltiplos y secretos numéricos',
      color: '#db2777',
      gradient: 'linear-gradient(135deg, #db2777, #9d174d)',
      shadow: 'rgba(219,39,119,0.4)',
      levelCount: 8,
    },
    {
      id: 'measurement',
      title: 'Mediendo el Infinito',
      emoji: '📏',
      planet: '🟢',
      description: 'Conversiones y medidas cósmicas',
      color: '#059669',
      gradient: 'linear-gradient(135deg, #059669, #0d9488)',
      shadow: 'rgba(5,150,105,0.4)',
      levelCount: 8,
    },
    {
      id: 'logic',
      title: 'Patrones en el Universo',
      emoji: '🧩',
      planet: '🌟',
      description: 'Secuencias y conexiones cósmicas',
      color: '#d97706',
      gradient: 'linear-gradient(135deg, #d97706, #b45309)',
      shadow: 'rgba(217,119,6,0.4)',
      levelCount: 8,
    },
    {
      id: 'finance',
      title: 'La Economía del Espacio',
      emoji: '💰',
      planet: '🌕',
      description: 'Recursos, dinero e intercambio cósmico',
      color: '#16a34a',
      gradient: 'linear-gradient(135deg, #16a34a, #15803d)',
      shadow: 'rgba(22,163,74,0.4)',
      levelCount: 8,
    },
  ],
};

// Normaliza el formato del grado para que sea consistente
function normalizeGrade(grade: string): string {
  const normalized = grade.toLowerCase().trim();
  if (normalized.includes('4')) return '4°';
  if (normalized.includes('5')) return '5°';
  if (normalized.includes('6')) return '6°';
  return '6°'; // por defecto 6°
}

export function getTopicsByGrade(grade: string): Topic[] {
  const normalized = normalizeGrade(grade);
  return TOPICS_BY_GRADE[normalized] || TOPICS_BY_GRADE['6°'] || [];
}

export const TOPICS: Topic[] = TOPICS_BY_GRADE['6°'];

export const LEVEL_NAMES: Record<string, string[]> = {
  // 4° de primaria
  basic_arithmetic: [
    'Sumas de 3 dígitos', 'Sumas de 4 dígitos', 'Restas de 3 dígitos',
    'Restas de 4 dígitos', 'Sumas y restas combinadas', 'Sumas con llevar',
    'Restas con prestar', '¡Desafío Final!',
  ],
  multiplication: [
    'Tablas del 2 y 3', 'Tablas del 4 y 5', 'Tablas del 6 y 7',
    'Tablas del 8 y 9', 'Multiplicación por 1 dígito', 'Multiplicación por 2 dígitos',
    'Multiplicaciones combinadas', '¡Desafío Final!',
  ],
  division_basic: [
    'División con divisor de 1 dígito', 'División exacta', 'División con residuo',
    'División por 2 dígitos', 'Divisiones mixtas', 'Relación entre multiplicación y división',
    'Prueba de la división', '¡Desafío Final!',
  ],
  fractions_intro: [
    'Medios (1/2)', 'Tercios (1/3)', 'Cuartos (1/4)',
    'Quintos y sextos', 'Comparación de fracciones', 'Fracciones equivalentes',
    'Fracciones en la recta numérica', '¡Desafío Final!',
  ],
  measurement_basic: [
    'El metro y centímetro', 'El kilómetro', 'Conversión m-cm',
    'Perímetro de figuras', 'Medidas en objetos reales', 'Comparación de longitudes',
    'Problemas de medida', '¡Desafío Final!',
  ],
  geometry_intro: [
    'Triángulos', 'Cuadrados y rectángulos', 'Círculos',
    'Lados y vértices', 'Figuras simétricas', 'Composición de figuras',
    'Figuras 3D básicas', '¡Desafío Final!',
  ],

  // 5° de primaria
  fractions_advanced: [
    'Suma de fracciones iguales', 'Resta de fracciones iguales', 'Suma de fracciones distintas',
    'Resta de fracciones distintas', 'Multiplicación de fracciones', 'Fracciones de un número',
    'Operaciones combinadas', '¡Desafío Final!',
  ],
  decimals: [
    'Décimos', 'Centésimos', 'Suma de decimales',
    'Resta de decimales', 'Multiplicación por 10, 100', 'Multiplicación de decimales',
    'Operaciones con dinero', '¡Desafío Final!',
  ],
  percentages: [
    '¿Qué es el porcentaje?', '10%, 25%, 50%', 'Cálculo de porcentajes',
    'Porcentajes en tablas', 'Aumento y descuento', 'Comparación de porcentajes',
    'Proporciones y razones', '¡Desafío Final!',
  ],
  algebra_intro: [
    'Letras como variables', 'Expresiones algebraicas simples', 'Ecuaciones de un paso',
    'Ecuaciones de dos pasos', 'Sustitución de valores', 'Problemas con variables',
    'Secuencias numéricas', '¡Desafío Final!',
  ],
  area_perimeter: [
    'Perímetro de rectángulos', 'Área de rectángulos', 'Perímetro de triángulos',
    'Área de triángulos', 'Círculos: radio y diámetro', 'Perímetro de círculos',
    'Área de figuras compuestas', '¡Desafío Final!',
  ],
  data_graphs: [
    'Pictogramas', 'Gráficas de barras', 'Gráficas lineales',
    'Tablas de frecuencia', 'Moda y mediana', 'Promedio (media)',
    'Análisis de datos', '¡Desafío Final!',
  ],

  // 6° de primaria
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
