const express = require('express');

const foodRoute = express();

const { Food, Sauce } = require('../models/index');


// RESTful Route Declarations

foodRoute.get('/food', getFoods); //Retrieve all
foodRoute.get('/food/:id', getFood); //Retrieve one
foodRoute.post('/food', createFood); //Create
foodRoute.put('/food/:id', updateFood); //Update
foodRoute.delete('/food/:id', deleteFood); //Delete

async function getFoods(req, res ) {
  const allFood = await Food.findAll();
  res.json(allFood);
}

async function getFood(req, res, next) {
const id = req.params.id;
const food = await Food.findOne(
{where: {id: id},
include: Sauce,
});
  if (food === null) {
    //lets 404 handler deal with missing user
    next();
  } else {
    const rawFood = {
      id: food.id,
      foodType: food.foodType,
      sauceType: sauce.sauceType,
      sauce: food.Sauce.map((sauce) => sauce.sauceType),
    }
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

  const sauce = req.body.sauce ?? [];
  for (const name of sauce) {
    await food.createSauce({ sauceType });
  }
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