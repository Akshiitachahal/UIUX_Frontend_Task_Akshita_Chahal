/* ============================================================
   DroneTV — UI interactions
   Navigation delegation, single-select groups (pills/tabs),
   mobile menu, and the login -> dashboard hand-off.
   ============================================================ */
(function () {
  'use strict';

  /* Global navigation: any [data-goto] element switches views;
     plain "#" anchors are neutralised to avoid page jumps. */
  document.addEventListener('click', function (e) {
    var goto = e.target.closest('[data-goto]');
    if (goto) {
      e.preventDefault();
      window.DroneTV.showView(goto.getAttribute('data-goto'));
      return;
    }
    var dead = e.target.closest('a[href="#"]');
    if (dead) e.preventDefault();
  });

  /* Reusable single-select group (filter pills, tabs, etc.) */
  function singleSelect(containerId, itemSelector) {
    var el = document.getElementById(containerId);
    if (!el) return;
    el.addEventListener('click', function (e) {
      var item = e.target.closest(itemSelector);
      if (!item) return;
      el.querySelectorAll(itemSelector).forEach(function (x) {
        x.classList.remove('active');
      });
      item.classList.add('active');
    });
  }
  singleSelect('svcPills', '.pill');
  singleSelect('trnTabs', '.tab');

  /* Login form hands off to the dashboard */
  var form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.DroneTV.showView('dashboard');
    });
  }

  /* Mobile burger menu */
  var burger = document.getElementById('navBurger');
  if (burger) {
    burger.addEventListener('click', function () {
      document.getElementById('navLinks').classList.toggle('open');
    });
  }
})();
