import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowRight, ArrowUpRight, Coffee, Pause, Play, RotateCcw, Sparkles, ShoppingBag } from 'lucide-react';
import { origins } from '../data';

type Navigate=(path:string)=>void;
type Props={navigate:Navigate;add:(id:string,qty?:number)=>void};

const slides=[
 {src:'/images/hero.webp',alt:'An espresso cup and coffee beans in warm, dark morning light',eyebrow:'A LITTLE RITUAL. A LOT OF FEELING.',heading:'A slower kind of morning.',description:'Thoughtful coffee, beautiful everyday moments.',button:'Discover our coffee',to:'/coffee'},
 {src:'/images/collection.webp',alt:'A styled collection of specialty coffee bags, cups and brewing tools',eyebrow:'THREE ORIGINS. ENDLESS POSSIBILITIES.',heading:'Find the coffee that feels like yours.',description:'Explore three distinct roasts and the stories behind them.',button:'Meet the collection',to:'/coffee'}
] as const;

const drinks=[
 {name:'Mocha Latte',sub:'Soft, creamy, cocoa-rich',src:'/images/drinks.webp',alt:'A selection of handcrafted milk coffees and a latte on the café table',focus:'50% 45%',notes:'A little comfort in every sip.'},
 {name:'Pour-over',sub:'Clean, delicate, aromatic',src:'/images/hero-ritual.webp',alt:'White ceramic pour-over dripper and glass carafe',focus:'75% 50%',notes:'Let the coffee take its time.'},
 {name:'Espresso',sub:'Bold, warm, full-bodied',src:'/images/feature.webp',alt:'A fresh dark coffee in a ceramic cup on an espresso-toned table',focus:'72% 58%',notes:'Small cup, big personality.'}
];

const pictures:Record<string,string>={ethiopia:'/images/daybreak.webp',colombia:'/images/golden-hour.webp',guatemala:'/images/afterglow.webp'};

function useOnScreen<T extends HTMLElement>(threshold=.2){
 const ref=useRef<T>(null);const [visible,setVisible]=useState(false);
 useEffect(()=>{const node=ref.current;if(!node)return;const obs=new IntersectionObserver(([entry])=>setVisible(Boolean(entry?.isIntersecting)),{threshold});obs.observe(node);return()=>obs.disconnect()},[threshold]);
 return {ref,visible};
}
function BrewStory({navigate,enabled}:{navigate:Navigate;enabled:boolean}){
 const {ref,visible}=useOnScreen<HTMLElement>(.16);
 const [progress,setProgress]=useState(0);
 const [playing,setPlaying]=useState(false);
 const started=useRef(false);
 const last=useRef(0);
 useEffect(()=>{
   if(visible&&enabled&&!started.current){
     started.current=true;setProgress(0);setPlaying(true);
   }
 },[visible,enabled]);
 useEffect(()=>{
   if(!visible||!playing||!enabled||progress>=100)return;
   let frame=0;
   const animate=(now:number)=>{
     if(!last.current)last.current=now;
     const delta=Math.min(100,now-last.current);last.current=now;
     setProgress(old=>Math.min(100,old+delta/85));
     frame=requestAnimationFrame(animate);
   };
   frame=requestAnimationFrame(animate);
   return()=>{cancelAnimationFrame(frame);last.current=0};
 },[visible,playing,enabled,progress>=100]);
 useEffect(()=>{if(progress>=100)setPlaying(false)},[progress]);
 const stage=progress<23?'BLOOM':progress<78?'SLOW POUR':progress<100?'FINAL DRIP':'READY TO SIP';
 const replay=()=>{setProgress(0);started.current=true;last.current=0;setPlaying(true)};
 const toggle=()=>{if(progress===100)replay();else setPlaying(v=>!v)};
 const pourStart=progress>=23, pourEnd=progress>=95;
 return <section className="m57-brew" id="m57-brew" ref={ref} aria-label="Interactive brewing demonstration">
   <div className="m57-brew-photo">
     <img src="/images/cafe-bar.webp" alt="Barista's café counter with a copper pour-over brewer and coffee equipment" loading="lazy"/>
     <div className="m57-photo-grain"/>
     <div className={'m57-wisps '+(visible&&playing&&enabled?'running':'')} aria-hidden="true"><i/><i/><i/></div>
     <div className={'m57-motion-dots '+(visible&&playing&&enabled?'running':'')} aria-hidden="true"><i/><i/><i/></div>
     <div className="m57-brew-photo-label"><span>THE BREWING RITUAL</span><strong>{stage}</strong></div>
   </div>
   <div className="m57-brew-content">
     <span className="m57-kicker">A MOMENT WORTH MAKING</span>
     <h2>Watch the ritual <em>unfold.</em></h2>
     <p>From bloom to final drip. One cup, made with a little more intention.</p>
     <div className="m57-brew-meter"><div className="m57-brew-meter-head"><span>{pourStart&&!pourEnd?'Water is flowing':'BREW IN PROGRESS'}</span><strong>{Math.round(progress)}%</strong></div>
       <div role="progressbar" aria-label="Brewing demonstration" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} className="m57-brew-track"><span style={{width:progress+'%'}}/></div>
     </div>
     <div className="m57-brew-controls">
       <button type="button" className="m57-primary m57-brew-play" onClick={toggle} aria-label={playing?'Pause brewing demonstration':progress===100?'Replay brewing demonstration':'Play brewing demonstration'}>{playing?<Pause size={17}/>:<Play size={17}/>} {progress===100?'Replay the brew':playing?'Pause the brew':'Watch it brew'}</button>
       <button type="button" className="m57-replay" onClick={replay}><RotateCcw size={16}/> Restart</button>
     </div>
     <button className="m57-text-action" onClick={()=>navigate('/brew')}>Try the full Brew Lab <ArrowUpRight size={18}/></button>
     {!enabled&&<span className="m57-motion-hint">Animations are paused. Enable motion at the top of the page to watch the brew.</span>}
   </div>
 </section>;
}
export default function EditorialHome({navigate,add}:Props){
 const reduced=Boolean(useReducedMotion());
 const [motionEnabled,setMotionEnabled]=useState(!reduced);
 const [slide,setSlide]=useState(0),[heroPlaying,setHeroPlaying]=useState(!reduced),[selectedDrink,setSelectedDrink]=useState(0);
 const {ref:heroRef,visible:heroVisible}=useOnScreen<HTMLElement>(.08);
 useEffect(()=>{if(!motionEnabled||!heroPlaying||!heroVisible)return;const timer=setInterval(()=>setSlide(i=>(i+1)%slides.length),5500);return()=>clearInterval(timer)},[motionEnabled,heroPlaying,heroVisible]);
 useEffect(()=>{if(!motionEnabled)setHeroPlaying(false)},[motionEnabled]);
 const active=slides[slide];
 const motionToggle=()=>setMotionEnabled(current=>{if(!current)setHeroPlaying(true);return !current});
 return <div className={'m57-home '+(motionEnabled?'m57-motion-enabled':'m57-motion-off')}>
   <section className="m57-hero" ref={heroRef} aria-label="Morrow Coffee homepage showcase">
     <div className="m57-hero-media">
       <AnimatePresence mode="sync" initial={false}><motion.img key={active.src} src={active.src} alt={active.alt} className="m57-hero-image" fetchPriority={slide===0?'high':'auto'} initial={{opacity:0,scale:motionEnabled?1.05:1}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:motionEnabled?.95:0,ease:[.22,.7,.22,1]}}/></AnimatePresence>
     </div>
     <div className="m57-hero-scrim"/>
     <div className="m57-container m57-hero-inner">
       <div className="m57-hero-copy">
         <span className="m57-kicker m57-light-kicker"><Sparkles size={15}/> MORROW COFFEE HOUSE</span>
         <AnimatePresence mode="wait" initial={false}><motion.div key={slide} data-hero-slide={slide} initial={{opacity:0,y:motionEnabled?15:0}} animate={{opacity:1,y:0}} exit={{opacity:0,y:motionEnabled?-12:0}} transition={{duration:motionEnabled?.42:0}}>
           <h1>{active.heading.split(' ').slice(0,-1).join(' ')} <em>{active.heading.split(' ').slice(-1)[0]}</em></h1>
           <p>{active.description}</p>
         </motion.div></AnimatePresence>
         <div className="m57-hero-actions"><button className="m57-primary" onClick={()=>navigate(active.to)}>{active.button}<ArrowUpRight size={17}/></button><button className="m57-ghost" onClick={()=>navigate('/cafe')}>Explore the café <ArrowRight size={17}/></button></div>
       </div>
     </div>
     <div className="m57-hero-bottom">
       <div className="m57-hero-counter"><span>THE MORROW EDIT / {String(slide+1).padStart(2,'0')}</span><div className="m57-hero-dots">{slides.map((item,i)=><button aria-label={'Show hero slide '+(i+1)} aria-pressed={i===slide} key={item.src} onClick={()=>setSlide(i)} className={i===slide?'active':''}/>)}</div></div>
       <div className="m57-hero-switches"><button type="button" onClick={()=>setHeroPlaying(v=>!v)} aria-label={heroPlaying?'Pause hero slideshow':'Play hero slideshow'} disabled={!motionEnabled}>{heroPlaying?<Pause size={15}/>:<Play size={15}/>} {heroPlaying?'Pause slides':'Play slides'}</button><button type="button" onClick={motionToggle} aria-pressed={motionEnabled} aria-label={motionEnabled?'Turn off animations':'Enable animations'}>Motion {motionEnabled?'on':'off'}</button></div>
     </div>
   </section>
   <section className="m57-drink-section" id="signature-drinks">
     <div className="m57-container">
       <div className="m57-section-heading"><div><span className="m57-kicker">AT THE COFFEE BAR</span><h2>Three ways to <em>slow down.</em></h2></div><p>Real coffee moments. No endless descriptions. Just find what sounds good.</p></div>
       <div className="m57-drink-grid">{drinks.map((drink,index)=><button key={drink.name} onClick={()=>setSelectedDrink(index)} className={'m57-drink-card '+(selectedDrink===index?'selected':'')} aria-pressed={selectedDrink===index}>
         <span className="m57-drink-image"><img src={drink.src} alt={drink.alt} loading="lazy" style={{objectPosition:drink.focus}}/><span className="m57-drink-number">0{index+1}</span></span><span className="m57-drink-title">{drink.name}<ArrowUpRight size={20}/></span><small>{drink.sub}</small>
       </button>)}</div>
       <div className="m57-drink-selected"><span><Coffee size={19}/> OUR PICK / {drinks[selectedDrink].name}</span><p>{drinks[selectedDrink].notes}</p><button onClick={()=>navigate('/cafe#menu')}>See the café menu <ArrowRight size={18}/></button></div>
     </div>
   </section>
   <div className="m57-container"><BrewStory navigate={navigate} enabled={motionEnabled}/></div>
   <section className="m57-coffee-collection"><div className="m57-container">
     <div className="m57-section-heading"><div><span className="m57-kicker">FROM THE COLLECTION</span><h2>Find your next <em>favorite.</em></h2></div><button onClick={()=>navigate('/coffee')} className="m57-text-action">Explore all coffee <ArrowRight size={18}/></button></div>
     <div className="m57-product-grid">{origins.map((origin,i)=><article className="m57-product" key={origin.id}>
       <button className="m57-product-photo" onClick={()=>navigate('/coffee/'+origin.id)} aria-label={'View '+origin.name+' coffee'}><img src={pictures[origin.id]} alt={origin.name+' coffee bag and cup, concept product photograph'} loading="lazy"/><span className="m57-product-tag">{origin.roast}</span></button>
       <div className="m57-product-details"><div><span>{origin.country.toUpperCase()} · {String(i+1).padStart(2,'0')}</span><h3>{origin.name}</h3><p>{origin.notes.join(' · ')}</p><strong>${origin.price.toFixed(2)} <small>/ 250g</small></strong></div><button className="m57-product-add" onClick={()=>add(origin.id)} aria-label={'Add '+origin.name+' to shopping bag'}><ShoppingBag size={19}/></button></div>
     </article>)}</div>
   </div></section>
   <section className="m57-story"><div className="m57-story-photo"><img src="/images/cafe.webp" loading="lazy" alt="Barista brewing coffee at a sunlit specialty café counter"/></div><div className="m57-story-copy"><span className="m57-kicker">A SPACE TO STAY AWHILE</span><h2>More than just <em>a cup.</em></h2><p>A welcoming corner, warm light, and time for the good stuff.</p><button className="m57-primary" onClick={()=>navigate('/about')}>Our story <ArrowUpRight size={17}/></button></div></section>
   <div className="m57-quiet-note"><Coffee size={19}/><span>MADE WITH CARE. ENJOYED WITHOUT HURRY.</span><ArrowDown size={18}/></div>
 </div>;
}
