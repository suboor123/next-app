# Suboor Khan — Static Site

This repository contains the source for Suboor Khan's personal site — a small static site built with plain HTML, Tailwind CSS and a few client-side scripts. It includes pages, blog posts and configuration for deploying to static hosts (Vercel, Netlify, etc.).

## Contents

- HTML pages in the project root (index.html, project pages, blog listing, etc.)
- `blogs/` — individual blog post HTML files
- `data/` — JSON metadata (blogs.json, projects.json)
- `input.css` — Tailwind input file
- `style.css` — compiled CSS (generated)
- `tailwind.config.js` — Tailwind configuration
- `package.json`, `vercel.json` — project metadata and deploy config
- `src/` — optional place for scripts/assets

## Quick start (preview locally)

Option 1 — open in browser
- Open `index.html` in your browser for a quick preview.

Option 2 — use a local static server
- Python 3: `python3 -m http.server 3000` then open `http://localhost:3000`
- Node: install `serve` or `http-server` globally and run `serve .` or `http-server`
- VS Code: use the Live Server extension to preview and auto-reload.

## Tailwind CSS (rebuild style.css)

This repo includes Tailwind sources. To rebuild the compiled CSS you can use the Tailwind CLI:

1. Install Tailwind CLI (if not installed):
   `npm install -D tailwindcss postcss autoprefixer`
2. Build (example):
   `npx tailwindcss -i ./input.css -o ./style.css --minify`

You can also add a script to package.json for convenience.

## Editing content

- Blog posts: edit or add files inside the `blogs/` folder. Each post is a standalone HTML file.
- Metadata: `data/blogs.json` and `data/projects.json` contain structured data used on listing pages.
- Images and assets: add to `src/` or the project root and reference them from HTML files.

## Deployment

This site can be deployed to any static hosting provider. Example options:
- Vercel (configured via `vercel.json`)
- Netlify (drag-and-drop or connect the repo)
- GitHub Pages (build static assets and push to `gh-pages` branch)

## Contributing

If you want to contribute fixes or content:
- Fork the repo
- Make changes on a topic branch
- Open a pull request with a short description of your change

## License & Author

Author: Suboor Khan
Website: https://www.suboorkhan.com

License: (add your preferred license file e.g. MIT)
