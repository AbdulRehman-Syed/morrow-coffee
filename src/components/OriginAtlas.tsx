import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Compass, MapPin, Mountain, Sun } from 'lucide-react';
import { origins } from '../data';

const pins = [
  { x: 544, y: 210, rx: 9, ry: 40 }, // Ethiopia (9°N 40°E)
  { x: 299, y: 222, rx: -74, ry: 2 }, // Colombia (2°N 74°W)
  { x: 253, y: 193, rx: -90, ry: 15 }, // Guatemala (15°N 90°W)
];
const LAND = [
  'M80 105L100 78L135 67L171 46L218 61L244 82L236 111L256 118L251 146L231 159L219 180L194 186L189 206L169 204L157 187L138 185L121 172L108 155L86 146Z',
  'M239 204L259 191L289 200L319 206L337 224L325 249L312 270L305 301L290 343L271 363L253 341L247 311L237 286L232 246L220 226Z',
  'M432 102L456 92L479 100L489 110L482 121L466 125L459 142L439 140L427 124Z',
  'M468 152L504 136L541 146L562 174L564 213L548 246L530 280L509 316L490 297L479 267L463 231L456 200Z',
  'M486 101L525 75L569 70L612 57L667 69L707 83L748 76L808 90L856 116L863 148L845 166L812 157L781 179L747 181L729 202L697 186L665 177L644 200L626 192L602 207L580 186L568 161L544 151L537 125L511 119Z',
  'M778 272L811 250L844 263L871 284L867 309L842 329L802 326L777 307Z',
  'M364 101L391 94L407 104L414 122L398 130L382 117Z',
];
const routeDescriptions = [
  { climate: 'MISTY HIGHLANDS', altitude: '2,100m', harvest: 'Oct – Jan', highlight: 'Floral & expressive' },
  { climate: 'ANDEAN VALLEYS', altitude: '1,850m', harvest: 'Apr – Jun', highlight: 'Sweet & balanced' },
  { climate: 'VOLCANIC SOIL', altitude: '1,700m', harvest: 'Nov – Mar', highlight: 'Warm & layered' }
];
const ease = [0.22,1,.36,1] as const;

export default function OriginAtlas({ selected, onSelect }: { selected: number; onSelect: (value: number)=>void }) {
  const reduced=Boolean(useReducedMotion());
  const origin=origins[selected];
  const detail=routeDescriptions[selected];
  const pin=pins[selected];
  return <div className="atlas-shell grid lg:grid-cols-[1.65fr_.85fr] gap-0 mb-8 lg:mb-10">
    <div className="atlas-map relative min-w-0 overflow-hidden">
      <div className="atlas-corner-label absolute left-6 top-6 sm:left-9 sm:top-9 z-10 flex gap-3 items-center"><Compass size={17}/><span>FIELD NOTES / WORLD ATLAS</span></div>
      <div className="absolute right-6 top-7 z-10 text-right hidden sm:block"><div className="atlas-top-number">03</div><div className="atlas-corner-label">ORIGINS TO EXPLORE</div></div>
      <svg viewBox="0 0 950 430" className="atlas-map-svg w-full h-full" role="group" aria-label="Illustrative world map with selectable coffee origins in Ethiopia, Colombia, and Guatemala">
        <defs>
          <pattern id="atlas-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".5" fill="#b9b8a3" opacity=".26"/></pattern>
          <linearGradient id="atlas-ocean" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#e1e2d5"/><stop offset="1" stopColor="#cad0c2"/></linearGradient>
        </defs>
        <rect width="950" height="430" fill="url(#atlas-ocean)"/>
        <rect width="950" height="430" fill="url(#atlas-dots)"/>
        {[82,164,246,328].map(y=><line key={`h${y}`} x1="0" y1={y} x2="950" y2={y} stroke="#a5b2a0" strokeWidth=".8" strokeDasharray="2 9" opacity=".48"/>)}
        {[130,260,390,520,650,780,910].map(x=><line key={`v${x}`} x1={x} y1="0" x2={x} y2="430" stroke="#a5b2a0" strokeWidth=".8" strokeDasharray="2 9" opacity=".48"/>)}
        {LAND.map((path,i)=><path key={i} d={path} fill="#a9b39e" fillOpacity=".69" stroke="#e6e4d5" strokeWidth="2" strokeLinejoin="round"/>)}
        <path d="M104 141L153 182L181 208M243 199L284 239L267 319M480 141L527 196L516 286" fill="none" stroke="#738b79" strokeWidth="1" strokeDasharray="4 8" opacity=".33"/>
        <motion.path initial={false} animate={{d:`M${pin.x} ${pin.y} Q${(pin.x+475)/2} ${Math.max(85,pin.y-82)} 475 145`}} transition={{duration:reduced?0:.95,ease}} fill="none" stroke="#9c6748" strokeWidth="1.4" strokeDasharray="3 6" opacity=".75"/>
        {pins.map((p,i)=><g key={origins[i].id} role="button" tabIndex={0} aria-label={`Explore ${origins[i].country}`} aria-pressed={selected===i} onClick={()=>onSelect(i)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(i)}}} className="atlas-pin" transform={`translate(${p.x} ${p.y})`}>
          <circle r="30" fill="transparent"/>
          {selected===i && <><motion.circle initial={{r:16,opacity:.5}} animate={{r:27,opacity:0}} transition={{duration:2,repeat:Infinity,ease:'easeOut'}} fill="none" stroke="#a66744" strokeWidth="1.4"/><circle r="17" fill="#a76847" fillOpacity=".15"/></>}
          <circle r={selected===i?8:6} fill={selected===i?'#a66744':'#f2ede1'} stroke="#a66744" strokeWidth="2.2"/>
          <circle r="1.9" fill={selected===i?'#fff3e0':'#a66744'}/>
          <text y="-18" x={i===0?12:0} textAnchor={i===0?'start':'middle'} fontFamily="DM Mono, monospace" fontSize="11" letterSpacing="1.2" fill="#4b5945" fontWeight="600">{origins[i].country.toUpperCase()}</text>
        </g>)}
        <text x="55" y="382" fill="#617362" fontSize="10" fontFamily="DM Mono, monospace" letterSpacing="2">AN ILLUSTRATED GEOGRAPHY OF FLAVOR</text>
        <text x="881" y="382" textAnchor="end" fill="#617362" fontSize="10" fontFamily="DM Mono, monospace" letterSpacing="2">MORROW / ATLAS 001</text>
      </svg>
      <div className="atlas-map-caption absolute bottom-5 left-6 sm:left-9 text-[9px] font-mono tracking-wider text-[#60705c]">MAP OUTLINES & POSITIONS ARE ILLUSTRATIVE</div>
    </div>
    <div className="atlas-detail relative min-w-0 flex flex-col justify-between bg-[#e8dccb] text-[#392f27] p-7 sm:p-9 lg:p-10">
      <div className="flex items-start justify-between"><div className="micro-label">NOW EXPLORING</div><MapPin size={17} className="text-[#a5714e]"/></div>
      <AnimatePresence mode="wait" initial={false}><motion.div key={origin.id} initial={reduced?false:{opacity:0,y:17}} animate={{opacity:1,y:0}} exit={reduced?undefined:{opacity:0,y:-12}} transition={{duration:reduced?0:.48,ease}} className="py-7 lg:py-9">
        <div className="font-mono text-[10px] text-[#a47554] tracking-[.18em]">{origin.region.toUpperCase()}</div>
        <h3 className="font-display tracking-[-.065em] text-[clamp(3rem,4.3vw,4.8rem)] leading-[1.0] mt-3">{origin.country}<span className="text-[#ae7551]">.</span></h3>
        <p className="font-display italic text-[21px] mt-4 text-[#97684c]">{detail.highlight}</p>
        <div className="grid grid-cols-2 gap-5 mt-8 border-t border-[#c9b9a4] pt-6"><div><Mountain size={15} className="text-[#9c7455] mb-3"/><div className="micro-label mb-1">ALTITUDE</div><p className="font-display text-[26px]">{detail.altitude}</p></div><div><Sun size={15} className="text-[#9c7455] mb-3"/><div className="micro-label mb-1">HARVEST WINDOW</div><p className="font-display text-[20px] leading-[1.4]">{detail.harvest}</p></div></div>
      </motion.div></AnimatePresence>
      <div className="flex flex-wrap justify-between gap-3 items-center"><div className="micro-label">{detail.climate}</div><a href="#flavor-profile" className="inline-flex items-center gap-2 text-[11px] font-semibold group">Explore flavors <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/></a></div>
    </div>
  </div>;
}
