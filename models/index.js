const User = require('./user');
const Message = require('./message');

User.hasMany(Message, { foreignKey: 'user_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  User,
  Message,
};
