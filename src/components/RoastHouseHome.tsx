import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Coffee, Pause, Play, ShoppingBag, X } from 'lucide-react';
import CoffeeCanvas, { type DrinkTone } from './CoffeeCanvas';
import BrewMotion from './BrewMotion';
import Reveal from './Reveal';
import { useDialogFocus } from '../hooks/useDialogFocus';
import { origins } from '../data';

type Navigate=(to:string)=>void;
type Drink={name:string,tag:string,notes:string,description:string,tone:DrinkTone};
const drinks:Drink[]=[
 {name:'Mocha Latte',tag:'01 / CREAM & COCOA',notes:'Chocolate · Vanilla · Comfort',description:'Silky, sweet and made for mornings that deserve a little extra.',tone:'latte'},
 {name:'Pour Over',tag:'02 / CLEAN & BRIGHT',notes:'Citrus · Floral · Clarity',description:'A slow, thoughtful pour that lets every delicate note shine.',tone:'filter'},
 {name:'Espresso',tag:'03 / BOLD & GOLDEN',notes:'Caramel · Cacao · Body',description:'A little cup with a whole lot of personality.',tone:'espresso'}
];
const frames=[
 {image:'/images/hero.webp',name:'The first spark.',body:'A beautiful cup begins with curiosity.',eyebrow:'01 / THE IDEA'},
 {image:'/images/hero-ritual.webp',name:'The slow pour.',body:'A little patience makes room for extraordinary things.',eyebrow:'02 / THE RITUAL'},
 {image:'/images/cafe-bar.webp',name:'The good company.',body:'For every moment worth lingering over.',eyebrow:'03 / THE FEELING'}
];
const productPhoto:Record<string,string>={ethiopia:'/images/daybreak.webp',colombia:'/images/golden-hour.webp',guatemala:'/images/afterglow.webp'};
function StoryReel({open,onClose}:{open:boolean;onClose:()=>void}){
 const [index,setIndex]=useState(0),[playing,setPlaying]=useState(true);
 const reduced=Boolean(useReducedMotion());
 const dialogRef=useDialogFocus<HTMLDivElement>(open,onClose);
 useEffect(()=>{if(open){setIndex(0);setPlaying(!reduced)}},[open,reduced]);
 useEffect(()=>{if(!open||!playing||reduced)return;const timer=window.setInterval(()=>setIndex(i=>(i+1)%frames.length),5300);return()=>window.clearInterval(timer)},[open,playing,reduced]);
 useEffect(()=>{if(!open)return;const fn=(e:KeyboardEvent)=>{if(e.key==='ArrowRight')setIndex(i=>(i+1)%frames.length);else if(e.key==='ArrowLeft')setIndex(i=>(i+frames.length-1)%frames.length)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[open]);
 const item=frames[index];
 return <AnimatePresence>{open&&<motion.div className="m55-reel-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}>
  <motion.div className="m55-reel" role="dialog" aria-modal="true" aria-label="Interactive three-part coffee photo story" tabIndex={-1} ref={dialogRef} initial={reduced?false:{opacity:0,scale:.97,y:15}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.97}} transition={{duration:reduced?0:.25}} onClick={e=>e.stopPropagation()}>
   <button className="m55-reel-close" onClick={onClose} aria-label="Close story"><X size={23}/></button>
   <div className="m55-reel-image"><AnimatePresence mode="wait" initial={false}><motion.img key={item.image} src={item.image} alt={item.name} initial={reduced?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.3}}/></AnimatePresence></div>
   <div className="m55-reel-panel"><span>{item.eyebrow} / MORROW STORIES</span><h2>{item.name}</h2><p>{item.body}</p><div className="m55-reel-controls"><button onClick={()=>setIndex(i=>(i+frames.length-1)%frames.length)} aria-label="Previous photo"><ChevronLeft size={19}/></button><button onClick={()=>setPlaying(v=>!v)} aria-label={playing?'Pause automatic slideshow':'Play automatic slideshow'}>{playing?<Pause size={18}/>:<Play size={18}/>}</button><button onClick={()=>setIndex(i=>(i+1)%frames.length)} aria-label="Next photo"><ChevronRight size={19}/></button><small>{index+1} / {frames.length}</small></div><div className="m55-progress"><span style={{width:((index+1)/frames.length*100)+'%'}}/></div></div>
  </motion.div></motion.div>}</AnimatePresence>;
}
export default function RoastHouseHome({navigate,add}:{navigate:Navigate;add:(id:string,qty?:number)=>void}){
 const [selected,setSelected]=useState(1),[strength,setStrength]=useState(58),[reelOpen,setReelOpen]=useState(false);
 const reduced=Boolean(useReducedMotion());
 const choice=drinks[selected];
 return <div className="m55-home">
  <section className="m55-hero" aria-labelledby="m55-hero-title">
   <motion.div className="m55-hero-photo" initial={reduced?false:{scale:1.06,opacity:.7}} animate={{scale:1,opacity:1}} transition={{duration:reduced?0:1.4,ease:[.2,.7,.2,1]}}><img src="/images/hero.webp" alt="Artistic dark coffee still life with ceramic coffee cup and roasted beans" fetchPriority="high"/></motion.div>
   <div className="m55-hero-shade"/><div className="m56-hero-ambience" aria-hidden="true"><span className="m56-float-bean b1">✦</span><span className="m56-float-bean b2">✳</span><span className="m56-float-bean b3">✧</span></div><div className="m55-hero-content">
    <motion.span className="m55-overline" initial={reduced?false:{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.48}}>MORROW COFFEE HOUSE <span aria-hidden="true">✳</span> SMALL BATCH, BIG FEELING</motion.span>
    <motion.h1 id="m55-hero-title" initial={reduced?false:{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.65,delay:.12}}>COFFEE<br/><em>HOUSE.</em></motion.h1>
    <motion.p initial={reduced?false:{opacity:0,y:19}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.55,delay:.24}}>Only the good stuff. Thoughtfully roasted, slowly enjoyed.</motion.p>
    <motion.div className="m55-hero-actions" initial={reduced?false:{opacity:0,y:17}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.5,delay:.34}}><button className="m55-button m55-button-caramel" onClick={()=>navigate('/coffee')}>SHOP THE COFFEE <ArrowUpRight size={18}/></button><button className="m55-button m55-button-outline" onClick={()=>navigate('/cafe')}>EXPLORE THE CAFÉ <ArrowRight size={18}/></button></motion.div>
   </div><span className="m55-hero-vertical">COFFEE FOR THE UNHURRIED</span><span className="m55-hero-index">01 — A GOOD BEGINNING</span><a href="#m55-drinks" className="m55-scroll" aria-label="Explore signature drinks">SCROLL TO DISCOVER <ArrowDown size={20}/></a>
  </section>
  <div className="m55-ticker" aria-hidden="true"><div>{[0,1,2,3].map(i=><span key={i}>GOOD COFFEE <b>✳</b> GOOD COMPANY <b>✳</b> GOOD DAYS <b>✳</b></span>)}</div></div>
  <section className="m55-drinks" id="m55-drinks" aria-labelledby="m55-drinks-title">
   <Reveal className="m55-section-head"><span className="m55-kicker">THE COFFEE BAR / THREE WAYS TO SIP</span><h2 id="m55-drinks-title">WE BELIEVE IN COFFEE<br/><em>THAT TASTES INCREDIBLE.</em></h2><p>Three moods, one good reason to slow down. Select a cup and play with the visual brew strength.</p></Reveal>
   <div className="m55-cups" role="group" aria-label="Select a signature drink">{drinks.map((d,i)=><motion.button key={d.tone} type="button" className={'m55-cup-choice '+(selected===i?'selected':'')} aria-pressed={selected===i} onClick={()=>setSelected(i)} whileHover={reduced?undefined:{y:-6}} transition={{duration:.2}}><span className="m55-cup-visual"><CoffeeCanvas tone={d.tone} strength={strength}/></span><small>{d.tag}</small><strong>{d.name}</strong><span className="m55-drink-notes">{d.notes}</span></motion.button>)}</div>
   <Reveal className="m55-drink-studio"><div><span className="m55-kicker">NOW TASTING / {String(selected+1).padStart(2,'0')}</span><h3>{choice.name}</h3><p>{choice.description}</p></div><div className="m55-slider"><label htmlFor="m55-intensity">Visual roast intensity <strong>{strength}%</strong></label><input id="m55-intensity" type="range" min="25" max="90" value={strength} onChange={e=>setStrength(Number(e.target.value))}/><small>This changes the illustrated liquid, not an actual coffee recipe.</small></div><button className="m55-button m55-button-dark" onClick={()=>navigate('/cafe#menu')}>EXPLORE THE FULL MENU <ArrowUpRight size={17}/></button></Reveal>
   <Reveal className="m56-brew-wrap"><BrewMotion/></Reveal>
  </section>
  <section className="m55-collection"><div className="m55-shell"><Reveal className="m55-collection-title"><span className="m55-kicker">FRESH FROM THE ROASTERY</span><h2>FIND YOUR <em>EVERYDAY FAVORITE.</em></h2><p>Three origins. Three personalities. One very good reason for another cup.</p></Reveal><div className="m55-products">{origins.map((o,i)=><Reveal key={o.id} delay={i*.08}><article className="m55-product"><button className="m55-product-image" aria-label={'View '+o.name} onClick={()=>navigate('/coffee/'+o.id)}><img loading="lazy" src={productPhoto[o.id]} alt={'Illustrative coffee bag for '+o.name}/><span>0{i+1} / 03</span></button><div className="m55-product-info"><div><small>{o.country.toUpperCase()} / {o.roast.toUpperCase()}</small><h3>{o.name}</h3><p>{o.notes.join(' / ')}</p><strong>${o.price}.00 <span>/ 250G</span></strong></div><button className="m55-add" onClick={()=>add(o.id)} aria-label={'Add '+o.name+' to shopping bag'}><ShoppingBag size={19}/></button></div></article></Reveal>)}</div><Reveal className="m55-product-more"><button className="m55-button m55-button-caramel" onClick={()=>navigate('/coffee')}>SHOP ALL COFFEE <ArrowRight size={18}/></button></Reveal></div></section>
  <section className="m55-story" aria-labelledby="m55-story-title"><Reveal className="m55-section-head"><span className="m55-kicker">THE MORROW STORY / MORE THAN A DRINK</span><h2 id="m55-story-title">OUR <em>STORY.</em></h2><p>A little curiosity, a little craft, and a lot of love for the everyday cup.</p></Reveal><div className="m55-story-image"><img loading="lazy" src="/images/feature.webp" alt="Atmospheric dark coffee still life with roasted beans"/><div className="m55-story-overlay"/><button className="m55-story-play" onClick={()=>setReelOpen(true)}><span><Play size={31} fill="currentColor"/></span><strong>PLAY THE STORY</strong><small>INTERACTIVE PHOTO REEL / 3 CHAPTERS</small></button><span className="m55-story-caption">BEHIND EVERY GREAT CUP, THERE'S A STORY.</span></div></section>
  <section className="m55-outro"><Reveal><span className="m55-kicker">CURIOUS MINDS BREW BETTER COFFEE</span><h2>MORE TO <em>EXPLORE.</em></h2><p>Go hands-on in the Brew Lab, learn our origins, or find your favorite corner of Morrow.</p><div><button onClick={()=>navigate('/brew')}>EXPERIMENT WITH BREWING <ArrowUpRight size={19}/></button><button onClick={()=>navigate('/origins')}>DISCOVER THE ORIGINS <ArrowUpRight size={19}/></button></div></Reveal><Coffee size={90} strokeWidth={.75} aria-hidden="true"/></section>
  <StoryReel open={reelOpen} onClose={()=>setReelOpen(false)}/>
 </div>;
}
