const ssgulnur = require('../../src/options');

describe('test the main function with bad values', () => {
  test('check if calling a function with empty, null, or undefined will return false', () => {
    [null, undefined, ''].forEach((p) => expect(ssgulnur(p)).toBeFalsy());
  });

  test('check if calling a function with bad value will return false', () => {
    expect(ssgulnur('Bad value')).toBeFalsy();
  });
});
