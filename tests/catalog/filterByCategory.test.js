const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

const allIds = [1, 2, 3, 4, 5, 6];

describe('filterByCategory', () => {
  test("'all' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    const ids = filterByCategory(products, 'all').map(({ id }) => id);
    
    expect(ids).toEqual(allIds);
  });

  test('undefined возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    const ids = filterByCategory(products, undefined).map(({ id }) => id);
    expect(ids).toEqual(allIds);
  });

  test('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    const ids = filterByCategory(products, '').map(({ id }) => id);
    expect(ids).toEqual(allIds);
  });

  test("'electronics' возвращает товары с ID [1, 2]", () => {
    const ids = filterByCategory(products, 'electronics').map(({ id }) => id);
    expect(ids).toEqual([1, 2]);
  });

  test("'books' возвращает товары с ID [3, 6]", () => {
    const ids = filterByCategory(products, 'books').map(({ id }) => id);
    expect(ids).toEqual([3, 6]);
  });

  test("'home' возвращает товары с ID [4, 5]", () => {
    const ids = filterByCategory(products, 'home').map(({ id }) => id);
    expect(ids).toEqual([4, 5]);
  });

  test("'clothes' возвращает пустой массив", () => {
    const ids = filterByCategory(products, 'clothes').map(({ id }) => id);
    expect(ids).toEqual([]);
  });

  test("'toys' возвращает пустой массив", () => {
    const ids = filterByCategory(products, 'toys').map(({ id }) => id);
    expect(ids).toEqual([]);
  });

  test("'sports' возвращает пустой массив", () => {
    const ids = filterByCategory(products, 'sports').map(({ id }) => id);
    expect(ids).toEqual([]);
  });
});
