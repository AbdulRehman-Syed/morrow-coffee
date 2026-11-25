# Morrow Coffee — The Slow House / Showcase Edition (v5.4)

An editorial, photo-first coffee-shop **frontend showcase** created by **Abdul Rehman**.

Built with React 18, TypeScript, Vite, Tailwind, Motion, Three.js, and React Three Fiber. The homepage stays lightweight and the 3D brewing laboratory is loaded only when needed.

## Install / run (Windows CMD or PowerShell)

```powershell
git clone https://github.com/AbdulRehman-Syed/morrow-coffee.git
cd morrow-coffee
npm install --include=dev
npm run build
npm run dev
```

If you've already cloned the repository, run `git pull origin main` after the v5.4 PR is merged. For **pre-merge testing**:

```powershell
git fetch origin
git switch feature/v5-4-showcase-frontend
npm install --include=dev
npm run build
npm run dev
```

Visit the Vite URL, usually http://localhost:5173/.

## Website pages

| URL | Experience |
| --- | --- |
| `/` | Cinematic photo-led homepage, coffee collection and editorial gallery |
| `/coffee` | Coffee finder, filters, sort, illustrated products |
| `/coffee/ethiopia` etc. | Bag size, grind selector, gallery and shopping |
| `/cafe` | Interactive sample café menu |
| `/brew` | On-demand interactive 3D brewing lab |
| `/origins` | Interactive origin atlas, flavor radar |
| `/journal` | Coffee journal |
| `/about` | Morrow story and creator credit |
| `/contact` | Accessible validated **local demo** contact form |
| `/faq` | Searchable and filterable FAQ |
| `/shipping`, `/privacy`, `/terms` | Honest placeholder customer information |
| `/checkout`, `/order-success` | Full **simulated** checkout and confirmation, no payment details |

### Visual identity

Forest green, parchment, copper and olive. Custom coffee concept photography and subtle reveal animations. Creator comic strip: **“FRESHLY BREWED BY ABDUL REHMAN — POW!”** above navigation. Supports reduced motion and keyboard access.

## Demo limitations

**This is not a real coffee shop or payment service.** Coffee products, prices, menu, photos and café information are illustrative. The cart persists in your browser; checkout generates a local mock confirmation but does not transmit orders, collect card details or charge payments. The contact form validates locally but does not send messages. Newsletter is also an unconnected preview.

Do not enter real personal/payment information in demo forms.

## Deploying a public showcase

Run `npm run build`. Publish the `dist` folder. Vercel (with `vercel.json`) or Netlify (with `public/_redirects`) both support single-page-app route refresh.

The site deliberately uses `noindex` in `index.html`, `public/robots.txt` and `src/seo.ts` to prevent an illustrative café from appearing as a real business in search results. **Direct showcase links work.** If you want search-engine indexing for your portfolio, revise the metadata and business disclosures before removing that safeguard. Client-only metadata is not full SSR social/SEO support.

Before going beyond a portfolio prototype, see `docs/LAUNCH-CHECKLIST.md`.

## Quality checks

```powershell
npm run typecheck
npm run build
npm run preview
```

For small-screen checks, open Chrome DevTools → Toggle Device Toolbar. Test menu, search, product selection, cart, checkout and FAQ; verify that Escape closes overlays, Tab cycles focus, and reduced-motion is respected.

Original Adobe / Webflow experiments remain in `adobe/`, `webflow/` and the legacy components folder.
