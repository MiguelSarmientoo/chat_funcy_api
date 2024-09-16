const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserResponse extends Model {}

UserResponse.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  age_range_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'age_ranges',
      key: 'id'
    }
  },
  hierarchical_level_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hierarchical_levels',
      key: 'id'
    }
  },
  responsability_level_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'responsabilities',
      key: 'id'
    }
  },
  gender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'genders',
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'UserResponse',
  tableName: 'user_responses',
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = UserResponse;
