import { escapeHtml, formatPrice } from '../utils/helpers.js';
export function renderDishCard(dish) {
    const name = escapeHtml(dish.name);
    const desc = escapeHtml(dish.description || '');
    const price = formatPrice(dish.price);
    const rating = dish.rating ?? 'N/A';
    const vegText = dish.isVegetarian ? '🥗 Vegetarian' : '🍖 Not Vegetarian';
    return `
        <div class="dish-card">
            <h3>${name}</h3>
            <p>Price: ${price} | Rating: ${rating}</p>
            <p>${vegText}</p>
            <p>${desc}</p>
            <button onclick="navigate('/item/${dish.id}')">View Details</button>
            <button onclick="addCart('${dish.id}')">Add to Cart</button>
        </div>
    `;
}