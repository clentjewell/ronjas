/* ==========================================================================
   Wildlight Wellness — site.js
   Two jobs only: the mobile navigation toggle, and the contact form handler.
   No dependencies, no build step. Loaded with `defer` on every page.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. Mobile navigation
        Opens/closes the collapsed nav, and closes again when a link is
        clicked or Escape is pressed. Above the 54em breakpoint the CSS
        forces the nav open, so the button is hidden and inert.
     ------------------------------------------------------------------ */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('primary-nav');

  function setNav(open) {
    if (!toggle || !nav) return;
    nav.setAttribute('data-open', open ? 'true' : 'false');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('[data-nav-toggle-label]').textContent = open ? 'Close' : 'Menu';
  }

  function navIsOpen() {
    return !!nav && nav.getAttribute('data-open') === 'true';
  }

  if (toggle && nav) {
    setNav(false);

    toggle.addEventListener('click', function () {
      setNav(!navIsOpen());
    });

    // Close after following an in-page or cross-page link.
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNav(false);
    });

    // Escape closes the menu and returns focus to the button.
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' && event.key !== 'Esc') return;
      if (!navIsOpen()) return;
      setNav(false);
      toggle.focus();
    });
  }

  /* ------------------------------------------------------------------
     1b. Back-to-top
        Hidden until the visitor is a screen or so down the page.
     ------------------------------------------------------------------ */
  var toTop = document.querySelector('[data-to-top]');
  if (toTop) {
    var syncToTop = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      toTop.classList.toggle('is-visible', y > window.innerHeight * 0.6);
    };
    syncToTop();
    window.addEventListener('scroll', syncToTop, { passive: true });
    toTop.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------------------
     2. Contact form
        There is no backend. The handler validates with the browser's own
        constraint validation, then reveals an inline success message and
        resets the fields.

        >>> WIRE UP A REAL ENDPOINT HERE <<<
        Replace the body of `sendEnquiry()` below with a call to whatever
        service you use (Formspree, Netlify Forms, Basin, your own API...).
        It must return a Promise. Example:

            function sendEnquiry(data) {
              return fetch('https://example.com/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              }).then(function (response) {
                if (!response.ok) throw new Error('Request failed');
                return response;
              });
            }

        Then also set the <form> element's `action` and `method` in
        contact.html so the form still works without JavaScript.
     ------------------------------------------------------------------ */
  var form = document.querySelector('[data-contact-form]');
  var status = document.querySelector('[data-form-status]');

  function sendEnquiry(data) {
    // Placeholder: pretends the message was delivered. Swap this out.
    if (window.console && console.info) {
      console.info('[Wildlight Wellness] Demo form submission — not sent anywhere:', data);
    }
    return Promise.resolve(data);
  }

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Let the browser surface its own validation messages first.
      if (typeof form.reportValidity === 'function' && !form.reportValidity()) return;

      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });

      var submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      sendEnquiry(data)
        .then(function () {
          var name = (data.name || '').trim().split(' ')[0];
          status.querySelector('[data-form-status-name]').textContent = name ? ', ' + name : '';
          status.classList.add('is-visible');
          status.setAttribute('tabindex', '-1');
          status.focus();
          form.reset();
        })
        .catch(function () {
          status.querySelector('[data-form-status-name]').textContent = '';
          status.classList.add('is-visible');
        })
        .then(function () {
          if (submitButton) submitButton.disabled = false;
        });
    });

    // Hide the confirmation again as soon as the visitor starts a new message.
    form.addEventListener('input', function () {
      status.classList.remove('is-visible');
    });
  }
})();
