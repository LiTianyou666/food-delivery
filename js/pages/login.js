import { login } from '../api/api.js';
import { setToken } from '../state/store.js';
import { router } from '../utils/router.js';

export function Login() {
  return `
    <div class="card">
      <h2>Login</h2>
      <form id="login-form">
        <input name="email" type="email" placeholder="Email" required>
        <input name="password" type="password" placeholder="Password" required>
        <button type="submit">Log in</button>
      </form>
      <p>Don't have an account? <a href="/registration">Register here</a></p>
    </div>
  `;
}

setTimeout(() => {
  const form = document.getElementById('login-form');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: form.email.value,
      password: form.password.value
    };
    try {
      const res = await login(data);
      setToken(res.token);
      router.navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };
}, 0);