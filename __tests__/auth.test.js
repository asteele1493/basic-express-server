const { sequelize } = require('../src/auth/models/index');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);

//need to create a user in order to test post request
// To test signin, your tests actually need to create a user first, then try and login. i.e. The signin test will rely on the success of the signup test.

const createUser = async () => {
  return await (await request.post('/signup')).send({ 
    username: 'username',
    password: 'password',
  });
};

describe('Authorization Model testing', () => {
  beforeEach(() => sequelize.sync());
  afterEach(() => sequelize.drop());

// POST to /signup to create a new user.
  test('Can create a user and send to /signup endpoint', async () => {
    const response = await createUser();
    expect(response.status).toBe(201);
    expect(response.body).toEqual( { username: 'username' } );
  });
  
  // POST to /signin to login as a user (use basic auth).
  test.skip('Can login as a user using the /signin endpoint', async () => {
    await request.post('/signup').send({
      username: 'username',
      password: 'password'
    });
    const response = await request.post('/signin')

    expect(response.body).toBe(200);
  })
  
  })
