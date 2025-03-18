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
  ChevronRight,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const navigate = useNavigate();

  const metrics = [
    {
      title: 'Candidates Hired',
      value: '12',
      change: '+20%',
      icon: UserCheck,
      description: 'Successfully hired candidates',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Candidates Applied',
      value: '45',
      change: '+15%',
      icon: UserPlus,
      description: 'Total applications received',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Qualified Candidates',
      value: '28',
      change: '+8%',
      icon: Users,
      description: 'Candidates meeting requirements',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Average Time to Hire',
      value: '14d',
      change: '-2d',
      icon: Clock,
      description: 'Average days to complete hire',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const quickActions = [
    {
      title: 'Create Interview',
      description: 'Set up a new interview session',
      icon: <Plus className="h-5 w-5 text-blue-600" />,
      action: () => navigate('/interviews/create'),
      color: 'bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200'
    },
    {
      title: 'View Interviews',
      description: 'Review past interview sessions',
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      action: () => navigate('/interviews'),
      color: 'bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200'
    },
    {
      title: 'View Responses',
      description: 'Review candidate responses',
      icon: <Users className="h-5 w-5 text-violet-600" />,
      action: () => navigate('/interviews/responses'),
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
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to ServiceAgent.AI</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`${metric.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                      <span className={metric.change.startsWith('+') ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Create Interview Card */}
            <Card 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => navigate('/interviews/create')}
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Plus className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Create Interview</h3>
                  <p className="text-sm text-gray-500">Set up a new interview session</p>
                </div>
              </div>
            </Card>

            {/* View Responses Card */}
            <Card 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => navigate('/interviews/responses')}
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium">View Responses</h3>
                  <p className="text-sm text-gray-500">Review candidate responses</p>
                </div>
              </div>
            </Card>
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
              onClick={() => navigate('/interviews')}
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
                onClick={() => navigate('/interviews/create')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 