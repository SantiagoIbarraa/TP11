const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const db = require('./db');
const app = express();
// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware de logging
app.use((req, res, next) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.url}`);
  next();
});
// Rutas
app.use('/api', apiRoutes);
// Ruta de prueba
app.get('/', (req, res) => {
 res.send('Backend funcionando para Proyecto de Sitios Web Dinámicos');
});
// Rutas básicas
app.get('/saludo', (req, res) => {
  const nombre = req.query.nombre;
  if (nombre) {
    res.send(`Hola ${nombre}`);
  } else {
    res.send('Hola mundo');
  }
});

// Ruta GET para mostrar formulario HTML de operaciones
app.get('/suma', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Calculadora de Operaciones</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f0f4f8; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .calc-container { background: #fff; padding: 2rem 2.5rem; border-radius: 12px; box-shadow: 0 2px 12px #0001; }
        h2 { color: #2a4365; text-align: center; }
        form { display: flex; flex-direction: column; gap: 1rem; }
        input, select, button { padding: 0.5rem; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 1rem; }
        button { background: #2b6cb0; color: #fff; border: none; cursor: pointer; transition: background 0.2s; }
        button:hover { background: #2c5282; }
      </style>
    </head>
    <body>
      <div class="calc-container">
        <h2>Calculadora de Operaciones</h2>
        <form method="POST" action="/suma">
          <input type="number" name="a" placeholder="Primer número" required />
          <input type="number" name="b" placeholder="Segundo número" required />
          <select name="op">
            <option value="sumar">Sumar</option>
            <option value="restar">Restar</option>
            <option value="multiplicar">Multiplicar</option>
            <option value="dividir">Dividir</option>
          </select>
          <button type="submit">Calcular</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Ruta POST para procesar la operación
app.post('/suma', (req, res) => {
  let a = req.body.a;
  let b = req.body.b;
  let op = req.body.op;

  // Si viene de formulario, los valores son string
  a = typeof a === 'string' ? parseFloat(a) : a;
  b = typeof b === 'string' ? parseFloat(b) : b;

  if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
    return res.status(400).send('<h2>Error: Debe enviar a y b numéricos</h2>');
  }

  let resultado;
  let simbolo;
  switch (op) {
    case 'sumar':
      resultado = a + b;
      simbolo = '+';
      break;
    case 'restar':
      resultado = a - b;
      simbolo = '-';
      break;
    case 'multiplicar':
      resultado = a * b;
      simbolo = '×';
      break;
    case 'dividir':
      if (b === 0) return res.status(400).send('<h2>Error: No se puede dividir por cero</h2>');
      resultado = a / b;
      simbolo = '÷';
      break;
    default:
      return res.status(400).send('<h2>Error: Operación no válida</h2>');
  }

  // Si la petición es JSON, responde JSON
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    return res.json({ resultado });
  }

  // Si viene de formulario, responde HTML bonito
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resultado de la Operación</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f0f4f8; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .result-container { background: #fff; padding: 2rem 2.5rem; border-radius: 12px; box-shadow: 0 2px 12px #0001; text-align: center; }
        h2 { color: #2a4365; }
        a { display: inline-block; margin-top: 1rem; color: #2b6cb0; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="result-container">
        <h2>Resultado</h2>
        <p><strong>${a} ${simbolo} ${b} = ${resultado}</strong></p>
        <a href="/suma">Volver a calcular</a>
      </div>
    </body>
    </html>
  `);
});

// Middleware de autenticación básica para /admin
app.use('/admin', (req, res, next) => {
  if (req.headers.authorization === '123') {
    next();
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
});

app.get('/admin', (req, res) => {
  res.send('Bienvenido al área de administración');
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error en la consulta' });
    }
    res.json(results);
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 

// src/app.js
// ... (código existente)

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir carpeta 'public' - AÑADIDO PARA EJERCICIO 7 [cite: 240]
app.use(express.static('public'));

// Array en memoria para contactos
const contactos = []; // [cite: 242]

// ... (middleware de logging)

// Ruta para mostrar la lista de contactos [cite: 247]
app.get('/contactos', (req, res) => {
  res.json(contactos);
});

// Ruta para procesar el formulario de contacto [cite: 241]
app.post('/contacto', (req, res) => {
  const { nombre, email } = req.body;
  // Validación simple de email [cite: 242]
  if (!email || !email.includes('@')) {
    return res.status(400).send('Email no válido');
  }
  contactos.push({ nombre, email }); // [cite: 242]
  res.send('<h2>Contacto recibido. Gracias!</h2><a href="/contacto.html">Volver</a>');
});

// ... (resto de las rutas y configuraciones)