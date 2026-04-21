import { getDishes, addToCart } from '../api/api.js';
import { router } from '../utils/router.js';

export function Home() {
  return `
    <div class="card">
      <h2>Menu</h2>
      <div id="dishes-list">Loading...</div>
    </div>
  `;
}

// 页面加载时获取菜品列表
setTimeout(async () => {
  const list = document.getElementById('dishes-list');
  if (!list) return;

  try {
    const data = await getDishes();
    list.innerHTML = data.dishes.map(d => `
      <div class="dish-card">
        <h3>${d.name}</h3>
        <p>Price: ${d.price} ₽</p>
        <button onclick="goToDish('${d.id}')">View</button>
        <button onclick="addItemToCart('${d.id}')">Add to cart</button>
      </div>
    `).join('');
  } catch (err) {
    list.innerHTML = 'Error loading dishes';
  }
}, 0);

// 跳转菜品详情页（和老师文档要求一致：/item/{id}）
window.goToDish = (id) => {
  router.navigate(`/item/${id}`);
};

// 添加购物车
window.addItemToCart = async (id) => {
  try {
    await addToCart(id);
    alert('Added to cart!');
  } catch (err) {
    alert('Error: ' + err.message);
  }
};