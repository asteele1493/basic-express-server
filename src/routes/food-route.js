const {express} = require('express');

const Food = require('../models/food-model');

const foodRoute = express();

// RESTful Route Declarations

foodRoutes.get('/food', getFood); //Retrieve all
foodRoutes.get('/food/:id', getFood); //Retrieve one
foodRoutes.post('/food', createFood); //Create
foodRoutes.put('/food/:id', updateFood); //Update
foodRoutes.delete('/food/:id', deleteFood); //Delete

async function getFoods(req, res ) {
  const allFood = await Food.findAll();
  res.json(allFood);
}

async function getFood(req, res, next) {
const id = req.params.id;
const food = await food.findOne({where: {id: id}});
  if (food === null) {
    //lets 404 handler deal with missing user
    next();
  }
  res.json(food);
}

async function createFood(req, res) {
  const foodType = req.body.foodType;
  const quantity = req.body.quantity;
  const food = await Food.create({
    foodType,
    quantity,
  });
  res.json(food);
}

async function deleteFood(req, res, next) {
  const id = req.params.id;
  const food = await Food.findOne({where: {id: id}});
    if (food === null) {
      //lets 404 handler deal with missing user
      next();
    } else{
    await food.destroy();
    res.send({});
  }}

async function updateFood (req, res) {
  const id = req.params.id;
  let food = await Food.findOne({where: {id: id}});
  if(food === null){
    next();
  } else{
    const foodType = req.body.foodType ?? food.foodType;
    const quantity = req.body.quantity ?? food.quantity;
    food.foodType = foodType;
    food.quantity = quantity;
    food = await food.update();
    res.json(food);
  }
}


module.exports = {
  foodRoute,
}