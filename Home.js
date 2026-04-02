// ── Helpers ───────────────────────────────────────

// Extract hour from time text (06:15, 5:50 p.m, etc.)
function getHour(timeText) {
    const match = timeText.match(/(\d{1,2})/);
    return match ? parseInt(match[1]) : null;
}

// Check time category
// function matchTimeFilter(hour, filter) {
//     if (!filter || hour === null) return true;

//     if (filter === "morning") return hour >= 5 && hour < 12;
//     if (filter === "afternoon") return hour >= 12 && hour < 16;
//     if (filter === "evening") return hour >= 16;

//     return true;
// }

// ── Advanced Search + Filters ─────────────────────
function searchBus() {
    const query = document.getElementById('search-bar').value.toLowerCase();

    const fromFilter = document.getElementById('from-filter')?.value.toLowerCase() || "";
    const toFilter = document.getElementById('to-filter')?.value.toLowerCase() || "";
    const timeFilter = document.getElementById('time-filter')?.value || "";

    const cards = document.querySelectorAll('.bus-timetable');
    const noResults = document.getElementById('no-results');

    let visibleCount = 0;

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        // 🔍 Search match
        const matchSearch = text.includes(query);

        // 📍 From / To filters
        const matchFrom = !fromFilter || text.includes(fromFilter);
        const matchTo = !toFilter || text.includes(toFilter);

        // ⏱ Time filter
        let matchTime = true;

        if (timeFilter) {
            matchTime = false;

            const times = card.querySelectorAll('.timing-chip');

            times.forEach(t => {
                const hour = getHour(t.innerText);
                if (matchTimeFilter(hour, timeFilter)) {
                    matchTime = true;
                }
            });
        }

        // 🎯 Final decision
        if (matchSearch && matchFrom && matchTo && matchTime) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // ❗ No results message
    if (noResults) {
        noResults.classList.toggle('visible', visibleCount === 0);
    }
}

// ── Event Listeners ───────────────────────────────

// Search typing
document.getElementById('search-bar').addEventListener('keyup', searchBus);

// Filters change (safe if not added yet)
['from-filter', 'to-filter', 'time-filter'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', searchBus);
});


// ── Lightbox (Improved) ───────────────────────────
(function () {
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

    // Delegation (optimized)
    document.querySelector('.bus-container').addEventListener('click', function (e) {
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
})();

// ── Dark Mode Toggle ────────────────────────────
const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

// Toggle click
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem("theme", isDark ? "dark" : "light");
});


// ── Search + Filters ────────────────────────────
function searchBus() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const fromFilter = document.getElementById('from-filter').value.toLowerCase();
    const toFilter = document.getElementById('to-filter').value.toLowerCase();

    const cards = document.querySelectorAll('.bus-timetable');
    const noResults = document.getElementById('no-results');

    let visibleCount = 0;

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();

        const matchSearch = text.includes(query);
        const matchFrom = !fromFilter || text.includes(fromFilter);
        const matchTo = !toFilter || text.includes(toFilter);

        if (matchSearch && matchFrom && matchTo) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    noResults.classList.toggle('visible', visibleCount === 0);
}

// Events
document.getElementById('search-bar').addEventListener('keyup', searchBus);
document.getElementById('from-filter').addEventListener('change', searchBus);
document.getElementById('to-filter').addEventListener('change', searchBus);


// ── Lightbox ────────────────────────────────────
(function () {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';

    const img = document.createElement('img');

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
    }

    document.querySelector('.bus-container').addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            openLightbox(e.target.src);
        }
    });

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeLightbox();
    });

    closeBtn.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });
})();