# Ronja's Joy

A static site for **Ronja's Joy** — the Egyptian Emotional Clearing Technique
practice in Banora Point, NSW. This replaces a WordPress + Astra + Elementor build.

Copy, contact details, logo and icons are the client's own, migrated from the
existing site. Layout, CSS and JavaScript are written from scratch here.

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

### Brand assets and where they came from

| Asset | Source |
|---|---|
| `assets/img/logo-eect.png` | client's site — header logo |
| `assets/img/logo-footer.png` | client's site — footer mark |
| `assets/img/icon-*.png` (6) | client's site — Elementor icon set |
| Palette | **sampled from the logo files**, not guessed |
| Fonts | Josefin Sans + Poppins — two of the five the old site loaded |

The brand brown `#704820` is the exact colour of the tree mark in the EECT logo;
the olive `#586848` is sampled from the footer mark. Everything else derives from
those two plus three warm neutrals.

**Still outstanding:** the old site had no photography in its markup, so the
portrait and section images are still generated placeholders
(`portrait-placeholder.svg`, `about-studio.svg`, `service-*.svg`). Drop real
photographs in at those paths and update the `alt` text. Social profile URLs are
also still `#facebook-placeholder` / `#instagram-placeholder` — the old site's
icons had no href on them.

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

Line numbers are from this commit and were generated from the files, not by hand.
Search for the quoted strings if they drift.

### 1. Brand name and logo

The header block is byte-identical on every page except the `aria-current="page"`
marker — edit one, then paste it over the others.

| What | Where |
|---|---|
| Page `<title>` | line 6 of all five pages |
| Meta description | line 7 of all five pages |
| Google Fonts `<link>` | line 11 (`404.html` line 12); the two `preconnect` hints sit just above |
| Shared header, logo to `</header>` | lines 17–58 (`404.html` 18–59) |
| Header logo image | `assets/img/logo-eect.png`, line 24 of each page (`404.html` 25) |
| Hero `<h1>` "Ronja's Joy" | `index.html` line 68 |
| Page `<h1>` | `about.html` 65 · `services.html` 65 · `contact.html` 65 · `404.html` 66 |
| Shared footer | `index.html` 236–288 · `about.html` 161–213 · `services.html` 177–229 · `contact.html` 178–230 · `404.html` 119–171 |
| Footer logo image | `assets/img/logo-footer.png`, first line of each footer block |

### 2. Contact details

Phone, email, hours and location appear in the shared footer of every page, and in
full on the contact page.

| What | Where |
|---|---|
| Full details list (phone / email / opening times / visit us) | `contact.html` 79–96 |
| Crisis notice (000 / Lifeline) | `contact.html`, just below the details list |
| Footer "Contact" column | inside each footer block, above |
| `mailto:` address | header social row, and the footer of every page |
| Social profile URLs | header lines 41 and 45 (`#facebook-placeholder`, `#instagram-placeholder`), plus the same pair in the footer |

### 3. Services

| What | Where |
|---|---|
| **Emotional Clearing Technique** | `services.html` from line 73 |
| **Lifestyle Transformation** | `services.html` from line 103 |
| **Essential Oil Education** | `services.html` from line 132 |
| Service preview cards | `index.html` from line 195 |
| Service options in the enquiry `<select>` | `contact.html`, inside the form at line 105 |

Rename a service and you must update its `id` **and** the three links in
`index.html` that point at it.

### 4. Colour tokens and type

| What | File | Lines |
|---|---|---|
| The six brand colours | `assets/styles.css` | 16–21 |
| Derived roles (all `color-mix()` of the six) | `assets/styles.css` | just below, to line 42 |
| Font families | `assets/styles.css` | 45–46 |

Changing lines 16–21 re-themes the whole site; nothing below uses a raw hex value.
Re-check the contrast table above if you do — several roles sit close to the AA
floor by design.

### 5. Images

Client assets are real. The remaining `.svg` files are placeholders awaiting
photography — keep the filenames and update the `alt` text when you replace them.

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
