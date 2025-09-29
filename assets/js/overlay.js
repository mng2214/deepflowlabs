(function initOverlayStyles(){
    const css = `
  :root { --brand: #0ea5e9;

  #screen-blocker {
    position: fixed; inset: 0; display: none;
    align-items: center; justify-content: center;
    background: rgba(3, 7, 18, 0.35);
    backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    z-index: 4000; pointer-events: all;
  }
  #screen-blocker.show { display: flex; }

  .overlay-card {
    min-width: 260px; max-width: 90vw;
    background: rgba(17, 24, 39, 0.9);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 20px 22px;
    box-shadow: 0 20px 60px rgba(0,0,0,.35);
    color: #fff; text-align: center;
    transform: translateY(8px); opacity: 0;
    transition: transform .25s ease, opacity .25s ease;
  }
  .overlay-card.in { transform: translateY(0); opacity: 1; }

  .spinner {
    width: 42px; height: 42px; margin: 6px auto 10px;
    border: 3px solid rgba(255,255,255,0.25);
    border-top-color: var(--brand);
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

.checkmark {
  width: 48px; height: 48px; margin: 6px auto 10px;
  border-radius: 50%; border: 2px solid var(--brand);
  display: flex; align-items: center; justify-content: center;
  position: relative; opacity: 0; transform: scale(.9);
  transition: transform .25s ease, opacity .25s ease;
}

.checkmark:after {
  content: '';
  width: 14px;
  height: 24px;
  border-right: 3px solid var(--brand);
  border-bottom: 3px solid var(--brand);
  transform: rotate(45deg);
  transform-origin: center;

}

  .checkmark.show { opacity:1; transform: scale(1); }

  .cross {
    width: 48px; height: 48px; margin: 6px auto 10px;
    position: relative; opacity:.95;
  }
  .cross:before, .cross:after{
    content:''; position:absolute; top:0; left:22px; width:3px; height:48px;
    background:#ef4444; border-radius:2px;
  }
  .cross:before{ transform: rotate(45deg); }
  .cross:after { transform: rotate(-45deg); }

  .overlay-text { font-weight:600; letter-spacing:.2px; }`;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
})();

(function initOverlayDom(){
    if (document.getElementById('screen-blocker')) return;
    const root = document.createElement('div');
    root.id = 'screen-blocker';
    root.innerHTML = `
    <div class="overlay-card" id="overlayCard">
      <div id="overlayIcon" class="spinner"></div>
      <div id="overlayText" class="overlay-text">Sending…</div>
    </div>
  `;
    document.body.appendChild(root);
})();

function setScrollBlocked(block) {
    if (block) {
        // сохраняем текущую позицию, чтобы не «скакало»
        const y = window.scrollY || document.documentElement.scrollTop;
        document.body.dataset.scrollY = String(y);
        document.body.style.top = `-${y}px`;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
    } else {
        const y = parseInt(document.body.dataset.scrollY || '0', 10);
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, y);
    }
}

window.showOverlay = function(state='loading', text='Sending…') {
    const blocker = document.getElementById('screen-blocker');
    const card    = document.getElementById('overlayCard');
    const icon    = document.getElementById('overlayIcon');
    const label   = document.getElementById('overlayText');

    if (!blocker || !card || !icon || !label) return;

    // иконка по состоянию
    icon.className = '';
    if (state === 'loading') icon.className = 'spinner';
    if (state === 'success') icon.className = 'checkmark';
    if (state === 'error')   icon.className = 'cross';

    label.textContent = text;

    blocker.classList.add('show');
    requestAnimationFrame(() => card.classList.add('in'));
    if (state === 'success') requestAnimationFrame(() => icon.classList.add('show'));

    setScrollBlocked(true);
};

window.hideOverlay = function() {
    const blocker = document.getElementById('screen-blocker');
    const card    = document.getElementById('overlayCard');
    if (!blocker || !card) return;
    card.classList.remove('in');
    setTimeout(() => {
        blocker.classList.remove('show');
        setScrollBlocked(false);
    }, 200);
};
