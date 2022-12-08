const server = require('server');


function serverError ()  {
server.use((err, req, res, next) => {
  res.status(500).send({ message : 'There was a problem!', err});
  });
}

  module.exports = serverError;