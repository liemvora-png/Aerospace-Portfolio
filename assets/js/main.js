/* ==========================================================
   Liem Vora — portfolio site
   Theme, nav, reveals, count-ups, and the hero canvas.
   No dependencies.
   ========================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var prefersReduced = motionQuery.matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------------------------------------------------------
     Theme
     --------------------------------------------------------- */
  var THEME_KEY = 'lv-theme';
  var themeToggle = $('#themeToggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
      themeToggle.setAttribute(
        'aria-label',
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'light' ? 'dark' : 'light');
    });
  }

  // Follow the system only while the user has not chosen explicitly.
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (err) {}
    if (!stored) setTheme(e.matches ? 'light' : 'dark');
  });

  /* ---------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------- */
  var navToggle = $('#navToggle');
  var navLinks = $('#navLinks');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
    document.addEventListener('click', function (e) {
      if (!navLinks.classList.contains('is-open')) return;
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
  }

  /* ---------------------------------------------------------
     Header state + scroll progress
     --------------------------------------------------------- */
  var header = $('#siteHeader');
  var progressBar = $('#progressBar');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 12);

    if (progressBar) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? Math.min(1, y / max) : 0;
      progressBar.style.width = (pct * 100).toFixed(2) + '%';
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */
  var revealables = $$('.reveal');
  if (revealables.length) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  /* ---------------------------------------------------------
     Stat count-ups
     --------------------------------------------------------- */
  function formatNumber(n) {
    return n.toLocaleString('en-US');
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count') || '0');
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    function render(value) {
      el.textContent = prefix + formatNumber(Math.round(value)) + suffix;
    }

    if (prefersReduced) { render(target); return; }

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      render(target * eased);
      if (p < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  var counters = $$('.stat-num[data-count]');
  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animateCount);
    } else {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countObserver.observe(el); });
    }
  }

  /* ---------------------------------------------------------
     Active section in the nav
     --------------------------------------------------------- */
  var navAnchors = $$('.nav-links a');
  var sections = navAnchors
    .map(function (a) {
      var id = a.getAttribute('href');
      return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navAnchors.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------------------------------------------------------
     Hero canvas — a signal wave crossed by circuit traces
     --------------------------------------------------------- */
  var canvas = $('#heroCanvas');

  if (canvas && canvas.getContext && !prefersReduced) {
    var ctx = canvas.getContext('2d');
    var W = 0, H = 0, dpr = 1;
    var rafId = 0;
    var running = true;
    var last = 0;
    var traces = [];

    var PALETTES = {
      dark:  { wave: '216,166,87', trace: '111,195,217', waveA: 0.72, bandA: 0.12, traceA: 0.42, glowA: 0.07 },
      light: { wave: '154,111,31', trace: '31,111,136',  waveA: 0.52, bandA: 0.09, traceA: 0.32, glowA: 0.05 }
    };

    function pal() { return PALETTES[currentTheme()] || PALETTES.dark; }

    function makeTrace() {
      return {
        x: -Math.random() * 260,
        y: H * (0.14 + Math.random() * 0.72),
        pts: [],
        seg: 46 + Math.random() * 90,
        step: (Math.random() < 0.5 ? -1 : 1) * (16 + Math.random() * 46),
        speed: 20 + Math.random() * 44
      };
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(rect.width, 1);
      H = Math.max(rect.height, 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!traces.length) {
        for (var i = 0; i < 7; i++) traces.push(makeTrace());
      }
    }

    function envelope(x, t) {
      var a = Math.sin(x * 0.0022 - t * 0.34) * 0.5 + 0.5;
      var b = Math.sin(x * 0.0051 + t * 0.21) * 0.5 + 0.5;
      return H * 0.135 * (0.22 + 0.78 * a * b);
    }

    function oscillation(x, t) {
      return Math.sin(x * 0.0055 + t * 0.9) * 0.6
           + Math.sin(x * 0.0131 - t * 1.4) * 0.28
           + Math.sin(x * 0.0272 + t * 0.5) * 0.12;
    }

    function drawWave(t) {
      var p = pal();
      var mid = H * 0.52;
      var step = 6;
      var i, x;

      // soft envelope band
      ctx.beginPath();
      for (i = 0, x = 0; x <= W; x += step) {
        var top = mid - envelope(x, t);
        if (i === 0) ctx.moveTo(x, top); else ctx.lineTo(x, top);
        i++;
      }
      for (x = W; x >= 0; x -= step) ctx.lineTo(x, mid + envelope(x, t));
      ctx.closePath();
      ctx.fillStyle = 'rgba(' + p.wave + ',' + p.bandA + ')';
      ctx.fill();

      // the signal itself
      ctx.beginPath();
      for (i = 0, x = 0; x <= W; x += step) {
        var y = mid + oscillation(x, t) * envelope(x, t) * 1.5;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        i++;
      }
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = 'rgba(' + p.wave + ',' + p.waveA + ')';
      ctx.stroke();
    }

    function drawTraces(dt) {
      var p = pal();
      var i, j, k;

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      for (i = 0; i < traces.length; i++) {
        var tr = traces[i];
        tr.x += tr.speed * dt;

        if (tr.pts.length === 0 || tr.x - tr.pts[tr.pts.length - 1].x >= tr.seg) {
          var lastY = tr.pts.length ? tr.pts[tr.pts.length - 1].y : tr.y;
          tr.pts.push({ x: tr.x, y: lastY + tr.step });
          if (Math.random() < 0.35) tr.step = -tr.step;
        }

        if (tr.x > W + 280) {
          tr.x = -220 - Math.random() * 180;
          tr.y = H * (0.12 + Math.random() * 0.76);
          tr.step = (Math.random() < 0.5 ? -1 : 1) * (16 + Math.random() * 46);
          tr.seg = 46 + Math.random() * 90;
          tr.speed = 20 + Math.random() * 44;
          tr.pts = [];
          continue;
        }

        if (tr.pts.length < 2) continue;

        // soft glow pass
        ctx.beginPath();
        for (j = 1; j < tr.pts.length; j++) {
          var a = tr.pts[j - 1], b = tr.pts[j];
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, a.y);
          ctx.lineTo(b.x, b.y);
        }
        ctx.lineWidth = 4.5;
        ctx.strokeStyle = 'rgba(' + p.trace + ',' + p.glowA + ')';
        ctx.stroke();

        // crisp pass
        ctx.beginPath();
        for (j = 1; j < tr.pts.length; j++) {
          var a2 = tr.pts[j - 1], b2 = tr.pts[j];
          ctx.moveTo(a2.x, a2.y);
          ctx.lineTo(b2.x, a2.y);
          ctx.lineTo(b2.x, b2.y);
        }
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = 'rgba(' + p.trace + ',' + p.traceA + ')';
        ctx.stroke();

        // node dots at the vertices
        for (k = 0; k < tr.pts.length; k++) {
          var n = tr.pts[k];
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.9, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + p.trace + ',' + (p.traceA + 0.3) + ')';
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    }

    function frame(ts) {
      if (!running) return;
      if (!last) last = ts;
      var dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      var t = ts / 1000;

      ctx.clearRect(0, 0, W, H);
      drawWave(t);
      drawTraces(dt);

      rafId = window.requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', function () {
      resize();
      ctx.clearRect(0, 0, W, H);
    });

    if ('IntersectionObserver' in window) {
      var heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !running) {
            running = true;
            last = 0;
            rafId = window.requestAnimationFrame(frame);
          } else if (!entry.isIntersecting && running) {
            running = false;
            window.cancelAnimationFrame(rafId);
          }
        });
      }, { threshold: 0 });
      heroObserver.observe(canvas);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        last = 0;
        rafId = window.requestAnimationFrame(frame);
      }
    });

    rafId = window.requestAnimationFrame(frame);
  }
})();
