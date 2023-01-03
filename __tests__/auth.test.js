const { sequelize } = require('../src/models');
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);
const jwt = require('jsonwebtoken');
const signin = require('../src/auth/routes/index');
const { User } = require('../src/auth/models/user');
const base64 = require('base-64');

//need to create a user in order to test post request
// To test signin, your tests actually need to create a user first, then try and login. i.e. The signin test will rely on the success of the signup test.

const createUser = async () => {
  return await (await request.post('/signup')).send({ 
    username: 'username',
    password: 'password',
  });
};


// BASIC AUTHORIZATION TESTING
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


  //BEARER AUTHORIZATION TESTING
  describe('Bearer authorization testing', () => {
    //sync the database
    beforeEach(() => sequelize.sync());
    afterEach(() => sequelize.drop()); 

    it('returns a web token for a sign in route', async () => {
      //create a user to login with
      await User.createWithHashed('username', 'password');

      //action
      //create mock header function
      const request = {header: jest.fn().mockImplementation((header) => {
        if (header === "Authorization"){
          return "Basic ";
        }
        return "";
      })};
      const response = {send: jest.fn() };
      const next = jest.fn();
     await signin(request, response, next);

      //assert
      response.send.mock;
      const token = response.send.mock.lastCall[0];
      const [header, payloadBase64, signature] = token.split('.');
      const payload = JSON.parse(base64.decode(payloadBase64));
      console.log(token);
      expect(payload.username).toBe('username');
    });
  });