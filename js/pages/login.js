import { login } from '../api/api.js';
import { setToken } from '../state/store.js';
import { navigate } from '../utils/router.js';
import { isEmail, isPasswordValid } from '../utils/validator.js';
import { escapeHtml } from '../utils/helpers.js';

export function Login() {
    setTimeout(bindLoginForm, 0);
    return `
        <div class="card">
            <h2>Login</h2>
            <div id="login-error" class="error-text"></div>
            <form id="login-form">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" required placeholder="Enter password">
                </div>
                <button type="submit" id="login-btn">Login</button>
            </form>
            <p class="text-link">No account? <a href="#/register">Register</a></p>
        </div>
    `;
}

function bindLoginForm() {
    const form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorEl = document.getElementById('login-error');
        const btn = document.getElementById('login-btn');
        errorEl.textContent = '';
        const email = form.email.value.trim();
        const password = form.password.value;
        if (!isEmail(email)) {
            errorEl.textContent = escapeHtml('Invalid email format');
            return;
        }
        if (!isPasswordValid(password)) {
            errorEl.textContent = escapeHtml('Password at least 6 characters');
            return;
        }
        btn.disabled = true;
        try {
            const res = await login({ email, password });
            setToken(res.token);
            navigate('/');
        } catch (err) {
            errorEl.textContent = escapeHtml('Login failed: ' + err.message);
        } finally {
            btn.disabled = false;
        }
    });
}