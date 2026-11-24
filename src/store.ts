/** Front-end demo commerce utilities. No checkout, inventory, or payments are connected. */
export const bagSizes = ['250g', '1kg'] as const;
export const grindTypes = ['Whole bean', 'Pour-over', 'Espresso', 'French press'] as const;
export type BagSize = typeof bagSizes[number];
export type GrindType = typeof grindTypes[number];
export type CartItem = { id: string; size: BagSize; grind: GrindType; quantity: number };
export const cartIdentity = ({ id, size, grind }: Pick<CartItem, 'id' | 'size' | 'grind'>) => `${id}:${size}:${grind}`;
export const unitPrice = (basePrice: number, size: BagSize) => size === '1kg' ? Math.round(basePrice * 3.5) : basePrice;
export const money = (amount: number) => `$${amount.toFixed(2)}`;
export function normalizeCart(raw: unknown, validIds: readonly string[]): CartItem[] {
  if (!Array.isArray(raw)) return [];
  const grouped = new Map<string, CartItem>();
  for (const input of raw.slice(0, 100)) {
    if (typeof input !== 'object' || input === null) continue;
    const row = input as Record<string, unknown>;
    if (typeof row.id !== 'string' || !validIds.includes(row.id)) continue;
    const size: BagSize = bagSizes.includes(row.size as BagSize) ? row.size as BagSize : '250g';
    const grind: GrindType = grindTypes.includes(row.grind as GrindType) ? row.grind as GrindType : 'Whole bean';
    if (typeof row.quantity !== 'number' || !Number.isFinite(row.quantity)) continue;
    const quantity = Math.min(20, Math.max(0, Math.floor(row.quantity)));
    if (!quantity) continue;
    const key = cartIdentity({ id: row.id, size, grind });
    const old = grouped.get(key);
    grouped.set(key, { id: row.id, size, grind, quantity: Math.min(20, (old?.quantity ?? 0) + quantity) });
  }
  return [...grouped.values()];
}
export function readCart(validIds: readonly string[]): CartItem[] {
  if (typeof window === 'undefined') return [];
  try { return normalizeCart(JSON.parse(window.localStorage.getItem('morrow-cart-v1') ?? '[]'), validIds); }
  catch { return []; }
}
export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem('morrow-cart-v1', JSON.stringify(items)); }
  catch { /* Storage may be disabled; cart remains usable for this session. */ }
}
export function updateCart(items: CartItem[], incoming: CartItem): CartItem[] {
  const key = cartIdentity(incoming);
  const quantity = Math.min(20, Math.max(1, Math.floor(incoming.quantity)));
  const previous = items.find(item => cartIdentity(item) === key);
  return previous
    ? items.map(item => cartIdentity(item) === key ? { ...item, quantity: Math.min(20, item.quantity + quantity) } : item)
    : [...items, { ...incoming, quantity }];
}
