const express = require('express');
const server = express();
// const { User } = require('./routes/user-route');
const PORT = process.env.PORT;
const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');

const logger = require('./middleware/logger');
const validator = require('./middleware/validator');


server.get('/home', logger, (_, res) => res.status(200).send('Welcome home!'));

// server.use(json());

// server.use(User);

server.get('/person', validator, (req, res ) => {
  res.status(200).send({ name : req.name });
});


server.use('*', notFound);

server.use(serverError);

function start () {
  server.listen(PORT || 3002, () => {
    console.log(`Listening on ${PORT}`);
  });
}

module.exports = { server, start };