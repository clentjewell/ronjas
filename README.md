# Wildlight Wellness

A static marketing site for **Wildlight Wellness**, a fictional holistic wellness
and emotional-healing practice. Every word, colour and shape here is original
placeholder content, written to be swapped out.

No build step, no framework, no npm, no CSS framework. Four HTML files, one
hand-written stylesheet, one small vanilla JavaScript file and a folder of SVG
placeholders that were generated for this repo.

---

## Running it

Double-click `index.html`. That's it — it opens straight from the filesystem.

If you'd rather serve it over HTTP (useful for testing, not required):

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

The two Google Fonts (Petrona and Karla) are loaded from the network with
`display=swap`. Offline, the site falls back to Georgia and Helvetica/Arial and
still lays out correctly.

---

## What's in here

```
index.html          Home: hero + breathing ring, benefits, pillars, service preview, CTA
about.html          Story, philosophy, three testimonials, CTA
services.html       Three service detail blocks (alternating image side), CTA
contact.html        Contact details + enquiry form
404.html            Not-found page, served by Cloudflare for unmatched paths
assets/styles.css   The entire stylesheet, driven by custom properties
assets/site.js      Mobile nav toggle + contact form handler
assets/img/*.svg    Hand-made placeholder illustrations and the favicon
                    hero-photo.svg    full-bleed hero image
                    band-*.svg        full-bleed bands between text sections
wrangler.jsonc      Cloudflare Workers deploy config (hosting only, not a build step)
.assetsignore       Files wrangler must NOT upload (repo metadata)
.github/workflows/  Auto-deploy to Cloudflare on every push to main
```

### Design notes

- **Tokens first.** The six brand colours live in `:root` and everything else is
  derived from them with `color-mix()`. No component hard-codes a hex value.
  The palette is warm and earthy — cream and sand surfaces, muted olive, a clay
  accent, and a warm near-black rather than a cool one.
- **Type scale.** Jost for display headings (light weight, large and airy) and
  Karla for body and the uppercase eyebrows. Seven `clamp()` steps
  (`--step--1` … `--step-5`) scale fluidly from 375px to 1440px, so there are no
  font-size media queries anywhere.
- **Section rhythm.** Every section follows eyebrow → h2 → optional sub-heading →
  one or two short paragraphs → optional button. Backgrounds alternate between
  `--linen` and `--paper`, and each page has exactly one full-width `--ink` band.
- **One breakpoint.** A single `@media (min-width: 54em)` handles every layout
  change. Card, pillar and testimonial grids use `auto-fit` + `minmax()`, so the
  in-between sizes take care of themselves.
- **Photography-led.** `index.html` opens on a full-bleed image with the heading,
  promise and breathing ring over a gradient scrim. Full-bleed image bands break
  up the text further down each page, giving the long scroll a slower rhythm.
- **The breathing ring** (hero, `index.html`) is the one bold element: concentric
  SVG circles on a 12-second CSS cycle — 4s expand, 2s hold, 4s contract, 2s hold
  — with a label alternating between "breathe in" and "breathe out". Under
  `@media (prefers-reduced-motion: reduce)` the animation is removed entirely,
  the ring holds a static mid-breath size, and the alternating label is replaced
  by a single static word.

### Colour and contrast

Every text/background pairing was measured, not eyeballed. The `color-mix()`
percentages in `:root` are chosen so each derived role clears WCAG AA (4.5:1)
on the surface it sits on:

| Role | Ratio |
|---|---|
| body text on cream / on paper | 12.97 / 14.37 |
| muted text on cream / on paper | 4.92 / 5.45 |
| clay eyebrow on cream / on paper | 4.99 / 5.53 |
| primary button fill vs its cream label | 5.45 |
| text on the dark band | 12.97 |
| muted text on the dark band | 7.77 |
| eyebrow on the dark band | 6.17 |

Two of these were genuine fixes, not just re-tuning: the earlier sage button fill
(3.26) and brass eyebrow (3.00) both failed AA. `--primary-fill` exists because
`--sage` is too light to carry cream text on its own — use `--sage` for fills and
decoration, `--primary-fill` for anything with text on it.

If you change the six tokens, re-check these pairings. The hero scrim is
deliberately heavy so cream text stays legible over an unknown photograph; if you
swap the hero image, check the heading contrast again.

### Accessibility

- Skip-to-content link, semantic `header` / `nav` / `main` / `footer` landmarks,
  and exactly one `h1` per page.
- Visible `--brass` focus ring on every interactive element, via `:focus-visible`.
- The mobile menu closes on link click and on <kbd>Esc</kbd>, and returns focus
  to the toggle button.
- All decorative SVG is `aria-hidden`; every `<img>` has descriptive alt text.
- The form's confirmation is an `aria-live="polite"` region and receives focus.

---

## Swap in your own content

Line numbers are from the initial commit. Search for the quoted strings if they
have drifted.

### 1. Brand name and logo

The name appears in the shared header and footer of all four pages, plus the
page title. The header block is **byte-identical on every page** except for the
`aria-current="page"` marker — edit one, then paste it over the others.

| What | File | Lines |
|---|---|---|
| Page `<title>` | all five pages | line 6 of each |
| Meta description | same four files | line 7 of each |
| Shared header (logo mark, wordmark, nav, social) | the four pages | lines 17–62 of each |
| Shared header/footer on the 404 page | `404.html` | header 18–63 · footer 127–183 |
| Wordmark in header | the four pages line 29 · `404.html` line 30 | — |
| Hero `<h1>` "Wildlight Wellness" | `index.html` | line 76 (inside the photo hero, 67–105) |
| Shared footer (wordmark, tagline, links, address) | `index.html` 255–311 · `about.html` 191–247 · `services.html` 193–249 · `contact.html` 191–247 · `404.html` 127–183 | — |
| Wordmark in footer | `index.html` 266 · `about.html` 202 · `services.html` 204 · `contact.html` 202 · `404.html` 138 |
| Logo SVG mark (three concentric circles) | inline in each header/footer; standalone copy in `assets/img/favicon.svg` | — |

### 2. Contact details

Phone, email and postal address appear twice: once in the shared footer of every
page, and once in full on the contact page.

| What | File | Lines |
|---|---|---|
| Footer "Reach us" (phone, email, address) | starts at `index.html` 297 · `about.html` 233 · `services.html` 235 · `contact.html` 233 · `404.html` 169 | — |
| Full details list (phone / email / hours / location) | `contact.html` | 86–107 |
| Crisis / not-an-emergency-service notice | `contact.html` | 109–111 |
| Direct email CTA in the ink band | `contact.html` | 184 |
| Social profile URLs (currently `#instagram-placeholder`, `#facebook-placeholder`) | all four pages | header 45, 50, 54 · footer 261/266/270 (`index.html`), 201/206/210 (others) |
| `mailto:` address | all four pages | header line 54; footer as above |

### 3. Service names and copy

| What | File | Lines |
|---|---|---|
| Service preview cards (names + one-liners) | `index.html` | 214–233 |
| **Somatic Unwinding** — heading, price, copy, what's included, CTA | `services.html` | 79–107 |
| **Inner Compass Sessions** — same | `services.html` | 110–137 |
| **Seasons Circle** — same | `services.html` | 145–173 |
| Price lines (`$000 placeholder`) | `services.html` | 90, 121, 156 |
| Service options in the enquiry form `<select>` | `contact.html` | 134–140 |
| Section anchors (`#somatic-unwinding`, `#inner-compass`, `#seasons-circle`) | `services.html` 79, 110, 145 — also linked from `index.html` 214, 221, 228 | — |

If you rename a service, update its `id` **and** the three links in
`index.html` that point at it.

### 4. Colour tokens and type

| What | File | Lines |
|---|---|---|
| The six brand colours (`--ink`, `--sage`, `--brass`, `--linen`, `--mist`, `--paper`) | `assets/styles.css` | 15–20 |
| Derived roles (text, rules, hovers — all `color-mix()` of the six above) | `assets/styles.css` | 23–42 |
| Font families | `assets/styles.css` | 45–46 |
| Google Fonts `<link>` | all five pages | line 9–11 (`404.html` 10–12) |
| Type scale (`--step--1` … `--step-5`) | `assets/styles.css` | 49–55 |
| Spacing scale | `assets/styles.css` | 62–71 |

Changing lines 15–20 re-themes the whole site; nothing below that block uses a
raw hex value. If you change the font families, update the Google Fonts `<link>`
on all four pages to match.

### 5. Placeholder images

Every illustration in `assets/img/` was drawn as flat SVG using the brand
palette. Replace the files, keep the filenames, and update the `alt` text:

| File | Used on | Alt text at |
|---|---|---|
| `hero-photo.svg` | `index.html` full-bleed hero | `index.html` 68–69 |
| `band-quiet.svg` | `index.html`, `services.html` bands | `index.html` 153 · `services.html` 141 |
| `band-hands.svg` | `about.html`, `contact.html` bands | `about.html` 109 · `contact.html` 170 |
| `portrait-placeholder.svg` | `about.html` story section | `about.html` 83–84 |
| `about-studio.svg` | `about.html` philosophy section | `about.html` 117–118 |
| `service-somatic.svg` | `services.html` block one | `services.html` 83–84 |
| `service-inner-compass.svg` | `services.html` block two | `services.html` 114–115 |
| `service-seasons.svg` | `services.html` block three | `services.html` 144–145 |
| `favicon.svg` | all five pages | `<link rel="icon">`, line 8 (`404.html` 9) |

If you swap in photographs, keep the `aspect-ratio` on `.media img`
(`assets/styles.css`) or set your own — the frames expect 4:3, and 3:4 for the
portrait.

### 6. Testimonials

The three quotes on `about.html` (lines 152–169) are invented, and labelled as
such in the surrounding copy at lines 145–147. Replace them with real, consented
client feedback — and delete that disclaimer paragraph when you do.

---

## Wiring up the contact form

The form is plain HTML. `assets/site.js` intercepts the submit, runs the
browser's own validation, and reveals the inline confirmation. Nothing is sent
anywhere.

To connect a real backend, replace the body of `sendEnquiry()` at
**`assets/site.js` lines 78–84** — a worked `fetch()` example sits directly above
it, inside the comment at **lines 56–73** (the example itself is lines 61–70). The function just has to return a Promise.

Then set `action` and `method` on the `<form>` element (`contact.html` line 116)
so the form degrades gracefully with JavaScript disabled.

---

## Hosting on Cloudflare Workers

The site is deployed as a **Workers static-assets** project — no Worker script,
no bundler, no framework. Wrangler uploads the files exactly as they are in this
repo, so the "no build step" rule still holds: `wrangler.jsonc` is hosting
configuration, not a build pipeline.

Live: <https://ronjasjoy.clent.workers.dev>

### Deploying an update

```
npx wrangler deploy
```

That's the whole workflow. Edit a file, run the command, it's live. Wrangler
needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your environment, or
run `npx wrangler login` once to authenticate interactively.

### What gets uploaded

Only the site: the five HTML pages, `assets/styles.css`, `assets/site.js` and the
six SVGs — 13 files. Because `assets.directory` is the repo root, **`.assetsignore`
is what keeps everything else out**, including `.git`, `README.md` and
`wrangler.jsonc` itself. If you add a file that should not be public, add it to
`.assetsignore` before deploying, then confirm it 404s on the live URL.

### URL behaviour

`html_handling` is `auto-trailing-slash`, so the canonical URLs are extensionless:

| Request | Result |
|---|---|
| `/` | `index.html` |
| `/about` | `about.html` (200) |
| `/about.html` | 307 redirect to `/about` |
| anything unmatched | `404.html` with a real 404 status |

The site's internal links deliberately keep the `.html` extension so that
`index.html` still works when opened straight off the filesystem. The cost is one
307 redirect per internal click on the hosted version. If you would rather links
resolve with no redirect, set `"html_handling": "none"` in `wrangler.jsonc` — you
then lose the extensionless URLs.

### Auto-deploy on push

`.github/workflows/deploy.yml` deploys to Cloudflare on every push to `main`.
It checks out the repo, runs `cloudflare/wrangler-action`, then verifies the live
site: all four pages must return 200, and `.git/config`, `README.md` and
`wrangler.jsonc` must return 404. If any check fails, the run fails loudly rather
than leaving a bad deploy unnoticed.

**It needs two repository secrets before it can work.** Add them under
Settings → Secrets and variables → Actions → New repository secret:

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create Token → **Edit Cloudflare Workers** template |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID in the right-hand sidebar |

Until both exist, the workflow will run and fail on authentication. Manual
`npx wrangler deploy` keeps working regardless.

Pushes that only touch `README.md` or `.gitignore` are skipped, since neither is
ever uploaded. Concurrent runs cancel in-flight ones so a newer push always wins.

### Custom domain

`ronjasjoy.clent.workers.dev` is the free workers.dev subdomain. To put
this on a real domain, add the domain to the same Cloudflare account, then attach
it under Workers &amp; Pages → ronjasjoy → Settings → Domains & Routes.

---

## Licence and content

All copy, markup, CSS and SVG in this repository was written from scratch for
this project. Nothing was scraped, fetched or copied from any live website.
"Wildlight Wellness", its practitioner, its testimonials, its address and its
phone number are fictional placeholders.
