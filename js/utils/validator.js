// 邮箱校验
export function isEmail(email) {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
}

// 密码：至少6位
export function isPasswordValid(pwd) {
    return typeof pwd === 'string' && pwd.length >= 6;
}

// 姓名/地址：非空、至少2字符
export function isNameValid(str) {
    return str && str.trim().length >= 2;
}

// 手机号格式 +7 (xxx) xxx-xx-xx
export function isPhone(phone) {
    const reg = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return reg.test(phone.trim());
}

// 性别校验（非空）
export function isGender(val) {
    const v = val.trim();
    return v !== '';
}

// 出生日期校验 格式：DD.MM.YYYY
export function isBirthDate(val) {
    const reg = /^\d{2}\.\d{2}\.\d{4}$/;
    return reg.test(val.trim());
}

// 地址校验（至少2个字符，复用姓名规则）
export function isAddress(val) {
    return val && val.trim().length >= 2;
}