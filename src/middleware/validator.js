function validator(req, res, next) {
  // server.get('/person', (req, res ) => {
    if (req.query.name) {
      req.name = req.query.name;
      next();
    } else {
      next('Could not validate because there was no name in query!');
    }
}


module.exports = validator;