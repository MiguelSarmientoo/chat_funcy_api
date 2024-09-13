const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const messagesRouter = require('./routes/messages');
const usersRouter = require('./routes/user');
const openaiRouter = require('./routes/openai');
const activityRouter = require('./routes/activity'); // Importa el nuevo router de actividades
const sequelize = require('./config/database'); // Importa la configuración de Sequelize
const maintanceRouter = require('./routes/maintance');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS (opcional)
const corsOptions = {
  origin: 'http://localhost:51185', // Asegúrate de que esto sea el origen correcto de tu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Permite encabezados de autenticación y cookies
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Usa las opciones de CORS
app.use(bodyParser.json());
app.use('/api', messagesRouter);
app.use('/api', usersRouter);
app.use('/api', openaiRouter);
app.use('/api', activityRouter);
app.use('/api/v1/maintance', maintanceRouter);

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
