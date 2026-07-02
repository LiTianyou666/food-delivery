// XSS escape, price & date format tools
export function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function formatPrice(num) {
    return Number(num || 0).toFixed(0) + ' ₽';
}

export function formatDate(isoStr) {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

export function formatDateTime(isoStr) {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    return d.toLocaleString();
}