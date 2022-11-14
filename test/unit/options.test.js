const ssgulnur = require('../../src/options');

describe('test the main function with bad values', () => {
  test('return false if bad argument is passed to a function', () => {
    expect(ssgulnur('')).toBeFalsy();
  });

  test('check if calling a function with bad value will return false', () => {
    expect(ssgulnur('Bad value')).toBeFalsy();
  });
});
