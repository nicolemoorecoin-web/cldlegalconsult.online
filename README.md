# White & Case — academic front-end replica

A recreation of the public website of **White & Case LLP** (`whitecase.com`), built as a
final-year computer science project. The brief was to reproduce the site's front-end
architecture and visual system. **There is no database and no back end** — every list on the
site is a static JavaScript array that the browser filters over in real time.

---

## Running it

The site is plain static files. **Open `index.html` and it works** — there is nothing to
install and no build step required to view it.

For a proper HTTP origin (recommended — some browser APIs such as the clipboard need a secure
context, and the browser treats each `file://` page as a separate origin):

```bash
npm run serve        # → http://localhost:8080
```

No dependencies are required. Node is used only for the optional build step and the dev server.

---

## What's in it

Eight pages, matching the original's information architecture:

| Page | File | What it demonstrates |
|---|---|---|
| Home | `index.html` | Hero, stat band, split feature sections, card grids, CTA band |
| Services | `services.html` | Tabbed Industries / Practices / Regions, FAQ accordion |
| People | `people.html` | Live multi-field search over 27 lawyers, live result count |
| Insights | `insights.html` | Filterable content list with URL-synced state, newsletter form |
| Offices | `locations.html` | 45 offices, region filter, address cards |
| Careers | `careers.html` | History timeline, values grid, application form |
| About | `about.html` | Editorial blocks, awards tiles, legal notices |
| Contact | `contact.html` | Validated enquiry form, sidebar with office details |

### Interactions built from scratch

- **Mega menu** — full-width panel on hover *and* keyboard focus, with `aria-expanded` /
  `aria-controls` wiring and a focus trap. Collapses to an off-canvas drawer with
  accordions on small screens.
- **Search dialog** — modal with focus trap, Escape to close, and query routing.
- **Cookie consent** — banner plus a preference centre with three cookie categories,
  persisted in `localStorage`.
- **Live filtering** — the people directory and insights list filter as you type, with the
  result count updating and an empty state.
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
│   ├── css/styles.css          ← one stylesheet, 20 numbered sections
│   ├── js/data.js              ← ALL content: nav, offices, lawyers, insights
│   ├── js/main.js              ← all behaviour, 12 independent modules
│   └── img/*.svg               ← abstract placeholder artwork
├── src/
│   ├── partials/               ← head, header, footer, cookie banner, dialogs
│   └── pages/                  ← page templates
├── tools/
│   ├── build.js                ← assembles pages + partials, checks links
│   └── serve.js                ← 40-line static server
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

The colour and spacing tokens were extracted from the live site's compiled stylesheet
(`whitecase.com`, November 2026) rather than guessed:

| Token | Value | Use |
|---|---|---|
| `--ink` | `#1b1b1b` | Near-black — body text, dark sections |
| `--ink-2` | `#383b43` | Charcoal — secondary surfaces |
| `--accent` | `#2611c9` | Electric indigo — links, CTAs, active states |
| `--grey` | `#707279` | Secondary text |
| `--line` | `#dadada` | Borders, rules |
| `--wash` | `#f4f4f4` | Tinted section backgrounds |

Layout metrics from the original: a 100px header, 60px between blocks, a 335px mega-menu
lead column and 960px measure for body copy. Type is Inter (UI) and Source Serif 4 (editorial),
standing in for the site's proprietary Univers and WCSerifHeadline.

Everything is fluid: `clamp()` for type scale, `grid` for layout, and breakpoints at 1200px,
1024px and 720px. **Verified free of horizontal overflow at 390, 500, 768, 1024 and 1440px.**

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

An automated audit over all eight pages reports **0 duplicate IDs, 0 images missing `alt`,
0 unlabelled fields, 0 links or buttons without an accessible name, and exactly one `<h1>`
per page**.

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

---

## Swapping the placeholder artwork

`assets/img/*.svg` are abstract SVG compositions generated for this project. To use
photography instead, replace the `<img>` in `src/pages/` and rebuild — the CSS already
handles `object-fit: cover` and the correct aspect ratios.

---

## Browser support

Evergreen Chrome, Edge, Firefox and Safari. The site uses CSS Grid, custom properties,
`clamp()`, `IntersectionObserver` and `URLSearchParams` — all widely supported. There is no
polyfill layer and no transpilation step, because there is nothing to transpile.

---

## A note on the content

This is a **student reconstruction of a public website for academic study**. It is not
affiliated with, endorsed by, or operated by White & Case LLP.

Deliberately **not** reproduced: the original logo artwork, brand assets, photography and
editorial copy. The wordmark is set in plain HTML text, all images are original abstract
SVG compositions, and every lawyer name, email address and body paragraph is a fictional
placeholder. The office names, addresses and the site's information architecture are
reproduced because they are the subject of the study.

The footer carries this notice on every page. **If you publish this project anywhere, keep
that notice** — an academic reconstruction of a commercial site should stay clearly
labelled as one, and the fictional content should stay fictional.

Figures quoted on the site (45 offices, 31 countries, 2,000+ lawyers) are kept internally
consistent with the data in `assets/js/data.js` — note that the live site quotes 43 offices
while listing 45 locations, so the replica follows its own data rather than copying that
inconsistency.

---

## Credits

Original site: [whitecase.com](https://www.whitecase.com/) — © White & Case LLP.
Typefaces: Inter and Source Serif 4, both open-licensed.
No frameworks, no dependencies, no build tooling beyond Node's standard library.
