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
/* --- Site-wide constants ------------------------------------------- */
const SITE = {
  name: 'CLD Legal Consultant',
  origin: 'https://cldlegalconsult.online',
  phone: '+1 (904) 397-7052',
  email: 'info@cldlegalconsult.online',
  supportEmail: 'support@cldlegalconsult.online',
  street: '1000 2nd Ave Ste 2530',
  city: 'Seattle',
  region: 'WA',
  postal: '98104',
  country: 'US',
  ogImage: '/assets/img/photos/banner-locations.jpg'
};

const PAGE_META = {
  'index.html': {
    title: 'Home',
    path: '/',
    description:
      'CLD Legal Consultant — corporate and commercial legal advice from Seattle, backed by a network of 2,000+ lawyers across 45 offices.',
    bodyClass: 'page-home'
  },
  'services.html': {
    title: 'Services',
    path: '/services.html',
    description: 'Industries, practices and regions covered by CLD Legal Consultant.',
    bodyClass: 'page-services'
  },
  'people.html': {
    title: 'People',
    path: '/people.html',
    description:
      'Search the CLD Legal Consultant directory by name, practice or office to find the right lawyer for your matter.',
    bodyClass: 'page-people'
  },
  'jeff-hughes.html': {
    title: 'Jeff Hughes — Principal Consultant',
    path: '/jeff-hughes.html',
    description:
      'Jeff Hughes is the Principal Consultant at CLD Legal Consultant, advising on mergers and acquisitions, private capital and joint ventures.',
    bodyClass: 'page-people',
    ogImage: '/assets/img/photos/jeff-hughes.jpg'
  },
  'insights.html': {
    title: 'Insights',
    path: '/insights.html',
    description: 'Market trends, legal analysis and industry knowledge from across the firm.',
    bodyClass: 'page-insights'
  },
  'locations.html': {
    title: 'Offices',
    path: '/locations.html',
    description: 'All 45 offices across 31 countries, grouped by region.',
    bodyClass: 'page-locations'
  },
  'careers.html': {
    title: 'Careers',
    path: '/careers.html',
    description: 'Life at the firm, our values, and how to apply.',
    bodyClass: 'page-careers'
  },
  'about.html': {
    title: 'About Us',
    path: '/about.html',
    description: 'Our firm, innovation, responsible business and former partners.',
    bodyClass: 'page-about'
  },
  'contact.html': {
    title: 'Contact',
    path: '/contact.html',
    description: 'Contact CLD Legal Consultant, our offices and our media relations team.',
    bodyClass: 'page-contact'
  },
  '404.html': {
    title: 'Page not found',
    path: '/404.html',
    description: 'The page you asked for is not here.',
    bodyClass: 'page-404',
    noindex: true
  }
};

const ACTIVE_NAV = {
  'index.html': '',
  'services.html': 'services',
  'people.html': 'people',
  'jeff-hughes.html': 'people',
  'insights.html': 'insights',
  'locations.html': 'about',
  'careers.html': 'careers',
  'about.html': 'about',
  'contact.html': ''
};

/* --- Structured data ----------------------------------------------- */
function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': SITE.origin + '/#organization',
    name: SITE.name,
    url: SITE.origin + '/',
    logo: SITE.origin + '/assets/img/photos/hero.jpg',
    image: SITE.origin + SITE.ogImage,
    description:
      'Corporate and commercial legal advice from Seattle, backed by a network of 2,000+ lawyers across 45 offices in 31 countries.',
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postal,
      addressCountry: SITE.country
    },
    areaServed: 'Worldwide',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE.phone,
        email: SITE.supportEmail,
        contactType: 'customer support',
        areaServed: 'Worldwide',
        availableLanguage: ['English', 'Spanish']
      }
    ],
    employee: { '@id': SITE.origin + '/jeff-hughes.html#person' }
  };
}

function personLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': SITE.origin + '/jeff-hughes.html#person',
    name: 'Jeff Hughes',
    alternateName: 'Jeffrey A. Hughes',
    givenName: 'Jeff',
    familyName: 'Hughes',
    jobTitle: 'Principal Consultant',
    description:
      'Jeff Hughes is the Principal Consultant at CLD Legal Consultant, advising founders, investors and boards on mergers and acquisitions, private capital and joint ventures, and representing clients in criminal defence matters.',
    url: SITE.origin + '/jeff-hughes.html',
    mainEntityOfPage: SITE.origin + '/jeff-hughes.html',
    image: SITE.origin + '/assets/img/photos/jeff-hughes.jpg',
    email: 'mailto:jeff.hughes@cldlegalconsult.online',
    telephone: SITE.phone,
    worksFor: { '@id': SITE.origin + '/#organization' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      postalCode: SITE.postal,
      addressCountry: SITE.country
    },
    knowsLanguage: ['en', 'es'],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of Washington School of Law' },
      { '@type': 'CollegeOrUniversity', name: 'University of British Columbia' }
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Principal Consultant',
      occupationLocation: {
        '@type': 'Country',
        name: 'United States'
      }
    },
    knowsAbout: [
      'Mergers and acquisitions',
      'Private capital transactions',
      'Joint ventures and strategic alliances',
      'Corporate governance',
      'Technology transactions and licensing',
      'Criminal defence'
    ]
  };
}

function structuredDataFor(path) {
  const graph = path === '/jeff-hughes.html'
    ? [organizationLd(), personLd()]
    : [organizationLd()];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 0);
}

/* --- sitemap and robots -------------------------------------------- */
function writeSitemap(files) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = files
    .filter((f) => PAGE_META[f] && !PAGE_META[f].noindex)
    .map((f) => {
      const m = PAGE_META[f];
      const priority = m.path === '/' ? '1.0' : (m.path === '/jeff-hughes.html' ? '0.9' : '0.7');
      return '  <url>\n' +
        '    <loc>' + SITE.origin + m.path + '</loc>\n' +
        '    <lastmod>' + today + '</lastmod>\n' +
        '    <changefreq>weekly</changefreq>\n' +
        '    <priority>' + priority + '</priority>\n' +
        '  </url>';
    })
    .join('\n');

  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries + '\n' +
    '</urlset>\n';
  fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml, 'utf8');
}

function writeRobots() {
  const txt = 'User-agent: *\n' +
    'Allow: /\n' +
    'Disallow: /tools/\n' +
    '\n' +
    'Sitemap: ' + SITE.origin + '/sitemap.xml\n';
  fs.writeFileSync(path.join(ROOT, 'robots.txt'), txt, 'utf8');
}

/* --- build -------------------------------------------------------- */
function build() {
  const files = fs.readdirSync(PAGES).filter((f) => f.endsWith('.html'));
  const written = [];

  for (const file of files) {
    const meta = PAGE_META[file] || { title: 'Page', description: '', bodyClass: '', path: '/' + file };
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
      canonicalUrl: SITE.origin + meta.path,
      siteUrl: SITE.origin + '/',
      siteUrlLabel: SITE.origin.replace(/^https:\/\//, ''),
      ogImage: SITE.origin + (meta.ogImage || SITE.ogImage),
      structuredData: structuredDataFor(meta.path),
      nav: renderNav(active),
      megaPanels: renderMegaPanels(active),
      drawer: renderDrawer(active),
      footerColumns: renderFooterColumns(),
      officesByRegion: renderOfficesByRegion()
    });

    if (meta.noindex) {
      html = html.replace(
        '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">',
        '<meta name="robots" content="noindex, follow">'
      );
    }

    fs.writeFileSync(path.join(ROOT, file), html, 'utf8');
    written.push(file);
  }

  writeSitemap(written);
  writeRobots();

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
