import { getDish, addToCart } from '../api/api.js';
import { renderLoader } from '../components/Loader.js';
import { renderError } from '../components/ErrorMessage.js';
import { renderDishCard } from '../components/DishCard.js';
import { escapeHtml } from '../utils/helpers.js';

window.addCart = async function(dishId) {
    try {
        await addToCart(dishId, 1);
        alert('Added to cart successfully!');
    } catch (err) {
        alert(escapeHtml('Add to cart failed: ' + err.message));
    }
};

export function ItemDetail(params = {}) {
    const dishId = params.id;
    setTimeout(() => loadDishDetail(dishId), 0);
    return `
        <div class="card">
            <h2>Dish Detail</h2>
            <div id="dish-detail">${renderLoader()}</div>
            <button onclick="history.back()">Back</button>
        </div>
    `;
}

async function loadDishDetail(id) {
    const box = document.getElementById('dish-detail');
    if (!box) return;
    try {
        const dish = await getDish(id);
        box.innerHTML = renderDishCard(dish);
    } catch (err) {
        box.innerHTML = renderError(err.message);
    }
}