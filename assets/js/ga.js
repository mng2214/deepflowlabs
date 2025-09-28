// GA4 bootstrap (ID уже в index.html через async тег).
// Этот файл добавляет удобную обёртку.
window.gtag = window.gtag || function(){ (window.dataLayer = window.dataLayer || []).push(arguments); };
gtag('js', new Date());
gtag('config', 'G-CHG03GBEXL'); // базовый просмотр

// Хелпер (не обязателен, но удобен)
window.trackEvent = function(name, params = {}) {
    if (window.gtag) gtag('event', name, params);
};
