# Morrow Coffee — prelaunch checklist

The website is a concept, not a real online store. A successful Vite build does **not** mean that checkout or contact services work.

## Required before public commercial launch
- [ ] Replace conceptual coffee prices, menu entries, inventory, sourcing claims and photographs with approved business information.
- [ ] Confirm business identity, location, opening hours, currency, shipping regions, return/refund policies and legal pages.
- [ ] Select a commerce backend or provider and integrate inventory, orders, payment confirmation, tax and shipping.
- [ ] Connect newsletter submissions to a provider with opt-in consent and a privacy policy.
- [ ] Confirm product-image usage rights. Current illustrations are conceptual and should not imply photographed real goods/premises.
- [ ] Set the real production domain and provide server-rendered/prerendered metadata for sharing and SEO, if required.
- [ ] Remove prototype noindex blocking in `index.html`, `public/robots.txt` and `src/seo.ts` **only after the above are accurate**.
- [ ] Add a canonical URL, sitemap.xml, social preview assets and analytics only once the domain and consent model are decided.
- [ ] Test keyboard navigation, mobile purchasing flow, core page interactions and screen reader output.
- [ ] Test performance on low-end mobile hardware, images and 3D loading; do not assume 60fps from CI.

## Hosting a Vite single-page application

Build: `npm run build`. Publish the generated `dist` folder.

- **Netlify:** `public/_redirects` ensures routes such as `/coffee/ethiopia` load `index.html` on refresh.
- **Vercel:** `vercel.json` provides a route rewrite to `index.html` while leaving static asset directories alone.
- **Other static hosts:** configure an SPA fallback to `index.html` for non-file paths.
- These fallbacks are **not** server-side rendering. HTML-only crawlers will see `index.html` default metadata.

## Release workflow

While v5.2 PR #2 remains open, v5.3 PR #3 includes it as its base. Merge **PR #2 first**, then review/rebase PR #3 and merge it into `main`. Do not merge v5.3 first or the incremental review is lost.

```powershell
git fetch origin
git switch feature/v5-3-launch-readiness
npm install --include=dev
npm run build
npm run dev
```

Check desktop + narrow mobile sizes, refresh `/coffee/ethiopia` on the deployed host, press Tab for the skip link, open the mobile menu, search and bag, and verify Escape/Tab keyboard behavior.
