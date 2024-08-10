// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userController.getUserByUsernameAndPassword(username, password);

    if (user) {
      res.status(200).json({ message: 'Login exitoso', user });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/crearUsuario', userController.createUser);
router.get('/users', userController.getAllUsers);

module.exports = router;
