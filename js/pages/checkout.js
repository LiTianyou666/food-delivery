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
<div id="stripe-payment-section" style="display:none; margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
    <h4>Secure Payment</h4>
    <div id="card-element" style="border: 1px solid #ccc; padding: 10px; border-radius: 4px;">
        <!-- Stripe Elements 会在这里注入安全的 iframe -->
        <input type="text" placeholder="Card Number (Test: 4242...)" style="width: 100%; padding: 8px; margin-bottom: 8px;" />
        <input type="text" placeholder="MM/YY" style="width: 50%; padding: 8px;" />
        <input type="text" placeholder="CVC" style="width: 45%; padding: 8px;" />
    </div>
    <button type="button" id="pay-now-btn" style="margin-top: 10px; background: #28a745;">Pay Now</button>
    <div id="payment-error" class="error-text"></div>
</div>
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
            alert('Order created successfully! Ready for payment.');
            
            // ======= 新增：显示 Stripe 支付界面 =======
            const stripeSection = document.getElementById('stripe-payment-section');
            const checkoutBtn = document.getElementById('checkout-btn');
            
            if (stripeSection && checkoutBtn) {
                stripeSection.style.display = 'block';
                checkoutBtn.style.display = 'none'; // 隐藏原来的确认按钮
                
                // 绑定 Pay Now 按钮的点击事件
                document.getElementById('pay-now-btn').onclick = () => {
                    const payBtn = document.getElementById('pay-now-btn');
                    const errorEl = document.getElementById('payment-error');
                    
                    payBtn.textContent = 'Processing...';
                    payBtn.disabled = true;
                    errorEl.textContent = '';
                    
                    // 模拟 1.5 秒的支付请求
                    setTimeout(() => {
                        alert('Payment Successful! (Stripe Mock)');
                        navigate('/orders');
                    }, 1500);
                };
            }
            // =========================================
        } catch (err) {
            errorEl.textContent = escapeHtml('Create order failed: ' + err.message);
        } finally {
            btn.disabled = false;
        }
    });
}