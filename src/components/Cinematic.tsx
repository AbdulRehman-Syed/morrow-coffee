import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import type { MotionValue } from 'motion';
import { ArrowDown, ArrowUpRight, MoveDownRight } from 'lucide-react';
import lottie from 'lottie-web';
import steamAnimation from '../assets/steam-loop.json';
import ThreeCoffeeScene from './ThreeCoffeeScene';

const stages = [
  { index: '01', key: 'THE GRIND', headline: 'First, the awakening.', italic: 'awakening.', description: 'A handful of beans. A turn of the handle. The room begins to smell like possibility.', caption: 'THE AROMA / 00:00' },
  { index: '02', key: 'THE BLOOM', headline: 'Then, let it breathe.', italic: 'breathe.', description: 'Hot water meets freshly ground coffee. A gentle bloom releases the story inside every bean.', caption: 'THE BLOOM / 00:40' },
  { index: '03', key: 'THE POUR', headline: 'Finally, find the flow.', italic: 'flow.', description: 'A slow spiral of water. A warm ceramic cup. Something beautiful begins to take shape.', caption: 'THE POUR / 02:30' }
] as const;

function AdobeSteamMark({ compact = false }: { compact?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const reduce = Boolean(useReducedMotion());
  useEffect(() => {
    if (!container.current || reduce) return;
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      animationData: JSON.parse(JSON.stringify(steamAnimation)),
      loop: true,
      autoplay: true,
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet' }
    });
    return () => animation.destroy();
  }, [reduce]);
  return <div className={`adobe-steam-mark ${compact ? 'adobe-steam-mark--compact' : ''}`} aria-hidden="true">
    {reduce ? <span className="steam-typographic-mark">〰</span> : <div ref={container} className="h-full w-full"/>}
  </div>;
}

function SceneFrame({ progress, onSeek, embed = false }: { progress: MotionValue<number>; onSeek: (value: number) => void; embed?: boolean }) {
  const [active, setActive] = useState(0);
  const reduce = Boolean(useReducedMotion());
  useMotionValueEvent(progress, 'change', (v: number) => {
    const next = v < .34 ? 0 : v < .69 ? 1 : 2;
    setActive(previous => previous === next ? previous : next);
  });
  const stage = stages[active];
  return <div className={`cinematic-frame ${embed ? 'cinematic-frame--embed' : ''}`}>
    <div className="cinematic-orbit cinematic-orbit--one" aria-hidden="true"/>
    <div className="cinematic-orbit cinematic-orbit--two" aria-hidden="true"/>
    <div className="cinematic-grain" aria-hidden="true"/>
    <ThreeCoffeeScene progress={progress}/>
    <div className="cinematic-topline">
      <div className="cinematic-kicker"><span className="cinematic-kicker-line"/> THE ART OF TAKING TIME</div>
      <div className="cinematic-top-right"><AdobeSteamMark compact/><span>STORY IN MOTION<br/>HANDCRAFTED IN 3D</span></div>
    </div>
    <div className="cinematic-caption" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={stage.key} initial={reduce ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -18 }} transition={{ duration: reduce ? 0 : .68, ease: [0.22, 1, 0.36, 1] }}>
          <div className="cinematic-chapter"><span>{stage.index}</span><span className="cinematic-separator"/>{stage.key}</div>
          <h2 className="cinematic-heading">{stage.headline.split(stage.italic)[0]}<em>{stage.italic}</em></h2>
          <p className="cinematic-copy">{stage.description}</p>
        </motion.div>
      </AnimatePresence>
      <div className="cinematic-bottom-meta"><span>{stage.caption}</span><span className="cinematic-bottom-divider"/><span>3D OBJECT STUDY</span></div>
    </div>
    <div className="cinematic-stage-nav" role="group" aria-label="Choose a 3D animation movement">
      {stages.map((s, i) => <button key={s.key} className={`cinematic-stage-button ${active === i ? 'is-active' : ''}`} onClick={() => onSeek(i === 0 ? .09 : i === 1 ? .49 : .85)} aria-label={`Go to ${s.key.toLowerCase()}`} aria-pressed={active === i}><span className="cinematic-stage-number">{s.index}</span><span className="cinematic-stage-label">{s.key}</span></button>)}
    </div>
    <div className="cinematic-scroll-prompt" aria-hidden="true"><span>SCROLL TO SHAPE THE STORY</span><MoveDownRight size={17}/></div>
    <motion.div className="cinematic-meter" style={{ scaleX: progress }} aria-hidden="true"/>
  </div>;
}

export default function Cinematic() {
  const target = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] });
  const reduce = Boolean(useReducedMotion());
  const smoothed = useSpring(scrollYProgress, reduce ? { stiffness: 500, damping: 70 } : { stiffness: 125, damping: 29, mass: .38, restDelta: .0005 });
  const onSeek = (value: number) => {
    if (!target.current) return;
    const rect = target.current.getBoundingClientRect();
    const start = window.scrollY + rect.top;
    const scrollRoom = target.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + scrollRoom * value, behavior: reduce ? 'auto' : 'smooth' });
  };
  return <section id="cinematic" ref={target} className="cinematic-scroll-section" aria-label="Scroll-driven three-dimensional coffee ritual">
    <div className="cinematic-sticky"><SceneFrame progress={smoothed} onSeek={onSeek}/></div>
    <div className="cinematic-mobile-hint"><ArrowDown size={15}/> KEEP SCROLLING TO BREW</div>
  </section>;
}

/** Embed-only rendering mode; Webflow controls the scroll progress via postMessage. */
export function WebflowCinematic(): ReactNode {
  const progress = useMotionValue(0);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent || event.data?.type !== 'morrow:scroll') return;
      const value = Number(event.data.progress);
      if (!Number.isFinite(value)) return;
      progress.set(Math.min(1, Math.max(0, value)));
      setConnected(true);
    };
    window.addEventListener('message', onMessage);
    window.parent.postMessage({ type: 'morrow:ready' }, '*');
    return () => window.removeEventListener('message', onMessage);
  }, [progress]);
  const seek = (value: number) => {
    progress.set(value); // Also works when previewed outside Webflow.
    if (window.parent !== window) window.parent.postMessage({ type: 'morrow:seek', progress: value }, '*');
  };
  return <div className="cinematic-embed-root"><SceneFrame progress={progress} onSeek={seek} embed/>{!connected && window.parent === window && <div className="cinematic-preview-controls"><label htmlFor="preview-scrubber">Preview the Webflow scroll bridge</label><input id="preview-scrubber" type="range" min="0" max="100" defaultValue="0" onChange={e => progress.set(Number(e.target.value) / 100)}/><a href="/">View the full site <ArrowUpRight size={14}/></a></div>}</div>;
}
