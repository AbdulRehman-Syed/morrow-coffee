import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Coffee, Menu, Minus, Plus, RotateCcw, ShoppingBag, Timer, X } from 'lucide-react';
import { origins, flavorAxes, type Origin } from './data';
import { BrewIllustration, CoffeeBag } from './components/Illustrations';
import { MorrowMark, Sparkle } from './components/Icons';
import Cinematic, { WebflowCinematic } from './components/Cinematic';
import BrewLab from './components/BrewLab';
import OriginAtlas from './components/OriginAtlas';
import SignatureHero from './components/SignatureHero';
import CoffeeShowcase from './components/CoffeeShowcase';
import ChapterNav from './components/ChapterNav';
import { ReactLenis } from 'lenis/react';

const ease = [0.22, 1, 0.36, 1] as const;

type CartItem = { id: string; quantity: number };

function Reveal({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}) {
  const reduce=Boolean(useReducedMotion());
  return <motion.div className={className} initial={reduce?false:{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.14}} transition={{duration:reduce ? 0.01 : .85,delay,ease}}>{children}</motion.div>;
}

function Wordmark({light=false}:{light?:boolean}) {
  return <a href="#top" aria-label="Morrow home" className={`inline-flex items-center gap-2.5 transition-opacity hover:opacity-70 ${light?'text-canvas':'text-espresso'}`}>
    <MorrowMark className="w-9 h-9"/><span className="font-display text-[28px] leading-none tracking-[-.075em]">morrow<span className="text-roast">.</span></span>
  </a>;
}

function Header({bagCount,onBagClick}:{bagCount:number;onBagClick:()=>void}) {
  const [menuOpen,setMenuOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{
    const onScroll=()=>setScrolled((document.getElementById('top')?.getBoundingClientRect().bottom??500)<=90);
    onScroll();window.addEventListener('scroll',onScroll,{passive:true});
    return ()=>window.removeEventListener('scroll',onScroll);
  },[]);
  return <>
    <div className="announcement-bar relative z-30 text-center bg-espresso text-[#ede1d2] py-2.5 px-5 font-mono text-[9px] sm:text-[10px] tracking-[.15em] uppercase">An invitation to slow down <span className="mx-2.5 text-[#b89173]">✳</span> Complimentary shipping on orders $50+</div>
    <header className={`site-header sticky top-0 z-40 transition-all duration-500 ${scrolled?'bg-canvas/95 text-espresso shadow-[0_8px_30px_rgba(43,36,28,.06)] backdrop-blur-xl':'bg-[#1b221f] text-[#e9dfcf]'}`}>
      <div className={`site-container flex items-center justify-between transition-all duration-500 ${scrolled?'py-3':'py-4'}`}>
        <Wordmark light={!scrolled}/>
        <nav className="hidden md:flex items-center gap-9 text-[12px] font-semibold tracking-[.01em]" aria-label="Main navigation">
          <a className="nav-link" href="#collection">The collection</a>
          <a className="nav-link" href="#cinematic">The journey</a><a className="nav-link" href="#lab">Brew studio</a>
          <a className="nav-link" href="#origins">Explore origins</a>
        </nav>
        <div className="flex items-center gap-3 sm:gap-5">
          <a href="#origins" className="hidden sm:inline-flex text-[11px] font-semibold tracking-wide items-center gap-2 group">Find your coffee <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></a>
          <button className="bag-button relative p-2.5" aria-label={`Open bag, ${bagCount} items`} onClick={onBagClick}><ShoppingBag size={19} strokeWidth={1.7}/><span className="bag-count">{bagCount}</span></button>
          <button className="md:hidden p-2" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X size={23}/>:<Menu size={23}/>}</button>
        </div>
      </div>
      <AnimatePresence>{menuOpen&&<motion.nav initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="md:hidden overflow-hidden bg-canvas text-espresso border-t border-[#ddd2c5]" aria-label="Mobile navigation"><div className="site-container flex flex-col gap-5 py-6 font-display text-2xl">{[['The collection','#collection'],['Our story','#story'],['The journey','#cinematic'],['Brew studio','#lab'],['The ritual','#ritual'],['Explore origins','#origins']].map(([text,href])=><a key={href} href={href} onClick={()=>setMenuOpen(false)}>{text}</a>)}</div></motion.nav>}</AnimatePresence>
    </header>
  </>;
}

function Ticker() {
  const text=['SOURCE WITH CARE','ROAST WITH HEART','BREW WITH INTENTION','SAVOR THE LITTLE THINGS'];
  return <div className="ticker bg-espresso text-canvas overflow-hidden py-[22px]" aria-label="Source with care, roast with heart, brew with intention, savor the little things"><div className="ticker-track flex items-center w-max">{Array.from({length:4},(_,i)=><div key={i} className="flex items-center shrink-0">{text.map(t=><div key={t} className="flex items-center gap-9 px-6"><span className="font-display text-[22px] md:text-[26px] italic whitespace-nowrap">{t.toLowerCase()}</span><Sparkle className="w-3 h-3 text-[#bb865e]"/></div>)}</div>)}</div></div>;
}

function Story() {
  return <section id="story" className="story-section relative overflow-hidden py-28 lg:py-40">
    <div className="site-container grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-24 items-center">
      <Reveal className="relative mx-auto w-full max-w-[470px]">
        <div className="story-art relative aspect-[4/4.4] rounded-t-[47%] rounded-b-[10px] overflow-hidden">
          <div className="absolute inset-0 story-landscape">
            <div className="landscape-sun"/><div className="mountain mountain-back"/><div className="mountain mountain-front"/>
            <div className="story-field story-field-one"/><div className="story-field story-field-two"/>
            <div className="story-field story-field-three"/>
            <div className="absolute left-[16%] top-[25%] text-[11px] tracking-[.24em] font-mono text-[#f1e3ca] transform -rotate-90 origin-left">FROM EARTH TO CUP</div>
            <div className="absolute bottom-7 right-7 text-canvas text-xs tracking-[.24em] font-mono">02° 11' N<br/>39° 40' E</div>
          </div>
        </div>
        <motion.div whileHover={{rotate:12,scale:1.04}} transition={{duration:.5,ease}} className="story-stamp absolute -right-5 top-[14%] w-[114px] h-[114px] rounded-full bg-[#e9dfd0] border border-[#cbb8a4] flex flex-col items-center justify-center text-center text-espresso rotate-[9deg] shadow-[0_10px_35px_rgba(40,28,18,.08)]"><Sparkle className="w-5 h-5 mb-2"/><span className="font-mono text-[9px] leading-[1.5] tracking-[.13em]">GOOD COFFEE<br/>GOOD PEOPLE</span></motion.div>
        <div className="absolute -bottom-6 -left-5 bg-canvas p-5 max-w-[210px] shadow-[0_14px_38px_rgba(41,36,31,.07)]"><div className="font-display text-2xl italic">Every bean has<br/>a beginning.</div></div>
      </Reveal>
      <div className="lg:pl-5">
        <Reveal><div className="eyebrow mb-7"><span className="eyebrow-line"/> THE STORY BEHIND THE CUP</div></Reveal>
        <Reveal delay={.08}><h2 className="section-title max-w-[680px]">A good cup is a <span className="italic text-roast">small ritual.</span></h2></Reveal>
        <Reveal delay={.15}><p className="max-w-[530px] text-[15px] md:text-[17px] text-[#756a5d] leading-[1.95] mt-8">We believe coffee is more than a morning habit. It's a pause. A chance to be present. A connection to the hands and places that made it possible.</p></Reveal>
        <Reveal delay={.2}><p className="max-w-[525px] text-[15px] text-[#756a5d] leading-[1.95] mt-5">That's why we source exceptional beans directly and roast gently in small batches—to let every origin speak for itself.</p></Reveal>
        <Reveal delay={.28} className="grid grid-cols-3 border-t border-[#d7cabc] mt-12 pt-7 gap-3">
          <div><div className="font-display text-[30px] sm:text-[41px]">100<span className="text-roast">%</span></div><p className="micro-label mt-1">Traceable coffee</p></div>
          <div><div className="font-display text-[30px] sm:text-[41px]">03</div><p className="micro-label mt-1">Distinct origins</p></div>
          <div><div className="font-display text-[30px] sm:text-[41px]">∞</div><p className="micro-label mt-1">Slow moments</p></div>
        </Reveal>
      </div>
    </div>
  </section>;
}

const brewingSteps=[
  {number:'01',short:'Grind',title:'Begin with the grind.',subtitle:'Freshness is everything.',description:'Grind your beans just before brewing. Aim for a medium-fine texture, like coarse sea salt. Breathe in that first burst of aroma.',detail:'MEDIUM–FINE',time:'~ 20 SEC'},
  {number:'02',short:'Bloom',title:'Give it room to bloom.',subtitle:'Let the coffee wake up.',description:'Start with twice the coffee weight in hot water. Pour gently, then pause for 35–40 seconds as the grounds release their gases.',detail:'2× COFFEE WEIGHT',time:'0:00 – 0:40'},
  {number:'03',short:'Pour',title:'Pour a little patience.',subtitle:'Slow circles. Beautiful balance.',description:'Pour the remaining water in gentle, even circles. Keep the bed saturated, never flooded. Let gravity do its beautiful work.',detail:'92–96°C WATER',time:'0:40 – 3:00'}
];

function BrewTimer() {
  const [seconds,setSeconds]=useState(0);
  const [running,setRunning]=useState(false);
  useEffect(()=>{
    if(!running)return;
    const interval=window.setInterval(()=>setSeconds(s=>s+1),1000);
    return()=>window.clearInterval(interval);
  },[running]);
  useEffect(()=>{
    if(seconds>=180)setRunning(false);
  },[seconds]);
  const time=`${Math.floor(seconds/60).toString().padStart(2,'0')}:${(seconds%60).toString().padStart(2,'0')}`;
  return <div className="flex gap-4 items-center flex-wrap mt-5"><div className="flex items-center gap-2"><Timer size={15} className="text-roast"/><span className="font-mono text-[15px] tabular-nums">{time}</span><span className="text-[10px] text-[#988879]">/ 03:00</span></div><button className="text-[11px] font-semibold underline decoration-[#b9a491] underline-offset-4" onClick={()=>setRunning(v=>!v)}>{running?'Pause timer':seconds===0?'Start timer':'Resume timer'}</button><button aria-label="Reset timer" className="transition-transform hover:-rotate-45" onClick={()=>{setSeconds(0);setRunning(false)}}><RotateCcw size={14}/></button></div>;
}

function Ritual() {
  const [step,setStep]=useState(0);
  const [dose,setDose]=useState(20);
  const [desktopView,setDesktopView]=useState(()=>typeof window!=='undefined' && window.matchMedia('(min-width: 1024px)').matches);
  useEffect(()=>{const media=window.matchMedia('(min-width: 1024px)');const update=()=>setDesktopView(media.matches);media.addEventListener('change',update);return()=>media.removeEventListener('change',update)},[]);
  const section=useRef<HTMLElement>(null);
  const cardRefs=useRef<(HTMLElement|null)[]>([]);
  const {scrollYProgress}=useScroll({target:section,offset:['start end','end start']});
  const progress=useSpring(scrollYProgress,{stiffness:80,damping:23,restDelta:.001});
  const goTo=(index:number)=>{setStep(index);cardRefs.current[index]?.scrollIntoView({behavior:'smooth',block:'center'})};
  return <section id="ritual" ref={section} className="ritual-section py-28 lg:py-36 overflow-hidden relative">
    <motion.div className="ritual-progress" style={{scaleX:progress}} />
    <div className="site-container">
      <Reveal className="mb-16 lg:mb-24"><div className="eyebrow mb-6"><span className="eyebrow-line"/> A SLOWER WAY TO BREW</div><div className="flex flex-wrap gap-6 justify-between items-end"><h2 className="section-title max-w-[750px]">The beauty is<br/>in the <span className="italic text-roast">process.</span></h2><p className="max-w-[250px] text-[14px] leading-[1.8] text-[#807468] pb-2">Three little movements. One extraordinary cup. Scroll through the ritual.</p></div></Reveal>
      {!desktopView&&<div className="lg:hidden sticky top-[66px] z-30 bg-[#eadecf] border border-[#d4c3b1] rounded-[6px] h-[215px] sm:h-[285px] overflow-hidden shadow-[0_12px_28px_rgba(47,38,30,.09)] mb-7" aria-live="polite">
        <div className="absolute top-4 left-5 z-10 micro-label">{brewingSteps[step].number} / {brewingSteps[step].short.toUpperCase()}</div>
        <div className="h-full flex justify-center items-center max-w-[450px] mx-auto"><BrewIllustration step={step}/></div>
      </div>}
      <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-10 lg:gap-24 items-start">
        <div className="lg:sticky lg:top-[112px] self-start">
          {desktopView&&<div className="brew-stage relative rounded-[8px] overflow-hidden bg-[#eadfd2] min-h-[265px] sm:min-h-[380px] flex items-center justify-center">
            <div className="absolute top-6 left-6 z-10"><div className="micro-label text-[#827363]">THE POUR-OVER METHOD</div><div className="font-display text-2xl mt-2 italic">A moment to make.</div></div>
            <div className="w-full"><BrewIllustration step={step}/></div>
            <div className="absolute bottom-5 left-6 flex gap-2">{brewingSteps.map((s,i)=><button key={s.number} className={`step-dot ${step===i?'active':''}`} aria-label={`Show ${s.short.toLowerCase()} animation`} aria-pressed={step===i} onClick={()=>goTo(i)}/>)}</div>
            <div className="absolute bottom-5 right-6 micro-label text-[#837567]">{`0${step+1} / 03`}</div>
          </div>}
          <div className="brew-controls mt-5 rounded-[7px] px-5 py-5 sm:px-7 sm:py-6">
            <div className="flex items-center justify-between gap-3"><div><span className="micro-label">MAKE IT YOURS</span><div className="font-display text-[22px] mt-1">Your brew ratio</div></div><span className="font-mono text-[12px] text-[#776554]">1 : 16</span></div>
            <div className="flex justify-between items-center mt-5 gap-5"><div className="flex gap-3 items-center"><button className="quantity-button" aria-label="Decrease coffee dose" disabled={dose<=10} onClick={()=>setDose(d=>Math.max(10,d-1))}><Minus size={14}/></button><div className="w-[72px] text-center"><span className="font-display text-[27px]">{dose}</span><span className="text-[11px] ml-1 text-[#82756b]">g</span></div><button className="quantity-button" aria-label="Increase coffee dose" disabled={dose>=35} onClick={()=>setDose(d=>Math.min(35,d+1))}><Plus size={14}/></button></div><div className="text-right"><div className="micro-label mb-1">HOT WATER</div><div className="font-display text-[27px]">{dose*16}<span className="text-[12px] ml-1 text-[#82756b]">ml</span></div></div></div>
          </div>
        </div>
        <div className="space-y-7 sm:space-y-14 lg:pt-2">
          {brewingSteps.map((s,i)=><motion.article key={s.number} ref={el=>{cardRefs.current[i]=el}} onViewportEnter={()=>setStep(i)} viewport={{margin:'-34% 0px -34% 0px',once:false}} className={`brew-step-card cursor-pointer ${step===i?'is-current':''}`} role="button" tabIndex={0} aria-current={step===i?'step':undefined} onClick={()=>setStep(i)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setStep(i)}}}>
            <div className="flex gap-4 items-center mb-6"><span className="font-mono text-[13px] text-roast">{s.number}</span><div className="h-px w-12 bg-[#baa18b]"/><span className="micro-label">{s.short.toUpperCase()}</span></div>
            <h3 className="font-display tracking-[-.055em] leading-[1.14] text-[clamp(2rem,3.35vw,3.4rem)]">{s.title}</h3>
            <p className="font-display italic text-roast text-[20px] sm:text-[23px] mt-3">{s.subtitle}</p>
            <p className="text-[14px] sm:text-[15px] leading-[1.95] text-[#74695e] max-w-[425px] mt-6">{s.description}</p>
            <div className="flex items-center flex-wrap gap-x-10 gap-y-3 border-t border-[#d7c8b9] mt-8 pt-6"><div><div className="micro-label mb-2">KEY DETAIL</div><div className="font-mono text-[11px] font-medium tracking-wide">{s.detail}</div></div><div><div className="micro-label mb-2">TIMING</div><div className="font-mono text-[11px] font-medium tracking-wide">{s.time}</div></div></div>
            {i===2?<div className="mt-7" onClick={e=>e.stopPropagation()}><div className="micro-label">OPTIONAL BREW TIMER</div><BrewTimer/></div>:null}
            <div className="mt-7 flex items-center gap-2 font-mono text-[10px] tracking-[.1em] text-[#a17656]">{i===2?'SAVOR YOUR CUP':'KEEP SCROLLING'}<ArrowDown size={13}/></div>
          </motion.article>)}
          <button className="link-arrow mt-4" onClick={()=>goTo((step+1)%3)}>{step===2?'Repeat the ritual':'Next movement'} <ArrowRight size={18}/></button>
        </div>
      </div>
    </div>
  </section>;
}

const center=160, radius=107;
function radarPoint(index:number,value:number){const angle=-Math.PI/2+index*2*Math.PI/5;const r=radius*value/5;return {x:center+r*Math.cos(angle),y:center+r*Math.sin(angle)}}
function radarPolygon(scores:readonly number[]){return scores.map((score,i)=>{const p=radarPoint(i,score);return `${p.x.toFixed(2)},${p.y.toFixed(2)}`}).join(' ')}

function FlavorRadar({origin}:{origin:Origin}) {
  const reduce=Boolean(useReducedMotion());
  return <div className="radar-wrap relative w-full max-w-[395px] mx-auto">
    <svg viewBox="0 0 320 320" role="img" aria-label={`Flavor radar for ${origin.country}: ${flavorAxes.map((axis,i)=>`${axis} ${origin.scores[i]} out of 5`).join(', ')}`} className="w-full overflow-visible">
      {[1,2,3,4,5].map(n=><polygon key={n} points={radarPolygon(Array(5).fill(n))} fill={n===5?'#e4d8c9':'none'} fillOpacity=".35" stroke="#cab9a6" strokeWidth={n===5?1.3:.8} />)}
      {flavorAxes.map((label,i)=>{const p=radarPoint(i,5);const tp=radarPoint(i,6.04);return <g key={label}><line x1={center} y1={center} x2={p.x} y2={p.y} stroke="#bba895" strokeWidth="1"/><text x={tp.x} y={tp.y+4} fontFamily="DM Sans, Arial, sans-serif" fontSize="11.5" fontWeight="600" fill="#635749" textAnchor="middle">{label}</text></g>})}
      <motion.polygon initial={false} animate={{points:radarPolygon(origin.scores),fill:origin.accent}} transition={{duration:reduce ? 0.01 : .9,ease}} fillOpacity=".38" stroke="#76513a" strokeWidth="2.5" strokeLinejoin="round" />
      {origin.scores.map((v,i)=>{const p=radarPoint(i,v);return <motion.circle key={i} initial={false} animate={{cx:p.x,cy:p.y}} transition={{duration:reduce ? 0.01 : .9,ease}} r="4" fill="#f7eee1" stroke="#76513a" strokeWidth="2"/>})}
      <circle cx="160" cy="160" r="3" fill="#71523a"/>
    </svg>
  </div>;
}

function Origins({onAdd,index,setIndex}:{onAdd:(id:string)=>void;index:number;setIndex:(value:number)=>void}) {
  const [added,setAdded]=useState<string|null>(null);
  const origin=origins[index];
  const add=()=>{onAdd(origin.id);setAdded(origin.id);window.setTimeout(()=>setAdded(null),1500)};
  return <section id="origins" className="origins-section relative bg-espresso text-canvas overflow-hidden py-28 lg:py-36">
    <div className="absolute -top-72 -right-52 w-[750px] h-[750px] rounded-full pointer-events-none" style={{background:'radial-gradient(circle, rgba(158,104,72,.13), transparent 66%)'}}/>
    <div className="site-container relative">
      <Reveal className="flex flex-wrap gap-7 items-end justify-between mb-14 lg:mb-20"><div><div className="eyebrow eyebrow-light mb-6"><span className="eyebrow-line"/> THE ORIGIN EXPLORER</div><h2 className="section-title max-w-[800px]">One world. <span className="italic text-[#c9916a]">Infinite</span><br/>ways to taste it.</h2></div><p className="max-w-[265px] text-[14px] leading-[1.85] text-[#b8aa9a]">Every origin is a story. Find the flavor that feels like yours.</p></Reveal>
      <OriginAtlas selected={index} onSelect={setIndex}/>
      <div id="flavor-profile" className="grid lg:grid-cols-[1fr_1.08fr] items-stretch gap-6 lg:gap-9">
        <Reveal className="origin-chart-panel text-espresso rounded-[7px] p-6 sm:p-9 lg:p-11 flex flex-col justify-between min-h-[520px]">
          <div className="flex justify-between items-center gap-3"><div className="micro-label">TASTE, VISUALIZED</div><div className="flex gap-1.5 items-center text-[10px] font-mono text-[#958676]"><span className="w-2 h-2 rounded-full bg-roast"/>FLAVOR INTENSITY / 5</div></div>
          <div className="flex-1 flex justify-center items-center py-4"><FlavorRadar origin={origin}/></div>
          <div className="flex flex-wrap justify-between items-end border-t border-[#d4c6b7] pt-5 gap-3"><div><span className="micro-label">SIGNATURE NOTES</span><div className="font-display text-[20px] sm:text-[25px] mt-2 italic">{origin.notes.join(' · ')}</div></div><span className="font-mono text-[11px]">0{index+1} / 03</span></div>
        </Reveal>
        <Reveal delay={.12} className="origin-info-panel relative rounded-[7px] border border-[#655448] bg-[#342e27] p-6 sm:p-9 lg:p-11 min-h-[520px] flex flex-col">
          <div className="flex justify-between items-center gap-2"><div className="micro-label text-[#b9a799]">CHOOSE YOUR ORIGIN</div><div className="font-mono text-[10px] tracking-[.18em] text-[#bca58b]">01 — 03</div></div>
          <div className="origin-tabs mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Coffee origins">{origins.map((o,i)=><button role="tab" aria-selected={index===i} key={o.id} onClick={()=>setIndex(i)} className={`origin-tab ${index===i?'selected':''}`}>{o.country}</button>)}</div>
          <AnimatePresence mode="wait"><motion.div key={origin.id} initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-16}} transition={{duration:.55,ease}} className="flex-1 flex flex-col pt-9">
            <div className="flex items-start justify-between gap-4"><div><div className="font-mono text-[11px] text-[#cbad94] tracking-[.17em] uppercase mb-3">{origin.region}</div><h3 className="font-display tracking-[-.06em] leading-none text-[clamp(3.4rem,6vw,6rem)]">{origin.name}<span className="text-[#bd8c65]">.</span></h3></div><Sparkle className="w-8 h-8 text-[#ae8162] shrink-0"/></div>
            <p className="font-display italic text-[22px] sm:text-[27px] text-[#cf9c78] mt-4">{origin.tagline}</p>
            <p className="text-[#bfb2a3] text-[13px] sm:text-[14px] leading-[1.9] max-w-[510px] mt-6">{origin.story}</p>
            <div className="grid grid-cols-3 border-y border-[#66574a] mt-8 py-5 gap-3"><div><div className="micro-label text-[#988879]">ELEVATION</div><div className="text-[12px] sm:text-[13px] font-medium mt-2">{origin.elevation}</div></div><div><div className="micro-label text-[#988879]">PROCESS</div><div className="text-[12px] sm:text-[13px] font-medium mt-2">{origin.process}</div></div><div><div className="micro-label text-[#988879]">PROFILE</div><div className="text-[12px] sm:text-[13px] font-medium mt-2">{origin.roast}</div></div></div>
          </motion.div></AnimatePresence>
          <div className="flex items-center flex-wrap justify-between gap-4 pt-8"><div><div className="micro-label text-[#a69584] mb-1">250G · WHOLE BEAN</div><div className="font-display text-[30px]">${origin.price}.00</div></div><button onClick={add} className="button-cream group">{added===origin.id?'Added to bag':'Add to your ritual'} {added===origin.id?<Check size={17}/>:<ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/>}</button></div>
        </Reveal>
      </div>
      <div className="flex justify-between items-center mt-9 gap-5 text-[#c7b4a2]"><span className="font-mono text-[10px] tracking-[.13em]">SWITCH ORIGINS TO EXPLORE THE FLAVOR MAP</span><div className="flex gap-2"><button className="circle-nav" aria-label="Previous coffee origin" onClick={()=>setIndex((index+2)%3)}><ArrowLeft size={17}/></button><button className="circle-nav" aria-label="Next coffee origin" onClick={()=>setIndex((index+1)%3)}><ArrowRight size={17}/></button></div></div>
    </div>
  </section>;
}

function Closing({onAdd}:{onAdd:(id:string)=>void}) {
  return <section className="closing-section py-24 lg:py-36 overflow-hidden"><div className="site-container relative grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-20 items-center"><div className="relative min-h-[390px] sm:min-h-[490px] flex items-center justify-center"><div className="absolute w-[76%] max-w-[410px] aspect-square rounded-full bg-[#dac1a4] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/><div className="absolute w-[62%] aspect-square max-w-[350px] rounded-full border border-[#bda287] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/><motion.div className="relative w-[280px] sm:w-[330px]" whileInView={{y:[36,0],opacity:[0,1]}} viewport={{once:true}} transition={{duration:1,ease}}><CoffeeBag color="#c9a178" label="Daybreak" country="Ethiopia"/></motion.div><div className="absolute right-0 top-[9%] rotate-12 text-[10px] font-mono tracking-[.16em] text-[#867361]">FRESHLY ROASTED<br/>JUST FOR YOU</div></div>
    <div className="lg:pl-1"><Reveal><div className="eyebrow mb-7"><span className="eyebrow-line"/> YOUR NEXT FAVORITE RITUAL</div><h2 className="section-title">Good mornings<br/>start <span className="italic text-roast">here.</span></h2><p className="text-[15px] leading-[1.9] text-[#74685d] max-w-[420px] mt-7">From first light to last sip, make a little space for something wonderful.</p><div className="flex items-center gap-5 mt-9 flex-wrap"><button onClick={()=>onAdd('ethiopia')} className="button-dark group">Bring home Daybreak <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/></button><a href="#origins" className="link-arrow">Explore all coffees <ArrowRight size={17}/></a></div></Reveal></div></div></section>;
}

function Footer() {
  const [email,setEmail]=useState('');
  const [submitted,setSubmitted]=useState(false);
  return <footer className="footer bg-[#e8dfd1] pt-16 md:pt-20 pb-7"><div className="site-container"><div className="grid md:grid-cols-[1.05fr_.7fr_1fr] gap-12 md:gap-16 pb-16"><div><Wordmark/><p className="text-[14px] text-[#817569] leading-[1.9] mt-5 max-w-[255px]">Good coffee. Good company. No need to rush.</p><div className="micro-label mt-12">ROAST SLOW. LIVE FULL.</div></div><div><div className="micro-label mb-6">EXPLORE</div><div className="flex flex-col gap-3 text-[13px] font-medium"><a className="hover:text-roast transition-colors" href="#collection">Coffee collection</a><a className="hover:text-roast transition-colors" href="#story">Our story</a><a className="hover:text-roast transition-colors" href="#lab">Interactive brew studio</a><a className="hover:text-roast transition-colors" href="#ritual">The brewing ritual</a><a className="hover:text-roast transition-colors" href="#origins">Shop coffee</a><a className="hover:text-roast transition-colors" href="#top">Back to top</a></div></div><div><div className="micro-label mb-5">LET'S KEEP IN TOUCH</div><p className="font-display text-[24px] leading-[1.25] mb-6">Notes on better mornings,<br/>straight to your inbox.</p><form className="flex border-b border-[#9d8c7b] py-2" onSubmit={e=>{e.preventDefault();if(email.trim())setSubmitted(true)}}><input className="bg-transparent outline-none min-w-0 flex-1 text-[13px] placeholder:text-[#9e9081]" type="email" required value={email} onChange={e=>{setEmail(e.target.value);setSubmitted(false)}} placeholder="Your email address" aria-label="Your email address"/><button type="submit" aria-label="Join newsletter" className="p-2 hover:translate-x-1 transition-transform"><ArrowRight size={18}/></button></form>{submitted?<p className="text-[11px] text-[#667761] mt-3">Preview confirmed — email sign-up requires a connected newsletter service.</p>:<p className="text-[11px] text-[#9d8f80] mt-3">A little inspiration, never any noise.</p>}</div></div><div className="flex flex-wrap justify-between gap-4 items-center border-t border-[#cfc2b3] pt-6 text-[10px] font-mono tracking-[.08em] text-[#8c7f72]"><span>© {new Date().getFullYear()} MORROW COFFEE. MADE WITH INTENTION.</span><span>THE BEST THINGS TAKE TIME. ✳</span></div></div></footer>;
}

function BagDrawer({open,onClose,items,setItems}:{open:boolean;onClose:()=>void;items:CartItem[];setItems:React.Dispatch<React.SetStateAction<CartItem[]>>}) {
  const [notice,setNotice]=useState(false);
  useEffect(()=>{if(!open)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()};document.addEventListener('keydown',onKey);const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=previous}},[open,onClose]);
  const count=items.reduce((sum,item)=>sum+item.quantity,0);
  const total=items.reduce((sum,item)=>sum+(origins.find(o=>o.id===item.id)?.price??0)*item.quantity,0);
  const change=(id:string,diff:number)=>setItems(prev=>prev.map(item=>item.id===id?{...item,quantity:item.quantity+diff}:item).filter(item=>item.quantity>0));
  return <AnimatePresence>{open&&<div className="fixed inset-0 z-[100]"><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="absolute inset-0 bg-[#15110e]/60 backdrop-blur-[2px]"/><motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{duration:.6,ease}} role="dialog" aria-modal="true" aria-label="Shopping bag" className="absolute right-0 top-0 bottom-0 w-full sm:max-w-[460px] bg-canvas p-6 sm:p-9 flex flex-col overflow-y-auto shadow-2xl">
    <div className="flex justify-between items-center border-b border-[#d5c8b9] pb-6"><div><div className="micro-label mb-2">YOUR SLOW MORNING STARTS HERE</div><h2 className="font-display text-[37px]">Your bag <span className="text-roast">({count})</span></h2></div><button className="circle-nav !border-[#b7a796] !text-espresso" onClick={onClose} aria-label="Close bag"><X size={19}/></button></div>
    {items.length===0?<div className="flex-1 flex flex-col items-center justify-center text-center py-16"><Coffee size={46} strokeWidth={1} className="text-roast mb-6"/><h3 className="font-display text-[30px] mb-3">A little empty in here.</h3><p className="text-[13px] text-[#837669] max-w-[240px] leading-relaxed">Your next favorite cup is just a coffee away.</p><button className="button-dark mt-8" onClick={onClose}>Keep exploring <ArrowRight size={16}/></button></div>:<div className="flex-1 pt-4">{items.map(item=>{const origin=origins.find(o=>o.id===item.id)!;return <div key={item.id} className="flex gap-4 items-center py-5 border-b border-[#ded2c4]"><div className="w-[84px] h-[100px] flex items-center justify-center rounded bg-[#e3d4c1] overflow-hidden"><CoffeeBag color={origin.accent} label={origin.name} country={origin.country}/></div><div className="flex-1"><div className="micro-label">{origin.country.toUpperCase()}</div><h3 className="font-display text-[23px] mt-1">{origin.name}</h3><div className="text-[11px] text-[#887869] mt-1">250g · Whole bean</div><div className="flex gap-3 items-center mt-3"><button className="quantity-button !w-7 !h-7" aria-label={`Remove one ${origin.name}`} onClick={()=>change(item.id,-1)}><Minus size={11}/></button><span className="text-[12px] font-mono">{item.quantity}</span><button className="quantity-button !w-7 !h-7" aria-label={`Add one ${origin.name}`} onClick={()=>change(item.id,1)}><Plus size={11}/></button></div></div><div className="font-display text-[19px]">${origin.price*item.quantity}</div></div>})}</div>}
    {items.length>0&&<div className="pt-6 border-t border-[#d5c8b9]"><div className="flex justify-between items-center mb-2"><span className="text-[13px]">Subtotal</span><span className="font-display text-[28px]">${total}.00</span></div><p className="text-[11px] text-[#918375] mb-5">Shipping calculated at checkout. Orders $50+ ship free.</p><button className="button-dark !w-full justify-center" onClick={()=>setNotice(true)}>Continue to checkout <ArrowUpRight size={17}/></button>{notice&&<p className="text-[11px] mt-3 text-[#846443]">This is a storefront demo; checkout is not connected to a payment provider.</p>}</div>}
  </motion.aside></div>}</AnimatePresence>;
}

function MainWebsite() {
  const [items,setItems]=useState<CartItem[]>([]);
  const [bagOpen,setBagOpen]=useState(false);
  const [featured,setFeatured]=useState(0);
  const count=items.reduce((sum,item)=>sum+item.quantity,0);
  const add=(id:string)=>{setItems(prev=>{const found=prev.find(x=>x.id===id);return found?prev.map(x=>x.id===id?{...x,quantity:x.quantity+1}:x):[...prev,{id,quantity:1}]});setBagOpen(true)};
  const closeBag=()=>setBagOpen(false);
  const reduced=Boolean(useReducedMotion());
  const content=<div className="min-h-screen bg-canvas text-espresso"><Header bagCount={count} onBagClick={()=>setBagOpen(true)}/><ChapterNav/><main><SignatureHero selected={featured} onSelect={setFeatured}/><Ticker/><CoffeeShowcase selected={featured} onSelect={setFeatured} onAdd={add}/><Story/><Cinematic/><BrewLab/><Ritual/><Origins onAdd={add} index={featured} setIndex={setFeatured}/><Closing onAdd={add}/></main><Footer/><BagDrawer open={bagOpen} onClose={closeBag} items={items} setItems={setItems}/></div>;
  return reduced ? content : <ReactLenis root options={{lerp:.09,wheelMultiplier:.9,touchMultiplier:1.15}}>{content}</ReactLenis>;
}

/** Route the Webflow embed before mounting the main site's hooks. */
function LabEmbed() {
  useEffect(()=>{
    const section=document.getElementById('lab');
    if(!section || window.parent===window) return;
    const notify=()=>window.parent.postMessage({type:'morrow:lab-height',height:Math.ceil(section.getBoundingClientRect().height)},'*');
    const observer=new ResizeObserver(notify);
    observer.observe(section);
    notify();
    return ()=>observer.disconnect();
  },[]);
  return <div className="bg-canvas text-espresso"><BrewLab/></div>;
}
export default function App() {
  const mode=new URLSearchParams(window.location.search).get('webflow');
  return mode === '1' ? <WebflowCinematic /> : mode === 'lab' ? <LabEmbed/> : <MainWebsite/>;
}
