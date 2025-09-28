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
