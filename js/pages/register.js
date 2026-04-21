import { register } from '../api/api.js';
import { setToken } from '../state/store.js';
import { router } from '../utils/router.js';

export function Register() {
  return `
    <div class="card">
      <h2>Register</h2>
      <form id="register-form">
        <input name="fullName" placeholder="Full Name" required>
        <input name="email" type="email" placeholder="Email" required>
        <input name="password" type="password" placeholder="Password" required>
        <input name="phone" placeholder="Phone" required>
        <input name="birthDate" type="date" required>
        <input name="address" placeholder="Address" required>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  `;
}

setTimeout(() => {
  const form = document.getElementById('register-form');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: form.fullName.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      birthDate: form.birthDate.value,
      address: form.address.value
    };
    try {
      const res = await register(data);
      setToken(res.token);
      router.navigate('/');
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  };
}, 0);