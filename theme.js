/* 主題切換：A 深色、B 米白卡（預設）、C 淺色、P 像素。選擇存在 localStorage，四個頁面共用 */
(function () {
  var KEY = 'mm-theme';
  var THEMES = [
    ['a', '深色', '#101d5e'],
    ['b', '米白卡', '#f7f2e4'],
    ['c', '淺色', '#ffffff'],
    ['p', '像素', '#0a1650'],
  ];
  var current = 'b';
  try { current = localStorage.getItem(KEY) || 'b'; } catch (e) {}
  if (!THEMES.some(function (t) { return t[0] === current; })) current = 'b';
  document.documentElement.setAttribute('data-theme', current);

  function build() {
    var wrap = document.createElement('div');
    wrap.className = 'mm-switch';
    var menu = document.createElement('div');
    menu.className = 'mm-menu';
    menu.id = 'mm-menu';

    THEMES.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.dataset.theme = t[0];
      b.innerHTML = '<i style="background:' + t[2] + '"></i>' + t[0].toUpperCase() + '<span>' + t[1] + '</span>';
      b.addEventListener('click', function () { apply(t[0]); wrap.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
      menu.appendChild(b);
    });

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mm-toggle';
    toggle.setAttribute('aria-label', '切換主題');
    toggle.setAttribute('aria-controls', 'mm-menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<svg viewBox="0 0 10 10" aria-hidden="true"><path fill="#f8e060" d="M3 1h4v1H3zM2 2h1v1H2zM7 2h1v1H7zM1 3h1v4H1zM8 3h1v4H8zM2 7h1v1H2zM7 7h1v1H7zM3 8h4v1H3z"/><path fill="#f8e060" d="M5 2h2v1H5zM5 3h3v4H5zM5 7h2v1H5z"/></svg>';
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = wrap.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) { wrap.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });

    wrap.appendChild(menu);
    wrap.appendChild(toggle);
    document.body.appendChild(wrap);
    mark();
  }

  function mark() {
    document.querySelectorAll('.mm-switch .mm-menu button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.theme === current ? 'true' : 'false');
    });
  }

  function apply(t) {
    current = t;
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(KEY, t); } catch (e) {}
    mark();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
