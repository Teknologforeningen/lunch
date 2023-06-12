const { Model, DataTypes } = require('sequelize');

class Message extends Model {}

const setupMessageModel = (sequelize) => {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
    }, {
      sequelize,
      modelName: 'Message'
    }
  );
  return Message;
};

module.exports = { setupMessageModel, Message };
