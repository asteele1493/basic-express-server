const express = require('express');
const server = express();
const PORT = process.env.PORT;
const notFound = require('./error-handlers/404');

const logger = require('./middleware/logger');
const validator = require('./middleware/validator');


server.get('/home', (_, res) => res.send('Welcome home!'));

server.get('/person', (req, res ) => {
  validator;
});

server.use(logger);

server.use('*', notFound);

function start () {
  server.listen(PORT || 3002, () => {
    console.log(`Listening on ${PORT}`);
  });
}

module.exports = { server, start };