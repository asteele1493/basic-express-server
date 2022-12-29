const { server } = require('../src/server');
const supertest = require('supertest');
const { sequelize } = require('../src/models');
const request = supertest(server);

describe('Person Route', () => {
  test('When query string present, output JSON to the client with this shape: { name: "name provided" }', async () => {
    const response = await request.get('/person?name=Gandalf');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Gandalf' });
  });

  test('When query string present with a different name, output JSON to the client with this shape: { name: "name provided" }', async () => {
    const response = await request.get('/person?name=Frodo');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Frodo' });
  });

  test('Without a name in the query string, force a “500” error', async () => {
    const response = await request.get('/person');
    expect(response.statusCode).toBe(500);
  });
});

//REST route tests

describe('Food route tests', () => {
  beforeEach(() => sequelize.sync());

  test('Gets all food items', async() => {
    const response = await request.get('/food');
    expect(response.statusCode).toBe(200);
    const food = response.body[0];
    expect(food.foodType).toEqual('noodles');
  });

  test('Gets one food item', async() => {
    const response = await request.get('/food/4');
    expect(response.statusCode).toBe(200);
    const food = response.body;
    expect(food.foodType).toEqual('yakitori');
    expect(food.quantity).toEqual(7);
  });

  test('Creates a new food item', async() => {
    const response = await request.post('/food').send({
      foodType: 'french fries',
      quantity: 3,
     });
    expect(response.statusCode).toBe(200);
    const id = response.body.id;
    const food = await request.get(`/food/${id}`);
    expect(food.statusCode).toBe(200);
    expect(food.body.foodType).toEqual('french fries');
  });

  test('Creates a new food item with sauces', async() => {
    const response = await request.post('/food').send({
      foodType: 'french fries',
      quantity: 3,
      sauceType: 'ketchup',
     });
    expect(response.statusCode).toBe(200);
    const id = response.body.id;
    const food = await request.get(`/food/${id}`);
    expect(food.statusCode).toBe(200);
    expect(food.body.foodType).toEqual('french fries');
    expect(food.body.sauceType).toEquel('ketchup');
  });

  test('Updates an existing food item', async() => {
    const response = await request.put('/food/2').send({
      foodType: 'soba',
    });
    expect(response.statusCode).toBe(200);
    const food = response.body;
    expect(food.foodType).toEqual('soba');
    expect(food.quantity).toEqual(4);
  });

  test('Deletes an existing food item', async() => {
    await request.delete('food/2');
    const response = await request.get('/food');
    expect(response.body[1].foodType).toEqual('noodles');
  });
  
});

describe('Drink route tests', () => {
  beforeEach(() => sequelize.sync());

  test('Gets all drink items', async() => {
    const response = await request.get('/drink');
    expect(response.statusCode).toBe(200);
    const drink = response.body[0];
    expect(drink.drinkType).toEqual('topo chico');
  });

  test('Gets one drink item', async() => {
    const response = await request.get('/drink/2');
    expect(response.statusCode).toBe(200);
    const drink = response.body;
    expect(drink.drinkType).toEqual('negroni sbagliato');
    expect(drink.quantity).toEqual(12);
  });

  test('Creates a new drink item', async() => {
    const response = await request.post('/drink').send({
      drinkType: 'coke',
      quantity: 5,
     });
    expect(response.statusCode).toBe(200);
    const id = response.body.id;
    const drink = await request.get(`/drink/${id}`);
    expect(drink.statusCode).toBe(200);
    expect(drink.body.drinkType).toEqual('coke');
  });

  test('Updates an existing drink item', async() => {
    const response = await request.put('/drink/2').send({
      drinkType: 'negroni classico',
      quantity: 4,
    });
    expect(response.statusCode).toBe(200);
    const drink = response.body;
    expect(drink.drinkType).toEqual('negroni classico');
    expect(drink.quantity).toEqual(4);
  });

  test('Deletes an existing drink item', async() => {
    await request.delete('drink/2');
    const response = await request.get('/drink');
    expect(response.body[0].drinkType).toEqual('topo chico');
  });
});