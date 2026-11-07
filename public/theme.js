// Theme handling. Loaded as an external, render-blocking script in <head>
// so the stored theme is applied before first paint (no flash) while the
// CSP stays at script-src 'self' with no inline code.
//
// Without a stored choice, no data-theme attribute is set and CSS follows
// prefers-color-scheme. A stored choice ("light" or "dark") overrides it.
// The preference lives in localStorage only. No cookies.
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function readStored() {
    try {
      var value = localStorage.getItem(KEY);
      return value === 'light' || value === 'dark' ? value : null;
    } catch (e) {
      return null; // storage blocked; fall back to system preference
    }
  }

  function systemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function effectiveTheme() {
    return root.getAttribute('data-theme') || systemTheme();
  }

  var stored = readStored();
  if (stored) root.setAttribute('data-theme', stored);

  function syncButton(button) {
    var dark = effectiveTheme() === 'dark';
    button.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme-toggle');
    if (!button) return;

    // The button ships hidden so it never appears when this script fails.
    button.hidden = false;
    syncButton(button);

    button.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {
        /* storage blocked; the choice lasts for this page view only */
      }
      syncButton(button);
    });

    // Keep the pressed state accurate if the OS theme changes while no
    // explicit choice is stored.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () {
        syncButton(button);
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
    }
  });
})();
