import type { SVGProps } from 'react';

export function MorrowMark({ className = '', ...props }: SVGProps<SVGSVGElement>) {
  return <svg className={className} viewBox="0 0 42 42" fill="none" aria-hidden="true" {...props}>
    <circle cx="21" cy="21" r="18" stroke="currentColor" strokeWidth="1.2" />
    <path d="M10 26c4-10 8-15 11-15s7 5 11 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <path d="M11 27c6-3 14-3 20 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="21" cy="20" r="2" fill="currentColor" />
  </svg>;
}

export function Sparkle({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 1c0 8-5 13-13 13 8 0 13 5 13 13 0-8 5-13 13-13-8 0-13-5-13-13Z" fill="currentColor" /></svg>;
}

export function Bean({ x = 0, y = 0, rotate = 0, scale = 1, fill = '#68432e' }: { x?: number; y?: number; rotate?: number; scale?: number; fill?: string }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
    <ellipse rx="12" ry="17" fill={fill} />
    <path d="M1-13C-8-7 7-3-2 4s2 10 2 10" fill="none" stroke="#e6b991" strokeWidth="1.6" strokeLinecap="round" opacity=".72" />
  </g>;
}
