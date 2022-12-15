const { DataTypes} = require('sequelize');

//url that describes a db connection
//path is :memory:
//make a new db and keep it in memory

//define new datatype 

function makeDrink(sequelize) {
  return sequelize.define('Drink', {
    drinkType: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  });
}

module.exports = { makeDrink }