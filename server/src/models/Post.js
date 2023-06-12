const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

const setupPostModel = (sequelize) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      contentType: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.BLOB('long'),
      }, 
      language: {
        type: DataTypes.STRING,
        allowNull: false
      }, 
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }, 
    }, {
      sequelize,
      modelName: 'Post'
    }
  );
  return Post;
};

module.exports = { setupPostModel, Post };
