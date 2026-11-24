# Morrow Coffee v5.3 — Launch Readiness

Built on v5.2 without changing the visual direction.

## Improvements
- Shared `useDialogFocus` hook: traps Tab/Shift+Tab, handles Escape, locks body scroll while open, and restores focus after closing.
- Applied focus management to the shopping bag, search overlay, mobile navigation, product photo lightbox and journal articles.
- Added a visible keyboard **Skip to main content** link and navigation focus support.
- Improved small-screen touch targets and focus-visible outlines.
- Added route-aware document titles, descriptions and social metadata in `src/seo.ts`.
- Added Netlify (`public/_redirects`) and Vercel (`vercel.json`) SPA fallback examples for direct links and browser refresh.
- Introduced `public/robots.txt` and `noindex, nofollow` until the prototype has approved production data.
- Added `docs/LAUNCH-CHECKLIST.md` covering commerce, business information, privacy, SEO, performance and real-device QA.

## Local testing

```powershell
git fetch origin
git switch feature/v5-3-launch-readiness
npm install --include=dev
npm run build
npm run dev
```

Check product variants, mobile menu, search, bag, photo zoom, journal dialogs and direct links on your deployment. Test Tab, Shift+Tab and Escape.

## Release order

1. Merge PR #2 (v5.2) into `main`.
2. Change PR #3 base to `main`, then review the diff and merge.
3. `git switch main` and `git pull origin main`.

**Not live commerce:** No actual checkout, email service, inventory or operating café details. Keep `noindex` until business information is verified and an actual production site is ready.
