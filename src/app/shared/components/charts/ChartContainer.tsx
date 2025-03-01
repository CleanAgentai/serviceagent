import React, { ReactNode } from 'react';
import { ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

export interface ChartContainerProps {
  title?: string;
  subtitle?: string;
  loading?: boolean;
  error?: string;
  height?: number | string;
  width?: number | string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  legend?: ReactNode;
  noData?: boolean;
  noDataMessage?: string;
  tooltipComponent?: ReactNode;
}

/**
 * ChartContainer component for consistent chart styling and layout
 * Wraps recharts ResponsiveContainer
 */
export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  loading = false,
  error,
  height = 300,
  width = '100%',
  children,
  className = '',
  action,
  legend,
  noData = false,
  noDataMessage = 'No data available',
  tooltipComponent,
}) => {
  // Helper to render content based on loading/error/noData states
  const renderContent = () => {
    if (loading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 mb-2">
              <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">{error}</span>
          </div>
        </div>
      );
    }
    
    if (noData) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 mb-2">
              <svg className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">{noDataMessage}</span>
          </div>
        </div>
      );
    }
    
    return children as React.ReactElement;
  };

  const content = renderContent();

  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
      {/* Chart Header */}
      {(title || subtitle || action) && (
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div>
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      
      {/* Legend */}
      {legend && <div className="mb-4">{legend}</div>}
      
      {/* Chart */}
      <div className="relative" style={{ height }}>
        {(loading || error || noData) ? (
          content
        ) : (
          <ResponsiveContainer width={width} height="100%">
            {content}
          </ResponsiveContainer>
        )}
      </div>
      
      {/* Tooltip Component */}
      {tooltipComponent && (
        <div className="mt-4">
          {tooltipComponent}
        </div>
      )}
    </div>
  );
}; 