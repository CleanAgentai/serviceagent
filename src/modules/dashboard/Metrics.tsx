import React, { useState } from 'react';
import { 
  Filter, 
  RefreshCcw, 
  Users, 
  Clock, 
  Target, 
  DollarSign, 
  BarChart2, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Download,
  ChevronDown
} from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  iconColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon, iconColor }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${iconColor}`}>
        {icon}
      </div>
      <span className={`flex items-center text-sm font-medium ${
        trend === 'up' ? 'text-green-600' : 'text-red-600'
      }`}>
        {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
        {change}
      </span>
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

interface ChartCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, value, change, trend, children }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-gray-900 font-semibold mb-1">{title}</h3>
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gray-900 mr-3">{value}</span>
          <span className={`flex items-center text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {change}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Download className="h-5 w-5 text-gray-500" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Filter className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
    {children}
  </div>
);

export default function Metrics() {
  const [dateRange, setDateRange] = useState('7');
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your business performance metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <ChevronDown className="h-4 w-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <Calendar className="h-4 w-4 mr-2" />
              Custom Range
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Metric Type Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {['all', 'hiring', 'sales', 'marketing'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedMetric(type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedMetric === type
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Metrics
          </button>
        ))}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Applications"
          value="248"
          change="+12.0%"
          trend="up"
          icon={<Users className="h-6 w-6 text-blue-600" />}
          iconColor="bg-blue-50"
        />
        <MetricCard
          title="Time to Hire"
          value="18 days"
          change="+2.0%"
          trend="down"
          icon={<Clock className="h-6 w-6 text-red-600" />}
          iconColor="bg-red-50"
        />
        <MetricCard
          title="Conversion Rate"
          value="32.5%"
          change="+2.8%"
          trend="up"
          icon={<Target className="h-6 w-6 text-green-600" />}
          iconColor="bg-green-50"
        />
        <MetricCard
          title="Revenue"
          value="$85,000"
          change="+15.2%"
          trend="up"
          icon={<DollarSign className="h-6 w-6 text-purple-600" />}
          iconColor="bg-purple-50"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Hiring Performance"
          value="248 Applications"
          change="+12.0% vs last period"
          trend="up"
        >
          <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
            Chart Placeholder
          </div>
        </ChartCard>

        <ChartCard
          title="Sales Overview"
          value="$85,000"
          change="+15.2% vs last period"
          trend="up"
        >
          <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
            Chart Placeholder
          </div>
        </ChartCard>
      </div>

      {/* Detailed Metrics Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Detailed Metrics</h2>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { metric: 'Applications', current: '248', previous: '221', change: '+12.0%', trend: 'up' },
                { metric: 'Time to Hire', current: '18 days', previous: '15 days', change: '+20.0%', trend: 'down' },
                { metric: 'Revenue', current: '$85,000', previous: '$73,800', change: '+15.2%', trend: 'up' },
                { metric: 'Conversion Rate', current: '32.5%', previous: '31.6%', change: '+2.8%', trend: 'up' },
              ].map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.metric}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.current}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.previous}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.change}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center text-sm font-medium ${
                      item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {item.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 