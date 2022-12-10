const validator = require('../src/middleware/validator');


describe('Validator', () => {
  test('With name gandalf', () => {
    const req = { query: { name: 'Gandalf' } };
    const next = jest.fn();

    validator(req, {}, next);

    expect(req.name).toBe('Gandalf');
    expect(next).toHaveBeenCalled();
  });

  test('with no name', () => {
    const req = { query: {} };
    const next = jest.fn();
    validator(req, {}, next);

    expect(next).toHaveBeenCalledWith('Could not validate because there was no name in query!');
  });
});