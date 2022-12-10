const { Sequelize, Model, DataTypes} = require('sequelize');

//url that describes a db connection
//path is :memory:
//make a new db and keep it in memory

//define new datatype 

function makeUser(sequelize) {
  return sequelize.define('User', {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
  });
}

async function main() {
  await sequelize.sync();

}

module.exports = {
  User,
};