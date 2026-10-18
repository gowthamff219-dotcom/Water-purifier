# Catalog sources and maintenance

Product information was transcribed from the RO product messages shared on 16 October 2026 and checked against the existing `ro1`, `ro2` and `ro3` text files. The original local folders are preserved.

`js/products.js` is the browser catalog. Each `catalog/<model>/info.txt` contains the verified information for that listing. `originals/` preserves source photos; `display/01.jpg`, `02.jpg`, etc. are the images used by the website. Keep filenames and case exact for GitHub Pages.

There are 14 listings and 38 unique photos: Dolphin (3), MARS (3), Roma (6), Purosis (3), Glory (3), Emerald (2), JADE (4), Water Lilli (5), ALICA (1), LX ONE Titanium (1), AQUA Touch (1), pre-filter housing bowl (1), spun filter (1), and taps (4).

Brand folders were not invented: the supplied local folders are `ro1`, `ro2`, and `ro3`, and the messages identify models rather than one shared brand. Images are grouped by their verified model instead.

JADE's source message says “Tank capacity 11” without a unit; this unconfirmed capacity is omitted from the visible catalog. AQUA Touch has no supplied price and displays “Call for price.” Taps must remain last and have `hidePrice: true`; they must never display a price or price placeholder.

Every gallery uses a square display frame and `object-fit: contain`. Preserve complete products when preparing images. Keep original images and save any cleaned versions in `display/`. Do not add ratings, discounts, stock labels, or unsupported specifications.

The store map is the official Google Maps embed obtained from the business listing linked by the owner. The verified business is M.R. AQUA SERVICE, 18B Anjaneyar Koil Street, MG Nagar, Poonamallee, Tamil Nadu 600056; its listed phone matches the site's +91 89394 14842. The footer and directions buttons retain the owner's exact short link.

Two uploaded files were byte-for-byte duplicates and are preserved in `whatsapp-originals` but not repeated in the slideshow. The existing local black Dolphin photo completes the Dolphin gallery.

The three Purosis phone screenshots use self-contained SVG crop wrappers in `display/`. These embed the original JPEG bytes with a restricted viewBox, retaining the original product labels and pixels while hiding phone controls and black bars. They are not generated replacement product photos. `media-manifest.json` records sources, hashes and crop bounds.
