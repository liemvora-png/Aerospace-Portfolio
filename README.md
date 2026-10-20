# Portfolio

Personal site for **Liem Vora** — music and engineering.

The content mirrors the Notion workspace: orchestral arrangement, composition and
conducting; founder of a six-piece string ensemble ($10,000+ / year in wedding
revenue); founder of a school AI club with 40+ members and the personal AI +
cloud storage server behind it; an aircraft design project; and jazz research
notes on *Milestones*, *Free Spirits*, and *Money Jungle*.

## Stack

Zero dependencies, zero build step, no framework.

| Path | Purpose |
| --- | --- |
| `index.html` | Semantic markup for every section |
| `assets/css/styles.css` | Design tokens, light/dark themes, layout, components |
| `assets/js/main.js` | Theme toggle, mobile nav, scroll reveals, stat count-ups, hero canvas |
| `favicon.svg` | Mark used in the browser tab |
| `404.html` | GitHub Pages error page |
| `.nojekyll` | Publishes the repo as-is (no Jekyll processing) |

Everything is plain HTML, CSS, and ES5-compatible JavaScript. There is no
`package.json`, no lockfile, and nothing to install.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

**Settings → Pages → Build and deployment → Source: Deploy from a branch**
→ branch `main`, folder `/ (root)`.

> The repository is currently private. GitHub Pages only serves private
> repositories on paid plans — make the repo public, or use a paid account, to
> publish the site. The `404.html` and asset paths assume the project-site
> URL `https://liemvora-png.github.io/Portfolio/`.

## Editing content

All copy lives in `index.html`.

- **Headline figures** are `data-count` / `data-prefix` / `data-suffix` attributes
  on `.stat-num` elements.
- **Project details** are the `.work-card` blocks under `#work`.
- **The ensemble ledger** is the `<table class='ledger-table'>` in `#music`.
- **The aircraft spec** is the `.spec-list` definition list in `#engineering`.
- **Contact details** are the `.contact-card` links in `#contact`.

## Design notes

Two accents carry the whole palette: a warm brass (`--accent`) for the music
half and a cool cyan (`--cool`) for the engineering half. The hero canvas draws
a signal wave crossed by orthogonal circuit traces, which is the same idea in
one image — a signal moving through a system.

Both themes are defined entirely in CSS custom properties, so a third theme is a
single override block. The site respects `prefers-reduced-motion` (the canvas
animation and all transitions switch off) and `prefers-color-scheme` (the
default theme follows the OS until you pick one, then your choice sticks).

## Credits

Typefaces: Fraunces, Inter, and JetBrains Mono via Google Fonts.
