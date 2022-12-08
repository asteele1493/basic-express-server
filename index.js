const { config } = require('dotenv');
const server = require('./src/server.js');

config();

server.listen(process.ENV.PORT || 3001);