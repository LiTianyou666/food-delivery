import { api } from '../api/api.js';
import { navigate } from '../utils/router.js';
import { renderLoader } from '../components/Loader.js';
import { renderError } from '../components/ErrorMessage.js';
import { renderOrderCard } from '../components/OrderCard.js';
import { escapeHtml } from '../utils/helpers.js';

export function Orders() {
    setTimeout(loadOrders, 0);
    return `
        <div class="card">
            <h2>My Orders</h2>
            <div id="orders-list">${renderLoader()}</div>
        </div>
    `;
}

async function loadOrders() {
    const list = document.getElementById('orders-list');
    if (!list) return;
    try {
        const orders = await api.getOrders();
        if (!orders || orders.length === 0) {
            list.innerHTML = '<p>No orders yet</p>';
            return;
        }
        list.innerHTML = orders.map(o => renderOrderCard(o)).join('');
        window.confirmOrderDelivery = async (id) => {
            if (!confirm('Are you sure you have received the order?')) return;
            try {
                await api.confirmDelivery(id);
                alert('Delivery confirmed successfully!');
                loadOrders();
            } catch (err) {
                alert(escapeHtml('Confirm failed: ' + err.message));
            }
        };
    } catch (err) {
        list.innerHTML = renderError(err.message);
    }
}