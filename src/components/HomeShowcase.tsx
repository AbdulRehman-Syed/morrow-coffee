import { ArrowUpRight, Coffee, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

type Navigate=(path:string)=>void;
const scenes=[
 {name:'The morning ritual',desc:'A little pour. A little pause.',image:'/images/hero-ritual.webp',path:'/brew',eyebrow:'01 / THE BREW LAB'},
 {name:'Your new favorite',desc:'Three origins, endless curiosity.',image:'/images/collection.webp',path:'/coffee',eyebrow:'02 / THE COLLECTION'},
 {name:'Room to linger',desc:'Come for the coffee. Stay for the feeling.',image:'/images/cafe-bar.webp',path:'/cafe',eyebrow:'03 / THE CAFÉ'}
];
export default function HomeShowcase({navigate}:{navigate:Navigate}){
 return <section className="v54-showcase"><div className="v5-shell"><Reveal><div className="v54-showcase-heading"><div><span className="v54-kicker"><Sparkles size={15}/> THE MORROW EDIT</span><h2>A world of <em>good coffee.</em></h2></div><p>Follow the scent of coffee through little places worth discovering.</p></div></Reveal><div className="v54-showcase-grid">{scenes.map((scene,i)=><Reveal key={scene.path} delay={i*.075}><button type="button" className="v54-scene" onClick={()=>navigate(scene.path)}><div className="v54-scene-image"><img src={scene.image} alt={scene.name} loading="lazy"/><span className="v54-scene-arrow"><ArrowUpRight size={22}/></span></div><span className="v54-scene-label">{scene.eyebrow}</span><h3>{scene.name}</h3><p>{scene.desc}</p></button></Reveal>)}</div><Reveal><div className="v54-showcase-note"><Coffee size={22}/><span>ALWAYS ROOM FOR ONE MORE CUP.</span><span aria-hidden="true">✷ ✦ ✷</span></div></Reveal></div></section>;
}
