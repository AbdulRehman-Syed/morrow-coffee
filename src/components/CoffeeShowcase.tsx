import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CircleDot, MousePointer2, SlidersHorizontal } from 'lucide-react';
import { origins } from '../data';
import { CoffeeBag } from './Illustrations';

const ease=[.22,1,.36,1] as const;
const visualColors=[['#ca7149','#f1c09c','#4d3c32'],['#ac7f3a','#f1de9d','#604a37'],['#778c72','#c7c3a2','#434f43']];

/** 2D Canvas taste fingerprint: animated particles, flavor rings, and interactive pointer parallax. */
function FlavorField({selected}:{selected:number}){
  const ref=useRef<HTMLCanvasElement>(null);
  const reduced=Boolean(useReducedMotion());
  const pointer=useRef({x:0,y:0});
  const [inView,setInView]=useState(true);
  useEffect(()=>{
    const c=ref.current;if(!c)return;
    const obs=new IntersectionObserver(entries=>setInView(entries[0]?.isIntersecting??true),{threshold:.02});obs.observe(c);
    return()=>obs.disconnect();
  },[]);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext('2d');if(!ctx)return;
    let raf=0;let frame=0;
    let width=1,height=1;
    const dpr=Math.min(window.devicePixelRatio||1,2);
    const resize=()=>{
      const rect=canvas.getBoundingClientRect();
      width=Math.max(1,rect.width);height=Math.max(1,rect.height);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    };
    const observer=new ResizeObserver(resize);
    observer.observe(canvas);resize();
    const rgb=visualColors[selected];
    const scores=origins[selected].scores;
    const paint=()=>{
      ctx.setTransform(dpr,0,0,dpr,0,0);
      ctx.clearRect(0,0,width,height);
      ctx.fillStyle='#e9e0d2';ctx.fillRect(0,0,width,height);
      const centerX=width*.51+pointer.current.x*14;
      const centerY=height*.49+pointer.current.y*10;
      const radius=Math.min(width,height)*.305;
      const wash=ctx.createRadialGradient(centerX,centerY,18,centerX,centerY,radius*1.8);
      wash.addColorStop(0,rgb[1]+'a9');wash.addColorStop(.48,rgb[0]+'40');wash.addColorStop(1,'#e9e0d200');
      ctx.fillStyle=wash;ctx.fillRect(0,0,width,height);
      ctx.strokeStyle='#a4928047';ctx.lineWidth=1;
      for(let ring=1;ring<=5;ring++){
        ctx.beginPath();ctx.arc(centerX,centerY,radius*ring/5,0,Math.PI*2);ctx.stroke();
      }
      for(let i=0;i<5;i++){
        const a=-Math.PI/2+i*2*Math.PI/5;
        ctx.beginPath();ctx.moveTo(centerX,centerY);ctx.lineTo(centerX+Math.cos(a)*radius*1.13,centerY+Math.sin(a)*radius*1.13);ctx.stroke();
      }
      const t=reduced?0:frame*.008;
      const points=scores.map((value,i)=>{
        const a=-Math.PI/2+i*2*Math.PI/5;
        const r=radius*(value/5)*(1+(reduced?0:Math.sin(t+i)*.012));
        return {x:centerX+Math.cos(a)*r,y:centerY+Math.sin(a)*r};
      });
      ctx.beginPath();points.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));ctx.closePath();
      ctx.fillStyle=rgb[0]+'8c';ctx.fill();ctx.strokeStyle=rgb[2];ctx.lineWidth=2.2;ctx.stroke();
      points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,4.5,0,Math.PI*2);ctx.fillStyle=rgb[2];ctx.fill();ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fillStyle='#fff1df';ctx.fill();});
      for(let i=0;i<45;i++){
        const a=i*2.39996+t*(.04+i%4*.006),r=radius*(1.2+(i%8)*.11);
        const x=centerX+Math.cos(a)*r,y=centerY+Math.sin(a)*r*.78;
        ctx.beginPath();ctx.arc(x,y,1+(i%3)*.55,0,Math.PI*2);ctx.fillStyle=rgb[0]+(i%5===0?'aa':'65');ctx.fill();
      }
      ctx.fillStyle=rgb[2];ctx.font='11px monospace';ctx.textAlign='center';
      ['SWEET','BRIGHT','BODY','FLORAL','COCOA'].forEach((label,i)=>{
        const a=-Math.PI/2+i*2*Math.PI/5;
        ctx.fillText(label,centerX+Math.cos(a)*radius*1.28,centerY+Math.sin(a)*radius*1.25+4);
      });
      ctx.font='9px monospace';ctx.textAlign='left';ctx.fillText('MORROW / FLAVOR TOPOGRAPHY',23,height-24);
      ctx.textAlign='right';ctx.fillText(`0${selected+1} / 03`,width-23,height-24);
      frame++;
      if(!reduced)raf=requestAnimationFrame(paint);
    };
    if(inView)paint();
    return()=>{cancelAnimationFrame(raf);observer.disconnect()};
  },[selected,reduced,inView]);
  const onMove=(event:ReactPointerEvent<HTMLCanvasElement>)=>{
    const r=event.currentTarget.getBoundingClientRect();
    pointer.current={x:(event.clientX-r.left)/r.width-.5,y:(event.clientY-r.top)/r.height-.5};
  };
  return <canvas ref={ref} onPointerMove={onMove} onPointerLeave={()=>{pointer.current={x:0,y:0}}} className="coffee-flavor-canvas" role="img" aria-label={`Animated radar map of ${origins[selected].name} with sweetness, brightness, body, floral and cocoa attributes. See the notes beside the chart.`}/>;
}

export default function CoffeeShowcase({selected,onSelect,onAdd}:{selected:number;onSelect:(value:number)=>void;onAdd:(id:string)=>void}) {
  const reduced=Boolean(useReducedMotion());
  const origin=origins[selected];
  const prev=()=>onSelect((selected+2)%3),next=()=>onSelect((selected+1)%3);
  return <section id="collection" className="coffee-showcase-section">
    <div className="site-container">
      <div className="showcase-intro"><div><div className="showcase-kicker"><CircleDot size={14}/> A COLLECTION OF PLACES & FEELINGS</div><h2>Find your <em>kind of morning.</em></h2></div><p>Three singular origins. Three distinct moods. Meet the coffees that make every ordinary day a little less ordinary.</p></div>
      <div className="showcase-shell">
        <div className="showcase-display">
          <div className="showcase-canvas-head"><span>THE SENSORY ARCHIVE</span><span>INTERACTIVE CANVAS Nº 0{selected+1}</span></div>
          <FlavorField selected={selected}/>
          <div className="showcase-bag-small" aria-hidden="true"><CoffeeBag color={origin.accent} label={origin.name} country={origin.country}/></div>
          <div className="showcase-canvas-hint"><MousePointer2 size={14}/> MOVE YOUR CURSOR THROUGH THE FLAVOR FIELD</div>
        </div>
        <div className="showcase-details">
          <div className="showcase-detail-top"><span>THE COLLECTION / 0{selected+1} OF 03</span><div className="showcase-arrow-controls"><button onClick={prev} aria-label="Previous coffee"><ArrowLeft size={18}/></button><button onClick={next} aria-label="Next coffee"><ArrowRight size={18}/></button></div></div>
          <AnimatePresence mode="wait" initial={false}><motion.div key={origin.id} initial={reduced?false:{opacity:0,y:24}} animate={{opacity:1,y:0}} exit={reduced?undefined:{opacity:0,y:-16}} transition={{duration:reduced?0:.46,ease}} className="showcase-detail-body">
            <div className="showcase-origin-label"><span className="showcase-origin-dot" style={{background:visualColors[selected][0]}}/>{origin.country.toUpperCase()} / {origin.region.toUpperCase()}</div>
            <h3>{origin.name}<span>.</span></h3><p className="showcase-tagline">{origin.tagline}</p>
            <div className="showcase-tasting-notes">{origin.notes.map(note=><span key={note}>{note}</span>)}</div>
            <div className="showcase-meta"><div><small>PROCESS</small><strong>{origin.process}</strong></div><div><small>ELEVATION</small><strong>{origin.elevation}</strong></div><div><small>ROAST</small><strong>{origin.roast}</strong></div></div>
            <div className="showcase-purchase"><button onClick={()=>onAdd(origin.id)}>Add to your ritual — ${origin.price} <ArrowUpRight size={17}/></button><span>250G / WHOLE BEAN</span></div>
          </motion.div></AnimatePresence>
          <div className="showcase-selector"><div className="showcase-slider-title"><SlidersHorizontal size={15}/><label htmlFor="origin-carousel-slider">SLIDE TO DISCOVER AN ORIGIN</label><span>0{selected+1} / 03</span></div><input id="origin-carousel-slider" className="showcase-slider" type="range" min="0" max="2" step="1" value={selected} onChange={e=>onSelect(Number(e.target.value))} aria-valuetext={origin.name}/><div className="showcase-pips">{origins.map((coffee,i)=><button key={coffee.id} onClick={()=>onSelect(i)} aria-pressed={selected===i} className={selected===i?'selected':''}>{coffee.country}</button>)}</div></div>
        </div>
      </div>
      <div className="showcase-bottom"><span>DISCOVER YOUR CUP / NO TWO ORIGINS TASTE ALIKE</span><a href="#origins">Read the stories behind each origin <ArrowUpRight size={16}/></a></div>
    </div>
  </section>;
}
