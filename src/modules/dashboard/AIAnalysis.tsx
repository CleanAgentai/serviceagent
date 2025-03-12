import React, { useState, useEffect } from 'react';
import { BrainCircuit, Search, Filter, Download, TrendingUp, TrendingDown } from 'lucide-react';

interface AIInsight {
  id: string;
  candidateName: string;
  position: string;
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  sentiment: number;
  timestamp: string;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ReactElement;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${trend ? (trend === 'up' ? 'bg-green-50' : 'bg-red-50') : 'bg-blue-50'}`}>
        {React.cloneElement(icon, {
          className: `h-6 w-6 ${trend ? (trend === 'up' ? 'text-green-600' : 'text-red-600') : 'text-blue-600'}`
        })}
      </div>
      {change && trend && (
        <span className={`flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {change}
        </span>
      )}
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default function AIAnalysis() {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    averageScore: 7.8,
    totalAnalyzed: 156,
    positiveRate: 75,
    keywordMatches: 82,
  });

  useEffect(() => {
    // Simulated API call to fetch AI insights
    const fetchInsights = async () => {
      try {
        // In a real implementation, this would be an API call to Willo
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockInsights: AIInsight[] = [
          {
            id: '1',
            candidateName: 'John Smith',
            position: 'Software Engineer',
            score: 8.5,
            strengths: ['Technical expertise', 'Problem-solving', 'Communication'],
            improvements: ['Leadership experience', 'Project management'],
            keywords: ['React', 'TypeScript', 'API development'],
            sentiment: 0.85,
            timestamp: new Date().toISOString()
          },
          // Add more mock insights...
        ];

        setInsights(mockInsights);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching insights:', error);
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = insight.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'all' || insight.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  return (
    <div className="h-full flex flex-col space-y-4 max-h-full overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Analysis</h1>
        <p className="text-sm text-gray-600">AI-powered insights from your interviews</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Average Score"
          value={metrics.averageScore.toFixed(1)}
          change="+0.3 pts"
          trend="up"
          icon={<BrainCircuit />}
        />
        <MetricCard
          title="Interviews Analyzed"
          value={metrics.totalAnalyzed}
          change="+12% vs last month"
          trend="up"
          icon={<Search />}
        />
        <MetricCard
          title="Positive Sentiment Rate"
          value={`${metrics.positiveRate}%`}
          change="-5% vs last month"
          trend="down"
          icon={<TrendingUp />}
        />
        <MetricCard
          title="Keyword Match Rate"
          value={`${metrics.keywordMatches}%`}
          change="+8% vs last month"
          trend="up"
          icon={<Filter />}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search candidates..."
              />
            </div>
          </div>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Positions</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Designer">Designer</option>
          </select>
          <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
            <Download className="h-5 w-5 mr-2" />
            Export
          </button>
        </div>

        {/* Insights List */}
        <div className="flex-1 overflow-auto">
          <div className="space-y-4">
            {filteredInsights.map(insight => (
              <div key={insight.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{insight.candidateName}</h3>
                    <p className="text-sm text-gray-500">{insight.position}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      insight.score >= 8 ? 'bg-green-100 text-green-800' :
                      insight.score >= 6 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Score: {insight.score.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Strengths</h4>
                    <ul className="space-y-1">
                      {insight.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Areas for Improvement</h4>
                    <ul className="space-y-1">
                      {insight.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Keywords Matched</h4>
                  <div className="flex flex-wrap gap-2">
                    {insight.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 