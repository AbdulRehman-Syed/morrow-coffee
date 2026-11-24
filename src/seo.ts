import { origins } from './data';

/**
 * Client-side page metadata for navigation and sharing after JavaScript loads.
 * This is not SSR or prerendering: link preview crawlers may only see index.html.
 * The prototype intentionally stays noindex until business details are confirmed.
 */
export type PageMetadata = { title: string; description: string; image: string; indexable: boolean };
const defaultDescription = 'Explore Morrow Coffee, a visual concept for specialty coffee, a considered café and an interactive brewing experience.';
const staticPages: Record<string, Omit<PageMetadata, 'indexable'>> = {
  '/': { title: 'Coffee for the Unhurried', description: defaultDescription, image: '/images/hero.webp' },
  '/coffee': { title: 'The Coffee Collection', description: 'Discover the Morrow Coffee collection: Daybreak, Golden Hour and Afterglow. Explore illustrative origins, notes, sizes and grind choices.', image: '/images/collection.webp' },
  '/cafe': { title: 'The Café Concept', description: 'Explore the Morrow Coffee House concept, its photographic café story and sample espresso, filter and pastry menu.', image: '/images/cafe.webp' },
  '/brew': { title: 'Interactive Pour-over Brew Lab', description: 'Explore a pour-over brewing guide with a visual studio, grind adjustments, bloom timer and recipe ideas.', image: '/images/hero-ritual.webp' },
  '/origins': { title: 'Coffee Origins & Flavor Profiles', description: 'Explore coffee-growing regions and compare illustrative tasting profiles from Ethiopia, Colombia and Guatemala.', image: '/images/feature.webp' },
  '/journal': { title: 'The Coffee Journal', description: 'Explore brewing stories, coffee rituals and illustrated guides from the Morrow concept journal.', image: '/images/hero-ritual.webp' }
};
export function getPageMetadata(path: string): PageMetadata {
  const normalized = path.replace(/\/$/, '') || '/';
  const coffeeId = /^\/coffee\/([^/]+)$/.exec(normalized)?.[1];
  const coffee = origins.find(o => o.id === coffeeId);
  if (coffee) {
    return { title: `${coffee.name} — ${coffee.country} Coffee`, description: `Discover ${coffee.name}, an illustrative ${coffee.roast.toLowerCase()} coffee from ${coffee.region} with notes of ${coffee.notes.join(', ')}.`, image: `/images/${coffee.id === 'ethiopia' ? 'daybreak' : coffee.id === 'colombia' ? 'golden-hour' : 'afterglow'}.webp`, indexable: false };
  }
  const match = staticPages[normalized];
  return match ? { ...match, indexable: false } : { title: 'Page Not Found', description: defaultDescription, image: '/images/hero.webp', indexable: false };
}

function setMeta(selector: string, attribute: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const spec = selector.match(/^meta\[(name|property)="([^"]+)"\]$/);
    if (!spec) return;
    el.setAttribute(spec[1], spec[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attribute, value);
}
export function updatePageMetadata(path: string) {
  const page = getPageMetadata(path);
  const fullTitle = `${page.title} | Morrow Coffee`;
  document.title = fullTitle;
  setMeta('meta[name="description"]', 'content', page.description);
  setMeta('meta[name="robots"]', 'content', 'noindex, nofollow');
  setMeta('meta[property="og:type"]', 'content', 'website');
  setMeta('meta[property="og:site_name"]', 'content', 'Morrow Coffee');
  setMeta('meta[property="og:title"]', 'content', fullTitle);
  setMeta('meta[property="og:description"]', 'content', page.description);
  setMeta('meta[property="og:image"]', 'content', new URL(page.image, window.location.origin).href);
  setMeta('meta[property="og:url"]', 'content', new URL(path, window.location.origin).href);
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', fullTitle);
  setMeta('meta[name="twitter:description"]', 'content', page.description);
}
