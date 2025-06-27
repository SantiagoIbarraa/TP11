// src/controllers/authController.js
const db = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login de usuario [cite: 252]
exports.login = (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos.' });
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor.' });
    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const user = results[0];
    const passwordIsValid = await bcrypt.compare(pass, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'tu_secreto_jwt', {
      expiresIn: '1h', // El token expira en 1 hora
    }); // [cite: 252]

    res.json({
      mensaje: 'Login exitoso',
      token,
    });
  });
};

// Obtener perfil del usuario (ruta protegida) [cite: 254]
exports.getPerfil = (req, res) => {
  db.query('SELECT id, nombre, email FROM usuarios WHERE id = ?', [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor.' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json(results[0]);
  });
};