import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { origins } from '../data';

const matches = [
 {label:'Bright & floral',hint:'I love something lively',id:'ethiopia'},
 {label:'Smooth & sweet',hint:'Give me a crowd-pleaser',id:'colombia'},
 {label:'Deep & cozy',hint:'Chocolate is my language',id:'guatemala'}
] as const;
export default function CoffeeFinder({onExplore}:{onExplore:(id:string)=>void}) {
 const [id,setId]=useState<(typeof matches)[number]['id']>('colombia');
 const coffee=origins.find(o=>o.id===id)!;
 return <section className="v52-finder" aria-label="Find your coffee">
   <div className="v52-finder-head"><span><Sparkles size={15}/> A LITTLE HELP CHOOSING?</span><h2>What's your coffee <em>mood?</em></h2></div>
   <div className="v52-finder-options" role="group" aria-label="Choose a flavor preference">{matches.map(match=><button type="button" key={match.id} className={id===match.id?'active':''} aria-pressed={id===match.id} onClick={()=>setId(match.id)}><strong>{match.label}</strong><small>{match.hint}</small></button>)}</div>
   <div className="v52-finder-result"><img alt={`${coffee.name} coffee and packaging`} src={`/images/${coffee.id==='ethiopia'?'daybreak':coffee.id==='colombia'?'golden-hour':'afterglow'}.webp`} loading="lazy"/><div><span>YOUR MATCH / {coffee.country.toUpperCase()}</span><h3>{coffee.name}</h3><p>{coffee.notes.join(' · ')}</p></div><button type="button" onClick={()=>onExplore(coffee.id)}>Meet your coffee <ArrowRight size={17}/></button></div>
 </section>;
}
