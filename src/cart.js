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
function removeFromCart(cart, productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) return cart;

  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000
    ? Math.round(subtotal * 0.1)
    : 0;
  const delivery = subtotal < 50000 ? 30000 : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
