# Morrow v5.6 — Interactive motion & functional repairs

This release repairs the previous version's nearly static animations and moves testing beyond TypeScript builds.

## Fixed
- **Full Menu navigation** from the homepage now waits for the café page to finish mounting before scrolling to the correct section.
- The new **Watch it brew** experience has clearly visible steam, kettle tilt, pouring water, cup fill, and live progress. Play, pause, reset work in frontend state.
- Homepage now has visible gentle ambient movement and a more noticeable selected-coffee cup motion.
- Animations pause when the brew widget is offscreen and respect system reduced-motion settings.
- Added automated **Chromium browser smoke tests** in GitHub Actions. They exercise home rendering, animation controls, menu routing, demo checkout, photo story, mobile navigation and FAQ.

## Review commands

```powershell
git fetch origin
git switch fix/v5-6-visible-motion-interactions
npm install --include=dev
npm run build
npm run dev
```

In the homepage drink section select a cup, adjust its slider, then press **Watch it brew**. The pour is intentional and clearly animated.

## Notes
- The story remains an interactive image slideshow, not a video player.
- Checkout and café data remain demonstrations, not actual transactions or reservations.
- If motion is disabled in your Windows or browser accessibility settings, the site deliberately shows a static alternative.
