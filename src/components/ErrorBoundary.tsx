import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { error: Error | null }

/** Prevent a library/runtime failure from producing only a blank white page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State { return { error }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Morrow encountered a rendering error:', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return <main style={{minHeight:'100vh',padding:'max(8vw,36px)',background:'#f5f0e8',color:'#3a2923',fontFamily:'Georgia,serif'}}>
      <div style={{maxWidth:680,margin:'8vh auto',lineHeight:1.7}}>
        <p style={{fontSize:13,letterSpacing:3}}>MORROW / DIAGNOSTICS</p>
        <h1 style={{fontSize:'clamp(32px,5vw,58px)',lineHeight:1.15}}>Something interrupted the brew.</h1>
        <p>Please copy the error below and send it to your developer (or ChatGPT). Check the browser console (F12) for more detail.</p>
        <pre style={{fontFamily:'monospace',whiteSpace:'pre-wrap',overflowWrap:'anywhere',background:'#e6d9c9',padding:20,borderRadius:12}}>{this.state.error.name}: {this.state.error.message}</pre>
        <button onClick={() => window.location.reload()} style={{background:'#3a2923',color:'#fff',border:'none',borderRadius:30,padding:'14px 24px',cursor:'pointer'}}>Reload the website</button>
      </div>
    </main>;
  }
}
