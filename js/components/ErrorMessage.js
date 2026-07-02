import { escapeHtml } from '../utils/helpers.js';
export function renderError(msg) {
    return `<p class="error-text">${escapeHtml(msg)}</p>`;
}