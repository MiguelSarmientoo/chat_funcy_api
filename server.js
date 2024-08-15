const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/user');
const openaiRouter = require('./routes/openai');
const sequelize = require('./config/database'); // Importa la configuración de Sequelize
const { User, Message } = require('./models');  // Importa los modelos

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', messagesRouter);
app.use('/api', usersRouter);
app.use('/api', openaiRouter);

// Sincroniza los modelos con la base de datos
sequelize.sync({ force: false })  // Cambia force a true si quieres recrear las tablas en cada inicio
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
