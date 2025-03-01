import React, { useState, useEffect } from 'react';
import { Card } from '../Card';
import { Sparkles, Loader2, AlertCircle, ChevronDown, ChevronUp, ThumbsUp, ThumbsDown } from 'lucide-react';
import { tokens } from '@/app/shared/styles/tokens';

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  priority?: 'low' | 'medium' | 'high';
  actionable?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface AIInsightsPanelProps {
  title?: string;
  data?: any;
  insights?: InsightItem[];
  loading?: boolean;
  error?: string;
  onGenerateInsights?: (data: any) => Promise<InsightItem[]>;
  onFeedback?: (insightId: string, isHelpful: boolean) => void;
  className?: string;
  maxHeight?: string | number;
  refreshInterval?: number; // in milliseconds
  collapsible?: boolean;
  initiallyCollapsed?: boolean;
  emptyMessage?: string;
}

/**
 * AIInsightsPanel component that displays AI-generated insights based on provided data
 */
export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  title = 'AI Insights',
  data,
  insights: propInsights,
  loading: propLoading = false,
  error: propError,
  onGenerateInsights,
  onFeedback,
  className = '',
  maxHeight = '400px',
  refreshInterval,
  collapsible = true,
  initiallyCollapsed = false,
  emptyMessage = 'No insights available at this time.'
}) => {
  const [insights, setInsights] = useState<InsightItem[]>(propInsights || []);
  const [loading, setLoading] = useState<boolean>(propLoading);
  const [error, setError] = useState<string | undefined>(propError);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initiallyCollapsed);

  // Fetch insights based on provided data
  useEffect(() => {
    if (propInsights) {
      setInsights(propInsights);
      return;
    }

    if (!data || !onGenerateInsights) return;

    const fetchInsights = async () => {
      setLoading(true);
      setError(undefined);
      
      try {
        const newInsights = await onGenerateInsights(data);
        setInsights(newInsights);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate insights');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();

    // Set up refresh interval if specified
    if (refreshInterval) {
      const intervalId = setInterval(fetchInsights, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [data, onGenerateInsights, propInsights, refreshInterval]);

  // Handle feedback
  const handleFeedback = (insightId: string, isHelpful: boolean) => {
    onFeedback?.(insightId, isHelpful);
  };

  // Get priority color
  const getPriorityColor = (priority?: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-50 border-red-100';
      case 'medium':
        return 'text-orange-500 bg-orange-50 border-orange-100';
      case 'low':
        return 'text-green-500 bg-green-50 border-green-100';
      default:
        return 'text-blue-500 bg-blue-50 border-blue-100';
    }
  };

  // Toggle collapsed state
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card
      className={`border border-blue-100 ${className}`}
      shadow="sm"
      headerClassName="bg-gradient-to-r from-blue-50 to-violet-50"
      contentClassName={`overflow-y-auto ${!isCollapsed ? `max-h-[${maxHeight}]` : ''}`}
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Sparkles
              className="h-5 w-5 text-blue-500 mr-2"
              style={{ color: tokens.colors.primary.blue }}
            />
            <span>{title}</span>
          </div>
          {collapsible && (
            <button
              onClick={toggleCollapsed}
              className="p-1 rounded-md hover:bg-blue-100 transition-colors"
              aria-label={isCollapsed ? 'Expand insights' : 'Collapse insights'}
            >
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4 text-blue-600" />
              ) : (
                <ChevronUp className="h-4 w-4 text-blue-600" />
              )}
            </button>
          )}
        </div>
      }
    >
      {!isCollapsed && (
        <div className="space-y-4">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <Loader2 className="h-8 w-8 animate-spin mb-3 text-blue-500" />
              <p>Generating insights...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex items-start rounded-md bg-red-50 p-4 text-red-800">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Unable to generate insights</h4>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && insights.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <Sparkles className="h-8 w-8 mb-3 text-gray-400" />
              <p>{emptyMessage}</p>
            </div>
          )}

          {/* Insights List */}
          {!loading && !error && insights.length > 0 && (
            <ul className="space-y-4">
              {insights.map((insight) => (
                <li
                  key={insight.id}
                  className="rounded-md border border-gray-200 p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between">
                    {/* Insight Content */}
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <h4 className="font-medium text-gray-900">{insight.title}</h4>
                        {insight.category && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {insight.category}
                          </span>
                        )}
                        {insight.priority && (
                          <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPriorityColor(insight.priority)}`}>
                            {insight.priority.charAt(0).toUpperCase() + insight.priority.slice(1)} Priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{insight.description}</p>
                      
                      {/* Action Button */}
                      {insight.actionable && insight.action && (
                        <div className="mt-2">
                          <button
                            onClick={insight.action.onClick}
                            className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          >
                            {insight.action.label}
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Feedback buttons */}
                    {onFeedback && (
                      <div className="flex items-start space-x-1 ml-2">
                        <button
                          onClick={() => handleFeedback(insight.id, true)}
                          className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-green-500 transition-colors"
                          aria-label="Mark as helpful"
                          title="This insight was helpful"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleFeedback(insight.id, false)}
                          className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Mark as not helpful"
                          title="This insight was not helpful"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
}; 