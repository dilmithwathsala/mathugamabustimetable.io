function searchBus() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const cards = document.querySelectorAll('.bus-timetable');
    const noResults = document.getElementById('no-results');
    let visible = 0;

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.classList.remove('hidden');
            visible++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (noResults) {
        noResults.classList.toggle('visible', visible === 0);
    }
}
// ── Search ────────────────────────────────────────
function searchBus() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const cards = document.querySelectorAll('.bus-timetable');
    const noResults = document.getElementById('no-results');
    let anyVisible = false;

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        if (text.includes(query)) {
            card.classList.remove('hidden');
            anyVisible = true;
        } else {
            card.classList.add('hidden');
        }
    });

    noResults.classList.toggle('visible', !anyVisible);
}

// ── Lightbox ──────────────────────────────────────
(function () {
    // Create overlay once
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

    // Open lightbox
    function openLightbox(src) {
        img.src = src;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        img.src = '';
    }

    // Attach click to all card images (including dynamically added ones)
    document.querySelector('.bus-container').addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.bus-timetable')) {
            openLightbox(e.target.src);
        }
    });

    // Close on overlay background click
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeLightbox();
    });

    // Close button
    closeBtn.addEventListener('click', closeLightbox);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });
})();