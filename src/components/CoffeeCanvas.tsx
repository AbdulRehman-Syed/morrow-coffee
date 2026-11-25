import { useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';
import { useReducedMotion } from 'motion/react';

export type DrinkTone = 'latte'|'filter'|'espresso';

/** A lightweight, pointer-responsive 2D coffee illustration. Off-screen animation pauses. */
export default function CoffeeCanvas({tone,strength}:{tone:DrinkTone;strength:number}){
 const ref=useRef<HTMLCanvasElement>(null);
 const ripple=useRef({x:150,y:150,time:-99999});
 const drawRef=useRef<()=>void>(()=>{});
 const reduced=Boolean(useReducedMotion());
 useEffect(()=>{
  const canvas=ref.current,ctx=canvas?.getContext('2d');
  if(!canvas||!ctx)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=300*dpr;canvas.height=300*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  let frame=0,visible=false,last=0;
  const draw=(t:number)=>{
   ctx.clearRect(0,0,300,300);ctx.save();
   ctx.fillStyle='#24191424';ctx.beginPath();ctx.ellipse(155,165,134,126,0,0,Math.PI*2);ctx.fill();
   const porcelain=ctx.createRadialGradient(110,88,15,150,150,145);
   porcelain.addColorStop(0,'#ffffff');porcelain.addColorStop(.67,'#f3f2ef');porcelain.addColorStop(.93,'#d9d7d4');porcelain.addColorStop(1,'#b6b3b1');
   ctx.fillStyle=porcelain;ctx.beginPath();ctx.arc(150,150,137,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle='#d0cecb';ctx.lineWidth=2;ctx.beginPath();ctx.arc(150,150,124,0,Math.PI*2);ctx.stroke();
   ctx.fillStyle='#d6d2cc';ctx.beginPath();ctx.ellipse(254,160,31,40,.5,0,Math.PI*2);ctx.fill();
   ctx.fillStyle='#f8f7f3';ctx.beginPath();ctx.ellipse(254,160,18,27,.5,0,Math.PI*2);ctx.fill();
   ctx.fillStyle='#f7f6f2';ctx.beginPath();ctx.arc(150,150,110,0,Math.PI*2);ctx.fill();
   const coffee=ctx.createRadialGradient(112,96,11,155,155,110);
   if(tone==='latte'){coffee.addColorStop(0,'#dfc0a2');coffee.addColorStop(.67,'#9e6545');coffee.addColorStop(1,'#3b2118')}
   else if(tone==='filter'){coffee.addColorStop(0,'#503225');coffee.addColorStop(.61,'#291a16');coffee.addColorStop(1,'#090707')}
   else{coffee.addColorStop(0,'#e9aa59');coffee.addColorStop(.61,'#9c5424');coffee.addColorStop(1,'#3b2119')}
   ctx.fillStyle=coffee;ctx.beginPath();ctx.arc(150,150,98,0,Math.PI*2);ctx.fill();
   const drift=reduced?0:Math.sin(t*.0008)*1.8;
   if(tone==='latte'){
    ctx.save();ctx.translate(150,151+drift);ctx.rotate(-.3);
    ctx.fillStyle='#f6e4cd';ctx.beginPath();ctx.moveTo(0,45);ctx.bezierCurveTo(-71,-3,-38,-53,0,-24);ctx.bezierCurveTo(38,-53,71,-3,0,45);ctx.fill();
    ctx.strokeStyle='#aa7154';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,35);ctx.lineTo(0,-50);ctx.stroke();ctx.restore();
   }else if(tone==='espresso'){
    for(let i=0;i<39;i++){const a=i*2.399,r=15+Math.sqrt((i+1)/40)*77;ctx.fillStyle=i%3?'#edb16c55':'#ffe1a178';ctx.beginPath();ctx.arc(150+Math.cos(a)*r,150+Math.sin(a)*r,2+(i%4),0,Math.PI*2);ctx.fill()}
   }else{
    ctx.strokeStyle='#ab73485e';ctx.lineWidth=3;
    for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(150,150,50+k*16,k*.42+t*.00011,Math.PI*1.3+k*.2);ctx.stroke()}
   }
   ctx.fillStyle='rgba(28,13,8,'+(strength*.002).toFixed(3)+')';ctx.beginPath();ctx.arc(150,150,96,0,Math.PI*2);ctx.fill();
   const shine=ctx.createLinearGradient(92,83,211,226);shine.addColorStop(0,'#ffffff22');shine.addColorStop(.65,'#ffffff00');shine.addColorStop(1,'#ffffff0c');
   ctx.fillStyle=shine;ctx.beginPath();ctx.arc(150,150,95,0,Math.PI*2);ctx.fill();
   const elapsed=t-ripple.current.time;
   if(elapsed>=0&&elapsed<1100){ctx.strokeStyle='rgba(255,233,194,'+((1-elapsed/1100)*.66)+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(ripple.current.x,ripple.current.y,10+elapsed*.064,0,Math.PI*2);ctx.stroke();}
   ctx.restore();
  };
  const tick=(t:number)=>{if(!visible)return;if(t-last>33){draw(t);last=t;}frame=window.requestAnimationFrame(tick)};
  drawRef.current=()=>draw(performance.now());
  const obs=new IntersectionObserver(entries=>{
   const next=Boolean(entries[0]?.isIntersecting);
   if(next===visible)return;visible=next;window.cancelAnimationFrame(frame);
   if(next){draw(performance.now());if(!reduced)frame=window.requestAnimationFrame(tick)}
  },{threshold:.05});
  obs.observe(canvas);if(reduced)draw(0);
  return()=>{visible=false;window.cancelAnimationFrame(frame);obs.disconnect()};
 },[tone,strength,reduced]);
 const splash=(e:PointerEvent<HTMLCanvasElement>)=>{
  const b=e.currentTarget.getBoundingClientRect();const x=(e.clientX-b.left)*300/b.width,y=(e.clientY-b.top)*300/b.height;
  if(Math.hypot(x-150,y-150)>88)return;
  ripple.current={x,y,time:performance.now()};drawRef.current();
 };
 return <canvas width={300} height={300} ref={ref} className="m55-cup-canvas" aria-hidden="true" onPointerDown={splash}/>;
}
