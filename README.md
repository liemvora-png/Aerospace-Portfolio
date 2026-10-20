# Portfolio

Personal site for **Liem Vora** — music and engineering.

Four static pages: a homepage that routes to About, Services and Contact.

The content mirrors the Notion workspace: orchestral arrangement, composition and
conducting; founder of a six-piece string ensemble ($10,000+ / year in wedding
revenue); founder of a school AI club with 40+ members and the personal AI +
cloud storage server behind it; and a TMEA Region 23 All-State qualification.

## Stack

Zero dependencies, zero build step, no framework.

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage — hero, headline figures, links out to the other pages |
| `about.html` | Biography, the three things I built, honors, skills |
| `services.html` | Five service cards and a closing note |
| `contact.html` | Ways to reach me and what to include in an enquiry |
| `assets/css/styles.css` | Design tokens, light/dark themes, layout, components |
| `assets/js/main.js` | Theme toggle, mobile nav, scroll reveals, stat count-ups, hero canvas |
| `favicon.svg` | Mark used in the browser tab |
| `404.html` | GitHub Pages error page |
| `.nojekyll` | Publishes the repo as-is (no Jekyll processing) |

Everything is plain HTML, CSS, and ES5-compatible JavaScript. There is no
`package.json`, no lockfile, and nothing to install.

Because there is no build step, the header and footer are **copied into each
page**. Change them in all four files at once.

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
> publish the site.

### Asset paths

Every asset link in `index.html`, `about.html`, `services.html`, `contact.html`
and `404.html` is **relative** (`assets/css/styles.css`, `favicon.svg`), never
absolute. That way the site resolves correctly whether it is served from the
project-site URL (`https://liemvora-png.github.io/Portfolio/`) or from a custom
domain (`https://liemvora.me/`) where the site root is the domain itself.

An absolute path such as `/Portfolio/assets/css/styles.css` breaks the moment a
custom domain is added, because the browser requests it from the domain root
and gets a 404. If you add or remove a `CNAME`, no file changes are needed.

Page-to-page links (`about.html`, `services.html`, `contact.html`) are relative
for the same reason — do not prefix them with `/Portfolio/`.

## Editing content

Each page carries its own editing map in an HTML comment at the top of the file.

**`index.html`**

- **Headline figures** are `data-count` / `data-prefix` / `data-suffix` attributes
  on `.stat-num` elements.
- **Page routes** are the `.contact-card` links in the routes section.

**`about.html`**

- **Biography prose** is the `.about-body` paragraphs.
- **Quick facts** are the `.spec-list` rows in the "At a glance" panel.
- **Projects** are the `.work-card` blocks under `#work`.
- **Honors** are the `.honor` items under `#honors`.
- **Skills** are the `.chips` list in `.currently`.

**`services.html`**

- **Service cards** are the `.work-card` blocks under `#services`.

**`contact.html`**

- **Contact details** are the `.contact-card` links.
- **Enquiry checklist** is the `.spec-list` in the closing panel.

## Design notes

Two accents carry the whole palette: a warm brass (`--accent`) for the music
half and a cool cyan (`--cool`) for the engineering half. The hero canvas draws
a signal wave crossed by orthogonal circuit traces, which is the same idea in
one image — a signal moving through a system.

Both themes are defined entirely in CSS custom properties, so a third theme is a
single override block. The site respects `prefers-reduced-motion` (the canvas
animation and all transitions switch off) and `prefers-color-scheme` (the
default theme follows the OS until you pick one, then your choice sticks).

Inner pages use a shorter hero (`style='min-height:auto'` on the section, and a
smaller title size) than the full-height homepage hero.

## Credits

Typefaces: Fraunces, Inter, and JetBrains Mono via Google Fonts.
