(function () {
    const link = document.getElementById('emailLink');
    if (!link) return;

    const TO = "info@deepflowlabs.com";
    const SUBJECT = encodeURIComponent("DeepFlowLabs");
    const BODY = encodeURIComponent("");
    const gmailDeepLink = `googlegmail://co?to=${TO}&subject=${SUBJECT}&body=${BODY}`;
    const mailtoLink = `mailto:${TO}?subject=${SUBJECT}&body=${BODY}`;
    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${TO}&su=${SUBJECT}&body=${BODY}`;

    function tryOpen(url, onFail) {
        let done = false;
        const t = setTimeout(() => { if (!done && onFail) onFail(); }, 600);
        window.location.href = url;
        setTimeout(() => { done = true; clearTimeout(t); }, 700);
    }

    link.addEventListener('click', function (e) {
        e.preventDefault();
        tryOpen(gmailDeepLink, () => {
            tryOpen(mailtoLink, () => {
                window.open(gmailWeb, '_blank', 'noopener,noreferrer');
            });
        });
    });
})();