const logger = require('../src/middleware/logger');

// const supertest = require('supertest');
// const request = supertest(logger);
// const { default: expect } = require('expect');


// describe('logger route', () => {
//   test.todo('When the path /person is present, should log a person', async () => {
//     const response = await request.get('/person');
//     expect(console.log(response)).toBe('person');
//   })
// })

//The code above is what I had originally written for testing, but it wasn't passing. Ethan had showed us his code using mocks during code review, listed below. Still working on getting the initial code up and running.

describe('Logger Test', () => {
  let consoleLog;
  let req = {path: '/person'};
  let res = {};
  let next = jest.fn();
  beforeEach(() => {
    consoleLog = jest.spyOn(console, 'log').mockImplementation()
  })
  afterEach(() => {
    consoleLog.mockRestore()
  })
  it('logs', () => {
    logger(req, res, next)
    expect(consoleLog).toHaveBeenCalledWith(req.path);
  })
  it('calls next', async () => {
    logger(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})