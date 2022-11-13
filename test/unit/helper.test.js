const { checkSource } = require('../../src/helper');

describe('checkSource', () => {
  test('invalid path should return "none"', () => {
    expect(checkSource('invalid-name')).toBe('none');
  });

  test('path to valid folder should return "folder"', () => {
    expect(checkSource('test')).toBe('folder');
  });

  test('path to valid file should return "file"', () => {
    expect(checkSource('test/unit/helper.test.js')).toBe('file');
  });
});
