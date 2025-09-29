// GA4 bootstrap
window.gtag = window.gtag || function(){ (window.dataLayer = window.dataLayer || []).push(arguments); };
gtag('js', new Date());
gtag('config', 'G-CHG03GBEXL'); // базовый просмотр

window.trackEvent = function(name, params = {}) {
    if (window.gtag) gtag('event', name, params);
};
