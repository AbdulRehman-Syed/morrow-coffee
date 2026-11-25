# Morrow Coffee v5.5 — Midnight Espresso

## New visual direction

Inspired by the supplied coffee-house screenshot, this iteration uses **espresso brown / charcoal**, **soft warm stone**, **faint porcelain gray**, and **caramel / copper** accents instead of the former green-led identity.

Key colors:
- Espresso black `#19130f`
- Rich espresso `#251b15`
- Warm stone `#e9e7e3`
- Porcelain `#f4f4f3`
- Caramel `#d8a17a`

A condensed editorial Oswald heading treatment enhances the bold coffee-house look.

## Interactive features

- Cinematic hero with one-time zoom-and-fade, clear café/shop calls to action.
- Slow-moving coffee marquee under the hero.
- Three canvas-rendered coffee cups — Mocha Latte, Pour Over and Espresso — with interactive selection and strength visualization.
- Pointer/touch ripple on each cup's liquid; canvas pauses when off-screen, frame rate capped at approximately 30fps and DPR capped at 2.
- Product collection with photography, product detail links, and working demo add-to-bag.
- Full-width photographic story section with an **interactive three-chapter photo reel** (play/pause, previous/next, Arrow keys, Escape).
- Existing coffee shop, product customization, cart, demo checkout, café menu, origin atlas, Brew Lab, FAQ, contact and journal remain intact.
- Honors `prefers-reduced-motion`: still photo illustrations, no perpetual ticker or canvas animation.
- No new npm animation/physics dependencies; uses existing Motion and native Canvas.

## Why the linked GitHub topics aren't direct dependencies

`motion-simulator` and `interactive-simulation` are broad topic collections, mostly simulations unrelated to UI animation. This release borrows ideas (responsive state, pointer events, spring-like / eased motion, animation throttling) without bundling unreviewed repositories into a shipping storefront. The on-demand Brew Lab continues to use the project's existing Three.js ecosystem.

## Demo and deployment

All café/product/price information is illustrative. Cart and checkout are demos; no actual payment, shipping or form submission.

Test this branch:

```powershell
git fetch origin
git switch feature/v5-5-midnight-espresso-motion
npm install --include=dev
npm run build
npm run dev
```

Open the website and test:
- Desktop/mobile first impression and image loading
- Cup selection, visual intensity, and cup touch ripples
- Coffee story reel, keyboard arrows, Escape and reduced motion
- Shopping bag and demo checkout on product routes
- Mobile navigation and design contrast

The theme can be modified or rolled back by reverting `src/midnight.css` and the new home-component integration.
