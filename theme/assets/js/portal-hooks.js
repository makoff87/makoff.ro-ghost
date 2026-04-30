/* Portal + UI hooks for makoff theme */
(function () {
  function onReady(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  onReady(function () {
    // Hook navigation links by label (abonare) to open Ghost Portal signup
    var nav = document.querySelector('.nav');
    if (nav) {
      nav.querySelectorAll('a').forEach(function (a) {
        var label = (a.textContent || '').trim().toLowerCase();
        if (label === 'abonare') {
          a.setAttribute('href', '#');
          a.setAttribute('data-portal', 'signup');
        }
        if (label === 'susține' || label === 'susține-mă' || label === 'sustine-ma' || label === 'sustine-mă') {
          // Ensure it goes to /sustine/
          a.setAttribute('href', '/sustine/');
        }
      });
    }

    // Copy-to-clipboard buttons
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = btn.getAttribute('data-copy');
        var el = targetId ? document.getElementById(targetId) : null;
        var text = el ? (el.value || el.textContent || '').trim() : '';
        if (!text) return;
        (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () {
          btn.textContent = 'copiat';
          setTimeout(function(){ btn.textContent = 'copiază'; }, 1200);
        }).catch(function () {
          // Fallback
          try{
            var ta=document.createElement('textarea');
            ta.value=text; document.body.appendChild(ta);
            ta.select(); document.execCommand('copy');
            document.body.removeChild(ta);
            btn.textContent='copiat';
            setTimeout(function(){ btn.textContent='copiază'; }, 1200);
          }catch(_){}
        });
      });
    });

    // BT folder toggle (if present)
    var btBtns = document.querySelectorAll('[data-toggle="bt-panel"]');
    var btPanel = document.getElementById('bt-panel');
    if (btBtns.length && btPanel) {
      btBtns.forEach(function(btBtn){ btBtn.addEventListener('click', function (e) {
        e.preventDefault();
        btPanel.classList.toggle('is-open');
      });});
    }
  });
})();
