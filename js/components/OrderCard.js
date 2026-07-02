import { escapeHtml, formatPrice, formatDateTime } from '../utils/helpers.js';
export function renderOrderCard(order) {
    const createTime = formatDateTime(order.creationTime);
    const total = formatPrice(order.totalPrice);
    const status = escapeHtml(order.status);
    return `
        <div class="dish-card">
            <h4>Order #${order.id}</h4>
            <p>Status: ${status}</p>
            <p>Total: ${total}</p>
            ${createTime ? `<p>Created: ${createTime}</p>` : ''}
            <button onclick="navigate('/order/${order.id}')">View Detail</button>
            ${order.status === 'InProcess' 
                ? `<button onclick="confirmOrderDelivery('${order.id}')">Confirm Delivery</button>` 
                : ''}
        </div>
    `;
}