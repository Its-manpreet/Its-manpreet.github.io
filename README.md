# msdhaliwal.in

One page, one scroll. Hand-written HTML, CSS and JavaScript — no framework, no build step. GitHub Pages serves the repository root as-is.

```
index.html                 the page: hero → three projects → also built → now → contact
resume.html                printable résumé (Cmd/Ctrl+P → PDF, fits one A4 page)
404.html
assets/css/site.css        the whole design system
assets/js/site.js          guide line, melting name, chips, palette-free page logic
assets/vendor/             gsap + ScrollTrigger + Draggable, lenis, three.js (all self-hosted)
assets/fonts/              Bricolage Grotesque + Inter (woff2, latin + latin-ext)
data/live.json             generated — Hackatime + GitHub figures
scripts/fetch_stats.py     regenerates data/live.json (Python stdlib only, no dependencies)
.github/workflows/stats.yml  runs it every morning and commits the result
CNAME                      msdhaliwal.in
```

## Put it live

1. Create a **public** repo on GitHub, e.g. `portfolio`.
2. From this folder:

   ```bash
   git init -b main
   git add .
   git commit -m "Sheet — portfolio"
   git remote add origin https://github.com/Its-manpreet/portfolio.git
   git push -u origin main
   ```

3. GitHub → **Settings → Pages → Source: Deploy from a branch → `main` / root → Save**.
4. **Custom domain**: Settings → Pages → Custom domain → `msdhaliwal.in` → Save, then tick **Enforce HTTPS** (the certificate takes a few minutes).
5. DNS for the apex — replace any old `A` records or the domain keeps resolving to the previous host:

   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  its-manpreet.github.io
   ```

6. Leave `CNAME` and `.nojekyll` in the repo — deleting either breaks the domain or the file serving.

## How the live numbers work

`scripts/fetch_stats.py` reads two public sources and writes `data/live.json`:

- **Hackatime** (`MSDhaliwal`) — total and weekly coding time, top language, and 40 days of daily buckets.
- **GitHub** (`Its-manpreet`) — public repos, commits in the last 30 days, the five most recent commits.

`stats.yml` runs it daily at 02:17 UTC and commits only when something changed. The page fetches that file at runtime; a snapshot is also embedded in `site.js` so the first paint is never empty, and if the file is older than three weeks the strip says so instead of pretending.

Run it by hand any time:

```bash
python3 scripts/fetch_stats.py
GITHUB_TOKEN=ghp_… python3 scripts/fetch_stats.py   # raises the GitHub rate limit
```

## Editing it

- **Copy** lives directly in `index.html`, in reading order. No partials, no templating.
- **Colours and type** are tokens at the top of `assets/css/site.css`. Each chapter has its own accent (`--ac`), set from the `CH` array at the top of `site.js`.
- **Adding a chapter** means adding a `<section class="ch" id="cN">` and a matching entry in `CH` — the guide line, the marker label and the scroll colour all follow from that array.
- **The guide line** routes itself: text ends at 46vw on the left and starts at 54vw on the right, so the line lives in the gap between them and can be tuned in `route()`.

## Notes

- Reads fully with JavaScript off (content is in the HTML; the numbers fall back to the snapshot).
- `prefers-reduced-motion` disables the smooth scroll, the sky, the guide animation and the melting name.
- No WebGL → the sky is skipped silently; everything else is CSS.
- Local preview needs a server (`fetch` will not run from `file://`):

  ```bash
  python3 -m http.server 8080
  ```
