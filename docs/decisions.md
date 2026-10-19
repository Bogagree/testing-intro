# Решения

## D1. Объём правок

**Accepted** · 2026-10-19

Часть 1 заполняет уже созданные файлы `tests/catalog/`: `filterByCategory.test.js`, `searchProducts.test.js`, `sortProductsByPrice.test.js`, `getProductById.test.js`. Новые файлы тестов не добавляем.

Часть 2 меняет только `src/cart.js`.

Не трогаем `src/catalog.js`, `src/data/products.js`, `tests/catalog/getAvailableProducts.test.js`, `tests/cart/cart.test.js`, `package.json`, настройки Jest и файлы интерфейса.

`docs/` — рабочие заметки. В школьный PR их не кладём: в **Files changed** остаются тесты каталога и `src/cart.js`.

## D2. Как сравнивать результат каталога

**Accepted** · 2026-10-19

Если в задании ожидается список ID, тест сначала считает `ids` через `.map(({ id }) => id)`, затем передаёт эту переменную в `expect`. Данные берём из `src/data/products.js`. Полный список ID каталога — константа `allIds`: `[1, 2, 3, 4, 5, 6]`.

`getProductById` для найденного товара сравниваем через `toBe` с тем же объектом массива (`products[0]`, `products[3]`, `products[5]`). Промах — `toBeNull()`.

Подборки для сортировки собираем так: `products.filter(({ id }) => [1, 3, 4].includes(id))`. Этот фильтр сохраняет порядок ID из условия.

## D3. Корзина не меняет входной массив

**Accepted** · 2026-10-19

`addToCart`, `changeQuantity` и `removeFromCart` возвращают новый массив. Исходную корзину не мутируем.

Если товара с таким ID нет, `changeQuantity` и `removeFromCart` возвращают ту же корзину без копии.

Позиция корзины — копия товара плюс `quantity`: `{ ...product, quantity }`. Совпадение строк определяем по `id`.

## D4. Количество, скидка и доставка

**Accepted** · 2026-10-19

Количество должно быть целым числом больше нуля и не больше `stock`. Иначе функция бросает `RangeError`. Для уже лежащего в корзине товара `addToCart` проверяет сумму текущего и добавляемого количества.

`calculateOrderTotal` считает скидку и доставку от суммы товаров до скидки:

- промокод строго `SAVE10` и сумма от 20 000 копеек включительно — скидка 10%, `Math.round(subtotal * 0.1)`;
- доставка 30 000 копеек, если сумма меньше 50 000 копеек, иначе 0;
- итог: `subtotal - discount + delivery`.

Пустая строка и любой другой промокод скидку не дают.
