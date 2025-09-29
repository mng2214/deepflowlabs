// Анимации появления и поведение header при скролле
document.addEventListener('DOMContentLoaded', function () {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Для timeline-item — задержка (как у тебя в исходнике)
                if (entry.target.classList.contains('timeline-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    setTimeout(() => { entry.target.classList.add('visible'); }, delay);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .timeline-item').forEach(el => observer.observe(el));

    // Шапка при скролле
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        if (!header) return;
        if (window.scrollY > 100) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
});

(function(){
    const menu = document.getElementById('mobileMenu');
    const openBtn = document.getElementById('hamburger');
    const closeBtn = document.getElementById('mobileClose');
    const links = menu.querySelectorAll('.nav-link');

    function openMenu() {
        menu.classList.add('open');
        openBtn.classList.add('open');
        openBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // блокируем скролл фона
    }
    function closeMenu() {
        menu.classList.remove('open');
        openBtn.classList.remove('open');
        openBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', () => {
        menu.classList.contains('open') ? closeMenu() : openMenu();
    });
    closeBtn.addEventListener('click', closeMenu);
    links.forEach(a => a.addEventListener('click', closeMenu));

    // Закрытие по свайпу влево (лайт-версия)
    let startX = null;
    menu.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    menu.addEventListener('touchend', e => {
        if (startX !== null && startX - e.changedTouches[0].clientX > 60) closeMenu();
        startX = null;
    });
})();
