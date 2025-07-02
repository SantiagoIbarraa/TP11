// src/controllers/productosController.js
const db = require('../db');
// Crear nuevo producto [cite: 232]
exports.crearProducto = (req, res) => {
  const { nombre, precio, stock } = req.body;
  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: 'Nombre, precio y stock son requeridos.' });
  }
  const query = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
  db.query(query, [nombre, precio, stock], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear el producto.' });
    res.status(201).json({ id: result.insertId, nombre, precio, stock });
  });
};

// Listar productos con paginación y búsqueda [cite: 233, 235]
exports.listarProductos = (req, res) => {
  const { page = 1, limit = 5, q } = req.query;
  const offset = (page - 1) * limit;
  let query = 'SELECT * FROM productos';
  const queryParams = [];

  if (q) { // [cite: 235]
    query += ' WHERE nombre LIKE ?';
    queryParams.push(`%${q}%`);
  }

  query += ' LIMIT ? OFFSET ?'; // [cite: 233]
  queryParams.push(parseInt(limit), parseInt(offset));

  db.query(query, queryParams, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al listar los productos.' });
    res.json(results);
  });
};

// Actualizar precio o stock de un producto [cite: 234]
exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { precio, stock } = req.body;
  
  if (precio === undefined && stock === undefined) {
    return res.status(400).json({ error: 'Se requiere al menos un campo (precio o stock) para actualizar.' });
  }

  const fields = [];
  const values = [];
  if (precio !== undefined) {
    fields.push('precio = ?');
    values.push(precio);
  }
  if (stock !== undefined) {
    fields.push('stock = ?');
    values.push(stock);
  }
  values.push(id);

  const query = `UPDATE productos SET ${fields.join(', ')} WHERE id = ?`;
  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el producto.' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json({ mensaje: 'Producto actualizado exitosamente.' });
  });
};