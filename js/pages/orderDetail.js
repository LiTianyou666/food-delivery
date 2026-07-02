import { api } from '../api/api.js';
import { renderLoader } from '../components/Loader.js';
import { renderError } from '../components/ErrorMessage.js';
import { escapeHtml, formatPrice, formatDateTime } from '../utils/helpers.js';

export function OrderDetail(params = {}) {
    const orderId = params.id;
    setTimeout(() => loadOrderDetail(orderId), 0);
    return `
        <div class="card">
            <h2>Order Detail</h2>
            <div id="order-detail">${renderLoader()}</div>
        </div>
    `;
}

async function loadOrderDetail(id) {
    const box = document.getElementById('order-detail');
    if (!box) return;
    try {
        const order = await api.getOrderDetail(id);
        const orderTime = formatDateTime(order.orderTime);
        const deliveryTime = formatDateTime(order.deliveryTime);
        const itemsHtml = order.items && order.items.length > 0
            ? order.items.map(item => `
                <div class="dish-card">
                    <p>${escapeHtml(item.name)} × ${item.count}</p>
                    <p>Subtotal: ${formatPrice(item.totalPrice)}</p>
                </div>
              `).join('')
            : '<p>No items in this order</p>';
        box.innerHTML = `
            <p><strong>Order ID:</strong> ${escapeHtml(order.id)}</p>
            <p><strong>Status:</strong> ${escapeHtml(order.status)}</p>
            <p><strong>Order Time:</strong> ${orderTime}</p>
            <p><strong>Delivery Time:</strong> ${deliveryTime}</p>
            <p><strong>Total Price:</strong> ${formatPrice(order.totalPrice)}</p>
            <hr>
            <h4>Ordered Items</h4>
            ${itemsHtml}
        `;
    } catch (err) {
        box.innerHTML = renderError(err.message);
    }
}