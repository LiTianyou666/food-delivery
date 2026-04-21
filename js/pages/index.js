import { Home } from './home.js';
import { Login } from './login.js';
import { Register } from './register.js';
import { Profile } from './profile.js';
import { Cart } from './cart.js';
import { Orders } from './orders.js';
import { DishDetail } from './dishDetail.js';
import { OrderDetail } from './orderDetail.js';

export function renderPage(path) {
  const app = document.getElementById('app');
  if (!app) return;

  if (path === '/') {
    app.innerHTML = Home();
  } else if (path === '/login') {
    app.innerHTML = Login();
  } else if (path === '/register') {
    app.innerHTML = Register();
  } else if (path === '/profile') {
    app.innerHTML = Profile();
  } else if (path === '/cart') {
    app.innerHTML = Cart();
  } else if (path === '/orders') {
    app.innerHTML = Orders();
  } else if (path.startsWith('/item/')) {
    app.innerHTML = DishDetail();
  } else if (path.startsWith('/order/')) {
    app.innerHTML = OrderDetail();
  } else {
    app.innerHTML = '<h2>404 — Page not found</h2>';
  }
}