// Database Outfit - Admin bisa tambah/edit/delete
const outfitDatabase = {
    sekolah: {
        cerah: {
            recommendations: [
                {
                    name: "Casual School Vibes",
                    items: ["Kemeja putih", "Celana kaki panjang", "Sneaker putih", "Totebag kanvas"],
                    colors: ["Putih", "Biru", "Hitam"],
                    description: "Kombinasi sempurna untuk hari sekolah yang cerah dan nyaman",
                    mixAndMatch: "Tambahkan denim jacket jika diperlukan"
                },
                {
                    name: "Preppy School Look",
                    items: ["Polo shirt", "Celana chino", "Loafer", "Backpack"],
                    colors: ["Biru", "Putih", "Cokelat"],
                    description: "Tampil rapi dan preppy ke sekolah dengan gaya klasik",
                    mixAndMatch: "Kombinasikan dengan belt untuk tampilannya lebih complete"
                }
            ]
        },
        dingin: {
            recommendations: [
                {
                    name: "Cozy School Outfit",
                    items: ["Sweater oversized", "Celana panjang", "Boot kasual", "Scarf wool"],
                    colors: ["Abu-abu", "Cokelat", "Krem"],
                    description: "Tetap hangat dan stylish di cuaca dingin",
                    mixAndMatch: "Lapisi dengan jaket puffer di luar sweater"
                }
            ]
        },
        hujan: {
            recommendations: [
                {
                    name: "Rainy Day Chic",
                    items: ["Jaket waterproof", "Celana jeans", "Waterproof boots", "Umbrella"],
                    colors: ["Hitam", "Abu-abu", "Putih"],
                    description: "Tetap dry dan stylish meski hujan",
                    mixAndMatch: "Gunakan boot waterproof yang trendy"
                }
            ]
        }
    },
    hangout: {
        cerah: {
            recommendations: [
                {
                    name: "Casual Hangout",
                    items: ["T-shirt grafis", "Celana denim ripped", "Sneaker", "Crossbody bag"],
                    colors: ["Hitam", "Biru", "Putih"],
                    description: "Santai dan trendy untuk hangout dengan teman",
                    mixAndMatch: "Tambahkan sunglasses untuk proteksi mata"
                },
                {
                    name: "Streetwear Vibes",
                    items: ["Oversized hoodie", "Cargo pants", "High-top sneaker", "Bucket hat"],
                    colors: ["Abu-abu", "Khaki", "Putih"],
                    description: "Gaya street style yang santai namun statement",
                    mixAndMatch: "Pairing dengan crossbody bag berwarna bold"
                }
            ]
        },
        malam: {
            recommendations: [
                {
                    name: "Night Casual",
                    items: ["Sweater", "Black jeans", "Loafer", "Backpack"],
                    colors: ["Hitam", "Putih", "Biru"],
                    description: "Nyaman tapi tetap cool untuk hangout malam",
                    mixAndMatch: "Tambahkan beanie atau cap untuk extra vibe"
                }
            ]
        }
    },
    pesta: {
        cerah: {
            recommendations: [
                {
                    name: "Party Ready",
                    items: ["Dress atau baju pesta", "Heels atau formal shoes", "Clutch bag", "Aksesori"],
                    colors: ["Merah", "Emas", "Hitam"],
                    description: "Tampil glamor dan eye-catching untuk pesta",
                    mixAndMatch: "Kombinasikan dengan hair accessories dan jewelry elegant"
                }
            ]
        },
        malam: {
            recommendations: [
                {
                    name: "Evening Glamour",
                    items: ["Cocktail dress", "High heels", "Beaded clutch", "Statement necklace"],
                    colors: ["Hitam", "Silver", "Gold"],
                    description: "Tampilan mewah dan sophisticated untuk pesta malam",
                    mixAndMatch: "Tambahkan shawl atau bolero untuk layer"
                }
            ]
        }
    },
    formal: {
        cerah: {
            recommendations: [
                {
                    name: "Business Formal",
                    items: ["Blazer", "Kemeja putih", "Celana formal", "Sepatu formal", "Dasi/scarf"],
                    colors: ["Hitam", "Putih", "Abu-abu"],
                    description: "Profesional dan elegan untuk acara formal",
                    mixAndMatch: "Tambahkan pocket square atau watch untuk detail"
                }
            ]
        }
    },
    olahraga: {
        cerah: {
            recommendations: [
                {
                    name: "Athletic Look",
                    items: ["Sport top", "Leggings/shorts", "Sports shoes", "Sports bag"],
                    colors: ["Hitam", "Biru", "Putih"],
                    description: "Comfortable dan functional untuk olahraga",
                    mixAndMatch: "Tambahkan sweatband dan sports watch"
                }
            ]
        }
    }
};

// Function untuk get rekomendasi outfit
function getOutfitRecommendation(activity, color, weather) {
    const activityData = outfitDatabase[activity];
    if (!activityData) return null;

    const weatherData = activityData[weather];
    if (!weatherData) {
        // Fallback ke data pertama jika weather tidak ditemukan
        const firstWeather = Object.keys(activityData)[0];
        return activityData[firstWeather].recommendations[0];
    }

    // Pilih rekomendasi random dari yang tersedia
    const recommendations = weatherData.recommendations;
    const outfit = recommendations[Math.floor(Math.random() * recommendations.length)];

    return outfit;
}

// Function untuk generate hasil rekomendasi HTML
function generateRecommendationHTML(outfit, color) {
    if (!outfit) {
        return `<p style="color: red;">Maaf, rekomendasi tidak ditemukan. Coba kombinasi lain!</p>`;
    }

    let html = `
        <div class="recommendation-result">
            <h3>✨ ${outfit.name}</h3>
            <p class="description">${outfit.description}</p>
            
            <div class="outfit-items">
                <h4>Item yang Direkomendasikan:</h4>
                <ul>
    `;

    outfit.items.forEach(item => {
        html += `<li>🧥 ${item}</li>`;
    });

    html += `
                </ul>
            </div>

            <div class="outfit-colors">
                <h4>Palet Warna:</h4>
                <div class="color-palette">
    `;

    outfit.colors.forEach(c => {
        html += `<span class="color-swatch" title="${c}">${c}</span>`;
    });

    html += `
                </div>
            </div>

            <div class="mix-match">
                <h4>💡 Tips Mix & Match:</h4>
                <p>${outfit.mixAndMatch}</p>
            </div>
        </div>
    `;

    return html;
}

// Handle Quick Recommendation Form
document.addEventListener('DOMContentLoaded', function() {
    const quickForm = document.getElementById('quick-form');
    if (quickForm) {
        quickForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const activity = document.querySelector('select[name="activity"]').value;
            const weather = document.querySelector('select[name="weather"]').value;
            const color = document.querySelector('input[name="color"]').value;

            if (activity === 'Pilih Aktivitas' || weather === 'Pilih Cuaca') {
                alert('Silakan pilih semua field terlebih dahulu!');
                return;
            }

            const outfit = getOutfitRecommendation(activity, color, weather);
            const resultDiv = document.getElementById('quick-result');
            resultDiv.innerHTML = generateRecommendationHTML(outfit, color);
            resultDiv.classList.add('show');
        });
    }
});