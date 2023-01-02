const express = require("express");
const base64 = require("base-64");

const { User } = require('../models');

const authRoutes = express();

//Create signup and signin routes
// Make a POST request to the/signup route with username and password.

authRoutes.use(express.json());
authRoutes.post('/signup', signup);

authRoutes.post('/signin', signin);

async function signup(req, res, next) {
  const { username, password } = req.body;
  let auth = `${username}:${password}`;
  let encoded_auth = 'Basic ' + base64.encode(auth);
  console.log('Encoded auth', encoded_auth);
  const user = await User.createWithHashed(username, password);
  // On a successful account creation, return a 201 status with the user object in the body.
  res.status(201).json(user);
}

async function signin(req, res, next) {
  let authorization = req.header('Authorization');
  if (!authorization.startsWith('Basic ')) {
    // On any error, trigger your error handler with an appropriate error.
    next(new Error('Invalid authorization scheme'));
    return;
  }
  authorization = base64.decode(authorization.replace('Basic ', ''));

  console.log('Basic authorization request', authorization);

  const [username, password] = authorization.split(':');
  let user = await User.findLoggedIn(username, password);
  if (user) {
    res.status(200).send({ username: user.username });
  } else {
    next(new Error('Invalid login'));
  }
}

module.exports = { authRoutes };
