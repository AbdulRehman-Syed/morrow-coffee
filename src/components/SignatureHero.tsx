import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, RoundedBox } from '@react-three/drei';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, MoveUpRight } from 'lucide-react';
import * as THREE from 'three';
import { origins } from '../data';

const ease = [0.22, 1, 0.36, 1] as const;
const shades = ['#c9794c', '#d9c49b', '#8f9a7e'];

function makeLabel(name: string, country: string, accent: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512; canvas.height = 710;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#f0e7d8'; ctx.fillRect(0,0,512,710);
    ctx.strokeStyle = '#74634f'; ctx.lineWidth = 1.5; ctx.strokeRect(26,26,460,658);
    ctx.fillStyle = '#2b2b22'; ctx.font = '600 37px Georgia'; ctx.fillText('morrow.',56,88);
    ctx.font = '17px monospace'; ctx.fillText('ROASTED FOR THE RITUAL',56,127);
    ctx.fillStyle = accent; ctx.beginPath();ctx.arc(256,319,140,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle = '#f4e9d6'; ctx.lineWidth = 3;
    for (let i=0;i<8;i++) {ctx.beginPath();ctx.arc(256,319,22+i*16,Math.PI*.15,Math.PI*1.43);ctx.stroke();}
    ctx.fillStyle='#2b2b22';ctx.font='italic 62px Georgia';ctx.fillText(name,48,535);
    ctx.font='23px monospace';ctx.fillText(country.toUpperCase(),54,583);
    ctx.fillStyle = '#856e57'; ctx.fillRect(52,614,409,2);
    ctx.fillStyle = '#2b2b22';ctx.font='21px monospace';ctx.fillText('WHOLE BEAN   /   250g',54,658);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function FloatingBean({ index, reduced }: { index: number; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const base = useMemo(() => {
    const angle = index * 2.399963;
    const radius = 2.2 + (index%4)*.28;
    return [Math.cos(angle)*radius, Math.sin(angle*1.4)*1.5, -.45+Math.sin(angle)*1.1] as const;
  }, [index]);
  useFrame(({clock})=>{
    if(!ref.current || reduced)return;
    ref.current.rotation.y=clock.elapsedTime*.18+index;
    ref.current.rotation.z=clock.elapsedTime*.12+index;
    ref.current.position.y=base[1]+Math.sin(clock.elapsedTime*.58+index)*.14;
  });
  return <group ref={ref} position={[base[0],base[1],base[2]]} rotation={[.3,index,1]}>
    <mesh scale={[.18,.27,.125]} castShadow><sphereGeometry args={[1,16,12]}/><meshStandardMaterial color={index%3===0?'#68412e':'#976342'} roughness={.4}/></mesh>
    <mesh position={[0,0,.119]} scale={[.015,.21,.025]} rotation={[0,0,.17]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color="#4c2b23" roughness={.9}/></mesh>
  </group>;
}

function ProductStudy({ selected, reduced }: { selected: number; reduced: boolean }) {
  const origin=origins[selected];
  const label=useMemo(()=>makeLabel(origin.name,origin.country,shades[selected]),[origin.name,origin.country,selected]);
  useEffect(()=>()=>label.dispose(),[label]);
  const study=useRef<THREE.Group>(null);
  useFrame(({clock},delta)=>{
    if(!study.current) return;
    study.current.rotation.y=THREE.MathUtils.damp(study.current.rotation.y,selected===0?-.13:selected===1?.12:-.24,3.5,delta);
    study.current.position.y=reduced?0:Math.sin(clock.elapsedTime*.7)*.07;
  });
  return <>
    <color attach="background" args={['#1b221f']}/>
    <fog attach="fog" args={['#1b221f',8,18]}/>
    <ambientLight intensity={.75}/>
    <hemisphereLight args={['#ffe0ad','#1a221c',2.25]}/>
    <spotLight position={[-4,7,6]} angle={.6} intensity={78} penumbra={.8} color="#f7c490" castShadow/>
    <spotLight position={[4,3,-5]} angle={.7} intensity={110} penumbra={1} color="#a6cbb0"/>
    <pointLight position={[0,-1.4,5]} intensity={14} color="#ad5a36"/>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-2.47,0]}><circleGeometry args={[3.4,80]}/><meshBasicMaterial color="#806a50" transparent opacity={.13}/></mesh>
    <mesh position={[0,-2.42,0]} receiveShadow><cylinderGeometry args={[2.55,2.67,.22,80]}/><meshStandardMaterial color="#363e35" metalness={.26} roughness={.38}/></mesh>
    <mesh position={[0,-2.29,0]}><torusGeometry args={[2.51,.012,8,100]}/><meshBasicMaterial color="#d5aa71"/></mesh>
    <PresentationControls global polar={[-.21,.18]} azimuth={[-.37,.37]} snap={{mass:2,tension:90}} config={{mass:1.5,tension:170}}>
      <group ref={study} position={[0,0,0]}>
        <Float floatIntensity={reduced?0:.23} speed={reduced?0:1.5} rotationIntensity={.018}>
          <group position={[0,.2,0]} rotation={[.03,-.13,-.08]}>
            <RoundedBox args={[2.17,3.65,.68]} radius={.14} smoothness={5} castShadow receiveShadow>
              <meshPhysicalMaterial color="#d5b799" roughness={.67} metalness={.04} clearcoat={.14}/>
            </RoundedBox>
            <mesh position={[0,1.62,.38]}><boxGeometry args={[2.06,.26,.11]}/><meshStandardMaterial color="#aa8666" roughness={.8}/></mesh>
            <mesh position={[-.88,0,.355]}><boxGeometry args={[.045,3.35,.01]}/><meshStandardMaterial color="#b99478" roughness={.9}/></mesh>
            <mesh position={[.88,0,.355]}><boxGeometry args={[.045,3.35,.01]}/><meshStandardMaterial color="#b99478" roughness={.9}/></mesh>
            <mesh position={[0,0,.363]}><planeGeometry args={[1.88,3.05]}/><meshStandardMaterial map={label} roughness={.87} metalness={0}/></mesh>
            <mesh position={[0,-1.75,.12]}><boxGeometry args={[1.9,.11,.55]}/><meshStandardMaterial color="#ac8869" roughness={.85}/></mesh>
          </group>
        </Float>
      </group>
    </PresentationControls>
    {Array.from({length:14},(_,i)=><FloatingBean key={i} index={i} reduced={reduced}/>)}
  </>;
}

class SceneBoundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}> {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?this.props.fallback:this.props.children;}
}
function webGLAvailable(){
  try {const c=document.createElement('canvas');return Boolean(c.getContext('webgl2')||c.getContext('webgl'));}catch{return false;}
}
function FeatureModel({selected,reduced}:{selected:number;reduced:boolean}){
  const [available,setAvailable]=useState<boolean|null>(null);
  const [visible,setVisible]=useState(true);
  const modelHost=useRef<HTMLDivElement>(null);
  useEffect(()=>setAvailable(webGLAvailable()),[]);
  useEffect(()=>{
    const target=modelHost.current;if(!target)return;
    const observer=new IntersectionObserver(entries=>setVisible(entries[0]?.isIntersecting??true),{threshold:0});
    observer.observe(target);return()=>observer.disconnect();
  },[]);
  const fallback=<div className="signature-fallback" aria-label="Illustrated Morrow coffee package"><div className="signature-fallback-bag" style={{'--bag-accent':shades[selected]} as CSSProperties}><span>morrow.</span><i/><strong>{origins[selected].name}</strong><small>{origins[selected].country.toUpperCase()} · 250G</small></div></div>;
  return <div ref={modelHost} className="signature-model" aria-label="Interactive 3D Morrow coffee packaging. Drag to rotate.">
    {available ? <SceneBoundary fallback={fallback}><Suspense fallback={fallback}><Canvas camera={{position:[0,.35,8.2],fov:35,near:.1,far:40}} shadows={false} dpr={[1,1.5]} frameloop={reduced||!visible?'demand':'always'} gl={{powerPreference:'high-performance',antialias:true}}><ProductStudy selected={selected} reduced={reduced}/></Canvas></Suspense></SceneBoundary> : fallback}
  </div>;
}

export default function SignatureHero({selected,onSelect}:{selected:number;onSelect:(value:number)=>void}){
  const reduced=Boolean(useReducedMotion());
  const [seen,setSeen]=useState(false);
  useEffect(()=>{const id=window.setTimeout(()=>setSeen(true),400);return()=>window.clearTimeout(id)},[]);
  return <section id="top" className="signature-hero relative overflow-hidden">
    <div className="signature-noise" aria-hidden="true"/>
    <div className="signature-orbit signature-orbit-one" aria-hidden="true"/><div className="signature-orbit signature-orbit-two" aria-hidden="true"/>
    <div className="site-container signature-inner relative">
      <div className="signature-copy relative z-10">
        <motion.div className="signature-overline" initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,ease}}><span className="signature-dot"/> A DIFFERENT KIND OF DAILY RITUAL <span className="signature-line"/></motion.div>
        <motion.h1 initial={reduced?false:{opacity:0,y:42}} animate={{opacity:1,y:0}} transition={{duration:1.1,ease,delay:.08}}>Make time<br/>for <em>more.</em></motion.h1>
        <motion.p initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.8,ease,delay:.22}}>A beautiful interruption to the ordinary. Exceptional coffees, curious origins, and the art of slowing down.</motion.p>
        <motion.div className="signature-actions" initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7,ease,delay:.35}}>
          <a className="signature-cta" href="#collection">Explore the collection <ArrowUpRight size={18}/></a><a className="signature-text-link" href="#lab">Enter the brew studio <ArrowRight size={17}/></a>
        </motion.div>
        <div className="signature-edition"><span>01 / 03</span> A SLOWER WAY OF SEEING THE WORLD</div>
      </div>
      <div className="signature-object relative">
        <div className="signature-halo" aria-hidden="true"/>
        <FeatureModel selected={selected} reduced={reduced}/>
        <motion.div className="signature-side-note" initial={{opacity:0}} animate={{opacity:seen?1:0}} transition={{delay:.4,duration:.8}}><span className="signature-note-marker">✳</span><span>AN OBJECT OF<br/>EVERYDAY BEAUTY</span></motion.div>
        <div className="signature-object-caption"><span>THE DAILY COLLECTION</span><span>NO. 0{selected+1} — {origins[selected].country.toUpperCase()}</span></div>
      </div>
      <div className="signature-bottom">
        <a href="#collection" className="signature-scroll">SCROLL TO DISCOVER <ArrowDownRight size={17}/></a>
        <div className="signature-picks" aria-label="Choose featured coffee">
          {origins.map((coffee,i)=><button key={coffee.id} onClick={()=>onSelect(i)} className={`signature-pick ${selected===i?'is-active':''}`} aria-pressed={selected===i}><span>0{i+1}</span><span>{coffee.name}</span><span className="signature-pick-circle" style={{background:shades[i]}}/></button>)}
        </div>
        <div className="signature-view-note"><MoveUpRight size={14}/> DRAG TO EXPLORE IN 3D</div>
      </div>
    </div>
    <AnimatePresence mode="wait"><motion.div key={origins[selected].id} className="signature-accent-line" style={{background:shades[selected]}} initial={{scaleX:0}} animate={{scaleX:1}} exit={{scaleX:0}} transition={{duration:.7,ease}}/></AnimatePresence>
  </section>;
}
