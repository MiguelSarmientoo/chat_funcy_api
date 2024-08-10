// controllers/userController.js
const { User } = require('../models');

async function getUserByUsernameAndPassword(username, password) {
  try {
    const user = await User.findOne({ where: { username, password } });
    return user;
  } catch (error) {
    throw error;
  }
}

async function createUser(req, res) {
  const { username, password, email } = req.body;

  try {
    const user = await User.create({
      username,
      password,
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
  getUserByUsernameAndPassword,
  createUser,
  getAllUsers
};
