import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const chapters = [
  { id:'collection', label:'THE COLLECTION', number:'01' },
  { id:'story', label:'STORY', number:'02' },
  { id:'cinematic', label:'IN MOTION', number:'03' },
  { id:'lab', label:'BREW STUDIO', number:'04' },
  { id:'ritual', label:'THE RITUAL', number:'05' },
  { id:'origins', label:'ORIGINS', number:'06' },
];
export default function ChapterNav() {
  const [current,setCurrent]=useState(-1);
  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){const index=chapters.findIndex(c=>c.id===entry.target.id);if(index>=0)setCurrent(index)}
      });
    },{rootMargin:'-25% 0px -40% 0px',threshold:0});
    chapters.forEach(({id})=>{const node=document.getElementById(id);if(node)observer.observe(node)});
    return ()=>observer.disconnect();
  },[]);
  return <nav className="chapter-rail" aria-label="Story chapters">
    <div className="chapter-rail-label">THE JOURNEY</div>
    {chapters.map((chapter,i)=><a key={chapter.id} href={`#${chapter.id}`} className={`chapter-rail-link ${current===i?'chapter-rail-active':''}`} aria-label={`Go to ${chapter.label.toLowerCase()}`} aria-current={current===i?'location':undefined}>
      <span className="chapter-rail-name">{chapter.label}</span><span className="chapter-rail-line">{current===i&&<motion.span layoutId="rail-indicator" className="chapter-rail-indicator" transition={{type:'spring',stiffness:180,damping:26}}/>}</span><span className="chapter-rail-number">{chapter.number}</span>
    </a>)}
  </nav>;
}
