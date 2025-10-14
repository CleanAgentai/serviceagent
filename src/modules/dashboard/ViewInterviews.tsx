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
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface Interview {
  id: number | string;
  interviewName: string;
  interviewLink: string;
  deadline: string;
  deadlineTime: string;
}

const ViewInterviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState('all');
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [interviews, setInterviews] = useState<Interview[]>([]);

  // Load interviews from database
  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setIsLoading(true);
    
    try {
      // Try to get interviews from the database
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching interviews:', error);
        
        // Fallback to sample data if there's a database error
        setInterviews([
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
        ]);
      } else if (data && data.length > 0) {
        // Convert the database data to our interview format
        const formattedInterviews = data.map(item => ({
          id: item.id,
          interviewName: item.title,
          interviewLink: item.interview_link || `${window.location.origin}/interview/${item.id}`,
          deadline: item.deadline ? new Date(item.deadline).toISOString().split('T')[0] : 'No deadline',
          deadlineTime: item.deadline ? new Date(item.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
        }));
        
        setInterviews(formattedInterviews);
      } else {
        // No interviews found
        setInterviews([]);
      }
    } catch (e) {
      console.error('Error in fetchInterviews:', e);
      // Fallback to empty state
      setInterviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    fetchInterviews();
  };

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

  // Copy interview link to clipboard
  const copyLinkToClipboard = (link: string) => {
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopiedLink(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setCopiedLink(false), 2000);
      })
      .catch(() => toast.error('Failed to copy link'));
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
      <div className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
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
                  <button 
                    onClick={() => setSelectedLink(interview.interviewLink)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <LinkIcon className="h-3.5 w-3.5 mr-1" />
                    <span className="truncate">View Link</span>
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
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

      {/* Link Popup */}
      {selectedLink && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Interview Link</h3>
              <button 
                onClick={() => setSelectedLink(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center p-3 bg-gray-50 border rounded-md mb-4">
              <input 
                type="text" 
                value={selectedLink} 
                readOnly 
                className="flex-1 bg-transparent border-none focus:outline-none text-sm"
              />
              <button 
                onClick={() => copyLinkToClipboard(selectedLink)}
                className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors"
              >
                {copiedLink ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-600" />
                )}
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedLink(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Close
              </button>
              <a 
                href={selectedLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm inline-flex items-center"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-2" />
                Open Interview
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewInterviews; 