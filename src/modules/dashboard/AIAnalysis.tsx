import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  MessageSquare, 
  Code, 
  Sparkles, 
  ArrowRight, 
  X, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  ChevronDown, 
  ChevronUp, 
  Info,
  RefreshCw
} from 'lucide-react';

interface AnalysisDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    details: {
      scores?: {
        label: string;
        value: number;
        description: string;
      }[];
      insights?: string[];
      recommendations?: string[];
    };
  };
}

const AnalysisDetailModal: React.FC<AnalysisDetailModalProps> = ({ isOpen, onClose, analysis }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm" onClick={onClose} />

        <div className="inline-block w-full max-w-2xl p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b border-gray-100 ${analysis.color}`}>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/90 shadow-sm">
                {analysis.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{analysis.title}</h3>
                <p className="text-sm text-gray-600">{analysis.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-white/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="space-y-8">
              {analysis.details.scores && (
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4 flex items-center">
                    <span>Performance Scores</span>
                    <div className="ml-2 group relative">
                      <Info className="h-4 w-4 text-gray-400" />
                      <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded w-48">
                        Scores are calculated based on AI analysis of interview data
                      </div>
                    </div>
                  </h4>
                  <div className="space-y-5">
                    {analysis.details.scores.map((score, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{score.label}</span>
                          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{score.value}/10</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full mb-2">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600" 
                            style={{ width: `${score.value * 10}%` }}
                          />
                        </div>
                        <p className="text-sm text-gray-600">{score.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.details.insights && (
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Key Insights</h4>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    <ul className="divide-y divide-gray-100">
                      {analysis.details.insights.map((insight, index) => (
                        <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="min-w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                            </div>
                            <p className="text-sm text-gray-700">{insight}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {analysis.details.recommendations && (
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Recommendations</h4>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
                    <ul className="divide-y divide-gray-100">
                      {analysis.details.recommendations.map((recommendation, index) => (
                        <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="min-w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                            </div>
                            <p className="text-sm text-gray-700">{recommendation}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors mr-2"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AIAnalysis = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleRefresh = () => {
    setIsLoading(true);
  };

  const analysisCards = [
    {
      title: 'Interview Performance',
      description: 'AI-powered analysis of candidate responses and behavior',
      value: '8.2/10',
      trend: '+0.5',
      icon: <Brain className="h-5 w-5 text-blue-600" />,
      color: 'bg-blue-50',
      details: {
        scores: [
          {
            label: 'Response Quality',
            value: 8.5,
            description: 'Measures the clarity, relevance, and depth of candidate responses'
          },
          {
            label: 'Behavioral Indicators',
            value: 7.8,
            description: 'Analysis of non-verbal cues and communication patterns'
          },
          {
            label: 'Problem-Solving',
            value: 8.2,
            description: 'Evaluation of analytical and critical thinking skills'
          }
        ],
        insights: [
          'Strong ability to articulate complex ideas clearly',
          'Demonstrates active listening and thoughtful responses',
          'Shows consistent engagement throughout the interview'
        ],
        recommendations: [
          'Consider follow-up questions on project management experience',
          'Explore scenarios involving team conflict resolution',
          'Assess adaptability with more situational questions'
        ]
      }
    },
    {
      title: 'Communication Skills',
      description: 'Analysis of verbal and non-verbal communication',
      value: '8.3/10',
      trend: '+0.2',
      icon: <MessageSquare className="h-5 w-5 text-green-600" />,
      color: 'bg-green-50',
      details: {
        scores: [
          {
            label: 'Verbal Communication',
            value: 8.7,
            description: 'Clarity, articulation, and effectiveness of verbal expression'
          },
          {
            label: 'Non-verbal Communication',
            value: 7.9,
            description: 'Body language, facial expressions, and gestures'
          },
          {
            label: 'Active Listening',
            value: 8.4,
            description: 'Engagement and responsiveness during conversations'
          }
        ],
        insights: [
          'Excellent vocabulary and professional language use',
          'Maintains good eye contact and positive body language',
          'Effectively uses pauses for emphasis and clarity'
        ],
        recommendations: [
          'Practice more concise responses for technical questions',
          'Work on maintaining consistent energy levels',
          'Consider incorporating more examples in responses'
        ]
      }
    },
    {
      title: 'Technical Competency',
      description: 'Evaluation of technical skills and problem-solving ability',
      value: '8.6/10',
      trend: '+0.3',
      icon: <Code className="h-5 w-5 text-violet-600" />,
      color: 'bg-violet-50',
      details: {
        scores: [
          {
            label: 'Technical Knowledge',
            value: 8.9,
            description: 'Understanding of required technical concepts and tools'
          },
          {
            label: 'Problem-Solving',
            value: 8.6,
            description: 'Ability to analyze and solve technical challenges'
          },
          {
            label: 'Best Practices',
            value: 8.3,
            description: 'Adherence to coding standards and industry best practices'
          }
        ],
        insights: [
          'Strong foundation in core technical concepts',
          'Demonstrates systematic problem-solving approach',
          'Shows awareness of current industry trends'
        ],
        recommendations: [
          'Deep dive into system design experience',
          'Explore knowledge of testing methodologies',
          'Assess experience with specific tech stack requirements'
        ]
      }
    }
  ];

  // Filter cards based on search term
  const filteredCards = analysisCards.filter(card => 
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-white">
            <h1 className="text-2xl font-bold">AI Analysis Dashboard</h1>
            <p className="text-blue-100 mt-1">Gain data-driven insights from your interviews</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRefresh}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center transition-colors"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {filterOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </button>
          </div>
        </div>
        
        {/* Filter Panel */}
        {filterOpen && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search analyses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                </select>
                <Calendar className="absolute ml-3 mt-[-28px] h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white shadow-sm">
                  {card.icon}
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-lg font-bold text-gray-900">{card.value}</div>
                  <div className="text-xs font-medium text-green-600">
                    {card.trend}
                  </div>
                </div>
              </div>
              <h3 className="text-base font-medium text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-600 mt-1 mb-4">{card.description}</p>
              
              {/* Score Visualization */}
              <div className="mt-4 mb-6">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Score</span>
                  <span>10</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600" 
                    style={{ width: `${parseFloat(card.value) * 10}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedAnalysis(index)}
                className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center justify-center"
              >
                View Detailed Analysis
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* About Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-white shadow-sm">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">About AI Analysis</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Our AI-powered analysis provides deep insights into interview performance,
          helping you make data-driven hiring decisions. The system evaluates multiple
          aspects of each interview, including communication skills, technical competency,
          and overall candidate fit.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-medium text-gray-900">Advanced AI</h3>
            </div>
            <p className="text-xs text-gray-600">
              Powered by state-of-the-art machine learning models trained on thousands of interviews
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-green-600" />
              <h3 className="text-sm font-medium text-gray-900">Comprehensive Analysis</h3>
            </div>
            <p className="text-xs text-gray-600">
              Evaluates verbal, non-verbal, and technical aspects of candidate performance
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-violet-600" />
              <h3 className="text-sm font-medium text-gray-900">Actionable Insights</h3>
            </div>
            <p className="text-xs text-gray-600">
              Provides specific recommendations to improve your hiring process
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Detail Modal */}
      {selectedAnalysis !== null && (
        <AnalysisDetailModal
          isOpen={true}
          onClose={() => setSelectedAnalysis(null)}
          analysis={analysisCards[selectedAnalysis]}
        />
      )}
    </div>
  );
};

export default AIAnalysis; 