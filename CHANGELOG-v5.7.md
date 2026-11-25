# Morrow Coffee v5.7 — The Light & The Roast

A response to user feedback about invisible animations, generic imagery and an overly heavy redesign.

## What changed
- Restored **warm editorial luxury**: cream, espresso brown, parchment and restrained copper, replacing the harsh condensed type and dark, cluttered homepage.
- Rebuilt the homepage around two large photographic hero slides with clear manual controls and **Motion on/off**.
- Simplified copy, presented three appropriate drink images (milk coffee, pour-over equipment and espresso).
- Added an auto-start-on-view **brewing story** with progress, moving steam and visible droplets plus pause/replay controls.
- Kept the full shop, coffee finder, café, origin atlas, Brew Lab, demo checkout, FAQ, journal and creator credit.
- Replaced the repeatedly reused *generic* coffee collection/ritual images on individual product-detail galleries with **six unique, origin-specific artworks**: bean illustration + flavor profile for each coffee. The primary product photograph remains different for each origin.
- Removed conflicting old dark-theme and v5.6 animation CSS from the active bundle; restored the mobile menu overlay stacking.
- Updated Playwright tests to cover hero slides, brewing progress, correct item-specific media, navigation, checkout and mobile.

## Testing locally
```powershell
git fetch origin
git switch feature/v5-7-photo-first-motion-rework
npm install --include=dev
npm run build
npm run dev
```

### Motion check
1. Reload the homepage.
2. Watch the hero images crossfade after about 5.5 seconds. You can also use the slide dots.
3. Scroll to the brewing story. It automatically begins when visible; use **Pause the brew** and **Restart**.
4. If your operating system prefers reduced motion, click **Motion off** to enable motion deliberately (button becomes **Motion on**).

### Image check
Open each of the three coffees:
- Daybreak: Daybreak photograph, Daybreak bean illustration, Daybreak flavor notes.
- Golden Hour: Golden Hour photograph, Golden Hour bean illustration, Golden Hour flavor notes.
- Afterglow: Afterglow photograph, Afterglow bean illustration, Afterglow flavor notes.

These SVG images are **illustrations**, not alternate claims of actual product photography. Café, prices, and payments remain demos.
