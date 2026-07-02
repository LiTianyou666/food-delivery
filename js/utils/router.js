import { isAuth } from '../state/store.js';
import { Home } from '../pages/home.js';
import { Login } from '../pages/login.js';
import { Register } from '../pages/register.js';
import { Profile } from '../pages/profile.js';
import { Cart } from '../pages/cart.js';
import { Orders } from '../pages/orders.js';
import { OrderDetail } from '../pages/orderDetail.js';
import { ItemDetail } from '../pages/itemDetail.js';
import { Checkout } from '../pages/checkout.js';
import { NotFound } from '../pages/notFound.js';

const routes = [
    { path: '/', page: Home, auth: false },
    { path: '/login', page: Login, auth: false },
    { path: '/register', page: Register, auth: false },
    { path: '/profile', page: Profile, auth: true },
    { path: '/cart', page: Cart, auth: true },
    { path: '/orders', page: Orders, auth: true },
    { path: '/checkout', page: Checkout, auth: true },
    { path: '/404', page: NotFound, auth: false }
];

export function navigate(path) {
    window.location.hash = path;
}
window.navigate = navigate;

function getCurrentRoute() {
    const hash = window.location.hash.slice(1) || '/';
    let current = routes.find(r => r.path === hash);

    if (!current) {
        // 修复：匹配 UUID 格式的ID
        if (/^\/item\/.+$/.test(hash.trim())) {
            const id = hash.split('/')[2];
            return { page: ItemDetail, auth: false, params: { id } };
        }
        if (/^\/order\/.+$/.test(hash.trim())) {
            const id = hash.split('/')[2];
            return { page: OrderDetail, auth: true, params: { id } };
        }
    }

    return current || { page: NotFound, auth: false };
}

function renderRoute() {
    const route = getCurrentRoute();
    const app = document.getElementById('app');

    if (route.auth && !isAuth()) {
        navigate('/login');
        return;
    }

    app.innerHTML = route.page(route.params || {});
}

export function initRouter() {
    window.addEventListener('hashchange', renderRoute);
    document.addEventListener('DOMContentLoaded', renderRoute);
    renderRoute();
}