import { Request, Response } from 'express';
import { Ejercicio } from '../models/ejercicio';
//ejercicios//
export class EjercicioController {
  
  public static catalogoEjercicios: Record<string, any[][]> = {
    proportionality: [
      [
        new Ejercicio('Si 3 manzanas cuestan $15, ¿cuánto cuestan 6 manzanas?', ['$20', '$25', '$30', '$35'], '$30', 'Si duplicas la cantidad, el precio también se duplica. 15 × 2 = ? 🍎'),
        new Ejercicio('En una receta para 4 personas se usan 2 tazas de harina. ¿Cuántas tazas necesitas para 8 personas?', ['3 tazas', '4 tazas', '6 tazas', '8 tazas'], '4 tazas', 'Si duplicas las personas, duplicas los ingredientes. 2 × 2 = ? 🎂'),
        new Ejercicio('Un auto recorre 120 km en 2 horas. ¿Cuántos km recorre en 5 horas a la misma velocidad?', ['240 km', '280 km', '300 km', '360 km'], '300 km', 'Primero calcula cuánto recorre en 1 hora: 120 ÷ 2 = 60 km/h. Luego multiplica por 5. 🚗'),
        new Ejercicio('Si 5 cuadernos cuestan $35, ¿cuánto cuestan 3 cuadernos?', ['$15', '$18', '$21', '$25'], '$21', 'Primero calcula el precio de 1 cuaderno: 35 ÷ 5 = $7. Luego multiplica por 3. 📓')
      ],
      [
        new Ejercicio('En una tabla de proporcionalidad: X = 2 → Y = 6; X = 4 → Y = 12; X = 6 → Y = ?', ['15', '16', '18', '20'], '18', 'Encuentra la razón: Y ÷ X = 6 ÷ 2 = 3. Entonces Y = X × 3. ¿Cuánto es 6 × 3? 📊'),
        new Ejercicio('En una tabla: X = 1 → Y = 5; X = 3 → Y = 15; X = 5 → Y = ?', ['20', '25', '30', '35'], '25', 'La razón es Y ÷ X = 5 ÷ 1 = 5. Multiplica: 5 × 5 = ? 🔢'),
        new Ejercicio('Completa la tabla: Horas trabajadas: 2, 4, 6, 8. Pago en pesos: 50, 100, ?, 200.', ['130', '140', '150', '160'], '150', 'La razón es 50 ÷ 2 = $25 por hora. Si trabajas 6 horas: 6 × 25 = ? 💵'),
        new Ejercicio('En una tabla proporcional, si X = 7 da Y = 28, ¿cuál es la constante de proporcionalidad?', ['3', '4', '5', '6'], '4', 'La constante es Y ÷ X = 28 ÷ 7 = ? 🔑')
      ],
      [
        new Ejercicio('¿Cuánto es el 50% de 200?', ['50', '75', '100', '150'], '100', '50% significa la mitad. 200 ÷ 2 = ? 🍰'),
        new Ejercicio('¿Cuánto es el 25% de 80?', ['10', '15', '20', '25'], '20', '25% es la cuarta parte. 80 ÷ 4 = ? 📐'),
        new Ejercicio('¿Cuánto es el 10% de 350?', ['25', '30', '35', '40'], '35', 'El 10% se calcula dividiendo entre 10. 350 ÷ 10 = ? 🔢'),
        new Ejercicio('¿Cuánto es el 75% de 120?', ['75', '80', '90', '95'], '90', '75% = 50% + 25%. El 50% de 120 = 60 y el 25% de 120 = 30. Suma: 60 + 30 = ? 💡')
      ],
      [
        new Ejercicio('¿Qué porcentaje de 200 es 50?', ['10%', '15%', '20%', '25%'], '25%', 'Divide la parte entre el total y multiplica por 100: (50 ÷ 200) × 100 = ? 🎯'),
        new Ejercicio('En un examen de 40 preguntas, Lucía contestó 30 correctamente. ¿Qué porcentaje obtuvo?', ['60%', '65%', '70%', '75%'], '75%', '(30 ÷ 40) × 100 = ? 📝'),
        new Ejercicio('¿Cuánto es el 15% de 60?', ['6', '9', '12', '15'], '9', '10% de 60 = 6. 5% de 60 = 3. Suma: 6 + 3 = ? 🔢'),
        new Ejercicio('En una clase de 25 alumnos, 5 están ausentes. ¿Qué porcentaje de alumnos está presente?', ['70%', '75%', '80%', '85%'], '80%', 'Presentes = 25 - 5 = 20. Porcentaje = (20 ÷ 25) × 100 = ? 🏫')
      ],
      [
        new Ejercicio('Un libro cuesta $120 y tiene un descuento del 20%. ¿Cuánto pagas?', ['$84', '$90', '$96', '$100'], '$96', 'Descuento = 20% de 120 = $24. Precio final = 120 - 24 = ? 📚'),
        new Ejercicio('Un precio de $200 aumenta un 15%. ¿Cuál es el nuevo precio?', ['$215', '$225', '$230', '$240'], '$230', 'Aumento = 15% de 200 = $30. Nuevo precio = 200 + 30 = ? 📈'),
        new Ejercicio('En una tienda, el precio original es $500 y hay un descuento de 30%. ¿Cuánto ahorras?', ['$100', '$120', '$150', '$200'], '$150', 'Ahorro = 30% de 500 = (500 × 30) ÷ 100 = ? 💰'),
        new Ejercicio('Un celular costaba $3,000 y bajó un 10%. Luego subió 10% del precio rebajado. ¿Cuánto cuesta ahora?', ['$2,900', '$2,970', '$3,000', '$3,030'], '$2,970', 'Primero baja: 3,000 × 0.9 = 2,700. Luego sube: 2,700 × 1.1 = ? ¡Cuidado, no vuelve al mismo precio! 🤔')
      ],
      [
        new Ejercicio('En un mapa con escala 1:100,000, una distancia de 3 cm representa ¿cuántos km reales?', ['1 km', '2 km', '3 km', '4 km'], '3 km', '1 cm = 100,000 cm = 1 km en la realidad. Entonces 3 cm = ? km 🗺️'),
        new Ejercicio('Una maqueta tiene escala 1:50. Si la maqueta mide 10 cm, ¿cuánto mide el objeto real?', ['50 cm', '500 cm', '5 m', 'Ambas b y c son correctas'], 'Ambas b y c son correctas', '10 cm × 50 = 500 cm = 5 m. Las dos formas de decir lo mismo son correctas. 🏗️'),
        new Ejercicio('En un plano con escala 1:200, el cuarto mide 4 cm × 3 cm. ¿Cuáles son las medidas reales?', ['400 cm × 300 cm', '800 m × 600 m', '4 m × 3 m', '40 m × 30 m'], '400 cm × 300 cm', 'Multiplica cada medida por 200: 4 × 200 = 800 cm y 3 × 200 = 600 cm. 🏠'),
        new Ejercicio('La distancia real entre dos ciudades es 150 km. En el mapa mide 3 cm. ¿Cuál es la escala?', ['1:5,000', '1:50,000', '1:5,000,000', '1:500,000'], '1:5,000,000', '150 km = 15,000,000 cm. Escala = 3 ÷ 15,000,000 = 1:5,000,000 🗺️')
      ],
      [
        new Ejercicio('Si 4 obreros construyen una pared en 6 días, ¿cuántos días tardarán 8 obreros?', ['2 días', '3 días', '4 días', '6 días'], '3 días', 'Es proporcionalidad inversa. Más obreros = menos días. 4 × 6 = 8 × ? 👷'),
        new Ejercicio('Si un grifo llena un tanque en 8 horas, ¿en cuánto tiempo lo llenan 2 grifos iguales?', ['2 horas', '4 horas', '6 horas', '16 horas'], '4 horas', 'Proporcionalidad inversa: más grifos = menos tiempo. 1 × 8 = 2 × ? 🚰'),
        new Ejercicio('Si 6 kg de arroz cuestan $90, ¿cuánto cuestan 10 kg?', ['$120', '$140', '$150', '$160'], '$150', 'Proporcionalidad directa: precio por kg = 90 ÷ 6 = $15. Luego 10 × 15 = ? 🌾'),
        new Ejercicio('3 impresoras imprimen 300 hojas en 10 minutos. ¿Cuántas hojas imprimen 5 impresoras en el mismo tiempo?', ['400', '450', '500', '600'], '500', 'Proporcionalidad directa: hojas por impresora = 300 ÷ 3 = 100. Luego 5 × 100 = ? 🖨️')
      ],
      [
        new Ejercicio('Un artículo cuesta $450. Primero le aplican un 20% de descuento y luego un 10% de descuento al precio rebajado. ¿Cuánto cuesta al final?', ['$300', '$315', '$324', '$336'], '$324', 'Paso 1: 450 × 0.80 = 360. Paso 2: 360 × 0.90 = ? No sumes los porcentajes directamente. 🏷️'),
        new Ejercicio('En una tabla proporcional: si X = 9 da Y = 63, ¿qué valor de X da Y = 49?', ['5', '6', '7', '8'], '7', 'La constante es 63 ÷ 9 = 7. Entonces X = Y ÷ 7 = 49 ÷ 7 = ? 🔢'),
        new Ejercicio('12 trabajadores terminan un proyecto en 15 días. ¿Cuántos trabajadores se necesitan para terminarlo en 9 días?', ['16', '18', '20', '24'], '20', 'Proporcionalidad inversa: 12 × 15 = ? × 9. Despeja el incógnito. 👷'),
        new Ejercicio('El precio de un producto subió 25% y ahora cuesta $375. ¿Cuánto costaba antes?', ['$275', '$280', '$300', '$325'], '$300', 'Precio actual = Precio original × 1.25. Entonces: precio original = 375 ÷ 1.25 = ? 💡')
      ]
    ],
    statistics: [
      [
        new Ejercicio('Una gráfica de barras muestra: Manzanas=8, Peras=5, Naranjas=12, Uvas=3. ¿Cuál fruta es la más vendida?', ['Manzanas', 'Peras', 'Naranjas', 'Uvas'], 'Naranjas', 'La barra más alta representa la fruta más vendida. ¿Cuál tiene el número mayor? 🍊'),
        new Ejercicio('En la misma gráfica, ¿cuántas frutas más se vendieron de Manzanas que de Peras?', ['2', '3', '4', '5'], '3', 'Resta: Manzanas - Peras = 8 - 5 = ? 🍎'),
        new Ejercicio('Una gráfica muestra deportes favoritos: Fútbol=15, Natación=8, Básquet=12, Tenis=5. ¿Cuántos estudiantes en total respondieron?', ['35', '38', '40', '42'], '40', 'Suma todos los valores: 15 + 8 + 12 + 5 = ? ⚽'),
        new Ejercicio('En una gráfica de barras sobre colores favoritos, el Azul tiene barra de 18 y el Rojo de 12. ¿Qué porcentaje eligió Azul si participaron 60 alumnos?', ['25%', '30%', '35%', '40%'], '30%', '(18 ÷ 60) × 100 = ? 🎨')
      ],
      [
        new Ejercicio('Calificaciones de 10 alumnos: 8,7,9,8,6,8,9,7,8,10. ¿Con qué frecuencia aparece el 8?', ['2', '3', '4', '5'], '4', 'Cuenta cuántas veces aparece el número 8 en la lista. 📊'),
        new Ejercicio('En una tabla de frecuencias: 1→3 veces, 2→5 veces, 3→4 veces, 4→2 veces. ¿Cuántos datos hay en total?', ['12', '13', '14', '15'], '14', 'Suma todas las frecuencias: 3 + 5 + 4 + 2 = ? 🔢'),
        new Ejercicio('En la misma tabla, ¿qué valor tiene mayor frecuencia?', ['1', '2', '3', '4'], '2', 'El valor con mayor frecuencia es el que aparece más veces. 📈'),
        new Ejercicio('Si en una encuesta de 20 personas, 8 prefieren chocolate y el resto vainilla. ¿Cuál es la frecuencia relativa del chocolate?', ['30%', '35%', '40%', '45%'], '40%', 'Frecuencia relativa = (frecuencia ÷ total) × 100 = (8 ÷ 20) × 100 = ? 🍫')
      ],
      [
        new Ejercicio('Las temperaturas de la semana fueron: 18, 20, 22, 19, 21 grados. ¿Cuál es el promedio?', ['19°', '20°', '21°', '22°'], '20°', 'Suma todos los valores y divide entre la cantidad: (18+20+22+19+21) ÷ 5 = ? 🌡️'),
        new Ejercicio('Calificaciones de Mateo: Español=9, Matemáticas=8, Ciencias=10, Historia=7. ¿Cuál es su promedio?', ['8', '8.5', '9', '9.5'], '8.5', '(9 + 8 + 10 + 7) ÷ 4 = ? 📚'),
        new Ejercicio('El promedio de 5 números es 12. Si cuatro de ellos son: 10, 14, 11, 13. ¿Cuál es el quinto número?', ['10', '11', '12', '13'], '12', 'La suma total debe ser 12 × 5 = 60. Suma los cuatro conocidos y reste de 60. 🔢'),
        new Ejercicio('Sofía obtuvo estas calificaciones: 7, 8, 9, 8, 9, 9. ¿Cuál es su promedio?', ['8', '8.3', '8.5', '8.7'], '8.3', '(7+8+9+8+9+9) ÷ 6 = 50 ÷ 6 ≈ ? Redondea a un decimal. 📊')
      ],
      [
        new Ejercicio('Datos: 3, 7, 2, 9, 5. ¿Cuál es la mediana?', ['3', '5', '7', '9'], '5', 'Ordena los datos: 2, 3, 5, 7, 9. La mediana es el valor del centro. 📊'),
        new Ejercicio('Datos ordenados: 4, 6, 8, 10, 12, 14. ¿Cuál es la mediana?', ['8', '9', '10', '11'], '9', 'Con número par de datos, la mediana es el promedio de los dos centrales: (8 + 10) ÷ 2 = ? 🔢'),
        new Ejercicio('Calificaciones: 6, 9, 7, 10, 8, 5, 8. ¿Cuál es la mediana?', ['7', '8', '9', '10'], '8', 'Ordena primero: 5, 6, 7, 8, 8, 9, 10. El valor central es... 📚'),
        new Ejercicio('¿Por qué la mediana es útil cuando hay valores extremos (muy altos o muy bajos)?', ['Porque es el número más común', 'Porque no se ve afectada por valores extremos como el promedio', 'Porque siempre es mayor que el promedio', 'Porque es más fácil de calcular'], 'Porque no se ve afectada por valores extremos como el promedio', 'La mediana no se altera por un dato aislado extremadamente gigante o pequeño. 💡')
      ],
      [
        new Ejercicio('Datos: 4, 7, 4, 9, 4, 7, 2. ¿Cuál es la moda?', ['2', '4', '7', '9'], '4', 'La moda es el valor que aparece con mayor frecuencia. ¿Cuál se repite más? 📊'),
        new Ejercicio('Datos: 1, 3, 5, 7, 9. ¿Tiene moda este conjunto?', ['Sí, la moda es 1', 'Sí, la moda es 9', 'No tiene moda porque todos aparecen igual', 'Sí, la moda es 5'], 'No tiene moda porque todos aparecen igual', 'Si todos aparecen la misma cantidad de veces, no hay moda. 🔢'),
        new Ejercicio('Tallas de zapato: 24,25,26,25,24,25,27,25,24,26. ¿Cuál es la moda?', ['24', '25', '26', '27'], '25', 'Cuenta la frecuencia de cada talla. ¿Cuál aparece más veces? 👟'),
        new Ejercicio('Colores favoritos de 10 niños: azul,rojo,verde,azul,azul,rojo,amarillo,azul,verde,rojo. ¿Cuál es la moda?', ['Rojo', 'Azul', 'Verde', 'Amarillo'], 'Azul', 'Azul aparece 4 veces. ¿Cuál es la moda? 🎨')
      ],
      [
        new Ejercicio('Al lanzar un dado de 6 caras, ¿cuál es la probabilidad de obtener un 4?', ['1/3', '1/4', '1/6', '1/2'], '1/6', 'Probabilidad = casos favorables ÷ casos totales = 1 ÷ 6 🎲'),
        new Ejercicio('En una bolsa hay 3 bolas rojas, 2 azules y 5 verdes. ¿Cuál es la probabilidad de sacar una roja?', ['1/5', '3/10', '1/3', '1/2'], '3/10', 'Total de bolas = 3+2+5 = 10. Probabilidad de roja = 3 ÷ 10 = ? 🎱'),
        new Ejercicio('Al lanzar una moneda, ¿cuál es la probabilidad de obtener "sol"?', ['1/4', '1/3', '1/2', '2/3'], '1/2', 'Una moneda tiene 2 caras iguales posibles: sol o águila. Probabilidad = 1 ÷ 2 🪙'),
        new Ejercicio('En una tómbola con 20 boletos (del 1 al 20), ¿cuál es la probabilidad de sacar un número par?', ['1/4', '2/5', '1/2', '3/5'], '1/2', 'Hay 10 números pares del 1 al 20. P = 10/20 = ? 🎟️')
      ],
      [
        new Ejercicio('Si la probabilidad de lluvia es 0.35, ¿cuál es la probabilidad de que NO llueva?', ['0.55', '0.60', '0.65', '0.75'], '0.65', 'La suma de probabilidades complementarias siempre es 1. P(no llueve) = 1 - 0.35 = ? 🌦️'),
        new Ejercicio('En una caja hay 4 bolas azules y 6 bolas rojas. Si sacas una al azar, ¿cuál es la probabilidad de que NO sea azul?', ['2/5', '3/5', '4/10', '1/2'], '3/5', 'P(no azul) = P(roja) = 6/10 = 3/5. 🎱'),
        new Ejercicio('Al lanzar un dado, ¿cuál es la probabilidad de sacar un número mayor que 4?', ['1/6', '2/6', '3/6', '4/6'], '2/6', 'Números mayores que 4: solo 5 y 6. P = 2 ÷ 6 = ? 🎲'),
        new Ejercicio('En un gráfico circular, "Matemáticas" representa el 30%. Si participaron 200 estudiantes, ¿cuántos eligieron Matemáticas?', ['50', '55', '60', '65'], '60', 'Calcula el 30% de 200: 200 × 30 ÷ 100 = ? 🥧')
      ],
      [
        new Ejercicio('Datos: 5, 8, 12, 6, 9, 8, 7. Calcula la media, mediana y moda. ¿Cuál es correcta?', ['Media=7.9, Mediana=8, Moda=8', 'Media=8, Mediana=8, Moda=8', 'Media=7.9, Mediana=7, Moda=6', 'Media=8, Mediana=7, Moda=8'], 'Media=7.9, Mediana=8, Moda=8', 'Suma=55, Media=55÷7≈7.9. Ordenados el centro es 8. Moda=8. 📊'),
        new Ejercicio('Se lanzó un dado 60 veces. ¿Cuántas veces se esperaría sacar un 3?', ['8', '10', '12', '15'], '10', 'P(3) = 1/6. Número esperado = 60 × (1/6) = ? 🎲'),
        new Ejercicio('Una gráfica muestra que el 40% prefiere pizza, 35% hamburguesa y 25% sushi en un grupo de 80 personas. ¿Cuántas personas prefieren sushi?', ['15', '18', '20', '25'], '20', '25% de 80 = 80 × 0.25 = ? 🍣'),
        new Ejercicio('En una bolsa hay fichas del 1 al 10. ¿Cuál es la probabilidad de sacar un múltiplo de 3?', ['1/5', '3/10', '2/5', '1/3'], '3/10', 'Múltiplos de 3 entre 1 y 10: 3, 6, 9 = 3 fichas. P = 3/10 🎲')
      ]
    ],
    numeric: [
      [
        new Ejercicio('¿Cuál de estos NO es múltiplo de 6?', ['12', '18', '22', '24'], '22', 'Los múltiplos de 6 son: 6, 12, 18, 24... ¿Cuál no aparece? 🔢'),
        new Ejercicio('¿Cuál es el 5° múltiplo de 7?', ['28', '35', '42', '49'], '35', '7 × 5 = ? ⭐'),
        new Ejercicio('¿Cuántos múltiplos de 9 hay entre 1 y 50?', ['4', '5', '6', '7'], '5', 'Lista los múltiplos: 9, 18, 27, 36, 45... 📊'),
        new Ejercicio('¿Cuál es el múltiplo de 8 más cercano a 100, sin pasarse?', ['88', '92', '96', '100'], '96', '8 × 12 = 96. ¿Cuál está más cerca sin pasarse de 100? 🎯')
      ],
      [
        new Ejercicio('¿Cuántos divisores tiene el número 12?', ['4', '5', '6', '7'], '6', 'Los divisores de 12: 1, 2, 3, 4, 6 y 12. ¡Cuéntalos! 🔢'),
        new Ejercicio('¿Cuál de estos NO es divisor de 30?', ['5', '6', '7', '10'], '7', '30 ÷ 7 no da una división exacta. 🧮'),
        new Ejercicio('¿Cuántos divisores tiene el número 16?', ['3', '4', '5', '6'], '5', 'Los divisores de 16 son: 1, 2, 4, 8 y 16. 🔍'),
        new Ejercicio('¿Cuál es el mayor divisor de 48, diferente de 48?', ['12', '16', '24', '36'], '24', '48 ÷ 2 = 24. La mitad de un número es su mayor divisor propio. ✂️')
      ],
      [
        new Ejercicio('¿Por qué el número 374 es divisible entre 2?', ['Termina en número par', 'Termina en número impar', 'Su suma de dígitos es par', 'Termina en 5'], 'Termina en número par', 'Un número es divisible entre 2 si su último dígito es par. ✅'),
        new Ejercicio('¿Es el 1,235 divisible entre 5?', ['Sí, termina en 5', 'No, no termina en 0', 'Sí, es impar', 'No, es muy grande'], 'Sí, termina en 5', 'Un número es divisible entre 5 si termina en 0 o 5. 🔟'),
        new Ejercicio('¿Cuál de estos números es divisible entre 10?', ['3,451', '3,455', '3,450', '3,453'], '3,450', 'Para ser divisible entre 10, debe terminar en 0. 🎯'),
        new Ejercicio('¿Cuál de estos números NO es divisible entre 2 ni entre 5?', ['340', '345', '346', '347'], '347', 'Termina en impar y no termina en 0 ni 5. 🧩')
      ],
      [
        new Ejercicio('¿Por qué el 432 es divisible entre 3?', ['Su suma de dígitos es 9', 'Termina en número par', 'Termina en 2', 'Es mayor que 100'], 'Su suma de dígitos es 9', 'Criterio del 3: suma los dígitos → 4+3+2=9. Múltiplo de 3. ✅'),
        new Ejercicio('¿Cuál de estos números es divisible entre 9?', ['325', '412', '531', '623'], '531', 'Suma los dígitos: 5+3+1=9. Divisible entre 9. 🧮'),
        new Ejercicio('¿Es el 2,457 divisible entre 3?', ['Sí, porque 2+4+5+7=18', 'No, porque es impar', 'Sí, porque termina en 7', 'No, es muy grande'], 'Sí, porque 2+4+5+7=18', 'Suma de dígitos da 18, que es divisible entre 3. ✅'),
        new Ejercicio('¿Qué dígito hace que 57_ sea divisible entre 9?', ['3', '5', '6', '8'], '6', 'Suma conocida 5+7=12. Falta 6 para llegar a 18. 🎯')
      ],
      [
        new Ejercicio('¿Cuál de estos es un número PRIMO?', ['15', '21', '23', '27'], '23', 'Un primo solo se divide entre 1 y sí mismo. 🔒'),
        new Ejercicio('¿Cuál de estos es un número COMPUESTO?', ['11', '13', '17', '21'], '21', '21 = 3 × 7. Tiene más de dos divisores. 🧩'),
        new Ejercicio('¿Cuántos números primos hay entre 1 y 20?', ['6', '7', '8', '9'], '8', 'Primos: 2, 3, 5, 7, 11, 13, 17, 19. 🔢'),
        new Ejercicio('¿El número 1 es primo?', ['Sí', 'No, los primos tienen exactamente 2 divisores', 'Sí, es el primer número', 'No, es impar'], 'No, los primos tienen exactamente 2 divisores', 'El 1 solo tiene un divisor. Los primos requieren exactamente dos. ❌')
      ],
      [
        new Ejercicio('¿Cuál es el MCM de 4 y 6?', ['8', '10', '12', '24'], '12', 'Múltiplos de 4: 4,8,12... Múltiplos de 6: 6,12... El primero común es 12. 📋'),
        new Ejercicio('¿Cuál es el MCM de 3 y 8?', ['11', '16', '24', '48'], '24', 'Como no comparten factores comunes, multiplica 3 × 8. 🎯'),
        new Ejercicio('Dos autobuses salen cada 12 y cada 8 minutos. ¿Cada cuánto coinciden?', ['16 min', '20 min', '24 min', '32 min'], '24 min', 'MCM de 12 y 8 es 24. 🚌'),
        new Ejercicio('¿Cuál es el MCM de 5 y 7?', ['12', '21', '35', '70'], '35', 'Al ser primos entre sí, su MCM es su producto: 5 × 7. 🔢')
      ],
      [
        new Ejercicio('¿Cuál es el MCD de 12 y 18?', ['3', '4', '6', '9'], '6', 'Divisores comunes: 1, 2, 3, 6. El mayor es 6. 🔍'),
        new Ejercicio('¿Cuál es el MCD de 24 y 36?', ['6', '8', '12', '18'], '12', '12 es el mayor número que divide exactamente a ambos. 🧮'),
        new Ejercicio('Tienes 30 manzanas y 45 naranjas. ¿En cuántos grupos iguales se reparten sin sobrar?', ['5', '10', '15', '30'], '15', 'El MCD(30, 45) = 15 grupos. 🍎🍊'),
        new Ejercicio('¿Cuál es el MCD de 35 y 49?', ['5', '7', '14', '35'], '7', 'Ambos están en la tabla del 7: 7 × 5 y 7 × 7. 🔑')
      ],
      [
        new Ejercicio('¿Cuál es el MCM de 6, 8 y 12?', ['12', '16', '24', '48'], '24', 'El menor múltiplo común de los tres es 24. 🎯'),
        new Ejercicio('¿Cuál es el MCD de 48 y 72?', ['12', '16', '24', '36'], '24', '24 divide exactamente a 48 (2) y a 72 (3). 🔍'),
        new Ejercicio('Un número es divisible entre 2, 3 y 5. ¿Cuál podría ser?', ['45', '60', '75', '80'], '60', 'Múltiplo de MCM(2,3,5) = 30. De las opciones, 60 es múltiplo de 30. 🧩'),
        new Ejercicio('¿Cuál es el número primo más grande menor que 50?', ['43', '45', '47', '49'], '47', '49=7×7, 45=5×9. 47 es primo. 🔒')
      ]
    ],
    measurement: [
      [
        new Ejercicio('3 km = ? metros', ['300 m', '3,000 m', '30,000 m', '300,000 m'], '3,000 m', '1 km = 1,000 m. Multiplica 3 × 1,000. 📏'),
        new Ejercicio('450 cm = ? metros', ['0.45 m', '4.5 m', '45 m', '4,500 m'], '4.5 m', '1 m = 100 cm. Divide 450 ÷ 100. 📐'),
        new Ejercicio('Una maratón tiene 42 km. ¿Cuántos metros son?', ['420 m', '4,200 m', '42,000 m', '420,000 m'], '42,000 m', 'Multiplica 42 × 1,000. 🏃'),
        new Ejercicio('2.5 km = ? centímetros', ['2,500 cm', '25,000 cm', '250,000 cm', '2,500,000 cm'], '250,000 cm', '1 km = 100,000 cm. Multiplica 2.5 × 100,000. 🔢')
      ],
      [
        new Ejercicio('4 kg = ? gramos', ['40 g', '400 g', '4,000 g', '40,000 g'], '4,000 g', '1 kg = 1,000 g. ⚖️'),
        new Ejercicio('2,500 g = ? kilogramos', ['0.25 kg', '2.5 kg', '25 kg', '250 kg'], '2.5 kg', 'Divide 2,500 ÷ 1,000. 🧮'),
        new Ejercicio('Una bolsa pesa 750 g y otra 1.25 kg. ¿Cuánto pesan juntas en gramos?', ['1,750 g', '1,850 g', '2,000 g', '2,250 g'], '2,000 g', '1.25 kg = 1,250 g. Suma 750 + 1,250. 🎒'),
        new Ejercicio('¿Cuántos kilogramos son 3,750 g?', ['3.5 kg', '3.75 kg', '37.5 kg', '375 kg'], '3.75 kg', 'Divide entre 1,000. ⚖️')
      ],
      [
        new Ejercicio('2 L = ? mililitros', ['200 mL', '2,000 mL', '20,000 mL', '200,000 mL'], '2,000 mL', '1 L = 1,000 mL. 💧'),
        new Ejercicio('500 mL = ? litros', ['0.05 L', '0.5 L', '5 L', '50 L'], '0.5 L', 'Divide 500 ÷ 1,000. 🥤'),
        new Ejercicio('Una jarra tiene 1.5 L de jugo. ¿Cuántos vasos de 250 mL puedes llenar?', ['4', '5', '6', '8'], '6', '1.5 L = 1,500 mL. Divide 1,500 ÷ 250. 🍹'),
        new Ejercicio('Una alberca tiene 12,000 litros. ¿Cuántos m³ son? (1 m³ = 1,000 L)', ['1.2 m³', '12 m³', '120 m³', '1,200 m³'], '12 m³', 'Divide 12,000 ÷ 1,000. 群体')
      ],
      [
        new Ejercicio('3 horas = ? minutos', ['30 min', '90 min', '180 min', '300 min'], '180 min', '1 hora = 60 minutos. Multiplica 3 × 60. ⏰'),
        new Ejercicio('150 minutos = ¿cuántas horas y minutos?', ['1 h 90 min', '2 h 30 min', '2 h 50 min', '3 h 30 min'], '2 h 30 min', '120 minutos son 2 horas, sobran 30 minutos. ⏱️'),
        new Ejercicio('4 horas 20 minutos = ? minutos en total', ['240 min', '250 min', '260 min', '280 min'], '260 min', '4 × 60 = 240 minutos. Suma los 20 min extras. ⏰'),
        new Ejercicio('Una película dura 7,200 segundos. ¿Cuántas horas dura?', ['1 hora', '1.5 horas', '2 horas', '3 horas'], '2 hours', '7,200 ÷ 3,600 segundos que tiene una hora = 2 horas. 🎬')
      ],
      [
        new Ejercicio('1 lustro = ? años', ['4 años', '5 años', '10 años', '25 años'], '5 años', 'Un lustro es un período de 5 años. 📅'),
        new Ejercicio('¿Cuántas décadas tiene un siglo?', ['5', '8', '10', '20'], '10', '1 siglo = 100 años. 1 década = 10 años. 100 ÷ 10. 📚'),
        new Ejercicio('El año 2024, ¿en qué siglo estamos?', ['Siglo XIX', 'Siglo XX', 'Siglo XXI', 'Siglo XXII'], 'Siglo XXI', 'El siglo XXI comprende del año 2001 al 2100. 🗓️'),
        new Ejercicio('¿Cuántos minutos tiene un día completo?', ['720 min', '1,440 min', '2,880 min', '86,400 min'], '1,440 min', '24 horas × 60 minutos = 1,440 min. ⏰')
      ],
      [
        new Ejercicio('¿Cuántos grados tiene un ángulo recto?', ['45°', '90°', '180°', '360°'], '90°', 'Forma una esquina perfecta de un cuadrado. 📐'),
        new Ejercicio('¿Cuántos grados tiene un ángulo llano?', ['90°', '120°', '180°', '270°'], '180°', 'Un ángulo llano es una línea recta continua. 📏'),
        new Ejercicio('Un triángulo tiene ángulos de 60° y 70°. ¿Cuánto mide el tercer ángulo?', ['40°', '50°', '60°', '70°'], '50°', 'La suma interna de los ángulos de un triángulo siempre da 180°. 🔺'),
        new Ejercicio('Un reloj marca las 3:00. ¿Qué ángulo forman las manecillas?', ['45°', '90°', '120°', '180°'], '90°', 'Cada hora equivale a 30° en la circunferencia del reloj. 3 × 30° = 90°. 🕐')
      ],
      [
        new Ejercicio('Una sala mide 5 m de largo y 4 m de ancho. ¿Cuántos m² tiene?', ['9 m²', '18 m²', '20 m²', '24 m²'], '20 m²', 'Área = largo × ancho = 5 × 4. 🏠'),
        new Ejercicio('1 hectárea = ? metros cuadrados', ['100 m²', '1,000 m²', '10,000 m²', '100,000 m²'], '10,000 m²', 'Una hectárea equivale a un terreno cuadrado de 100 m por 100 m. 🌳'),
        new Ejercicio('Un terreno tiene 3 hectáreas. ¿Cuántos m² son?', ['3,000 m²', '30,000 m²', '300,000 m²', '3,000,000 m²'], '30,000 m²', '3 × 10,000 = 30,000 m². 🌾'),
        new Ejercicio('Una cancha mide 100 m × 70 m. ¿Cuántas hectáreas ocupa?', ['0.07 ha', '0.7 ha', '7 ha', '70 ha'], '0.7 ha', 'Área = 7,000 m². Divide entre 10,000 para pasarlo a hectáreas. ⚽')
      ],
      [
        new Ejercicio('Un recipiente de 4 L contiene 2.5 L. ¿Cuántos mL faltan para llenarlo?', ['1,000 mL', '1,250 mL', '1,500 mL', '2,500 mL'], '1,500 mL', 'Faltan 1.5 Litros. Multiplica 1.5 × 1,000 para pasarlo a mL. 💧'),
        new Ejercicio('El Virreinato de Nueva España duró ~300 años. ¿Cuántas décadas son?', ['20', '25', '30', '40'], '30', 'Divide 300 entre 10 años que tiene una década. 📚'),
        new Ejercicio('Un ángulo obtuso mide entre 90° y 180°. ¿Cuál de estos es obtuso?', ['45°', '90°', '120°', '200°'], '120°', 'Debe ser mayor de 90° y menor de 180°. 📐'),
        new Ejercicio('Una parcela mide 250 m × 80 m. ¿Cuántas hectáreas tiene?', ['1 ha', '2 ha', '20 ha', '200 ha'], '2 ha', 'Área = 20,000 m². Como 1 ha = 10,000 m², son 2 ha. 🌾')
      ]
    ],
    logic: [
      [
        new Ejercicio('¿Cuál es el siguiente número? 3, 6, 9, 12, _', ['13', '14', '15', '18'], '15', 'La serie va sumando de 3 en 3. 🔢'),
        new Ejercicio('Completa la sucesión: 100, 90, _, 70, 60', ['75', '80', '82', '85'], '80', 'La serie disminuye de 10 en 10. 📉'),
        new Ejercicio('¿Cuál es el siguiente número? 1, 4, 7, 10, 13, _', ['14', '15', '16', '17'], '16', 'Suma 3 al último término. 🎯'),
        new Ejercicio('Sucesión: 2, 5, 8, 11, 14, _', ['15', '16', '17', '18'], '17', 'La diferencia fija entre términos es 3. ➕')
      ],
      [
        new Ejercicio('¿Cuál es el siguiente número? 2, 4, 8, 16, _', ['18', '24', '32', '64'], '32', 'Cada número se multiplica por 2. 16 × 2. ✖️'),
        new Ejercicio('Completa: 3, 9, 27, 81, _', ['162', '210', '243', '324'], '243', 'Cada término es multiplicado por 3: 81 × 3 = ? 🔢'),
        new Ejercicio('¿Cuál es el término faltante? 1, 5, 25, _, 625', ['100', '115', '125', '150'], '125', 'Multiplica por 5: 25 × 5 = ? ⭐'),
        new Ejercicio('Sucesión especial: 1, 2, 6, 24, _', ['48', '96', '120', '144'], '120', 'Multiplica por la posición: 1×2=2, 2×3=6, 6×4=24, 24×5=? 🧩')
      ],
      [
        new Ejercicio('Triángulos con palitos: fig 1=3, fig 2=5, fig 3=7. ¿Cuántos tiene la fig 4?', ['8', '9', '10', '11'], '9', 'Cada nueva figura añade 2 palitos. 7 + 2. 🔺'),
        new Ejercicio('Patrón de cuadrados: 1, 4, 9, 16, _', ['20', '24', '25', '36'], '25', 'Son los números elevados al cuadrado: 1², 2², 3², 4², 5². 🔲'),
        new Ejercicio('Patrón de colores: Rojo, Azul, Verde, Rojo, Azul, Verde, Rojo, _', ['Rojo', 'Azul', 'Verde', 'Amarillo'], 'Azul', 'El ciclo se repite cada 3 colores. 🎨'),
        new Ejercicio('Sucesión: T1=2, cada término es 3 más que el anterior. ¿Cuál es el término 6?', ['14', '15', '17', '20'], '17', 'Ve sumando: T1=2, T2=5, T3=8, T4=11, T5=14, T6=? 🔢')
      ],
      [
        new Ejercicio('¿Cuál es el siguiente término? 1, 3, 7, 13, 21, _', ['25', '28', '31', '35'], '31', 'La diferencia aumenta consecutivamente de 2 en 2: +2, +4, +6, +8, +10. 🧠'),
        new Ejercicio('Sucesión de Fibonacci: 1, 1, 2, 3, 5, 8, 13, _', ['18', '20', '21', '24'], '21', 'Suma los dos términos anteriores: 8 + 13. 🌀'),
        new Ejercicio('¿Cuál es el término faltante? 2, 6, 18, _, 162', ['36', '48', '54', '72'], '54', 'La razón es multiplicar por 3. 18 × 3 = 54. ✖️'),
        new Ejercicio('Patrón: 100, 50, 25, 12.5, _', ['5', '6.25', '6.5', '10'], '6.25', 'Cada término se divide entre 2. 12.5 ÷ 2. ➗')
      ],
      [
        new Ejercicio('Progresión geométrica: T1=3, razón=4. ¿Cuál es el 3er término?', ['12', '24', '48', '96'], '48', 'T1=3, T2=12, T3=12 × 4 = ? ✖️'),
        new Ejercicio('¿Cuál es la razón de la sucesión: 5, 15, 45, 135?', ['2', '3', '5', '10'], '3', 'Divide un término entre su anterior: 15 ÷ 5 = 3. 🔢'),
        new Ejercicio('Un microorganismo se duplica cada hora. Empiezas con 1. ¿Cuántos hay tras 5 horas?', ['16', '25', '32', '64'], '32', 'Representa 2 elevado a la quinta potencia (2⁵). 🦠'),
        new Ejercicio('Progresión geométrica: T1=2, razón=3. ¿Cuál es el 4° término?', ['24', '36', '54', '162'], '54', 'T1=2, T2=6, T3=18, T4=18 × 3. 🎯')
      ],
      [
        new Ejercicio('□ + 15 = 40. ¿Cuánto vale □?', ['20', '25', '30', '55'], '25', 'Resta 40 - 15. La operation inversa. 📦'),
        new Ejercicio('□ × 7 = 56. ¿Cuánto vale □?', ['6', '7', '8', '9'], '8', 'Divide 56 ÷ 7. 📦'),
        new Ejercicio('3 × □ + 2 = 17. ¿Cuánto vale □?', ['4', '5', '6', '7'], '5', 'Resta primero: 3×□ = 15. Luego divide entre 3. 🧩'),
        new Ejercicio('□ ÷ 4 = 12. ¿Cuánto vale □?', ['8', '16', '36', '48'], '48', 'Multiplica 12 × 4. 📦')
      ],
      [
        new Ejercicio('2 × □ - 3 = 11. ¿Cuánto vale □?', ['5', '6', '7', '8'], '7', 'Suma 3: 2×□ = 14. Divide entre 2. 🧮'),
        new Ejercicio('Si x + x + 5 = 21, ¿cuánto vale x?', ['6', '7', '8', '9'], '8', '2x + 5 = 21 → 2x = 16. Divide entre 2. 🔢'),
        new Ejercicio('Ana tiene el doble de años que Beto. Suman 24. ¿Cuántos años tiene Beto?', ['6', '8', '10', '12'], '8', 'x + 2x = 3x = 24. Beto es x. 24 ÷ 3 = ? 👫'),
        new Ejercicio('□² = 49. ¿Cuánto vale □?', ['5', '6', '7', '8'], '7', '¿Qué número multiplicado por sí mismo da 49? 7 × 7. 🔢')
      ],
      [
        new Ejercicio('Fibonacci: 1,1,2,3,5,8,13,21,34,_. ¿Cuál sigue?', ['45', '50', '55', '68'], '55', 'Suma los dos términos finales: 21 + 34 = 55. 🌀'),
        new Ejercicio('Si 3x + 7 = 31, ¿cuánto vale x?', ['6', '7', '8', '9'], '8', '3x = 24. Despeja dividiendo entre 3. 🧮'),
        new Ejercicio('"Multiplica por 2 y suma 1". T1=1. ¿Cuál es el 4° término?', ['9', '12', '15', '31'], '15', 'T1=1, T2=3, T3=7, T4= 7 × 2 + 1. 🔄'),
        new Ejercicio('Hay el doble de estrellas rojas que azules. Suman 45. ¿Cuántas son azules?', ['12', '15', '18', '20'], '15', 'x + 2x = 3x = 45. Azules es x. 45 ÷ 3. ⭐')
      ]
    ],
    finance: [
      [
        new Ejercicio('Compraste 3 cuadernos de $15 c/u y una mochila de $120. ¿Cuánto gastaste?', ['$135', '$145', '$165', '$175'], '$165', 'Cuadernos = 3 × 15 = 45. Suma 45 + 120. 📚'),
        new Ejercicio('Tenías $200. Compraste un helado de $25 y una torta de $45. ¿Cuánto queda?', ['120', '125', '130', '140'], '$130', 'Gastos = 25 + 45 = 70. Resta 200 - 70. 🍦'),
        new Ejercicio('Compras: 2 plumas ($8 c/u), 1 libreta ($22) y 3 borradores ($5 c/u). ¿Cuánto pagas?', ['$45', '$50', '$53', '$58'], '$53', 'Suma todo: 16 + 22 + 15 = ? ✏️'),
        new Ejercicio('Papá tiene $500. Paga luz ($180), agua ($95) y comida ($210). ¿Cuánto sobra?', ['$5', '$10', '$15', '$20'], '$15', 'Suma de gastos = 485. Resta de 500. 💡')
      ],
      [
        new Ejercicio('Pagas $50 por un artículo de $37. ¿Cuánto te dan de cambio?', ['10', '12', '13', '17'], '$13', 'Resta 50 - 37. 💵'),
        new Ejercicio('Tus artículos suman $148. Pagas con $200. ¿Cuál es el cambio correcto?', ['$48', '$50', '$52', '$62'], '$52', 'Resta 200 - 148. 🧾'),
        new Ejercicio('Compraste: $45 + $38 + $62. Pagas con $200. ¿Cuál es el cambio?', ['$45', '$50', '$55', '$60'], '$55', 'Total = 145. Cambio = 200 - 145. 🛒'),
        new Ejercicio('La cajera te da: 1 billete de $20, 1 de $10 y 4 monedas de $5. ¿Cuánto es el cambio?', ['$40', '$45', '$50', '$55'], '$50', 'Suma el valor: 20 + 10 + 20. 💰')
      ],
      [
        new Ejercicio('6 manzanas cuestan $24. ¿Cuánto cuesta cada manzana?', ['$3', '$4', '$5', '$6'], '$4', 'Precio unitario = 24 ÷ 6. 🍎'),
        new Ejercicio('Tienda A: 3 kg de arroz a $45. Tienda B: 5 kg a $80. ¿Cuál es más barata por kg?', ['Tienda A ($15/kg)', 'Tienda B ($16/kg)', 'Son iguales', 'Tienda B ($16/kg)'], 'Tienda A ($15/kg)', 'A = 45÷3 = $15. B = 80÷5 = $16. 🛒'),
        new Ejercicio('Refresco suelto: $18 c/u. Paquete de 6: $90. ¿Cuál conviene más por refresco?', ['Suelto ($18 c/u)', 'Paquete ($15 c/u)', 'Son iguales', 'Paquete ($20 c/u)'], 'Paquete ($15 c/u)', 'Precio por unidad en paquete = 90 ÷ 6 = $15. Conveniente. 🥤'),
        new Ejercicio('Necesitas 10 cuadernos. Tienda: $12 c/u. Papelería: paquete de 5 por $55. ¿Cuánto ahorras?', ['$5', '$10', '$15', '$20'], '$10', 'Tienda = 120. Papelería = 110. Resta 120 - 110. 📚')
      ],
      [
        new Ejercicio('La familia gana $8,000 al mes. Gastos: renta $3,200, comida $1,500, servicios $800. ¿Cuánto queda?', ['$2,000', '$2,500', '$3,000', '$3,500'], '$2,500', 'Suma de gastos = 5,500. Resta 8,000 - 5,500. 🏠'),
        new Ejercicio('Tu mesada es de $150 y decides ahorrar el 10%. ¿Cuánto ahorras al mes?', ['$10', '$15', '$20', '$25'], '$15', '10% de 150 = 150 ÷ 10 = 15. 🐷'),
        new Ejercicio('Meta de ahorro: $6,000. Ahorras $750 al mes. ¿En cuántos meses llegarás?', ['6 meses', '7 meses', '8 meses', '10 meses'], '8 meses', 'Divide 6,000 ÷ 750. 🎯'),
        new Ejercicio('Presupuesto de $5,000: 40% comida, 25% transporte, 20% servicios. ¿Cuánto queda libre?', ['$500', '$650', '$750', '$900'], '$750', 'Total gastado = 85%. Queda el 15%. 15% de 5,000 = 750. 💡')
      ],
      [
        new Ejercicio('Zapatillas de $600 con 25% de descuento. ¿Cuánto pagas?', ['400', '425', '450', '475'], '$450', 'Descuento = 600 × 0.25 = 150. Resta 600 - 150. 👟'),
        new Ejercicio('Playera ($180) + shorts ($120) con 20% de descuento total. ¿Cuánto pagas?', ['$210', '$225', '$240', '$270'], '$240', 'Suma = 300. Descuento = 20% de 300 = 60. 300 - 60 = 240. 👕'),
        new Ejercicio('Videojuego de $800 con 30% de descuento. Al mes sube 15% de lo rebajado. ¿Cuánto cuesta?', ['$560', '$600', '$644', '$680'], '$644', 'Paso 1: 800 × 0.7 = 560. Paso 2: 560 × 1.15 = 644. 🎮'),
        new Ejercicio('Artículo de $400: ¿es mejor 30% de descuento o $100 de descuento directo?', ['30% de descuento ($120 ahorro)', '$100 de descuento directo', 'Son exactamente iguales', '30% de descuento ($80 ahorro)'], '30% de descuento ($120 ahorro)', '30% de 400 es 120 de ahorro, que es mejor que ahorrar 100. 🏷️')
      ],
      [
        new Ejercicio('Un artículo de $200 sin IVA. ¿Cuánto es el IVA (16%)?', ['16', '24', '32', '40'], '$32', 'Multiplica 200 × 0.16. 🧾'),
        new Ejercicio('Artículo de $350 sin IVA. ¿Cuánto pagas con el 16% de IVA incluido?', ['$366', '$396', '$406', '$416'], '$406', 'IVA = 56. Suma 350 + 56 = 406. 💳'),
        new Ejercicio('Un artículo CON IVA cuesta $580. ¿Cuánto cuesta SIN IVA? (IVA=16%)', ['$464', '$480', '$500', '$520'], '$500', 'Divide el precio final entre 1.16: 580 ÷ 1.16 = 500. 🧮'),
        new Ejercicio('Factura: producto $450 + embalaje $50, más 16% de IVA. ¿Cuánto es el total?', ['$520', '$550', '$580', '$600'], '$580', 'Subtotal = 500. IVA = 80. Total = 580. 🧾')
      ],
      [
        new Ejercicio('Recibo de agua: consumo básico $85, excedente $45, cuota fija $30. ¿Cuál es el total?', ['140', '150', '160', '175'], '$160', 'Suma todos los montos directos: 85 + 45 + 30. 💧'),
        new Ejercicio('Recibo de luz: 150 kWh a $1.80/kWh más cargo fijo de $40. ¿Cuánto es el total?', ['$270', '$290', '$310', '$340'], '$310', 'Consumo = 150 × 1.80 = 270. Suma cargo fijo: 270 + 40. 💡'),
        new Ejercicio('Recibo de luz: mes anterior=1,500 kWh, mes actual=1,680 kWh. ¿Cuántos kWh consumiste?', ['150 kWh', '160 kWh', '180 kWh', '200 kWh'], '180 kWh', 'Resta lecturas: 1,680 - 1,500 = 180. ⚡'),
        new Ejercicio('Presupuesto $3,000 para servicios. Recibos: luz=$450, agua=$160, gas=$380, internet=$350. ¿Cuánto sobra?', ['Sobran $1,460', 'Sobran $1,560', 'Sobran $1,660', 'Faltan $340'], 'Sobran $1,660', 'Suma de recibos = 1,340. Le restas a 3,000. 📋')
      ],
      [
        new Ejercicio('Compraste artículos por $237.50 y pagaste con $300. ¿Cuál es el cambio correcto?', ['$57.50', '$62.50', '$63.50', '$72.50'], '$62.50', 'Resta decimales: 300 - 237.50. 💵'),
        new Ejercicio('"50% de descuento en el 2° artículo". Compras dos playeras de $280 c/u. ¿Cuánto pagas?', ['$280', '$350', '$420', '$560'], '$420', 'Playera 1 = 280. Playera 2 = 140. Total = 420. 👕'),
        new Ejercicio('Ingresos $12,000. Gastos: renta 35%, comida 25%, transporte 15%, servicios 10%. ¿Cuánto se ahorra?', ['$1,200', '$1,500', '$1,800', '$2,400'], '$1,800', 'Gastos totales = 85%. Queda 15% de ahorro. 12,000 × 0.15. 🐷'),
        new Ejercicio('Producto sin IVA: $650. Con 16% de IVA y luego 10% de descuento. ¿Cuánto pagas?', ['$624', '$656', '$678.60', '$693.60'], '$678.60', 'Paso 1: con IVA → 650 × 1.16 = 754. Paso 2: con descuento → 754 × 0.90 = 678.60. 🧾')
      ]
    ]
  };
public obtenerPorTemaYNivel(req: Request, res: Response): void {
    const { tema, nivel } = req.params;
    const nivelIdx = Number(nivel);

    // catalogo de la clase
    const catalogo = EjercicioController.catalogoEjercicios;

    // 2. Verificamos que tema sea string y una llave válida del catálogo
    if (typeof tema !== 'string' || !(tema in catalogo)) {
      res.status(404).json({ error: 'El tema solicitado no existe en el catálogo' });
      return;
    }

    // 3. Ya validamos, le aseguramos a TypeScript el tipo correcto de la llave
    const claveValida = tema as keyof typeof catalogo;
    const listaTemas = catalogo[claveValida];

    // validar nivel
    if (!listaTemas || !listaTemas[nivelIdx]) {
      res.status(404).json({ error: 'Ejercicios no encontrados para este nivel' });
      return;
    }

   
    const ejerciciosJSON = listaTemas[nivelIdx].map((ejercicio: any) => {
      if (typeof ejercicio.toJSON === 'function') {
        return ejercicio.toJSON();
      }
      return ejercicio;
    });

    res.status(200).json(ejerciciosJSON);
  }}