# CHAWARMA L7ILWIN — شاورما الحلوين

**GOOD FOOD. LOUD MUSIC.** A fictional Syrian street-food and music-culture website set in Agadir, Morocco, built for an English-class presentation. The original repository README is preserved.

## Open the finished site without installing anything

Use the standalone `CHAWARMA-L7ILWIN.html` file at the repository root (also generated as `offline/CHAWARMA-L7ILWIN.html`). Download it and open it in Chrome, Edge, Firefox, or Safari. All six pages, photographs, fonts, menu filters, mood matches, artist profiles, and downloadable backstage passes are embedded in this single file. It needs no server or Internet connection. For GitHub Pages hosting with the original production styling, use `docs/` instead; see `GITHUB_PAGES.md`.

To regenerate this file after editing the source, run `npm run build:offline`. Running the Next.js server on port 3000 enables optimized WebP images during export. The offline edition uses hash navigation to support all pages when opened from disk.

## Run locally

Requires Node.js 20.9 or newer (validated with Node 24) and npm.

```sh
cd /workspace/crystal
npm ci
npm run dev
```

The development server uses port 3000. Open it in your own browser on the machine running the server. For a production build:

```sh
npm run build
npm start
```

No database, API credentials, music subscription, or external fonts service is required. Fonts, food photographs, concept interiors, and illustrations are served locally. Next.js optimizes image sizes and formats.

In this cloud workspace, if npm cannot write to its default cache, prefix npm commands with `npm_config_cache=/workspace/.npm-cache`.

## The experience

| Page           | Route        | Features                                                                                  |
| -------------- | ------------ | ----------------------------------------------------------------------------------------- |
| The main stage | `/`          | Photo-led hero, greatest hits, artist collage, music teaser, animated marquee             |
| The Tracklist  | `/menu`      | 19 editable dishes, eight category filters, search, accessible dish dialogs               |
| The Aux        | `/aux`       | Four mood themes, verified-playlist controls, optional official embeds, real QR generator |
| Wall of Fame   | `/artists`   | Five imagined celebrity visits, restaurant photos/editorial concept, meal and mood links  |
| The Backstage  | `/backstage` | Three concept event posters, details, personalized downloadable PNG passes                |
| Visit the spot | `/visit`     | Imaginary venue, sample hours, illustrated location, local reservation simulation         |

Dish links support `/menu?dish=chicken`. Mood links support `/aux?mood=chill`. Dialogs trap keyboard focus, close with Escape, and restore focus to their trigger. Navigation includes a skip link, active-page indicators, a mobile menu, and visible focus styles. Animations respect reduced-motion preferences. Audio never autoplays.

## Edit the brand and content

| What to change                                                 | Where                                                                         |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Restaurant name, Arabic name, city, sample hours, demo contact | `src/data/content.ts` → `brand`                                               |
| Logo wordmark                                                  | `src/components/navigation.tsx` → `Logo`                                      |
| Colors, display and body font families, responsive layouts     | `src/app/globals.css` → `:root` and media queries                             |
| Font package imports                                           | `src/app/layout.tsx`                                                          |
| Menu names, prices, demo ingredients, categories, art styles   | `src/data/content.ts` → `menu` and `categories`                               |
| Local food photography                                         | `public/images/shawarma.png`, `manakish.png`, `hummus.png`, and `feast.png`   |
| Concept interior photograph                                    | `public/images/venue.png`                                                     |
| Food illustrations, portraits, mood art, doodles               | `src/components/graphics.tsx`                                                 |
| Original fictional artists and menu editions                   | `src/data/content.ts` → `artists`                                             |
| Moods, meals, and album artwork                                | `src/data/content.ts` → `moods`                                               |
| Fictional events and dates                                     | `src/data/content.ts` → `events`                                              |
| Pass appearance and PNG export                                 | `src/components/backstage-experience.tsx`                                     |
| Contact/location copy and sample hours                         | `src/data/content.ts` → `brand`; map in `src/components/visit-experience.tsx` |
| Page title, description and deployment origin                  | `src/app/layout.tsx` → `metadata`                                             |

The imagined star gallery is edited in `src/data/imagined-visits.ts`, with photographs in `public/images/imagined-visits/`. Playlist URLs are in `src/data/playlists.json`; verification records are generated in `src/data/playlist-verification.json`.

When renaming the restaurant, also update the custom wordmark, static brand copy, pass artwork, metadata, and documentation. The content file centralizes editable menu, artist, event, and playlist records; decorative brand lettering is part of the design.

### Configure real playlist links

Public Spotify URLs live in `src/data/playlists.json`; all four remain unconfigured because the cloud network denied Spotify access. See `SPOTIFY_SETUP.md` to add real links and run `npm run verify:spotify`. Verified moods enable direct Spotify links, scannable/downloadable QR codes, and a click-to-load official player. These features need Internet access for listening. No API key or autoplay is used.

### Fictional context and imagery

- The restaurant does not operate. There are no orders, payments, real addresses, phone numbers, ticket sales, or real reservations.
- The Wall of Fame contains four AI-generated imagined scenes involving named public figures and a Justin Bieber name-led editorial card with no likeness. No real visit, quote, preference, or endorsement is claimed. The original four fictional musicians remain part of the invented menu/event universe.
- `hello@l7ilwin.example` uses the reserved `.example` domain and is explicitly a demo contact, not a working email address.
- The visit form and nickname input stay in browser memory. They do not submit information or persist personal data. The pass download is generated locally using Canvas.
- Dietary/allergen suitability and cross-contact risks are unverified. Ingredient lists are concept recipes, not dietary assurances.
- Food and interior photographs were generated specifically for this project. They are labeled concept imagery and can be replaced with licensed real photography. Source assets are in `public/images`, with the new series and its provenance in `public/images/imagined-visits`; they do not depict an operating business.
- Mood artwork, food illustrations, the map, and music graphics use original SVG/CSS compositions. The celebrity gallery uses generated photo concepts and an original editorial treatment. Font packages include their open font licenses.

## Validation

```sh
npm run typecheck
npm run build
npm run test:e2e
```

The Playwright suite runs against the production build on port 3010. It covers all pages, asset loading, category filters and search, dish deep links, four mood themes, artist dialogs, real PNG downloads, event details, local-only visit simulation, keyboard focus, reduced motion, mobile navigation, viewport overflow, and automated WCAG A/AA accessibility checks. It also captures design screenshots in `artifacts/`.

The suite uses `/usr/bin/chromium` in this cloud environment. On another machine, install Chromium with Playwright and set `CHROMIUM_PATH` to that browser executable, or remove `executablePath` from `playwright.config.ts` to use Playwright’s managed browser.

## Deployment

For **GitHub Pages**, use the prebuilt `docs/` directory on the `github-pages` branch. Select that branch and `/docs` in Settings → Pages → Deploy from a branch. All six pages, the original production CSS, JavaScript, fonts, and images are included. See [GITHUB_PAGES.md](GITHUB_PAGES.md) for the complete instructions and `npm run build:pages` to rebuild.

Deploy as a standard Next.js project on a compatible Node host or Vercel: install with `npm ci`, build with `npm run build`, and run with `npm start`. Set the host’s `PORT` if needed. Update `metadataBase` in `src/app/layout.tsx` from the illustrative `.example` domain to the real published origin.

The Sites plugin was unavailable in the authoring session, so no Sites project or public deployment was created. This repository contains the complete deployable source. Publishing requires the chosen hosting surface.
