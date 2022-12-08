function validator(req, res, next) {
  // server.get('/person', (req, res ) => {
    if (req.query.name) {
      res.status(200).send({ name: req.query.name });
    } else {
      res.status(500).send();
    }
}


module.exports = validator;