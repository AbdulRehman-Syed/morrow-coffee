import { Sparkles, Coffee } from 'lucide-react';

/** A playful, deliberately small signature above the premium coffee storefront. */
export default function SignatureStrip() {
  return <div className="v54-signature" role="note" aria-label="Showcase created by Abdul Rehman">
    <div className="v54-signature-inner">
      <span className="v54-signature-star" aria-hidden="true">✷</span>
      <span className="v54-signature-label">FRESHLY BREWED BY</span>
      <strong>ABDUL REHMAN</strong>
      <span className="v54-comic-bubble" aria-hidden="true">POW! <Coffee size={13}/></span>
      <span className="v54-signature-end"><Sparkles size={13} aria-hidden="true"/> 100% GOOD VIBES</span>
      <span className="v54-signature-star second" aria-hidden="true">✦</span>
    </div>
  </div>;
}
