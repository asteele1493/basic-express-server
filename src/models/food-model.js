const { DataTypes } = require('sequelize');

//url that describes a db connection
//path is :memory:
//make a new db and keep it in memory

//define new datatype 

function makeFood(sequelize) {
  return sequelize.define('Food', {
    foodType: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  });
}

module.exports = { makeFood }
