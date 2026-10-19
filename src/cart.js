function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом');
  }

  const index = cart.findIndex((item) => item.id === product.id);
  const currentQuantity = index === -1 ? 0 : cart[index].quantity;
  const nextQuantity = currentQuantity + quantity;

  if (nextQuantity > product.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  if (index === -1) {
    return [...cart, { ...product, quantity }];
  }

  return cart.map((item, itemIndex) => (
    itemIndex === index ? { ...item, quantity: nextQuantity } : item
  ));
}

function changeQuantity(cart, productId, quantity) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) return cart;

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом');
  }

  if (quantity > cart[index].stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  return cart.map((item, itemIndex) => (
    itemIndex === index ? { ...item, quantity } : item
  ));
}
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
