// src/routes/api.js
// ... (código existente)
const tareasController = require('../controllers/tareasController');

// ... (otras rutas)

// Rutas para el Ejercicio 5: API REST para Tareas [cite: 217]
router.post('/tareas', tareasController.crearTarea);
router.get('/tareas', tareasController.listarTareas);
router.get('/tareas/:id', tareasController.obtenerTarea);
router.put('/tareas/:id', tareasController.actualizarTarea);
router.delete('/tareas/:id', tareasController.eliminarTarea);

module.exports = router;

// src/routes/api.js
// ... (código existente)
const productosController = require('../controllers/productosController');

// ... (otras rutas)

// Rutas para el Ejercicio 6: Integración con BD (MySQL) 
router.post('/productos', productosController.crearProducto);
router.get('/productos', productosController.listarProductos);
router.patch('/productos/:id', productosController.actualizarProducto);

module.exports = router;

// src/routes/api.js
// ... (código existente)
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// ... (otras rutas)

// Rutas para el Ejercicio 8: Autenticación JWT 
router.post('/login', authController.login);
router.get('/perfil', authMiddleware, authController.getPerfil); // [cite: 254]

module.exports = router;