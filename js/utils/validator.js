// 邮箱验证
export function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 手机号格式 +7 (xxx) xxx-xx-xx
export function isPhone(phone) {
  return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone);
}

// 密码非空
export function isPasswordValid(pwd) {
  return pwd && pwd.length >= 6;
}

// 姓名非空
export function isNameValid(name) {
  return name && name.trim().length > 0;
}