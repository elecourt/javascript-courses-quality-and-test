// public/main.js

document.addEventListener('DOMContentLoaded', () => {
    function highlightUserScore() {
        const usernameElement = document.querySelector('#username');
        if (usernameElement) {
            const username = usernameElement.textContent.trim();
            const rows = document.querySelectorAll('table tbody tr');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 1 && cells[0].textContent.trim() === username) {
                    row.style.backgroundColor = '#f0f8ff'; // Highlight user's row
                }
            });
        }
    }

    highlightUserScore();
});
