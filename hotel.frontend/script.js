window.addEventListener('DOMContentLoaded', () => {
    // ====== Date Range Picker ======
    flatpickr("#date-range", {
        mode: "range",
        locale: "es",
        dateFormat: "d M",
        conjunction: " - ",
        altInput: true,
        altFormat: "d M"
    });

    // ====== Autocompletado de destino ======
    const input = document.getElementById("destination");
    const suggestions = document.getElementById("suggestions");

    input.addEventListener("input", async () => {
        const q = input.value.trim();
        if (q.length < 3) {
            suggestions.innerHTML = "";
            return;
        }

        try {
            const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=5`);
            const data = await res.json();
            suggestions.innerHTML = "";

            data.features.forEach((f) => {
                const desc = f.properties.name + (f.properties.country ? `, ${f.properties.country}` : "");
                const div = document.createElement("div");
                div.textContent = desc;
                div.setAttribute("role", "option");
                div.onclick = () => {
                    input.value = desc;
                    suggestions.innerHTML = "";
                };
                suggestions.appendChild(div);
            });
        } catch (error) {
            console.error("Error al obtener sugerencias:", error);
        }
    });

    // ====== Sección de huéspedes ======
    const guestSection = document.getElementById("guest-section");
    const guestDropdown = document.getElementById("guest-dropdown");
    const guestDisplay = document.getElementById("guest-display");

    const counts = {
        adult: 2,
        child: 0,
        room: 1
    };

    guestSection.addEventListener("click", (e) => {
        guestDropdown.style.display = "block";
        guestSection.setAttribute("aria-expanded", "true");
        e.stopPropagation();
    });

    guestDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", () => {
        guestDropdown.style.display = "none";
        guestSection.setAttribute("aria-expanded", "false");
    });

    window.changeCount = function (type, delta) {
        counts[type] = Math.max(0, counts[type] + delta);
        if (type === "adult" && counts.adult < 1) counts.adult = 1;

        document.getElementById(`${type}-count`).textContent = counts[type];
        guestDisplay.textContent = 
            `${counts.adult} adulto${counts.adult !== 1 ? "s" : ""} · ` +
            `${counts.child} niño${counts.child !== 1 ? "s" : ""} · ` +
            `${counts.room} habitación${counts.room !== 1 ? "es" : ""}`;
    };

    // ====== Conversión de moneda ======
    const rates = {
        USD: 1,
        EUR: 0.92,
        ARS: 1100
    };

    const symbols = {
        USD: 'US$',
        EUR: '€',
        ARS: '$'
    };

    const priceBadges = document.querySelectorAll('.badge-price');
    const currencyBtn = document.getElementById('currency-button');
    const currencyLabel = document.getElementById('currency-label');
    const currencyMenu = document.getElementById('currency-menu');
    const currencySelect = document.getElementById('currency');

    function convertPrices(currency) {
        const rate = rates[currency];
        const symbol = symbols[currency];

        priceBadges.forEach(badge => {
            const usd = parseFloat(badge.dataset.price);
            const converted = (usd * rate).toFixed(2);
            badge.textContent = `${symbol}${converted} por noche`;
        });
    }

    function selectCurrency(currency) {
        currencyLabel.textContent = currency;
        convertPrices(currency);
    }

    currencyBtn.addEventListener('click', () => {
        currencyMenu.classList.toggle('hidden');
    });

    currencyMenu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            const currency = item.dataset.currency;
            const flag = item.dataset.flag;
            currencyBtn.querySelector('img').src = `https://flagcdn.com/${flag}.svg`;
            selectCurrency(currency);
            currencyMenu.classList.add('hidden');
        });
    });

    currencySelect.addEventListener('change', () => {
        const selected = currencySelect.value;
        selectCurrency(selected);
    });

    // Set default currency
    selectCurrency('USD');
});


