const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

const allIds = [1, 2, 3, 4, 5, 6];

describe('searchProducts', () => {
  test("'Наушники' возвращает товар с ID 1", () => {
    const ids = searchProducts(products, 'Наушники').map(({ id }) => id);
    expect(ids).toEqual([1]);
  });

  test("'Чистый код' возвращает товар с ID 6", () => {
    const ids = searchProducts(products, 'Чистый код').map(({ id }) => id);
    expect(ids).toEqual([6]);
  });

  test("'Настольная лампа' возвращает товар с ID 4", () => {
    const ids = searchProducts(products, 'Настольная лампа').map(({ id }) => id);
    expect(ids).toEqual([4]);
  });

  test("'javascript' возвращает товар с ID 3", () => {
    const ids = searchProducts(products, 'javascript').map(({ id }) => id);
    expect(ids).toEqual([3]);
  });

  test("'ЧЕХОЛ' возвращает товар с ID 5", () => {
    const ids = searchProducts(products, 'ЧЕХОЛ').map(({ id }) => id);
    expect(ids).toEqual([5]);
  });

  test("'наушники' возвращает товар с ID 1", () => {
    const ids = searchProducts(products, 'наушники').map(({ id }) => id);
    expect(ids).toEqual([1]);
  });

  test('пустая строка возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    const ids = searchProducts(products, '').map(({ id }) => id);
    expect(ids).toEqual(allIds);
  });

  test('строка из пробелов возвращает товары с ID [1, 2, 3, 4, 5, 6]', () => {
    const ids = searchProducts(products, '   ').map(({ id }) => id);
    expect(ids).toEqual(allIds);
  });

  test("'\\t\\n' возвращает товары с ID [1, 2, 3, 4, 5, 6]", () => {
    const ids = searchProducts(products, '\t\n').map(({ id }) => id);
    expect(ids).toEqual(allIds);
  });
});
