/* ==================================================================
   main.js — every interaction on the site.
   ------------------------------------------------------------------
   No framework, no build step. Each block below is independent and
   bails out early if the markup it needs is not on the page, so the
   same file is safe to load on every page.

     01  Utilities
     02  Sticky header
     03  Mega menu
     04  Mobile drawer
     05  Search dialog
     06  Cookie banner & preferences
     07  People search
     08  Insights filtering
     09  Offices filtering
     10  Services tabs
     11  Form validation
     12  Scroll reveal, back-to-top, copy link
   ================================================================== */
(function () {
  'use strict';

  var DATA = window.WC_DATA || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ----------------------------------------------------------------
     01  Utilities
     ---------------------------------------------------------------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w.charAt(0); }).slice(0, 2).join('');
  }

  function formatDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* A short-lived notification, used for "link copied" and placeholders. */
  var toastEl = null;
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      toastEl.style.cssText =
        'position:fixed;left:50%;bottom:2rem;transform:translateX(-50%) translateY(150%);' +
        'background:#1b1b1b;color:#fff;padding:.9rem 1.35rem;border-radius:2px;font-size:.9rem;' +
        'z-index:1400;box-shadow:0 12px 40px -16px rgba(0,0,0,.6);transition:transform .3s ease,max-width .3s ease;' +
        'max-width:min(90vw,420px);text-align:center';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    requestAnimationFrame(function () {
      toastEl.style.transform = 'translateX(-50%) translateY(0)';
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.style.transform = 'translateX(-50%) translateY(150%)';
    }, 3200);
  }

  /* Keep Tab inside an open dialog. */
  function trapFocus(dialog, e) {
    var focusables = $$(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      dialog
    ).filter(function (el) { return el.offsetParent !== null; });
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function openDialog(dialog) {
    if (!dialog) return;
    dialog.classList.add('is-open');
    document.body.classList.add('is-locked');
    var target = $('input, button, [href]', dialog);
    if (target) setTimeout(function () { target.focus(); }, 40);
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    dialog.classList.remove('is-open');
    if (!$$('.dialog.is-open').length) document.body.classList.remove('is-locked');
  }

  /* ----------------------------------------------------------------
     02  Sticky header shadow
     ---------------------------------------------------------------- */
  function initHeader() {
    var header = $('#site-header');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ----------------------------------------------------------------
     03  Mega menu
     ---------------------------------------------------------------- */
  function initMega() {
    var triggers = $$('[data-mega]');
    var panels = $$('[data-mega-panel]');
    var scrim = $('[data-mega-scrim]');
    if (!triggers.length || !panels.length) return;

    var current = null;
    var closeTimer = null;

    function open(id) {
      closeTimer = null;
      if (current === id) return;
      close();
      var panel = $('[data-mega-panel="' + id + '"]');
      if (!panel) return;
      panel.hidden = false;
      // Force a reflow so the transition actually runs.
      void panel.offsetWidth;
      panel.classList.add('is-open');
      if (scrim) { scrim.hidden = false; scrim.classList.add('is-open'); }
      triggers.forEach(function (t) {
        t.setAttribute('aria-expanded', String(t.dataset.mega === id));
      });
      current = id;
    }

    function close() {
      if (!current) return;
      var panel = $('[data-mega-panel="' + current + '"]');
      if (panel) {
        panel.classList.remove('is-open');
        // Keep it out of the tab order once the transition has finished.
        setTimeout(function () { if (!panel.classList.contains('is-open')) panel.hidden = true; }, 220);
      }
      if (scrim) {
        scrim.classList.remove('is-open');
        setTimeout(function () { if (!scrim.classList.contains('is-open')) scrim.hidden = true; }, 220);
      }
      triggers.forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
      current = null;
    }

    triggers.forEach(function (trigger) {
      var id = trigger.dataset.mega;
      trigger.addEventListener('mouseenter', function () { open(id); });
      trigger.addEventListener('focus', function () { open(id); });
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        if (current === id) { close(); } else { open(id); }
      });
      var li = trigger.closest('li');
      if (li) {
        li.addEventListener('mouseenter', function () { open(id); });
        li.addEventListener('mouseleave', function () {
          closeTimer = setTimeout(close, 180);
        });
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && current) { close(); }
    });
    if (scrim) scrim.addEventListener('click', close);

    // Leaving the header entirely closes the panel.
    var header = $('#site-header');
    if (header) {
      header.addEventListener('mouseleave', function () {
        closeTimer = setTimeout(close, 180);
      });
      header.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
    }
  }

  /* ----------------------------------------------------------------
     04  Mobile drawer
     ---------------------------------------------------------------- */
  function initDrawer() {
    var drawer = $('#drawer');
    if (!drawer) return;
    var openBtn = $('[data-drawer-open]');
    var closeBtn = $('[data-drawer-close]');

    function setOpen(state) {
      drawer.classList.toggle('is-open', state);
      drawer.setAttribute('aria-hidden', String(!state));
      if (openBtn) openBtn.setAttribute('aria-expanded', String(state));
      document.body.classList.toggle('is-locked', state);
    }

    if (openBtn) openBtn.addEventListener('click', function () { setOpen(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });

    // Accordion behaviour inside the drawer.
    $$('.acc__trigger', drawer).forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        var panel = trigger.nextElementSibling;
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.classList.toggle('is-open', !expanded);
      });
    });
  }

  /* ----------------------------------------------------------------
     05  Search dialog
     ---------------------------------------------------------------- */
  function initSearch() {
    var dialog = $('#search-dialog');
    if (!dialog) return;

    $$('[data-search-open]').forEach(function (btn) {
      btn.addEventListener('click', function () { openDialog(dialog); });
    });
    $$('[data-search-close]', dialog).forEach(function (btn) {
      btn.addEventListener('click', function () { closeDialog(dialog); });
    });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) closeDialog(dialog);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDialog(dialog);
      if (e.key === 'Tab' && dialog.classList.contains('is-open')) trapFocus(dialog, e);
    });

    var form = $('[data-search-form]', dialog);
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var q = ($('input', form) || {}).value || '';
        closeDialog(dialog);
        // The prototype has no index to search, so we route to the closest section.
        var term = q.trim().toLowerCase();
        var target = 'insights.html';
        if (/arbitrat|litigat|dispute/.test(term)) target = 'services.html#practices';
        else if (/finance|financ|bank|debt/.test(term)) target = 'services.html#practices';
        else if (/lawyer|partner|people|attorney/.test(term)) target = 'people.html';
        else if (/office|location/.test(term)) target = 'locations.html';
        else if (/job|career|intern|graduat/.test(term)) target = 'careers.html';
        toast('Prototype search: sending you to ' + target.split('#')[0]);
        setTimeout(function () { window.location.href = target; }, 900);
      });
    }
  }

  /* ----------------------------------------------------------------
     06  Cookie banner & preferences
     ---------------------------------------------------------------- */
  function initCookies() {
    var banner = $('#cookie-banner');
    var prefs = $('#cookie-prefs');
    if (!banner) return;

    var KEY = 'wc-replica-cookie-consent';

    function readConsent() {
      try { return window.localStorage.getItem(KEY); } catch (err) { return null; }
    }
    function writeConsent(value) {
      try { window.localStorage.setItem(KEY, value); } catch (err) { /* private mode */ }
    }

    if (!readConsent()) {
      setTimeout(function () { banner.classList.add('is-visible'); }, 700);
    }

    function acceptAll() {
      writeConsent(JSON.stringify({ necessary: true, performance: true, targeting: true }));
      banner.classList.remove('is-visible');
      closeDialog(prefs);
      toast('Cookie preferences saved.');
    }

    function rejectAll() {
      writeConsent(JSON.stringify({ necessary: true, performance: false, targeting: false }));
      banner.classList.remove('is-visible');
      closeDialog(prefs);
    }

    $$('[data-cookie-accept]').forEach(function (b) { b.addEventListener('click', acceptAll); });
    $$('[data-cookie-reject], [data-prefs-reject]').forEach(function (b) { b.addEventListener('click', rejectAll); });

    $$('[data-cookie-settings]').forEach(function (b) {
      b.addEventListener('click', function () {
        banner.classList.remove('is-visible');
        openDialog(prefs);
      });
    });
    $$('[data-prefs-close], [data-prefs-cancel]').forEach(function (b) {
      b.addEventListener('click', function () { closeDialog(prefs); });
    });
    $$('[data-prefs-save]').forEach(function (b) {
      b.addEventListener('click', function () {
        writeConsent(JSON.stringify({
          necessary: true,
          performance: ($('#pref-performance') || {}).checked === true,
          targeting: ($('#pref-targeting') || {}).checked === true
        }));
        closeDialog(prefs);
        toast('Cookie preferences saved.');
      });
    });
    if (prefs) {
      prefs.addEventListener('click', function (e) { if (e.target === prefs) closeDialog(prefs); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDialog(prefs);
        if (e.key === 'Tab' && prefs.classList.contains('is-open')) trapFocus(prefs, e);
      });
    }
  }

  /* ----------------------------------------------------------------
     07  People search
     ---------------------------------------------------------------- */
  function initPeople() {
    var container = $('#people-results');
    if (!container || !DATA.lawyers) return;

    var search = $('#people-search');
    var practice = $('#people-practice');
    var office = $('#people-office');
    var countEl = $('#people-count');
    var reset = $('#people-reset');
    var lawyers = DATA.lawyers;

    // Populate the selects from the data so the options can never drift.
    function fill(select, values) {
      if (!select) return;
      values
        .filter(function (v, i, a) { return a.indexOf(v) === i; })
        .sort()
        .forEach(function (v) {
          var opt = document.createElement('option');
          opt.value = v;
          opt.textContent = v;
          select.appendChild(opt);
        });
    }
    // The dropdowns carry the whole practice list and every office, not
    // just the one the directory happens to hold.
    fill(practice, (DATA.practices || []).map(function (p) { return p.name; }));
    fill(office, (DATA.offices || []).map(function (o) { return o.city; }));

    // The directory is searched by name. Any part of a name matches, so
    // "hug", "hughes" and "jeff h" all find the same person.
    function haystack(l) {
      return [l.name, l.title, l.practice, l.industry, l.office, l.focus, l.languages]
        .join(' ')
        .toLowerCase();
    }

    function render() {
      var q = ((search && search.value) || '').trim().toLowerCase();
      var p = (practice && practice.value) || '';
      var o = (office && office.value) || '';

      // Nothing searched and nothing selected: the directory stays empty
      // rather than showing the whole list.
      if (!q && !p && !o) {
        if (countEl) countEl.textContent = 'Search to begin';
        container.innerHTML =
          '<p class="empty">Search the directory by name to find a lawyer — a surname, or part ' +
          'of one, is enough.</p>';
        return;
      }

      var rows = lawyers.filter(function (l) {
        if (p && l.practice !== p) return false;
        if (o && l.office !== o) return false;
        if (!q) return true;
        return haystack(l).indexOf(q) !== -1;
      });

      if (countEl) {
        countEl.textContent = rows.length
          ? rows.length + (rows.length === 1 ? ' lawyer matches' : ' lawyers match') + ' your search'
          : 'No matching lawyer';
      }

      if (!rows.length) {
        container.innerHTML =
          '<p class="empty">Nothing in the searchable directory matches that. Try a different name, ' +
          'practice or office — or <a href="contact.html">contact us</a> and we will introduce you to ' +
          'someone in our wider network.</p>';
        return;
      }

      container.innerHTML = rows.map(function (l) {
        var href = l.profile || ('contact.html');
        var avatar = l.photo
          ? '<div class="person__avatar"><img src="' + esc(l.photo) + '" alt="Portrait of ' +
            esc(l.name) + '" width="72" height="88" loading="lazy"></div>'
          : '<div class="person__avatar" aria-hidden="true">' + esc(initials(l.name)) + '</div>';
        return '' +
          '<article class="person reveal is-visible">' +
            avatar +
            '<div class="person__body">' +
              '<h3 class="person__name"><a href="' + esc(href) + '">' + esc(l.name) + '</a></h3>' +
              '<p class="person__role">' + esc(l.title) + ' — ' + esc(l.focus) + '</p>' +
              '<div class="person__meta">' +
                '<span>' + esc(l.practice) + '</span>' +
                '<span>' + esc(l.office) + '</span>' +
                '<span>' + esc(l.languages) + '</span>' +
              '</div>' +
            '</div>' +
          '</article>';
      }).join('');
    }

    [search, practice, office].forEach(function (el) {
      if (!el) return;
      el.addEventListener('input', render);
      el.addEventListener('change', render);
    });
    if (reset) {
      reset.addEventListener('click', function () {
        if (search) search.value = '';
        if (practice) practice.value = '';
        if (office) office.value = '';
        render();
      });
    }
    render();
  }

  /* ----------------------------------------------------------------
     07b  The "Find a lawyer" panel
     ---------------------------------------------------------------- */
  function initFindPanel() {
    var panel = $('#find-panel');
    var btn = $('#find-btn');

    // If a toggle button is present the panel can be opened and closed.
    if (btn && panel) {
      function setOpen(state) {
        panel.classList.toggle('is-open', state);
        btn.setAttribute('aria-expanded', String(state));
        btn.textContent = state ? 'Close search' : 'Open search';
        if (state) {
          var field = $('input', panel);
          if (field) setTimeout(function () { field.focus(); }, 60);
        }
      }
      btn.addEventListener('click', function () {
        setOpen(!panel.classList.contains('is-open'));
      });
    }

    // Arriving from a "Find a lawyer" link puts the cursor in the box.
    if (window.location.hash === '#find') {
      var input = $('#people-search');
      if (input) setTimeout(function () { input.focus(); }, 120);
    }
  }

  /* ----------------------------------------------------------------
     08  Insights filtering
     ---------------------------------------------------------------- */
  function initInsights() {
    var container = $('#insight-results');
    if (!container || !DATA.insights) return;

    var countEl = $('#insight-count');
    var chips = $$('[data-insight-type]');
    var emptyEl = $('#insight-empty');
    var all = DATA.insights;

    var LABELS = {
      'alerts': 'Alerts',
      'case-studies': 'Case studies',
      'events': 'Events & webinars',
      'insights': 'Insights',
      'podcasts': 'Podcasts',
      'stories': 'Stories',
      'videos': 'Videos'
    };

    function render(type) {
      var rows = all.filter(function (r) { return !type || r.type === type; });

      if (countEl) {
        countEl.textContent = rows.length + (rows.length === 1 ? ' item' : ' items');
      }
      if (emptyEl) emptyEl.hidden = rows.length > 0;

      container.innerHTML = rows.map(function (r) {
        return '' +
          '<article class="insight-row reveal is-visible">' +
            '<p class="insight-row__type">' + esc(LABELS[r.type] || r.type) + '</p>' +
            '<div>' +
              '<h3 class="insight-row__title"><a href="insights.html">' + esc(r.title) + '</a></h3>' +
              '<p class="insight-row__summary">' + esc(r.summary) + '</p>' +
            '</div>' +
            '<p class="insight-row__meta">' + esc(formatDate(r.date)) + ' · ' + r.read + ' min</p>' +
          '</article>';
      }).join('');
    }

    function select(type) {
      chips.forEach(function (c) {
        c.setAttribute('aria-pressed', String(c.dataset.insightType === type));
      });
      render(type);
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var type = chip.dataset.insightType;
        select(type);
        // Keep the URL shareable without reloading the page.
        var url = new URL(window.location.href);
        if (type) url.searchParams.set('type', type); else url.searchParams.delete('type');
        window.history.replaceState({}, '', url);
      });
    });

    // Honour ?type=… on load.
    var requested = new URLSearchParams(window.location.search).get('type');
    select(requested || '');
  }

  /* ----------------------------------------------------------------
     09  Offices filtering
     ---------------------------------------------------------------- */
  function initOffices() {
    var container = $('#office-results');
    if (!container || !DATA.offices) return;

    var countEl = $('#office-count');
    var chips = $$('[data-office-region]');
    var all = DATA.offices;

    var REGION_LABEL = {
      'americas': 'Americas',
      'emea': 'EMEA',
      'asia-pacific': 'Asia-Pacific'
    };

    function render(region) {
      var rows = all.filter(function (o) { return !region || o.region === region; });
      if (countEl) {
        countEl.textContent = rows.length + (rows.length === 1 ? ' office' : ' offices');
      }
      container.innerHTML = rows.map(function (o) {
        return '' +
          '<article class="office reveal is-visible" id="' + esc(o.region) + '-' + esc(o.city.toLowerCase().replace(/[^a-z0-9]+/g, '-')) + '">' +
            '<h3>' + esc(o.city) + '</h3>' +
            '<address>' + esc(o.address) + '<br>' + esc(o.postal) + '</address>' +
            '<a href="tel:' + esc(o.phone.replace(/\s+/g, '')) + '">' + esc(o.phone) + '</a>' +
          '</article>';
      }).join('');
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var region = chip.dataset.officeRegion;
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', String(c.dataset.officeRegion === region));
        });
        render(region);
      });
    });

    var requested = new URLSearchParams(window.location.search).get('region');
    if (requested) {
      var match = chips.filter(function (c) { return c.dataset.officeRegion === requested; })[0];
      if (match) match.click(); else render('');
    } else {
      render('');
    }
  }

  /* ----------------------------------------------------------------
     10  Services tabs
     ---------------------------------------------------------------- */
  function initServices() {
    var tabs = $$('[data-service-tab]');
    if (!tabs.length) return;

    var panels = $$('[data-service-panel]');

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.dataset.serviceTab;
        tabs.forEach(function (t) {
          var active = t === tab;
          t.setAttribute('aria-selected', String(active));
          t.classList.toggle('is-active', active);
        });
        panels.forEach(function (p) {
          var active = p.dataset.servicePanel === id;
          p.hidden = !active;
        });
      });
    });

    // Default to the first tab.
    if (tabs[0]) tabs[0].click();
  }

  /* ----------------------------------------------------------------
     10b  FAQ accordion
     ---------------------------------------------------------------- */
  function initFaq() {
    $$('.faq__q').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        var panel = trigger.nextElementSibling;
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.classList.toggle('is-open', !expanded);
      });
    });
  }

  /* ----------------------------------------------------------------
     11  Form validation
     ---------------------------------------------------------------- */
  function initForms() {
    var forms = $$('form[data-validate]');
    if (!forms.length) return;

    forms.forEach(function (form) {
      var status = $('[data-form-status]', form);

      function validateField(field) {
        var wrap = field.closest('.field');
        var value = (field.value || '').trim();
        var ok = true;

        if (field.hasAttribute('required') && !value) ok = false;
        if (ok && field.type === 'email' && value) {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        }
        if (ok && field.type === 'checkbox' && field.hasAttribute('required')) {
          ok = field.checked === true;
        }

        if (wrap) wrap.classList.toggle('has-error', !ok);
        field.setAttribute('aria-invalid', ok ? 'false' : 'true');
        return ok;
      }

      $$('input, select, textarea', form).forEach(function (field) {
        field.addEventListener('blur', function () { validateField(field); });
        field.addEventListener('input', function () {
          var wrap = field.closest('.field');
          if (wrap && wrap.classList.contains('has-error')) validateField(field);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fields = $$('input, select, textarea', form);
        var firstBad = null;
        var allOk = true;

        fields.forEach(function (field) {
          if (field.type === 'hidden' || field.type === 'submit') return;
          var ok = validateField(field);
          if (!ok) {
            allOk = false;
            if (!firstBad) firstBad = field;
          }
        });

        if (!allOk) {
          if (status) {
            status.classList.add('is-visible');
            status.innerHTML = '<strong>Please check the highlighted fields.</strong>' +
              '<span>Some required information is missing or in the wrong format.</span>';
          }
          if (firstBad) firstBad.focus();
          return;
        }

        // No back end in this prototype — acknowledge and reset.
        if (status) {
          status.classList.add('is-visible');
          status.innerHTML = '<strong>Thank you — your message has been received.</strong>' +
            '<span>This is a front-end prototype, so nothing was actually sent. ' +
            'Wiring a form handler is the next step in the build.</span>';
        }
        form.reset();
        toast('Form validated successfully.');
      });
    });
  }

  /* ----------------------------------------------------------------
     12  Scroll reveal, back-to-top, copy link
     ---------------------------------------------------------------- */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  }

  function initToTop() {
    var btn = $('[data-to-top]');
    if (!btn) return;
    var ticking = false;
    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    update();
  }

  function initCopyLink() {
    var btn = $('[data-copy-link]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var url = window.location.href;
      var done = function () { toast('Link copied to clipboard.'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { toast(url); });
      } else {
        toast(url);
      }
    });
  }

  /* ----------------------------------------------------------------
     Boot
     ---------------------------------------------------------------- */
  function init() {
    initHeader();
    initMega();
    initDrawer();
    initSearch();
    initCookies();
    initFindPanel();
    initPeople();
    initInsights();
    initOffices();
    initServices();
    initFaq();
    initForms();
    initReveal();
    initToTop();
    initCopyLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
