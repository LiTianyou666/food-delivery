export const store = {
  token: null
};

export function loadStore() {
  const token = localStorage.getItem('token');
  if (token) {
    store.token = token;
  }
}

export function setToken(token) {
  store.token = token;
  localStorage.setItem('token', token);
}

export function clearToken() {
  store.token = null;
  localStorage.removeItem('token');
}