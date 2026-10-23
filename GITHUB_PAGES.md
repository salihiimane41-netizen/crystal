# Publish the original CHAWARMA L7ILWIN website

This package contains the complete original Next.js source **and** its ready-to-publish static build. The original repository README and the earlier single HTML file are preserved. No installation is needed to publish the prepared build.

## Publish on GitHub Pages

1. Sign in to the GitHub account that owns **salihiimane41-netizen/crystal**.
2. Open [the repository's Pages settings](https://github.com/salihiimane41-netizen/crystal/settings/pages).
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the **github-pages** branch and the **/docs** folder. Click **Save**.
5. Wait for GitHub's Pages deployment to finish. The Pages settings screen will show the actual published address. For the default repository address, it will be:

   **https://salihiimane41-netizen.github.io/crystal/**

This address becomes available after Pages is enabled and deployment succeeds. The branch alone does not enable hosting. Leave the custom domain field blank for this default address.

If Pages settings are unavailable for this private repository, check the account's GitHub Pages plan eligibility. This package does not change repository visibility.

## What to upload if downloading the project

On the **github-pages** branch, choose **Code → Download ZIP**, then extract the archive. Keep **all** files and directories together, including `docs/_next`, `docs/images`, and `docs/.nojekyll`. The `docs` folder already contains all HTML pages, CSS, JavaScript, local fonts, and photographs. Upload the entire folder, then choose its branch and `/docs` in Pages settings.

The smaller `CHAWARMA-L7ILWIN-GITHUB-PAGES.zip` file on the same branch contains just the prebuilt `docs/` folder and these instructions. Open its GitHub file page and click **Download raw file** to save it, then extract it before uploading. You do not need to download or upload anything if you publish the existing **github-pages** branch directly.

Do not upload only `index.html`: its styles, scripts, and images live alongside it. Files beginning with a dot, especially `.nojekyll`, must also be included so GitHub serves `_next` correctly.

## Files in the hosting build

| Path                          | Contents                                         |
| ----------------------------- | ------------------------------------------------ |
| `docs/index.html`             | Home page                                        |
| `docs/menu/index.html`        | Full menu, search, filters, and dish dialogs     |
| `docs/aux/index.html`         | Mood machine                                     |
| `docs/artists/index.html`     | Imagined celebrity gallery                       |
| `docs/backstage/index.html`   | Events and downloadable pass generator           |
| `docs/visit/index.html`       | Visit page and local reservation simulation      |
| `docs/_next/static/`          | Compiled CSS, JavaScript, and local font files   |
| `docs/images/`                | Original food, venue, and gallery images         |
| `docs/404.html`               | Missing-page screen                              |
| `docs/.nojekyll`              | Required to serve the `_next` directory on Pages |
| `src/`, `public/`, `scripts/` | Editable source and original images              |

The prepared build targets the **/crystal/** repository path. Links, image URLs, font URLs, and JavaScript chunks include the correct prefix. Direct visits and refreshes work on each page. It needs no Node.js server at the hosting service and uses the original production stylesheet, including Tailwind's reset.

## Edit and rebuild later

With Node.js 24 and npm installed, run from the project root:

```sh
npm ci
npm run build:pages
```

Commit and push the updated `docs` folder to the **github-pages** branch to publish your changes. Editing `src` alone does not change the prebuilt website.

To build for a different repository:

```sh
GITHUB_REPOSITORY=your-account/your-repository npm run build:pages
```

For a custom domain that serves the website at `/`, build with `NEXT_PUBLIC_BASE_PATH="" NEXT_PUBLIC_SITE_URL="https://your-domain.example/" npm run build:pages` and configure the real domain in GitHub Pages separately.

An optional `.github/workflows/publish-pages.yml` builds and deploys from source through GitHub Actions. Use that only if you choose **GitHub Actions** as the Pages source, instead of the branch publishing steps above. The ready-made `/docs` deployment requires no workflow or dependency installation.

GitHub shows manually runnable workflows only after the workflow file exists on the default branch. For this optional method, also copy that workflow file to `main`, open **Actions → Publish GitHub Pages → Run workflow**, and select **github-pages** in the branch dropdown so the job builds the complete source. Publishing from `/docs` avoids these extra steps.

## Existing content behavior

The menu, gallery dialogs, mobile navigation, mood matching, pass downloads, and visit simulation work in the browser. Spotify playlist links remain unconfigured as in the original site; see `SPOTIFY_SETUP.md` to connect real playlists. The visit form remains a clearly labeled local simulation. Hosting does not turn it into a booking service.

## Validation of this package

The production export passed 15 Chromium browser checks against a static HTTP server mounted at `/crystal`, including all six pages and their assets, interactive features, keyboard access, mobile navigation, four viewport widths, and automated accessibility checks. The original and static versions also matched for measured layout, text, typography, and colors on all six pages at 1440px and 390px widths. Source photographs are copied without changes. GitHub's actual public deployment still needs to finish after Pages is enabled.
