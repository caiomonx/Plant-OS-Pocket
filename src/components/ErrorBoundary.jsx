import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-red-950 p-8 text-white overflow-auto">
          <h1 className="text-3xl font-bold text-red-500 mb-4">CRITICAL REACT ERROR</h1>
          <div className="bg-black p-6 rounded-xl border border-red-500/50 w-full max-w-4xl font-mono text-sm">
            <h2 className="text-xl text-red-400 mb-2">Error Message:</h2>
            <p className="text-red-200 mb-6 whitespace-pre-wrap">{this.state.error?.toString()}</p>
            
            <h2 className="text-xl text-red-400 mb-2">Component Stack:</h2>
            <pre className="text-red-200/70 whitespace-pre-wrap overflow-x-auto">
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
