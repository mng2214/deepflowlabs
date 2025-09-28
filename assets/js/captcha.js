(function (w) {
    function generateCaptcha(length = 6) {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let captcha = '';
        for (let i = 0; i < length; i++) {
            captcha += chars[Math.floor(Math.random() * chars.length)];
        }
        return captcha;
    }

    function initCaptcha() {
        let currentCaptcha = generateCaptcha();
        const captchaText  = document.getElementById('captchaText');
        const refreshBtn   = document.getElementById('refreshCaptcha');
        const captchaInput = document.getElementById('captchaInput');

        if (captchaText) captchaText.textContent = currentCaptcha;

        if (refreshBtn) {
            refreshBtn.addEventListener('click', function () {
                currentCaptcha = generateCaptcha();
                if (captchaText)  captchaText.textContent = currentCaptcha;
                if (captchaInput) captchaInput.value = '';
            });
        }

        return {
            getCurrent: () => currentCaptcha,
            refresh: () => {
                currentCaptcha = generateCaptcha();
                if (captchaText)  captchaText.textContent = currentCaptcha;
                if (captchaInput) captchaInput.value = '';
            },
            validate: (input) => (input || '').trim().toUpperCase() === currentCaptcha
        };
    }

    w.generateCaptcha = generateCaptcha;
    w.initCaptcha = initCaptcha;
})(window);
