const { Model, DataTypes } = require('sequelize');

class Price extends Model {}

const setupPriceModel = (sequelize) => {
  Price.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      description: {
        type: DataTypes.STRING,
      },
      priceStudent: {
        type: DataTypes.FLOAT,
      },
      priceNormal: {
        type: DataTypes.FLOAT,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
    }, {
      sequelize,
      modelName: 'Price'
    }
  );
  return Price;
};

module.exports = { setupPriceModel, Price };
