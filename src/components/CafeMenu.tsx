import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Coffee, Leaf, Sun } from 'lucide-react';

type MenuItem = { name: string; description: string; price: string; note: string; tag?: string };
type MenuCategory = { id: string; title: string; eyebrow: string; photo: string; alt: string; intro: string; items: MenuItem[] };
const categories: MenuCategory[] = [
  { id:'espresso', title:'Espresso bar', eyebrow:'THE EVERYDAY FAVORITES', photo:'/images/drinks.webp', alt:'Three handmade coffee drinks on a warm table', intro:'A familiar ritual, made with intention.', items:[
    {name:'Espresso',description:'A little bold, beautifully balanced',price:'$3.50',note:'Served short, rich and aromatic.',tag:'THE CLASSIC'},
    {name:'Flat white',description:'Double espresso, silky steamed milk',price:'$4.50',note:'Smooth and coffee-forward, with a soft finish.'},
    {name:'Cappuccino',description:'Espresso, textured milk, airy foam',price:'$4.50',note:'A comforting cup with a delicate foam crown.'},
    {name:'Honey oat latte',description:'Espresso, oat milk, a hint of honey',price:'$5.50',note:'A little sweetness to slow the morning down.',tag:'BAR FAVORITE'},
  ]},
  {id:'filter',title:'Slow bar',eyebrow:'THE BREWING RITUAL',photo:'/images/hero-ritual.webp',alt:'Pour-over coffee served in a glass carafe',intro:'Brewed slowly. Worth every minute.',items:[
    {name:'V60 pour-over',description:'A rotating single-origin selection',price:'$5.50',note:'Discover the character of one coffee, one cup at a time.',tag:'OUR SIGNATURE'},
    {name:'Batch brew',description:'A beautifully balanced daily cup',price:'$3.75',note:'An easy favorite for moments on the move.'},
    {name:'Iced filter',description:'Bright, chilled and refreshing',price:'$4.75',note:'All the clarity of filter coffee, served cold.'},
  ]},
  {id:'sweet',title:'From the counter',eyebrow:'SOMETHING ON THE SIDE',photo:'/images/cafe-bar.webp',alt:'A sunlit artisan café counter with warm wood and greenery',intro:'One more reason to stay a while.',items:[
    {name:'Butter croissant',description:'Flaky, golden, made for coffee',price:'$3.75',note:'An easy pairing for your morning espresso.',tag:'MORNING PICK'},
    {name:'Cardamom bun',description:'Soft, aromatic, a little special',price:'$4.00',note:'Warm spice beside a rich flat white.'},
    {name:'Dark chocolate cookie',description:'Rich cocoa, a pinch of sea salt',price:'$3.50',note:'Best with something bright from the slow bar.'}
  ]}
];

export default function CafeMenu() {
 const [active,setActive]=useState('espresso');
 const [picked,setPicked]=useState('Espresso');
 const reduced=Boolean(useReducedMotion());
 const category=categories.find(c=>c.id===active)!;
 const selected=category.items.find(i=>i.name===picked) ?? category.items[0];
 const change=(next:string)=>{setActive(next);setPicked(categories.find(c=>c.id===next)!.items[0].name)};
 return <section id="menu" className="v52-menu" aria-labelledby="v52-menu-title">
   <div className="v5-shell">
     <header className="v52-menu-header"><div><span className="v52-eyebrow">THE COFFEE BAR / MENU PREVIEW</span><h2 id="v52-menu-title">Made with <em>care.</em></h2></div><p>Explore the drinks, discover the details, and find a little something for your next visit.</p></header>
     <div className="v52-menu-layout">
       <div className="v52-menu-photo"><AnimatePresence mode="wait" initial={false}><motion.img key={category.photo} src={category.photo} alt={category.alt} loading="lazy" initial={reduced?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.28}}/></AnimatePresence><div className="v52-menu-photo-overlay"><span>{category.eyebrow}</span><p>{category.intro}</p></div></div>
       <div className="v52-menu-board"><div className="v52-menu-tabs" role="tablist" aria-label="Menu category">{categories.map(c=><button key={c.id} type="button" role="tab" id={`menu-tab-${c.id}`} aria-controls="v52-menu-items" aria-selected={active===c.id} onClick={()=>change(c.id)}>{c.id==='espresso'?<Coffee size={17}/>:c.id==='filter'?<Sun size={17}/>:<Leaf size={17}/>}<span>{c.title}</span></button>)}</div>
         <div id="v52-menu-items" role="tabpanel" aria-labelledby={`menu-tab-${active}`}>
           <AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={reduced?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.22}}><div className="v52-menu-items">{category.items.map(item=><button type="button" key={item.name} aria-pressed={selected.name===item.name} className={selected.name===item.name?'is-selected':''} onClick={()=>setPicked(item.name)}><span><strong>{item.name}</strong><small>{item.description}</small></span><span className="v52-menu-price">{item.price}</span></button>)}</div></motion.div></AnimatePresence>
           <div className="v52-menu-detail" aria-live="polite"><div><span>{selected.tag??'FROM OUR COUNTER'}</span><h3>{selected.name}</h3><p>{selected.note}</p></div><ArrowUpRight size={22} aria-hidden="true"/></div>
         </div>
       </div>
     </div><p className="v52-menu-disclaimer">Illustrative café menu and concept pricing. No physical location or availability is confirmed.</p>
   </div>
 </section>;
}
