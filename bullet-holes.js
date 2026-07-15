document.addEventListener("DOMContentLoaded", function() {
    // ИНЪЕКЦИЯ СТИЛЕЙ
    const style = document.createElement('style');
    style.textContent = `
        body { position: relative; }
        .bg-logo {
            position: absolute; 
            object-fit: contain;
            z-index: 1; 
            pointer-events: none; 
            opacity: 0.35; 
            filter: drop-shadow(0 6px 12px rgba(0,0,0,0.6)); 
            user-select: none;
        }
        @media (max-width: 1250px) {
            .bg-logo { display: none !important; }
        }
    `;
    document.head.appendChild(style);

    // НАСТРОЙКИ
    const logoSrc = "shot.png"; 
    const logoSize = 83; 
    const contentWidth = 1200; // Фиксированная ширина основного контента

    const leftLayout = [
        { xPct: 0.10, yPct: 0.02, rot: -25 }, { xPct: 0.75, yPct: 0.14, rot: 12 },  
        { xPct: 0.05, yPct: 0.35, rot: -15 }, { xPct: 0.50, yPct: 0.52, rot: 28 },  
        { xPct: 0.85, yPct: 0.68, rot: -8 },  { xPct: 0.15, yPct: 0.82, rot: 22 },  
        { xPct: 0.60, yPct: 0.95, rot: -18 }  
    ];

    const rightLayout = [
        { xPct: 0.65, yPct: 0.05, rot: 18 },  { xPct: 0.12, yPct: 0.20, rot: -30 }, 
        { xPct: 0.80, yPct: 0.38, rot: 8 },   { xPct: 0.25, yPct: 0.47, rot: -22 }, 
        { xPct: 0.05, yPct: 0.62, rot: 15 },  { xPct: 0.70, yPct: 0.78, rot: -12 }, 
        { xPct: 0.30, yPct: 0.93, rot: 25 }   
    ];

    function renderPerfectChaos() {
        document.querySelectorAll('.bg-logo').forEach(el => el.remove());
        
        // 1. Если экран меньше ширины контента + отступы, сразу выходим
        if (window.innerWidth < 1250) return;

        // 2. Считаем ЧЕСТНОЕ доступное пространство для одного бокового поля
        const maxAllowedWidth = (window.innerWidth - contentWidth) / 2;
        
        // Резервируем безопасный отступ в 15px от центрального контента
        const safetyMargin = 15; 
        const usableWidth = maxAllowedWidth - safetyMargin - logoSize;

        // Если картинка физически не пролезает в поле, не рендерим этот хаос
        if (usableWidth <= 0) return;

        const fullPageHeight = document.documentElement.scrollHeight;
        const stepY = 1100; 

        function spawnSide(side, layoutMap) {
            let currentYOffset = 0;
            while (currentYOffset < fullPageHeight) {
                let isFirstBlock = (currentYOffset === 0);
                let randomShiftY = isFirstBlock ? 0 : (Math.random() - 0.5) * 250;

                layoutMap.forEach(point => {
                    let randomShiftX = isFirstBlock ? 0 : (Math.random() - 0.5) * 0.20;
                    let finalXPct = point.xPct + randomShiftX;

                    // Ограничиваем проценты, чтобы не выходить за рамки поля
                    if (finalXPct < 0) finalXPct = 0;
                    if (finalXPct > 1) finalXPct = 1;

                    // 3. Считаем позицию от КРАЯ ЭКРАНА внутрь
                    // Теперь 0% — это самый край экрана, а 100% — граница безопасности у контента
                    let sidePx = safetyMargin + (finalXPct * usableWidth);
                    let topPx = currentYOffset + (point.yPct * (stepY - logoSize)) + randomShiftY;

                    if (topPx > (fullPageHeight - logoSize)) return;
                    if (topPx < 5) topPx = 5;

                    const imgElement = document.createElement('img');
                    imgElement.src = logoSrc;
                    imgElement.classList.add('bg-logo');
                    imgElement.style.top = `${topPx}px`;
                    imgElement.style[side] = `${sidePx}px`;
                    imgElement.style.width = `${logoSize}px`;
                    imgElement.style.height = `${logoSize}px`;
                    imgElement.style.transform = `rotate(${point.rot}deg)`;

                    document.body.appendChild(imgElement);
                });
                currentYOffset += stepY;
            }
        }
        spawnSide('left', leftLayout);
        spawnSide('right', rightLayout);
    }

    renderPerfectChaos();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(renderPerfectChaos, 150);
    });
});