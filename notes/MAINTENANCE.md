# Maintenance notes

## Adding a publication

Edit `data/publications.json` (a JSON array). Each entry has `authors`, `title`, `venue`, `year`, and optionally `doi` (a DOI or a full URL) and `pdf` (a URL). Entries are shown in the order of the array. While the array is empty, the page shows "Publications will be listed here as they become available."

```json
[
  {
    "authors": "A. Author, B. Author",
    "title": "Title of the paper",
    "venue": "Name of the conference",
    "year": 2026,
    "doi": "10.1234/example",
    "pdf": "https://example.org/paper.pdf"
  }
]
```

## Local preview

The publications list is loaded with `fetch`, so preview the site through a local web server (for example `python3 -m http.server` in this folder) rather than opening `index.html` directly.

## Sources of the partner logos

Downloaded unmodified on 2026-11-22.

| File | Source |
| --- | --- |
| `assets/partners/bekaert.svg` | https://www.bekaert.com/content/dam/corporate/en/icons/Bekaert-blue-logo.svg (header logo of bekaert.com) |
| `assets/partners/materialise.svg` | https://www.materialise.com/assets/materialise-logo.svg (header logo of materialise.com) |
| `assets/partners/delaware.svg` | https://www.delaware.pro/assets/media/delaware-logo.svg (vector logo on delaware.pro; the header file there only wraps a 150 by 50 pixel raster image) |
| `assets/partners/flanders-make.svg` | Inline SVG of the header logo on https://www.flandersmake.be, saved verbatim; no downloadable file was found on the site or on Wikimedia Commons. Replace with an official file if Flanders Make provides one. |
| `assets/partners/kuleuven.svg` | https://stijl.kuleuven.be/releases/latest/img/svg/logo.svg (header logo of kuleuven.be) |

The KNODI logo (`assets/knodi_logo.svg`, `assets/knodi_logo.png`) is the project's own.

## Sources of the project texts

The hero subtitle (official project title), the About section (layman's summary, with Timeseer replaced by Delaware, and the first three sentences of the general objective) and the four Research cards (work package titles and objectives) come from the approved KNODI project application (VLAIO ICON application, version June 2024).
