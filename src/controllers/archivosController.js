// src/controllers/archivosController.js
const fs = require('fs/promises');
const path = require('path');

const docsPath = path.join(__dirname, '../../docs');

// Listar todos los archivos de la carpeta 'docs' [cite: 211]
exports.listarArchivos = async (req, res) => {
  try {
    const files = await fs.readdir(docsPath);
    res.json({ archivos: files });
  } catch (error) {
    res.status(500).json({ error: 'Error al leer el directorio de archivos.' });
  }
};

// Crear un nuevo archivo con contenido [cite: 215]
exports.crearArchivo = async (req, res) => {
  const { nombre, contenido } = req.body;
  if (!nombre || !contenido) {
    return res.status(400).json({ error: 'El nombre y el contenido son requeridos.' });
  }
  try {
    const filePath = path.join(docsPath, nombre);
    await fs.writeFile(filePath, contenido, 'utf-8');
    res.status(201).json({ mensaje: `Archivo '${nombre}' creado exitosamente.` });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el archivo.' });
  }
};

// Leer contenido de un archivo específico [cite: 216]
exports.leerArchivo = async (req, res) => {
  try {
    const filePath = path.join(docsPath, req.params.nombre);
    const contenido = await fs.readFile(filePath, 'utf-8');
    res.json({ nombre: req.params.nombre, contenido });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: 'Archivo no encontrado.' });
    }
    res.status(500).json({ error: 'Error al leer el archivo.' });
  }
};