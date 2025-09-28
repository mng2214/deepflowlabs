// Главная кнопка "Get Started Today" — как у тебя, с GA и открытием Telegram
window.startInTelegram = function () {
    if (window.gtag) {
        gtag('event', 'cta_click', {
            event_category: 'cta',
            event_label: 'telegram_start'
        });
    }
    window.open('https://t.me/mngartur', '_blank');
};
