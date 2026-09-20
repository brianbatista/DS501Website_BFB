# Fieldnotes — portfolio prototype

A local, eight-page design study for a portfolio connecting research, teaching, and creative practice. “Your Name,” every project, and every teaching example are fictional placeholders. SVG compositions stand in for images; no remote images, fonts, credentials, publications, or results are used.

## Run

Requires Node.js 20 or newer. No dependencies to install.

```sh
npm run dev     # http://127.0.0.1:5173
npm run build   # Generate dist/
npm test        # Build and check routes, links, assets, and recovery page
```

Without npm, use `node scripts/dev.mjs`, `node scripts/build.mjs`, or `node --test tests/site.test.mjs`. The development server rebuilds when `src/` or `public/` changes; refresh the browser to see edits. Stop it with Ctrl+C. Generated `dist/` is ignored by Git.

## Stack and structure

Modern semantic HTML, layered CSS, and native JavaScript ES modules. A small Node build assembles reusable template components into real static pages; no client-side framework or JavaScript is required. Native `<details>` elements handle keyboard-accessible teaching disclosures. This keeps the design prototype small and easy to change without a CMS, backend, or hosting configuration.

- `src/components.mjs`: shared document shell, navigation, headings, links, figures, and geometric SVG placeholders.
- `src/pages.mjs`: the eight page compositions and placeholder copy.
- `src/styles.css`: design tokens, component styles, dark creative theme, and responsive layouts.
- `public/`: local static assets, currently the favicon.
- `scripts/`: static build and local preview server.
- `tests/`: generated-route and link-integrity checks.

| Page | Route |
| --- | --- |
| Home | `/` |
| Research | `/research/` |
| Example research project | `/research/shared-spaces/` |
| Teaching | `/teaching/` |
| Creative Work | `/creative/` |
| Photography | `/creative/photography/` |
| VR / Game Design | `/creative/vr-game-design/` |
| About | `/about/` |

To edit the visual system, start with the custom properties in `src/styles.css`. To change identity, update the shared shell in `src/components.mjs`. To add a page, add an entry to the `pages` array and link it from the appropriate parent page. These templates contain trusted authored HTML; they are not designed to accept untrusted HTML or CMS input.

## Design direction

**Fieldnotes:** an editorial index with oversized serif typography, fine rules, square edges, generous whitespace, and restrained yellow-green accents. System fonts avoid external requests. Home presents two perspectives within one practice, then connects them through selected work.

Academic pages use a light paper surface, structured metadata, and readable narrative columns. Creative pages invert the same palette and use larger images. Photography has an asymmetric sequence with minimal captions; VR combines visual studies with concise design notes. Shared typography, navigation, spacing, and cross-links keep the two areas connected.

## Verification and limits

Browser checks cover all eight routes at 1440, 768, 390, and 320 CSS pixels, including horizontal overflow and heading presence. Representative desktop, tablet, and mobile layouts were visually inspected. Keyboard checks cover the skip link, navigation, and teaching disclosure activation with Enter and Space. Static checks verify all internal links and assets. Focus outlines, semantic landmarks, current-page labels, and a recovery page are included. This is not a full assistive-technology audit.

The work is intentionally static: no playable VR project, actual photography, publication downloads, contact form, analytics, or deployment integration. Real imagery should receive descriptive alternative text when replacing the decorative, hidden SVG placeholders.

## Questions for the next iteration

- Does the light/dark division clarify the practice, or make the disciplines feel too separate?
- Should the home page give research and creative work equal weight, or prioritize one audience?
- How much project process should appear before supporting details?
- Should photography be organized into named series or one continuous sequence?

Possible next directions: test one shared light theme; replace one research case study and one photo sequence with real content; compare the current expressive home with a compact work index. Revisit typography and image crops once that content is available.
