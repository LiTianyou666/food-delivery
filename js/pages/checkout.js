import { createOrder } from '../api/api.js';
import { router } from '../utils/router.js';

export function Checkout() {
  return `
    <div class="card">
      <h2>Checkout</h2>
      <form id="order-form">
        <input name="deliveryTime" type="datetime-local" required placeholder="Delivery time">
        <input name="address" placeholder="Delivery address" required>
        <button type="submit">Place order</button>
      </form>
    </div>
  `;
}

setTimeout(() => {
  const form = document.getElementById('order-form');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder({
        deliveryTime: form.deliveryTime.value,
        address: form.address.value
      });
      router.navigate('/orders');
    } catch (e) {
      alert('Failed to create order');
    }
  };
}, 0);