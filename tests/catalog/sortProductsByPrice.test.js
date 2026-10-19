const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const allIds = [1, 2, 3, 4, 5, 6];
const ascIds = [3, 6, 5, 4, 2, 1];
const descIds = [1, 2, 4, 5, 6, 3];

const productsByIds = (idList) => idList.map((id) => products.find((product) => product.id === id));

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const ids = sortProductsByPrice(products, 'asc').map(({ id }) => id);
    expect(ids).toEqual(ascIds);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const ids = sortProductsByPrice(products).map(({ id }) => id);
    expect(ids).toEqual(ascIds);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const selection = products.filter(({ id }) => [1, 3, 4].includes(id));
    const ids = sortProductsByPrice(selection, 'asc').map(({ id }) => id);
    expect(ids).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const ids = sortProductsByPrice(products, 'desc').map(({ id }) => id);
    expect(ids).toEqual(descIds);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const selection = productsByIds([3, 1, 4]);
    const ids = sortProductsByPrice(selection, 'desc').map(({ id }) => id);
    expect(ids).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const selection = productsByIds([5, 2, 6]);
    const ids = sortProductsByPrice(selection, 'desc').map(({ id }) => id);
    expect(ids).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const selection = products.filter(({ id }) => [1, 3, 4].includes(id));
    const idsBefore = selection.map(({ id }) => id);

    sortProductsByPrice(selection, 'asc');

    const idsAfter = selection.map(({ id }) => id);
    expect(idsBefore).toEqual([1, 3, 4]);
    expect(idsAfter).toEqual(idsBefore);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const selection = products.filter(({ id }) => [1, 3, 4].includes(id));
    const idsBefore = selection.map(({ id }) => id);

    sortProductsByPrice(selection, 'desc');

    const idsAfter = selection.map(({ id }) => id);
    expect(idsBefore).toEqual([1, 3, 4]);
    expect(idsAfter).toEqual(idsBefore);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const idsBefore = products.map(({ id }) => id);

    sortProductsByPrice(products);

    const idsAfter = products.map(({ id }) => id);
    expect(idsBefore).toEqual(allIds);
    expect(idsAfter).toEqual(idsBefore);
  });
});
