// ===== CAROUSEL FUNCTIONALITY =====
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(n) {
    if (slides.length === 0) return;
    
    if (n >= slides.length) {
        currentSlide = 0;
    }
    if (n < 0) {
        currentSlide = slides.length - 1;
    }
    
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    if (slides[currentSlide]) {
        slides[currentSlide].style.display = 'flex';
    }
}

function changeSlide(n) {
    currentSlide += n;
    showSlide(currentSlide);
}

// Auto-rotate carousel setiap 5 detik
setInterval(() => {
    changeSlide(1);
}, 5000);

// Initial slide
showSlide(currentSlide);

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// ===== LOAD TIPS FROM LOCALSTORAGE OR DEFAULT =====
function loadTips() {
    const tipsGrid = document.getElementById('tips-grid');
    if (!tipsGrid) return;

    let tips = JSON.parse(localStorage.getItem('tips')) || getDefaultTips();

    tipsGrid.innerHTML = '';
    tips.forEach((tip, index) => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card';
        tipCard.innerHTML = `
            <div class="tip-image">
                ${tip.icon || '👕'}
            </div>
            <div class="tip-content">
                <h3>${tip.title}</h3>
                <p>${tip.description}</p>
                <div class="tip-date">${tip.date || new Date().toLocaleDateString('id-ID')}</div>
            </div>
        `;
        tipsGrid.appendChild(tipCard);
    });
}

function getDefaultTips() {
    return [
        {
            title: "Outfit Monokrom Timeless",
            description: "Kombinasi warna yang sama dari gelap ke terang menciptakan look yang sophisticated dan elegan.",
            icon: "🖤",
            date: "09 Feb 2026"
        },
        {
            title: "Mix Textured Fabrics",
            description: "Padukan kain berbeda (cotton, denim, leather) untuk depth dan visual interest yang lebih tinggi.",
            icon: "✨",
            date: "08 Feb 2026"
        },
        {
            title: "The Rule of Thirds",
            description: "Gunakan 3 warna utama: neutral base, dominant color, dan accent color untuk balance sempurna.",
            icon: "🎨",
            date: "07 Feb 2026"
        },
        {
            title: "Layering Technique",
            description: "Teknik layering bukan hanya hangat, tapi juga bisa membuat outfit lebih kompleks dan interesting.",
            icon: "🧥",
            date: "06 Feb 2026"
        },
        {
            title: "Proportional Balance",
            description: "Jika memakai top oversized, gunakan bottom yang lebih fitted, dan sebaliknya.",
            icon: "⚖️",
            date: "05 Feb 2026"
        },
        {
            title: "Statement Accessories",
            description: "Gunakan 1 aksesori statement bold untuk menambah personality pada outfit minimal.",
            icon: "💍",
            date: "04 Feb 2026"
        }
    ];
}

// Load tips saat page dimuat
document.addEventListener('DOMContentLoaded', function() {
    loadTips();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== ADD TO LOCALSTORAGE FUNCTION (untuk admin) =====
function saveTipsToStorage(tips) {
    localStorage.setItem('tips', JSON.stringify(tips));
    loadTips();
}

// ===== EXPORT FUNCTIONS =====
window.getDefaultTips = getDefaultTips;
window.saveTipsToStorage = saveTipsToStorage;