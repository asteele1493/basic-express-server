const server = require('./server');
const supertest = require('supertest');
const { default: expect } = require('expect');

const request = supertest(server);


describe('Person route', () => {

  test('When query string present, output JSON to the client with this shape: { name: "name provided" }', async () => {
    const response = await request.get('/person?name=Andra');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ name: 'Andra' });
  });
  test.todo('Without a name in the query string, force a "500" error');
})

test('Without a name in the query string, force a "500" error', async () => {
  const response = await request.get('/person');
  expect(response.statusCode).toBe(500);
});