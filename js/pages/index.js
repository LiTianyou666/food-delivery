import { Home } from './home.js';
import { Login } from './login.js';
import { Register } from './register.js';
import { Profile } from './profile.js';
import { Cart } from './cart.js';
import { Checkout } from './checkout.js';
import { Orders } from './orders.js';
// 修正文件名 & 导出函数名
import { ItemDetail } from './itemDetail.js';
import { OrderDetail } from './orderDetail.js';

export function renderPage(path) {
    const app = document.getElementById('app');
    if (!app) return;

    // 基础路由
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
    } else if (path === '/checkout') {
        app.innerHTML = Checkout();
    } else if (path === '/orders') {
        app.innerHTML = Orders();
    }
    // 动态路由：菜品详情 /item/xxx
    else if (path.startsWith('/item/')) {
        const dishId = path.split('/item/')[1];
        // 传对象 { id: dishId }，匹配ItemDetail的入参规则
        app.innerHTML = ItemDetail({ id: dishId });
    }
    // 动态路由：订单详情 /order/xxx
    else if (path.startsWith('/order/')) {
        const orderId = path.split('/order/')[1];
        app.innerHTML = OrderDetail({ id: orderId });
    }
    // 404页面
    else {
        app.innerHTML = `<div class="card"><h2>404 Page Not Found</h2></div>`;
    }
}