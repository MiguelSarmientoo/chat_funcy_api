// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/user');
const openaiRouter = require('./routes/openai');
const activityRouter = require('./routes/activity');
const sequelize = require('./config/database'); // Importa la configuración de Sequelize
const maintanceRouter = require('./routes/maintance');
const userResponsesRouter = require('./routes/userResponses'); // Importa el router de userResponses

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Rutas de la API
app.use('/api', messagesRouter);
app.use('/api', usersRouter);
app.use('/api', openaiRouter);
app.use('/api', activityRouter);
app.use('/api/v1/maintance', maintanceRouter);
app.use('/api', userResponsesRouter); // Añade esta línea para userResponses

// Sincroniza los modelos con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch((err) => {
    console.error('Error al sincronizar la base de datos:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
