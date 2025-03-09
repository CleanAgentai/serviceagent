import React, { useState, useEffect } from 'react';
import { RefreshCcw, MessageSquare, Building2, Clock, TrendingUp, TrendingDown, Plus, Search, Filter, ChevronDown, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoChat from './hiring/VideoChat';
import { RiRefreshLine, RiMessage2Line, RiVideoAddLine, RiEditLine } from 'react-icons/ri';
import { FaBriefcase, FaUserPlus, FaCalendarCheck, FaUsers } from 'react-icons/fa';
import { BsArrowUpRight } from 'react-icons/bs';
import CandidateDetailModal from './hiring/CandidateDetailModal';
import { Candidate, CandidateStatus } from '@/types/hiring';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'active' | 'draft';
  applicants: any[];
  createdAt: string;
  description: string;
  requirements: string[];
  candidates: { name: string; experience: string; appliedDaysAgo: number }[];
  benefits: string[];
  compensation?: {
    salary: {
      min: number;
      max: number;
      currency: string;
      period: string;
    };
    benefits: Array<{
      id: string;
      name: string;
      description: string;
      category: string;
    }>;
    additionalPerks: string[];
  };
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactElement;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
        {React.cloneElement(icon, {
          className: `h-6 w-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`
        })}
      </div>
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
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const LineChart = () => (
  <svg className="w-full h-full" viewBox="0 0 100 40">
    <path
      d="M0 35 C20 32, 40 38, 60 15 S80 5, 100 20"
      fill="none"
      stroke="#3B82F6"
      strokeWidth="2"
    />
  </svg>
);

const BarChart = () => (
  <div className="flex items-end justify-between h-full w-full">
    {[0.4, 0.6, 0.3, 0.7, 0.5, 0.8, 0.6].map((height, i) => (
      <div
        key={i}
        className="w-1.5 bg-green-500 rounded-t"
        style={{ height: `${height * 100}%` }}
      />
    ))}
  </div>
);

export default function Hiring() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    openPositions: 12,
    activeApplications: 87,
    interviewsScheduled: 15,
    hiringRate: 68,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    compensation: {
      salary: {
        min: 0,
        max: 0,
        currency: 'USD',
        period: 'YEARLY'
      },
      benefits: [],
      additionalPerks: []
    }
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompensationChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        [field]: value
      }
    }));
  };

  const handleSalaryChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        salary: {
          ...prev.compensation.salary,
          [field]: value
        }
      }
    }));
  };

  const handleAddBenefit = () => {
    const newBenefit = {
      id: Date.now().toString(),
      name: '',
      description: '',
      category: 'OTHER' as const
    };
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        benefits: [...prev.compensation.benefits, newBenefit]
      }
    }));
  };

  const handleBenefitChange = (id: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        benefits: prev.compensation.benefits.map(benefit =>
          benefit.id === id ? { ...benefit, [field]: value } : benefit
        )
      }
    }));
  };

  const handleRemoveBenefit = (id: string) => {
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        benefits: prev.compensation.benefits.filter(benefit => benefit.id !== id)
      }
    }));
  };

  const handleAddPerk = () => {
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        additionalPerks: [...(prev.compensation.additionalPerks || []), '']
      }
    }));
  };

  const handlePerkChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        additionalPerks: prev.compensation.additionalPerks?.map((perk, i) =>
          i === index ? value : perk
        ) || []
      }
    }));
  };

  const handleRemovePerk = (index: number) => {
    setFormData(prev => ({
      ...prev,
      compensation: {
        ...prev.compensation,
        additionalPerks: prev.compensation.additionalPerks?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add new job to the list
    const newJob: Job = {
      id: Date.now(),
      ...formData,
      status: 'draft',
      applicants: [],
      createdAt: new Date().toISOString(),
      requirements: [],
      candidates: [],
      benefits: [],
      compensation: {
        salary: {
          min: 0,
          max: 0,
          currency: 'USD',
          period: 'YEARLY'
        },
        benefits: [],
        additionalPerks: []
      }
    };
    setJobs(prev => [newJob, ...prev]);
    
    // Reset form and close modal
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      description: '',
      compensation: {
        salary: {
          min: 0,
          max: 0,
          currency: 'USD',
          period: 'YEARLY'
        },
        benefits: [],
        additionalPerks: []
      }
    });
    setShowNewJobModal(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Reset filters and reload data
      setSelectedDepartment('all');
      setSearchTerm('');
      setActiveFilters(0);
      setJobs([]);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCandidates = async () => {
      if (!isMounted) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulated API call with initial data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        const initialCandidates: Candidate[] = [
          {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@example.com',
            location: 'New York, NY',
            resumeUrl: '/resumes/john-smith.pdf',
            appliedFor: 'Senior Cleaning Manager',
            currentStatus: 'INTERVIEWED' as CandidateStatus,
            interviews: [],
            aiScore: 8.5,
            tags: ['experienced', 'management'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            notes: [{
              id: '1',
              author: 'AI',
              content: 'Excellent communication skills, great experience in team management.',
              timestamp: new Date().toISOString()
            }]
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            location: 'Los Angeles, CA',
            resumeUrl: '/resumes/sarah-johnson.pdf',
            appliedFor: 'Cleaning Specialist',
            currentStatus: 'SCREENING' as CandidateStatus,
            interviews: [],
            aiScore: 7.8,
            tags: ['detail-oriented', 'hospitality'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            notes: [{
              id: '2',
              author: 'AI',
              content: 'Strong attention to detail, previous experience in hospitality.',
              timestamp: new Date(Date.now() - 86400000).toISOString()
            }]
          }
        ];

        if (isMounted) {
          setCandidates(initialCandidates);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        if (isMounted) {
          setError('Failed to fetch candidates');
          setCandidates([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchCandidates();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleTalkToAgent = () => {
    navigate('/dashboard/chat?context=hiring');
  };

  const handleStartVideoInterview = (candidateName: string, jobTitle: string) => {
    if (selectedCandidate) {
      setIsVideoChatOpen(true);
    }
  };

  const handlePostNewJob = () => {
    setShowNewJobModal(true);
  };

  const handleEditJob = (job: Job) => {
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      compensation: {
        salary: {
          min: 0,
          max: 0,
          currency: 'USD',
          period: 'YEARLY'
        },
        benefits: [],
        additionalPerks: []
      }
    });
    setShowNewJobModal(true);
  };

  return (
    <div className="max-w-[100vw] overflow-hidden">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
        <h1 className="text-2xl font-bold text-gray-900">Hiring Dashboard</h1>
              <p className="text-gray-600">Manage job postings and track candidates</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className={`flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button 
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                onClick={handleTalkToAgent}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Talk to Hiring Agent
        </button>
      </div>
          </div>
      </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Open Positions"
            value="8"
            change="+3 this month"
            trend="up"
            icon={<Building2 size={24} />}
          />
          <MetricCard
            title="Time to Hire"
            value="18 days"
            change="-5 days vs last month"
            trend="up"
            icon={<Clock size={24} />}
          />
          <MetricCard
            title="Offer Accept Rate"
            value="85%"
            change="-2% vs last month"
            trend="down"
            icon={<TrendingUp size={24} />}
          />
          </div>

        {/* Job Postings Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Job Postings</h2>
                <p className="text-sm text-gray-600">Manage and create job listings</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Departments</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="management">Management</option>
                    <option value="sales">Sales</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
                <button 
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  onClick={handlePostNewJob}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">
                          No job postings found
                        </td>
                      </tr>
                    ) : (
                      jobs
                        .filter(job => selectedDepartment === 'all' ? true : job.department === selectedDepartment)
                        .map((job) => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 text-sm text-gray-900">{job.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{job.location}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{job.type}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">Not specified</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                job.status === 'active' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {job.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">{job.applicants.length}</td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Candidates Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Candidates</h2>
                <p className="text-sm text-gray-600">Track and manage job applicants</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Filters */}
                <select
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {/* Handle role filter */}}
                >
                  <option value="">All Roles</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="management">Management</option>
                  <option value="sales">Sales</option>
                </select>
                <select
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {/* Handle location filter */}}
                >
                  <option value="">All Locations</option>
                  <option value="nyc">New York</option>
                  <option value="la">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                </select>
                <select
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {/* Handle date filter */}}
                >
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                {/* Sort */}
                <select
                  className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {/* Handle sort */}}
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="relevant">Most Relevant</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Information</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Loading candidates...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-red-500">
                      {error}
                    </td>
                  </tr>
                ) : !candidates || candidates.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No candidates found
                    </td>
                  </tr>
                ) : (
                  candidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="group hover:bg-gray-50 cursor-pointer relative"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{candidate.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(candidate.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          candidate.currentStatus === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                          candidate.currentStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          candidate.currentStatus === 'OFFERED' ? 'bg-purple-100 text-purple-800' :
                          candidate.currentStatus === 'INTERVIEWED' ? 'bg-blue-100 text-blue-800' :
                          candidate.currentStatus === 'SCREENING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {candidate.currentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {candidate.aiScore}/10
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidate(candidate);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View Details
                        </button>
                      </td>
                      {/* Hover Popover */}
                      <div className="hidden group-hover:block absolute left-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs font-medium text-gray-500">Applied Job:</span>
                            <span className="text-sm text-gray-900 ml-2">{candidate.appliedFor}</span>
                          </div>
                          <div>
                            <span className="text-xs font-medium text-gray-500">Last Activity:</span>
                            <span className="text-sm text-gray-900 ml-2">
                              {new Date(candidate.updatedAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                          {candidate.notes && candidate.notes.length > 0 && (
                            <div>
                              <span className="text-xs font-medium text-gray-500">Latest Note:</span>
                              <p className="text-sm text-gray-900 mt-1">
                                {candidate.notes[0].content}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[600px] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create New Job Posting</h2>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNewJobModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter job title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select department</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="management">Management</option>
                      <option value="sales">Sales</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter location"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Employment Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  {/* Compensation Section */}
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Compensation</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Salary Range</label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              type="number"
                              value={formData.compensation.salary.min}
                              onChange={(e) => handleSalaryChange('min', parseInt(e.target.value))}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Min"
                            />
                          </div>
                          <div>
                            <input
                              type="number"
                              value={formData.compensation.salary.max}
                              onChange={(e) => handleSalaryChange('max', parseInt(e.target.value))}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Max"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Pay Period</label>
                        <select
                          value={formData.compensation.salary.period}
                          onChange={(e) => handleSalaryChange('period', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="HOURLY">Per Hour</option>
                          <option value="MONTHLY">Per Month</option>
                          <option value="YEARLY">Per Year</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Benefits Section */}
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Benefits</h3>
                    <div className="space-y-4">
                      {formData.compensation.benefits.map((benefit) => (
                        <div key={benefit.id} className="grid grid-cols-3 gap-4">
                          <div>
                            <input
                              type="text"
                              value={benefit.name}
                              onChange={(e) => handleBenefitChange(benefit.id, 'name', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Benefit Name"
                            />
                          </div>
                          <div>
                            <select
                              value={benefit.category}
                              onChange={(e) => handleBenefitChange(benefit.id, 'category', e.target.value)}
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="HEALTH">Health</option>
                              <option value="FINANCIAL">Financial</option>
                              <option value="LIFESTYLE">Lifestyle</option>
                              <option value="OTHER">Other</option>
                            </select>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={benefit.description}
                              onChange={(e) => handleBenefitChange(benefit.id, 'description', e.target.value)}
                              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Description"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveBenefit(benefit.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddBenefit}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Benefit
                      </button>
                    </div>
                  </div>

                  {/* Additional Perks Section */}
                  <div className="col-span-2">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Perks</h3>
                    <div className="space-y-4">
                      {formData.compensation.additionalPerks?.map((perk, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={perk}
                            onChange={(e) => handlePerkChange(index, e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter perk"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePerk(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={handleAddPerk}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Perk
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Job Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter job description"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => setShowNewJobModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Job
                  </button>
                </div>
              </form>
              </div>
          </div>
        </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          candidate={selectedCandidate}
        />
      )}

      {/* Jobs Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Active Job Postings</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`p-4 border rounded-xl transition-all ${
                activeJobId === job.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow'
              }`}
              onClick={() => setActiveJobId(activeJobId === job.id ? null : job.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {job.department} • {job.location} • {job.type}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-sm text-gray-600">
                      Applications: {job.applicants.length}
                    </span>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      job.status === 'active' ? 'bg-green-100 text-green-800' :
                      job.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTalkToAgent();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {React.createElement(RiMessage2Line, { className: "text-white" })}
                    <span>Chat</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditJob(job);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {React.createElement(RiEditLine, { className: "text-gray-600" })}
                    <span>Edit</span>
                  </button>
                </div>
              </div>

              {activeJobId === job.id && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Description</h4>
                    <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                    
                    <h4 className="text-sm font-medium text-gray-900 mt-3">Requirements</h4>
                    <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                      {job.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>

                    <h4 className="text-sm font-medium text-gray-900 mt-3">Benefits</h4>
                    <ul className="text-sm text-gray-600 mt-1 list-disc list-inside">
                      {job.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Recent Applications</h4>
                    <div className="mt-2 space-y-3">
                      {job.applicants.map((candidate, idx) => (
                        <div key={idx} className="p-3 bg-white rounded-lg border border-gray-200 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{candidate.name}</p>
                            <p className="text-xs text-gray-500">
                              Applied {new Date(candidate.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCandidate(candidate);
                            }}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            View Profile
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 