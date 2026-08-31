/* ============================================================
   DroneTV — View router
   Handles switching between site pages (home/services/training)
   and app screens (login/dashboard). Exposes window.DroneTV.
   ============================================================ */
(function () {
  'use strict';

  var PAGE_VIEWS = ['home', 'services', 'training'];

  var siteEl   = document.getElementById('site');
  var homeHero = document.getElementById('homeHero');
  var navbar   = document.querySelector('.navbar');
  var navLinks = document.getElementById('navLinks');

  function isPageView(name) {
    return PAGE_VIEWS.indexOf(name) !== -1;
  }

  function setActiveNav(name) {
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var key = a.getAttribute('data-nav');
      a.classList.toggle('active',
        (name === 'home'     && key === 'home') ||
        (name === 'services' && key === 'services') ||
        (name === 'training' && key === 'training'));
    });
  }

  function showView(name) {
    var isPage = isPageView(name);

    // Whole marketing site is hidden on app screens (login / dashboard)
    siteEl.style.display = isPage ? '' : 'none';

    document.querySelectorAll('.view').forEach(function (v) {
      v.classList.toggle('active', v.getAttribute('data-view') === name);
    });

    if (isPage) {
      // Hero only renders on home; on inner pages the navbar leads
      homeHero.style.display = (name === 'home') ? '' : 'none';
      if (name !== 'home') {
        siteEl.insertBefore(navbar, homeHero);
      } else {
        siteEl.insertBefore(homeHero, navbar);
      }
      setActiveNav(name);
    }

    if (navLinks) navLinks.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  window.DroneTV = { showView: showView, isPageView: isPageView };
})();
