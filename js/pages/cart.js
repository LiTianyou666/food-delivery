import { getCart, removeFromCart, createOrder } from '../api/api.js';
import { router } from '../utils/router.js';

export function Cart() {
  return `
    <div class="card">
      <h2>My Cart</h2>
      <div id="cart-list">Loading...</div>
      <div id="total"></div>
      <button id="checkout" style="display:none;">Checkout</button>
    </div>
  `;
}

setTimeout(async () => {
  const list = document.getElementById('cart-list');
  const total = document.getElementById('total');
  const btn = document.getElementById('checkout');
  if (!list || !total || !btn) return;

  try {
    const data = await getCart();
    if (data.items.length === 0) {
      list.innerHTML = 'Cart is empty';
      return;
    }

    list.innerHTML = data.items.map(i => `
      <div>
        <p>${i.dish.name} | ${i.count} x ${i.dish.price} ₽</p>
        <button onclick="remove(${i.dish.id})">Remove</button>
      </div>
    `).join('');

    total.innerHTML = `<h3>Total: ${data.price} ₽</h3>`;
    btn.style.display = 'block';

    btn.onclick = async () => {
      await createOrder({ address: 'Default Address' });
      router.navigate('/orders');
    };
  } catch (e) {
    list.innerHTML = 'Failed to load cart';
  }
}, 0);

window.remove = async (id) => {
  await removeFromCart(id);
  location.reload();
};