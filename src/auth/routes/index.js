const express = require("express");
const base64 = require("base-64");

const { User } = require("../models");

const authRoutes = express();

//Create signup and signin routes

// Using an HTTP REST client or a web form:
// Make a POST request to the/signup route with username and password.
// Your server should support both JSON and FORM data as input.
// On a successful account creation, return a 201 status with the user object in the body.
// On any error, trigger your error handler with an appropriate error.

authRoutes.post("/signup", signup);

authRoutes.post("/signin", signin);

async function signup(req, res, next) {
  const { username, password } = req.body;
  await User.createWithHashed(username, password);
  res.send(201);
}

async function signin(req, res, next) {
  let authorization = req.header("Authorization");
  if (!authorization.startsWith("Basic ")) {
    next(new Error("Invalid authorization"));
    return;
  }
  authorization = base64.decode(authorization.replace("Basic ", ""));

  console.log("Basic authorization request", authorization);

  const [username, password] = authorization.split(":");
  let user = await User.findLoggedIn(username, password);
  if (user) {
    res.status(200).send({ username: user.username });
  } else {
    next(new Error("Invalid login"));
  }
}

module.exports = { authRoutes };
