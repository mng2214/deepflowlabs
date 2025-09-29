window.showToast = function(message, type='success', timeout=2800) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.className = '';
    el.textContent = message;
    el.classList.add(type);
    void el.offsetWidth; // reflow
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), timeout);
};
