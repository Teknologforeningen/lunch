const { Sequelize } = require('sequelize');
const { setupAnnouncementModel } = require('./Announcement');
const { setupHoursModel } = require('./Hours');
const { setupMessageModel } = require('./Message');
const { setupPostModel } = require('./Post');
const { setupPriceModel } = require('./Price');
const { setupUserModel } = require('./User');

const setupDatabase = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME || 'lunch', 
    process.env.DB_USER || 'lunch', 
    process.env.DB_PW || 'lunch', 
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      logging: false,
    }
  );
    
  sequelize.authenticate().then(() => {
    console.log('Connected to lunch db');
  }).catch((error) => {
    console.log(`Error connceting to db: ${error}`);
  });

  setupAnnouncementModel(sequelize);
  setupHoursModel(sequelize);
  setupMessageModel(sequelize);
  setupPostModel(sequelize);
  setupPriceModel(sequelize);
  setupUserModel(sequelize);

  sequelize.sync();
};

module.exports = setupDatabase;