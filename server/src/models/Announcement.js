const { Model, DataTypes } = require('sequelize');

class Announcement extends Model {}

const setupAnnouncementModel = (sequelize) => {
  Announcement.init(
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
      modelName: 'Announcement'
    }
  );
  return Announcement;
};

module.exports = { setupAnnouncementModel, Announcement };
