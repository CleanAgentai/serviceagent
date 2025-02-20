import React from 'react';
import { AlertCircle } from 'lucide-react';
import Button from './Button';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to your error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({ errorInfo });
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 max-w-md">
            <div className="mb-4 text-red-500 flex justify-center">
              <AlertCircle size={48} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <pre className="text-left text-sm bg-gray-100 p-4 rounded-md mb-6 overflow-auto max-h-48">
                <code className="text-red-600">
                  {this.state.error?.stack}
                </code>
              </pre>
            )}
            <div className="space-x-4">
              <Button onClick={this.handleReset} variant="outline">
                Try Again
              </Button>
              <Button onClick={this.handleReload}>
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 