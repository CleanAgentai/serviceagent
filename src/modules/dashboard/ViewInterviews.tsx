import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  RefreshCw, 
  Link as LinkIcon,
  CalendarClock,
  ArrowUpDown,
  X,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

const ViewInterviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState('all');

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

  // Sample interview data
  const interviews = [
    {
      id: 1,
      interviewName: 'Software Engineer Position',
      interviewLink: 'https://interview.willo.ai/abc123',
      deadline: '2024-03-25',
      deadlineTime: '11:59 PM'
    },
    {
      id: 2,
      interviewName: 'Product Manager Interview',
      interviewLink: 'https://interview.willo.ai/def456',
      deadline: '2024-03-28',
      deadlineTime: '5:00 PM'
    },
    {
      id: 3,
      interviewName: 'UX Designer Assessment',
      interviewLink: 'https://interview.willo.ai/ghi789',
      deadline: '2024-03-22',
      deadlineTime: '3:30 PM'
    },
    {
      id: 4,
      interviewName: 'Marketing Specialist Interview',
      interviewLink: 'https://interview.willo.ai/jkl012',
      deadline: '2024-04-01',
      deadlineTime: '12:00 PM'
    },
    {
      id: 5,
      interviewName: 'Data Scientist Technical Interview',
      interviewLink: 'https://interview.willo.ai/mno345',
      deadline: '2024-03-30',
      deadlineTime: '6:00 PM'
    }
  ];

  // Filter interviews based on search term
  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = 
      interview.interviewName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Sort interviews
  const sortedInterviews = [...filteredInterviews].sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(`${a.deadline} ${a.deadlineTime}`).getTime();
      const dateB = new Date(`${b.deadline} ${b.deadlineTime}`).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.interviewName.localeCompare(b.interviewName)
        : b.interviewName.localeCompare(a.interviewName);
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">View Interviews</h1>
        <p className="text-gray-600">Manage your interview links and deadlines</p>
      </div>
      
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by interview name..."
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
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors text-sm"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {showFilters ? <ChevronUp className="h-3.5 w-3.5 ml-2" /> : <ChevronDown className="h-3.5 w-3.5 ml-2" />}
          </button>
          
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="date-desc">Deadline (Newest First)</option>
                  <option value="date-asc">Deadline (Oldest First)</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-600 uppercase tracking-wider">
          <div className="col-span-5">
            <button
              onClick={() => toggleSort('name')}
              className="flex items-center space-x-1"
            >
              <span>Interview Name</span>
              <ArrowUpDown className="h-3 w-3" />
            </button>
          </div>
          <div className="col-span-4">
            <span>Interview Link</span>
          </div>
          <div className="col-span-3">
            <button
              onClick={() => toggleSort('date')}
              className="flex items-center space-x-1"
            >
              <span>Deadline</span>
              <ArrowUpDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
              </div>
              <p className="mt-2 text-gray-600">Loading interviews...</p>
            </div>
          ) : sortedInterviews.length === 0 ? (
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
                className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-blue-50/30 transition-colors items-center text-sm"
              >
                <div className="col-span-5">
                  <h3 className="text-sm font-medium text-gray-900">
                    {interview.interviewName}
                  </h3>
                </div>
                <div className="col-span-4">
                  <a 
                    href={interview.interviewLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <LinkIcon className="h-3.5 w-3.5 mr-1" />
                    <span className="truncate">{interview.interviewLink}</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
                <div className="col-span-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {interview.deadline}
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3.5 w-3.5 mr-1 text-gray-400" />
                    {interview.deadlineTime}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

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
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewInterviews; 