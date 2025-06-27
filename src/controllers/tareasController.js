// src/controllers/tareasController.js
let tareas = []; // Persistencia en memoria
let currentId = 1;

// Crear nueva tarea [cite: 220]
exports.crearTarea = (req, res) => {
  const { titulo } = req.body;
  if (!titulo) { // [cite: 226]
    return res.status(400).json({ error: 'El título es requerido.' });
  }
  const nuevaTarea = {
    id: currentId++,
    titulo,
    completado: false, // [cite: 220]
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
};

// Listar todas las tareas [cite: 221]
exports.listarTareas = (req, res) => {
  const { completado } = req.query;
  if (completado !== undefined) {
    const esCompletado = completado === 'true'; // [cite: 227]
    const tareasFiltradas = tareas.filter(t => t.completado === esCompletado);
    return res.json(tareasFiltradas);
  }
  res.json(tareas);
};

// Obtener una tarea específica [cite: 222]
exports.obtenerTarea = (req, res) => {
  const tarea = tareas.find(t => t.id === parseInt(req.params.id));
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }
  res.json(tarea);
};

// Actualizar una tarea [cite: 223]
exports.actualizarTarea = (req, res) => {
  const { titulo, completado } = req.body;
  const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }
  const tarea = tareas[index];
  if (titulo !== undefined) tarea.titulo = titulo;
  if (completado !== undefined) tarea.completado = completado;

  tareas[index] = tarea;
  res.json(tarea);
};

// Eliminar una tarea [cite: 224]
exports.eliminarTarea = (req, res) => {
  const index = tareas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }
  tareas.splice(index, 1);
  res.status(204).send();
};