# Cupboard Chef (GitHub Pages)

This repository contains a static **Cupboard Chef** web app designed for GitHub Pages.

## How it works

- The site lives in `docs/` (`index.html`, `styles.css`, `app.js`), so GitHub Pages can publish directly from the `main` branch.
- Recipe data is embedded in-browser as a JavaScript JSON-style array.
- Users can:
  - enter cupboard ingredients (comma separated),
  - filter by meal type,
  - filter by diet/category,
  - and get matching recipe suggestions instantly (no backend).
- Measurements are written in UK-friendly units (g, ml, tbsp, °C).

## Run locally (no installs)

Open `docs/index.html` directly in a browser.

## Publish on GitHub Pages

In repository settings:
1. Go to **Pages**.
2. Set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/docs**.
4. Save.
