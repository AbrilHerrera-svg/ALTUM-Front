// ============================================================
// catalogoFrontend.ts — copia de SOLO LOS DATOS (sin lógica) de
// src/data/topics.ts del frontend. Existe únicamente para que
// migrarCatalogo.ts no tenga que cruzar la frontera CJS/ESM entre
// el backend (CommonJS) y el frontend (type: module).
//
// Una vez migrado el catálogo a MySQL, este archivo ya no se vuelve
// a usar — puedes borrarlo después de correr la migración si quieres.
// ============================================================

export const TOPICS_BY_GRADE: Record<string, { id: string; title: string }[]> = {
  '4°': [
    { id: 'basic_arithmetic',  title: 'La Ruta de los Números' },
    { id: 'multiplication',    title: 'Los Portales Multiplicadores' },
    { id: 'division_basic',    title: 'Los Fragmentos del Espacio' },
    { id: 'fractions_intro',   title: 'Los Pedazos de Estrellas' },
    { id: 'measurement_basic', title: 'Las Distancias Estelares' },
    { id: 'geometry_intro',    title: 'Las Formas del Universo' },
  ],
  '5°': [
    { id: 'fractions_advanced', title: 'Los Fragmentos Galácticos' },
    { id: 'decimals',           title: 'Precisión Cósmica' },
    { id: 'percentages',        title: 'El Equilibrio del Universo' },
    { id: 'algebra_intro',      title: 'Descifrando el Universo' },
    { id: 'area_perimeter',     title: 'Cartografiando Planetas' },
    { id: 'data_graphs',        title: 'Los Registros Estelares' },
  ],
  '6°': [
    { id: 'proportionality', title: 'Las Proporciones del Cosmos' },
    { id: 'statistics',      title: 'Observando las Estrellas' },
    { id: 'numeric',         title: 'El Lenguaje de los Números' },
    { id: 'measurement',     title: 'Mediendo el Infinito' },
    { id: 'logic',           title: 'Patrones en el Universo' },
    { id: 'finance',         title: 'La Economía del Espacio' },
  ],
};

export const LEVEL_NAMES: Record<string, string[]> = {
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