const { Model, DataTypes } = require('sequelize');

class User extends Model {}

const setupUserModel = (sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};

module.exports = { setupUserModel, User };
