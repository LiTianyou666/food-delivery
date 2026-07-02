import { getCart, removeFromCart } from '../api/api.js';
import { navigate } from '../utils/router.js';
import { renderLoader } from '../components/Loader.js';
import { renderError } from '../components/ErrorMessage.js';
import { renderCartItem } from '../components/CartItem.js';
import { formatPrice, escapeHtml } from '../utils/helpers.js';

window.removeFromCart = async function(dishId) {
    try {
        await removeFromCart(dishId);
        loadCartData();
    } catch (err) {
        alert(escapeHtml('Remove failed: ' + err.message));
    }
};

export function Cart() {
    setTimeout(loadCartData, 200);
    return `
        <div class="card">
            <h2>Shopping Cart</h2>
            <div id="cart-list">${renderLoader()}</div>
            <div id="cart-total"></div>
            <button id="checkout-btn">Proceed to Checkout</button>
        </div>
    `;
}

async function loadCartData() {
    const listEl = document.getElementById('cart-list');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!listEl) return;
    try {
        const res = await getCart();
        const items = Array.isArray(res) ? res : (res?.items || []);
        if (items.length === 0) {
            listEl.innerHTML = '<p>Your cart is empty</p>';
            totalEl.innerHTML = '';
            checkoutBtn.style.display = 'none';
            return;
        }
        let totalPrice = 0;
        listEl.innerHTML = items.map(item => {
            totalPrice += item.totalPrice || item.price;
            return renderCartItem(item);
        }).join('');
        totalEl.innerHTML = `<h3>Total: ${formatPrice(totalPrice)}</h3>`;
        checkoutBtn.style.display = 'block';
        checkoutBtn.onclick = () => navigate('/checkout');
    } catch (err) {
        listEl.innerHTML = renderError(err.message);
    }
}