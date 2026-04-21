import { getOrderDetail, confirmDelivery } from '../api/api.js';

export function OrderDetail() {
  return `
    <div class="card">
      <h2>Order Detail</h2>
      <div id="order-info">Loading...</div>
      <button id="confirm-btn" style="display:none;">Confirm delivery</button>
      <button onclick="history.back()">Back</button>
    </div>
  `;
}

setTimeout(async () => {
  const infoEl = document.getElementById('order-info');
  const confirmBtn = document.getElementById('confirm-btn');
  if (!infoEl) return;

  try {
    const path = window.location.pathname;
    const id = path.split('/').pop();
    const order = await getOrderDetail(id);

    infoEl.innerHTML = `
      <p>Order #${order.id}</p>
      <p>Status: ${order.status}</p>
      <p>Total: ${order.price} ₽</p>
    `;

    if (order.status === 'InProcess' && confirmBtn) {
      confirmBtn.style.display = 'block';
      confirmBtn.onclick = async () => {
        await confirmDelivery(id);
        location.reload();
      };
    }
  } catch (err) {
    if (infoEl) {
      infoEl.innerHTML = 'Failed to load order';
    }
  }
}, 0);