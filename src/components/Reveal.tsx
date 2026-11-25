import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/** Short, one-time reveal that doesn't keep animating while scrolling. */
export default function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}) {
  const reduced=Boolean(useReducedMotion());
  return <motion.div className={className}
    initial={reduced?false:{opacity:0,y:21}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true,amount:0.12}}
    transition={{duration:reduced?0:.52,delay:reduced?0:delay,ease:[.2,.7,.2,1]}}
  >{children}</motion.div>;
}
