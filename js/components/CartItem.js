import { escapeHtml, formatPrice } from '../utils/helpers.js';
export function renderCartItem(item) {
    const name = escapeHtml(item.name);
    const unit = formatPrice(item.price);
    const total = formatPrice(item.totalPrice || item.price);
    return `
        <div class="dish-card">
            <h3>${name}</h3>
            <p>Unit Price: ${unit}</p>
            <p>Total: ${total}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
    `;
}