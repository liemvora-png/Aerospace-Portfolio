# deltav

Concept aircraft mission-study portfolio for **deltav**, an illustrative two-seat homebuilt-aircraft study. The site records a proposed mission, component choices, feasibility gaps, and a plan for qualified design review.

## Concept disclaimer

deltav is a fictional, early-stage design concept—not a real, built, flight-tested, or certified aircraft. The mission figures are user-provided goals, not measured or validated data. No information on this site is suitable for construction, engineering, safety, or operational decisions. Feasibility is not established, and qualified aircraft-design and regulatory review is required.

## Information architecture

- **Home** — concept overview and original aircraft illustration
- **Concept** — proposed two-person mission and design status
- **Aircraft** — proposed specifications, cabin layout, aerodynamics, propulsion, and structure
- **Performance** — endurance, cruise, takeoff-distance goals, and feasibility gaps
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
| `favicon.svg` | deltav aircraft mark |
| `about.html`, `services.html`, `contact.html` | Legacy routes redirected to relevant portfolio sections |
| `404.html` | GitHub Pages not-found page |
| `.nojekyll` | Publishes the repository as-is |

## Local preview

```bash
python -m http.server 8080
# open http://localhost:8080
```

All page and asset links are relative, so the site works on GitHub Pages project sites and custom domains.

## Mission-study notes

The current proposed inputs are four hours of flight, two passengers with a combined target of 300 lb (whether this includes the pilot is unspecified), 80 mph cruise, a 0.5-mile takeoff-distance goal, a Polini Thor 250 engine at a proposed 5,000 RPM target, a two-blade propeller, and a 20 US gallon fuel tank. Proposed structure and controls are A2017 aluminum frame and plates described as welded, flaps without ailerons, and vertical and horizontal tail surfaces. These are not a verified or approved aircraft configuration.

In principle, the goals are not obviously contradictory for a purpose-designed light aircraft, but the proposed engine/airframe combination is not shown to meet them. At 80 mph for four hours, the arithmetic is 320 statute miles in still air before taxi, climb, reserves, wind, diversion, or other mission factors. Using all 20 US gallons over four hours would allow at most 5 US gal/h before reserve and unusable fuel, so the required cruise fuel flow must be lower. The manufacturer-published Thor 250 specifications (36 hp maximum, 8,000 RPM maximum, and 2.9 L/h at a stated 30 kg static-thrust condition) do not provide verified power or fuel consumption for this proposed aircraft operating point. The engine's maximum rating is not a continuous aircraft rating. See the [manufacturer's Thor 250 information](https://www.polinithor.com/en/technical-area/thor-250-250-ds/).

Key open issues include the missing lateral-control solution, engine/propeller compatibility and aircraft installation, fuel endurance at the intended power, takeoff conditions, mass and balance, and the suitability and qualification of welded A2017 structure. Do not build or fly from this concept; obtain qualified aerospace engineering and regulatory review.
