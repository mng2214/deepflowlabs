(function() {
    // 2.1. Блок контекстного меню (в «capture», на всех узлах)
    const prevent = e => { e.preventDefault(); e.stopPropagation(); return false; };
    ['contextmenu'].forEach(ev => {
        window.addEventListener(ev, prevent, {capture: true});
        document.addEventListener(ev, prevent, {capture: true});
        document.documentElement.addEventListener(ev, prevent, {capture: true});
        document.body && document.body.addEventListener(ev, prevent, {capture: true});
    });

    // 2.2. Доп. события копирования/выделения/перетаскивания
    ['copy','cut','paste','selectstart','dragstart'].forEach(ev => {
        document.addEventListener(ev, prevent, {capture: true});
    });

    // 2.3. Блок правой кнопки на mousedown (некоторые браузеры)
    document.addEventListener('mousedown', e => {
        if (e.button === 2) prevent(e);
    }, {capture: true});

    // 2.4. Для изображений — отдельный хук
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('img, svg').forEach(el => {
            el.addEventListener('contextmenu', prevent, {capture: true});
            el.addEventListener('dragstart', prevent, {capture: true});
        });
    });
})();

(function(){
    let pressTimer;
    const clear = () => { if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; } };

    document.addEventListener('touchstart', (e) => {
        // Игнорируем элементы форм, чтобы не ломать UX
        const t = e.target;
        if (t.closest('input, textarea, [contenteditable="true"]')) return;
        pressTimer = setTimeout(() => {
            // долго держал — не даём системе показать меню
            e.preventDefault();
        }, 350); // порог "долгого" тапа
    }, {passive: false, capture: true});

    ['touchend','touchmove','touchcancel'].forEach(ev => {
        document.addEventListener(ev, clear, {capture: true});
    });
})();