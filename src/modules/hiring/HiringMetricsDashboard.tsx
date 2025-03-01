import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { HiringMetrics } from '@/types/hiring';

interface HiringMetricsDashboardProps {
  metrics: HiringMetrics;
  dateRange: 'week' | 'month' | 'quarter' | 'year';
  onDateRangeChange: (range: 'week' | 'month' | 'quarter' | 'year') => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const HiringMetricsDashboard: React.FC<HiringMetricsDashboardProps> = ({
  metrics,
  dateRange,
  onDateRangeChange
}) => {
  const [selectedMetric, setSelectedMetric] = useState<'applications' | 'interviews' | 'offers'>('applications');

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  const renderMetricCard = (
    title: string,
    current: number,
    previous: number,
    prefix: string = ''
  ) => {
    const percentChange = getPercentageChange(current, previous);
    const isPositive = percentChange > 0;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900">
            {prefix}{current}
          </p>
          <p className={`ml-2 flex items-center text-sm ${
            isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            {Math.abs(percentChange).toFixed(1)}%
          </p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          vs previous {dateRange}
        </p>
      </div>
    );
  };

  const renderFunnelMetrics = () => {
    const funnelData = [
      {
        stage: 'Applications',
        count: metrics.funnel.applications,
        icon: <Users className="h-5 w-5" />
      },
      {
        stage: 'Screenings',
        count: metrics.funnel.screenings,
        icon: <Clock className="h-5 w-5" />
      },
      {
        stage: 'Interviews',
        count: metrics.funnel.interviews,
        icon: <Users className="h-5 w-5" />
      },
      {
        stage: 'Offers',
        count: metrics.funnel.offers,
        icon: <CheckCircle className="h-5 w-5" />
      },
      {
        stage: 'Rejections',
        count: metrics.funnel.rejections,
        icon: <XCircle className="h-5 w-5" />
      }
    ];

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Hiring Funnel</h3>
        <div className="space-y-4">
          {funnelData.map((stage, index) => {
            const percentage = (stage.count / metrics.funnel.applications) * 100;
            
            return (
              <div key={stage.stage} className="relative">
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    {stage.icon}
                    <span className="text-sm font-medium">{stage.stage}</span>
                  </div>
                  <div className="ml-auto text-sm text-gray-500">
                    {stage.count} ({percentage.toFixed(1)}%)
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeSeriesChart = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Performance Trends</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMetric('applications')}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedMetric === 'applications'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setSelectedMetric('interviews')}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedMetric === 'interviews'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Interviews
            </button>
            <button
              onClick={() => setSelectedMetric('offers')}
              className={`px-3 py-1 rounded-md text-sm ${
                selectedMetric === 'offers'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Offers
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics.timeSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#3B82F6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderQualityMetrics = () => {
    const data = [
      {
        name: 'High Quality',
        value: metrics.quality.highQuality
      },
      {
        name: 'Medium Quality',
        value: metrics.quality.mediumQuality
      },
      {
        name: 'Low Quality',
        value: metrics.quality.lowQuality
      }
    ];

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Application Quality</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderAIInsights = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Insights</h3>
        <div className="space-y-4">
          {metrics.aiInsights.map((insight, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
            >
              <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                {insight.recommendation && (
                  <p className="text-sm text-blue-700 mt-2">
                    Recommendation: {insight.recommendation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Hiring Metrics</h2>
        <div className="flex space-x-2">
          {(['week', 'month', 'quarter', 'year'] as const).map(range => (
            <button
              key={range}
              onClick={() => onDateRangeChange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                dateRange === range
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {renderMetricCard('Total Applications', metrics.overview.totalApplications, metrics.overview.previousTotalApplications)}
        {renderMetricCard('Average Time to Hire', metrics.overview.avgTimeToHire, metrics.overview.previousAvgTimeToHire, '')}
        {renderMetricCard('Offer Acceptance Rate', metrics.overview.offerAcceptanceRate, metrics.overview.previousOfferAcceptanceRate, '')}
        {renderMetricCard('Cost per Hire', metrics.overview.costPerHire, metrics.overview.previousCostPerHire, '$')}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderFunnelMetrics()}
        {renderTimeSeriesChart()}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderQualityMetrics()}
        {renderAIInsights()}
      </div>
    </div>
  );
};

export default HiringMetricsDashboard; 