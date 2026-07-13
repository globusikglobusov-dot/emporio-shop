document.addEventListener("DOMContentLoaded", function() {
    // 1. СПИСОК НЕДОСТУПНЫХ ИГР
    const bannedGames = [
        "crimsondesertdeluxe.html",
        "DS.html"
    ];

    const currentPath = window.location.pathname.toLowerCase();

    // 2. БЛОКИРОВКА ГЛАВНОЙ СТРАНИЦЫ ИГРЫ
    const isCurrentBanned = bannedGames.some(game => currentPath.endsWith(game.toLowerCase()));
    if (isCurrentBanned) {
        const orderBtn = document.querySelector('.order-btn');
        if (orderBtn) {
            orderBtn.innerText = "НЕТ В НАЛИЧИИ";
            orderBtn.style.background = "#2d2d33";
            orderBtn.style.borderColor = "#444";
            orderBtn.style.pointerEvents = "none";
        }
    }

    // 3. БЛОКИРОВКА В РЕКОМЕНДАЦИЯХ
    const recCards = document.querySelectorAll('.rec-card');
    
    recCards.forEach(card => {
        const gameLink = card.getAttribute('href');
        if (!gameLink) return;

        const cleanLink = gameLink.toLowerCase();
        const isBanned = bannedGames.some(game => cleanLink.includes(game.toLowerCase()));

        if (isBanned) {
            // Базовые стили для забаненной карточки
            card.style.position = "relative";
            card.style.pointerEvents = "none"; // Отключаем клик по карточке

            // Затемняем картинку
            const img = card.querySelector('.rec-img');
            if (img) {
                img.style.filter = "brightness(0.3) grayscale(30%)";
            }

            // ТУШИМ КНОПКУ "ОСМОТРЕТЬ" / "СМОТРЕТЬ" ВНИЗУ
            const recLink = card.querySelector('.rec-link');
            if (recLink) {
                recLink.style.color = "#444"; // Делаем текст темно-серым
                recLink.style.textShadow = "none";
            }

            // СОЗДАЕМ КРАСНУЮ ПЛАШКУ ПО ЦЕНТРУ КАРТИНКИ
            const badge = document.createElement('div');
            badge.innerHTML = '✖ НЕТ В НАЛИЧИИ ✖';
            badge.style.cssText = `
                position: absolute;
                top: 35%; 
                left: 50%;
                transform: translate(-50%, -50%) rotate(-7deg); 
                background: linear-gradient(135deg, #bd081c, #850511);
                color: #fff;
                font-family: 'Segoe UI', sans-serif;
                font-size: 0.9rem;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding: 12px 25px;
                border-radius: 6px;
                border: 2px solid #ff4a5a;
                box-shadow: 0 10px 25px rgba(0,0,0,0.7), inset 0 0 10px rgba(0,0,0,0.3);
                white-space: nowrap;
                z-index: 10;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
            `;
            card.appendChild(badge);
        }
    });
});