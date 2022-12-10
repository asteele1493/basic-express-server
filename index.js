const { config } = require('dotenv');
const { start } = require('./src/server.js');
const { sequelize } = require('sequelize');
const {makeUser } = require('./user.model');

const DATABASE_URL = process.env.NODE_ENV === 'test' 
? 'sqlite::memory:'
: process.env.DATABASE_URL;


const sequelize = new Sequelize('sqlite::memory:');

const Food = makeFood(sequelize);

config();
start();

module.exports = {
  User,
  // Food,
}