import { initRouter } from './utils/router.js';
import { loadStore } from './state/store.js';

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    loadStore();
    initRouter();
});