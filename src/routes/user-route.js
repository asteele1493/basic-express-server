const {express} = require('express');

const User = require('../models/user-model')

const userRoutes = express();

// RESTful Route Declarations

userRoutes.get('/user', getUsers); //Retrieve all
userRoutes.get('/user/:id', getUser); //Retrieve one
userRoutes.post('/user', createUser); //Create
userRoutes.put('/user/:id', updateUser); //Update
userRoutes.delete('/user/:id', deleteUser); //Delete

async function getUsers(req, res ) {
  const allUsers = await User.findAll();
  res.json(allUsers);
}

async function getUser(req, res, next) {
const id = req.params.id;
const user = await user.findOne({where: {id: id}});
  if (user === null) {
    //lets 404 handler deal with missing user
    next();
  }
  res.json(user);
}

async function createUser(req, res) {
  const username = req.body.username;
  //this requires birthday to be YYYY-MM-DD
  const birthday = Date.parse(req.body.birthday);
  const user = await User.create({
    username,
    birthday,
  });
  res.json(user);
}

async function deleteUser(req, res, next) {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
    if (user === null) {
      //lets 404 handler deal with missing user
      next();
    } else{
    await user.destroy();
    res.send({});
  }}

async function updateUser (req, res) {
  const id = req.params.id;
  let user = await User.findOne({where: {id: id}});
  if(user === null){
    next();
  } else{
    const username = req.body.username ?? user.user;
    const birthday = Date.parse(req.body.birthday ?? user.birthday.toISOString());
    user.username = username;
    user.birthday = birthday;
    user = await user.update();
    res.json(user);
  }
}


module.exports = {
  userRoutes,
}