// Controlador de ejemplo
exports.getEjemplo = (req, res) => {
 res.json({ mensaje: 'Esta es una respuesta GET de ejemplo' });
};
exports.createEjemplo = (req, res) => {
 const { dato } = req.body;
 res.json({ mensaje: 'Dato recibido', dato });
}; 