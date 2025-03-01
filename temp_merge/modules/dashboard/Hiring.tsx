import React, { useState } from 'react';
import { RefreshCcw, MessageSquare, Building2, Clock, TrendingUp, TrendingDown, Plus, Search, Filter, ChevronDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
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
  const [formData, setFormData] = useState<Omit<Job, 'id' | 'status' | 'applicants' | 'createdAt'>>({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      createdAt: new Date().toISOString()
    };
    setJobs(prev => [newJob, ...prev]);
    
    // Reset form and close modal
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      description: ''
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

  const handleTalkToAgent = () => {
    navigate('/dashboard/chat', {
      state: {
        agentType: 'hiring',
        context: 'hiring_dashboard',
        autoStart: true
      }
    });
  };

  const handlePostNewJob = () => {
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
            icon={<Building2 className="h-6 w-6 text-green-600" />}
          />
          <MetricCard
            title="Time to Hire"
            value="18 days"
            change="-5 days vs last month"
            trend="up"
            icon={<Clock className="h-6 w-6 text-green-600" />}
          />
          <MetricCard
            title="Offer Accept Rate"
            value="85%"
            change="-2% vs last month"
            trend="down"
            icon={<TrendingUp className="h-6 w-6 text-red-600" />}
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
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search candidates..."
                    className="block w-64 pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button 
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveFilters(prev => prev + 1)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilters > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                      {activeFilters}
                    </span>
                  )}
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
                      <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                      <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">
                        No candidates found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
    </div>
  );
} 