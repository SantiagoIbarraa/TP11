// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware para verificar token en rutas protegidas [cite: 253]
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No autorizado. Token no provisto.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'tu_secreto_jwt'); // Usa una variable de entorno en producción
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'No autorizado. Token inválido.' });
  }
};