const UserResponse = require('../models/userResponse');

exports.saveUserResponse = async (req, res) => {
  try {
    const { responses } = req.body; // Esperamos que 'responses' sea un array de respuestas

    // Aquí puedes guardar las respuestas en tu base de datos
    await UserResponse.bulkCreate(responses); // Usa bulkCreate si estás insertando múltiples registros

    res.status(200).json({ message: 'Respuestas guardadas exitosamente' });
  } catch (error) {
    console.error('Error al guardar respuestas:', error);
    res.status(500).json({ error: 'Error al guardar respuestas' });
  }
};
