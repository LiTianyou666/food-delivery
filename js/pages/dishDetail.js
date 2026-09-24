import { getDish } from '../api/api.js';

export function DishDetail(dishId) {
    return `
        <div class="card">
            <button onclick="history.back()">← Back to Menu</button>
            <div id="dish-info">Loading...</div>
        </div>
    `;
}

setTimeout(async () => {
    const infoEl = document.getElementById('dish-info');
    if (!infoEl) return;

    const path = window.location.hash.slice(1);
    const dishId = path.split('/item/')[1];

    try {
        const dish = await getDish(dishId);
        infoEl.innerHTML = `
            <h2>${dish.name}</h2>
            <p>Category: ${dish.category || 'None'}</p>
            <p>Price: ${dish.price} ₽</p>
            <p>Rating: ${dish.rating || 'No rating yet'}</p>
            <p>${dish.isVegetarian ? '🥗 Vegetarian dish' : '🍖 Regular dish'}</p>
            <p>Description: ${dish.description || 'No description available'}</p>
            <button onclick="addCart('${dish.id}')">Add to Cart</button>
        `;
    } catch (err) {
        infoEl.innerHTML = `<p class="error-text">Failed to load: ${err.message}</p>`;
    }
}, 0);