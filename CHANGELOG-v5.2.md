# Morrow Coffee v5.2 — Shop & Café Experience

## Highlights
- New visual **Coffee Finder** inside the coffee shop: three flavor moods recommend an existing origin and open its product page.
- Interactive **café menu** with rich photography, three categories and tasting notes for each demo drink or pastry.
- Product-gallery **lightbox** with previous/next controls, keyboard arrows and Escape to close.
- Mobile-only **sticky add-to-bag bar** reflecting the active size, grind, quantity and demo price.
- Improved shop result counter and **in-page café menu link**.
- Fixes the previous CI failure (`TS6133` from an unused variable in `LabEmbed`).
- No new npm dependencies or heavy 3D animations.

### Review on Windows
```powershell
git fetch origin
git switch feature/v5-2-shop-cafe-polish
npm install --include=dev
npm run build
npm run dev
```

**Important:** Coffee origins, demo menu prices, product photos and drinks are illustrative. There is no live checkout or café location.

Once PR #2 is merged:
```powershell
git switch main
git pull origin main
npm run dev
```
