const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia si tienes otro usuario
  password: '', // Cambia si tienes contraseña
  database: 'proyecto_backend'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = connection; 