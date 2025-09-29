document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const answer = btn.nextElementSibling;
        answer.classList.toggle('open');
    });
});