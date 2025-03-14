import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  BarChart3, 
  ChevronDown, 
  ChevronUp,
  Plus, 
  RefreshCw, 
  Eye, 
  Download, 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  AlertCircle,
  CalendarClock,
  ArrowUpDown,
  X,
  SlidersHorizontal
} from 'lucide-react';

const ViewInterviews = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState('all');
  const [selectedInterview, setSelectedInterview] = useState<number | null>(null);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  const handleRefresh = () => {
    setIsLoading(true);
  };

  const interviews = [
    {
      id: 1,
      candidateName: 'John Smith',
      position: 'Software Engineer',
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'completed',
      score: 85,
      duration: '45 min',
      interviewer: 'Alex Rodriguez',
      department: 'Engineering'
    },
    {
      id: 2,
      candidateName: 'Sarah Johnson',
      position: 'Product Manager',
      date: '2024-03-16',
      time: '2:30 PM',
      status: 'scheduled',
      score: null,
      duration: '60 min',
      interviewer: 'Maria Chen',
      department: 'Product'
    },
    {
      id: 3,
      candidateName: 'Michael Brown',
      position: 'UX Designer',
      date: '2024-03-14',
      time: '11:15 AM',
      status: 'analyzing',
      score: null,
      duration: '30 min',
      interviewer: 'David Kim',
      department: 'Design'
    },
    {
      id: 4,
      candidateName: 'Emily Davis',
      position: 'Marketing Specialist',
      date: '2024-03-18',
      time: '9:00 AM',
      status: 'scheduled',
      score: null,
      duration: '45 min',
      interviewer: 'Jessica Wong',
      department: 'Marketing'
    },
    {
      id: 5,
      candidateName: 'Robert Wilson',
      position: 'Data Scientist',
      date: '2024-03-12',
      time: '3:45 PM',
      status: 'completed',
      score: 92,
      duration: '60 min',
      interviewer: 'Alex Rodriguez',
      department: 'Data Science'
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
        return <CalendarClock className="h-3 w-3 mr-1" />;
      case 'analyzing':
        return <AlertCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  // Filter interviews based on search term and selected status
  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = 
      interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || interview.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sort interviews
  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.candidateName.localeCompare(b.candidateName)
        : b.candidateName.localeCompare(a.candidateName);
    } else if (sortBy === 'score') {
      const scoreA = a.score || 0;
      const scoreB = b.score || 0;
      return sortOrder === 'asc' ? scoreA - scoreB : scoreB - scoreA;
    }
    return 0;
  });

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="max-w-full">
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, position, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          
          <div className="flex-shrink-0">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-4 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="analyzing">Analyzing</option>
            </select>
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-sm"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="h-3.5 w-3.5 ml-2" /> : <ChevronDown className="h-3.5 w-3.5 ml-2" />}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="product">Product</option>
                  <option value="marketing">Marketing</option>
                  <option value="data">Data Science</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interviewer</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Interviewers</option>
                  <option value="alex">Alex Rodriguez</option>
                  <option value="maria">Maria Chen</option>
                  <option value="david">David Kim</option>
                  <option value="jessica">Jessica Wong</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors mr-2 text-sm">
                Reset
              </button>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interviews Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600">
          <div className="col-span-3 flex items-center">
            <button 
              onClick={() => toggleSort('name')}
              className="flex items-center hover:text-gray-900"
            >
              Candidate
              <ArrowUpDown className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="col-span-2 flex items-center">Position</div>
          <div className="col-span-2 flex items-center">
            <button 
              onClick={() => toggleSort('date')}
              className="flex items-center hover:text-gray-900"
            >
              Date & Time
              <ArrowUpDown className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="col-span-1 flex items-center justify-center">Status</div>
          <div className="col-span-1 flex items-center justify-center">
            <button 
              onClick={() => toggleSort('score')}
              className="flex items-center hover:text-gray-900"
            >
              Score
              <ArrowUpDown className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="col-span-2 flex items-center">Department</div>
          <div className="col-span-1 flex items-center justify-end">Actions</div>
        </div>

        {/* Table Body */}
        {sortedInterviews.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No interviews found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          sortedInterviews.map((interview) => (
            <div 
              key={interview.id} 
              className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-blue-50/30 transition-colors items-center text-sm"
            >
              <div className="col-span-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-500">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {interview.candidateName}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                {interview.position}
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                <div>
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {interview.date}
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {interview.time} ({interview.duration})
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex justify-center">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${getStatusColor(interview.status)}`}>
                  {getStatusIcon(interview.status)}
                  {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </span>
              </div>
              <div className="col-span-1 flex justify-center">
                {interview.score !== null ? (
                  <span className={`text-sm font-medium ${interview.score >= 80 ? 'text-green-600' : interview.score >= 60 ? 'text-orange-600' : 'text-red-600'}`}>
                    {interview.score}%
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">N/A</span>
                )}
              </div>
              <div className="col-span-2 text-sm text-gray-600">
                {interview.department}
              </div>
              <div className="col-span-1 flex justify-end gap-1">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="Edit">
                  <Edit className="h-4 w-4" />
                </button>
                <div className="relative group">
                  <button className="p-1 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="More Options">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block z-10">
                    <ul className="py-1">
                      <li>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                          <Download className="h-4 w-4 mr-2 text-gray-500" />
                          Export Report
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Interview
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-100">
          <div className="text-xs text-gray-600">
            Showing <span className="font-medium">{sortedInterviews.length}</span> of <span className="font-medium">{interviews.length}</span> interviews
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
              1
            </button>
            <button className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-2 py-1 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInterviews; 