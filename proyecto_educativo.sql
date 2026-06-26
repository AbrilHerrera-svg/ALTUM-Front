-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2026 a las 18:19:02
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_educativo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejercicios`
--

CREATE TABLE `ejercicios` (
  `id_ejercicio` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `tip` varchar(255) DEFAULT NULL,
  `id_tema` int(11) NOT NULL,
  `id_nivel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ejercicios`
--

INSERT INTO `ejercicios` (`id_ejercicio`, `descripcion`, `tip`, `id_tema`, `id_nivel`) VALUES
(137, 'Si 3 manzanas cuestan $15, ¿cuánto cuestan 6 manzanas?', NULL, 1, 1),
(138, 'En una receta para 4 personas se usan 2 tazas de harina. ¿Cuántas tazas necesitas para 8 personas?', NULL, 1, 1),
(139, 'Un auto recorre 120 km en 2 horas. ¿Cuántos km recorre en 5 horas a la misma velocidad?', NULL, 1, 1),
(140, 'Si 5 cuadernos cuestan $35, ¿cuánto cuestan 3 cuadernos?', NULL, 1, 1),
(141, 'En una tabla de proporcionalidad: X = 2 → Y = 6; X = 4 → Y = 12; X = 6 → Y = ?', NULL, 1, 2),
(142, 'En una tabla: X = 1 → Y = 5; X = 3 → Y = 15; X = 5 → Y = ?', NULL, 1, 2),
(143, 'Completa la tabla: Horas trabajadas: 2, 4, 6, 8. Pago en pesos: 50, 100, ?, 200.', NULL, 1, 2),
(144, 'En una tabla proporcional, si X = 7 da Y = 28, ¿cuál es la constante de proporcionalidad?', NULL, 1, 2),
(145, '¿Cuánto es el 50% de 200?', NULL, 1, 3),
(146, '¿Cuánto es el 25% de 80?', NULL, 1, 3),
(147, '¿Cuánto es el 10% de 350?', NULL, 1, 3),
(148, '¿Cuánto es el 75% de 120?', NULL, 1, 3),
(149, '¿Qué porcentaje de 200 es 50?', NULL, 1, 4),
(150, 'En un examen de 40 preguntas, Lucía contestó 30 correctamente. ¿Qué porcentaje obtuvo?', NULL, 1, 4),
(151, '¿Cuánto es el 15% de 60?', NULL, 1, 4),
(152, 'En una clase de 25 alumnos, 5 están ausentes. ¿Qué porcentaje de alumnos está presente?', NULL, 1, 4),
(153, 'Un libro cuesta $120 y tiene un descuento del 20%. ¿Cuánto pagas?', NULL, 1, 5),
(154, 'Un precio de $200 aumenta un 15%. ¿Cuál es el nuevo precio?', NULL, 1, 5),
(155, 'En una tienda, el precio original es $500 y hay un descuento de 30%. ¿Cuánto ahorras?', NULL, 1, 5),
(156, 'Un celular costaba $3,000 y bajó un 10%. Luego subió 10% del precio rebajado. ¿Cuánto cuesta ahora?', NULL, 1, 5),
(157, 'Si 4 obreros construyen una pared en 6 días, ¿cuántos días tardarán 8 obreros?', NULL, 1, 7),
(158, 'Si un grifo llena un tanque en 8 horas, ¿en cuánto tiempo lo llenan 2 grifos iguales?', NULL, 1, 7),
(159, 'Si 6 kg de arroz cuestan $90, ¿cuánto cuestan 10 kg?', NULL, 1, 7),
(160, '3 impresoras imprimen 300 hojas en 10 minutos. ¿Cuántas hojas imprimen 5 impresoras en el mismo tiempo?', NULL, 1, 7),
(161, 'Un artículo cuesta $450. Primero le aplican un 20% de descuento y luego un 10% de descuento al precio rebajado. ¿Cuánto cuesta al final?', NULL, 1, 8),
(162, 'En una tabla proporcional: si X = 9 da Y = 63, ¿qué valor de X da Y = 49?', NULL, 1, 8),
(163, '12 trabajadores terminan un proyecto en 15 días. ¿Cuántos trabajadores se necesitan para terminarlo en 9 días?', NULL, 1, 8),
(164, 'El precio de un producto subió 25% y ahora cuesta $375. ¿Cuánto costaba antes?', NULL, 1, 8),
(173, 'Una gráfica de barras muestra: Manzanas=8, Peras=5, Naranjas=12, Uvas=3. ¿Cuál fruta es la más vendida?', NULL, 2, 1),
(174, 'En la misma gráfica, ¿cuántas frutas más se vendieron de Manzanas que de Peras?', NULL, 2, 1),
(175, 'Una gráfica muestra deportes favoritos: Fútbol=15, Natación=8, Básquet=12, Tenis=5. ¿Cuántos estudiantes en total respondieron?', NULL, 2, 1),
(176, 'En una gráfica de barras sobre colores favoritos, el Azul tiene barra de 18 y el Rojo de 12. ¿Qué porcentaje eligió Azul si participaron 60 alumnos?', NULL, 2, 1),
(177, 'Calificaciones de 10 alumnos: 8,7,9,8,6,8,9,7,8,10. ¿Con qué frecuencia aparece el 8?', NULL, 2, 2),
(178, 'En una tabla de frecuencias: 1→3 veces, 2→5 veces, 3→4 veces, 4→2 veces. ¿Cuántos datos hay en total?', NULL, 2, 2),
(179, 'En la misma tabla, ¿qué valor tiene mayor frecuencia?', NULL, 2, 2),
(180, 'Si en una encuesta de 20 personas, 8 prefieren chocolate y el resto vainilla. ¿Cuál es la frecuencia relativa del chocolate?', NULL, 2, 2),
(181, 'Las temperaturas de la semana fueron: 18, 20, 22, 19, 21 grados. ¿Cuál es el promedio?', NULL, 2, 3),
(182, 'Calificaciones de Mateo: Español=9, Matemáticas=8, Ciencias=10, Historia=7. ¿Cuál es su promedio?', NULL, 2, 3),
(183, 'El promedio de 5 números es 12. Si cuatro de ellos son: 10, 14, 11, 13. ¿Cuál es el quinto número?', NULL, 2, 3),
(184, 'Sofía obtuvo estas calificaciones: 7, 8, 9, 8, 9, 9. ¿Cuál es su promedio?', NULL, 2, 3),
(185, 'Datos: 3, 7, 2, 9, 5. ¿Cuál es la mediana?', NULL, 2, 4),
(186, 'Datos ordenados: 4, 6, 8, 10, 12, 14. ¿Cuál es la mediana?', NULL, 2, 4),
(187, 'Calificaciones: 6, 9, 7, 10, 8, 5, 8. ¿Cuál es la mediana?', NULL, 2, 4),
(188, '¿Por qué la mediana es útil cuando hay valores extremos?', NULL, 2, 4),
(189, 'Datos: 4, 7, 4, 9, 4, 7, 2. ¿Cuál es la moda?', NULL, 2, 5),
(190, 'Datos: 1, 3, 5, 7, 9. ¿Tiene moda este conjunto?', NULL, 2, 5),
(191, 'Tallas de zapato: 24,25,26,25,24,25,27,25,24,26. ¿Cuál es la moda?', NULL, 2, 5),
(192, 'Colores favoritos de 10 niños: azul,rojo,verde,azul,azul,rojo,amarillo,azul,verde,rojo. ¿Cuál es la moda?', NULL, 2, 5),
(193, 'Al lanzar un dado de 6 caras, ¿cuál es la probabilidad de obtener un 4?', NULL, 2, 6),
(194, 'En una bolsa hay 3 bolas rojas, 2 azules y 5 verdes. ¿Cuál es la probabilidad de sacar una roja?', NULL, 2, 6),
(195, 'Al lanzar una moneda, ¿cuál es la probabilidad de obtener \"sol\"?', NULL, 2, 6),
(196, 'En una tómbola con 20 boletos (del 1 al 20), ¿cuál es la probabilidad de sacar un número par?', NULL, 2, 6),
(197, 'Si la probabilidad de lluvia es 0.35, ¿cuál es la probabilidad de que NO llueva?', NULL, 2, 7),
(198, 'En una caja hay 4 bolas azules y 6 bolas rojas. Si sacas una al azar, ¿cuál es la probabilidad de que NO sea azul?', NULL, 2, 7),
(199, 'Al lanzar un dado, ¿cuál es la probabilidad de sacar un número mayor que 4?', NULL, 2, 7),
(200, 'En un gráfico circular, \"Matemáticas\" representa el 30%. Si participaron 200 estudiantes, ¿cuántos eligieron Matemáticas?', NULL, 2, 7),
(201, 'Datos: 5, 8, 12, 6, 9, 8, 7. Calcula la media, mediana y moda. ¿Cuál de estas afirmaciones es correcta?', NULL, 2, 8),
(202, 'Se lanzó un dado 60 veces. ¿Cuántas veces se esperaría sacar un 3?', NULL, 2, 8),
(203, 'Una gráfica muestra que el 40% prefiere pizza, 35% hamburguesa y 25% sushi en un grupo de 80 personas. ¿Cuántas personas prefieren sushi?', NULL, 2, 8),
(204, 'En una bolsa hay fichas del 1 al 10. ¿Cuál es la probabilidad de sacar un múltiplo de 3?', NULL, 2, 8),
(205, '¿Cuál de estos NO es múltiplo de 6?', NULL, 3, 1),
(206, '¿Cuál es el 5° múltiplo de 7?', NULL, 3, 1),
(207, '¿Cuántos múltiplos de 9 hay entre 1 y 50?', NULL, 3, 1),
(208, '¿Cuál es el múltiplo de 8 más cercano a 100, sin pasarse?', NULL, 3, 1),
(209, '¿Cuántos divisores tiene el número 12?', NULL, 3, 2),
(210, '¿Cuál de estos NO es divisor de 30?', NULL, 3, 2),
(211, '¿Cuántos divisores tiene el número 16?', NULL, 3, 2),
(212, '¿Cuál es el mayor divisor de 48, diferente de 48?', NULL, 3, 2),
(213, '¿Por qué el número 374 es divisible entre 2?', NULL, 3, 3),
(214, '¿Es el 1,235 divisible entre 5?', NULL, 3, 3),
(215, '¿Cuál de estos números es divisible entre 10?', NULL, 3, 3),
(216, '¿Cuál de estos números NO es divisible entre 2 ni entre 5?', NULL, 3, 3),
(217, '¿Por qué el 432 es divisible entre 3?', NULL, 3, 4),
(218, '¿Cuál de estos números es divisible entre 9?', NULL, 3, 4),
(219, '¿Es el 2,457 divisible entre 3?', NULL, 3, 4),
(220, '¿Qué dígito hace que 57_ sea divisible entre 9?', NULL, 3, 4),
(221, '¿Cuál de estos es un número PRIMO?', NULL, 3, 5),
(222, '¿Cuál de estos es un número COMPUESTO?', NULL, 3, 5),
(223, '¿Cuántos números primos hay entre 1 y 20?', NULL, 3, 5),
(224, '¿El número 1 es primo?', NULL, 3, 5),
(225, '¿Cuál es el MCM de 4 y 6?', NULL, 3, 6),
(226, '¿Cuál es el MCM de 3 y 8?', NULL, 3, 6),
(227, 'Dos autobuses salen cada 12 y cada 8 minutos. ¿Cada cuántos minutos coinciden?', NULL, 3, 6),
(228, '¿Cuál es el MCM de 5 y 7?', NULL, 3, 6),
(229, '¿Cuál es el MCD de 12 y 18?', NULL, 3, 7),
(230, '¿Cuál es el MCD de 24 y 36?', NULL, 3, 7),
(231, 'Tienes 30 manzanas y 45 naranjas. ¿En cuántos grupos iguales puedes repartirlas sin que sobre nada?', NULL, 3, 7),
(232, '¿Cuál es el MCD de 35 y 49?', NULL, 3, 7),
(233, '¿Cuál es el MCM de 6, 8 y 12?', NULL, 3, 8),
(234, '¿Cuál es el MCD de 48 y 72?', NULL, 3, 8),
(235, 'Un número es divisible entre 2, entre 3 y entre 5. ¿Cuál podría ser?', NULL, 3, 8),
(236, '¿Cuál es el número primo más grande menor que 50?', NULL, 3, 8),
(237, '3 km = ? metros', NULL, 4, 1),
(238, '450 cm = ? metros', NULL, 4, 1),
(239, 'Una maratón tiene 42 km. ¿Cuántos metros son?', NULL, 4, 1),
(240, '2.5 km = ? centímetros', NULL, 4, 1),
(241, '4 kg = ? gramos', NULL, 4, 2),
(242, '2,500 g = ? kilogramos', NULL, 4, 2),
(243, 'Una bolsa pesa 750 g y otra pesa 1.25 kg. ¿Cuánto pesan juntas en gramos?', NULL, 4, 2),
(244, '¿Cuántos kilogramos son 3,750 g?', NULL, 4, 2),
(245, '2 L = ? mililitros', NULL, 4, 3),
(246, '500 mL = ? litros', NULL, 4, 3),
(247, 'Una jarra tiene 1.5 L de jugo. ¿Cuántos vasos de 250 mL puedes llenar?', NULL, 4, 3),
(248, 'Una alberca tiene 12,000 litros. ¿Cuántos m³ son? (1 m³ = 1,000 L)', NULL, 4, 3),
(249, '3 horas = ? minutos', NULL, 4, 4),
(250, '150 minutos = ¿cuántas horas y minutos?', NULL, 4, 4),
(251, '4 horas 20 minutos = ? minutos en total', NULL, 4, 4),
(252, 'Una película dura 7,200 segundos. ¿Cuántas horas dura?', NULL, 4, 4),
(253, '1 lustro = ? años', NULL, 4, 5),
(254, '¿Cuántas décadas tiene un siglo?', NULL, 4, 5),
(255, 'El año 2024, ¿en qué siglo estamos?', NULL, 4, 5),
(256, '¿Cuántos minutos tiene un día completo?', NULL, 4, 5),
(257, '¿Cuántos grados tiene un ángulo recto?', NULL, 4, 6),
(258, '¿Cuántos grados tiene un ángulo llano?', NULL, 4, 6),
(259, 'Un triángulo tiene ángulos de 60° y 70°. ¿Cuánto mide el tercer ángulo?', NULL, 4, 6),
(260, 'Un reloj marca las 3:00. ¿Qué ángulo forman las manecillas?', NULL, 4, 6),
(261, 'Una sala mide 5 m de largo y 4 m de ancho. ¿Cuántos m² tiene?', NULL, 4, 7),
(262, '1 hectárea = ? metros cuadrados', NULL, 4, 7),
(263, 'Un terreno tiene 3 hectáreas. ¿Cuántos m² son?', NULL, 4, 7),
(264, 'Una cancha mide 100 m × 70 m. ¿Cuántas hectáreas ocupa?', NULL, 4, 7),
(265, 'Un recipiente de 4 L contiene 2.5 L. ¿Cuántos mL faltan para llenarlo?', NULL, 4, 8),
(266, 'El Virreinato de Nueva España duró ~300 años. ¿Cuántas décadas son?', NULL, 4, 8),
(267, 'Un ángulo obtuso mide entre 90° y 180°. ¿Cuál de estos ES obtuso?', NULL, 4, 8),
(268, 'Una parcela mide 250 m × 80 m. ¿Cuántas hectáreas tiene?', NULL, 4, 8),
(269, '¿Cuál es el siguiente número? 3, 6, 9, 12, _', NULL, 5, 1),
(270, 'Completa la sucesión: 100, 90, _, 70, 60', NULL, 5, 1),
(271, '¿Cuál es el siguiente número? 1, 4, 7, 10, 13, _', NULL, 5, 1),
(272, 'Sucesión: 2, 5, 8, 11, 14, _', NULL, 5, 1),
(273, '¿Cuál es el siguiente número? 2, 4, 8, 16, _', NULL, 5, 2),
(274, 'Completa: 3, 9, 27, 81, _', NULL, 5, 2),
(275, '¿Cuál es el término faltante? 1, 5, 25, _, 625', NULL, 5, 2),
(276, 'Sucesión especial: 1, 2, 6, 24, _', NULL, 5, 2),
(277, 'Triángulos con palitos: figura 1=3, figura 2=5, figura 3=7. ¿Cuántos tiene la figura 4?', NULL, 5, 3),
(278, 'Patrón de cuadrados: 1, 4, 9, 16, _', NULL, 5, 3),
(279, 'Patrón de colores: Rojo, Azul, Verde, Rojo, Azul, Verde, Rojo, _', NULL, 5, 3),
(280, 'Sucesión: T1=2, cada término es 3 más que el anterior. ¿Cuál es el término 6?', NULL, 5, 3),
(281, '¿Cuál es el siguiente término? 1, 3, 7, 13, 21, _', NULL, 5, 4),
(282, 'Sucesión de Fibonacci: 1, 1, 2, 3, 5, 8, 13, _', NULL, 5, 4),
(283, '¿Cuál es el término faltante? 2, 6, 18, _, 162', NULL, 5, 4),
(284, 'Patrón: 100, 50, 25, 12.5, _', NULL, 5, 4),
(285, 'Progresión geométrica: T1=3, razón=4. ¿Cuál es el 3er término?', NULL, 5, 5),
(286, '¿Cuál es la razón de la sucesión: 5, 15, 45, 135?', NULL, 5, 5),
(287, 'Un microorganismo se duplica cada hora. Empiezas con 1. ¿Cuántos hay después de 5 horas?', NULL, 5, 5),
(288, 'Progresión geométrica: T1=2, razón=3. ¿Cuál es el 4° término?', NULL, 5, 5),
(289, '□ + 15 = 40. ¿Cuánto vale □?', NULL, 5, 6),
(290, '□ × 7 = 56. ¿Cuánto vale □?', NULL, 5, 6),
(291, '3 × □ + 2 = 17. ¿Cuánto vale □?', NULL, 5, 6),
(292, '□ ÷ 4 = 12. ¿Cuánto vale □?', NULL, 5, 6),
(293, '2 × □ - 3 = 11. ¿Cuánto vale □?', NULL, 5, 7),
(294, 'Si x + x + 5 = 21, ¿cuánto vale x?', NULL, 5, 7),
(295, 'Ana tiene el doble de años que Beto. La suma de sus edades es 24. ¿Cuántos años tiene Beto?', NULL, 5, 7),
(296, '□² = 49. ¿Cuánto vale □?', NULL, 5, 7),
(297, 'Fibonacci: 1,1,2,3,5,8,13,21,34,_. ¿Cuál sigue?', NULL, 5, 8),
(298, 'Si 3x + 7 = 31, ¿cuánto vale x?', NULL, 5, 8),
(299, 'Regla: \"multiplica por 2 y suma 1\". T1=1. ¿Cuál es el 4° término?', NULL, 5, 8),
(300, 'Hay el doble de estrellas rojas que azules. Si hay 45 en total, ¿cuántas son azules?', NULL, 5, 8),
(301, 'Compraste 3 cuadernos de $15 c/u y una mochila de $120. ¿Cuánto gastaste en total?', NULL, 6, 1),
(302, 'Tenías $200. Compraste un helado de $25 y una torta de $45. ¿Cuánto te queda?', NULL, 6, 1),
(303, 'Compras: 2 plumas ($8 c/u), 1 libreta ($22) y 3 borradores ($5 c/u). ¿Cuánto pagas?', NULL, 6, 1),
(304, 'Papá tiene $500. Paga electricidad ($180), agua ($95) y despensa ($210). ¿Cuánto sobra?', NULL, 6, 1),
(305, 'Pagas $50 por un artículo de $37. ¿Cuánto te dan de cambio?', NULL, 6, 2),
(306, 'Tus artículos suman $148. Pagas con un billete de $200. ¿Cuál es el cambio correcto?', NULL, 6, 2),
(307, 'Compraste: $45 + $38 + $62. Pagas con $200. ¿Cuál es el cambio?', NULL, 6, 2),
(308, 'La cajera te da: 1 billete de $20, 1 de $10 y 4 monedas de $5. ¿Cuánto es el cambio?', NULL, 6, 2),
(309, '6 manzanas cuestan $24. ¿Cuánto cuesta cada manzana?', NULL, 6, 3),
(310, 'Tienda A: 3 kg de arroz a $45. Tienda B: 5 kg a $80. ¿Cuál es más barata por kg?', NULL, 6, 3),
(311, 'Refresco suelto: $18 c/u. Paquete de 6: $90. ¿Cuál conviene más por refresco?', NULL, 6, 3),
(312, 'Necesitas 10 cuadernos. Tienda: $12 c/u. Papelería: paquete de 5 por $55. ¿Cuánto ahorras?', NULL, 6, 3),
(313, 'La familia gana $8,000 al mes. Gastos: renta $3,200, comida $1,500, servicios $800. ¿Cuánto les queda?', NULL, 6, 4),
(314, 'Tu mesada es de $150 y decides ahorrar el 10%. ¿Cuánto ahorras al mes?', NULL, 6, 4),
(315, 'Meta de ahorro: $6,000. Ahorras $750 al mes. ¿En cuántos meses llegarás a la meta?', NULL, 6, 4),
(316, 'Presupuesto de $5,000: 40% comida, 25% transporte, 20% servicios. ¿Cuánto queda libre?', NULL, 6, 4),
(317, 'Zapatillas de $600 con 25% de descuento. ¿Cuánto pagas?', NULL, 6, 5),
(318, 'Playera ($180) + shorts ($120) con 20% de descuento en todo. ¿Cuánto pagas?', NULL, 6, 5),
(319, 'Videojuego de $800 con 30% de descuento. Mes siguiente sube 15%. ¿Cuánto cuesta después?', NULL, 6, 5),
(320, 'Artículo de $400: ¿es mejor 30% de descuento o $100 de descuento directo?', NULL, 6, 5),
(321, 'Un artículo de $200 sin IVA. ¿Cuánto es el IVA (16%)?', NULL, 6, 6),
(322, 'Artículo de $350 sin IVA. ¿Cuánto pagas en total con 16% de IVA?', NULL, 6, 6),
(323, 'Un artículo CON IVA cuesta $580. ¿Cuánto es el precio SIN IVA? (IVA=16%)', NULL, 6, 6),
(324, 'Factura: producto $450 + embalaje $50, más 16% de IVA. ¿Cuánto es el total?', NULL, 6, 6),
(325, 'Recibo de agua: consumo básico $85, excedente $45, cuota fija $30. ¿Cuál es el total?', NULL, 6, 7),
(326, 'Recibo de luz: 150 kWh a $1.80/kWh más cargo fijo de $40. ¿Cuánto es el total?', NULL, 6, 7),
(327, 'Recibo de luz: mes anterior=1,500 kWh, mes actual=1,680 kWh. ¿Cuántos kWh consumiste?', NULL, 6, 7),
(328, 'Presupuesto $3,000 para servicios. Recibos: luz=$450, agua=$160, gas=$380, internet=$350. ¿Cuánto sobra?', NULL, 6, 7),
(329, 'Compraste artículos por $237.50 y pagaste con $300. ¿Cuál es el cambio correcto?', NULL, 6, 8),
(330, '\"50% de descuento en el 2° artículo\". Compras dos playeras de $280 c/u. ¿Cuánto pagas?', NULL, 6, 8),
(331, 'Ingresos $12,000. Gastos: renta 35%, comida 25%, transporte 15%, servicios 10%. ¿Cuánto se puede ahorrar?', NULL, 6, 8),
(332, 'Producto sin IVA: $650. Con 16% de IVA y luego 10% de descuento. ¿Cuánto pagas?', NULL, 6, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `intentos`
--

CREATE TABLE `intentos` (
  `id_intento` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `resultado_puntos` int(11) DEFAULT 0,
  `vidas_utilizadas` int(11) DEFAULT 0,
  `id_usuario` int(11) NOT NULL,
  `id_ejercicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallas`
--

CREATE TABLE `medallas` (
  `id_medalla` int(11) NOT NULL,
  `nombre_medalla` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medallas`
--

INSERT INTO `medallas` (`id_medalla`, `nombre_medalla`) VALUES
(1, 'Primeros Pasos'),
(2, 'Maestro de las Tablas'),
(3, 'Genio Matemático');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `niveles`
--

CREATE TABLE `niveles` (
  `id_nivel` int(11) NOT NULL,
  `nombre_nivel` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `niveles`
--

INSERT INTO `niveles` (`id_nivel`, `nombre_nivel`) VALUES
(1, 'Nivel 1'),
(2, 'Nivel 2'),
(3, 'Nivel 3'),
(4, 'Nivel 4'),
(5, 'Nivel 5'),
(6, 'Nivel 6'),
(7, 'Nivel 7'),
(8, 'Nivel 8');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

CREATE TABLE `opciones` (
  `id_opcion` int(11) NOT NULL,
  `texto_opcion` text NOT NULL,
  `es_correcta` tinyint(1) NOT NULL,
  `id_ejercicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `opciones`
--

INSERT INTO `opciones` (`id_opcion`, `texto_opcion`, `es_correcta`, `id_ejercicio`) VALUES
(137, '$20', 0, 137),
(138, '$25', 0, 137),
(139, '$30', 1, 137),
(140, '$35', 0, 137),
(141, '3 tazas', 0, 138),
(142, '4 tazas', 1, 138),
(143, '6 tazas', 0, 138),
(144, '8 tazas', 0, 138),
(145, '240 km', 0, 139),
(146, '280 km', 0, 139),
(147, '300 km', 1, 139),
(148, '360 km', 0, 139),
(149, '$15', 0, 140),
(150, '$18', 0, 140),
(151, '$21', 1, 140),
(152, '$25', 0, 140),
(153, '15', 0, 141),
(154, '16', 0, 141),
(155, '18', 1, 141),
(156, '20', 0, 141),
(157, '20', 0, 142),
(158, '25', 1, 142),
(159, '30', 0, 142),
(160, '35', 0, 142),
(161, '130', 0, 143),
(162, '140', 0, 143),
(163, '150', 1, 143),
(164, '160', 0, 143),
(165, '3', 0, 144),
(166, '4', 1, 144),
(167, '5', 0, 144),
(168, '6', 0, 144),
(169, '50', 0, 145),
(170, '75', 0, 145),
(171, '100', 1, 145),
(172, '150', 0, 145),
(173, '10', 0, 146),
(174, '15', 0, 146),
(175, '20', 1, 146),
(176, '25', 0, 146),
(177, '25', 0, 147),
(178, '30', 0, 147),
(179, '35', 1, 147),
(180, '40', 0, 147),
(181, '75', 0, 148),
(182, '80', 0, 148),
(183, '90', 1, 148),
(184, '95', 0, 148),
(185, '10%', 0, 149),
(186, '15%', 0, 149),
(187, '20%', 0, 149),
(188, '25%', 1, 149),
(189, '60%', 0, 150),
(190, '65%', 0, 150),
(191, '70%', 0, 150),
(192, '75%', 1, 150),
(193, '6', 0, 151),
(194, '9', 1, 151),
(195, '12', 0, 151),
(196, '15', 0, 151),
(197, '70%', 0, 152),
(198, '75%', 0, 152),
(199, '80%', 1, 152),
(200, '85%', 0, 152),
(201, '$84', 0, 153),
(202, '$90', 0, 153),
(203, '$96', 1, 153),
(204, '$100', 0, 153),
(205, '$215', 0, 154),
(206, '$225', 0, 154),
(207, '$230', 1, 154),
(208, '$240', 0, 154),
(209, '$100', 0, 155),
(210, '$120', 0, 155),
(211, '$150', 1, 155),
(212, '$200', 0, 155),
(213, '$2,900', 0, 156),
(214, '$2,970', 1, 156),
(215, '$3,000', 0, 156),
(216, '$3,030', 0, 156),
(217, '2 días', 0, 157),
(218, '3 días', 1, 157),
(219, '4 días', 0, 157),
(220, '6 días', 0, 157),
(221, '2 horas', 0, 158),
(222, '4 horas', 1, 158),
(223, '6 horas', 0, 158),
(224, '16 horas', 0, 158),
(225, '$120', 0, 159),
(226, '$140', 0, 159),
(227, '$150', 1, 159),
(228, '$160', 0, 159),
(229, '400', 0, 160),
(230, '450', 0, 160),
(231, '500', 1, 160),
(232, '600', 0, 160),
(233, '$300', 0, 161),
(234, '$315', 0, 161),
(235, '$324', 1, 161),
(236, '$336', 0, 161),
(237, '5', 0, 162),
(238, '6', 0, 162),
(239, '7', 1, 162),
(240, '8', 0, 162),
(241, '16', 0, 163),
(242, '18', 0, 163),
(243, '20', 1, 163),
(244, '24', 0, 163),
(245, '$275', 0, 164),
(246, '$280', 0, 164),
(247, '$300', 1, 164),
(248, '$325', 0, 164),
(281, 'Manzanas', 0, 173),
(282, 'Peras', 0, 173),
(283, 'Naranjas', 1, 173),
(284, 'Uvas', 0, 173),
(285, '2', 0, 174),
(286, '3', 1, 174),
(287, '4', 0, 174),
(288, '5', 0, 174),
(289, '35', 0, 175),
(290, '38', 0, 175),
(291, '40', 1, 175),
(292, '42', 0, 175),
(293, '25%', 0, 176),
(294, '30%', 1, 176),
(295, '35%', 0, 176),
(296, '40%', 0, 176),
(297, '2', 0, 177),
(298, '3', 0, 177),
(299, '4', 1, 177),
(300, '5', 0, 177),
(301, '12', 0, 178),
(302, '13', 0, 178),
(303, '14', 1, 178),
(304, '15', 0, 178),
(305, '1', 0, 179),
(306, '2', 1, 179),
(307, '3', 0, 179),
(308, '4', 0, 179),
(309, '30%', 0, 180),
(310, '35%', 0, 180),
(311, '40%', 1, 180),
(312, '45%', 0, 180),
(313, '19°', 0, 181),
(314, '20°', 1, 181),
(315, '21°', 0, 181),
(316, '22°', 0, 181),
(317, '8', 0, 182),
(318, '8.5', 1, 182),
(319, '9', 0, 182),
(320, '9.5', 0, 182),
(321, '10', 0, 183),
(322, '11', 0, 183),
(323, '12', 1, 183),
(324, '13', 0, 183),
(325, '8', 0, 184),
(326, '8.3', 1, 184),
(327, '8.5', 0, 184),
(328, '8.7', 0, 184),
(329, '3', 0, 185),
(330, '5', 1, 185),
(331, '7', 0, 185),
(332, '9', 0, 185),
(333, '8', 0, 186),
(334, '9', 1, 186),
(335, '10', 0, 186),
(336, '11', 0, 186),
(337, '7', 0, 187),
(338, '8', 1, 187),
(339, '9', 0, 187),
(340, '10', 0, 187),
(341, 'Porque es el número más común', 0, 188),
(342, 'Porque no se ve afectada por valores extremos como el promedio', 1, 188),
(343, 'Porque siempre es mayor que el promedio', 0, 188),
(344, 'Porque es más fácil de calcular', 0, 188),
(345, '2', 0, 189),
(346, '4', 1, 189),
(347, '7', 0, 189),
(348, '9', 0, 189),
(349, 'Sí, la moda es 1', 0, 190),
(350, 'Sí, la moda es 9', 0, 190),
(351, 'No tiene moda porque todos aparecen igual', 1, 190),
(352, 'Sí, la moda es 5', 0, 190),
(353, '24', 0, 191),
(354, '25', 1, 191),
(355, '26', 0, 191),
(356, '27', 0, 191),
(357, 'Rojo', 0, 192),
(358, 'Azul', 1, 192),
(359, 'Verde', 0, 192),
(360, 'Amarillo', 0, 192),
(361, '1/3', 0, 193),
(362, '1/4', 0, 193),
(363, '1/6', 1, 193),
(364, '1/2', 0, 193),
(365, '1/5', 0, 194),
(366, '3/10', 1, 194),
(367, '1/3', 0, 194),
(368, '1/2', 0, 194),
(369, '1/4', 0, 195),
(370, '1/3', 0, 195),
(371, '1/2', 1, 195),
(372, '2/3', 0, 195),
(373, '1/4', 0, 196),
(374, '2/5', 0, 196),
(375, '1/2', 1, 196),
(376, '3/5', 0, 196),
(377, '0.55', 0, 197),
(378, '0.60', 0, 197),
(379, '0.65', 1, 197),
(380, '0.75', 0, 197),
(381, '2/5', 0, 198),
(382, '3/5', 1, 198),
(383, '4/10', 0, 198),
(384, '1/2', 0, 198),
(385, '1/6', 0, 199),
(386, '2/6', 1, 199),
(387, '3/6', 0, 199),
(388, '4/6', 0, 199),
(389, '50', 0, 200),
(390, '55', 0, 200),
(391, '60', 1, 200),
(392, '65', 0, 200),
(393, 'Media=7.9, Mediana=8, Moda=8', 1, 201),
(394, 'Media=8, Mediana=8, Moda=8', 0, 201),
(395, 'Media=7.9, Mediana=7, Moda=6', 0, 201),
(396, 'Media=8, Mediana=7, Moda=8', 0, 201),
(397, '8', 0, 202),
(398, '10', 1, 202),
(399, '12', 0, 202),
(400, '15', 0, 202),
(401, '15', 0, 203),
(402, '18', 0, 203),
(403, '20', 1, 203),
(404, '25', 0, 203),
(405, '1/5', 0, 204),
(406, '3/10', 1, 204),
(407, '2/5', 0, 204),
(408, '1/3', 0, 204),
(409, '12', 0, 205),
(410, '18', 0, 205),
(411, '22', 1, 205),
(412, '24', 0, 205),
(413, '28', 0, 206),
(414, '35', 1, 206),
(415, '42', 0, 206),
(416, '49', 0, 206),
(417, '4', 0, 207),
(418, '5', 1, 207),
(419, '6', 0, 207),
(420, '7', 0, 207),
(421, '88', 0, 208),
(422, '92', 0, 208),
(423, '96', 1, 208),
(424, '100', 0, 208),
(425, '4', 0, 209),
(426, '5', 0, 209),
(427, '6', 1, 209),
(428, '7', 0, 209),
(429, '5', 0, 210),
(430, '6', 0, 210),
(431, '7', 1, 210),
(432, '10', 0, 210),
(433, '3', 0, 211),
(434, '4', 0, 211),
(435, '5', 1, 211),
(436, '6', 0, 211),
(437, '12', 0, 212),
(438, '16', 0, 212),
(439, '24', 1, 212),
(440, '36', 0, 212),
(441, 'Termina en número par', 1, 213),
(442, 'Termina en número impar', 0, 213),
(443, 'Su suma de dígitos es par', 0, 213),
(444, 'Termina en 5', 0, 213),
(445, 'Sí, termina en 5', 1, 214),
(446, 'No, no termina en 0', 0, 214),
(447, 'Sí, es impar', 0, 214),
(448, 'No, es muy grande', 0, 214),
(449, '3,451', 0, 215),
(450, '3,455', 0, 215),
(451, '3,450', 1, 215),
(452, '3,453', 0, 215),
(453, '340', 0, 216),
(454, '345', 0, 216),
(455, '346', 0, 216),
(456, '347', 1, 216),
(457, 'Su suma de dígitos es 9', 1, 217),
(458, 'Termina en número par', 0, 217),
(459, 'Termina en 2', 0, 217),
(460, 'Es mayor que 100', 0, 217),
(461, '325', 0, 218),
(462, '412', 0, 218),
(463, '531', 1, 218),
(464, '623', 0, 218),
(465, 'Sí, porque 2+4+5+7=18', 1, 219),
(466, 'No, porque es impar', 0, 219),
(467, 'Sí, porque termina en 7', 0, 219),
(468, 'No, es muy grande', 0, 219),
(469, '3', 0, 220),
(470, '5', 0, 220),
(471, '6', 1, 220),
(472, '8', 0, 220),
(473, '15', 0, 221),
(474, '21', 0, 221),
(475, '23', 1, 221),
(476, '27', 0, 221),
(477, '11', 0, 222),
(478, '13', 0, 222),
(479, '17', 0, 222),
(480, '21', 1, 222),
(481, '6', 0, 223),
(482, '7', 0, 223),
(483, '8', 1, 223),
(484, '9', 0, 223),
(485, 'Sí, solo se divide entre 1 y sí mismo', 0, 224),
(486, 'No, los primos tienen exactamente 2 divisores', 1, 224),
(487, 'Sí, es el primer número', 0, 224),
(488, 'No, porque es impar', 0, 224),
(489, '8', 0, 225),
(490, '10', 0, 225),
(491, '12', 1, 225),
(492, '24', 0, 225),
(493, '16', 0, 226),
(494, '24', 1, 226),
(495, '48', 0, 226),
(496, '11', 0, 226),
(497, '16 min', 0, 227),
(498, '20 min', 0, 227),
(499, '24 min', 1, 227),
(500, '32 min', 0, 227),
(501, '12', 0, 228),
(502, '21', 0, 228),
(503, '35', 1, 228),
(504, '70', 0, 228),
(505, '3', 0, 229),
(506, '4', 0, 229),
(507, '6', 1, 229),
(508, '9', 0, 229),
(509, '6', 0, 230),
(510, '8', 0, 230),
(511, '12', 1, 230),
(512, '18', 0, 230),
(513, '5', 0, 231),
(514, '10', 0, 231),
(515, '15', 1, 231),
(516, '30', 0, 231),
(517, '5', 0, 232),
(518, '7', 1, 232),
(519, '14', 0, 232),
(520, '35', 0, 232),
(521, '12', 0, 233),
(522, '16', 0, 233),
(523, '24', 1, 233),
(524, '48', 0, 233),
(525, '12', 0, 234),
(526, '16', 0, 234),
(527, '24', 1, 234),
(528, '36', 0, 234),
(529, '45', 0, 235),
(530, '60', 1, 235),
(531, '75', 0, 235),
(532, '80', 0, 235),
(533, '43', 0, 236),
(534, '45', 0, 236),
(535, '47', 1, 236),
(536, '49', 0, 236),
(537, '300 m', 0, 237),
(538, '3,000 m', 1, 237),
(539, '30,000 m', 0, 237),
(540, '300,000 m', 0, 237),
(541, '0.45 m', 0, 238),
(542, '4.5 m', 1, 238),
(543, '45 m', 0, 238),
(544, '4,500 m', 0, 238),
(545, '420 m', 0, 239),
(546, '4,200 m', 0, 239),
(547, '42,000 m', 1, 239),
(548, '420,000 m', 0, 239),
(549, '2,500 cm', 0, 240),
(550, '25,000 cm', 0, 240),
(551, '250,000 cm', 1, 240),
(552, '2,500,000 cm', 0, 240),
(553, '40 g', 0, 241),
(554, '400 g', 0, 241),
(555, '4,000 g', 1, 241),
(556, '40,000 g', 0, 241),
(557, '0.25 kg', 0, 242),
(558, '2.5 kg', 1, 242),
(559, '25 kg', 0, 242),
(560, '250 kg', 0, 242),
(561, '1,750 g', 0, 243),
(562, '1,850 g', 0, 243),
(563, '2,000 g', 1, 243),
(564, '2,250 g', 0, 243),
(565, '3.5 kg', 0, 244),
(566, '3.75 kg', 1, 244),
(567, '37.5 kg', 0, 244),
(568, '375 kg', 0, 244),
(569, '200 mL', 0, 245),
(570, '2,000 mL', 1, 245),
(571, '20,000 mL', 0, 245),
(572, '200,000 mL', 0, 245),
(573, '0.05 L', 0, 246),
(574, '0.5 L', 1, 246),
(575, '5 L', 0, 246),
(576, '50 L', 0, 246),
(577, '4', 0, 247),
(578, '5', 0, 247),
(579, '6', 1, 247),
(580, '8', 0, 247),
(581, '1.2 m³', 0, 248),
(582, '12 m³', 1, 248),
(583, '120 m³', 0, 248),
(584, '1,200 m³', 0, 248),
(585, '30 min', 0, 249),
(586, '90 min', 0, 249),
(587, '180 min', 1, 249),
(588, '300 min', 0, 249),
(589, '1 h 90 min', 0, 250),
(590, '2 h 30 min', 1, 250),
(591, '2 h 50 min', 0, 250),
(592, '3 h 30 min', 0, 250),
(593, '240 min', 0, 251),
(594, '250 min', 0, 251),
(595, '260 min', 1, 251),
(596, '280 min', 0, 251),
(597, '1 hora', 0, 252),
(598, '1.5 horas', 0, 252),
(599, '2 horas', 1, 252),
(600, '3 horas', 0, 252),
(601, '4 años', 0, 253),
(602, '5 años', 1, 253),
(603, '10 años', 0, 253),
(604, '25 años', 0, 253),
(605, '5', 0, 254),
(606, '8', 0, 254),
(607, '10', 1, 254),
(608, '20', 0, 254),
(609, 'Siglo XIX', 0, 255),
(610, 'Siglo XX', 0, 255),
(611, 'Siglo XXI', 1, 255),
(612, 'Siglo XXII', 0, 255),
(613, '720 min', 0, 256),
(614, '1,440 min', 1, 256),
(615, '2,880 min', 0, 256),
(616, '86,400 min', 0, 256),
(617, '45°', 0, 257),
(618, '90°', 1, 257),
(619, '180°', 0, 257),
(620, '360°', 0, 257),
(621, '90°', 0, 258),
(622, '120°', 0, 258),
(623, '180°', 1, 258),
(624, '270°', 0, 258),
(625, '40°', 0, 259),
(626, '50°', 1, 259),
(627, '60°', 0, 259),
(628, '70°', 0, 259),
(629, '45°', 0, 260),
(630, '90°', 1, 260),
(631, '120°', 0, 260),
(632, '180°', 0, 260),
(633, '9 m²', 0, 261),
(634, '18 m²', 0, 261),
(635, '20 m²', 1, 261),
(636, '24 m²', 0, 261),
(637, '100 m²', 0, 262),
(638, '1,000 m²', 0, 262),
(639, '10,000 m²', 1, 262),
(640, '100,000 m²', 0, 262),
(641, '3,000 m²', 0, 263),
(642, '30,000 m²', 1, 263),
(643, '300,000 m²', 0, 263),
(644, '3,000,000 m²', 0, 263),
(645, '0.07 ha', 0, 264),
(646, '0.7 ha', 1, 264),
(647, '7 ha', 0, 264),
(648, '70 ha', 0, 264),
(649, '1,000 mL', 0, 265),
(650, '1,250 mL', 0, 265),
(651, '1,500 mL', 1, 265),
(652, '2,500 mL', 0, 265),
(653, '20', 0, 266),
(654, '25', 0, 266),
(655, '30', 1, 266),
(656, '40', 0, 266),
(657, '45°', 0, 267),
(658, '90°', 0, 267),
(659, '120°', 1, 267),
(660, '200°', 0, 267),
(661, '1 ha', 0, 268),
(662, '2 ha', 1, 268),
(663, '20 ha', 0, 268),
(664, '200 ha', 0, 268),
(665, '13', 0, 269),
(666, '14', 0, 269),
(667, '15', 1, 269),
(668, '18', 0, 269),
(669, '75', 0, 270),
(670, '80', 1, 270),
(671, '82', 0, 270),
(672, '85', 0, 270),
(673, '14', 0, 271),
(674, '15', 0, 271),
(675, '16', 1, 271),
(676, '17', 0, 271),
(677, '15', 0, 272),
(678, '16', 0, 272),
(679, '17', 1, 272),
(680, '18', 0, 272),
(681, '18', 0, 273),
(682, '24', 0, 273),
(683, '32', 1, 273),
(684, '64', 0, 273),
(685, '162', 0, 274),
(686, '210', 0, 274),
(687, '243', 1, 274),
(688, '324', 0, 274),
(689, '100', 0, 275),
(690, '115', 0, 275),
(691, '125', 1, 275),
(692, '150', 0, 275),
(693, '48', 0, 276),
(694, '96', 0, 276),
(695, '120', 1, 276),
(696, '144', 0, 276),
(697, '8', 0, 277),
(698, '9', 1, 277),
(699, '10', 0, 277),
(700, '11', 0, 277),
(701, '20', 0, 278),
(702, '24', 0, 278),
(703, '25', 1, 278),
(704, '36', 0, 278),
(705, 'Rojo', 0, 279),
(706, 'Azul', 1, 279),
(707, 'Verde', 0, 279),
(708, 'Amarillo', 0, 279),
(709, '14', 0, 280),
(710, '15', 0, 280),
(711, '17', 1, 280),
(712, '20', 0, 280),
(713, '25', 0, 281),
(714, '28', 0, 281),
(715, '31', 1, 281),
(716, '35', 0, 281),
(717, '18', 0, 282),
(718, '20', 0, 282),
(719, '21', 1, 282),
(720, '24', 0, 282),
(721, '36', 0, 283),
(722, '48', 0, 283),
(723, '54', 1, 283),
(724, '72', 0, 283),
(725, '5', 0, 284),
(726, '6.25', 1, 284),
(727, '6.5', 0, 284),
(728, '10', 0, 284),
(729, '12', 0, 285),
(730, '24', 0, 285),
(731, '48', 1, 285),
(732, '96', 0, 285),
(733, '2', 0, 286),
(734, '3', 1, 286),
(735, '5', 0, 286),
(736, '10', 0, 286),
(737, '16', 0, 287),
(738, '25', 0, 287),
(739, '32', 1, 287),
(740, '64', 0, 287),
(741, '24', 0, 288),
(742, '36', 0, 288),
(743, '54', 1, 288),
(744, '162', 0, 288),
(745, '20', 0, 289),
(746, '25', 1, 289),
(747, '30', 0, 289),
(748, '55', 0, 289),
(749, '6', 0, 290),
(750, '7', 0, 290),
(751, '8', 1, 290),
(752, '9', 0, 290),
(753, '4', 0, 291),
(754, '5', 1, 291),
(755, '6', 0, 291),
(756, '7', 0, 291),
(757, '8', 0, 292),
(758, '16', 0, 292),
(759, '36', 0, 292),
(760, '48', 1, 292),
(761, '5', 0, 293),
(762, '6', 0, 293),
(763, '7', 1, 293),
(764, '8', 0, 293),
(765, '6', 0, 294),
(766, '7', 0, 294),
(767, '8', 1, 294),
(768, '9', 0, 294),
(769, '6', 0, 295),
(770, '8', 1, 295),
(771, '10', 0, 295),
(772, '12', 0, 295),
(773, '5', 0, 296),
(774, '6', 0, 296),
(775, '7', 1, 296),
(776, '8', 0, 296),
(777, '45', 0, 297),
(778, '50', 0, 297),
(779, '55', 1, 297),
(780, '68', 0, 297),
(781, '6', 0, 298),
(782, '7', 0, 298),
(783, '8', 1, 298),
(784, '9', 0, 298),
(785, '9', 0, 299),
(786, '12', 0, 299),
(787, '15', 1, 299),
(788, '31', 0, 299),
(789, '12', 0, 300),
(790, '15', 1, 300),
(791, '18', 0, 300),
(792, '20', 0, 300),
(793, '$135', 0, 301),
(794, '$145', 0, 301),
(795, '$165', 1, 301),
(796, '$175', 0, 301),
(797, '$120', 0, 302),
(798, '$125', 0, 302),
(799, '$130', 1, 302),
(800, '$140', 0, 302),
(801, '$45', 0, 303),
(802, '$50', 0, 303),
(803, '$53', 1, 303),
(804, '$58', 0, 303),
(805, '$5', 0, 304),
(806, '$10', 0, 304),
(807, '$15', 1, 304),
(808, '$20', 0, 304),
(809, '$10', 0, 305),
(810, '$12', 0, 305),
(811, '$13', 1, 305),
(812, '$17', 0, 305),
(813, '$48', 0, 306),
(814, '$50', 0, 306),
(815, '$52', 1, 306),
(816, '$62', 0, 306),
(817, '$45', 0, 307),
(818, '$50', 0, 307),
(819, '$55', 1, 307),
(820, '$60', 0, 307),
(821, '$40', 0, 308),
(822, '$45', 0, 308),
(823, '$50', 1, 308),
(824, '$55', 0, 308),
(825, '$3', 0, 309),
(826, '$4', 1, 309),
(827, '$5', 0, 309),
(828, '$6', 0, 309),
(829, 'Tienda A ($15/kg)', 1, 310),
(830, 'Tienda B ($16/kg)', 0, 310),
(831, 'Son iguales', 0, 310),
(832, 'Tienda B ($15/kg)', 0, 310),
(833, 'Suelto ($18 c/u)', 0, 311),
(834, 'Paquete ($15 c/u)', 1, 311),
(835, 'Son iguales', 0, 311),
(836, 'Paquete ($20 c/u)', 0, 311),
(837, '$5', 0, 312),
(838, '$10', 1, 312),
(839, '$15', 0, 312),
(840, '$20', 0, 312),
(841, '$2,000', 0, 313),
(842, '$2,500', 1, 313),
(843, '$3,000', 0, 313),
(844, '$3,500', 0, 313),
(845, '$10', 0, 314),
(846, '$15', 1, 314),
(847, '$20', 0, 314),
(848, '$25', 0, 314),
(849, '6 meses', 0, 315),
(850, '7 meses', 0, 315),
(851, '8 meses', 1, 315),
(852, '10 meses', 0, 315),
(853, '$500', 0, 316),
(854, '$650', 0, 316),
(855, '$750', 1, 316),
(856, '$900', 0, 316),
(857, '$400', 0, 317),
(858, '$425', 0, 317),
(859, '$450', 1, 317),
(860, '$475', 0, 317),
(861, '$210', 0, 318),
(862, '$225', 0, 318),
(863, '$240', 1, 318),
(864, '$270', 0, 318),
(865, '$560', 0, 319),
(866, '$600', 0, 319),
(867, '$644', 1, 319),
(868, '$680', 0, 319),
(869, '30% de descuento ($120 ahorro)', 1, 320),
(870, '$100 de descuento directo', 0, 320),
(871, 'Son exactamente iguales', 0, 320),
(872, '30% de descuento ($80 ahorro)', 0, 320),
(873, '$16', 0, 321),
(874, '$24', 0, 321),
(875, '$32', 1, 321),
(876, '$40', 0, 321),
(877, '$366', 0, 322),
(878, '$396', 0, 322),
(879, '$406', 1, 322),
(880, '$416', 0, 322),
(881, '$464', 0, 323),
(882, '$480', 0, 323),
(883, '$500', 1, 323),
(884, '$520', 0, 323),
(885, '$520', 0, 324),
(886, '$550', 0, 324),
(887, '$580', 1, 324),
(888, '$600', 0, 324),
(889, '$140', 0, 325),
(890, '$150', 0, 325),
(891, '$160', 1, 325),
(892, '$175', 0, 325),
(893, '$270', 0, 326),
(894, '$290', 0, 326),
(895, '$310', 1, 326),
(896, '$340', 0, 326),
(897, '150 kWh', 0, 327),
(898, '160 kWh', 0, 327),
(899, '180 kWh', 1, 327),
(900, '200 kWh', 0, 327),
(901, 'Sobran $1,460', 0, 328),
(902, 'Sobran $1,560', 0, 328),
(903, 'Sobran $1,660', 1, 328),
(904, 'Faltan $340', 0, 328),
(905, '$57.50', 0, 329),
(906, '$62.50', 1, 329),
(907, '$63.50', 0, 329),
(908, '$72.50', 0, 329),
(909, '$280', 0, 330),
(910, '$350', 0, 330),
(911, '$420', 1, 330),
(912, '$560', 0, 330),
(913, '$1,200', 0, 331),
(914, '$1,500', 0, 331),
(915, '$1,800', 1, 331),
(916, '$2,400', 0, 331),
(917, '$624', 0, 332),
(918, '$656', 0, 332),
(919, '$678.60', 1, 332),
(920, '$693.60', 0, 332);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`) VALUES
(1, 'Administrador'),
(2, 'Docente'),
(3, 'Estudiante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE `temas` (
  `id_tema` int(11) NOT NULL,
  `nombre_tema` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `temas`
--

INSERT INTO `temas` (`id_tema`, `nombre_tema`) VALUES
(2, 'Análisis de Datos y Probabilidad'),
(6, 'Educación Financiera'),
(5, 'Pensamiento Lógico y Precálculo'),
(1, 'Proporcionalidad y Funciones'),
(3, 'Sentido Numérico y Aritmética'),
(4, 'Unidades de Medida y Conversiones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `grado` varchar(50) DEFAULT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `correo`, `contraseña`, `grado`, `id_rol`) VALUES
(1, 'Kevin', 'kevin.alumno@correo.com', 'alumno_pass_1', '4to de Primaria', 3),
(2, 'Sofía', 'sofia.alumno@correo.com', 'alumno_pass_2', '4to de Primaria', 3),
(3, 'Alejandro', 'ale.alumno@correo.com', 'alumno_pass_3', '5to de Primaria', 3),
(4, 'aldimer', 'aldimerbravo@gmail.com', '12345678v', '4° de Primaria', 3),
(5, 'abril', 'abrilitusw@gmail.com', '12345678v', '4° de Primaria', 3),
(6, 'meli', 'melidf@gmial.com', '12345678v', '4° de Primaria', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_medallas`
--

CREATE TABLE `usuario_medallas` (
  `id_usuario` int(11) NOT NULL,
  `id_medalla` int(11) NOT NULL,
  `fecha_obtencion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD PRIMARY KEY (`id_ejercicio`),
  ADD KEY `FK_ejercicios_temas` (`id_tema`),
  ADD KEY `FK_ejercicios_niveles` (`id_nivel`);

--
-- Indices de la tabla `intentos`
--
ALTER TABLE `intentos`
  ADD PRIMARY KEY (`id_intento`),
  ADD KEY `FK_intentos_usuarios` (`id_usuario`),
  ADD KEY `FK_intentos_ejercicios` (`id_ejercicio`);

--
-- Indices de la tabla `medallas`
--
ALTER TABLE `medallas`
  ADD PRIMARY KEY (`id_medalla`);

--
-- Indices de la tabla `niveles`
--
ALTER TABLE `niveles`
  ADD PRIMARY KEY (`id_nivel`);

--
-- Indices de la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`id_opcion`),
  ADD KEY `FK_opciones_ejercicios` (`id_ejercicio`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD UNIQUE KEY `UQ_nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `temas`
--
ALTER TABLE `temas`
  ADD PRIMARY KEY (`id_tema`),
  ADD UNIQUE KEY `UQ_nombre_tema` (`nombre_tema`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UQ_correo` (`correo`),
  ADD KEY `FK_usuarios_roles` (`id_rol`);

--
-- Indices de la tabla `usuario_medallas`
--
ALTER TABLE `usuario_medallas`
  ADD PRIMARY KEY (`id_usuario`,`id_medalla`),
  ADD KEY `FK_usumed_medallas` (`id_medalla`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=333;

--
-- AUTO_INCREMENT de la tabla `intentos`
--
ALTER TABLE `intentos`
  MODIFY `id_intento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medallas`
--
ALTER TABLE `medallas`
  MODIFY `id_medalla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `niveles`
--
ALTER TABLE `niveles`
  MODIFY `id_nivel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `opciones`
--
ALTER TABLE `opciones`
  MODIFY `id_opcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=921;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `temas`
--
ALTER TABLE `temas`
  MODIFY `id_tema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ejercicios`
--
ALTER TABLE `ejercicios`
  ADD CONSTRAINT `FK_ejercicios_niveles` FOREIGN KEY (`id_nivel`) REFERENCES `niveles` (`id_nivel`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_ejercicios_temas` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id_tema`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `intentos`
--
ALTER TABLE `intentos`
  ADD CONSTRAINT `FK_intentos_ejercicios` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicios` (`id_ejercicio`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_intentos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD CONSTRAINT `FK_opciones_ejercicios` FOREIGN KEY (`id_ejercicio`) REFERENCES `ejercicios` (`id_ejercicio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `FK_usuarios_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_medallas`
--
ALTER TABLE `usuario_medallas`
  ADD CONSTRAINT `FK_usumed_medallas` FOREIGN KEY (`id_medalla`) REFERENCES `medallas` (`id_medalla`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_usumed_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
