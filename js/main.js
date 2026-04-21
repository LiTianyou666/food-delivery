import { loadStore } from './state/store.js';
import { router } from './utils/router.js';

document.addEventListener('DOMContentLoaded', () => {
  loadStore();
  router.init();
});