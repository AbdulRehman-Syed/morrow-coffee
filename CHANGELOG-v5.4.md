# Morrow Coffee v5.4 — Frontend Showcase Complete

## Added
- Top-of-page playful comic strip crediting **Abdul Rehman**.
- New photo-led homepage editorial gallery and a restrained coffee-themed hero sticker.
- About / Our Story, Contact (local demo form), searchable/filterable FAQ.
- Shipping, Privacy and Terms demo information pages.
- Complete simulated order flow: collection → product options → cart → delivery scenario → confirmation. **No real payment or order.**
- Mobile-optimized layouts, animated entrance reveals, hover and comic details with reduced-motion support.
- Additional route descriptions, Vercel SPA rewrites and updated README.

## Local test
```powershell
git fetch origin
git switch feature/v5-4-showcase-frontend
npm install --include=dev
npm run build
npm run dev
```

### Acceptance checks
- [ ] Top credit visibly says ABDUL REHMAN; no text overlaps on mobile.
- [ ] Navigation: Home, Coffee, Café, Brew, Origins, Journal, About.
- [ ] Footer links: Contact, FAQ, Shipping, Privacy, Terms.
- [ ] Cart → Checkout → Demo confirmation without any payment details.
- [ ] Changing shipping preview updates demo subtotal correctly.
- [ ] Contact form validates and shows local-only confirmation.
- [ ] FAQ search, topic filters, open/close questions.
- [ ] Mobile menus, touch targets, product cards and sticky Add to Bag.
- [ ] Reduced motion and keyboard navigation.
- [ ] Refresh direct URLs after deploying through Vercel/Netlify.

## Showcase disclosures
The entire website is a **portfolio concept**. The generated coffee imagery, bean/product details, sample prices, menus, café stories and stock are fictional/illustrative. No real shop, real delivery, checkout, customer data transmission or newsletter subscription exists. Keep public-facing demo notes intact.

## Deployment
Build with `npm run build`. Deploy the `dist` output using Vercel/Netlify. SPA rewrites are included for every frontend route. Search indexing is intentionally disabled while the storefront contains fictional business data; see README.
