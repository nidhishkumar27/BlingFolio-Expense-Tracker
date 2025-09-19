import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="glass-panel max-w-xl w-full p-6">
            <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
            <p className="text-sm text-dark-300 mb-4">An unexpected error occurred in the UI. Please refresh. If the issue persists, share the error below.</p>
            <pre className="text-xs whitespace-pre-wrap bg-black/30 p-3 rounded border border-white/10 overflow-auto max-h-60">{String(this.state.error)}</pre>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}
