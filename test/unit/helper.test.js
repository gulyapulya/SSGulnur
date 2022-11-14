const { checkSource, createFolder, parseJSON } = require('../../src/helper');

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

describe('testing functions for output', () => {
  test('nothing passed to function should return false', () => {
    expect(createFolder()).toBeFalsy();
  });

  test('wrong path passed to function should return null', () => {
    expect(parseJSON('wrong path')).toBe(null);
  });
});
