import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import Button from './Button';
import { useAgent } from '../../contexts/AgentContext';

interface Props {
  children: React.ReactNode;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export default class AgentErrorBoundary extends React.Component<Props, State> {
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
    console.error('Agent error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-red-100 bg-red-50 p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 text-red-400">
              <AlertCircle size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">
                Agent Operation Failed
              </h3>
              <div className="mt-1 text-sm text-red-700">
                {this.state.error?.message || 'An unexpected error occurred while executing the agent operation'}
              </div>
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto max-h-32">
                  <code className="text-red-800">
                    {this.state.error?.stack}
                  </code>
                </pre>
              )}
              <div className="mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={this.handleRetry}
                  className="inline-flex items-center space-x-1"
                >
                  <RefreshCw size={14} />
                  <span>Retry Operation</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 