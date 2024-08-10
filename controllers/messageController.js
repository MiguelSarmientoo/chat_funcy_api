const { Message } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment-timezone');

const timeZone = 'America/Lima'; // Zona horaria de Perú

async function saveMessage(req, res) {
  const { content, userId } = req.body;
  const localDate = moment.tz(new Date(), timeZone); // Obtener la hora actual en la zona horaria local
  try {
    const message = await Message.create({
      content,
      user_id: userId,
      user_id_receptor: 1, // O el valor adecuado según tu lógica
      created_at: localDate.toDate() // Convertir el objeto moment a una fecha JavaScript
    });

    res.status(201).json({ message: 'Mensaje guardado correctamente.', data: message });
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

async function saveMessageFromBot(req, res) {
  const { content, userId } = req.body;
  const localDate = moment.tz(new Date(), timeZone); // Obtener la hora actual en la zona horaria local
  try {
    const message = await Message.create({
      content,
      user_id: 1, // El bot
      user_id_receptor: userId,
      created_at: localDate.toDate() // Convertir el objeto moment a una fecha JavaScript
    });

    res.status(201).json({ message: 'Mensaje guardado correctamente.', data: message });
  } catch (error) {
    console.error('Error al guardar el mensaje del bot:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

const getFilteredMessages = async (req, res) => {
  const userId = parseInt(req.query.userId); // Obtiene userId del query params
  console.log('userId recibido:', userId); // Imprime el valor de userId en la terminal

  try {
    if (isNaN(userId)) {
      return res.status(400).json({ error: 'userId debe ser un número válido.' });
    }

    // Consulta para filtrar los mensajes
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { user_id: userId, user_id_receptor: 1 }, // Mensajes enviados por userId y recibidos por user_id_receptor = 1
          { user_id: 1, user_id_receptor: userId }  // Mensajes enviados por user_id = 1 y recibidos por user_id_receptor = userId
        ]
      }
    });

    // Convertir las fechas UTC a la zona horaria de Lima
    const messagesWithLocalTime = messages.map(message => {
      const utcDate = moment.utc(message.created_at); // Crear un objeto moment en UTC
      const zonedDate = utcDate.tz(timeZone); // Convertir a zona horaria local
      return {
        ...message.toJSON(),
        created_at: zonedDate.format('YYYY-MM-DD HH:mm:ss') // Formatear la fecha
      };
    });

    res.status(200).json(messagesWithLocalTime);
  } catch (error) {
    console.error('Error fetching filtered messages:', error);
    res.status(500).json({ error: 'Error fetching filtered messages' });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
}

module.exports = {
  saveMessage,
  getAllMessages,
  getFilteredMessages,
  saveMessageFromBot
};
