import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Plus, 
  ArrowRight, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Total Interviews',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: <Users className="h-5 w-5 text-blue-600" />,
      description: 'Interviews conducted'
    },
    {
      label: 'Completed',
      value: '18',
      change: '+8%',
      trend: 'up',
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
      description: 'Interviews completed'
    },
    {
      label: 'Pending Analysis',
      value: '3',
      change: '-2%',
      trend: 'down',
      icon: <Activity className="h-5 w-5 text-orange-600" />,
      description: 'Awaiting AI analysis'
    },
    {
      label: 'Success Rate',
      value: '78%',
      change: '+5%',
      trend: 'up',
      icon: <TrendingUp className="h-5 w-5 text-violet-600" />,
      description: 'Interview success rate'
    }
  ];

  const quickActions = [
    {
      title: 'Create Interview',
      description: 'Set up a new interview session',
      icon: <Plus className="h-5 w-5 text-blue-600" />,
      action: () => navigate('/dashboard/create-interview'),
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200'
    },
    {
      title: 'View Interviews',
      description: 'Review past interview sessions',
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      action: () => navigate('/dashboard/view-interviews'),
      color: 'bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200'
    },
    {
      title: 'AI Analysis',
      description: 'View AI-powered insights',
      icon: <BarChart3 className="h-5 w-5 text-violet-600" />,
      action: () => navigate('/dashboard/ai-analysis'),
      color: 'bg-gradient-to-br from-violet-50 to-violet-100 hover:from-violet-100 hover:to-violet-200'
    }
  ];

  const recentInterviews = [
    {
      candidateName: 'John Smith',
      position: 'Software Engineer',
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'completed',
      score: 85
    },
    {
      candidateName: 'Sarah Johnson',
      position: 'Product Manager',
      date: '2024-03-16',
      time: '2:30 PM',
      status: 'scheduled',
      score: null
    },
    {
      candidateName: 'Michael Brown',
      position: 'UX Designer',
      date: '2024-03-14',
      time: '11:15 AM',
      status: 'analyzing',
      score: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'analyzing':
        return 'bg-orange-50 text-orange-700 border border-orange-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-3 w-3 mr-1" />;
      case 'scheduled':
        return <Calendar className="h-3 w-3 mr-1" />;
      case 'analyzing':
        return <AlertCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-blue-100 mt-2">Welcome to ServiceAgent AI</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/create-interview')}
            className="inline-flex items-center px-5 py-2.5 bg-white text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Interview
          </button>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gray-50">{stat.icon}</div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-900">{stat.label}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-600 mt-1">Get started with these common tasks</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-6 text-left transition-all hover:shadow-inner ${action.color}`}
            >
              <div className="flex items-center mb-3">
                <div className="p-3 rounded-full bg-white shadow-sm">{action.icon}</div>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">{action.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                Get Started
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Interviews */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recent Interviews</h2>
            <p className="text-sm text-gray-600 mt-1">Your latest interview sessions</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/view-interviews')}
            className="text-sm text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {recentInterviews.map((interview, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3">
                    {interview.candidateName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{interview.candidateName}</h3>
                    <p className="text-xs text-gray-500">{interview.position}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col items-end mr-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {interview.date}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {interview.time}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center ${getStatusColor(interview.status)}`}>
                      {getStatusIcon(interview.status)}
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </span>
                    {interview.score !== null && (
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        interview.score >= 80 ? 'bg-green-50 text-green-700 border border-green-200' : 
                        interview.score >= 60 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 
                        'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {interview.score}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {recentInterviews.length === 0 && (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No interviews yet</h3>
            <p className="text-gray-600 mb-4">Schedule your first interview to get started</p>
            <button
              onClick={() => navigate('/dashboard/create-interview')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 