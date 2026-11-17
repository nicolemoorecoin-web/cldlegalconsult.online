#!/usr/bin/env node
/* ==================================================================
   tools/build.js — static site generator
   ------------------------------------------------------------------
   Reads the page templates in src/pages/, stitches them together
   with the partials in src/partials/, injects the navigation and
   office data from assets/js/data.js, and writes plain .html files
   to the project root.

   No dependencies. Run with:  node tools/build.js
   ================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const PARTIALS = path.join(SRC, 'partials');
const PAGES = path.join(SRC, 'pages');

const data = require(path.join(ROOT, 'assets', 'js', 'data.js'));

/* --- helpers ----------------------------------------------------- */
const read = (p) => fs.readFileSync(p, 'utf8');

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* --- navigation rendering ---------------------------------------- */
function renderNav(activeNav) {
  const items = data.nav
    .map((item) => {
      const current = item.id === activeNav ? ' aria-current="page"' : '';
      return `        <li>
          <button class="primary-nav__link" type="button" data-mega="${item.id}" aria-expanded="false" aria-controls="mega-${item.id}"${current}>${escapeAttr(item.label)}</button>
        </li>`;
    })
    .join('\n');

  return `      <nav class="primary-nav" aria-label="Main navigation">
        <ul>
${items}
        </ul>
      </nav>`;
}

function renderMegaPanels(activeNav) {
  return data.nav
    .map((item) => {
      const cols = item.columns
        .map(
          (col) => `          <div class="mega__col">
            <h3>${escapeAttr(col.heading)}</h3>
            <ul>
${col.links.map((l) => `              <li><a href="${l.href}">${escapeAttr(l.label)}</a></li>`).join('\n')}
            </ul>
          </div>`
        )
        .join('\n');

      const featured = item.featured.items
        .map((l) => `          <a href="${l.href}">${escapeAttr(l.label)}</a>`)
        .join('\n');

      return `      <div class="mega" id="mega-${item.id}" data-mega-panel="${item.id}" hidden>
        <div class="container mega__inner">
          <div class="mega__lead">
            <h2>${escapeAttr(item.label)}</h2>
            <p>${escapeAttr(item.lead)}</p>
            <a class="btn btn--sm" href="${item.cta.href}">${escapeAttr(item.cta.label)}</a>
            <div class="mega__featured">
              <h3>${escapeAttr(item.featured.kicker)}</h3>
${featured}
            </div>
          </div>
          <div class="mega__cols">
${cols}
          </div>
        </div>
      </div>`;
    })
    .join('\n');
}

function renderDrawer(activeNav) {
  const items = data.nav
    .map(
      (item) => `          <div class="acc">
            <button class="acc__trigger" type="button" aria-expanded="false">${escapeAttr(item.label)}</button>
            <div class="acc__panel">
              <a href="${item.href}">Overview</a>
${item.columns
  .flatMap((col) => col.links)
  .map((l) => `              <a href="${l.href}">${escapeAttr(l.label)}</a>`)
  .join('\n')}
            </div>
          </div>`
    )
    .join('\n');

  return `      <div class="drawer__body">
${items}
      </div>`;
}

function renderFooterColumns() {
  const groups = [
    {
      heading: 'People',
      links: [{ label: 'People', href: 'people.html' }]
    },
    {
      heading: 'Services',
      links: [{ label: 'Services', href: 'services.html' }]
    },
    {
      heading: 'Insights',
      links: [
        { label: 'Global Market Outlook', href: 'insights.html#series' },
        { label: 'Partner Perspectives', href: 'insights.html#series' },
        { label: 'Cross-Sector Briefings', href: 'insights.html#series' },
        { label: 'Insights', href: 'insights.html' }
      ]
    },
    {
      heading: 'Newsroom',
      links: [
        { label: 'In the media', href: 'insights.html#newsroom' },
        { label: 'Media contacts', href: 'contact.html#media' },
        { label: 'Press releases', href: 'insights.html#newsroom' },
        { label: 'Awards & rankings', href: 'about.html#awards' }
      ]
    },
    {
      heading: 'About us',
      links: [
        { label: 'Our firm', href: 'about.html' },
        { label: 'Locations', href: 'locations.html' },
        { label: 'Innovation', href: 'about.html#innovation' },
        { label: 'Responsible business', href: 'about.html#responsible' },
        { label: 'Former partners', href: 'about.html#former-partners' }
      ]
    },
    {
      heading: 'Join us',
      links: [
        { label: 'Careers', href: 'careers.html' },
        { label: 'Apply', href: 'careers.html#apply' },
        { label: 'Alumni', href: 'careers.html#alumni' }
      ]
    }
  ];

  return groups
    .map(
      (g) => `        <div class="footer__col">
          <h2>${escapeAttr(g.heading)}</h2>
          <ul>
${g.links.map((l) => `            <li><a href="${l.href}">${escapeAttr(l.label)}</a></li>`).join('\n')}
          </ul>
        </div>`
    )
    .join('\n');
}

function renderOfficesByRegion() {
  const order = [
    ['americas', 'Americas'],
    ['emea', 'EMEA'],
    ['asia-pacific', 'Asia-Pacific']
  ];

  return order
    .map(([key, label]) => {
      const cities = data.offices.filter((o) => o.region === key);
      const half = Math.ceil(cities.length / 2);
      const colA = cities.slice(0, half);
      const colB = cities.slice(half);
      const list = (arr) =>
        arr.map((o) => `            <li><a href="locations.html#${key}">${escapeAttr(o.city)}</a></li>`).join('\n');

      return `          <div>
            <h3>${label} <span class="text-muted">(${cities.length})</span></h3>
            <ul>
${list(colA)}
            </ul>
          </div>
          <div>
            <h3>&nbsp;</h3>
            <ul>
${list(colB)}
            </ul>
          </div>`;
    })
    .join('\n');
}

/* --- template engine --------------------------------------------- */
const partialCache = new Map();
function loadPartial(name) {
  if (!partialCache.has(name)) {
    const file = path.join(PARTIALS, `${name}.html`);
    if (!fs.existsSync(file)) throw new Error(`Missing partial: ${name}`);
    partialCache.set(name, read(file));
  }
  return partialCache.get(name);
}

function resolveIncludes(html, depth = 0) {
  if (depth > 8) throw new Error('Include depth exceeded — circular reference?');
  return html.replace(/\{\{>\s*([a-z0-9_-]+)\s*\}\}/gi, (_, name) =>
    resolveIncludes(loadPartial(name), depth + 1)
  );
}

function applyVars(html, vars) {
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : match
  );
}

/* --- page metadata ------------------------------------------------ */
const PAGE_META = {
  'index.html': {
    title: 'Home',
    description:
      'An academic front-end replica of the White & Case LLP website, built as a final-year computer science project.',
    bodyClass: 'page-home'
  },
  'services.html': {
    title: 'Services',
    description: 'Industries, practices and regions covered by the firm.',
    bodyClass: 'page-services'
  },
  'people.html': {
    title: 'People',
    description: 'Search the firm’s lawyers by name, practice, industry and office.',
    bodyClass: 'page-people'
  },
  'insights.html': {
    title: 'Insights',
    description: 'Market trends, legal analysis and industry knowledge from across the firm.',
    bodyClass: 'page-insights'
  },
  'locations.html': {
    title: 'Offices',
    description: 'All 43 offices across 29 countries, grouped by region.',
    bodyClass: 'page-locations'
  },
  'careers.html': {
    title: 'Careers',
    description: 'Life at the firm, our values, and how to apply.',
    bodyClass: 'page-careers'
  },
  'about.html': {
    title: 'About Us',
    description: 'Our firm, innovation, responsible business and former partners.',
    bodyClass: 'page-about'
  },
  'contact.html': {
    title: 'Contact',
    description: 'Contact the firm, our offices and our media relations team.',
    bodyClass: 'page-contact'
  }
};

const ACTIVE_NAV = {
  'index.html': '',
  'services.html': 'services',
  'people.html': 'people',
  'insights.html': 'insights',
  'locations.html': 'about',
  'careers.html': 'careers',
  'about.html': 'about',
  'contact.html': ''
};

/* --- build -------------------------------------------------------- */
function build() {
  const files = fs.readdirSync(PAGES).filter((f) => f.endsWith('.html'));
  const written = [];

  for (const file of files) {
    const meta = PAGE_META[file] || { title: 'Page', description: '', bodyClass: '' };
    const active = ACTIVE_NAV[file] || '';

    let html = read(path.join(PAGES, file));
    html = resolveIncludes(html);

    html = applyVars(html, {
      title: meta.title,
      description: meta.description,
      bodyClass: meta.bodyClass,
      pageClass: '',
      activeNav: active,
      year: String(new Date().getFullYear()),
      nav: renderNav(active),
      megaPanels: renderMegaPanels(active),
      drawer: renderDrawer(active),
      footerColumns: renderFooterColumns(),
      officesByRegion: renderOfficesByRegion()
    });

    fs.writeFileSync(path.join(ROOT, file), html, 'utf8');
    written.push(file);
  }

  return written;
}

/* --- link check ---------------------------------------------------- */
function checkLinks() {
  const missing = [];
  for (const file of fs.readdirSync(ROOT)) {
    if (!file.endsWith('.html')) continue;
    const html = read(path.join(ROOT, file));
    const re = /href="([^"#][^"]*?)(#[^"]*)?"/g;
    let m;
    while ((m = re.exec(html)) !== null) {
      const href = m[1];
      if (/^(https?:|mailto:|tel:|data:|#)/.test(href)) continue;
      // Strip any query string and fragment before resolving the file.
      const clean = href.split('#')[0].split('?')[0];
      if (!clean) continue;
      const target = path.join(ROOT, clean);
      if (!fs.existsSync(target)) missing.push(`${file} -> ${href}`);
    }
  }
  return missing;
}

/* --- run ---------------------------------------------------------- */
try {
  const written = build();
  console.log(`Built ${written.length} page(s): ${written.join(', ')}`);
  const missing = checkLinks();
  if (missing.length) {
    console.error(`\n!! ${missing.length} broken internal link(s):`);
    missing.forEach((l) => console.error('   ' + l));
    process.exitCode = 1;
  } else {
    console.log('Link check: all internal links resolve.');
  }
} catch (err) {
  console.error('Build failed:', err.message);
  process.exitCode = 1;
}
