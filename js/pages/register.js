import { register } from '../api/api.js';
import { setToken } from '../state/store.js';
import { navigate } from '../utils/router.js';
import { isEmail, isPasswordValid, isNameValid, isPhone,isGender,isBirthDate,isAddress } from '../utils/validator.js';
import { bindPhoneMask } from '../utils/mask.js';
import { escapeHtml } from '../utils/helpers.js';

export function Register() {
    setTimeout(bindRegForm, 0);
    return `
        <div class="card">
            <h2>Register New Account</h2>
            <div id="reg-error" class="error-text"></div>
            <form id="reg-form">
                <div class="form-group">
                    <label>Full Name</label>
                    <input name="fullName" required placeholder="Full Name">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required placeholder="Email">
                </div>
                <div class="form-group">
                    <label>Phone (+7 (xxx) xxx-xx-xx)</label>
                    <input name="phone" required placeholder="+7 (xxx) xxx-xx-xx">
                </div>
                <div class="form-group">
                    <label>Gender</label>
                    <select name="gender" required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Birth Date (DD.MM.YYYY)</label>
                    <input name="birthDate" required placeholder="01.01.2000">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input name="address" required placeholder="Your address">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" name="password" required placeholder="Min 6 characters">
                </div>
                <button type="submit" id="reg-btn">Register</button>
            </form>
            <p class="text-link">Already have account? <a href="#/login">Login</a></p>
        </div>
    `;
}

function bindRegForm() {
    const form = document.getElementById('reg-form');
    if (!form) return;
    // Bind phone mask
    const phoneInput = form.phone;
    bindPhoneMask(phoneInput);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const errorEl = document.getElementById('reg-error');
        const btn = document.getElementById('reg-btn');
        errorEl.textContent = '';
        const fullName = form.fullName.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const password = form.password.value;
        const gender = form.gender.value.trim();
        const birthDate = form.birthDate.value.trim();
        const address = form.address.value.trim();

        if (!isNameValid(fullName)) {
            errorEl.textContent = escapeHtml('Full name is required');
            return;
        }
        if (!isEmail(email)) {
            errorEl.textContent = escapeHtml('Invalid email');
            return;
        }
        if (!isPhone(phone)) {
            errorEl.textContent = escapeHtml('Phone format: +7 (xxx) xxx-xx-xx');
            return;
        }
        if (!isGender(gender)) {
            errorEl.textContent = escapeHtml('Please select gender');
            return;
        }
        if (!isBirthDate(birthDate)) {
            errorEl.textContent = escapeHtml('Birth date format: DD.MM.YYYY');
            return;
        }
        if (!isAddress(address)) {
            errorEl.textContent = escapeHtml('Address cannot be empty');
            return;
        }
        if (!isPasswordValid(password)) {
            errorEl.textContent = escapeHtml('Password at least 6 characters');
            return;
        }
        btn.disabled = true;
        try {
            const res = await register({ fullName, email, phone, password, gender, birthDate, address });
            setToken(res.token);
            navigate('/');
        } catch (err) {
            errorEl.textContent = escapeHtml('Register failed: ' + err.message);
        } finally {
            btn.disabled = false;
        }
    });
}