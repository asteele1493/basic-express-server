const { DataTypes} = require('sequelize');

//As a former chef, I love sauces to eat with the appropriate foods. This model will correspond to the food model

function makeSaucey(sequelize) {
  return sequelize.define('Sauce', {
    sauceType: DataTypes.STRING,
    temp: DataTypes.BOOLEAN
  });
}

module.exports = { makeSaucey }
