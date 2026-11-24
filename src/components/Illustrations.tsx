import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Bean, Sparkle } from './Icons';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroIllustration() {
  const reduce = Boolean(useReducedMotion());
  return (
    <div className="hero-illustration relative w-full" aria-label="Illustration of freshly brewed coffee, a coffee bag, and floating coffee beans" role="img">
      <svg viewBox="0 0 650 680" className="w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heroBlob" x1=".18" y1="0" x2=".9" y2="1"><stop stopColor="#e6c9ad"/><stop offset="1" stopColor="#d1aa88"/></linearGradient>
          <linearGradient id="heroCup" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff5e6"/><stop offset="1" stopColor="#dbc8b0"/></linearGradient>
          <linearGradient id="heroBag" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c9ad85"/><stop offset="1" stopColor="#9c7e59"/></linearGradient>
          <linearGradient id="heroGlass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f4e6d3" stopOpacity=".9"/><stop offset="1" stopColor="#fdf7e9" stopOpacity=".3"/></linearGradient>
          <filter id="heroShadow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="16"/></filter>
        </defs>
        <path d="M132 62C237 3 396 35 493 113c105 84 124 226 82 347-42 120-177 178-322 155C109 592 30 476 46 319 59 197 52 111 132 62Z" fill="url(#heroBlob)" />
        <circle cx="333" cy="333" r="244" stroke="#f5e7d4" strokeOpacity=".65" strokeWidth="1.2" fill="none" strokeDasharray="5 9" />
        <path d="M81 380c24 108 116 197 228 212" fill="none" stroke="#ad7c58" strokeOpacity=".45" strokeWidth="1" />
        <ellipse cx="332" cy="570" rx="205" ry="31" fill="#4b3121" opacity=".18" filter="url(#heroShadow)"/>
        {/* Coffee bag in the rear of the arrangement */}
        <motion.g animate={reduce ? undefined : { y: [0,-8,0], rotate: [-2,-1,-2] }} transition={{duration:7, ease:'easeInOut', repeat:Infinity}} style={{transformOrigin:'375px 325px'}}>
          <path d="M286 153l159-8 31 30 4 345-193 9-21-335Z" fill="url(#heroBag)" stroke="#846b50" strokeWidth="2" />
          <path d="M286 153l-19 40 20 335 13-37-7-307Z" fill="#947551" />
          <path d="M286 153l159-8 31 30-168 9Z" fill="#ddc59d" />
          <path d="M301 201l162-8 3 283-165 8Z" fill="#e9dcc7" />
          <path d="M319 220l129-6" stroke="#b6a28b" strokeWidth="1" />
          <text x="383" y="275" textAnchor="middle" fontFamily="Georgia,serif" fontSize="43" fill="#3b3229" letterSpacing="-3">morrow.</text>
          <path d="M359 303c9-18 17-28 24-28s15 10 24 28M355 309c16-7 40-7 56 0" stroke="#634d38" strokeWidth="2" fill="none" strokeLinecap="round" />
          <text x="383" y="354" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="10" letterSpacing="3" fill="#665543">SINGLE ORIGIN</text>
          <path d="M323 374h124" stroke="#b6a28b"/>
          <text x="383" y="410" textAnchor="middle" fontFamily="Georgia,serif" fontSize="25" fill="#4a3c30">DAYBREAK</text>
          <text x="383" y="430" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" letterSpacing="2" fill="#655443">GUJI, ETHIOPIA</text>
          <text x="383" y="462" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="8" letterSpacing="2" fill="#655443">WHOLE BEAN · 250G</text>
        </motion.g>
        {/* Dripper and cup form the main foreground silhouette */}
        <ellipse cx="236" cy="550" rx="145" ry="19" fill="#705039" opacity=".19" />
        <path d="M150 399h162l-20 147c-6 25-115 25-122 0L150 399Z" fill="url(#heroGlass)" stroke="#faf1e6" strokeWidth="5" />
        <path d="M171 465h122l-12 72c-4 15-88 17-97 1Z" fill="#7d4934" opacity=".91" />
        <ellipse cx="231" cy="466" rx="60" ry="9" fill="#a16b46" />
        <path d="M308 422c54-18 71 21 49 55-11 18-31 19-51 9" stroke="#fbede0" strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M308 422c54-18 71 21 49 55-11 18-31 19-51 9" stroke="#ac8e76" strokeWidth="2" fill="none" />
        <ellipse cx="231" cy="398" rx="82" ry="15" fill="#f1e2cf" stroke="#fff5e8" strokeWidth="5" />
        <path d="M126 277h215L281 392c-8 17-84 17-92 0Z" fill="#f4e7d7" stroke="#a98d74" strokeWidth="3" />
        <path d="M150 300h165l-41 80c-6 10-63 10-69 0Z" fill="#bc8f6d" />
        <ellipse cx="233" cy="300" rx="83" ry="13" fill="#58402f" />
        <ellipse cx="233" cy="300" rx="67" ry="8" fill="#79513a" />
        <path d="M126 277c3-10 211-10 215 0" stroke="#fff8eb" strokeWidth="9" strokeLinecap="round"/>
        <path d="M231 392v11" stroke="#835137" strokeWidth="5" strokeLinecap="round" />
        {/* Pour from the upper right */}
        <motion.path d="M462 182C409 205 371 226 309 273" fill="none" stroke="#fff5df" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 7"
          animate={reduce ? undefined : {strokeDashoffset:[0,-60]}} transition={{duration:2.8, ease:'linear', repeat:Infinity}} />
        <path d="M472 163l-49-2-14 11 23 16 65 1" fill="#5b4435" />
        <path d="M477 154c3-46 71-48 91-13l-2 53-49 20-44-25Z" fill="#6b5342" />
        <ellipse cx="523" cy="151" rx="48" ry="14" fill="#4e3d31" />
        <path d="M509 123c0-26 13-35 31-32" fill="none" stroke="#554031" strokeWidth="12" strokeLinecap="round" />
        <path d="M554 172c34-12 34 20 12 32" fill="none" stroke="#513f32" strokeWidth="12" strokeLinecap="round" />
        <path d="M462 177h-18" stroke="#8e7360" strokeWidth="4" />
        <motion.g animate={reduce ? undefined : {y:[0,-14,0], rotate:[-8,2,-8]}} transition={{duration:5, repeat:Infinity,ease:'easeInOut'}} style={{transformOrigin:'135px 190px'}}><Bean x={122} y={185} rotate={-28} scale={1.25} fill="#6f432c"/><Bean x={151} y={207} rotate={43} scale={.65} fill="#8d5839"/></motion.g>
        <motion.g animate={reduce ? undefined : {y:[0,10,0], rotate:[5,-8,5]}} transition={{duration:6, repeat:Infinity,ease:'easeInOut'}} style={{transformOrigin:'518px 405px'}}><Bean x={521} y={405} rotate={23} scale={1.25} fill="#815036"/><Bean x={548} y={439} rotate={-30} scale={.7} fill="#a26d49"/></motion.g>
        {/* Illustrative steam */}
        {[0,1,2].map(i => <motion.path key={i} d={`M${193+i*37} 255c-18-24 23-27 5-55`} stroke="#fff2e1" strokeWidth="3.6" fill="none" strokeLinecap="round" opacity=".7"
          animate={reduce ? undefined : {y:[4,-15,-28],opacity:[0,.8,0]}} transition={{duration:3.6,delay:i*.7,repeat:Infinity,ease:'easeOut'}} />)}
      </svg>
      <div className="hero-seal absolute right-0 bottom-[8%] md:right-[-3%] flex items-center justify-center">
        <div className="text-center"><Sparkle className="w-4 h-4 mx-auto mb-2" /><span>MADE FOR<br/>SLOW<br/>MORNINGS</span></div>
      </div>
    </div>
  );
}

function Steam({ reduce }: { reduce: boolean }) {
  return <g aria-hidden="true">{[0,1,2].map(i=><motion.path key={i} d={`M${278+i*42} 171c-22-23 20-34 2-65`} stroke="#c69a7b" strokeWidth="3" strokeLinecap="round" fill="none"
      animate={reduce?undefined:{y:[12,-16,-42],opacity:[0,.7,0]}}
      transition={{duration:3.2,repeat:Infinity,delay:i*.72,ease:'easeOut'}} opacity=".48" />)}</g>;
}

function BrewingVessel({ bloom, reduce }: {bloom:boolean;reduce:boolean}) {
  return <g>
    <ellipse cx="336" cy="451" rx="158" ry="12" fill="#8f7560" opacity=".13" />
    {/* Carafe: glass, wide at the bottom */}
    <path d="M296 319L275 350c-17 28-25 48-18 70 9 31 134 37 153 1 9-21 0-46-21-76l-23-26" fill="#e9ddd0" fillOpacity=".74" stroke="#a78e7a" strokeWidth="4" strokeLinejoin="round" />
    <path d="M269 403c15 25 112 29 132 0l-2 17c-13 24-113 27-127 1Z" fill="#a46946" opacity=".88"/>
    <ellipse cx="335" cy="403" rx="66" ry="9" fill="#b77c54" opacity=".9"/>
    <path d="M392 351c55-18 64 57 8 57" stroke="#ac9580" strokeWidth="13" strokeLinecap="round" fill="none"/>
    <path d="M392 351c55-18 64 57 8 57" stroke="#f4e9dc" strokeWidth="8" strokeLinecap="round" fill="none"/>
    {/* V60 dripper */}
    <path d="M225 237h217l-70 113c-9 17-66 17-76 0Z" fill="#ebdbca" stroke="#9e8069" strokeWidth="3" />
    <path d="M246 248h175l-57 87c-8 12-51 12-59 0Z" fill="#d8bfa5" />
    <path d="M255 255h158l-39 57c-27 15-59 14-82 0Z" fill="#62412f" />
    <ellipse cx="334" cy="253" rx="79" ry="11" fill={bloom?'#8c5d3e':'#61402e'} />
    <path d="M225 237c0-8 216-8 217 0" stroke="#faf0e3" strokeWidth="11" strokeLinecap="round" />
    <path d="M298 352h70" stroke="#af937b" strokeWidth="6" strokeLinecap="round" />
    <path d="M331 355v12" stroke="#a36743" strokeWidth="4" strokeLinecap="round" />
    {bloom && <g>
      {[0,1,2,3,4,5,6].map(i=><motion.circle key={i} cx={279+(i%4)*32} cy={249+(i%2)*3} r="3" fill="#d6ad7e"
        animate={reduce?undefined:{r:[1.2,8,1.2],opacity:[0,.7,0]}}
        transition={{duration:2.5,repeat:Infinity,delay:i*.35,ease:'easeInOut'}} />)}
      <Steam reduce={reduce}/>
    </g>}
  </g>;
}

function GrindScene({reduce}:{reduce:boolean}) {
  return <g>
    <ellipse cx="338" cy="455" rx="150" ry="13" fill="#79604a" opacity=".15" />
    {/* Handle and spindle */}
    <motion.g animate={reduce?undefined:{rotate:[0,360]}} transition={{duration:3.7,repeat:Infinity,ease:'linear'}} style={{transformOrigin:'332px 128px'}}>
      <path d="M332 128v-29h128" stroke="#695040" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <rect x="449" y="76" width="24" height="45" rx="12" fill="#b9906b" stroke="#75563f" strokeWidth="3"/>
    </motion.g>
    <path d="M296 129h72l28 43-17 167h-94l-17-167Z" fill="#d8bd9c" stroke="#896a51" strokeWidth="4"/>
    <path d="M270 177h125" stroke="#6a4c38" strokeWidth="17" strokeLinecap="round"/>
    <path d="M282 192h103l-9 135h-85Z" fill="#b58c65"/>
    {[0,1,2,3,4,5].map(i=><path key={i} d={`M${294+i*15} 201l-6 115`} stroke="#a77b54" strokeWidth="2" opacity=".6"/>)}
    <path d="M282 339h103l-12 95h-79Z" fill="#e5d3be" stroke="#8c7158" strokeWidth="4"/>
    <path d="M289 391h88l-4 38h-79Z" fill="#76513b"/>
    <path d="M304 430h64" stroke="#bda083" strokeWidth="7" strokeLinecap="round" />
    <ellipse cx="332" cy="130" rx="36" ry="12" fill="#5d4434" />
    <ellipse cx="332" cy="128" rx="22" ry="5" fill="#99704e" />
    <path d="M311 135l-13 28M353 135l13 28" stroke="#73503a" strokeWidth="3"/>
    {Array.from({length:13},(_,i)=><motion.circle key={i} cx={304+(i*17)%59} cy={365+(i*13)%32} r={1.8+(i%3)} fill="#82573b"
      animate={reduce?undefined:{y:[-5,10,-5],opacity:[.45,1,.45]}} transition={{duration:2+(i%4)*.4,repeat:Infinity,delay:i*.12}}/>)}
    {[0,1,2,3].map(i=><motion.g key={i} animate={reduce?undefined:{y:[-16,15,-16],rotate:[-8,10,-8]}} transition={{duration:3.2+i*.5,repeat:Infinity,delay:i*.3}} style={{transformOrigin:`${188+i*31}px ${197+i%2*30}px`}}>
      <Bean x={189+i*30} y={197+(i%2)*31} rotate={i*35} scale={.58} fill={i%2?'#8a5d3e':'#62402d'}/>
    </motion.g>)}
    {/* Tiny grind flecks */}
    {[0,1,2,3,4].map(i=><motion.circle key={i} cx={403+i*12} cy={300+i%2*18} r="2" fill="#996941" animate={reduce?undefined:{y:[0,24,50],opacity:[0,.85,0],x:[-3,7,20]}} transition={{duration:2.4,delay:i*.3,repeat:Infinity}}/>)}
    <path d="M225 452h227" stroke="#a88a72" strokeWidth="3" strokeLinecap="round"/>
  </g>;
}

function BloomScene({reduce}:{reduce:boolean}) {
  return <g>
    <BrewingVessel bloom reduce={reduce}/>
    <g><path d="M465 143c-31 13-61 34-89 72" fill="none" stroke="#b7997f" strokeWidth="2.5" strokeDasharray="4 7" />
    {[0,1,2].map(i=><motion.ellipse key={i} cx={407+i*7} cy={191+i*12} rx="3" ry="6" fill="#9bb0aa"
      animate={reduce?undefined:{y:[-18,14],opacity:[0,1,0]}} transition={{duration:1.6,repeat:Infinity,delay:i*.52}} />)}
    </g>
    <path d="M462 139l-45-1-17 12 25 14 56 3" fill="#776150" />
    <path d="M475 113c6-46 79-42 86-3l-6 46-59 15-27-22Z" fill="#77604d"/>
    <ellipse cx="517" cy="112" rx="43" ry="12" fill="#5c4839"/>
    <path d="M554 135c34-8 35 21 9 34" fill="none" stroke="#5c4839" strokeWidth="12" strokeLinecap="round"/>
  </g>;
}

function PourScene({reduce}:{reduce:boolean}) {
  return <g>
    <BrewingVessel bloom reduce={reduce}/>
    <motion.path d="M451 118Q416 171 349 248" stroke="#a9c9be" strokeWidth="6" strokeLinecap="round" fill="none"
      initial={{pathLength:0}} animate={{pathLength:1,opacity:1}} transition={{duration:1.4,ease}} />
    <motion.path d="M453 119Q419 174 351 250" stroke="#e8f4e9" strokeWidth="2" strokeLinecap="round" fill="none"
      animate={reduce?undefined:{pathLength:[0,1],opacity:[0,1,1]}} transition={{duration:2,repeat:Infinity,ease:'easeInOut'}} />
    <path d="M470 106l-44-5-24 10 27 18 52 6" fill="#5d493d" />
    <path d="M480 87c9-49 78-46 89-5l-4 60-60 11-31-29Z" fill="#675144" />
    <ellipse cx="524" cy="86" rx="44" ry="12" fill="#49382f" />
    <path d="M561 116c36-9 34 28 7 39" fill="none" stroke="#49382f" strokeWidth="12" strokeLinecap="round"/>
    <path d="M510 67c2-23 14-30 27-30" stroke="#49382f" strokeWidth="10" fill="none" strokeLinecap="round"/>
    <Steam reduce={reduce}/>
    {[0,1,2].map(i=><motion.circle key={i} cx={331+i*9} cy="354" r="3.5" fill="#8c6243"
      animate={reduce?undefined:{y:[-8,20],opacity:[0,1,0]}} transition={{duration:1.8,delay:i*.53,repeat:Infinity}}/>)}
  </g>;
}

export function BrewIllustration({step}:{step:number}) {
  const reduce=Boolean(useReducedMotion());
  return <svg viewBox="0 0 680 510" className="w-full" role="img" aria-label={['Hand grinder turning and grinding coffee beans','Coffee grounds blooming under a first pour of water','Gooseneck kettle pouring into a dripper and carafe'][step]}>
    <defs><radialGradient id="brewHalo"><stop stopColor="#e8d8c8"/><stop offset="1" stopColor="#e8d8c8" stopOpacity="0"/></radialGradient></defs>
    <ellipse cx="337" cy="254" rx="248" ry="230" fill="url(#brewHalo)"/>
    <circle cx="338" cy="251" r="211" fill="none" stroke="#bba997" strokeOpacity=".4" strokeDasharray="3 10"/>
    <g opacity=".3"><path d="M92 174h68M506 373h76M94 191h35" stroke="#a48d77" strokeWidth="2" strokeLinecap="round"/></g>
    <AnimatePresence mode="wait" initial={false}>
      <motion.g key={step} initial={{opacity:0,y:22,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:-22,scale:.97}} transition={{duration:reduce ? 0.01 : .75,ease}} style={{transformOrigin:'340px 290px'}}>
        {step===0?<GrindScene reduce={reduce}/>:step===1?<BloomScene reduce={reduce}/>:<PourScene reduce={reduce}/>}
      </motion.g>
    </AnimatePresence>
    <text x="338" y="486" textAnchor="middle" fill="#8b796a" fontFamily="monospace" fontSize="11" letterSpacing="3">{['01  /  THE GRIND','02  /  THE BLOOM','03  /  THE POUR'][step]}</text>
  </svg>;
}

export function CoffeeBag({color,label,country}:{color:string;label:string;country:string}) {
  return <svg viewBox="0 0 340 425" className="w-full max-w-[330px]" role="img" aria-label={`Morrow ${label} coffee bag from ${country}`}>
    <defs><linearGradient id="bag-shade" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f3e9d9"/><stop offset="1" stopColor="#c9bba7"/></linearGradient><filter id="bag-drop" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="12"/></filter></defs>
    <ellipse cx="171" cy="396" rx="107" ry="12" fill="#130e0b" opacity=".18" filter="url(#bag-drop)"/>
    <motion.g key={label} initial={{opacity:0,y:20,rotate:-4}} animate={{opacity:1,y:0,rotate:-3}} transition={{duration:.75,ease}} style={{transformOrigin:'180px 220px'}}>
      <path d="M83 43l177-8 23 32 4 292-200 11-20-292Z" fill="url(#bag-shade)" stroke="#b2a18b" strokeWidth="2"/>
      <path d="M83 43L67 78l20 292 12-29-7-265Z" fill="#ab9a83"/>
      <path d="M83 43l177-8 23 32-191 10Z" fill="#f5ecdf"/>
      <path d="M100 94l167-9 3 248-168 9Z" fill={color}/>
      <path d="M115 111l137-7M116 317l136-8" stroke="#faf4eb" strokeOpacity=".6"/>
      <text x="185" y="159" fontFamily="Georgia,serif" fontSize="43" fill="#382e27" letterSpacing="-2.5" textAnchor="middle">morrow.</text>
      <path d="M172 192c5-13 9-21 14-21s10 8 15 21m-34 5c10-4 27-4 37 0" fill="none" stroke="#3b3027" strokeWidth="2" strokeLinecap="round"/>
      <text x="185" y="235" fontSize="8.5" letterSpacing="2.6" fontFamily="Arial,sans-serif" fill="#49382c" textAnchor="middle">SINGLE ORIGIN</text>
      <text x="185" y="271" fontFamily="Georgia,serif" fontSize={label.length>9?'21':'25'} fill="#392d26" textAnchor="middle">{label.toUpperCase()}</text>
      <text x="185" y="293" fontSize="9" letterSpacing="2" fontFamily="Arial,sans-serif" fill="#49382c" textAnchor="middle">{country.toUpperCase()}</text>
      <text x="185" y="328" fontSize="8.5" letterSpacing="2" fontFamily="Arial,sans-serif" fill="#392d26" textAnchor="middle">WHOLE BEAN  /  250G</text>
    </motion.g>
  </svg>;
}
