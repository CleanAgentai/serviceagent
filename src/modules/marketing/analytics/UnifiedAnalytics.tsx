import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { ArrowUp, ArrowDown, Zap, TrendingUp, Users, Target } from 'lucide-react';
import { MarketingAnalytics, TimeSeriesData } from '@/types/marketingAnalytics';
import {
  generateMarketingInsights,
  predictBestSendTimes,
  analyzeChannelSynergy,
} from '@/services/ai/marketingAnalyticsAI';

interface UnifiedAnalyticsProps {
  data: MarketingAnalytics;
  dateRange: {
    start: Date;
    end: Date;
  };
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
}

const channelColors = {
  email: '#3B82F6',
  sms: '#10B981',
  social: '#8B5CF6',
  referral: '#F59E0B',
};

export const UnifiedAnalytics: React.FC<UnifiedAnalyticsProps> = ({
  data,
  dateRange,
  onDateRangeChange,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'reach' | 'engagement' | 'leads' | 'conversions'>('engagement');
  const [insights, setInsights] = useState(data.aiInsights);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    refreshInsights();
  }, [data]);

  const refreshInsights = async () => {
    setIsLoading(true);
    try {
      const newInsights = await generateMarketingInsights(data);
      const bestTimes = await predictBestSendTimes(data.channelPerformance);
      const synergies = await analyzeChannelSynergy(data);
      
      setInsights({
        summary: newInsights.summary,
        suggestions: newInsights.suggestions,
      });
    } catch (error) {
      console.error('Error refreshing insights:', error);
    }
    setIsLoading(false);
  };

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  const renderMetricCard = (
    title: string,
    value: number,
    previousValue: number,
    icon: React.ReactNode
  ) => {
    const percentageChange = ((value - previousValue) / previousValue) * 100;
    const isPositive = percentageChange > 0;

    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
              {icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {value.toLocaleString()}
                </h3>
                <span
                  className={`ml-2 flex items-center text-sm ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {Math.abs(percentageChange).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Marketing Analytics</h1>
        <div className="flex space-x-4">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value as any)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="reach">Reach</option>
            <option value="engagement">Engagement</option>
            <option value="leads">Leads</option>
            <option value="conversions">Conversions</option>
          </select>
          <button
            onClick={refreshInsights}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Refreshing...' : 'Refresh Insights'}
          </button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {renderMetricCard(
          'Total Reach',
          data.overview.totalReach.current,
          data.overview.totalReach.previous,
          <Users className="w-6 h-6 text-blue-600" />
        )}
        {renderMetricCard(
          'Engagement Rate',
          data.overview.totalEngagement.current,
          data.overview.totalEngagement.previous,
          <TrendingUp className="w-6 h-6 text-green-600" />
        )}
        {renderMetricCard(
          'Total Leads',
          data.overview.totalLeads.current,
          data.overview.totalLeads.previous,
          <Target className="w-6 h-6 text-purple-600" />
        )}
        {renderMetricCard(
          'Conversion Rate',
          data.overview.averageConversionRate.current,
          data.overview.averageConversionRate.previous,
          <Zap className="w-6 h-6 text-yellow-600" />
        )}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeSeriesData[selectedMetric]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [value.toLocaleString(), '']}
              />
              <Legend />
              {Object.entries(channelColors).map(([channel, color]) => (
                <Line
                  key={channel}
                  type="monotone"
                  dataKey={channel}
                  stroke={color}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Channel Performance</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.channelPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey={`${selectedMetric}.current`}
                name="Current Period"
                fill="#3B82F6"
              />
              <Bar
                dataKey={`${selectedMetric}.previous`}
                name="Previous Period"
                fill="#93C5FD"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            {insights.summary.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-600">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-4">
            {insights.suggestions.map((suggestion, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium text-gray-900">{suggestion.channel}</p>
                <p className="text-gray-600">{suggestion.suggestion}</p>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span className="mr-4">Confidence: {suggestion.confidence}%</span>
                  <span>Impact: {suggestion.potentialImpact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 