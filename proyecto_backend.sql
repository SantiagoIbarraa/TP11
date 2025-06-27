-- Script para crear la base de datos y tabla de ejemplo
CREATE DATABASE IF NOT EXISTS proyecto_backend;
USE proyecto_backend;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

-- Insertar algunos usuarios de ejemplo
INSERT INTO usuarios (nombre, email) VALUES
('Juan Perez', 'juan@example.com'),
('Ana Gomez', 'ana@example.com'); 