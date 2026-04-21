import { getProfile, updateProfile } from '../api/api.js';
import { clearToken } from '../state/store.js';
import { router } from '../utils/router.js';

export function Profile() {
  return `
    <div class="card">
      <h2>My Profile</h2>
      <form id="profile-form">
        <input name="fullName" placeholder="Full Name" required>
        <input name="email" type="email" placeholder="Email" disabled>
        <input name="phone" placeholder="Phone" required>
        <input name="birthDate" type="date" required>
        <input name="address" placeholder="Address" required>
        <button type="submit">Save</button>
      </form>
      <button style="background:red; margin-top:10px;" onclick="logout()">Logout</button>
    </div>
  `;
}

setTimeout(async () => {
  const form = document.getElementById('profile-form');
  if (!form) return;

  try {
    const user = await getProfile();
    form.fullName.value = user.fullName;
    form.email.value = user.email;
    form.phone.value = user.phone;
    form.birthDate.value = user.birthDate;
    form.address.value = user.address;
  } catch (e) {
    console.error(e);
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
      fullName: form.fullName.value,
      phone: form.phone.value,
      birthDate: form.birthDate.value,
      address: form.address.value
    };
    try {
      await updateProfile(data);
      alert('Profile saved!');
    } catch (err) {
      alert(err.message);
    }
  };
}, 0);

window.logout = () => {
  clearToken();
  router.navigate('/login');
};