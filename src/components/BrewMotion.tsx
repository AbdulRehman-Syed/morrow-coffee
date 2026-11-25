import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, Droplets } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

const duration=8000;
const stages=['Grinding','Blooming','Pouring','Ready to enjoy'] as const;

/** An intentionally visible, controllable pour animation—not a decorative placeholder. */
export default function BrewMotion(){
 const [elapsed,setElapsed]=useState(0),[playing,setPlaying]=useState(false);
 const [visible,setVisible]=useState(false);
 const host=useRef<HTMLDivElement>(null);
 const reduced=Boolean(useReducedMotion());
 useEffect(()=>{
   const element=host.current;if(!element)return;
   const observer=new IntersectionObserver(entries=>setVisible(Boolean(entries[0]?.isIntersecting)),{threshold:.05});
   observer.observe(element);return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
   if(!playing||!visible||reduced||elapsed>=duration)return;
   const id=window.setInterval(()=>setElapsed(v=>Math.min(duration,v+80)),80);
   return()=>window.clearInterval(id);
 },[playing,visible,reduced,elapsed>=duration]);
 useEffect(()=>{if(elapsed>=duration)setPlaying(false)},[elapsed]);
 const percent=Math.round(elapsed/duration*100);
 const stage=elapsed>=duration?3:elapsed<1800?0:elapsed<3700?1:2;
 const start=()=>{if(elapsed>=duration)setElapsed(0);if(reduced){setElapsed(duration);return}setPlaying(v=>!v)};
 const reset=()=>{setPlaying(false);setElapsed(0)};
 return <div ref={host} className="m56-brew" aria-label="Interactive coffee brewing animation">
  <div className="m56-brew-top"><span><Droplets size={17}/> THE BREW IN MOTION</span><strong>{stages[stage]}</strong></div>
  <div className={'m56-brew-stage '+(playing?'is-playing':'')+' stage-'+stage}>
    <div className="m56-illustration" aria-hidden="true">
      <div className="m56-kettle"><span className="m56-kettle-handle"/><span className="m56-kettle-spout"/></div>
      <div className="m56-stream"/>
      <div className="m56-dripper"><div className="m56-grounds"/><div className="m56-ripple r1"/><div className="m56-ripple r2"/></div>
      <div className="m56-beaker"><div className="m56-liquid"/></div>
      <div className="m56-steam s1"/><div className="m56-steam s2"/><div className="m56-steam s3"/>
      <div className="m56-drop d1"/><div className="m56-drop d2"/>
    </div>
    <div className="m56-brew-copy"><span>0{stage+1} / 04</span><h3>{stages[stage]}</h3><p>{stage===0?'Start with freshly ground coffee.':stage===1?'The grounds wake up and release their aroma.':stage===2?'Watch the water flow and the cup fill.':'A little patience makes a beautiful cup.'}</p></div>
  </div>
  <div className="m56-brew-bottom"><div className="m56-brew-progress" role="progressbar" aria-label="Brewing animation progress" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><div style={{width:percent+'%'}}/></div>
   <div className="m56-brew-actions"><button type="button" onClick={start} aria-label={reduced?'Show completed brewing illustration':playing?'Pause brewing animation':'Play brewing animation'}>{playing?<Pause size={16}/>:<Play size={16}/>} {reduced?'View complete':playing?'Pause':'Watch it brew'}</button><button type="button" onClick={reset}><RotateCcw size={15}/> Reset</button><span>{Math.round(elapsed/100)/10}s / 8s</span></div>
  </div>
 </div>;
}
