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
assets/styles.css   The entire stylesheet, driven by custom properties
assets/site.js      Mobile nav toggle + contact form handler
assets/img/*.svg    Hand-made placeholder illustrations and the favicon
```

### Design notes

- **Tokens first.** The six brand colours live in `:root` and everything else is
  derived from them with `color-mix()`. No component hard-codes a hex value.
- **Type scale.** Petrona for display, Karla for body and the uppercase eyebrows.
  Seven `clamp()` steps (`--step--1` … `--step-5`) scale fluidly from 375px to
  1440px, so there are no font-size media queries anywhere.
- **Section rhythm.** Every section follows eyebrow → h2 → optional sub-heading →
  one or two short paragraphs → optional button. Backgrounds alternate between
  `--linen` and `--paper`, and each page has exactly one full-width `--ink` band.
- **One breakpoint.** A single `@media (min-width: 54em)` handles every layout
  change. Card, pillar and testimonial grids use `auto-fit` + `minmax()`, so the
  in-between sizes take care of themselves.
- **The breathing ring** (hero, `index.html`) is the one bold element: concentric
  SVG circles on a 12-second CSS cycle — 4s expand, 2s hold, 4s contract, 2s hold
  — with a label alternating between "breathe in" and "breathe out". Under
  `@media (prefers-reduced-motion: reduce)` the animation is removed entirely,
  the ring holds a static mid-breath size, and the alternating label is replaced
  by a single static word.

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
| Page `<title>` | `index.html`, `about.html`, `services.html`, `contact.html` | line 6 of each |
| Meta description | same four files | line 7 of each |
| Shared header (logo mark, wordmark, nav, social) | same four files | lines 17–62 of each |
| Wordmark in header | same four files | line 29 of each |
| Hero `<h1>` "Wildlight Wellness" | `index.html` | line 72 |
| Shared footer (wordmark, tagline, links, address) | `index.html` 246–302 · `about.html` 186–242 · `services.html` 188–244 · `contact.html` 186–242 | — |
| Wordmark in footer | `index.html` 257 · `about.html` 197 · `services.html` 199 · `contact.html` 197 |
| Logo SVG mark (three concentric circles) | inline in each header/footer; standalone copy in `assets/img/favicon.svg` | — |

### 2. Contact details

Phone, email and postal address appear twice: once in the shared footer of every
page, and once in full on the contact page.

| What | File | Lines |
|---|---|---|
| Footer "Reach us" (phone, email, address) | `index.html` 288–294 · `about.html` 228–234 · `services.html` 230–236 · `contact.html` 228–234 | — |
| Full details list (phone / email / hours / location) | `contact.html` | 86–107 |
| Crisis / not-an-emergency-service notice | `contact.html` | 109–111 |
| Direct email CTA in the ink band | `contact.html` | 179 |
| Social profile URLs (currently `#instagram-placeholder`, `#facebook-placeholder`) | all four pages | header 45, 50, 54 · footer 261/266/270 (`index.html`), 201/206/210 (others) |
| `mailto:` address | all four pages | header line 54; footer as above |

### 3. Service names and copy

| What | File | Lines |
|---|---|---|
| Service preview cards (names + one-liners) | `index.html` | 205–224 |
| **Somatic Unwinding** — heading, price, copy, what's included, CTA | `services.html` | 79–107 |
| **Inner Compass Sessions** — same | `services.html` | 110–137 |
| **Seasons Circle** — same | `services.html` | 140–168 |
| Price lines (`$000 placeholder`) | `services.html` | 90, 121, 151 |
| Service options in the enquiry form `<select>` | `contact.html` | 134–140 |
| Section anchors (`#somatic-unwinding`, `#inner-compass`, `#seasons-circle`) | `services.html` 79, 110, 140 — also linked from `index.html` 205, 212, 219 | — |

If you rename a service, update its `id` **and** the three links in
`index.html` that point at it.

### 4. Colour tokens and type

| What | File | Lines |
|---|---|---|
| The six brand colours (`--ink`, `--sage`, `--brass`, `--linen`, `--mist`, `--paper`) | `assets/styles.css` | 15–20 |
| Derived roles (text, rules, hovers — all `color-mix()` of the six above) | `assets/styles.css` | 22–35 |
| Font families | `assets/styles.css` | 38–39 |
| Google Fonts `<link>` | all four pages | line 11 of each |
| Type scale (`--step--1` … `--step-5`) | `assets/styles.css` | 42–48 |
| Spacing scale | `assets/styles.css` | 55–64 |

Changing lines 15–20 re-themes the whole site; nothing below that block uses a
raw hex value. If you change the font families, update the Google Fonts `<link>`
on all four pages to match.

### 5. Placeholder images

Every illustration in `assets/img/` was drawn as flat SVG using the brand
palette. Replace the files, keep the filenames, and update the `alt` text:

| File | Used on | Alt text at |
|---|---|---|
| `portrait-placeholder.svg` | `about.html` story section | `about.html` 83–84 |
| `about-studio.svg` | `about.html` philosophy section | `about.html` 112–113 |
| `service-somatic.svg` | `services.html` block one | `services.html` 83–84 |
| `service-inner-compass.svg` | `services.html` block two | `services.html` 114–115 |
| `service-seasons.svg` | `services.html` block three | `services.html` 144–145 |
| `favicon.svg` | all four pages | `<link rel="icon">`, line 8 of each |

If you swap in photographs, keep the `aspect-ratio` on `.media img`
(`assets/styles.css`) or set your own — the frames expect 4:3, and 3:4 for the
portrait.

### 6. Testimonials

The three quotes on `about.html` (lines 147–164) are invented, and labelled as
such in the surrounding copy at lines 140–142. Replace them with real, consented
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

## Licence and content

All copy, markup, CSS and SVG in this repository was written from scratch for
this project. Nothing was scraped, fetched or copied from any live website.
"Wildlight Wellness", its practitioner, its testimonials, its address and its
phone number are fictional placeholders.
