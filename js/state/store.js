// Single source of truth global state
const appState = {
    token: null,
    user: null,
    dishFilter: {
        page: 1,
        sorting: '',
        vegetarian: false,
        categories: []
    },
    cartItems: []
};

export function loadStore() {
    appState.token = localStorage.getItem('token') || null;
}

export function setToken(token) {
    appState.token = token;
    localStorage.setItem('token', token);
}

export function clearToken() {
    appState.token = null;
    appState.user = null;
    appState.cartItems = [];
    localStorage.removeItem('token');
}

export function setDishFilter(filterObj) {
    appState.dishFilter = { ...appState.dishFilter, ...filterObj };
}

export function setCartItems(list) {
    appState.cartItems = [...list];
}

export function isAuth() {
    return !!appState.token;
}

export function getState() {
    return {...appState};
}

export const logout = clearToken;