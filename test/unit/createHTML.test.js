const { createHTML } = require('../../src/helper');

describe('createHTML', () => {
  test('.md files have to properly transform into HTML', () => {
    expect(createHTML('test/sample.md')).toMatchSnapshot();
  });

  test('.txt files have to properly transform into HTML', () => {
    expect(createHTML('test/sample.txt')).toMatchSnapshot();
  });

  test('Style should change if given with .md file', () => {
    expect(
      createHTML('test/sample.txt', 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css')
    ).toMatchSnapshot();
  });

  test('Style should change if given with .txt file', () => {
    expect(
      createHTML('test/sample.txt', 'https://cdn.jsdelivr.net/npm/water.css@2/out/water.css')
    ).toMatchSnapshot();
  });
});
