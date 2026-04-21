import { getDish } from '../api/api.js';

export function DishDetail() {
  return `
    <div class="card">
      <h2>Dish Detail</h2>
      <div id="dish-info">Loading...</div>
      <button onclick="history.back()">Back</button>
    </div>
  `;
}

setTimeout(async () => {
  const infoEl = document.getElementById('dish-info');
  if (!infoEl) return;

  try {
    const path = window.location.pathname;
    const id = path.split('/').pop();
    const dish = await getDish(id);

    infoEl.innerHTML = `
      <h3>${dish.name}</h3>
      <p>Price: ${dish.price} ₽</p>
      <p>${dish.description || ''}</p>
    `;
  } catch (err) {
    infoEl.innerHTML = 'Failed to load dish';
  }
}, 0);