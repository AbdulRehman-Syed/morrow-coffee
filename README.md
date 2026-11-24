# Morrow Coffee — The Slow House (v5)

A photographic, storefront-first redesign of the original Morrow Coffee project. React 18 + TypeScript + Vite 6 + Tailwind CSS + [Motion](https://github.com/motiondivision/motion), with React Three Fiber / Three.js in the on-demand brewing laboratory.

## Run on Windows

1. Install **Node.js 20+**.
2. Extract the ZIP and open **`morrow-coffee-website`**, the folder containing `package.json`.
3. Open PowerShell in that folder:

```powershell
npm install --include=dev
npm run dev
```

4. Open the URL printed by Vite (usually http://localhost:5173/).

Or double-click `START-WINDOWS.cmd`.

**Important:** `npm run dev` invokes Vite directly. `npm run doctor` is optional and checks package **manifest files**, not JavaScript resolution of `@types` packages. If an install fails, read the **first** npm error rather than repeatedly deleting `node_modules`.

Verification commands:

```sh
npm run doctor
npm run typecheck
npm run build
npm run preview
```

## Site structure

| Route | Experience |
| --- | --- |
| `/` | Photo-led homepage, selectable hero photography, curated coffee cards, café and brew lab teasers |
| `/coffee` | Coffee shop with roast filters, search, sorting, and add-to-bag |
| `/coffee/ethiopia` | Daybreak product details (others: `/coffee/colombia` and `/coffee/guatemala`) |
| `/cafe` | Coffee-house photography, category-switching sample drinks & pastry menu, concept visit information |
| `/brew` | Interactive 3D grind/bloom/pour laboratory, recipe controls, timer, local recipe save |
| `/origins` | Selectable world atlas, animated flavor profile, origin details, links to the coffees |
| `/journal` | Illustrated how-to guides with readable article overlays |

Global UI: working client-side navigation with History API and Back/Forward support; responsive mobile menu; global product search; working cart drawer with quantity changes and subtotal; fully disclosed placeholder checkout; local images and accessible image descriptions. The site intentionally does not require React Router.

## Design / performance changes

- Replaced text-heavy opening / always-running 3D package with high-impact cinematic coffee photography. Three-slide manually controlled hero: no intrusive auto-scroll or auto-rotation.
- Kept **forest espresso** `#1d2a23`, **warm parchment** `#f6f2eb`, **copper** `#b77950` and olive details, with restrained editorial typography.
- Added **10 locally stored WebP illustrations / concept photos** (`public/images/`, ~1.2 MB total). No network image dependencies. These images are generated concept renders, **not** photos of a real operating Morrow premises or physical merchandise.
- Animated primarily **opacity / transform**, using Motion where interaction adds value, rather than continuously moving entire pages. All galleries and controls work without animation; `prefers-reduced-motion` respected.
- Kept heavier 3D modules code-split and loaded only on `/brew` or Webflow embed. Scene only mounts when near viewport and only if WebGL is available; SVG fallback otherwise. DPR capped at 1.35.
- Simplified lab 3D lighting and continuous movement (subtle camera/object sway, reduced grinder speed, fewer background meshes). See `src/components/BrewLab.tsx`.
- Original v4 components (including canvas flavor gallery, scroll cinematic scene and 3D bag) are retained in `src/components/` as optional experiments; they aren't automatically loaded on the homepage.
- The previous homepage source is archived in `reference/App-v4.tsx`, outside the `src/` compile path.

## Webflow / Adobe

The original handoff files remain:

- `webflow/scroll-embed.html` — a separate cinematic sequence available at `/?webflow=1`.
- `webflow/lab-embed.html` — brewing laboratory available at `/?webflow=lab` with auto-height postMessage.
- `adobe/create-morrow-steam.jsx` and `public/adobe/steam-loop.json` — After Effects / Lottie assets.

Replace the placeholder domain in the Webflow snippets with the URL where you host this Vite app. Deploy the build to a static host configured to serve `index.html` for all `/coffee`, `/cafe`, `/brew`, `/origins`, and `/journal` routes. Vite's development server already handles these routes.

## Content / commercial status

This is a **design prototype**. Coffee names, profiles, prices, menus, journal stories, location information, product imagery and sourcing copy are illustrative. No real café address or hours are advertised. Checkout, subscriptions and newsletter sign-up **are not connected** to an external service; no payments are collected, and newsletter form submission does not transmit data. Before launch, confirm all real-world claims, prices, permissions and fulfillment integrations.

## Troubleshooting

- Blank screen? Check the first error in the browser console (**F12 → Console**) and the Vite terminal. The `ErrorBoundary` displays React render failures.
- `@types/react` / `@types/react-dom` “missing” from `npm run doctor`? Run `npm install --include=dev` inside the folder containing `package.json`. The checker reads installed package manifests and does not use `require.resolve()` for type-only packages.
- If npm cannot resolve the registry or a company proxy, fix the network/registry first. Don't remove modules repeatedly.
- Some effects need WebGL. Reduced-motion preferences or a device without WebGL fall back gracefully.

## Source folders

- `src/App.tsx` — storefront UI, navigation, product pages, origin radar, cart, café and journal.
- `src/v5.css` — new visual system and responsive layout; `src/styles.css` supports the retained original studio components.
- `src/data.ts` — sample coffee catalog and flavor information.
- `src/components/BrewLab.tsx` — standalone Three.js pour-over laboratory.
- `src/components/OriginAtlas.tsx` — interactive origin map.
- `public/images/` — optimized local visual assets.
