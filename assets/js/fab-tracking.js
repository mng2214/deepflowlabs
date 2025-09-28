// Трекинг плавающих кнопок (Telegram/Email) внизу
document.addEventListener('DOMContentLoaded', function () {
    const fabTg   = document.querySelector('.floating-btn.telegram');
    const fabMail = document.querySelector('.floating-btn.email');

    fabTg?.addEventListener('click', () => {
        window.gtag && gtag('event', 'cta_click', {
            event_category: 'cta',
            event_label: 'telegram_fab'
        });
    });

    fabMail?.addEventListener('click', () => {
        window.gtag && gtag('event', 'cta_click', {
            event_category: 'cta',
            event_label: 'email_fab'
        });
    });
});
