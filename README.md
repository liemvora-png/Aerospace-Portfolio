# SKYWARD

Concept aircraft design portfolio for **SKYWARD**, an illustrative regional-aircraft study. The site introduces the design intent and explores the preliminary configuration, performance goals, planned simulations, development roadmap, and documentation.

## Concept disclaimer

SKYWARD is a fictional, early-stage design concept—not a real, built, flight-tested, or certified aircraft. Specifications and numerical targets are explicitly illustrative assumptions, not measured or validated data. No information on this site is suitable for engineering, safety, or operational decisions.

## Information architecture

- **Home** — concept overview and original aircraft illustration
- **Concept** — mission intent and design approach
- **Aircraft** — specifications, cabin layout, aerodynamics, propulsion, and structure
- **Performance** — conceptual mission goals and study questions
- **Simulation** — planned aerodynamics, energy, and structural analysis
- **Development** — phased design roadmap
- **Documentation** — concept brief, analysis plan, and design limitations

## Stack

The site is plain HTML, CSS, inline SVG, and dependency-free JavaScript. There is no package manager, build step, or installation required.

| Path | Purpose |
| --- | --- |
| `index.html` | Single-page aircraft design portfolio and section navigation |
| `assets/css/styles.css` | Design tokens, responsive layout, and components |
| `assets/js/main.js` | Responsive navigation, scroll state, and accessible reveal behavior |
| `favicon.svg` | SKYWARD aircraft mark |
| `about.html`, `services.html`, `contact.html` | Legacy routes redirected to relevant portfolio sections |
| `404.html` | GitHub Pages not-found page |
| `.nojekyll` | Publishes the repository as-is |

## Local preview

```bash
python -m http.server 8080
# open http://localhost:8080
```

All page and asset links are relative, so the site works on GitHub Pages project sites and custom domains.
