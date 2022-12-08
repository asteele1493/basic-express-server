const { config } = require('dotenv');
const { start } = require('./src/server.js');


config();
start();

