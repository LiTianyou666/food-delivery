import { api } from '../api/api.js';
import { navigate } from '../utils/router.js';
import { escapeHtml } from '../utils/helpers.js';

export function Checkout() {
    setTimeout(bindCheckout, 0);
    return `
        <div class="card">
            <h2>Create New Order</h2>
            <div id="checkout-error" class="error-text"></div>
            <form id="checkout-form">
                <div class="form-group">
                    <label>Delivery Address</label>
                    <input name="address" required placeholder="Enter delivery address">
                </div>
                <div class="form-group">
                    <label>Delivery Time</label>
                    <input name="deliveryTime" type="datetime-local" required>
                </div>
                <button type="submit" id="checkout-btn">Confirm Order</button>
            </form>
        </div>
    `;
}

function bindCheckout() {
    const form = document.getElementById('checkout-form');
    const errorEl = document.getElementById('checkout-error');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.textContent = '';
        const btn = document.getElementById('checkout-btn');
        let address = form.address.value.trim();
        let deliveryTime = form.deliveryTime.value;
        if (!address) {
            errorEl.textContent = escapeHtml('Please enter delivery address');
            return;
        }
        if (!deliveryTime) {
            errorEl.textContent = escapeHtml('Please select delivery time');
            return;
        }
        const selectedTime = new Date(deliveryTime);
        const now = new Date();
        if (selectedTime <= now) {
            errorEl.textContent = escapeHtml('Delivery time cannot be in the past');
            return;
        }
        btn.disabled = true;
        try {
            const cart = await api.getCart();
            let items = Array.isArray(cart) ? cart : (cart?.items || []);
            if (items.length === 0) {
                errorEl.textContent = escapeHtml('Your cart is empty, cannot place an order');
                return;
            }
            const data = {
                address: address,
                deliveryTime: selectedTime.toISOString()
            };
            await api.createOrder(data);
            alert('Order created successfully!');
            navigate('/orders');
        } catch (err) {
            errorEl.textContent = escapeHtml('Create order failed: ' + err.message);
        } finally {
            btn.disabled = false;
        }
    });
}