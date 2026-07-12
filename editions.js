document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. АВТОМАТИЧЕСКОЕ ВНЕДРЕНИЕ CSS-СТИЛЕЙ НА СТРАНИЦУ
    // =========================================================================
    const styleElement = document.createElement("style");
    styleElement.textContent = `
        /* --- 💠 ПРОДВИНУТЫЙ ДИЗАЙН ПЛАШЕК ИЗДАНИЙ --- */
        .edition-tag {
            display: inline-block;
            font-size: 0.6rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            padding: 4px 10px;
            border-radius: 6px;
            margin-bottom: 8px;
            vertical-align: middle;
            position: relative;
            user-select: none;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }

        /* Эффект блика */
        .edition-tag::before {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 50%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
            transform: skewX(-25deg);
        }

        /* Запуск анимации блика */
        .rec-card:hover .edition-tag::before,
        .game-info-side:hover .edition-tag::before {
            animation: shine 0.75s forwards;
        }

        /* 💠 СТИЛИ ИЗДАНИЙ */
        .edition-tag.deluxe { background: linear-gradient(145deg, #2c3e50, #0f171e); color: #00f2fe; border: 1px solid rgba(0, 242, 254, 0.25); animation: pulse-deluxe 3s infinite alternate; }
        .edition-tag.gold { background: linear-gradient(145deg, #1e1503, #0a0701); color: #f39c12; border: 1px solid rgba(243, 156, 18, 0.35); animation: pulse-gold 3s infinite alternate; }
        .edition-tag.ultimate { background: linear-gradient(145deg, #1a0205, #050001); color: #ff3344; border: 1px solid rgba(255, 51, 68, 0.35); animation: pulse-ultimate 2.5s infinite alternate; }
        .edition-tag.goty { background: linear-gradient(145deg, #0d2319, #030a07); color: #2ecc71; border: 1px solid rgba(46, 204, 113, 0.35); animation: pulse-goty 3.5s infinite alternate; }
        .edition-tag.enchansed { background: linear-gradient(145deg, #232526, #414345); color: #e0e0e0; border: 1px solid rgba(255, 255, 255, 0.2); animation: pulse-enchansed 3s infinite alternate; }
        .edition-tag.premium { background: linear-gradient(145deg, #2b0c02, #0f0300); color: #ff6600; border: 1px solid rgba(255, 102, 0, 0.35); animation: pulse-premium 2.5s infinite alternate; }

        /* --- КЛЮЧЕВЫЕ КАДРЫ АНИМАЦИЙ --- */
        @keyframes shine { 0% { left: -150%; } 100% { left: 150%; } }
        @keyframes pulse-deluxe { 0% { border-color: rgba(0, 242, 254, 0.2); box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 5px rgba(0, 242, 254, 0.1); } 100% { border-color: rgba(0, 242, 254, 0.6); box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 12px rgba(0, 242, 254, 0.3); } }
        @keyframes pulse-gold { 0% { border-color: rgba(243, 156, 18, 0.3); } 100% { border-color: rgba(243, 156, 18, 0.7); box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 15px rgba(243, 156, 18, 0.35); } }
        @keyframes pulse-ultimate { 0% { border-color: rgba(255, 51, 68, 0.3); } 100% { border-color: rgba(255, 51, 68, 0.8); box-shadow: 0 4px 12px rgba(0,0,0,0.6), 0 0 18px rgba(255, 51, 68, 0.45); } }
        @keyframes pulse-goty { 0% { border-color: rgba(46, 204, 113, 0.3); } 100% { border-color: rgba(46, 204, 113, 0.7); box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 15px rgba(46, 204, 113, 0.35); } }
        @keyframes pulse-enchansed { 0% { border-color: rgba(255, 255, 255, 0.1); } 100% { border-color: rgba(255, 255, 255, 0.4); box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 12px rgba(255, 255, 255, 0.2); } }
        @keyframes pulse-premium { 0% { border-color: rgba(255, 102, 0, 0.2); } 100% { border-color: rgba(255, 102, 0, 0.6); box-shadow: 0 4px 12px rgba(0,0,0,0.5), 0 0 15px rgba(255, 102, 0, 0.35); } }

        /* =========================================================================
           🚨 ЖЕСТКОЕ ИСПРАВЛЕНИЕ ГЕОМЕТРИИ КАРТОЧЕК РЕКОМЕНДАЦИЙ
           ========================================================================= */
        .rec-card {
            height: 480px !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
        }

        .rec-img {
            height: 360px !important;
            width: 100% !important;
            object-fit: cover !important;
            flex-shrink: 0 !important;
        }

        .rec-info {
            padding: 12px 18px !important;
            flex-grow: 1 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            height: calc(480px - 310px) !important;
            min-height: 0 !important;
        }

        .rec-title {
            font-size: 0.95rem !important;
            line-height: 1.3 !important;
            margin-bottom: 0 !important;
        }
        
        .rec-footer {
            margin-top: auto !important;
        }
    `;
    document.head.appendChild(styleElement);

    // =========================================================================
    // 2. БАЗА ДАННЫХ ИГР И ИХ ИЗДАНИЙ
    // =========================================================================
    const gamesDatabase = {
        "shf.html": { type: "deluxe", label: "Deluxe Edition" },
        "witcher.html": { type: "enchansed", label: "Enhanced Edition" },
        "witcher2.html": { type: "enchansed", label: "Enhanced Edition" },
        "witcher3.html": { type: "enchansed", label: "Complete Edition" },
        "farcry3.html": { type: "deluxe", label: "Deluxe Edition" },
        "farcry4.html": { type: "gold", label: "Gold Edition" },
        "farcry5.html": { type: "gold", label: "Gold Edition" },
        "farcry6.html": { type: "goty", label: "GOTY Edition" },
        "farcrynd.html": { type: "deluxe", label: "Deluxe Edition" },
        "doomages.html": { type: "premium", label: "Premium Edition" },
        "re5.html": { type: "gold", label: "Gold Edition" },
        "rerev2.html": { type: "deluxe", label: "Deluxe Edition" },
        "atomicult.html": { type: "ultimate", label: "Ultimate Edition" },
        "crimsondesertdeluxe.html": { type: "deluxe", label: "Deluxe Edition" },
        "ds2.html": { type: "deluxe", label: "Deluxe Edition" },
        "mafiatoc.html": { type: "deluxe", label: "Deluxe Edition" },
        "re2.html": { type: "deluxe", label: "Deluxe Edition" },
        "re4.html": { type: "gold", label: "Gold Edition" },
    };
    // Определяем имя текущего файла страницы
    const currentFile = window.location.pathname.split("/").pop() || "index.html";

    // =========================================================================
    // 3. АВТО-ВСТАВКА ПЛАШКИ ДЛЯ ГЛАВНОЙ ИГРЫ
    // =========================================================================
    const mainGameInfo = gamesDatabase[currentFile];
    if (mainGameInfo) {
        const titleHeader = document.querySelector(".game-info-side .info-top h1");
        if (titleHeader) {
            const tag = document.createElement("span");
            tag.className = `edition-tag ${mainGameInfo.type}`;
            tag.textContent = mainGameInfo.label;
            titleHeader.parentNode.insertBefore(tag, titleHeader);
        }
    }

    // =========================================================================
    // 4. АВТО-ВСТАВКА ПЛАШЕК ДЛЯ КАРТОЧЕК РЕКОМЕНДАЦИЙ ВНИЗУ
    // =========================================================================
    const recCards = document.querySelectorAll(".rec-grid .rec-card");
    recCards.forEach(card => {
        const cardLink = card.getAttribute("href");
        const cardGameInfo = gamesDatabase[cardLink];

        if (cardGameInfo) {
            const recTitle = card.querySelector(".rec-title");

            if (recTitle) {
                const tag = document.createElement("span");
                tag.className = `edition-tag ${cardGameInfo.type}`;
                tag.textContent = cardGameInfo.label;

                const wrapper = document.createElement("div");
                recTitle.parentNode.insertBefore(wrapper, recTitle);
                wrapper.appendChild(tag);
                wrapper.appendChild(recTitle);
            }
        }
    });
    // =========================================================================
    // 5. ИНТЕРАКТИВНЫЙ ПЕРЕКЛЮЧАТЕЛЬ ЦЕН ДЛЯ RE2 И RE4
    // =========================================================================
    const localEditionsDatabase = {
        "re2": {
            standard: {
                price: "10 ₽",
                link: "https://funpay.com", // Ссылка на Standard RE2
                features: ["Абсолютно безопасная оффлайн активация", "Все вышедшие патчи уже включены", "Личные сохранения и прохождение без сбросов", "Гарантия и поддержка 24/7"]
            },
            deluxe: {
                price: "25 ₽", 
                link: "https://funpay.com", // Ссылка на Deluxe RE2
                features: ["Все бонусы Standard издания", "Набор костюмов для Леона («Шериф», «Нуар»)", "Набор костюмов для Клэр («Военный», «Нуар», «Эльза Уокер»)", "Оригинальный саундтрек и бонусное оружие «Самурайский дух»"]
            }
        },
        "re4": {
            standard: {
                price: "15 ₽",
                link: "https://funpay.com", // Ссылка на Standard RE4
                features: ["Абсолютно безопасная оффлайн активация", "Все вышедшие патчи и DLC уже включены", "Личные сохранения и прохождение без сбросов", "Гарантия и поддержка 24/7"]
            },
            gold: {
                price: "35 ₽", 
                link: "https://funpay.com", // Ссылка на Gold RE4
                features: ["Все бонусы Standard издания", "Сюжетное дополнение «Separate Ways» (за Аду Вонг)", "Набор Extra DLC Pack (костюмы, фильтры, уникальное оружие)", "Спортивные и классические образы для Леона и Эшли"]
            }
        }
    };

    // Определяем, RE2 или RE4 открыт в браузере
    const pageType = currentFile.includes("re2") ? "re2" : (currentFile.includes("re4") ? "re4" : null);
    const pageData = localEditionsDatabase[pageType];

    const edButtons = document.querySelectorAll('.edition-btn');
    const priceDisplay = document.getElementById('price-display');
    const buyLink = document.getElementById('buy-link');
    const featuresList = document.getElementById('game-features');

    if (pageData && edButtons.length > 0 && priceDisplay && buyLink && featuresList) {
        edButtons.forEach(button => {
            button.addEventListener('click', () => {
                edButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const edType = button.getAttribute('data-edition');
                const data = pageData[edType];

                if (data) {
                    priceDisplay.textContent = data.price;
                    buyLink.href = data.link;

                    featuresList.innerHTML = '';
                    data.features.forEach(feat => {
                        const li = document.createElement('li');
                        li.textContent = feat;
                        featuresList.appendChild(li);
                    });

                    // Динамическая смена цвета плашки над заголовком <h1>
                    const mainTag = document.querySelector(".game-info-side .info-top .edition-tag");
                    if (mainTag) {
                        mainTag.className = "edition-tag"; 
                        
                        if (pageType === "re2") {
                            if (edType === "standard") {
                                mainTag.classList.add("enchansed"); // Серый для стандарта
                                mainTag.textContent = "Standard";
                            } else if (edType === "deluxe") {
                                mainTag.classList.add("deluxe"); // Синий неон для делюкса
                                mainTag.textContent = "Deluxe";
                            }
                        } else if (pageType === "re4") {
                            if (edType === "standard") {
                                mainTag.classList.add("enchansed"); // Серый для стандарта
                                mainTag.textContent = "Standard";
                            } else if (edType === "gold") {
                                mainTag.classList.add("gold"); // Золотой с пульсацией для голды!
                                mainTag.textContent = "Gold";
                            }
                        }
                    }
                }
            });
        });
        // =====================================================================
        // 🚨 ВСТАВЬТЕ ЭТОТ КУСОК СТРОГО СЮДА (АВТО-ПОДХВАТ АКТИВНОГО ИЗДАНИЯ ПРИ СТАРТЕ):
        // =====================================================================
        const activeBtn = document.querySelector('.edition-btn.active');
        const mainTagOnStart = document.querySelector(".game-info-side .info-top .edition-tag");
        
        if (activeBtn && mainTagOnStart) {
            const startEdType = activeBtn.getAttribute('data-edition');
            const startData = pageData[startEdType];
            
            if (startData) {
                // Синхронизируем ссылку на всякий случай
                buyLink.href = startData.link; 
                
                // Перекрашиваем верхнюю плашку под активную кнопку в HTML
                mainTagOnStart.className = "edition-tag"; 
                if (pageType === "re2") {
                    if (startEdType === "standard") {
                        mainTagOnStart.classList.add("enchansed");
                        mainTagOnStart.textContent = "Standard";
                    } else if (startEdType === "deluxe") {
                        mainTagOnStart.classList.add("deluxe");
                        mainTagOnStart.textContent = "Deluxe";
                    }
                } else if (pageType === "re4") {
                    if (startEdType === "standard") {
                        mainTagOnStart.classList.add("enchansed");
                        mainTagOnStart.textContent = "Standard";
                    } else if (startEdType === "gold") {
                        mainTagOnStart.classList.add("gold");
                        mainTagOnStart.textContent = "Gold";
                    }
                }
            }
        }


    }
});