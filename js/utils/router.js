import { store } from '../state/store.js';
import { renderPage } from '../pages/index.js';

export const router = {
  init() {
    window.addEventListener('popstate', () => this.resolve());
    this.resolve();
  },

  navigate(path) {
    history.pushState({}, '', path);
    this.resolve();
  },

  resolve() {
    const path = window.location.pathname;

    if (!store.token) {
      if (path !== '/login' && path !== '/registration') {
        this.navigate('/login');
        return;
      }
    }

    renderPage(path);
  }
};