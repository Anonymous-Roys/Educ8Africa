import React from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import AccessibleButton from './common/AccessibleButton';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
    
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You can also log the error to an error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const { darkMode = false } = this.props;
      
      return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className={`max-w-lg w-full text-center p-8 rounded-lg shadow-lg ${
            darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            {/* Error Icon */}
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
              darkMode ? 'bg-red-900/20' : 'bg-red-100'
            }`}>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            {/* Error Message */}
            <h1 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Oops! Something went wrong
            </h1>
            
            <p className={`text-base mb-6 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We're sorry for the inconvenience. The application encountered an unexpected error.
            </p>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={`text-left mb-6 p-4 rounded border ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}>
                <summary className={`cursor-pointer font-medium mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}>
                  Error Details (Development Only)
                </summary>
                <pre className={`text-xs overflow-auto ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <AccessibleButton
                onClick={this.handleRefresh}
                variant="primary"
                size="medium"
                className="flex items-center justify-center"
                ariaLabel="Refresh the page"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </AccessibleButton>
              
              <AccessibleButton
                onClick={this.handleGoHome}
                variant="secondary"
                size="medium"
                className="flex items-center justify-center"
                ariaLabel="Go to home page"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </AccessibleButton>
            </div>

            {/* Support Information */}
            <div className={`mt-8 p-4 rounded border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                If this problem persists, please contact our support team at{' '}
                <a 
                  href="mailto:support@educ8africa.com" 
                  className="text-red-600 hover:text-red-700 underline"
                >
                  support@educ8africa.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
