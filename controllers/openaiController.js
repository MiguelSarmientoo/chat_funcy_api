const axios = require('axios');
require('dotenv').config();

const { Message } = require('../models');
const { Op } = require('sequelize');

const countTokens = (text) => {
  return text.split(' ').length; // Estimación simple, no exacta
};

const getBotResponse = async (prompt, userId) => {
  const apiKey = process.env.OPENAI_API_KEY; 
  const url = 'https://api.openai.com/v1/chat/completions';
  const MAX_TOKENS = 100; // Máximo de tokens para la respuesta

  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt');
  }

  try {
    // Obtener historial de mensajes del usuario
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { user_id: userId, user_id_receptor: 1 },
          { user_id: 1, user_id_receptor: userId }
        ]
      },
      order: [['created_at', 'ASC']]
    });

    // Convertir historial de mensajes a formato adecuado para OpenAI
    const chatHistory = messages.map(msg => ({
      role: msg.user_id === userId ? 'user' : 'assistant',
      content: msg.content
    }));

    // Agregar el prompt actual al historial
    chatHistory.push({ role: 'user', content: prompt });

    // Configurar el mensaje del sistema

    const systemMessage = {
      role: 'system',
      content: `
        Tu nombre es Funcy. Eres un asistente de IA diseñado para actuar como un psicólogo competente y profesional, que ayuda a reducir el estrés de los empleados. 

        Si un usuario menciona o pregunta sobre estrés laboral, debes recomendar el siguiente recurso:

        - **Video sobre cómo manejar el estrés laboral**: Este video ofrece consejos prácticos para gestionar el estrés en el entorno laboral. [Ver video aquí] https://www.youtube.com/watch?v=64QIUMqVVaI

        Actúas como un amigo comprensivo y te expresas con caridad y optimismo. Tu propósito es ayudar a los usuarios a sentirse mejor y a manejar sus emociones de manera efectiva.
      `
    };

    // Limitar el historial para no exceder el límite de tokens
    let totalTokens = countTokens(systemMessage.content);
    const limitedChatHistory = [];

    for (let i = chatHistory.length - 1; i >= 0; i--) {
      const messageTokens = countTokens(chatHistory[i].content);
      if (totalTokens + messageTokens + MAX_TOKENS <= 4096) { // Incluye margen para la respuesta
        limitedChatHistory.unshift(chatHistory[i]);
        totalTokens += messageTokens;
      } else {
        break;
      }
    }

    // Mensaje de éxito para la lectura del historial
    console.log('Historial leído correctamente:', limitedChatHistory);

    // Enviar todo el historial limitado y el mensaje del sistema en una sola solicitud
    const response = await axios.post(
      url,
      {
        model: 'gpt-3.5-turbo',
        messages: [systemMessage, ...limitedChatHistory],
        max_tokens: 100,
        temperature: 0.3,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error al obtener respuesta del bot:', error.response?.data || error.message);
    throw new Error(`Error al obtener respuesta del bot: ${error.response?.data?.error?.message || error.message}`);
  }
};

module.exports = { getBotResponse };
