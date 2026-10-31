// js/api/api.js
const API_BASE = 'https://food-delivery.int.kreosoft.space/api';

async function request(url, options = {}) {
    // 直接读取本地存储token，和你最初可用版本逻辑一致，不会出现store同步失效401
    const token = localStorage.getItem('token');
    // console.log('🔍 Requesting:', url, 'with Token:', token);

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}${url}`, {
        method: options.method || 'GET',
        headers: headers,
        body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
        // 新增状态码+状态文字，报错信息更清晰，友好的错误提示
        throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    // 204无响应内容返回空对象
    if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {};
    }

    try {
        return await response.json();
    } catch (err) {
        return {};
    }
}

export const api = {
    login: (data) => request('/account/login', {
        method: 'POST',
        body: data
    }),
    register: (data) => request('/account/register', {
        method: 'POST',
        body: data
    }),
    getProfile: () => request('/account/profile'),
    updateProfile: (data) => request('/account/profile', {
        method: 'PUT',
        body: data
    }),
    getDishes: (params) => {
        const qs = new URLSearchParams(params).toString();
        return request(`/dish?${qs}`);
    },
    getDish: (id) => request(`/dish/${id}`),
    getCart: () => request('/basket'),
    addToCart: (dishId, count) => request(`/basket/dish/${dishId}`, {
        method: 'POST',
        body: { count }
    }),
    removeFromCart: (dishId) => request(`/basket/dish/${dishId}`, {
        method: 'DELETE'
    }),
    createOrder: (data) => request('/order', {
        method: 'POST',
        body: data
    }),
    getOrders: () => request('/order'),
    getOrderDetail: (id) => request(`/order/${id}`),
    confirmDelivery: (id) => request(`/order/${id}/confirm`, {
        method: 'POST'
    })
};

window.api = api;

export const {
    login,
    register,
    getDishes,
    getDish,
    getCart,
    addToCart,
    removeFromCart,
    createOrder,
    getOrders,
    getOrderDetail,
    confirmDelivery,
    getProfile,
    updateProfile
} = api;