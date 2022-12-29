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

//Food route
describe('REST route tests', () => {
  beforeEach(() => sequelize.sync());

  test('Gets all food items', async() => {
    const response = await request.get('/food');
    expect(response.statusCode).toBe(200);
  });
  
})