import React, { useState, useEffect } from 'react';
import { RefreshCcw, MessageSquare, Building2, Clock, TrendingUp, TrendingDown, Plus, Search, Filter, ChevronDown, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import VideoChat from './hiring/VideoChat';
import { RiRefreshLine, RiMessage2Line, RiVideoAddLine, RiEditLine } from 'react-icons/ri';
import { FaBriefcase, FaUserPlus, FaCalendarCheck, FaUsers } from 'react-icons/fa';
import { BsArrowUpRight } from 'react-icons/bs';
import CandidateDetailModal from './hiring/CandidateDetailModal';
import { Candidate, CandidateStatus } from '@/types/hiring';
import PostJobModal from './hiring/PostJobModal';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'active' | 'draft';
  applicants: number;
  createdAt: string;
  description: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
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

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-medium text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-600">{job.department}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        job.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
      </span>
    </div>
    <div className="flex items-center text-sm text-gray-500 mb-3">
      <Building2 className="h-4 w-4 mr-1" />
      {job.location}
    </div>
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">
        {job.applicants} applicants
      </span>
      <span className="text-gray-500">
        Posted {new Date(job.createdAt).toLocaleDateString()}
      </span>
    </div>
  </div>
);

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
    <div className="flex justify-between items-start mb-3">
      <div>
        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
        <p className="text-sm text-gray-600">{candidate.appliedFor}</p>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        candidate.currentStatus === 'INTERVIEWED' ? 'bg-blue-100 text-blue-600' :
        candidate.currentStatus === 'HIRED' ? 'bg-green-100 text-green-600' :
        candidate.currentStatus === 'REJECTED' ? 'bg-red-100 text-red-600' :
        'bg-gray-100 text-gray-600'
      }`}>
        {candidate.currentStatus.charAt(0) + candidate.currentStatus.slice(1).toLowerCase()}
      </span>
    </div>
    <div className="flex items-center text-sm text-gray-500 mb-3">
      <MessageSquare className="h-4 w-4 mr-1" />
      {candidate.notes[0]?.content.slice(0, 50)}...
    </div>
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center text-gray-500">
        <Clock className="h-4 w-4 mr-1" />
        Applied {new Date(candidate.createdAt).toLocaleDateString()}
      </div>
      <span className="text-blue-600 font-medium cursor-pointer hover:text-blue-700">
        View Details
      </span>
    </div>
  </div>
);

export default function Hiring() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    openPositions: 12,
    activeApplications: 87,
    interviewsScheduled: 15,
    hiringRate: 68,
  });

  useEffect(() => {
    // Simulated data loading
    const loadInitialData = async () => {
      // Sample jobs data
      const initialJobs: Job[] = [
        {
          id: 1,
          title: 'Senior Software Engineer',
          department: 'Engineering',
          location: 'Remote',
          type: 'full-time',
          status: 'active',
          applicants: 24,
          createdAt: '2024-02-15',
          description: 'We are looking for a senior software engineer...',
          requirements: ['5+ years experience', 'React expertise'],
          salary: { min: 120000, max: 180000, currency: 'USD', period: 'yearly' }
        },
        {
          id: 2,
          title: 'Product Manager',
          department: 'Product',
          location: 'New York, NY',
          type: 'full-time',
          status: 'active',
          applicants: 18,
          createdAt: '2024-02-10',
          description: 'Seeking an experienced product manager...',
          requirements: ['3+ years experience', 'B2B SaaS experience'],
          salary: { min: 100000, max: 150000, currency: 'USD', period: 'yearly' }
        },
        {
          id: 3,
          title: 'UX Designer',
          department: 'Design',
          location: 'San Francisco, CA',
          type: 'full-time',
          status: 'active',
          applicants: 32,
          createdAt: '2024-02-08',
          description: 'Looking for a talented UX designer...',
          requirements: ['4+ years experience', 'Portfolio required'],
          salary: { min: 90000, max: 140000, currency: 'USD', period: 'yearly' }
        }
      ];

      // Sample candidates data
      const initialCandidates: Candidate[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@example.com',
          location: 'New York, NY',
          resumeUrl: '/resumes/john-smith.pdf',
          appliedFor: 'Senior Software Engineer',
          currentStatus: 'INTERVIEWED',
          interviews: [],
          aiScore: 8.5,
          tags: ['experienced', 'technical'],
          createdAt: '2024-02-15T10:00:00Z',
          updatedAt: '2024-02-15T10:00:00Z',
          notes: [{
            id: '1',
            author: 'AI',
            content: 'Strong technical background with excellent communication skills.',
            timestamp: '2024-02-15T10:00:00Z'
          }]
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.j@example.com',
          location: 'San Francisco, CA',
          resumeUrl: '/resumes/sarah-j.pdf',
          appliedFor: 'Product Manager',
          currentStatus: 'SCREENING',
          interviews: [],
          aiScore: 7.9,
          tags: ['product', 'leadership'],
          createdAt: '2024-02-14T15:30:00Z',
          updatedAt: '2024-02-14T15:30:00Z',
          notes: [{
            id: '2',
            author: 'AI',
            content: 'Impressive product management experience in B2B SaaS.',
            timestamp: '2024-02-14T15:30:00Z'
          }]
        },
        {
          id: '3',
          name: 'Michael Brown',
          email: 'm.brown@example.com',
          location: 'Remote',
          resumeUrl: '/resumes/m-brown.pdf',
          appliedFor: 'UX Designer',
          currentStatus: 'HIRED',
          interviews: [],
          aiScore: 9.2,
          tags: ['design', 'senior'],
          createdAt: '2024-02-13T09:15:00Z',
          updatedAt: '2024-02-13T09:15:00Z',
          notes: [{
            id: '3',
            author: 'AI',
            content: 'Outstanding portfolio with proven track record in UX design.',
            timestamp: '2024-02-13T09:15:00Z'
          }]
        }
      ];

      setJobs(initialJobs);
      setCandidates(initialCandidates);
    };

    loadInitialData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Refresh data here
    } finally {
      setIsRefreshing(false);
    }
  };

  const handlePostJob = (jobData: any) => {
    const newJob: Job = {
      id: Date.now(),
      ...jobData,
      status: 'active',
      applicants: 0,
      createdAt: new Date().toISOString(),
    };
    setJobs(prev => [newJob, ...prev]);
  };

  return (
    <div className="h-full flex flex-col space-y-4 max-h-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hiring Dashboard</h1>
          <p className="text-sm text-gray-600">Manage your recruitment pipeline</p>
        </div>
        <button
          onClick={() => setShowPostJobModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4 flex-shrink-0">
        <MetricCard
          title="Open Positions"
          value={metrics.openPositions.toString()}
          change="+2 this week"
          trend="up"
          icon={<Building2 />}
        />
        <MetricCard
          title="Active Applications"
          value={metrics.activeApplications.toString()}
          change="+12% vs last month"
          trend="up"
          icon={<MessageSquare />}
        />
        <MetricCard
          title="Interviews Scheduled"
          value={metrics.interviewsScheduled.toString()}
          change="+5 this week"
          trend="up"
          icon={<Clock />}
        />
        <MetricCard
          title="Hiring Rate"
          value={`${metrics.hiringRate}%`}
          change="-3% vs last month"
          trend="down"
          icon={<TrendingUp />}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Jobs List */}
        <div className="w-1/2 bg-white rounded-xl shadow-sm p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">Active Jobs</h2>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button
                onClick={handleRefresh}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <RefreshCcw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto space-y-4">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Candidates List */}
        <div className="w-1/2 bg-white rounded-xl shadow-sm p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">Recent Candidates</h2>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto space-y-4">
            {candidates.map(candidate => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onClick={() => setSelectedCandidate(candidate)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
      {isVideoChatOpen && (
        <VideoChat onClose={() => setIsVideoChatOpen(false)} />
      )}
      <PostJobModal
        isOpen={showPostJobModal}
        onClose={() => setShowPostJobModal(false)}
        onSubmit={handlePostJob}
      />
    </div>
  );
} 