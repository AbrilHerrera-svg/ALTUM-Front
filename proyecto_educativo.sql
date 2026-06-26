-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2026 a las 06:05:14
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
(1, 'Si 3 manzanas cuestan $15, ¿cuánto cuestan 6 manzanas?', 'Si duplicas la cantidad, el precio también se duplica. 15 × 2 = ? 🍎', 1, 1),
(2, 'En una receta para 4 personas se usan 2 tazas de harina. ¿Cuántas tazas necesitas para 8 personas?', 'Si duplicas las personas, duplicas los ingredientes. 2 × 2 = ? 🎂', 1, 1),
(3, 'Un auto recorre 120 km en 2 horas. ¿Cuántos km recorre en 5 horas a la misma velocidad?', 'Primero calcula cuánto recorre en 1 hora: 120 ÷ 2 = 60 km/h. Luego multiplica por 5. 🚗', 1, 1),
(4, 'Si 5 cuadernos cuestan $35, ¿cuánto cuestan 3 cuadernos?', 'Primero calcula el precio de 1 cuaderno: 35 ÷ 5 = $7. Luego multiplica por 3. 📓', 1, 1),
(5, 'Si 3 manzanas cuestan $15, ¿cuánto cuestan 6 manzanas?', 'Si duplicas la cantidad, el precio también se duplica. 15 × 2 = ? 🍎', 1, 1),
(6, 'En una receta para 4 personas se usan 2 tazas de harina. ¿Cuántas tazas necesitas para 8 personas?', 'Si duplicas las personas, duplicas los ingredientes. 2 × 2 = ? 🎂', 1, 1),
(7, 'Un auto recorre 120 km en 2 horas. ¿Cuántos km recorre en 5 horas a la misma velocidad?', 'Primero calcula cuánto recorre en 1 hora: 120 ÷ 2 = 60 km/h. Luego multiplica por 5. 🚗', 1, 1),
(8, 'Si 5 cuadernos cuestan $35, ¿cuánto cuestan 3 cuadernos?', 'Primero calcula el precio de 1 cuaderno: 35 ÷ 5 = $7. Luego multiplica por 3. 📓', 1, 1),
(9, 'Una gráfica de barras muestra: Manzanas=8, Peras=5, Naranjas=12, Uvas=3. ¿Cuál fruta es la más vendida?', 'La barra más alta representa la fruta más vendida. ¿Cuál tiene el número mayor? 🍊', 2, 1),
(10, 'En la misma gráfica, ¿cuántas frutas más se vendieron de Manzanas que de Peras?', 'Resta: Manzanas - Peras = 8 - 5 = ? 🍎', 2, 1),
(11, 'Una gráfica muestra deportes favoritos: Fútbol=15, Natación=8, Básquet=12, Tenis=5. ¿Cuántos estudiantes en total respondieron?', 'Suma todos los valores: 15 + 8 + 12 + 5 = ? ⚽', 2, 1),
(12, 'En una gráfica de barras sobre colores favoritos, el Azul tiene barra de 18 y el Rojo de 12. ¿Qué porcentaje eligió Azul si participaron 60 alumnos?', '(18 ÷ 60) × 100 = ? 🎨', 2, 1),
(13, 'Si lanzas un dado de 6 caras, ¿cuál es la probabilidad de obtener un número mayor a 4?', 'Los números mayores a 4 son el 5 y el 6. Son 2 casos favorables de 6 posibles. Simplifica: 2/6 = ? 🎲', 2, 1),
(14, 'En una bolsa hay 3 canicas rojas, 2 azules y 5 verdes. ¿Qué probabilidad hay de sacar una canica verde?', 'Suma todas las canicas: 3+2+5 = 10. ¿Cuántas son verdes? (Verdes / Total) 🟢', 2, 1),
(15, 'Si la media de 3 exámenes es 8, ¿cuál es la suma total de las calificaciones?', 'Si el promedio es 8, entonces: Suma Total / 3 = 8. Multiplica 8 por 3 📝', 2, 1),
(16, '¿Cuál es la mediana del conjunto de datos: 3, 7, 1, 9, 5?', 'Ordena de menor a mayor: 1, 3, 5, 7, 9. ¿Qué número está justo en el centro? 📊', 2, 1),
(17, '¿Cuál de estos NO es múltiplo de 6?', 'Los múltiplos de 6 son: 6, 12, 18, 24, 30... ¿Cuál no aparece en esa lista? 🔢', 3, 1),
(18, '¿Cuál es el 5° múltiplo de 7?', 'Los múltiplos de 7 son: 7×1=7, 7×2=14, 7×3=21, 7×4=28, 7×5=? ⭐', 3, 1),
(19, '¿Cuántos múltiplos de 9 hay entre 1 y 50?', 'Lista los múltiplos de 9: 9, 18, 27, 36, 45... ¿Cuáles caen entre 1 y 50? 📊', 3, 1),
(20, '¿Cuál es el múltiplo de 8 más cercano a 100, sin pasarse?', '8 × 12 = 96 y 8 × 13 = 104. ¿Cuál está más cerca sin pasarse de 100? 🎯', 3, 1),
(21, '3 km = ? metros', '1 km = 1,000 m. Multiplica: 3 × 1,000 = ? 📏', 4, 1),
(22, '450 cm = ? metros', '1 m = 100 cm. Divide: 450 ÷ 100 = ? 📐', 4, 1),
(23, 'Una maratón tiene 42 km. ¿Cuántos metros son?', '1 km = 1,000 m. Multiplica: 42 × 1,000 = ? 🏃', 4, 1),
(24, '2.5 km = ? centímetros', '1 km = 100,000 cm. Multiplica: 2.5 × 100,000 = ? 🔢', 4, 1),
(25, '¿Cuál es el siguiente número? 3, 6, 9, 12, _', 'La diferencia entre cada número es siempre la misma. ¿Cuánto se suma cada vez? 🔢', 5, 1),
(26, 'Completa la sucesión: 100, 90, _, 70, 60', 'La sucesión va bajando. ¿De cuánto en cuánto disminuye? 📉', 5, 1),
(27, '¿Cuál es el siguiente número? 1, 4, 7, 10, 13, _', '4-1=3, 7-4=3... La diferencia es siempre 3. 🎯', 5, 1),
(28, 'Sucesión: 2, 5, 8, 11, 14, _', 'Observa la diferencia entre cada par. Suma 3 al último término. ➕', 5, 1),
(29, 'Compraste 3 cuadernos de $15 c/u y una mochila de $120. ¿Cuánto gastaste en total?', 'Cuadernos: 3 × $15 = $45. Total: $45 + $120 = ? 📚', 6, 1),
(30, 'Tenías $200. Compraste un helado de $25 y una torta de $45. ¿Cuánto te queda?', 'Gastos: 25 + 45 = $70. Restante: 200 - 70 = ? 🍦', 6, 1),
(31, 'Compras: 2 plumas ($8 c/u), 1 libreta ($22) y 3 borradores ($5 c/u). ¿Cuánto pagas?', 'Plumas=16, libreta=22, borradores=15. Suma: 16+22+15=? ✏️', 6, 1),
(32, 'Papá tiene $500. Paga electricidad ($180), agua ($95) y despensa ($210). ¿Cuánto sobra?', 'Suma gastos: 180+95+210=$485. Restante: 500-485=? 💡', 6, 1);

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
  `nombre_nivel` varchar(100) NOT NULL,
  `id_tema` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `niveles`
--

INSERT INTO `niveles` (`id_nivel`, `nombre_nivel`, `id_tema`) VALUES
(1, 'Nivel 1', 1);

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
(17, '$20', 0, 4),
(18, '$25', 0, 4),
(19, '$30', 1, 4),
(20, '$35', 0, 4),
(21, '3 tazas', 0, 5),
(22, '4 tazas', 1, 5),
(23, '6 tazas', 0, 5),
(24, '8 tazas', 0, 5),
(25, '240 km', 0, 6),
(26, '280 km', 0, 6),
(27, '300 km', 1, 6),
(28, '360 km', 0, 6),
(29, '$15', 0, 7),
(30, '$18', 0, 7),
(31, '$21', 1, 7),
(32, '$25', 0, 7),
(33, 'Manzanas', 0, 9),
(34, 'Peras', 0, 9),
(35, 'Naranjas', 1, 9),
(36, 'Uvas', 0, 9),
(37, '2', 0, 10),
(38, '3', 1, 10),
(39, '4', 0, 10),
(40, '5', 0, 10),
(45, '25%', 0, 12),
(46, '30%', 1, 12),
(47, '35%', 0, 12),
(48, '40%', 0, 12),
(49, '1/6', 0, 13),
(50, '1/3', 1, 13),
(51, '1/2', 0, 13),
(52, '2/3', 0, 13),
(53, '1/2', 1, 14),
(54, '1/5', 0, 14),
(55, '1/10', 0, 14),
(56, '2/5', 0, 14),
(57, '11', 0, 15),
(58, '24', 1, 15),
(59, '21', 0, 15),
(60, '8', 0, 15),
(61, '3', 0, 16),
(62, '9', 0, 16),
(63, '5', 1, 16),
(64, '7', 0, 16),
(65, '12', 0, 17),
(66, '18', 0, 17),
(67, '22', 1, 17),
(68, '24', 0, 17),
(69, '28', 0, 18),
(70, '35', 1, 18),
(71, '42', 0, 18),
(72, '49', 0, 18),
(73, '4', 0, 19),
(74, '5', 1, 19),
(75, '6', 0, 19),
(76, '7', 0, 19),
(77, '88', 0, 20),
(78, '92', 0, 20),
(79, '96', 1, 20),
(80, '100', 0, 20),
(81, '300 m', 0, 21),
(82, '3,000 m', 1, 21),
(83, '30,000 m', 0, 21),
(84, '300,000 m', 0, 21),
(85, '0.45 m', 0, 22),
(86, '4.5 m', 1, 22),
(87, '45 m', 0, 22),
(88, '4,500 m', 0, 22),
(89, '420 m', 0, 23),
(90, '4,200 m', 0, 23),
(91, '42,000 m', 1, 23),
(92, '420,000 m', 0, 23),
(93, '2,500 cm', 0, 24),
(94, '25,000 cm', 0, 24),
(95, '250,000 cm', 1, 24),
(96, '2,500,000 cm', 0, 24),
(97, '13', 0, 25),
(98, '14', 0, 25),
(99, '15', 1, 25),
(100, '18', 0, 25),
(101, '75', 0, 26),
(102, '80', 1, 26),
(103, '82', 0, 26),
(104, '85', 0, 26),
(105, '14', 0, 27),
(106, '15', 0, 27),
(107, '16', 1, 27),
(108, '17', 0, 27),
(109, '15', 0, 28),
(110, '16', 0, 28),
(111, '17', 1, 28),
(112, '18', 0, 28),
(113, '$135', 0, 29),
(114, '$145', 0, 29),
(115, '$165', 1, 29),
(116, '$175', 0, 29),
(117, '$120', 0, 30),
(118, '$125', 0, 30),
(119, '$130', 1, 30),
(120, '$140', 0, 30),
(121, '$45', 0, 31),
(122, '$50', 0, 31),
(123, '$53', 1, 31),
(124, '$58', 0, 31),
(125, '$5', 0, 32),
(126, '$10', 0, 32),
(127, '$15', 1, 32),
(128, '$20', 0, 32),
(133, '35', 0, 11),
(134, '38', 0, 11),
(135, '40', 1, 11),
(136, '42', 0, 11);

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
  ADD PRIMARY KEY (`id_nivel`),
  ADD KEY `FK_niveles_temas` (`id_tema`);

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
  MODIFY `id_ejercicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

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
  MODIFY `id_nivel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `opciones`
--
ALTER TABLE `opciones`
  MODIFY `id_opcion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

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
-- Filtros para la tabla `niveles`
--
ALTER TABLE `niveles`
  ADD CONSTRAINT `FK_niveles_temas` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id_tema`) ON DELETE CASCADE;

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
