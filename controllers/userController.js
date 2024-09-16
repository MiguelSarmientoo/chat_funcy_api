//userController.js
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña con bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token y el ID del usuario
    res.status(200).json({ message: 'Login exitoso', token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async function createUser(req, res) {
  const { username, password, email } = req.body;

  try {
    // Encriptar la contraseña con bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword, // Guardar la contraseña encriptada
      email,
      created_at: new Date()
    });

    res.status(200).json({ message: 'Usuario creado correctamente.', data: user });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

module.exports = {
  login,
  createUser,
  getAllUsers,
};
