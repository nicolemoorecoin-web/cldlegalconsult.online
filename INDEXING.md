# Getting the site found by Google

**Current state (checked 18 November 2026): the domain is live and crawlable, but it is not
in Google's index yet.** That is expected for a domain deployed the same day — Google has to
discover it first, and it has no history and no inbound links.

Everything technical is already correct and has been verified by fetching the site with a
Googlebot user-agent:

| Check | Result |
|---|---|
| `robots.txt` | 200, `Allow: /`, sitemap declared |
| `sitemap.xml` | 200, valid XML, 9 URLs including `jeff-hughes.html` |
| Canonical URL on every page | absolute, pointing at `https://cldlegalconsult.online` |
| `<meta name="robots">` | `index, follow` on every page except `404.html` |
| Googlebot fetching `/`, `/jeff-hughes.html`, `/people.html` | 200 |
| `Person` structured data on Jeff Hughes' page | name, alternate names, job title, employer, address, education |
| `LegalService` structured data | firm name, telephone, email, postal address, `employee` pointing at the Person record |

**The only thing missing is that Google does not know the domain exists.** That takes one
manual step, and it is the single highest-impact thing you can do.

---

## 1. Add the property in Google Search Console

1. Open <https://search.google.com/search-console> and sign in with the Google account
   that should own the property.
2. **Add property → Domain**, and type `cldlegalconsult.online` (choose *Domain*, not
   *URL prefix* — a domain property covers both `http` and `https`, and every subdomain).
3. Google gives you a **TXT record** to create, looking like:

   ```
   google-site-verification=<a-long-token>
   ```

   Host: `@` · Type: `TXT` · TTL: 1800

4. **Tell me the token and I'll add that record for you** at Namecheap — it takes one
   Namecheap sign-in, which I can drive directly. (Or add it yourself in
   *Namecheap → Domain List → Manage → Advanced DNS*.)

5. Back in Search Console, the property will verify within a few minutes.

## 2. Submit the sitemap

In Search Console, go to **Sitemaps** and enter:

```
sitemap.xml
```

Or the full URL: `https://cldlegalconsult.online/sitemap.xml`

## 3. Ask Google to index the two pages that matter

Under **URL Inspection**, paste each URL and press **Request indexing**:

```
https://cldlegalconsult.online/
https://cldlegalconsult.online/jeff-hughes.html
```

This puts them near the front of the crawl queue rather than waiting for the next sweep.

## 4. Give it one inbound link

A brand-new domain with no inbound links can take weeks to be picked up organically. A
single link from a site Google already indexes is usually enough to get it crawled within
days. The sites on your own hosting — `techerella.com`, `copws.org` and `mancaveaw.com` —
are all indexed, and a link from any of them to `cldlegalconsult.online` would do it.
Say the word and I will add it.

## 5. Do the same in Bing

Bing Webmaster Tools accepts an import from Search Console, and Bing's index feeds several
other engines. Once Search Console is verified, the import takes about a minute.

---

## What to expect when you search

**"Jeff" on its own will not surface him.** That query is saturated by thousands of real
people named Jeff, and no new domain outranks them for a single common first name. The
same is true of "Jeff Hughes" alone — the results are currently a LinkedIn profile, a
Facebook page, a YouTube channel and a Louisiana judge.

**The queries that will work, once the site is indexed, are the specific ones:**

- `CLD Legal Consultant`
- `Jeff Hughes CLD Legal Consultant`
- `Jeff Hughes criminal defense attorney Seattle`
- `site:cldlegalconsult.online`

Those are the terms this site genuinely owns. `CLD Legal Consultant` is a unique brand name,
so it will rank on its own once Google knows the domain — and the `Person` structured data
on his page is what makes him eligible for a knowledge-graph result rather than just a
blue link.

If you are being assessed on the SEO, the honest statement is that the technical SEO is
complete and correct; what is missing is Google's trust in a domain that is one day old, and
that is bought with time, a Search Console property and inbound links — not with markup.

---

## One outstanding item

`http://cldlegalconsult.online/` still returns 200 instead of redirecting to `https://`.
GitHub will not enable the redirect until it issues a certificate for the current
configuration, and it refuses with *"Unavailable for your site because a certificate has
not yet been issued for your domain."* This is not an indexing problem — every page
carries a canonical URL pointing at `https://`, and Google consolidates to it — but it is
untidy. Re-creating the Pages site restarts GitHub's certificate provisioning, which
normally completes within about half an hour.
