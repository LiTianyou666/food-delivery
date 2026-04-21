const BASE_URL = 'https://food-delivery.int.kreosoft.space/api';

export async function login(data) {
  const res = await fetch(`${BASE_URL}/account/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}
export async function register(data) {
  const res = await fetch(`${BASE_URL}/account/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}
// 获取用户信息
export async function getProfile() {
  const res = await fetch(`${BASE_URL}/user/me`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error('Failed to load profile');
  return res.json();
}

// 更新用户信息
export async function updateProfile(data) {
  const res = await fetch(`${BASE_URL}/user/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

// 获取菜品列表
export async function getDishes(params = {}) {
  const q = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/dish?${q}`);
  if (!res.ok) throw new Error('Failed to load dishes');
  return res.json();
}

// 获取单个菜品
export async function getDish(id) {
  const res = await fetch(`${BASE_URL}/dish/${id}`);
  if (!res.ok) throw new Error('Failed to load dish');
  return res.json();
}

// 获取购物车
export async function getCart() {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error('Failed to load cart');
  return res.json();
}

// 正确的添加购物车接口
export async function addToCart(dishId) {
  const res = await fetch(`${BASE_URL}/cart/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      dishId: dishId,
      count: 1
    })
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`添加失败: ${res.status} - ${error}`);
  }

  return res.json();
}
// 从购物车移除
export async function removeFromCart(id) {
  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error('Failed to remove from cart');
  return res.json();
}

// 创建订单
export async function createOrder(data) {
  const res = await fetch(`${BASE_URL}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

// 获取订单列表
export async function getOrders() {
  const res = await fetch(`${BASE_URL}/order`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error('Failed to load orders');
  return res.json();
}

// 获取单个订单
export async function getOrderDetail(id) {
  const res = await fetch(`${BASE_URL}/order/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error('Failed to load order');
  return res.json();
}

// 确认送达
export async function confirmDelivery(id) {
  const res = await fetch(`${BASE_URL}/order/${id}/confirm`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
  if (!res.ok) throw new Error('Failed to confirm delivery');
  return res.json();
}