import type { Exercise } from '../types';

// Cada nivel tiene 4 ejercicios.
// { question, options: [4 strings], correct: string, tip: string }

export const EXERCISES: Record<string, Exercise[][]> = {

  // TEMA: PROPORCIONALIDAD Y FUNCIONES
  proportionality: [
    // Nivel 1 - Proporciones Básicas
    [
      {
        question: 'Si 3 manzanas cuestan $15, ¿cuánto cuestan 6 manzanas?',
        options: ['$20', '$25', '$30', '$35'],
        correct: '$30',
        tip: 'Si duplicas la cantidad, el precio también se duplica. 15 × 2 = ? 🍎',
      },
      {
        question: 'En una receta para 4 personas se usan 2 tazas de harina. ¿Cuántas tazas necesitas para 8 personas?',
        options: ['3 tazas', '4 tazas', '6 tazas', '8 tazas'],
        correct: '4 tazas',
        tip: 'Si duplicas las personas, duplicas los ingredientes. 2 × 2 = ? 🎂',
      },
      {
        question: 'Un auto recorre 120 km en 2 horas. ¿Cuántos km recorre en 5 horas a la misma velocidad?',
        options: ['240 km', '280 km', '300 km', '360 km'],
        correct: '300 km',
        tip: 'Primero calcula cuánto recorre en 1 hora: 120 ÷ 2 = 60 km/h. Luego multiplica por 5. 🚗',
      },
      {
        question: 'Si 5 cuadernos cuestan $35, ¿cuánto cuestan 3 cuadernos?',
        options: ['$15', '$18', '$21', '$25'],
        correct: '$21',
        tip: 'Primero calcula el precio de 1 cuaderno: 35 ÷ 5 = $7. Luego multiplica por 3. 📓',
      },
    ],
    // Nivel 2 - Tablas de Proporcionalidad
    [
      {
        question: 'En una tabla de proporcionalidad: X = 2 → Y = 6; X = 4 → Y = 12; X = 6 → Y = ?',
        options: ['15', '16', '18', '20'],
        correct: '18',
        tip: 'Encuentra la razón: Y ÷ X = 6 ÷ 2 = 3. Entonces Y = X × 3. ¿Cuánto es 6 × 3? 📊',
      },
      {
        question: 'En una tabla: X = 1 → Y = 5; X = 3 → Y = 15; X = 5 → Y = ?',
        options: ['20', '25', '30', '35'],
        correct: '25',
        tip: 'La razón es Y ÷ X = 5 ÷ 1 = 5. Multiplica: 5 × 5 = ? 🔢',
      },
      {
        question: 'Completa la tabla: Horas trabajadas: 2, 4, 6, 8. Pago en pesos: 50, 100, ?, 200.',
        options: ['130', '140', '150', '160'],
        correct: '150',
        tip: 'La razón es 50 ÷ 2 = $25 por hora. Si trabajas 6 horas: 6 × 25 = ? 💵',
      },
      {
        question: 'En una tabla proporcional, si X = 7 da Y = 28, ¿cuál es la constante de proporcionalidad?',
        options: ['3', '4', '5', '6'],
        correct: '4',
        tip: 'La constante es Y ÷ X = 28 ÷ 7 = ? 🔑',
      },
    ],
    // Nivel 3 - Porcentajes Básicos
    [
      {
        question: '¿Cuánto es el 50% de 200?',
        options: ['50', '75', '100', '150'],
        correct: '100',
        tip: '50% significa la mitad. 200 ÷ 2 = ? 🍰',
      },
      {
        question: '¿Cuánto es el 25% de 80?',
        options: ['10', '15', '20', '25'],
        correct: '20',
        tip: '25% es la cuarta parte. 80 ÷ 4 = ? 📐',
      },
      {
        question: '¿Cuánto es el 10% de 350?',
        options: ['25', '30', '35', '40'],
        correct: '35',
        tip: 'El 10% se calcula dividiendo entre 10. 350 ÷ 10 = ? 🔢',
      },
      {
        question: '¿Cuánto es el 75% de 120?',
        options: ['75', '80', '90', '95'],
        correct: '90',
        tip: '75% = 50% + 25%. El 50% de 120 = 60 y el 25% de 120 = 30. Suma: 60 + 30 = ? 💡',
      },
    ],
    // Nivel 4 - Cálculo de Porcentajes
    [
      {
        question: '¿Qué porcentaje de 200 es 50?',
        options: ['10%', '15%', '20%', '25%'],
        correct: '25%',
        tip: 'Divide la parte entre el total y multiplica por 100: (50 ÷ 200) × 100 = ? 🎯',
      },
      {
        question: 'En un examen de 40 preguntas, Lucía contestó 30 correctamente. ¿Qué porcentaje obtuvo?',
        options: ['60%', '65%', '70%', '75%'],
        correct: '75%',
        tip: '(30 ÷ 40) × 100 = ? 📝',
      },
      {
        question: '¿Cuánto es el 15% de 60?',
        options: ['6', '9', '12', '15'],
        correct: '9',
        tip: '10% de 60 = 6. 5% de 60 = 3. Suma: 6 + 3 = ? 🔢',
      },
      {
        question: 'En una clase de 25 alumnos, 5 están ausentes. ¿Qué porcentaje de alumnos está presente?',
        options: ['70%', '75%', '80%', '85%'],
        correct: '80%',
        tip: 'Presentes = 25 - 5 = 20. Porcentaje = (20 ÷ 25) × 100 = ? 🏫',
      },
    ],
    // Nivel 5 - Descuentos y Aumentos
    [
      {
        question: 'Un libro cuesta $120 y tiene un descuento del 20%. ¿Cuánto pagas?',
        options: ['$84', '$90', '$96', '$100'],
        correct: '$96',
        tip: 'Descuento = 20% de 120 = $24. Precio final = 120 - 24 = ? 📚',
      },
      {
        question: 'Un precio de $200 aumenta un 15%. ¿Cuál es el nuevo precio?',
        options: ['$215', '$225', '$230', '$240'],
        correct: '$230',
        tip: 'Aumento = 15% de 200 = $30. Nuevo precio = 200 + 30 = ? 📈',
      },
      {
        question: 'En una tienda, el precio original es $500 y hay un descuento de 30%. ¿Cuánto ahorras?',
        options: ['$100', '$120', '$150', '$200'],
        correct: '$150',
        tip: 'Ahorro = 30% de 500 = (500 × 30) ÷ 100 = ? 💰',
      },
      {
        question: 'Un celular costaba $3,000 y bajó un 10%. Luego subió 10% del precio rebajado. ¿Cuánto cuesta ahora?',
        options: ['$2,900', '$2,970', '$3,000', '$3,030'],
        correct: '$2,970',
        tip: 'Primero baja: 3,000 × 0.9 = 2,700. Luego sube: 2,700 × 1.1 = ? ¡Cuidado, no vuelve al mismo precio! 🤔',
      },
    ],
    // Nivel 6 - Lectura de Escalas
    [
      {
        question: 'En un mapa con escala 1:100,000, una distancia de 3 cm representa ¿cuántos km reales?',
        options: ['1 km', '2 km', '3 km', '4 km'],
        correct: '3 km',
        tip: '1 cm = 100,000 cm = 1 km en la realidad. Entonces 3 cm = ? km 🗺️',
      },
      {
        question: 'Una maqueta tiene escala 1:50. Si la maqueta mide 10 cm, ¿cuánto mide el objeto real?',
        options: ['50 cm', '500 cm', '5 m', 'Ambas b y c son correctas'],
        correct: 'Ambas b y c son correctas',
        tip: '10 cm × 50 = 500 cm = 5 m. Las dos formas de decir lo mismo son correctas. 🏗️',
      },
      {
        question: 'En un plano con escala 1:200, el cuarto mide 4 cm × 3 cm. ¿Cuáles son las medidas reales?',
        options: ['400 cm × 300 cm', '800 m × 600 m', '4 m × 3 m', '40 m × 30 m'],
        correct: '400 cm × 300 cm',
        tip: 'Multiplica cada medida por 200: 4 × 200 = 800 cm y 3 × 200 = 600 cm. ¿Son iguales a 400 × 300? Revisa. 🏠',
      },
      {
        question: 'La distancia real entre dos ciudades es 150 km. En el mapa mide 3 cm. ¿Cuál es la escala?',
        options: ['1:5,000', '1:50,000', '1:5,000,000', '1:500,000'],
        correct: '1:5,000,000',
        tip: '150 km = 15,000,000 cm. Escala = 3 ÷ 15,000,000 = 1:5,000,000 🗺️',
      },
    ],
    // Nivel 7 - Regla de Tres
    [
      {
        question: 'Si 4 obreros construyen una pared en 6 días, ¿cuántos días tardarán 8 obreros?',
        options: ['2 días', '3 días', '4 días', '6 días'],
        correct: '3 días',
        tip: 'Es proporcionalidad inversa. Más obreros = menos días. 4 × 6 = 8 × ? 👷',
      },
      {
        question: 'Si un grifo llena un tanque en 8 horas, ¿en cuánto tiempo lo llenan 2 grifos iguales?',
        options: ['2 horas', '4 horas', '6 horas', '16 horas'],
        correct: '4 horas',
        tip: 'Proporcionalidad inversa: más grifos = menos tiempo. 1 × 8 = 2 × ? 🚰',
      },
      {
        question: 'Si 6 kg de arroz cuestan $90, ¿cuánto cuestan 10 kg?',
        options: ['$120', '$140', '$150', '$160'],
        correct: '$150',
        tip: 'Proporcionalidad directa: precio por kg = 90 ÷ 6 = $15. Luego 10 × 15 = ? 🌾',
      },
      {
        question: '3 impresoras imprimen 300 hojas en 10 minutos. ¿Cuántas hojas imprimen 5 impresoras en el mismo tiempo?',
        options: ['400', '450', '500', '600'],
        correct: '500',
        tip: 'Proporcionalidad directa: hojas por impresora = 300 ÷ 3 = 100. Luego 5 × 100 = ? 🖨️',
      },
    ],
    // Nivel 8 - Desafío Final
    [
      {
        question: 'Un artículo cuesta $450. Primero le aplican un 20% de descuento y luego un 10% de descuento al precio rebajado. ¿Cuánto cuesta al final?',
        options: ['$300', '$315', '$324', '$336'],
        correct: '$324',
        tip: 'Paso 1: 450 × 0.80 = 360. Paso 2: 360 × 0.90 = ? No sumes los porcentajes directamente. 🏷️',
      },
      {
        question: 'En una tabla proporcional: si X = 9 da Y = 63, ¿qué valor de X da Y = 49?',
        options: ['5', '6', '7', '8'],
        correct: '7',
        tip: 'La constante es 63 ÷ 9 = 7. Entonces X = Y ÷ 7 = 49 ÷ 7 = ? 🔢',
      },
      {
        question: '12 trabajadores terminan un proyecto en 15 días. ¿Cuántos trabajadores se necesitan para terminarlo en 9 días?',
        options: ['16', '18', '20', '24'],
        correct: '20',
        tip: 'Proporcionalidad inversa: 12 × 15 = ? × 9. Despeja el incógnito. 👷',
      },
      {
        question: 'El precio de un producto subió 25% y ahora cuesta $375. ¿Cuánto costaba antes?',
        options: ['$275', '$280', '$300', '$325'],
        correct: '$300',
        tip: 'Precio actual = Precio original × 1.25. Entonces: precio original = 375 ÷ 1.25 = ? 💡',
      },
    ],
  ],
  // TEMA: ANÁLISIS DE DATOS Y PROBABILIDAD
  statistics: [
    // Nivel 1 - Gráficas de Barras
    [
      {
        question: 'Una gráfica de barras muestra: Manzanas=8, Peras=5, Naranjas=12, Uvas=3. ¿Cuál fruta es la más vendida?',
        options: ['Manzanas', 'Peras', 'Naranjas', 'Uvas'],
        correct: 'Naranjas',
        tip: 'La barra más alta representa la fruta más vendida. ¿Cuál tiene el número mayor? 🍊',
      },
      {
        question: 'En la misma gráfica, ¿cuántas frutas más se vendieron de Manzanas que de Peras?',
        options: ['2', '3', '4', '5'],
        correct: '3',
        tip: 'Resta: Manzanas - Peras = 8 - 5 = ? 🍎',
      },
      {
        question: 'Una gráfica muestra deportes favoritos: Fútbol=15, Natación=8, Básquet=12, Tenis=5. ¿Cuántos estudiantes en total respondieron?',
        options: ['35', '38', '40', '42'],
        correct: '40',
        tip: 'Suma todos los valores: 15 + 8 + 12 + 5 = ? ⚽',
      },
      {
        question: 'En una gráfica de barras sobre colores favoritos, el Azul tiene barra de 18 y el Rojo de 12. ¿Qué porcentaje eligió Azul si participaron 60 alumnos?',
        options: ['25%', '30%', '35%', '40%'],
        correct: '30%',
        tip: '(18 ÷ 60) × 100 = ? 🎨',
      },
    ],
    // Nivel 2 - Tablas de Frecuencia
    [
      {
        question: 'Calificaciones de 10 alumnos: 8,7,9,8,6,8,9,7,8,10. ¿Con qué frecuencia aparece el 8?',
        options: ['2', '3', '4', '5'],
        correct: '4',
        tip: 'Cuenta cuántas veces aparece el número 8 en la lista. 📊',
      },
      {
        question: 'En una tabla de frecuencias: 1→3 veces, 2→5 veces, 3→4 veces, 4→2 veces. ¿Cuántos datos hay en total?',
        options: ['12', '13', '14', '15'],
        correct: '14',
        tip: 'Suma todas las frecuencias: 3 + 5 + 4 + 2 = ? 🔢',
      },
      {
        question: 'En la misma tabla, ¿qué valor tiene mayor frecuencia?',
        options: ['1', '2', '3', '4'],
        correct: '2',
        tip: 'El valor con mayor frecuencia es el que aparece más veces. ¿Cuál tiene 5? 📈',
      },
      {
        question: 'Si en una encuesta de 20 personas, 8 prefieren chocolate y el resto vainilla. ¿Cuál es la frecuencia relativa del chocolate?',
        options: ['30%', '35%', '40%', '45%'],
        correct: '40%',
        tip: 'Frecuencia relativa = (frecuencia ÷ total) × 100 = (8 ÷ 20) × 100 = ? 🍫',
      },
    ],
    // Nivel 3 - La Media (Promedio)
    [
      {
        question: 'Las temperaturas de la semana fueron: 18, 20, 22, 19, 21 grados. ¿Cuál es el promedio?',
        options: ['19°', '20°', '21°', '22°'],
        correct: '20°',
        tip: 'Suma todos los valores y divide entre la cantidad: (18+20+22+19+21) ÷ 5 = ? 🌡️',
      },
      {
        question: 'Calificaciones de Mateo: Español=9, Matemáticas=8, Ciencias=10, Historia=7. ¿Cuál es su promedio?',
        options: ['8', '8.5', '9', '9.5'],
        correct: '8.5',
        tip: '(9 + 8 + 10 + 7) ÷ 4 = ? 📚',
      },
      {
        question: 'El promedio de 5 números es 12. Si cuatro de ellos son: 10, 14, 11, 13. ¿Cuál es el quinto número?',
        options: ['10', '11', '12', '13'],
        correct: '12',
        tip: 'La suma total debe ser 12 × 5 = 60. Suma los cuatro conocidos y reste de 60. 🔢',
      },
      {
        question: 'Sofía obtuvo estas calificaciones: 7, 8, 9, 8, 9, 9. ¿Cuál es su promedio?',
        options: ['8', '8.3', '8.5', '8.7'],
        correct: '8.3',
        tip: '(7+8+9+8+9+9) ÷ 6 = 50 ÷ 6 ≈ ? Redondea a un decimal. 📊',
      },
    ],
    // Nivel 4 - La Mediana
    [
      {
        question: 'Datos: 3, 7, 2, 9, 5. ¿Cuál es la mediana?',
        options: ['3', '5', '7', '9'],
        correct: '5',
        tip: 'Ordena los datos: 2, 3, 5, 7, 9. La mediana es el valor del centro. 📊',
      },
      {
        question: 'Datos ordenados: 4, 6, 8, 10, 12, 14. ¿Cuál es la mediana?',
        options: ['8', '9', '10', '11'],
        correct: '9',
        tip: 'Con número par de datos, la mediana es el promedio de los dos centrales: (8 + 10) ÷ 2 = ? 🔢',
      },
      {
        question: 'Calificaciones: 6, 9, 7, 10, 8, 5, 8. ¿Cuál es la mediana?',
        options: ['7', '8', '9', '10'],
        correct: '8',
        tip: 'Ordena primero: 5, 6, 7, 8, 8, 9, 10. El valor central (4° de 7) es... 📚',
      },
      {
        question: '¿Por qué la mediana es útil cuando hay valores extremos (muy altos o muy bajos)?',
        options: [
          'Porque es el número más común',
          'Porque no se ve afectada por valores extremos como el promedio',
          'Porque siempre es mayor que el promedio',
          'Porque es más fácil de calcular',
        ],
        correct: 'Porque no se ve afectada por valores extremos como el promedio',
        tip: 'Ejemplo: sueldos de 1000, 1000, 1000, 1000, 100000 pesos. El promedio sería engañoso, pero la mediana (1000) refleja mejor la realidad. 💡',
      },
    ],
    // Nivel 5 - La Moda
    [
      {
        question: 'Datos: 4, 7, 4, 9, 4, 7, 2. ¿Cuál es la moda?',
        options: ['2', '4', '7', '9'],
        correct: '4',
        tip: 'La moda es el valor que aparece con mayor frecuencia. ¿Cuántas veces aparece cada número? 📊',
      },
      {
        question: 'Datos: 1, 3, 5, 7, 9. ¿Tiene moda este conjunto?',
        options: ['Sí, la moda es 1', 'Sí, la moda es 9', 'No tiene moda porque todos aparecen igual', 'Sí, la moda es 5'],
        correct: 'No tiene moda porque todos aparecen igual',
        tip: 'Si todos los valores tienen la misma frecuencia (1 vez cada uno), no hay moda. 🔢',
      },
      {
        question: 'Tallas de zapato: 24,25,26,25,24,25,27,25,24,26. ¿Cuál es la moda?',
        options: ['24', '25', '26', '27'],
        correct: '25',
        tip: 'Cuenta la frecuencia de cada talla. ¿Cuál aparece más veces? 👟',
      },
      {
        question: 'Colores favoritos de 10 niños: azul,rojo,verde,azul,azul,rojo,amarillo,azul,verde,rojo. ¿Cuál es la moda?',
        options: ['Rojo', 'Azul', 'Verde', 'Amarillo'],
        correct: 'Azul',
        tip: 'Azul aparece 4 veces, rojo 3 veces, verde 2 veces, amarillo 1 vez. ¿Cuál es la moda? 🎨',
      },
    ],
    // Nivel 6 - Probabilidad Básica
    [
      {
        question: 'Al lanzar un dado de 6 caras, ¿cuál es la probabilidad de obtener un 4?',
        options: ['1/3', '1/4', '1/6', '1/2'],
        correct: '1/6',
        tip: 'Probabilidad = casos favorables ÷ casos totales = 1 ÷ 6 🎲',
      },
      {
        question: 'En una bolsa hay 3 bolas rojas, 2 azules y 5 verdes. ¿Cuál es la probabilidad de sacar una roja?',
        options: ['1/5', '3/10', '1/3', '1/2'],
        correct: '3/10',
        tip: 'Total de bolas = 3+2+5 = 10. Probabilidad de roja = 3 ÷ 10 = ? 🎱',
      },
      {
        question: 'Al lanzar una moneda, ¿cuál es la probabilidad de obtener "sol"?',
        options: ['1/4', '1/3', '1/2', '2/3'],
        correct: '1/2',
        tip: 'Una moneda tiene 2 caras iguales de posibles: sol o águila. Probabilidad = 1 ÷ 2 = ? 🪙',
      },
      {
        question: 'En una tómbola con 20 boletos (del 1 al 20), ¿cuál es la probabilidad de sacar un número par?',
        options: ['1/4', '2/5', '1/2', '3/5'],
        correct: '1/2',
        tip: 'Números pares del 1 al 20: 2,4,6,8,10,12,14,16,18,20 = 10 números. P = 10/20 = ? 🎟️',
      },
    ],
    // Nivel 7 - Calculando Probabilidad
    [
      {
        question: 'Si la probabilidad de lluvia es 0.35, ¿cuál es la probabilidad de que NO llueva?',
        options: ['0.55', '0.60', '0.65', '0.75'],
        correct: '0.65',
        tip: 'La suma de probabilidades complementarias siempre es 1. P(no llueve) = 1 - 0.35 = ? 🌦️',
      },
      {
        question: 'En una caja hay 4 bolas azules y 6 bolas rojas. Si sacas una al azar, ¿cuál es la probabilidad de que NO sea azul?',
        options: ['2/5', '3/5', '4/10', '1/2'],
        correct: '3/5',
        tip: 'P(no azul) = P(roja) = 6/10 = 3/5. O también 1 - P(azul) = 1 - 4/10 = ? 🎱',
      },
      {
        question: 'Al lanzar un dado, ¿cuál es la probabilidad de sacar un número mayor que 4?',
        options: ['1/6', '2/6', '3/6', '4/6'],
        correct: '2/6',
        tip: 'Números mayores que 4: solo 5 y 6. P = 2 ÷ 6 = ? 🎲',
      },
      {
        question: 'En un gráfico circular, "Matemáticas" representa el 30%. Si participaron 200 estudiantes, ¿cuántos eligieron Matemáticas?',
        options: ['50', '55', '60', '65'],
        correct: '60',
        tip: 'Calcula el 30% de 200: 200 × 30 ÷ 100 = ? 🥧',
      },
    ],
    // Nivel 8 - Desafío Final (Estadística)
    [
      {
        question: 'Datos: 5, 8, 12, 6, 9, 8, 7. Calcula la media, mediana y moda. ¿Cuál de estas afirmaciones es correcta?',
        options: [
          'Media=7.9, Mediana=8, Moda=8',
          'Media=8, Mediana=8, Moda=8',
          'Media=7.9, Mediana=7, Moda=6',
          'Media=8, Mediana=7, Moda=8',
        ],
        correct: 'Media=7.9, Mediana=8, Moda=8',
        tip: 'Suma=55, Media=55÷7≈7.9. Ordenados: 5,6,7,8,8,9,12, centro=8. Moda=8 (aparece 2 veces). 📊',
      },
      {
        question: 'Se lanzó un dado 60 veces. ¿Cuántas veces se esperaría sacar un 3?',
        options: ['8', '10', '12', '15'],
        correct: '10',
        tip: 'P(3) = 1/6. Número esperado = 60 × (1/6) = ? 🎲',
      },
      {
        question: 'Una gráfica muestra que el 40% prefiere pizza, 35% hamburguesa y 25% sushi en un grupo de 80 personas. ¿Cuántas personas prefieren sushi?',
        options: ['15', '18', '20', '25'],
        correct: '20',
        tip: '25% de 80 = 80 × 0.25 = ? 🍣',
      },
      {
        question: 'En una bolsa hay fichas del 1 al 10. ¿Cuál es la probabilidad de sacar un múltiplo de 3?',
        options: ['1/5', '3/10', '2/5', '1/3'],
        correct: '3/10',
        tip: 'Múltiplos de 3 entre 1 y 10: 3, 6, 9 = 3 fichas. P = 3/10 🎲',
      },
    ],
  ],
  // TEMA: SENTIDO NUMÉRICO Y ARITMÉTICA
    numeric: [
    // Nivel 1 - Múltiplos
    [
      {
        question: '¿Cuál de estos NO es múltiplo de 6?',
        options: ['12', '18', '22', '24'],
        correct: '22',
        tip: 'Los múltiplos de 6 son: 6, 12, 18, 24, 30... ¿Cuál no aparece en esa lista? 🔢',
      },
      {
        question: '¿Cuál es el 5° múltiplo de 7?',
        options: ['28', '35', '42', '49'],
        correct: '35',
        tip: 'Los múltiplos de 7 son: 7×1=7, 7×2=14, 7×3=21, 7×4=28, 7×5=? ⭐',
      },
      {
        question: '¿Cuántos múltiplos de 9 hay entre 1 y 50?',
        options: ['4', '5', '6', '7'],
        correct: '5',
        tip: 'Lista los múltiplos de 9: 9, 18, 27, 36, 45... ¿Cuáles caen entre 1 y 50? 📊',
      },
      {
        question: '¿Cuál es el múltiplo de 8 más cercano a 100, sin pasarse?',
        options: ['88', '92', '96', '100'],
        correct: '96',
        tip: '8 × 12 = 96 y 8 × 13 = 104. ¿Cuál está más cerca sin pasarse de 100? 🎯',
      },
    ],
    // Nivel 2 - Divisores
    [
      {
        question: '¿Cuántos divisores tiene el número 12?',
        options: ['4', '5', '6', '7'],
        correct: '6',
        tip: 'Los divisores de 12: 1, 2, 3, 4, 6 y 12. ¡Cuéntalos! 🔢',
      },
      {
        question: '¿Cuál de estos NO es divisor de 30?',
        options: ['5', '6', '7', '10'],
        correct: '7',
        tip: 'Un divisor divide al número exactamente. Prueba: 30 ÷ 7 = ? ¿Cabe exacto? 🧮',
      },
      {
        question: '¿Cuántos divisores tiene el número 16?',
        options: ['3', '4', '5', '6'],
        correct: '5',
        tip: 'Los divisores de 16 son: 1, 2, 4, 8 y 16. ¡Cuenta! 🔍',
      },
      {
        question: '¿Cuál es el mayor divisor de 48, diferente de 48?',
        options: ['12', '16', '24', '36'],
        correct: '24',
        tip: '48 ÷ 2 = 24. La mitad de un número siempre es su mayor divisor propio. ✂️',
      },
    ],
    // Nivel 3 - Divisibilidad (2, 5 y 10)
    [
      {
        question: '¿Por qué el número 374 es divisible entre 2?',
        options: ['Termina en número par', 'Termina en número impar', 'Su suma de dígitos es par', 'Termina en 5'],
        correct: 'Termina en número par',
        tip: 'Un número es divisible entre 2 si su último dígito es 0, 2, 4, 6 u 8. El 4 es par. ✅',
      },
      {
        question: '¿Es el 1,235 divisible entre 5?',
        options: ['Sí, termina en 5', 'No, no termina en 0', 'Sí, es impar', 'No, es muy grande'],
        correct: 'Sí, termina en 5',
        tip: 'Un número es divisible entre 5 si su último dígito es 0 o 5. 🔟',
      },
      {
        question: '¿Cuál de estos números es divisible entre 10?',
        options: ['3,451', '3,455', '3,450', '3,453'],
        correct: '3,450',
        tip: 'Para ser divisible entre 10, el número debe terminar en 0. 🎯',
      },
      {
        question: '¿Cuál de estos números NO es divisible entre 2 ni entre 5?',
        options: ['340', '345', '346', '347'],
        correct: '347',
        tip: 'No divisible entre 2 → termina en impar. No divisible entre 5 → no termina en 0 ni 5. 🧩',
      },
    ],
    // Nivel 4 - Divisibilidad (3 y 9)
    [
      {
        question: '¿Por qué el 432 es divisible entre 3?',
        options: ['Su suma de dígitos es 9', 'Termina en número par', 'Termina en 2', 'Es mayor que 100'],
        correct: 'Su suma de dígitos es 9',
        tip: 'Criterio del 3: suma los dígitos → 4+3+2=9. ¿Es 9 divisible entre 3? ✅',
      },
      {
        question: '¿Cuál de estos números es divisible entre 9?',
        options: ['325', '412', '531', '623'],
        correct: '531',
        tip: 'Suma los dígitos de cada número. 5+3+1=9, que es divisible entre 9. 🧮',
      },
      {
        question: '¿Es el 2,457 divisible entre 3?',
        options: ['Sí, porque 2+4+5+7=18', 'No, porque es impar', 'Sí, porque termina en 7', 'No, es muy grande'],
        correct: 'Sí, porque 2+4+5+7=18',
        tip: 'Suma los dígitos: 2+4+5+7=18. ¿Es 18 divisible entre 3? 18÷3=6. ¡Sí! ✅',
      },
      {
        question: '¿Qué dígito hace que 57_ sea divisible entre 9?',
        options: ['3', '5', '6', '8'],
        correct: '6',
        tip: 'La suma conocida es 5+7=12. Necesitas que 12+? sea múltiplo de 9. 12+6=18 ✓ 🎯',
      },
    ],
    // Nivel 5 - Números Primos y Compuestos
    [
      {
        question: '¿Cuál de estos es un número PRIMO?',
        options: ['15', '21', '23', '27'],
        correct: '23',
        tip: 'Un primo solo se divide entre 1 y él mismo. Prueba dividir 23 entre 2, 3, 4... 🔒',
      },
      {
        question: '¿Cuál de estos es un número COMPUESTO?',
        options: ['11', '13', '17', '21'],
        correct: '21',
        tip: '21 = 3 × 7. Tiene más de dos divisores. 🧩',
      },
      {
        question: '¿Cuántos números primos hay entre 1 y 20?',
        options: ['6', '7', '8', '9'],
        correct: '8',
        tip: 'Los primos del 1 al 20: 2, 3, 5, 7, 11, 13, 17, 19. ¡Cuéntalos! 🔢',
      },
      {
        question: '¿El número 1 es primo?',
        options: ['Sí, solo se divide entre 1 y sí mismo', 'No, los primos tienen exactamente 2 divisores', 'Sí, es el primer número', 'No, porque es impar'],
        correct: 'No, los primos tienen exactamente 2 divisores',
        tip: 'El 1 solo tiene UN divisor. Los primos necesitan EXACTAMENTE dos: 1 y el número. ❌',
      },
    ],
    // Nivel 6 - MCM
    [
      {
        question: '¿Cuál es el MCM de 4 y 6?',
        options: ['8', '10', '12', '24'],
        correct: '12',
        tip: 'Lista múltiplos de 4: 4,8,12... y de 6: 6,12... El primero que coincide es el MCM. 📋',
      },
      {
        question: '¿Cuál es el MCM de 3 y 8?',
        options: ['11', '16', '24', '48'],
        correct: '24',
        tip: 'Múltiplos de 8: 8,16,24... ¿Cuál de esos también es múltiplo de 3? 24÷3=8 ✓ 🎯',
      },
      {
        question: 'Dos autobuses salen cada 12 y cada 8 minutos. ¿Cada cuántos minutos coinciden?',
        options: ['16 min', '20 min', '24 min', '32 min'],
        correct: '24 min',
        tip: 'El MCM de 12 y 8: múltiplos de 12: 12,24... múltiplos de 8: 8,16,24 ✓ 🚌',
      },
      {
        question: '¿Cuál es el MCM de 5 y 7?',
        options: ['12', '21', '35', '70'],
        correct: '35',
        tip: 'Cuando dos números son primos entre sí, su MCM es su producto: 5×7=? 🔢',
      },
    ],
    // Nivel 7 - MCD
    [
      {
        question: '¿Cuál es el MCD de 12 y 18?',
        options: ['3', '4', '6', '9'],
        correct: '6',
        tip: 'Divisores de 12: 1,2,3,4,6,12. Divisores de 18: 1,2,3,6,9,18. ¿El mayor común? 🔍',
      },
      {
        question: '¿Cuál es el MCD de 24 y 36?',
        options: ['6', '8', '12', '18'],
        correct: '12',
        tip: 'El MCD es el mayor número que divide exactamente a ambos. 🧮',
      },
      {
        question: 'Tienes 30 manzanas y 45 naranjas. ¿En cuántos grupos iguales puedes repartirlas sin que sobre nada?',
        options: ['5', '10', '15', '30'],
        correct: '15',
        tip: 'El MCD(30, 45) te da el máximo de grupos iguales. Divisores comunes: 1,3,5,15. 🍎🍊',
      },
      {
        question: '¿Cuál es el MCD de 35 y 49?',
        options: ['5', '7', '14', '35'],
        correct: '7',
        tip: '35 = 5×7 y 49 = 7×7. El factor que comparten es... 🔑',
      },
    ],
    // Nivel 8 - Desafío Final (Numérico)
    [
      {
        question: '¿Cuál es el MCM de 6, 8 y 12?',
        options: ['12', '16', '24', '48'],
        correct: '24',
        tip: 'Busca el menor múltiplo de 6, 8 Y 12 al mismo tiempo. 24÷6=4 ✓ 24÷8=3 ✓ 24÷12=2 ✓ 🎯',
      },
      {
        question: '¿Cuál es el MCD de 48 y 72?',
        options: ['12', '16', '24', '36'],
        correct: '24',
        tip: 'Divisores de 48: ...12,16,24. Divisores de 72: ...12,18,24,36. ¿El mayor común? 🔍',
      },
      {
        question: 'Un número es divisible entre 2, entre 3 y entre 5. ¿Cuál podría ser?',
        options: ['45', '60', '75', '80'],
        correct: '60',
        tip: 'El número debe ser múltiplo de MCM(2,3,5)=30. De las opciones, ¿cuál es múltiplo de 30? 🧩',
      },
      {
        question: '¿Cuál es el número primo más grande menor que 50?',
        options: ['43', '45', '47', '49'],
        correct: '47',
        tip: '49=7×7 (compuesto), 45=5×9 (compuesto). ¿47 se divide entre algún número entre 2 y 6? 🔒',
      },
    ],
  ],

  // TEMA: UNIDADES DE MEDIDA Y CONVERSIONES
  measurement: [
    [
      { question: '3 km = ? metros', options: ['300 m', '3,000 m', '30,000 m', '300,000 m'], correct: '3,000 m', tip: '1 km = 1,000 m. Multiplica: 3 × 1,000 = ? 📏' },
      { question: '450 cm = ? metros', options: ['0.45 m', '4.5 m', '45 m', '4,500 m'], correct: '4.5 m', tip: '1 m = 100 cm. Divide: 450 ÷ 100 = ? 📐' },
      { question: 'Una maratón tiene 42 km. ¿Cuántos metros son?', options: ['420 m', '4,200 m', '42,000 m', '420,000 m'], correct: '42,000 m', tip: '1 km = 1,000 m. Multiplica: 42 × 1,000 = ? 🏃' },
      { question: '2.5 km = ? centímetros', options: ['2,500 cm', '25,000 cm', '250,000 cm', '2,500,000 cm'], correct: '250,000 cm', tip: '1 km = 100,000 cm. Multiplica: 2.5 × 100,000 = ? 🔢' },
    ],
    [
      { question: '4 kg = ? gramos', options: ['40 g', '400 g', '4,000 g', '40,000 g'], correct: '4,000 g', tip: '1 kg = 1,000 g. Multiplica: 4 × 1,000 = ? ⚖️' },
      { question: '2,500 g = ? kilogramos', options: ['0.25 kg', '2.5 kg', '25 kg', '250 kg'], correct: '2.5 kg', tip: 'Divide: 2,500 ÷ 1,000 = ? 🧮' },
      { question: 'Una bolsa pesa 750 g y otra pesa 1.25 kg. ¿Cuánto pesan juntas en gramos?', options: ['1,750 g', '1,850 g', '2,000 g', '2,250 g'], correct: '2,000 g', tip: 'Convierte 1.25 kg → 1,250 g. Luego suma: 750 + 1,250 = ? 🎒' },
      { question: '¿Cuántos kilogramos son 3,750 g?', options: ['3.5 kg', '3.75 kg', '37.5 kg', '375 kg'], correct: '3.75 kg', tip: 'Divide: 3,750 ÷ 1,000 = ? ⚖️' },
    ],
    [
      { question: '2 L = ? mililitros', options: ['200 mL', '2,000 mL', '20,000 mL', '200,000 mL'], correct: '2,000 mL', tip: '1 L = 1,000 mL. Multiplica: 2 × 1,000 = ? 💧' },
      { question: '500 mL = ? litros', options: ['0.05 L', '0.5 L', '5 L', '50 L'], correct: '0.5 L', tip: 'Divide: 500 ÷ 1,000 = ? 🥤' },
      { question: 'Una jarra tiene 1.5 L de jugo. ¿Cuántos vasos de 250 mL puedes llenar?', options: ['4', '5', '6', '8'], correct: '6', tip: 'Convierte 1.5 L → 1,500 mL. Divide: 1,500 ÷ 250 = ? 🍹' },
      { question: 'Una alberca tiene 12,000 litros. ¿Cuántos m³ son? (1 m³ = 1,000 L)', options: ['1.2 m³', '12 m³', '120 m³', '1,200 m³'], correct: '12 m³', tip: 'Divide: 12,000 ÷ 1,000 = ? 🏊' },
    ],
    [
      { question: '3 horas = ? minutos', options: ['30 min', '90 min', '180 min', '300 min'], correct: '180 min', tip: '1 hora = 60 minutos. Multiplica: 3 × 60 = ? ⏰' },
      { question: '150 minutos = ¿cuántas horas y minutos?', options: ['1 h 90 min', '2 h 30 min', '2 h 50 min', '3 h 30 min'], correct: '2 h 30 min', tip: 'Divide: 150 ÷ 60 = 2 con residuo 30. ⏱️' },
      { question: '4 horas 20 minutos = ? minutos en total', options: ['240 min', '250 min', '260 min', '280 min'], correct: '260 min', tip: '4 × 60 = 240 min. Luego suma los 20 min: 240 + 20 = ? ⏰' },
      { question: 'Una película dura 7,200 segundos. ¿Cuántas horas dura?', options: ['1 hora', '1.5 horas', '2 horas', '3 horas'], correct: '2 horas', tip: 'Primero a minutos: 7,200 ÷ 60 = 120 min. Luego a horas: 120 ÷ 60 = ? 🎬' },
    ],
    [
      { question: '1 lustro = ? años', options: ['4 años', '5 años', '10 años', '25 años'], correct: '5 años', tip: 'Un lustro es un período especial de 5 años. 📅' },
      { question: '¿Cuántas décadas tiene un siglo?', options: ['5', '8', '10', '20'], correct: '10', tip: '1 siglo = 100 años. 1 década = 10 años. 100 ÷ 10 = ? 📚' },
      { question: 'El año 2024, ¿en qué siglo estamos?', options: ['Siglo XIX', 'Siglo XX', 'Siglo XXI', 'Siglo XXII'], correct: 'Siglo XXI', tip: 'El siglo XXI va del año 2001 al 2100. 🗓️' },
      { question: '¿Cuántos minutos tiene un día completo?', options: ['720 min', '1,440 min', '2,880 min', '86,400 min'], correct: '1,440 min', tip: '1 día = 24 horas. 1 hora = 60 min. Multiplica: 24 × 60 = ? ⏰' },
    ],
    [
      { question: '¿Cuántos grados tiene un ángulo recto?', options: ['45°', '90°', '180°', '360°'], correct: '90°', tip: 'Un ángulo recto es la esquina de un cuadrado. Se dibuja con un cuadradito pequeño. 📐' },
      { question: '¿Cuántos grados tiene un ángulo llano?', options: ['90°', '120°', '180°', '270°'], correct: '180°', tip: 'Un ángulo llano forma una línea recta. Es el doble de un ángulo recto: 90 × 2 = ? 📏' },
      { question: 'Un triángulo tiene ángulos de 60° y 70°. ¿Cuánto mide el tercer ángulo?', options: ['40°', '50°', '60°', '70°'], correct: '50°', tip: 'La suma de los ángulos de todo triángulo es 180°. 180 - 60 - 70 = ? 🔺' },
      { question: 'Un reloj marca las 3:00. ¿Qué ángulo forman las manecillas?', options: ['45°', '90°', '120°', '180°'], correct: '90°', tip: 'El reloj completo son 360°. Hay 12 horas, cada una vale 30°. De 12 a 3 hay 3 horas: 3 × 30° = ? 🕐' },
    ],
    [
      { question: 'Una sala mide 5 m de largo y 4 m de ancho. ¿Cuántos m² tiene?', options: ['9 m²', '18 m²', '20 m²', '24 m²'], correct: '20 m²', tip: 'Área = largo × ancho = 5 × 4 = ? 🏠' },
      { question: '1 hectárea = ? metros cuadrados', options: ['100 m²', '1,000 m²', '10,000 m²', '100,000 m²'], correct: '10,000 m²', tip: 'Una hectárea es un cuadrado de 100 m × 100 m = 10,000 m². 🌳' },
      { question: 'Un terreno tiene 3 hectáreas. ¿Cuántos m² son?', options: ['3,000 m²', '30,000 m²', '300,000 m²', '3,000,000 m²'], correct: '30,000 m²', tip: '1 ha = 10,000 m². Multiplica: 3 × 10,000 = ? 🌾' },
      { question: 'Una cancha mide 100 m × 70 m. ¿Cuántas hectáreas ocupa?', options: ['0.07 ha', '0.7 ha', '7 ha', '70 ha'], correct: '0.7 ha', tip: 'Área = 100 × 70 = 7,000 m². Divide entre 10,000: 7,000 ÷ 10,000 = ? ⚽' },
    ],
    [
      { question: 'Un recipiente de 4 L contiene 2.5 L. ¿Cuántos mL faltan para llenarlo?', options: ['1,000 mL', '1,250 mL', '1,500 mL', '2,500 mL'], correct: '1,500 mL', tip: 'Faltan 4 - 2.5 = 1.5 L. Convierte: 1.5 × 1,000 = ? mL 💧' },
      { question: 'El Virreinato de Nueva España duró ~300 años. ¿Cuántas décadas son?', options: ['20', '25', '30', '40'], correct: '30', tip: '1 década = 10 años. Divide: 300 ÷ 10 = ? 📚' },
      { question: 'Un ángulo obtuso mide entre 90° y 180°. ¿Cuál de estos ES obtuso?', options: ['45°', '90°', '120°', '200°'], correct: '120°', tip: 'Obtuso: mayor que 90° Y menor que 180°. 📐' },
      { question: 'Una parcela mide 250 m × 80 m. ¿Cuántas hectáreas tiene?', options: ['1 ha', '2 ha', '20 ha', '200 ha'], correct: '2 ha', tip: 'Área = 250 × 80 = 20,000 m². 1 ha = 10,000 m². ¿Cuántas hectáreas son? 🌾' },
    ],
  ],

  // TEMA: PENSAMIENTO LÓGICO Y PRECÁLCULO
  logic: [
    [
      { question: '¿Cuál es el siguiente número? 3, 6, 9, 12, _', 
        options: ['13', '14', '15', '18'], 
        correct: '15', 
        tip: 'La diferencia entre cada número es siempre la misma. ¿Cuánto se suma cada vez? 🔢' },
      { question: 'Completa la sucesión: 100, 90, _, 70, 60', options: ['75', '80', '82', '85'], correct: '80', tip: 'La sucesión va bajando. ¿De cuánto en cuánto disminuye? 📉' },
      { question: '¿Cuál es el siguiente número? 1, 4, 7, 10, 13, _', options: ['14', '15', '16', '17'], correct: '16', tip: '4-1=3, 7-4=3... La diferencia es siempre 3. 🎯' },
      { question: 'Sucesión: 2, 5, 8, 11, 14, _', options: ['15', '16', '17', '18'], correct: '17', tip: 'Observa la diferencia entre cada par. Suma 3 al último término. ➕' },
    ],
    [
      { question: '¿Cuál es el siguiente número? 2, 4, 8, 16, _', options: ['18', '24', '32', '64'], correct: '32', tip: 'Cada número se multiplica por 2. 16 × 2 = ? ✖️' },
      { question: 'Completa: 3, 9, 27, 81, _', options: ['162', '210', '243', '324'], correct: '243', tip: '3×3=9, 9×3=27, 27×3=81, 81×3=? 🔢' },
      { question: '¿Cuál es el término faltante? 1, 5, 25, _, 625', options: ['100', '115', '125', '150'], correct: '125', tip: 'Cada término se multiplica por 5. 25 × 5 = ? ⭐' },
      { question: 'Sucesión especial: 1, 2, 6, 24, _', options: ['48', '96', '120', '144'], correct: '120', tip: '1×2=2, 2×3=6, 6×4=24, 24×5=? 🧩' },
    ],
    [
      { question: 'Triángulos con palitos: figura 1=3, figura 2=5, figura 3=7. ¿Cuántos tiene la figura 4?', options: ['8', '9', '10', '11'], correct: '9', tip: 'Cada nueva figura agrega 2 palitos. 7 + 2 = ? 🔺' },
      { question: 'Patrón de cuadrados: 1, 4, 9, 16, _', options: ['20', '24', '25', '36'], correct: '25', tip: '1²=1, 2²=4, 3²=9, 4²=16, 5²=? 🔲' },
      { question: 'Patrón de colores: Rojo, Azul, Verde, Rojo, Azul, Verde, Rojo, _', options: ['Rojo', 'Azul', 'Verde', 'Amarillo'], correct: 'Azul', tip: 'El patrón se repite cada 3 colores. Posición 8 = posición 2 en el patrón. 🎨' },
      { question: 'Sucesión: T1=2, cada término es 3 más que el anterior. ¿Cuál es el término 6?', options: ['14', '15', '17', '20'], correct: '17', tip: 'T1=2, T2=5, T3=8, T4=11, T5=14, T6=? 🔢' },
    ],
    [
      { question: '¿Cuál es el siguiente término? 1, 3, 7, 13, 21, _', options: ['25', '28', '31', '35'], correct: '31', tip: 'Las diferencias entre términos son: 2, 4, 6, 8... ¿Cuál sigue? 🧠' },
      { question: 'Sucesión de Fibonacci: 1, 1, 2, 3, 5, 8, 13, _', options: ['18', '20', '21', '24'], correct: '21', tip: 'Cada número es la suma de los DOS anteriores. 8 + 13 = ? 🌀' },
      { question: '¿Cuál es el término faltante? 2, 6, 18, _, 162', options: ['36', '48', '54', '72'], correct: '54', tip: '2×3=6, 6×3=18, 18×3=?, ?×3=162. La razón es 3. ✖️' },
      { question: 'Patrón: 100, 50, 25, 12.5, _', options: ['5', '6.25', '6.5', '10'], correct: '6.25', tip: 'Cada término se divide entre 2. 12.5 ÷ 2 = ? ➗' },
    ],
    [
      { question: 'Progresión geométrica: T1=3, razón=4. ¿Cuál es el 3er término?', options: ['12', '24', '48', '96'], correct: '48', tip: 'T1=3, T2=3×4=12, T3=12×4=? ✖️' },
      { question: '¿Cuál es la razón de la sucesión: 5, 15, 45, 135?', options: ['2', '3', '5', '10'], correct: '3', tip: 'Divide cualquier término entre el anterior: 15÷5=? 🔢' },
      { question: 'Un microorganismo se duplica cada hora. Empiezas con 1. ¿Cuántos hay después de 5 horas?', options: ['16', '25', '32', '64'], correct: '32', tip: 'Razón=2. T1=2, T2=4, T3=8, T4=16, T5=? 🦠' },
      { question: 'Progresión geométrica: T1=2, razón=3. ¿Cuál es el 4° término?', options: ['24', '36', '54', '162'], correct: '54', tip: 'T1=2, T2=6, T3=18, T4=18×3=? 🎯' },
    ],
    [
      { question: '□ + 15 = 40. ¿Cuánto vale □?', options: ['20', '25', '30', '55'], correct: '25', tip: 'Si □ + 15 = 40, entonces □ = 40 - 15. ¡La resta es la inversa de la suma! 📦' },
      { question: '□ × 7 = 56. ¿Cuánto vale □?', options: ['6', '7', '8', '9'], correct: '8', tip: 'Si □ × 7 = 56, entonces □ = 56 ÷ 7. ¡La división es la inversa de la multiplicación! 📦' },
      { question: '3 × □ + 2 = 17. ¿Cuánto vale □?', options: ['4', '5', '6', '7'], correct: '5', tip: 'Paso 1: 3 × □ = 17 - 2 = 15. Paso 2: □ = 15 ÷ 3 = ? 🧩' },
      { question: '□ ÷ 4 = 12. ¿Cuánto vale □?', options: ['8', '16', '36', '48'], correct: '48', tip: 'Si □ ÷ 4 = 12, entonces □ = 12 × 4. ¡La multiplicación es la inversa de la división! 📦' },
    ],
    [
      { question: '2 × □ - 3 = 11. ¿Cuánto vale □?', options: ['5', '6', '7', '8'], correct: '7', tip: 'Suma 3: 2 × □ = 14. Divide entre 2: □ = ? 🧮' },
      { question: 'Si x + x + 5 = 21, ¿cuánto vale x?', options: ['6', '7', '8', '9'], correct: '8', tip: '2x + 5 = 21. Resta 5: 2x = 16. Divide entre 2: x = ? 🔢' },
      { question: 'Ana tiene el doble de años que Beto. La suma de sus edades es 24. ¿Cuántos años tiene Beto?', options: ['6', '8', '10', '12'], correct: '8', tip: 'Beto=x, Ana=2x. Suma: x + 2x = 3x = 24. Divide entre 3: x = ? 👫' },
      { question: '□² = 49. ¿Cuánto vale □?', options: ['5', '6', '7', '8'], correct: '7', tip: '¿Qué número multiplicado por sí mismo da 49? 7×7=? 🔢' },
    ],
    [
      { question: 'Fibonacci: 1,1,2,3,5,8,13,21,34,_. ¿Cuál sigue?', options: ['45', '50', '55', '68'], correct: '55', tip: 'Cada número es la suma de los dos anteriores. 21 + 34 = ? 🌀' },
      { question: 'Si 3x + 7 = 31, ¿cuánto vale x?', options: ['6', '7', '8', '9'], correct: '8', tip: 'Paso 1: resta 7 → 3x = 24. Paso 2: divide entre 3 → x = ? 🧮' },
      { question: 'Regla: "multiplica por 2 y suma 1". T1=1. ¿Cuál es el 4° término?', options: ['9', '12', '15', '31'], correct: '15', tip: 'T1=1, T2=1×2+1=3, T3=3×2+1=7, T4=7×2+1=? 🔄' },
      { question: 'Hay el doble de estrellas rojas que azules. Si hay 45 en total, ¿cuántas son azules?', options: ['12', '15', '18', '20'], correct: '15', tip: 'Azules=x, Rojas=2x. Suma: x+2x=3x=45. Divide entre 3: x=? ⭐' },
    ],
  ],

  // TEMA: EDUCACIÓN FINANCIERA
  finance: [
    [
      { question: 'Compraste 3 cuadernos de $15 c/u y una mochila de $120. ¿Cuánto gastaste en total?', options: ['$135', '$145', '$165', '$175'], correct: '$165', tip: 'Cuadernos: 3 × $15 = $45. Total: $45 + $120 = ? 📚' },
      { question: 'Tenías $200. Compraste un helado de $25 y una torta de $45. ¿Cuánto te queda?', options: ['$120', '$125', '$130', '$140'], correct: '$130', tip: 'Gastos: 25 + 45 = $70. Restante: 200 - 70 = ? 🍦' },
      { question: 'Compras: 2 plumas ($8 c/u), 1 libreta ($22) y 3 borradores ($5 c/u). ¿Cuánto pagas?', options: ['$45', '$50', '$53', '$58'], correct: '$53', tip: 'Plumas=16, libreta=22, borradores=15. Suma: 16+22+15=? ✏️' },
      { question: 'Papá tiene $500. Paga electricidad ($180), agua ($95) y despensa ($210). ¿Cuánto sobra?', options: ['$5', '$10', '$15', '$20'], correct: '$15', tip: 'Suma gastos: 180+95+210=$485. Restante: 500-485=? 💡' },
    ],
    [
      { question: 'Pagas $50 por un artículo de $37. ¿Cuánto te dan de cambio?', options: ['$10', '$12', '$13', '$17'], correct: '$13', tip: 'Cambio = dinero pagado - precio = 50 - 37 = ? 💵' },
      { question: 'Tus artículos suman $148. Pagas con un billete de $200. ¿Cuál es el cambio correcto?', options: ['$48', '$50', '$52', '$62'], correct: '$52', tip: 'Cambio = 200 - 148 = ? 🧾' },
      { question: 'Compraste: $45 + $38 + $62. Pagas con $200. ¿Cuál es el cambio?', options: ['$45', '$50', '$55', '$60'], correct: '$55', tip: 'Suma los precios: 45+38+62=$145. Cambio: 200-145=? 🛒' },
      { question: 'La cajera te da: 1 billete de $20, 1 de $10 y 4 monedas de $5. ¿Cuánto es el cambio?', options: ['$40', '$45', '$50', '$55'], correct: '$50', tip: 'Suma: $20 + $10 + (4 × $5) = 20 + 10 + 20 = ? 💰' },
    ],
    [
      { question: '6 manzanas cuestan $24. ¿Cuánto cuesta cada manzana?', options: ['$3', '$4', '$5', '$6'], correct: '$4', tip: 'Precio unitario = precio total ÷ cantidad = 24 ÷ 6 = ? 🍎' },
      { question: 'Tienda A: 3 kg de arroz a $45. Tienda B: 5 kg a $80. ¿Cuál es más barata por kg?', options: ['Tienda A ($15/kg)', 'Tienda B ($16/kg)', 'Son iguales', 'Tienda B ($15/kg)'], correct: 'Tienda A ($15/kg)', tip: 'A=45÷3=?, B=80÷5=? Compara los resultados. 🛒' },
      { question: 'Refresco suelto: $18 c/u. Paquete de 6: $90. ¿Cuál conviene más por refresco?', options: ['Suelto ($18 c/u)', 'Paquete ($15 c/u)', 'Son iguales', 'Paquete ($20 c/u)'], correct: 'Paquete ($15 c/u)', tip: 'Precio por refresco del paquete: $90 ÷ 6 = ? Compara con $18. 🥤' },
      { question: 'Necesitas 10 cuadernos. Tienda: $12 c/u. Papelería: paquete de 5 por $55. ¿Cuánto ahorras?', options: ['$5', '$10', '$15', '$20'], correct: '$10', tip: 'Tienda: 10×$12=$120. Papelería: 2×$55=$110. Ahorro: 120-110=? 📚' },
    ],
    [
      { question: 'La familia gana $8,000 al mes. Gastos: renta $3,200, comida $1,500, servicios $800. ¿Cuánto les queda?', options: ['$2,000', '$2,500', '$3,000', '$3,500'], correct: '$2,500', tip: 'Suma gastos: 3,200+1,500+800=$5,500. Restante: 8,000-5,500=? 🏠' },
      { question: 'Tu mesada es de $150 y decides ahorrar el 10%. ¿Cuánto ahorras al mes?', options: ['$10', '$15', '$20', '$25'], correct: '$15', tip: '10% de $150 = 150 × 10 ÷ 100 = ? 🐷' },
      { question: 'Meta de ahorro: $6,000. Ahorras $750 al mes. ¿En cuántos meses llegarás a la meta?', options: ['6 meses', '7 meses', '8 meses', '10 meses'], correct: '8 meses', tip: 'Meses = meta ÷ ahorro mensual = 6,000 ÷ 750 = ? 🎯' },
      { question: 'Presupuesto de $5,000: 40% comida, 25% transporte, 20% servicios. ¿Cuánto queda libre?', options: ['$500', '$650', '$750', '$900'], correct: '$750', tip: 'Gastado: 40+25+20=85%. Libre: 15%. 15% de $5,000 = ? 💡' },
    ],
    [
      { question: 'Zapatillas de $600 con 25% de descuento. ¿Cuánto pagas?', options: ['$400', '$425', '$450', '$475'], correct: '$450', tip: 'Descuento = 600 × 0.25 = $150. Precio final = 600 - 150 = ? 👟' },
      { question: 'Playera ($180) + shorts ($120) con 20% de descuento en todo. ¿Cuánto pagas?', options: ['$210', '$225', '$240', '$270'], correct: '$240', tip: 'Total = 180+120=$300. Descuento=300×0.20=$60. Final=300-60=? 👕' },
      { question: 'Videojuego de $800 con 30% de descuento. Mes siguiente sube 15%. ¿Cuánto cuesta después?', options: ['$560', '$600', '$644', '$680'], correct: '$644', tip: 'Paso 1: 800×0.70=$560. Paso 2: 560×1.15=? 🎮' },
      { question: 'Artículo de $400: ¿es mejor 30% de descuento o $100 de descuento directo?', options: ['30% de descuento ($120 ahorro)', '$100 de descuento directo', 'Son exactamente iguales', '30% de descuento ($80 ahorro)'], correct: '30% de descuento ($120 ahorro)', tip: '30% de $400 = $120 de ahorro. ¿$120 o $100? ¿Cuál es mayor? 🏷️' },
    ],
    [
      { question: 'Un artículo de $200 sin IVA. ¿Cuánto es el IVA (16%)?', options: ['$16', '$24', '$32', '$40'], correct: '$32', tip: 'IVA = precio × 16% = 200 × 16 ÷ 100 = ? 🧾' },
      { question: 'Artículo de $350 sin IVA. ¿Cuánto pagas en total con 16% de IVA?', options: ['$366', '$396', '$406', '$416'], correct: '$406', tip: 'IVA = 350 × 0.16 = $56. Total = 350 + 56 = ? 💳' },
      { question: 'Un artículo CON IVA cuesta $580. ¿Cuánto es el precio SIN IVA? (IVA=16%)', options: ['$464', '$480', '$500', '$520'], correct: '$500', tip: 'Precio sin IVA = precio con IVA ÷ 1.16 = 580 ÷ 1.16 = ? 🧮' },
      { question: 'Factura: producto $450 + embalaje $50, más 16% de IVA. ¿Cuánto es el total?', options: ['$520', '$550', '$580', '$600'], correct: '$580', tip: 'Base = 450+50=$500. IVA = 500×0.16=$80. Total = 500+80=? 🧾' },
    ],
    [
      { question: 'Recibo de agua: consumo básico $85, excedente $45, cuota fija $30. ¿Cuál es el total?', options: ['$140', '$150', '$160', '$175'], correct: '$160', tip: 'Suma todos los conceptos: 85+45+30=? 💧' },
      { question: 'Recibo de luz: 150 kWh a $1.80/kWh más cargo fijo de $40. ¿Cuánto es el total?', options: ['$270', '$290', '$310', '$340'], correct: '$310', tip: 'Cargo por consumo = 150 × $1.80 = $270. Total = 270 + 40 = ? 💡' },
      { question: 'Recibo de luz: mes anterior=1,500 kWh, mes actual=1,680 kWh. ¿Cuántos kWh consumiste?', options: ['150 kWh', '160 kWh', '180 kWh', '200 kWh'], correct: '180 kWh', tip: 'Consumo = lectura actual - lectura anterior = 1,680 - 1,500 = ? ⚡' },
      { question: 'Presupuesto $3,000 para servicios. Recibos: luz=$450, agua=$160, gas=$380, internet=$350. ¿Cuánto sobra?', options: ['Sobran $1,460', 'Sobran $1,560', 'Sobran $1,660', 'Faltan $340'], correct: 'Sobran $1,660', tip: 'Suma los recibos: 450+160+380+350=$1,340. Restante: 3,000-1,340=? 📋' },
    ],
    [
      { question: 'Compraste artículos por $237.50 y pagaste con $300. ¿Cuál es el cambio correcto?', options: ['$57.50', '$62.50', '$63.50', '$72.50'], correct: '$62.50', tip: 'Cambio = 300 - 237.50 = ? 💵' },
      { question: '"50% de descuento en el 2° artículo". Compras dos playeras de $280 c/u. ¿Cuánto pagas?', options: ['$280', '$350', '$420', '$560'], correct: '$420', tip: '1a playera: $280 completa. 2a playera: 280×50%=$140. Total: 280+140=? 👕' },
      { question: 'Ingresos $12,000. Gastos: renta 35%, comida 25%, transporte 15%, servicios 10%. ¿Cuánto se puede ahorrar?', options: ['$1,200', '$1,500', '$1,800', '$2,400'], correct: '$1,800', tip: 'Gastos totales: 35+25+15+10=85%. Ahorro=15%. 15% de $12,000=? 🐷' },
      { question: 'Producto sin IVA: $650. Con 16% de IVA y luego 10% de descuento. ¿Cuánto pagas?', options: ['$624', '$656', '$678.60', '$693.60'], correct: '$678.60', tip: 'Paso 1: con IVA → 650×1.16=$754. Paso 2: con descuento → 754×0.90=? 🧾' },
    ],
  ],
};
