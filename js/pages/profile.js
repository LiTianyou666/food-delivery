import { api } from '../api/api.js';
import { clearToken } from '../state/store.js';
import { navigate } from '../utils/router.js';
import { isNameValid, isPhone, isBirthDate, isAddress } from '../utils/validator.js';
import { bindPhoneMask } from '../utils/mask.js';
import { escapeHtml } from '../utils/helpers.js';

window.logout = function() {
    clearToken();
    navigate('/login');
};

export function Profile() {
    setTimeout(bindProfile, 0);
    return `
        <div class="card">
            <h2>User Profile</h2>
            <div id="profile-error" class="error-text"></div>
            <form id="profile-form">
                <div class="form-group">
                    <label>Full Name</label>
                    <input name="fullName" required>
                </div>
                <div class="form-group">
                    <label>Email (readonly)</label>
                    <input name="email" disabled>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input name="phone" required placeholder="+7 (xxx) xxx-xx-xx">
                </div>
                <div class="form-group">
                    <label>Gender</label>
                    <select name="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Birth Date (DD.MM.YYYY)</label>
                    <input name="birthDate" placeholder="01.01.2000">
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <input name="address" required>
                </div>
                <button type="submit" id="save-profile-btn">Save Changes</button>
            </form>
            <button class="btn-logout" onclick="logout()">Logout</button>
        </div>
    `;
}

async function bindProfile() {
    const form = document.getElementById('profile-form');
    const errorEl = document.getElementById('profile-error');
    if (!form) return;
    const phoneInput = form.phone;
    bindPhoneMask(phoneInput);

    try {
        const user = await api.getProfile();
        form.fullName.value = user.fullName || '';
        form.email.value = user.email || '';
        form.phone.value = user.phone || '';
        form.gender.value = user.gender || 'Male';
        if (user.birthDate) {
            let rawDate = user.birthDate;
            if (rawDate.includes('T')) rawDate = rawDate.split('T')[0];
            if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
                const [y, m, d] = rawDate.split('-');
                form.birthDate.value = `${d}.${m}.${y}`;
            } else {
                form.birthDate.value = rawDate;
            }
        } else {
            form.birthDate.value = '';
        }
        form.address.value = user.address || '';
    } catch (err) {
        errorEl.textContent = escapeHtml('Load profile failed: ' + err.message);
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorEl.textContent = '';
        const btn = document.getElementById('save-profile-btn');
        const data = {
            fullName: form.fullName.value.trim(),
            phone: form.phone.value.trim(),
            gender: form.gender.value,
            birthDate: form.birthDate.value.trim(),
            address: form.address.value.trim()
        };
        if (!isNameValid(data.fullName)) {
            errorEl.textContent = escapeHtml('Full name cannot be empty');
            return;
        }
        if (!isPhone(data.phone)) {
            errorEl.textContent = escapeHtml('Wrong phone format');
            return;
        }
        if (data.birthDate && !isBirthDate(data.birthDate)) {
            errorEl.textContent = escapeHtml('Birth date must be DD.MM.YYYY');
            return;
        }
        if (!isAddress(data.address)) {
            errorEl.textContent = escapeHtml('Address cannot be empty');
            return;
        }
        btn.disabled = true;
        try {
            await api.updateProfile(data);
            alert('Profile updated successfully!');
        } catch (err) {
            errorEl.textContent = escapeHtml('Update failed: ' + err.message);
        } finally {
            btn.disabled = false;
        }
    });
}