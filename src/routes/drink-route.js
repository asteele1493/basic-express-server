const {express} = require('express');

const Drink = require('../models/drink-model');

const drinkRoute = express();

// RESTful Route Declarations

drinkRoutes.get('/drink', getDrink); //Retrieve all
drinkRoutes.get('/drink/:id', getDrink); //Retrieve one
drinkRoutes.post('/drink', createDrink); //Create
drinkRoutes.put('/drink/:id', updateDrink); //Update
drinkRoutes.delete('/drink/:id', deleteDrink); //Delete

async function getDrinks(req, res ) {
  const allDrink = await Drink.findAll();
  res.json(allDrink);
}

async function getDrink(req, res, next) {
const id = req.params.id;
const drink = await drink.findOne({where: {id: id}});
  if (drink === null) {
    //lets 404 handler deal with missing user
    next();
  }
  res.json(drink);
}

async function createDrink(req, res) {
  const drinkType = req.body.drinkType;
  const quantity = req.body.quantity;
  const drink = await Drink.create({
    drinkType,
    quantity,
  });
  res.json(drink);
}

async function deleteDrink(req, res, next) {
  const id = req.params.id;
  const drink = await Drink.findOne({where: {id: id}});
    if (drink === null) {
      //lets 404 handler deal with missing user
      next();
    } else{
    await drink.destroy();
    res.send({});
  }}

async function updateDrink (req, res) {
  const id = req.params.id;
  let drink = await Drink.findOne({where: {id: id}});
  if(drink === null){
    next();
  } else{
    const drinkType = req.body.drinkType ?? drink.drinkType;
    const quantity = req.body.quantity ?? drink.quantity;
    drink.drinkType = drinkType;
    drink.quantity = quantity;
    drink = await drink.update();
    res.json(drink);
  }
}


module.exports = { drinkRoute }