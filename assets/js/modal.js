document.addEventListener('DOMContentLoaded', function() {
    const modal         = document.getElementById('contactModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const contactForm   = document.getElementById('contactForm');

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdkweord';

    const captcha = window.initCaptcha();

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        captcha.refresh();
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    closeModalBtn?.addEventListener('click', closeModal);
    window.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    window.openContactModal = openModal;

    function clearErrors() {
        contactForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        contactForm.querySelectorAll('.error-text').forEach(el => el.remove());
    }
    function markError(input, msg) {
        if (!input) return;
        input.classList.add('input-error');
        if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-text')) {
            const small = document.createElement('div');
            small.className = 'error-text';
            small.textContent = msg || 'Please fill this field';
            input.parentNode.appendChild(small);
        }
    }
    contactForm?.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', () => {
            el.classList.remove('input-error');
            if (el.nextElementSibling && el.nextElementSibling.classList.contains('error-text')) {
                el.nextElementSibling.remove();
            }
        });
    });

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());
    }

    contactForm?.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors();

        const formData = new FormData(contactForm);
        const name    = formData.get('name');
        const email   = formData.get('email');
        const phone   = formData.get('phone');
        const project = formData.get('project');
        const captchaInput = document.getElementById('captchaInput').value;

        let hasError = false;
        if (!name)    { markError(document.getElementById('name'), 'Enter your name'); hasError = true; }
        if (!email)   { markError(document.getElementById('email'), 'Enter your email'); hasError = true; }
        else if (!isValidEmail(email)) { markError(document.getElementById('email'), 'Email looks invalid'); hasError = true; }
        if (!project) { markError(document.getElementById('project'), 'Tell us about the project'); hasError = true; }

        if (!captcha || !captcha.validate(captchaInput)) {
            markError(document.getElementById('captchaInput'), 'Wrong CAPTCHA');
            captcha.refresh();
            hasError = true;
        }

        if (hasError) return;

        console.log('Form submitted:', { name, email, phone, project });

        const submitBtn   = contactForm.querySelector('button[type="submit"]');
        const prevBtnHtml = submitBtn ? submitBtn.innerHTML : null;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending…</span><i class="fas fa-spinner fa-spin" style="margin-left:8px"></i>';
        }

        window.showOverlay && showOverlay('loading', 'Sending…');

        let sendOk = false;
        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            sendOk = res.ok;
            if (!res.ok) console.error('Formspree error:', await res.text());
        } catch (err) {
            console.error('Network error:', err);
        }

        if (window.gtag) {
            if (sendOk) {
                gtag('event', 'lead', { event_category: 'form', event_label: 'contact_form', value: 1 });
            } else {
                gtag('event', 'lead_error', { event_category: 'form', event_label: 'contact_form' });
            }
        }

        if (sendOk) {
            showOverlay('success', 'All set! Sent ✔');
            setTimeout(() => {
                hideOverlay();
                // восстановление UI + reset/close
                if (submitBtn && prevBtnHtml !== null) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = prevBtnHtml;
                }
                contactForm.reset();
                captcha.refresh();
                closeModal();
            }, 1500);
        } else {
            showOverlay('error', 'Submission failed');
            setTimeout(() => {
                hideOverlay();
                if (submitBtn && prevBtnHtml !== null) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = prevBtnHtml;
                }
            }, 1500);
        }
    });
});
