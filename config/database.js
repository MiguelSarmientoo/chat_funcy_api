// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('chat_app', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// module.exports = sequelize;


const { Sequelize } = require('sequelize');
require('dotenv').config();  // Asegúrate de cargar las variables de entorno

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,    // Nombre de la base de datos
  process.env.MYSQL_USER,        // Usuario de la base de datos
  process.env.MYSQL_PASSWORD,    // Contraseña de la base de datos
  {
    host: process.env.MYSQL_HOST, // Host de la base de datos
    dialect: 'mysql',            // Dialecto de la base de datos
    port: process.env.MYSQL_PORT  // Puerto de la base de datos
  }
);

module.exports = sequelize;
