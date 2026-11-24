import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, PresentationControls } from '@react-three/drei';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowRight, Check, CircleHelp, Droplets, Pause, Play, RotateCcw, Save, SlidersHorizontal, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { BrewIllustration } from './Illustrations';

type Stage = 'grind' | 'bloom' | 'pour';
type BrewSettings = { dose: number; ratio: number; temperature: number; grind: number; water: number };
const chapters: { id: Stage; number: string; title: string; cue: string; description: string }[] = [
  { id: 'grind', number: '01', title: 'Find the texture.', cue: 'THE GRIND', description: 'The finer the grind, the slower the water passes through. Start in the middle and make it yours.' },
  { id: 'bloom', number: '02', title: 'Wake the coffee.', cue: 'THE BLOOM', description: 'Add twice the weight of coffee in water. Watch the grounds rise, release gas, and settle.' },
  { id: 'pour', number: '03', title: 'Follow the flow.', cue: 'THE POUR', description: 'Pour slowly in little circles. Steady hands, a little patience, and you are almost there.' },
];
const ease = [0.22, 1, 0.36, 1] as const;
const limit = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function V60({ water, stage }: { water: number; stage: Stage }) {
  const surface = Math.max(0.04, water / 100);
  return <group position={[0.15, -.10, 0]}>
    <mesh position={[0, -1.05, 0]} castShadow><cylinderGeometry args={[.64, .52, .92, 48]}/><meshPhysicalMaterial color="#f3d9b7" roughness={.35} clearcoat={.31} clearcoatRoughness={.24}/></mesh>
    <mesh position={[0,-.58,0]} rotation={[Math.PI / 2,0,0]}><torusGeometry args={[.64,.048,12,56]}/><meshStandardMaterial color="#e9bc92"/></mesh>
    <mesh position={[.67,-1.02,0]} rotation={[0,Math.PI/2,0]}><torusGeometry args={[.34,.095,12,48,Math.PI*1.6]}/><meshStandardMaterial color="#efcfab" roughness={.5}/></mesh>
    <mesh position={[0,-.62,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.575,48]}/><meshStandardMaterial color="#513124" roughness={.4}/></mesh>
    <mesh position={[0,-.615,0]} rotation={[-Math.PI/2,0,0]} scale={[surface, surface, 1]}><circleGeometry args={[.545,48]}/><meshStandardMaterial color="#9e5c3c" roughness={.28}/></mesh>
    <mesh position={[0,-1.62,0]}><cylinderGeometry args={[.84,.81,.055,56]}/><meshStandardMaterial color="#a66a4d" roughness={.7}/></mesh>
    <mesh position={[0,-.12,0]} castShadow><cylinderGeometry args={[.87,.20,1.07,64,1,true]}/><meshPhysicalMaterial color="#b67a5c" metalness={.07} roughness={.33} clearcoat={.35} side={THREE.DoubleSide}/></mesh>
    <mesh position={[0,.425,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.87,.051,12,72]}/><meshStandardMaterial color="#deac81" roughness={.53}/></mesh>
    <mesh position={[0,.375,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[.77,48]}/><meshStandardMaterial color={stage === 'grind' ? '#3c2119' : '#543126'} roughness={.96}/></mesh>
    <mesh position={[0,.389,0]} scale={[1,stage === 'bloom' ? .2 : .055,1]}><sphereGeometry args={[stage==='bloom'?.59:.43,32,16]}/><meshStandardMaterial color="#815035" roughness={.78}/></mesh>
    <mesh position={[0,-.8,0]}><cylinderGeometry args={[.22,.19,.18,32]}/><meshStandardMaterial color="#ae694d"/></mesh>
  </group>;
}
function Grinder({ grind, stage, reduce }: { grind: number; stage: Stage; reduce: boolean }) {
  const spindle = useRef<THREE.Group>(null);
  useFrame(({clock}) => {
    if (!reduce && spindle.current && stage === 'grind') spindle.current.rotation.y = clock.elapsedTime * (0.45 + grind / 110);
  });
  return <group position={[-2.08, -.22, -.1]}>
    <mesh position={[0,-.62,0]} castShadow><cylinderGeometry args={[.47,.49,1.50,48]}/><meshStandardMaterial color="#65432f" roughness={.85}/></mesh>
    <mesh position={[0,-1.31,0]}><cylinderGeometry args={[.49,.49,.15,48]}/><meshStandardMaterial color="#b58b5b" metalness={.52} roughness={.33}/></mesh>
    <mesh position={[0,.16,0]}><cylinderGeometry args={[.5,.5,.13,48]}/><meshStandardMaterial color="#ba9365" metalness={.42}/></mesh>
    <mesh position={[0,.52,0]}><cylinderGeometry args={[.38,.25,.63,40]}/><meshStandardMaterial color="#33241e" roughness={.7}/></mesh>
    <mesh position={[0,.82,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.38,.037,10,42]}/><meshStandardMaterial color="#bd915b" metalness={.65}/></mesh>
    <group ref={spindle} position={[0,1.02,0]}>
      <mesh position={[.41,0,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.04,.04,.82,14]}/><meshStandardMaterial color="#c3a074" metalness={.58} roughness={.32}/></mesh>
      <mesh position={[.83,.14,0]}><cylinderGeometry args={[.12,.12,.28,20]}/><meshStandardMaterial color="#705040" roughness={.88}/></mesh>
    </group>
    {Array.from({length:9},(_,i)=>{
      const a=i*2.399, r=.55+(i%3)*.10;
      return <mesh key={i} position={[Math.cos(a)*r,-1.63,Math.sin(a)*r]} rotation={[.15,a,.45]} scale={[.7,.43,.8]}><sphereGeometry args={[.12,12,8]}/><meshStandardMaterial color="#4c2b20" roughness={.95}/></mesh>;
    })}
  </group>;
}
function Kettle({ stage, water, reduce }: { stage: Stage; water: number; reduce: boolean }) {
  const kettle = useRef<THREE.Group>(null);
  const curve = useMemo(()=>new THREE.CatmullRomCurve3([
    new THREE.Vector3(-.65,.13,0),new THREE.Vector3(-.95,.16,.02),new THREE.Vector3(-1.13,.73,.03),new THREE.Vector3(-1.48,.71,.04)
  ]),[]);
  useFrame(({clock},dt)=>{
    if (!kettle.current) return;
    const target=stage==='pour' ? -.23 - water / 380 : stage==='bloom' ? -.08 : .02;
    kettle.current.rotation.z=THREE.MathUtils.damp(kettle.current.rotation.z,target,reduce?20:3.2,dt);
    kettle.current.position.y=.34+(reduce?0:Math.sin(clock.elapsedTime*.5)*.006);
  });
  return <group position={[2.15,.34,0]} ref={kettle}>
    <mesh scale={[1.08,.91,.95]} castShadow><sphereGeometry args={[.76,40,24]}/><meshStandardMaterial color="#b99b69" metalness={.63} roughness={.31}/></mesh>
    <mesh position={[0,.75,0]}><cylinderGeometry args={[.31,.43,.10,40]}/><meshStandardMaterial color="#493329" roughness={.64}/></mesh>
    <mesh position={[0,.87,0]}><sphereGeometry args={[.11,20,12]}/><meshStandardMaterial color="#614534"/></mesh>
    <mesh position={[.68,.31,0]} rotation={[0,0,-.5]}><torusGeometry args={[.62,.075,12,48,Math.PI*1.16]}/><meshStandardMaterial color="#342820" roughness={.65}/></mesh>
    <mesh><tubeGeometry args={[curve,38,.075,10,false]}/><meshStandardMaterial color="#bfa274" metalness={.57} roughness={.32}/></mesh>
  </group>;
}
/** A small GPU-driven water ribbon: wave displacement and refraction-like bands remain on the GPU. */
function WaterStream({ active, reduced }: { active: boolean; reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  useFrame(({clock})=>{
    if(material.current) material.current.uniforms.uTime.value=reduced?0:clock.elapsedTime;
  });
  if(!active) return null;
  return <mesh position={[.62,1.04,.05]} rotation={[0,0,-.43]}>
    <cylinderGeometry args={[.027,.047,.78,14,22]}/>
    <shaderMaterial ref={material} transparent depthWrite={false} side={THREE.DoubleSide}
      uniforms={{uTime:{value:0}}}
      vertexShader={`uniform float uTime; varying vec2 vUv; varying float vWave;
      void main(){vUv=uv;vec3 p=position;float wave=sin(p.y*13.0+uTime*6.0)*.009;
      p.x+=wave;p.z+=cos(p.y*12.0+uTime*5.0)*.009;vWave=wave;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`}
      fragmentShader={`uniform float uTime;varying vec2 vUv;varying float vWave;
      void main(){float shimmer=.68+.25*sin(vUv.y*38.0-uTime*8.0+vUv.x*12.0);
      vec3 color=mix(vec3(.68,.84,.82),vec3(.98,.94,.81),shimmer);
      float edge=pow(abs(vUv.x-.5)*2.0,2.0);
      gl_FragColor=vec4(color,.62+edge*.25);}`}
    />
  </mesh>;
}
function SteamFilaments({ active, reduced }: { active:boolean; reduced:boolean }) {
  const plumes = useMemo(()=>Array.from({length:5},(_,i)=>new THREE.CatmullRomCurve3([
    new THREE.Vector3((i-2)*.15,.02,0),
    new THREE.Vector3((i-2)*.14+.10,.25,.04),
    new THREE.Vector3((i-2)*.13-.08,.59,-.06),
    new THREE.Vector3((i-2)*.12+.17,.91,-.13)
  ])),[]);
  const group=useRef<THREE.Group>(null);
  useFrame(({clock})=>{
    if(group.current&&!reduced){group.current.rotation.z=Math.sin(clock.elapsedTime*.48)*.026;group.current.position.y=.62+Math.sin(clock.elapsedTime*.55)*.025;}
  });
  if(!active)return null;
  return <group ref={group} position={[.16,.62,0]}>
    {plumes.map((curve,i)=><mesh key={i}>
      <tubeGeometry args={[curve,34,.007+(i%3)*.002,5,false]}/>
      <meshBasicMaterial color="#fff3e0" transparent opacity={reduced?.16:.18+(i%3)*.025} depthWrite={false}/>
    </mesh>)}
  </group>;
}
function BloomRipples({ active, reduced }: { active:boolean; reduced:boolean }) {
  const group=useRef<THREE.Group>(null);
  useFrame(({clock})=>{if(!group.current)return;const size=reduced?1:1+(clock.elapsedTime*.22)%0.45;group.current.scale.set(size,1,size);});
  return active ? <group ref={group} position={[.15,.302,0]}>
    {[.19,.36,.55].map((r,i)=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[0,i*.002,0]}>
      <torusGeometry args={[r,.008,5,60]}/><meshBasicMaterial color="#dec296" transparent opacity={.33-i*.07} depthWrite={false}/>
    </mesh>)}
  </group> : null;
}
function Atmosphere({stage,water,reduce}:{stage:Stage;water:number;reduce:boolean}) {
  const group=useRef<THREE.Group>(null);
  const steam=useRef<THREE.Group>(null);
  useFrame(({clock})=>{
    if (group.current) group.current.rotation.y=reduce?0:Math.sin(clock.elapsedTime*.23)*.05;
    if (steam.current) steam.current.position.y=reduce?0:Math.sin(clock.elapsedTime*.6)*.045;
  });
  const active=stage!=='grind';
  return <group ref={group}>
    <WaterStream active={stage==='pour'&&water>0} reduced={reduce}/>
    <SteamFilaments active={active} reduced={reduce}/>
    <BloomRipples active={stage!=='grind'} reduced={reduce}/>
    {active&&<group ref={steam}>
      {[-.4,-.07,.29,.48].map((x,i)=><mesh key={i} position={[x,1.06+(i%2)*.19,-.12]} rotation={[0,0,(i%2?.13:-.11)]}>
        <torusGeometry args={[.21+(i%2)*.11,.012,5,28,Math.PI*.88]}/>
        <meshBasicMaterial color="#ffebd6" transparent opacity={reduce?.20:.28}/>
      </mesh>)}
    </group>}

  </group>;
}
function BrewModel({stage,grind,water,reduce}:{stage:Stage;grind:number;water:number;reduce:boolean}) {
  const objects=useRef<THREE.Group>(null);
  useFrame(({clock},dt)=>{
    if(objects.current){
      objects.current.rotation.y=THREE.MathUtils.damp(objects.current.rotation.y,stage==='grind' ? -.15 : stage==='bloom' ? .04 : .12,2.4,dt);
      objects.current.position.y=reduce?0:Math.sin(clock.elapsedTime*.45)*.004;
    }
  });
  return <>
    <ambientLight intensity={.85}/><hemisphereLight args={['#fff0dc','#6f8975',1.5]}/><directionalLight position={[-4,7,5]} intensity={2.7} color="#ffe7c7"/><pointLight position={[2,3,-2]} intensity={11} color="#eeb27c"/><pointLight position={[-3,2,3]} intensity={6} color="#f9edd8"/>
    <PresentationControls global polar={[-.16,.19]} azimuth={[-.35,.35]} config={{mass:1.7,tension:115,friction:30}} snap={{mass:2,tension:110,friction:35}}>
      <group ref={objects} scale={.94}>
        <mesh position={[0,-2.04,-.14]} receiveShadow><cylinderGeometry args={[3.9,3.9,.16,72]}/><meshStandardMaterial color="#c9a784" roughness={.86}/></mesh>
        <mesh position={[0,-1.93,-.14]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[3.88,.03,12,72]}/><meshStandardMaterial color="#937452" metalness={.2}/></mesh>
        <Grinder stage={stage} grind={grind} reduce={reduce}/><V60 stage={stage} water={water}/><Kettle stage={stage} water={water} reduce={reduce}/><Atmosphere stage={stage} water={water} reduce={reduce}/>
      </group>
    </PresentationControls>
    <ContactShadows position={[0,-2.14,0]} scale={9} opacity={.19} blur={2.4} far={5} resolution={256} color="#533726"/>
  </>;
}
/** Keep a failing WebGL context from taking down the whole website. */
class LabSceneBoundary extends Component<{children: ReactNode; fallback: ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?this.props.fallback:this.props.children;}
}
function canUseWebGL() {
  try { const canvas=document.createElement('canvas'); return Boolean(canvas.getContext('webgl2')||canvas.getContext('webgl')); } catch { return false; }
}
function ModelViewport({stage,grind,water}:{stage:Stage;grind:number;water:number}) {
  const reduce=Boolean(useReducedMotion());
  const host=useRef<HTMLDivElement>(null);
  const [visible,setVisible]=useState(false);
  const [webgl,setWebgl]=useState<boolean|null>(null);
  useEffect(()=>{
    setWebgl(canUseWebGL());
    const target=host.current;
    if(!target) return;
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'150px'});
    observer.observe(target);
    return ()=>observer.disconnect();
  },[]);
  return <div ref={host} className="lab-viewport" role="group" aria-label="Rotatable three-dimensional coffee grinder, ceramic dripper, server, and brass kettle">
    <div className="lab-orbit lab-orbit-one"/><div className="lab-orbit lab-orbit-two"/>
    <div className="absolute left-5 top-5 z-10 flex items-center gap-2 lab-stage-mark"><span className="inline-block w-1.5 h-1.5 bg-[#a66947] rounded-full"/> REAL-TIME OBJECT STUDY</div>
    {visible && webgl ? <LabSceneBoundary fallback={<div className="lab-fallback-art"><BrewIllustration step={stage==='grind'?0:stage==='bloom'?1:2}/><span className="lab-fallback-note">3D unavailable — using illustration</span></div>}>
      <Suspense fallback={<div className="lab-fallback">Preparing the coffee set…</div>}>
        <Canvas dpr={[1,1.35]} camera={{position:[0,1.2,10.7],fov:37,near:.1,far:60}} shadows={false} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}} frameloop={reduce?'demand':'always'}>
          <BrewModel stage={stage} grind={grind} water={water} reduce={reduce}/>
        </Canvas>
      </Suspense>
    </LabSceneBoundary> : <div className="lab-fallback-art"><BrewIllustration step={stage==='grind'?0:stage==='bloom'?1:2}/></div>}
    {webgl===false && <span className="lab-fallback-note">3D unavailable — showing illustrated mode</span>}
    <div className="lab-model-footer"><span>DRAG THE SCENE TO ROTATE</span><span>01 / HANDCRAFTED OBJECTS</span></div>
  </div>;
}
function ArrowSlider({value,onChange,min,max,step=1,label,suffix=''}:{value:number;onChange:(v:number)=>void;min:number;max:number;step?:number;label:string;suffix?:string}){
  return <div className="lab-slider-field"><div className="flex justify-between items-end gap-4"><label className="lab-control-label">{label}</label><span className="font-display text-[26px] leading-none tabular-nums">{value}<small className="text-[13px] ml-1 font-sans">{suffix}</small></span></div>
    <input aria-label={label} className="lab-range" type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))} style={{'--fill':`${(value-min)/(max-min)*100}%`} as CSSProperties}/>
    <div className="flex justify-between text-[10px] font-mono text-[#8d7966]"><span>{min}{suffix}</span><span>{max}{suffix}</span></div>
  </div>;
}
function PourSlider({value,onChange}:{value:number;onChange:(v:number)=>void}) {
  const [dragging,setDragging]=useState(false);
  const track=useRef<HTMLDivElement>(null);
  const update=(clientX:number)=>{ if(track.current){const rect=track.current.getBoundingClientRect();onChange(Math.round(limit((clientX-rect.left)/rect.width*100,0,100)));}};
  return <div className="pt-3"><div className="flex justify-between gap-4 items-center mb-5"><label htmlFor="lab-pour-range" className="lab-control-label">DRAG TO POUR</label><span className="font-display text-[30px]">{value}<small className="text-[12px] ml-1">%</small></span></div>
    <div ref={track} className="lab-pour-track" onPointerDown={e=>{setDragging(true);e.currentTarget.setPointerCapture(e.pointerId);update(e.clientX)}} onPointerMove={e=>{if(dragging)update(e.clientX)}} onPointerUp={()=>setDragging(false)} onPointerCancel={()=>setDragging(false)}>
      <div className="lab-pour-fill" style={{width:`${value}%`}}/><div className="lab-pour-handle" style={{left:`${value}%`}}><Droplets size={16}/></div>
    </div>
    <input id="lab-pour-range" aria-label="Water poured percentage" className="sr-only lab-pour-accessible" type="range" min="0" max="100" value={value} onChange={e=>onChange(Number(e.target.value))}/>
    <div className="mt-5 flex justify-between text-[10px] font-mono tracking-wide text-[#877664]"><span>START POUR</span><span>FINISH POUR</span></div>
  </div>;
}
function BrewClock() {
  const [seconds,setSeconds]=useState(0),[running,setRunning]=useState(false);
  useEffect(()=>{if(!running)return;const id=window.setInterval(()=>setSeconds(s=>Math.min(s+1,40)),1000);return()=>clearInterval(id)},[running]);
  useEffect(()=>{if(seconds>=40)setRunning(false)},[seconds]);
  const progress=seconds/40;
  return <div className="lab-clock flex items-center gap-5"><div className="relative w-[82px] h-[82px] shrink-0"><svg className="w-full h-full -rotate-90" viewBox="0 0 90 90" aria-hidden="true"><circle cx="45" cy="45" r="40" fill="none" stroke="#d4c2af" strokeWidth="3"/><circle cx="45" cy="45" r="40" fill="none" stroke="#a86c49" strokeWidth="3" strokeDasharray={2*Math.PI*40} strokeDashoffset={2*Math.PI*40*(1-progress)} strokeLinecap="round"/></svg><span className="absolute inset-0 flex items-center justify-center font-display text-[28px]">{seconds}<small className="text-[13px] ml-1">s</small></span></div><div className="flex-1"><div className="lab-control-label mb-2">BLOOM TIMER / 40 SEC</div><div className="flex gap-3 items-center"><button onClick={()=>setRunning(v=>!v)} className="lab-small-button" aria-label={running?'Pause bloom timer':'Start bloom timer'}>{running?<Pause size={15}/>:<Play size={15}/>} {running?'Pause':seconds===40?'Done':'Start'}</button><button onClick={()=>{setRunning(false);setSeconds(0)}} className="lab-icon-button" aria-label="Reset bloom timer"><RotateCcw size={16}/></button></div></div></div>;
}

export default function BrewLab(){
  const [stage,setStage]=useState<Stage>('grind');
  const [dose,setDose]=useState(20),[ratio,setRatio]=useState(16),[temperature,setTemperature]=useState(93),[grind,setGrind]=useState(55),[water,setWater]=useState(0);
  const [saved,setSaved]=useState(false);
  const stepIndex=chapters.findIndex(x=>x.id===stage);
  const bitterness=grind<35?'slightly longer extraction':'more balanced extraction';
  const hint=stage==='grind'?`A ${grind<35?'fine':grind>70?'coarse':'medium'} grind will make for ${bitterness}.` : stage==='bloom' ? `Begin with ${Math.round(dose*2)}ml of water for a 40-second bloom.` : `Target ${dose*ratio}ml total water. Move the handle slowly to finish the pour.`;
  const next=()=>setStage(chapters[(stepIndex+1)%chapters.length].id);
  const reset=()=>{setStage('grind');setDose(20);setRatio(16);setTemperature(93);setGrind(55);setWater(0);setSaved(false)};
  const save=()=>{
    const recipe:BrewSettings={dose,ratio,temperature,grind,water};
    try{localStorage.setItem('morrow:recipe',JSON.stringify(recipe));setSaved(true)}catch{setSaved(false)}
  };
  useEffect(()=>{
    try{const raw=localStorage.getItem('morrow:recipe');if(!raw)return;const parsed=JSON.parse(raw) as Partial<BrewSettings>;
      if(typeof parsed.dose==='number')setDose(limit(parsed.dose,12,32));
      if(typeof parsed.ratio==='number')setRatio(limit(parsed.ratio,14,18));
      if(typeof parsed.temperature==='number')setTemperature(limit(parsed.temperature,88,98));
      if(typeof parsed.grind==='number')setGrind(limit(parsed.grind,0,100));
      if(typeof parsed.water==='number')setWater(limit(parsed.water,0,100));
    }catch{/* local storage is optional */}
  },[]);
  return <section id="lab" className="lab-section relative py-24 lg:py-36 overflow-hidden">
    <div className="site-container relative z-10">
      <div className="lab-intro flex flex-col lg:flex-row justify-between lg:items-end gap-8 mb-12 lg:mb-16">
        <div><div className="eyebrow mb-7"><span className="eyebrow-line"/> MADE TO BE PLAYED WITH · EXPERIMENT NO. 01</div><h2 className="section-title max-w-[790px]">Step inside the<br/><em className="text-roast font-normal">brewing studio.</em></h2></div>
        <p className="text-[14px] leading-[1.9] max-w-[345px] text-[#786a5c]">A little science. A little intuition. This is your space to experiment with texture, water and time—without spilling a drop.</p>
      </div>
      <div className="lab-layout grid lg:grid-cols-[minmax(0,1.27fr)_minmax(360px,.73fr)] gap-5 lg:gap-7">
        <div className="min-w-0"><ModelViewport stage={stage} grind={grind} water={water}/><div className="lab-viewport-caption flex items-center justify-between gap-4 mt-4"><span><Sparkles size={13} className="inline mr-2"/> INTERACT WITH THE EQUIPMENT</span><span>DEVELOPED FOR THE UNHURRIED</span></div></div>
        <div className="lab-console min-w-0 flex flex-col">
          <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#d9caba]"><div className="lab-control-label">BREW STUDIO / INTERACTIVE</div><button onClick={reset} className="lab-reset" title="Reset brewing studio"><RotateCcw size={14}/> RESET</button></div>
          <div role="tablist" aria-label="Brew laboratory stages" className="grid grid-cols-3 gap-2 mt-6">
            {chapters.map(ch=><button key={ch.id} role="tab" aria-selected={stage===ch.id} onClick={()=>setStage(ch.id)} className={`lab-tab ${stage===ch.id?'is-active':''}`}><span>{ch.number}</span><span>{ch.cue}</span></button>)}
          </div>
          <AnimatePresence mode="wait" initial={false}><motion.div key={stage} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.42,ease}} className="flex-1 flex flex-col">
            <div className="mt-8 mb-7"><div className="lab-control-label text-[#a67353] mb-3">MOVEMENT {chapters[stepIndex].number} OF 03</div><h3 className="font-display text-[clamp(2.5rem,4vw,3.65rem)] tracking-[-.065em] leading-[1.05]">{chapters[stepIndex].title}</h3><p className="text-[13px] leading-[1.85] text-[#807368] mt-4 max-w-[450px]">{chapters[stepIndex].description}</p></div>
            <div className="space-y-7 pb-6">
              {stage==='grind'&&<><ArrowSlider label="GRIND TEXTURE" min={0} max={100} value={grind} onChange={v=>{setGrind(v);setSaved(false)}}/><div className="flex justify-between lab-range-marks"><span>FINE / ESPRESSO</span><span>MEDIUM / POUR-OVER</span><span>COARSE / PRESS</span></div><div className="grid grid-cols-2 gap-4"><ArrowSlider label="COFFEE DOSE" min={12} max={32} suffix="g" value={dose} onChange={v=>{setDose(v);setSaved(false)}}/><ArrowSlider label="BREW RATIO" min={14} max={18} value={ratio} onChange={v=>{setRatio(v);setSaved(false)}}/></div></>}
              {stage==='bloom'&&<><BrewClock/><ArrowSlider label="WATER TEMPERATURE" min={88} max={98} suffix="°C" value={temperature} onChange={v=>{setTemperature(v);setSaved(false)}}/><div className="lab-info-chip"><Droplets size={17}/> YOUR FIRST POUR: <strong>{dose*2} ML</strong></div></>}
              {stage==='pour'&&<><PourSlider value={water} onChange={v=>{setWater(v);setSaved(false)}}/><div className="grid grid-cols-2 gap-4"><div className="lab-mini-stat"><span>TOTAL WATER</span><strong>{dose*ratio} <small>ml</small></strong></div><div className="lab-mini-stat"><span>POUR PROGRESS</span><strong>{Math.round(dose*ratio*water/100)} <small>ml</small></strong></div></div></>}
            </div>
          </motion.div></AnimatePresence>
          <div className="mt-auto border-t border-[#d8c9ba] pt-5"><div className="lab-hint flex gap-3 items-start"><CircleHelp size={17} className="shrink-0 mt-[2px] text-[#a36c4d]"/><p>{hint}</p></div><div className="flex flex-wrap gap-3 justify-between items-center mt-6"><button className="lab-save" onClick={save}><Save size={15}/>{saved?'Saved in browser':'Save recipe'}{saved&&<Check size={14}/>}</button><button className="lab-next" onClick={next}>{stepIndex===2?'Start again':'Next movement'} {stepIndex===2?<RotateCcw size={16}/>:<ArrowRight size={16}/>}</button></div></div>
        </div>
      </div>
      <div className="lab-footer-row mt-14 flex flex-wrap items-center justify-between gap-5"><div className="flex gap-4 items-center"><span className="w-10 h-10 border border-[#c9b8a6] rounded-full flex items-center justify-center"><SlidersHorizontal size={17}/></span><div><div className="font-display text-[20px]">Your cup. Your rules.</div><div className="text-[11px] text-[#948272]">BREW NUMBERS ARE SUGGESTIONS, NOT RULES.</div></div></div><a href="/journal" className="link-arrow">Prefer a guided recipe? <ArrowDownRight size={17}/></a></div>
    </div>
  </section>;
}
