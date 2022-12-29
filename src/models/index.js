const { Sequelize } = require('sequelize');
const { makeFood } = require('./food-model');
const { makeSaucey } = require('./saucey-model');

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

const Food = makeFood(sequelize);
const Sauce = makeSaucey(sequelize);

Food.hasMany(Sauce);
// Sauce.belongsTo(Food);

module.exports = {
  sequelize,
  Food,
  Sauce
};