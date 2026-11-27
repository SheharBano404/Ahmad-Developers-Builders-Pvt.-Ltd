# ADB Website (React + plain CSS)
Run: `npm install` then `npm run dev`. Build: `npm run build` (output in `dist/`; host with SPA fallback, `_redirects` included).

## Manage content (all in src/)
- Properties: `src/data/properties.js`. Add = copy an object with a new unique `id` and `ref`. Edit = change fields. Delete = remove the object. Remove `isSample:true` for real listings.
- Prices: `pricePKR` (number, PKR only). Visitors convert to GBP/USD/AED on the site.
- Images: put files in `public/properties/<id>/` and list `'/properties/<id>/1.jpg'` in `images` (thumbnails + lightbox).
- Videos: add YouTube / Vimeo / .mp4 URLs to `videos` (hidden when empty, click-to-play).
- Projects: `src/data/projects.js` (set `image` / `images` as files are added to `public/`).
- WhatsApp number, email, phone, social links, form endpoint: `src/config.js`.
- Currency: rates from open.er-api.com (no key), cached 12h in the browser.
- Contact form: with no `FORM_ENDPOINT` it opens WhatsApp. For email, create a free Formspree form and paste its URL in `FORM_ENDPOINT`.
