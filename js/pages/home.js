import { addToCart, getDishes } from '../api/api.js';
import { navigate } from '../utils/router.js';
import { isAuth, logout, setDishFilter } from '../state/store.js';
import { renderLoader } from '../components/Loader.js';
import { renderError } from '../components/ErrorMessage.js';
import { renderDishCard } from '../components/DishCard.js';
import { renderPagination } from '../components/Pagination.js';
import { escapeHtml } from '../utils/helpers.js';

window.addCart = async function(dishId) {
    try {
        await addToCart(dishId, 1);
        alert('Added to cart successfully!');
    } catch (err) {
        alert(escapeHtml('Add to cart failed: ' + err.message));
    }
};

export function Home() {
    setTimeout(bindLogoutBtn, 0);
    setTimeout(loadDishes, 0);
    let logoutHtml = '';
    if (isAuth()) {
        logoutHtml = `<button id="logout-btn">Log out</button>`;
    }
    return `
        <nav class="main-nav">
            <a href="#/">Menu</a>
            <a href="#/cart">Cart</a>
            <a href="#/orders">Orders</a>
            <a href="#/profile">Profile</a>
            ${logoutHtml}
        </nav>
        <div class="card">
            <h2>Dish Menu</h2>
            <div class="form-group">
                <select id="sort-select">
                    <option value="">Sort by</option>
                    <option value="NameAsc">Name A-Z</option>
                    <option value="NameDesc">Name Z-A</option>
                    <option value="PriceAsc">Price Low → High</option>
                    <option value="PriceDesc">Price High → Low</option>
                </select>
                <label>
                    <input type="checkbox" id="veg-check"> Vegetarian only
                </label>
            </div>
            <div id="dish-list">${renderLoader()}</div>
            <div id="pagination"></div>
        </div>
    `;
}

function bindLogoutBtn() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;
    logoutBtn.onclick = function () {
        logout();
        navigate('/login');
        location.reload();
    };
}

async function loadDishes() {
    const dishList = document.getElementById('dish-list');
    const pageBox = document.getElementById('pagination');
    if (!dishList) return;

    const search = new URLSearchParams(window.location.search);
    const page = Number(search.get('page')) || 1;
    const sorting = search.get('sorting') || '';
    const vegetarian = search.get('vegetarian') === 'true';
    setDishFilter({ page, sorting, vegetarian });

    const sortSel = document.getElementById('sort-select');
    const vegCheck = document.getElementById('veg-check');
    if (sortSel) sortSel.value = sorting;
    if (vegCheck) vegCheck.checked = vegetarian;

    bindFilterChange();
    try {
        const params = { page, vegetarian };
        if (sorting) params.sorting = sorting;
        const res = await getDishes(params);
        const dishes = res.dishes || [];
        const totalPages = res.pages || 1;

        if (dishes.length === 0) {
            dishList.innerHTML = '<p>No dishes available</p>';
            pageBox.innerHTML = '';
            return;
        }
        dishList.innerHTML = dishes.map(item => renderDishCard(item)).join('');
        pageBox.innerHTML = renderPagination(page, totalPages, sorting, vegetarian);
    } catch (err) {
        dishList.innerHTML = renderError(err.message);
    }
}

function bindFilterChange() {
    const sortSel = document.getElementById('sort-select');
    const vegCheck = document.getElementById('veg-check');
    if (!sortSel || !vegCheck) return;
    function updateFilter() {
        const qs = new URLSearchParams();
        qs.set('page', 1);
        if (sortSel.value) qs.set('sorting', sortSel.value);
        qs.set('vegetarian', vegCheck.checked);
        history.pushState({}, '', `?${qs}`);
        loadDishes();
    }
    sortSel.addEventListener('change', updateFilter);
    vegCheck.addEventListener('change', updateFilter);
}
window.navigate = (path) => {
    location.hash = path;
}