# Morrow Coffee v5.1 — Storefront and mobile

- Added selectable **250g / 1kg** coffee bags with updated demo pricing.
- Added **whole bean, pour-over, espresso, and French press** grind choices.
- Product pages now have three clickable image views.
- Cart tracks separate size and grind combinations and persists in browser storage.
- Add-to-bag uses a quiet confirmation with a **View bag** shortcut.
- Mobile navigation has a backdrop, escape-to-close behavior, scroll locking, and a shop shortcut.
- Added a GitHub Actions workflow for production build verification.

**Note:** This remains a frontend demonstration. Coffee product prices, inventory, checkout, and café details are not connected to a backend.

## Test from Windows
```powershell
git fetch origin
git switch feature/v5-1-storefront-mobile
npm install --include=dev
npm run build
npm run dev
```

After review, merge the PR and return to `main`:
```powershell
git switch main
git pull origin main
npm run dev
```
