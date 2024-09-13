const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { verifyToken } = require('../middleware/authMiddleware');
const { verifyToken } = require('../utils/authMiddleware'); // Importamos el middleware de autenticación

router.post('/login', userController.login); // Usamos el controlador login
router.post('/crearUsuario', userController.createUser);
router.get('/users', verifyToken, userController.getAllUsers); // Esta ruta está protegida por el middleware de token

module.exports = router;
