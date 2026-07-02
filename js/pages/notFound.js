export function NotFound() {
    return `
        <div class="card">
            <h2>404 Page Not Found</h2>
            <p>The page you visited does not exist.</p>
            <button onclick="navigate('/')">Back to Menu</button>
        </div>
    `;
}