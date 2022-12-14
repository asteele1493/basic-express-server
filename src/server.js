const express = require('express');
const server = express();
const { foodRoute } = require('./routes/food-route');
const { drinkRoute } = require('./routes/drink-route');
const PORT = process.env.PORT;
const notFound = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const { sequelize } = require('./models');
const { authRoutes } = require('./auth');

const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const { checkToken } = require('./auth/routes');


server.get('/home', logger, (_, res) => res.status(200).send('Welcome home!'));

server.use(express.json());

server.use(authRoutes);

// server.use(User);

server.get('/person', validator, (req, res ) => {
  res.status(200).send({ name : req.name });
});

server.get('/loggedin', checkToken, (req, res) => {
  res.status(200).send('You are logged in, ' + req.username + '!');
})


server.use(foodRoute);

server.use(drinkRoute);

server.use('*', notFound);

server.use(serverError);

function start () {
  server.listen(PORT || 3002, async () => {
    await sequelize.sync();
    console.log(`Listening on ${PORT}`);
  });
}

module.exports = { server, start };