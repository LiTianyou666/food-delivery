import { getOrders } from '../api/api.js';
import { router } from '../utils/router.js';

export function Orders() {
  return `
    <div class="card">
      <h2>My Orders</h2>
      <div id="orders-list">Loading...</div>
    </div>
  `;
}

setTimeout(async () => {
  const list = document.getElementById('orders-list');
  if (!list) return;

  try {
    const data = await getOrders();
    if (!data || !data.orders || data.orders.length === 0) {
      list.innerHTML = 'No orders found';
      return;
    }

    list.innerHTML = data.orders.map(o => `
      <div class="card" onclick="goOrder(${o.id})">
        <p>Order #${o.id} | ${o.status} | ${o.price} ₽</p>
      </div>
    `).join('');
  } catch (err) {
    list.innerHTML = 'Failed to load orders';
  }
}, 0);

window.goOrder = (id) => router.navigate(`/order/${id}`);