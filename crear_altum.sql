-- ============================================================
-- CREAR BASE DE DATOS ALTUM
-- ============================================================

DROP DATABASE IF EXISTS ALTUM;
CREATE DATABASE ALTUM CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ALTUM;

-- ============================================================
-- TABLA: ROLES
-- ============================================================
CREATE TABLE ROLES (
  id_rol INT PRIMARY KEY AUTO_INCREMENT,
  nombre_rol VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO ROLES (nombre_rol) VALUES ('admin'), ('teacher'), ('student');

-- ============================================================
-- TABLA: USUARIOS
-- ============================================================
CREATE TABLE USUARIOS (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100),
  grado VARCHAR(50),
  correo VARCHAR(100) UNIQUE NOT NULL,
  contraseña VARCHAR(255) NOT NULL,
  id_rol INT NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_rol) REFERENCES ROLES(id_rol)
);

-- Usuarios de ejemplo
INSERT INTO USUARIOS (nombre, apellidos, grado, correo, contraseña, id_rol) VALUES
('Admin', 'Sistema', NULL, 'admin@altum.com', 'admin123', 1),
('Profesor', 'García', NULL, 'profesor@altum.com', 'profesor123', 2),
('Juan', 'Pérez', '4° de Primaria', 'juan@example.com', 'juan123', 3),
('María', 'López', '5° de Primaria', 'maria@example.com', 'maria123', 3),
('Pedro', 'González', '6° de Primaria', 'pedro@example.com', 'pedro123', 3);

-- ============================================================
-- TABLA: MEDALLAS
-- ============================================================
CREATE TABLE MEDALLAS (
  id_medalla INT PRIMARY KEY AUTO_INCREMENT,
  nombre_medalla VARCHAR(100) NOT NULL
);

INSERT INTO MEDALLAS (nombre_medalla) VALUES
('Primer paso'),
('Conquistador'),
('Matemático'),
('Campeón');

-- ============================================================
-- TABLA: USUARIO_MEDALLA (Relación N:M)
-- ============================================================
CREATE TABLE USUARIO_MEDALLA (
  id_usuario INT NOT NULL,
  id_medalla INT NOT NULL,
  fecha_obtenida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario, id_medalla),
  FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario),
  FOREIGN KEY (id_medalla) REFERENCES MEDALLAS(id_medalla)
);

-- ============================================================
-- TABLA: TEMAS
-- ============================================================
CREATE TABLE TEMAS (
  id_tema INT PRIMARY KEY AUTO_INCREMENT,
  nombre_tema VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO TEMAS (nombre_tema) VALUES
('Sentido Numérico y Aritmética'),
('Geometría'),
('Fracciones y Decimales'),
('Estadística y Probabilidad'),
('Patrones y Álgebra'),
('Medición');

-- ============================================================
-- TABLA: NIVELES
-- ============================================================
CREATE TABLE NIVELES (
  id_nivel INT PRIMARY KEY AUTO_INCREMENT,
  nombre_nivel VARCHAR(100) NOT NULL
);

INSERT INTO NIVELES (nombre_nivel) VALUES
('Nivel 0'), ('Nivel 1'), ('Nivel 2'), ('Nivel 3'),
('Nivel 4'), ('Nivel 5'), ('Nivel 6'), ('Nivel 7');

-- ============================================================
-- TABLA: EJERCICIOS
-- ============================================================
CREATE TABLE EJERCICIOS (
  id_ejercicio INT PRIMARY KEY AUTO_INCREMENT,
  descripcion TEXT NOT NULL,
  tip TEXT,
  id_tema INT NOT NULL,
  id_nivel INT NOT NULL,
  grado INT NOT NULL COMMENT '4, 5 o 6',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_tema) REFERENCES TEMAS(id_tema),
  FOREIGN KEY (id_nivel) REFERENCES NIVELES(id_nivel)
);

-- Ejercicios de ejemplo para 4to grado
INSERT INTO EJERCICIOS (descripcion, tip, id_tema, id_nivel, grado) VALUES
('¿Cuánto es 2 + 3?', 'Suma los números con los dedos', 1, 1, 4),
('¿Cuánto es 10 - 5?', 'Resta desde 10 hacia atrás', 1, 1, 4),
('¿Cuánto es 3 × 4?', 'Multiplica contando grupos', 1, 2, 4),
('¿Cuánto es 20 ÷ 4?', 'Divide en partes iguales', 1, 2, 4);

-- Ejercicios de ejemplo para 5to grado
INSERT INTO EJERCICIOS (descripcion, tip, id_tema, id_nivel, grado) VALUES
('¿Cuánto es 25 + 45?', 'Suma las decenas primero', 1, 3, 5),
('¿Cuánto es 100 - 37?', 'Resta paso a paso', 1, 3, 5),
('¿Cuánto es 12 × 8?', 'Usa la multiplicación cruzada', 1, 4, 5);

-- Ejercicios de ejemplo para 6to grado
INSERT INTO EJERCICIOS (descripcion, tip, id_tema, id_nivel, grado) VALUES
('¿Cuánto es 234 + 567?', 'Agrupa por valor posicional', 1, 5, 6),
('¿Cuánto es 500 - 234?', 'Usa reagrupación si es necesario', 1, 5, 6),
('¿Cuánto es 45 × 23?', 'Multiplica cada dígito', 1, 6, 6);

-- ============================================================
-- TABLA: OPCIONES
-- ============================================================
CREATE TABLE OPCIONES (
  id_opcion INT PRIMARY KEY AUTO_INCREMENT,
  texto_opcion VARCHAR(255) NOT NULL,
  es_correcta BOOLEAN DEFAULT FALSE,
  id_ejercicio INT NOT NULL,
  FOREIGN KEY (id_ejercicio) REFERENCES EJERCICIOS(id_ejercicio) ON DELETE CASCADE
);

-- Opciones para: ¿Cuánto es 2 + 3?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('4', FALSE, 1),
('5', TRUE, 1),
('6', FALSE, 1),
('3', FALSE, 1);

-- Opciones para: ¿Cuánto es 10 - 5?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('3', FALSE, 2),
('5', TRUE, 2),
('10', FALSE, 2),
('15', FALSE, 2);

-- Opciones para: ¿Cuánto es 3 × 4?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('10', FALSE, 3),
('11', FALSE, 3),
('12', TRUE, 3),
('14', FALSE, 3);

-- Opciones para: ¿Cuánto es 20 ÷ 4?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('4', FALSE, 4),
('5', TRUE, 4),
('6', FALSE, 4),
('8', FALSE, 4);

-- Opciones para: ¿Cuánto es 25 + 45?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('60', FALSE, 5),
('70', TRUE, 5),
('75', FALSE, 5),
('80', FALSE, 5);

-- Opciones para: ¿Cuánto es 100 - 37?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('60', FALSE, 6),
('63', TRUE, 6),
('65', FALSE, 6),
('70', FALSE, 6);

-- Opciones para: ¿Cuánto es 12 × 8?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('90', FALSE, 7),
('95', FALSE, 7),
('96', TRUE, 7),
('100', FALSE, 7);

-- Opciones para: ¿Cuánto es 234 + 567?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('700', FALSE, 8),
('801', TRUE, 8),
('850', FALSE, 8),
('900', FALSE, 8);

-- Opciones para: ¿Cuánto es 500 - 234?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('200', FALSE, 9),
('266', TRUE, 9),
('300', FALSE, 9),
('350', FALSE, 9);

-- Opciones para: ¿Cuánto es 45 × 23?
INSERT INTO OPCIONES (texto_opcion, es_correcta, id_ejercicio) VALUES
('900', FALSE, 10),
('1025', TRUE, 10),
('1100', FALSE, 10),
('1200', FALSE, 10);

-- ============================================================
-- TABLA: INTENTOS
-- ============================================================
CREATE TABLE INTENTOS (
  id_intento INT PRIMARY KEY AUTO_INCREMENT,
  id_usuario INT NOT NULL,
  id_ejercicio INT NOT NULL,
  id_tema INT NOT NULL,
  grado_usuario INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resultado_puntos INT DEFAULT 0,
  vidas_utilizadas INT DEFAULT 1,
  tiempo_empleado INT COMMENT 'en segundos',
  FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario),
  FOREIGN KEY (id_ejercicio) REFERENCES EJERCICIOS(id_ejercicio),
  FOREIGN KEY (id_tema) REFERENCES TEMAS(id_tema)
);

-- ============================================================
-- VERIFICACIÓN FINAL
-- ============================================================
SELECT 'Base de datos ALTUM creada exitosamente' AS mensaje;
SHOW TABLES;
