const { Sequelize } = require('sequelize');
const { foodRoute, drinkRoute } = require('../routes');

const DATABASE_URL =
  process.env.NODE_ENV === 'test'
    ? 'sqlite::memory:'
    : process.env.DATABASE_URL;

const CONNECTION_OPTIONS =
  process.env.NODE_ENV === 'test'
    ? {}
    : {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };

const sequelize = new Sequelize(DATABASE_URL, CONNECTION_OPTIONS);

const Food = foodRoute(sequelize);
const Drink = drinkRoute(sequelize);

module.exports = {
  sequelize,
  Food,
  Drink
};