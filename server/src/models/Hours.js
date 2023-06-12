const { Model, DataTypes } = require('sequelize');

class Hours extends Model {}

const setupHoursModel = (sequelize) => {
  Hours.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      hours: {
        type: DataTypes.STRING,
        allowNull: false
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
    }, {
      sequelize,
      modelName: 'Hours'
    }
  );
  return Hours;
};

module.exports = { setupHoursModel, Hours };
