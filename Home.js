// -- Helpers ---------------------------------------

function getHour(timeText) {
    const match = timeText.match(/(\d{1,2})/);
    return match ? parseInt(match[1], 10) : null;
}

function updateSearchResults() {
    const searchBar = document.getElementById('search-bar');
    const fromFilter = document.getElementById('from-filter');
    const toFilter = document.getElementById('to-filter');
    const clearButton = document.getElementById('search-clear');
    const noResults = document.getElementById('no-results');
    const cards = document.querySelectorAll('.bus-timetable');

    if (!searchBar || !fromFilter || !toFilter || !cards.length) return;

    const query = searchBar.value.trim().toLowerCase();
    const fromValue = fromFilter.value.trim().toLowerCase();
    const toValue = toFilter.value.trim().toLowerCase();

    let visibleCount = 0;

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        const matchSearch = !query || text.includes(query);
        const matchFrom = !fromValue || text.includes(fromValue);
        const matchTo = !toValue || text.includes(toValue);

        if (matchSearch && matchFrom && matchTo) {
            card.classList.remove('hidden');
            visibleCount += 1;
        } else {
            card.classList.add('hidden');
        }
    });

    if (clearButton) {
        clearButton.classList.toggle('hidden', query.length === 0);
    }

    if (noResults) {
        noResults.classList.toggle('visible', visibleCount === 0);
    }
}

function attachSearchListeners() {
    const searchBar = document.getElementById('search-bar');
    const clearButton = document.getElementById('search-clear');
    const fromFilter = document.getElementById('from-filter');
    const toFilter = document.getElementById('to-filter');

    if (searchBar) {
        searchBar.addEventListener('input', updateSearchResults);
    }
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (searchBar) {
                searchBar.value = '';
                updateSearchResults();
                searchBar.focus();
            }
        });
    }
    if (fromFilter) {
        fromFilter.addEventListener('change', updateSearchResults);
    }
    if (toFilter) {
        toFilter.addEventListener('change', updateSearchResults);
    }
}

function initializeThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        toggleBtn.textContent = 'Light';
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');
        toggleBtn.textContent = isDark ? 'Light' : 'Dark';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

function initializeLightbox() {
    const busContainer = document.querySelector('.bus-container');
    if (!busContainer) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close image');

    const img = document.createElement('img');
    img.alt = 'Enlarged bus image';

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    function openLightbox(src) {
        img.src = src;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        img.src = '';
    }

    busContainer.addEventListener('click', e => {
        const target = e.target;
        if (target.tagName === 'IMG' && target.closest('.bus-timetable')) {
            openLightbox(target.src);
        }
    });

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeLightbox();
    });

    closeBtn.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    attachSearchListeners();
    initializeThemeToggle();
    initializeLightbox();
    updateSearchResults();
});
