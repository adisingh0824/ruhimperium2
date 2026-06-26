import { StrictMode, Component, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';

// Error boundary to catch runtime crashes and show a useful message instead of blank page
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('App crashed:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#fff', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Ruh Imperium</h1>
          <p style={{ color: '#555', maxWidth: '400px' }}>
            Something went wrong loading the site. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1.5rem', padding: '0.75rem 2rem', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', fontSize: '0.8rem' }}
          >
            REFRESH
          </button>
          {import.meta.env.DEV && (
            <pre style={{ marginTop: '2rem', color: 'red', fontSize: '0.75rem', textAlign: 'left', maxWidth: '600px', overflow: 'auto' }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);