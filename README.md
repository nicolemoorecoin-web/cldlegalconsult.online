# CLD Legal Consultant

A corporate and commercial law consultancy website, built as a final-year computer science
project. Eight pages, a full front-end architecture, and **no database and no back end** —
every list on the site is a static JavaScript array that the browser filters over in real
time.

Live domain: **cldlegalconsult.online**

---

## Running it

The site is plain static files. **Open `index.html` and it works** — there is nothing to
install and no build step required to view it.

For a proper HTTP origin (recommended — some browser APIs such as the clipboard need a
secure context, and the browser treats each `file://` page as a separate origin):

```bash
npm run serve        # → http://localhost:8080
```

No dependencies are required. Node is used only for the optional build step and the dev server.

---

## What's in it

| Page | File | What it demonstrates |
|---|---|---|
| Home | `index.html` | Hero, stat band, split feature sections, card grids, CTA band |
| Services | `services.html` | Tabbed Industries / Practices / Regions, FAQ accordion |
| People | `people.html` | The "Find a lawyer" directory — searches by name |
| Jeff Hughes | `jeff-hughes.html` | The principal's full profile, with `Person` structured data |
| Insights | `insights.html` | Filterable content list with URL-synced state, newsletter form |
| Offices | `locations.html` | 45 offices, region filter, address cards |
| Careers | `careers.html` | History timeline, values grid, application form |
| About | `about.html` | Editorial blocks, awards tiles, innovation section |
| Contact | `contact.html` | Validated enquiry form, sidebar with office details |
| Not found | `404.html` | Published as the site's custom 404 |

### The directory

`people.html` is a **search, not a list**. It starts empty — "Search to begin" — and a
lawyer appears only when a name matches, so typing `hug`, `hughes` or `jeff h` surfaces
Jeff Hughes and links to his profile. Nothing is shown by default.

The principal's full profile — biography, focus areas, eight matters handled, the matter
currently live, education, admissions, recognition, publications, speaking commitments and
memberships — lives on its own page, `jeff-hughes.html`. That page is what a search engine
indexes for his name, and it carries `Person` structured data: name, job title,
description, employer, address, languages, education and areas of practice.

The site's firm-level figures (2,000+ lawyers across 45 offices in 31 countries) describe
the **network** the practice draws on, not its headcount.

### Interactions built from scratch

- **Mega menu** — full-width panel on hover *and* keyboard focus, with `aria-expanded` /
  `aria-controls` wiring and a focus trap. Collapses to an off-canvas drawer with
  accordions on small screens.
- **Find a lawyer** — a search panel that opens on demand (or automatically when you arrive
  from the homepage's "Find a lawyer" link) and filters the directory as you type.
- **Search dialog** — modal with focus trap, Escape to close, and query routing.
- **Cookie consent** — banner plus a preference centre with three cookie categories,
  persisted in `localStorage`.
- **URL state** — `insights.html?type=alerts` and `locations.html?region=emea` are honoured
  on load and stay shareable as you filter.
- **Form validation** — required fields, email format, inline error messages, `aria-invalid`,
  and a success state.
- Scroll-reveal animations via `IntersectionObserver`, a back-to-top button, a copy-link
  button, and a share widget.

---

## Project layout

```
lawfirm-replica/
├── index.html … contact.html   ← the built site (open these)
├── assets/
│   ├── css/styles.css          ← one stylesheet, 21 numbered sections
│   ├── js/data.js              ← ALL content: nav, offices, directory, insights
│   ├── js/main.js              ← all behaviour, independent modules
│   └── img/photos/*.jpg        ← photography (see CREDITS.md)
├── src/
│   ├── partials/               ← head, header, footer, cookie banner, dialogs
│   └── pages/                  ← page templates
├── tools/
│   ├── build.js                ← assembles pages + partials, checks links
│   ├── serve.js                ← 40-line static server
│   └── audit.html              ← self-contained a11y + JS-error check
├── CREDITS.md                  ← photo attribution and typefaces
└── package.json
```

### Why there is a build step

Eight pages sharing one header, one mega menu and one footer would mean ~2,000 lines of
copy-pasted markup — and a change to the footer would have to be made eight times. Instead:

- **`src/partials/`** holds the shared chrome exactly once.
- **`src/pages/`** holds the page bodies, pulling in partials with `{{> header}}`.
- **`tools/build.js`** stitches them together and writes plain `.html` to the project root.

```bash
npm run build
```

```
Built 8 page(s): about.html, careers.html, contact.html, index.html, …
Link check: all internal links resolve.
```

The build also **verifies every internal link resolves to a real file**, so a typo in a
navigation label fails the build instead of shipping. The output is ordinary static HTML —
there is no client-side framework, so the pages work with JavaScript disabled (the dynamic
lists are the only exception).

The navigation and the footer office directory are generated from `assets/js/data.js`, so
adding an office updates the header, the footer and the offices page in one edit.

---

## Design system

| Token | Value | Use |
|---|---|---|
| `--ink` | `#1b1b1b` | Near-black — body text, dark sections |
| `--ink-2` | `#383b43` | Charcoal — secondary surfaces |
| `--accent` | `#2611c9` | Electric indigo — links, CTAs, active states |
| `--grey` | `#707279` | Secondary text |
| `--line` | `#dadada` | Borders, rules |
| `--wash` | `#f4f4f4` | Tinted section backgrounds |

The colour and spacing tokens were derived from the compiled theme stylesheet of a large
international law firm's public site, along with its layout metrics: a 100px header, 60px
between blocks, a 335px mega-menu lead column and a 960px measure for body copy. Type is
Inter (UI) and Source Serif 4 (editorial), both open-licensed.

Everything is fluid: `clamp()` for type scale, `grid` for layout, and breakpoints at 1200px,
1024px and 720px. **Verified free of horizontal overflow at 390, 500, 768, 1024 and 1440px.**

---

## Photography

Every photograph lives in `assets/img/photos/` and is used under the Pexels licence.
Photographers are credited in [CREDITS.md](CREDITS.md). To swap an image, replace the file
and keep the name — the CSS handles `object-fit: cover` and the correct aspect ratios, so
no markup changes are needed.

---

## SEO

The site is built to be found. `tools/build.js` writes the machine-readable parts on every
build, so they cannot drift from the pages:

- **`sitemap.xml`** — every indexable page with its `lastmod`, `changefreq` and priority.
  The 404 is deliberately excluded.
- **`robots.txt`** — allows crawling, points at the sitemap, keeps `/tools/` out of the index.
- **Canonical URL** on every page, absolute and pointing at `https://cldlegalconsult.online`.
- **Open Graph and Twitter card** tags — title, description, URL and a 1400×933 image.
- **JSON-LD structured data**, validated as JSON on every page:
  - `LegalService` everywhere — the firm's name, `telephone`, `email`, postal address and
    `areaServed`.
  - `Person` on `jeff-hughes.html` — `jobTitle`, `worksFor`, `alumniOf`, `knowsLanguage`
    and `knowsAbout`, with an `@id` the firm record points back at. This is what makes
    a search for the principal return the profile rather than the homepage.

Page titles, meta descriptions and headings are unique per page, every image carries alt
text, and the markup is semantic — one `<h1>` per page, landmark elements, and a single
`<section>` per idea.

---

## Accessibility

Built in from the start rather than added afterwards:

- Skip link, one `<h1>` per page, landmark elements, and a logical heading order.
- Every form control has an associated label; every icon-only control has an `aria-label`.
- The mega menu and both dialogs trap focus and close on <kbd>Escape</kbd>.
- `aria-expanded` / `aria-pressed` / `aria-selected` track the real state of every control.
- Visible focus rings via `:focus-visible`; no positive `tabindex` values.
- Colour is never the only signal — active filters, tabs and menu states are also marked
  with `aria-pressed` / `aria-selected`.
- `prefers-reduced-motion` disables all animation.

`tools/audit.html` loads every built page and reports duplicate IDs, missing `alt`
attributes, unlabelled fields, unnamed links and buttons, the `<h1>` count, and any
uncaught JavaScript error:

```
TOTALS  duplicateIds=0  missingAlt=0  unlabelledFields=0
        namelessLinks=0  namelessButtons=0  jsErrors=0  h1count=8

RESULT: PASS — no issues found.
```

---

## Swapping the static data for a real API

The point of keeping content in `assets/js/data.js` is that replacing it with a back end
touches one function per page. For example, in `assets/js/main.js`:

```js
// before — synchronous, from the bundled array
var rows = DATA.lawyers.filter(function (l) { /* … */ });

// after — asynchronous, from an endpoint
var rows = await fetch('/api/lawyers?q=' + q).then(function (r) { return r.json(); });
```

The rendering code below it does not change, because it already works on a plain array of
objects. The same applies to the insights list and the offices grid.

The biography is a deliberate exception: it lives only in the page markup, and the search
reads the text straight off the rendered profile — so the biography exists in exactly one
place.

---

## Browser support

Evergreen Chrome, Edge, Firefox and Safari. The site uses CSS Grid, custom properties,
`clamp()`, `IntersectionObserver` and `URLSearchParams` — all widely supported. There is no
polyfill layer and no transpilation step, because there is nothing to transpile.

---

## Deployment

The site is published with **GitHub Pages**, from the repository root of
`nicolemoorecoin-web/cldlegalconsult.online` (public), branch `main`, path `/`.

**The published HTML is generated.** The repository root holds the built pages *and* the
sources in `src/`, so a change to a page template is not live until it is rebuilt:

```bash
node tools/build.js          # regenerates the root .html files
git add -A && git commit -m "…"
git push                     # Pages rebuilds and publishes automatically
```

Pages picks up the `CNAME` file and serves the site at **cldlegalconsult.online**. The
apex points at GitHub's addresses and `www` is a CNAME to the apex:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| CNAME | `www` | `cldlegalconsult.online` |

The DNS is at Namecheap, and the certificate is issued and renewed automatically by
GitHub. `404.html` is published as the custom 404, and `sitemap.xml` and `robots.txt` are
generated by the build and served from the repository root.

**Contact details, in one place.** `assets/js/data.js` holds the site's `SITE` object —
primary address, phone number and the two mailboxes. `tools/build.js` uses it for the
structured data, and the footer and contact page carry the same values.

| | |
|---|---|
| Address | 1000 2nd Ave Ste 2530, Seattle, WA 98104, USA |
| Phone | +1 (904) 397-7052 |
| General enquiries | info@cldlegalconsult.online |
| Support | support@cldlegalconsult.online |

---

## A note on the content

This is a **student project**. CLD Legal Consultant is a fictional practice: every name,
address, telephone number, matter, award and body of copy is illustrative. Jeff Hughes does
not exist, and the office directory describes real business districts rather than real
firms. The stock portrait standing in for him does not depict a real person.

Figures quoted on the site (45 offices, 31 countries, 2,000+ lawyers) are kept internally
consistent with the data in `assets/js/data.js`.
