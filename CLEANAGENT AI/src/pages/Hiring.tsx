import React, { useState, useEffect, useCallback } from 'react';
import { 
  UserCheck, Building, Clock, Search, Filter, Download,
  Briefcase, Users, Calendar, BarChart2, ArrowUp, ArrowDown,
  Mail, Phone, CheckCircle, XCircle, X, Plus, Info,
  FileText, Table, Code, Loader2, Bot, TrendingUp, ArrowUpRight,
  ArrowDownRight, RefreshCw, ChevronDown, ChevronRight, MoreVertical,
  GraduationCap, DollarSign, Star, Settings, Send, Maximize2, Minimize2,
  User, Zap, MessageSquare
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Select from '../components/common/Select';
import Input from '../components/common/Input';
import JSZip from 'jszip';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Tooltip from '../components/common/Tooltip';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import TooltipComponent from '../components/common/Tooltip';
import {
  Job,
  Candidate,
  JobFormData,
  HiringMetrics,
  JobFilters,
  CandidateFilters,
  ChatMessage,
  departments,
  employmentTypes,
  experienceLevels,
  candidateStatuses,
  jobStatuses,
  jobTypes,
  priorityLevels,
  JobStatus,
  CandidateStatus,
  JobType,
  Experience,
  Salary,
  DateRange,
  FilterOption,
  Priority,
  SelectOption
} from '../types/hiring';
import {
  calculateHiringMetrics,
  getStatusColor,
  formatSalary,
  validateJobForm,
  generateJobDescription,
  parseJobDescription
} from '../utils/hiring';
import { useNavigate } from 'react-router-dom';

// Constants
const DEFAULT_SALARY: Salary = { min: 0, max: 0, currency: 'USD' };
const DEFAULT_EXPERIENCE: Experience = { years: 0, level: 'entry' };

// Add this function after the imports and before the component
const downloadCSV = (data: any[], filename: string) => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]?.toString() || '';
        // Escape commas and quotes in the value
        return `"${value.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ];
  const csvString = csvRows.join('\n');

  // Create and trigger download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Add utility functions for data conversion
const convertJobToType = (job: any): Job => ({
  id: job.id.toString(),
  title: job.title || '',
  department: job.department || '',
  location: job.location || '',
  type: (job.type as JobType) || 'full-time',
  status: (job.status as JobStatus) || 'draft',
  description: job.description || '',
  requirements: Array.isArray(job.requirements) ? job.requirements : [],
  responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
  salary: {
    min: Number(job.salary?.min) || 0,
    max: Number(job.salary?.max) || 0,
    currency: job.salary?.currency || 'USD'
  },
  applicants: [],
  qualified: [],
  interviews: [],
  offers: [],
  createdAt: job.createdAt || new Date().toISOString(),
  updatedAt: job.updatedAt || new Date().toISOString(),
  closingDate: job.closingDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  priority: (job.priority as Priority) || 'medium',
  views: job.views || 0,
  posted: job.posted || new Date().toISOString()
});

const convertCandidateToType = (candidate: any): Candidate => ({
  id: candidate.id.toString(),
  name: candidate.name || '',
  role: candidate.role || '',
  status: (candidate.status as CandidateStatus) || 'new',
  email: candidate.email || '',
  phone: candidate.phone || '',
  experience: {
    years: Number(candidate.experience?.years) || 0,
    level: candidate.experience?.level || 'entry'
  },
  skills: Array.isArray(candidate.skills) ? candidate.skills : [],
  salary: {
    min: Number(candidate.salary?.min) || 0,
    max: Number(candidate.salary?.max) || 0,
    currency: candidate.salary?.currency || 'USD'
  },
  appliedDate: candidate.appliedDate || new Date().toISOString(),
  createdAt: candidate.createdAt || new Date().toISOString(),
  lastUpdated: candidate.lastUpdated || new Date().toISOString(),
  location: candidate.location,
  source: candidate.source,
  rating: Number(candidate.rating) || 0,
  interviews: Array.isArray(candidate.interviews) ? candidate.interviews : [],
  lastContact: candidate.lastContact,
  nextStep: candidate.nextStep,
  notes: candidate.notes
});

// Add export utility functions
const convertToExcel = async (data: any) => {
  // Implementation would go here - for now just return CSV
  return convertToCSV([data]);
};

const convertToPDF = async (data: any) => {
  // Implementation would go here - for now just return JSON
  return JSON.stringify(data, null, 2);
};

// Add CSV conversion utility
const convertToCSV = (data: any[]): string => {
  if (!data.length) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(item => 
    headers.map(header => {
      const value = item[header]?.toString() || '';
      return `"${value.replace(/"/g, '""')}"`;
    }).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
};

export default function Hiring() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Candidate[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobFilters, setJobFilters] = useState<JobFilters>({
    department: [],
    location: [],
    status: [],
    type: [],
    datePosted: { start: '', end: '' },
    salary: DEFAULT_SALARY
  });
  const [candidateFilters, setCandidateFilters] = useState<CandidateFilters>({
    role: [],
    status: [],
    skills: [],
    location: [],
    experience: DEFAULT_EXPERIENCE,
    salary: DEFAULT_SALARY
  });
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: [],
    responsibilities: [],
    salary: DEFAULT_SALARY,
    closingDate: ''
  });

  const [hiringMetrics, setHiringMetrics] = useState<HiringMetrics>({
    openPositions: 0,
    totalCandidates: 0,
    activeInterviews: 0,
    timeToHire: 0,
    offerAcceptanceRate: 0,
    costPerHire: 0,
    qualifiedRate: 0,
    candidateExperience: 0
  });

  const [showAllJobs, setShowAllJobs] = useState(false);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [newJob, setNewJob] = useState<JobFormData>({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: [],
    responsibilities: [],
    salary: DEFAULT_SALARY,
    closingDate: new Date().toISOString().split('T')[0]
  });

  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);

  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<DateRange>({ start: '', end: '' });
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'pdf' | 'json'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [hiringStats, setHiringStats] = useState({
    totalApplicants: 248,
    weeklyChange: 12,
    activeJobs: 12,
    newJobs: 2,
    timeToHire: 18,
    timeToHireChange: -2,
    interviewsScheduled: 15,
    offersSent: 5,
    offersAccepted: 3,
    topJobViews: 1250
  });

  const [pipelineStats, setPipelineStats] = useState({
    applied: { count: 0, percentage: 0 },
    screening: { count: 0, percentage: 0 },
    interviewing: { count: 0, percentage: 0 },
    offered: { count: 0, percentage: 0 },
    hired: { count: 0, percentage: 0 }
  });

  // Add sorting state
  const [sortBy, setSortBy] = useState<'date' | 'applicants' | 'location' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Add hiring agent state
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agentCommand, setAgentCommand] = useState('');
  const [agentResponse, setAgentResponse] = useState('');
  const [isAgentProcessing, setIsAgentProcessing] = useState(false);

  // Add application filters state
  const [showApplicationFilters, setShowApplicationFilters] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const navigate = useNavigate();

  // Safe date parsing function
  const parseDate = (dateStr: string | undefined): Date => {
    if (!dateStr) return new Date();
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  // Update calculateHiringStats with safe date handling
  const calculateHiringStats = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const totalApplicants = applications.length;
    const weeklyChange = applications.filter(app => 
      parseDate(app.createdAt) > weekAgo
    ).length;

    const hiredApplications = applications.filter(app => app.status === 'hired');
    const timeToHireValues = hiredApplications.map(app => {
      const hireDate = parseDate(app.lastUpdated);
      const applyDate = parseDate(app.createdAt);
      return Math.ceil((hireDate.getTime() - applyDate.getTime()) / (1000 * 60 * 60 * 24));
    });

    const currentTimeToHire = timeToHireValues.length > 0 
      ? Math.round(timeToHireValues.reduce((a, b) => a + b, 0) / timeToHireValues.length)
      : 18;

    const lastMonthHires = hiredApplications.filter(app => {
      const updateDate = parseDate(app.lastUpdated);
      return updateDate > monthAgo && updateDate <= weekAgo;
    });

    const lastMonthTimeToHire = lastMonthHires.length > 0
      ? Math.round(lastMonthHires.reduce((acc, app) => {
          const hireDate = parseDate(app.lastUpdated);
          const applyDate = parseDate(app.createdAt);
          return acc + Math.ceil((hireDate.getTime() - applyDate.getTime()) / (1000 * 60 * 60 * 24));
        }, 0) / lastMonthHires.length)
      : currentTimeToHire;

    const timeToHireChange = currentTimeToHire - lastMonthTimeToHire;

    setHiringStats({
      totalApplicants,
      weeklyChange,
      activeJobs: jobs.length,
      newJobs: jobs.filter(job => job.posted && parseDate(job.posted) > weekAgo).length,
      timeToHire: currentTimeToHire,
      timeToHireChange,
      interviewsScheduled: applications.filter(app => app.status === 'interview').length,
      offersSent: applications.filter(app => app.status === 'offered').length,
      offersAccepted: applications.filter(app => app.status === 'hired').length,
      topJobViews: jobs.reduce((total, job) => total + (job.views || 0), 0)
    });
  };

  // Update useEffect to calculate real stats
  useEffect(() => {
    // Load initial applications
    const storedApplications = localStorage.getItem('applications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }

    // Calculate initial stats
    calculateHiringStats();

    // Set up auto-refresh
    const interval = setInterval(calculateHiringStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Update stats when applications or jobs change
  useEffect(() => {
    calculateHiringStats();
  }, [applications, jobs]);

  // Update handleAddApplication
  const handleAddApplication = (application: any) => {
    const newApplication = convertCandidateToType({
      id: (applications.length + 1).toString(),
      ...application,
      status: 'new',
      appliedDate: new Date().toISOString(),
      lastContact: new Date().toISOString()
    });

    setApplications(prev => [newApplication, ...prev]);
    calculateHiringStats();
  };

  // Update handleStatusChange
  const handleStatusChange = (applicationId: string, newStatus: Candidate['status']) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: newStatus,
          lastContact: new Date().toISOString()
        };
      }
      return app;
    }));
    calculateHiringStats();
  };

  // Update handleAddJob
  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!newJob.title || !newJob.department || !newJob.location) {
      setFormErrors({
        ...(!newJob.title && { title: 'Job title is required' }),
        ...(!newJob.department && { department: 'Department is required' }),
        ...(!newJob.location && { location: 'Location is required' })
      });
      return;
    }

    const job = convertJobToType({
      id: (jobs.length + 1).toString(),
      ...newJob,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      closingDate: newJob.closingDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });

    setJobs(prev => [job, ...prev]);
    setShowNewJobModal(false);
    
    // Reset form
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      description: '',
      requirements: [],
      responsibilities: [],
      salary: DEFAULT_SALARY,
      closingDate: new Date().toISOString().split('T')[0]
    });
    setFormErrors({});
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const exportData = {
        jobs: jobs.map(mapJobForExport),
        candidates: applications.map(mapCandidateForExport),
        metrics: hiringMetrics
      };

      let output: string;
      switch (exportFormat) {
        case 'csv':
          output = convertToCSV([exportData]);
          break;
        case 'excel':
          output = await convertToExcel(exportData);
          break;
        case 'pdf':
          output = await convertToPDF(exportData);
          break;
        default:
          output = JSON.stringify(exportData, null, 2);
      }

      // Create download
      const blob = new Blob([output], { 
        type: exportFormat === 'csv' ? 'text/csv' :
              exportFormat === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
              exportFormat === 'pdf' ? 'application/pdf' :
              'application/json'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hiring-data-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setShowExportModal(false);
    }
  };

  const quickStats = [
    { 
      label: 'Total Applicants', 
      value: hiringStats.totalApplicants.toLocaleString(), 
      change: `+${hiringStats.weeklyChange} this week`, 
      trend: 'up', 
      icon: UserCheck,
      tooltip: 'Total number of candidates who have applied to all active job postings'
    },
    { 
      label: 'Active Jobs', 
      value: hiringStats.activeJobs.toString(), 
      change: `+${hiringStats.newJobs} new`, 
      trend: 'up', 
      icon: Building,
      tooltip: 'Number of currently open job positions'
    },
    { 
      label: 'Time to Hire', 
      value: `${hiringStats.timeToHire}d`, 
      change: `${hiringStats.timeToHireChange}d from last month`, 
      trend: hiringStats.timeToHireChange <= 0 ? 'up' : 'down', 
      icon: Clock,
      tooltip: 'Average time from application to hire for completed recruitments'
    },
    { 
      label: 'Job Views', 
      value: hiringStats.topJobViews.toLocaleString(), 
      change: '+15.2%', 
      trend: 'up', 
      icon: BarChart2,
      tooltip: 'Total number of views across all active job postings'
    },
  ];

  // Calculate pipeline statistics
  useEffect(() => {
    const totalApplications = applications.length;
    if (totalApplications === 0) return;

    const stats = {
      applied: applications.filter(app => app.status === 'applied').length,
      screening: applications.filter(app => app.status === 'screening').length,
      interviewing: applications.filter(app => app.status === 'interview').length,
      offered: applications.filter(app => app.status === 'offered').length,
      hired: applications.filter(app => app.status === 'hired').length
    };

    setPipelineStats({
      applied: { 
        count: stats.applied,
        percentage: (stats.applied / totalApplications) * 100
      },
      screening: {
        count: stats.screening,
        percentage: (stats.screening / totalApplications) * 100
      },
      interviewing: {
        count: stats.interviewing,
        percentage: (stats.interviewing / totalApplications) * 100
      },
      offered: {
        count: stats.offered,
        percentage: (stats.offered / totalApplications) * 100
      },
      hired: {
        count: stats.hired,
        percentage: (stats.hired / totalApplications) * 100
      }
    });
  }, [applications]);

  const recentApplications = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Frontend Developer',
      status: 'interview',
      appliedDate: '2 hours ago',
      experience: '8 years'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      status: 'review',
      appliedDate: '5 hours ago',
      experience: '6 years'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'UX Designer',
      status: 'offered',
      appliedDate: '1 day ago',
      experience: '5 years'
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'DevOps Engineer',
      status: 'rejected',
      appliedDate: '2 days ago',
      experience: '4 years'
    }
  ];

  const handleViewJob = (job: any) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleViewApplication = (application: any) => {
    setSelectedCandidate(application);
    setShowApplicationDetails(true);
  };

  // Update handleEditJob
  const handleEditJob = () => {
    if (!editingJob) return;

    const updatedJobs = jobs.map(job =>
      job.id === editingJob.id ? {
        ...job,
        ...editingJob,
        updatedAt: new Date().toISOString()
      } : job
    );

    setJobs(updatedJobs);
    setShowEditJobModal(false);
    setEditingJob(null);
    setShowJobDetails(false);
  };

  // Add function to start editing
  const startEditingJob = (job: any) => {
    setEditingJob({
      ...job,
      type: job.type || 'full-time',
      description: job.description || '',
      salary: job.salary || {
        min: 0,
        max: 0,
        currency: 'USD'
      },
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      experienceLevel: job.experienceLevel || 'Entry Level',
      employmentType: job.employmentType || 'Full-time',
      skills: job.skills || [],
      benefits: job.benefits || [],
      deadline: job.deadline || new Date().toISOString().split('T')[0]
    });
    setShowEditJobModal(true);
  };

  // Update getFilteredJobs with safe date handling
  const getFilteredJobs = () => {
    return jobs.filter(job => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        job.title.toLowerCase().includes(searchLower) ||
        job.department.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.status.toLowerCase().includes(searchLower);

      const matchesDepartment = !jobFilters.department?.length || 
        jobFilters.department?.includes(job.department);
      
      const matchesLocation = !jobFilters.location?.length || 
        jobFilters.location?.includes(job.location);
      
      const matchesStatus = !jobFilters.status?.length || 
        jobFilters.status?.includes(job.status);
      
      const matchesDatePosted = !jobFilters.datePosted || !job.posted || 
        (parseDate(job.posted) >= parseDate(jobFilters.datePosted.start) &&
         parseDate(job.posted) <= parseDate(jobFilters.datePosted.end));

      return matchesSearch && matchesDepartment && matchesLocation && 
             matchesStatus && matchesDatePosted;
    });
  };

  const statusOptions = [
    { value: 'applied', label: 'Applied' },
    { value: 'screening', label: 'Screening' },
    { value: 'interview', label: 'Interview' },
    { value: 'offered', label: 'Offered' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  // Add application filters
  const [applicationFilters, setApplicationFilters] = useState({
    status: [] as string[],
    role: [] as string[],
    experience: [] as string[]
  });

  // Filter applications
  const filteredApplications = recentApplications.filter(app => {
    if (applicationFilters.status.length && !applicationFilters.status.includes(app.status)) return false;
    if (applicationFilters.role.length && !applicationFilters.role.includes(app.role)) return false;
    if (applicationFilters.experience.length && !applicationFilters.experience.includes(app.experience)) return false;
    return true;
  });

  // Handle agent commands
  const handleAgentCommand = async () => {
    if (!agentCommand.trim()) return;
    
    setIsAgentProcessing(true);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: agentCommand,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate contextual response based on command
      let response = '';
      const command = agentCommand.toLowerCase();
      
      if (command.includes('post job') || command.includes('create job')) {
        response = 'To post a new job:\n1. Click the "New Job" button\n2. Fill in the job details\n3. Set requirements and qualifications\n4. Review and publish';
      } else if (command.includes('pipeline') || command.includes('candidates')) {
        response = `Current Pipeline Stats:\nTotal Candidates: ${hiringStats.totalApplicants}\nActive Interviews: ${hiringStats.interviewsScheduled}\nOffers Sent: ${hiringStats.offersSent}\nOffers Accepted: ${hiringStats.offersAccepted}`;
      } else if (command.includes('metrics') || command.includes('stats')) {
        response = `Hiring Metrics:\nTime to Hire: ${hiringStats.timeToHire} days\nOffer Accept Rate: ${(hiringStats.offersAccepted / hiringStats.offersSent * 100).toFixed(1)}%\nNew Applications this week: ${hiringStats.weeklyChange}`;
      } else if (command.includes('interview')) {
        response = 'To schedule interviews:\n1. Select a candidate\n2. Click "Schedule Interview"\n3. Choose interview type and time\n4. Send invitation to interviewers';
      } else {
        response = 'I can help you with:\n- Posting new jobs\n- Viewing candidate pipeline\n- Checking hiring metrics\n- Scheduling interviews';
      }
      
      // Add agent response
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: response,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, agentMessage]);
      
    } catch (error) {
      console.error('Error processing command:', error);
    } finally {
      setIsAgentProcessing(false);
      setAgentCommand('');
    }
  };

  // Update filter state handling
  const handleFilterChange = (filterType: keyof JobFilters, value: any) => {
    setJobFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Update date filter handling
  const handleDateFilterChange = (field: 'start' | 'end', value: string) => {
    setJobFilters(prev => ({
      ...prev,
      datePosted: {
        start: field === 'start' ? value : (prev.datePosted?.start || ''),
        end: field === 'end' ? value : (prev.datePosted?.end || '')
      }
    }));
  };

  // Update form error handling
  const handleFormErrors = (errors: Partial<JobFormData>) => {
    const errorMessages: Record<string, string> = {};
    Object.entries(errors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        errorMessages[key] = value;
      }
    });
    setFormErrors(errorMessages);
  };

  // Filter jobs based on selected filters
  const filteredJobs = getFilteredJobs();

  // Filter candidates based on selected filters
  const getFilteredCandidates = () => {
    return applications.filter(candidate => {
      const matchesRole = !candidateFilters.role?.length || 
        candidateFilters.role.includes(candidate.role);
      
      const matchesStatus = !candidateFilters.status?.length || 
        candidateFilters.status.includes(candidate.status);
      
      const matchesSkills = !candidateFilters.skills?.length || 
        candidateFilters.skills.some(skill => 
          candidate.skills.includes(skill)
        );
      
      const matchesExperience = !candidateFilters.experience || 
        candidate.experience.years >= (candidateFilters.experience?.years || 0);
      
      const matchesSalary = !candidateFilters.salary || 
        (candidate.salary.min >= (candidateFilters.salary?.min || 0) && 
         candidate.salary.max <= (candidateFilters.salary?.max || Infinity));

      return matchesRole && matchesStatus && matchesSkills && 
             matchesExperience && matchesSalary;
    });
  };

  // Update export data mapping
  const mapJobForExport = (job: Job) => ({
    id: job.id,
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    status: job.status,
    applicants: job.applicants?.length || 0,
    qualified: job.qualified?.length || 0,
    interviews: job.interviews?.length || 0,
    offers: job.offers?.length || 0,
    salary: formatSalary(job.salary.min, job.salary.max, job.salary.currency),
    createdAt: job.createdAt,
    closingDate: job.closingDate,
    updatedAt: job.updatedAt
  });

  const mapCandidateForExport = (candidate: Candidate) => ({
    id: candidate.id,
    name: candidate.name,
    role: candidate.role,
    status: candidate.status,
    email: candidate.email,
    experience: candidate.experience?.years || 0,
    skills: candidate.skills?.join(', ') || '',
    appliedDate: candidate.appliedDate,
    lastUpdated: candidate.lastUpdated
  });

  // Update filter handling functions
  const handleDepartmentFilter = (dept: string, checked: boolean) => {
    setJobFilters(prev => ({
      ...prev,
      department: checked 
        ? [...(prev.department || []), dept]
        : (prev.department || []).filter(d => d !== dept)
    }));
  };

  const handleLocationFilter = (selected: SelectOption<string>[] | SelectOption<string> | null) => {
    setJobFilters(prev => ({
      ...prev,
      location: Array.isArray(selected) ? selected.map(opt => opt.value) : 
               selected ? [selected.value] : []
    }));
  };

  const handleStatusFilter = (status: JobStatus, checked: boolean) => {
    setJobFilters(prev => ({
      ...prev,
      status: checked
        ? [...(prev.status || []), status]
        : (prev.status || []).filter(s => s !== status)
    }));
  };

  const handleDateFilter = (field: 'start' | 'end', value: string) => {
    setJobFilters(prev => ({
      ...prev,
      datePosted: {
        start: field === 'start' ? value : prev.datePosted?.start || '',
        end: field === 'end' ? value : prev.datePosted?.end || ''
      }
    }));
  };

  // Add handleDropdownToggle function after other handler functions
  const handleDropdownToggle = (jobId: string | number) => {
    setActiveDropdown(activeDropdown === jobId.toString() ? null : jobId.toString());
  };

  // Add useEffect for click outside handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleChatWithAgent = () => {
    navigate('/chat', { 
      state: { 
        agentType: 'hiring',
        autoStart: true 
      }
    });
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Add your refresh logic here
      // For example: await fetchJobs(); await fetchCandidates();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    } catch (error) {
      console.error('Error refreshing hiring data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hiring</h1>
          <p className="text-gray-500">Manage job postings and candidates</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="relative"
          >
            <RefreshCw className={cn(
              "w-4 h-4 mr-2",
              isRefreshing && "animate-spin"
            )} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            onClick={handleChatWithAgent}
            className="gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            Talk to Hiring Agent
          </Button>
        </div>
      </div>

      {/* Hiring Agent Chat Modal */}
      {showAgentModal && (
        <div className={cn(
          "fixed right-6 z-50 transition-all duration-300",
          isChatMinimized ? "bottom-6 w-72" : "bottom-0 w-full max-w-2xl"
        )}>
          <Card className="shadow-xl">
            <div className="p-4 bg-gradient-primary text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Hiring Agent</h2>
                    <p className="text-sm text-white/80">Your AI hiring assistant</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    onClick={() => setIsChatMinimized(!isChatMinimized)}
                  >
                    {isChatMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    onClick={() => {
                      setShowAgentModal(false);
                      setIsChatMinimized(false);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {!isChatMinimized && (
              <>
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 max-w-[80%]",
                        message.type === 'user' ? "ml-auto" : "mr-auto"
                      )}
                    >
                      {message.type === 'agent' && (
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary-600" />
                        </div>
                      )}
                      <div className={cn(
                        "rounded-lg p-3",
                        message.type === 'user' 
                          ? "bg-primary-500 text-white ml-auto" 
                          : "bg-gray-100"
                      )}>
                        <p className="text-sm">{message.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {format(message.timestamp, 'HH:mm')}
                        </span>
                      </div>
                      {message.type === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary-600" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      className="flex-1"
                      placeholder="Ask about job postings, candidates, or hiring metrics..."
                      value={agentCommand}
                      onChange={(e) => setAgentCommand(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleAgentCommand();
                        }
                      }}
                    />
                    <Button
                      onClick={handleAgentCommand}
                      disabled={!agentCommand.trim() || isAgentProcessing}
                    >
                      {isAgentProcessing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Quick actions:</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'How do I post a job?',
                        'Show candidate pipeline',
                        'Show hiring metrics',
                        'Schedule interviews'
                      ].map((command) => (
                        <Button
                          key={command}
                          variant="outline"
                          size="sm"
                          className="text-sm justify-start"
                          onClick={() => {
                            setAgentCommand(command);
                            handleAgentCommand();
                          }}
                        >
                          <Zap className="w-3 h-3 mr-2" />
                          {command}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Job Filters Modal */}
      {showFilters && (
        <Card className="absolute right-0 mt-2 w-80 z-10 shadow-lg">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setJobFilters({
                    department: [],
                    location: [],
                    status: [],
                    type: [],
                    datePosted: { start: '', end: '' },
                    salary: DEFAULT_SALARY
                  });
                }}
              >
                Clear all
              </Button>
            </div>

            <div className="space-y-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <div className="space-y-2">
                  {departments.map(dept => (
                    <label key={dept} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={jobFilters.department?.includes(dept) || false}
                        onChange={(e) => handleDepartmentFilter(dept, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Select<string>
                  isMulti
                  value={jobFilters.location?.map(loc => ({ value: loc, label: loc })) || []}
                  onChange={handleLocationFilter}
                  options={[
                    { value: 'remote', label: 'Remote' },
                    { value: 'onsite', label: 'On-site' },
                    { value: 'hybrid', label: 'Hybrid' }
                  ]}
                  placeholder="Select locations"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <div className="space-y-2">
                  {jobStatuses.map(status => (
                    <label key={status} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={jobFilters.status?.includes(status) || false}
                        onChange={(e) => handleStatusFilter(status, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Posted Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Date Posted</label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={jobFilters.datePosted?.start || ''}
                    onChange={(e) => handleDateFilter('start', e.target.value)}
                    className="w-full"
                  />
                  <Input
                    type="date"
                    value={jobFilters.datePosted?.end || ''}
                    onChange={(e) => handleDateFilter('end', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500">Open Positions</h3>
              <Tooltip content="Number of active job postings">
                <div className="p-2 rounded-full hover:bg-gray-100">
                  <Briefcase className="w-4 h-4 text-gray-400" />
                </div>
              </Tooltip>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{hiringStats.activeJobs}</p>
                <p className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +3 this month
                </p>
              </div>
              <div className="w-16 h-16">
                <ResponsiveContainer>
                  <LineChart data={[
                    { value: 8 },
                    { value: 10 },
                    { value: 9 },
                    { value: 12 }
                  ]}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500">Time to Hire</h3>
              <Tooltip content="Average days from job posting to offer acceptance">
                <div className="p-2 rounded-full hover:bg-gray-100">
                  <Clock className="w-4 h-4 text-gray-400" />
                </div>
              </Tooltip>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{hiringStats.timeToHire} days</p>
                <p className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  -5 days vs last month
                </p>
              </div>
              <div className="w-16 h-16">
                <ResponsiveContainer>
                  <BarChart data={[
                    { value: 35 },
                    { value: 32 },
                    { value: 30 },
                    { value: 28 }
                  ]}>
                    <Bar dataKey="value" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-500">Offer Accept Rate</h3>
              <Tooltip content="Percentage of offers accepted by candidates">
                <div className="p-2 rounded-full hover:bg-gray-100">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
              </Tooltip>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{hiringStats.offersAccepted / hiringStats.totalApplicants * 100}%</p>
                <p className="text-sm text-green-500 flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +5% vs last month
                </p>
              </div>
              <div className="w-16 h-16">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={[
                        { value: hiringStats.offersAccepted / hiringStats.totalApplicants * 100 },
                        { value: 100 - hiringStats.offersAccepted / hiringStats.totalApplicants * 100 }
                      ]}
                      innerRadius={25}
                      outerRadius={30}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#E5E7EB" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Job Postings */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Job Postings</h2>
            <p className="text-sm text-gray-500">Manage and create job listings</p>
          </div>
          <Button 
            onClick={() => setShowNewJobModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post New Job
          </Button>
        </div>
        <Card>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Position</th>
                    <th className="pb-2">Department</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Experience</th>
                    <th className="pb-2">Salary</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Applicants</th>
                    <th className="pb-2">Posted</th>
                    <th className="pb-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-b last:border-b-0">
                      <td className="py-3">
                        <div className="font-medium">{job.title}</div>
                      </td>
                      <td className="py-3">{job.department}</td>
                      <td className="py-3">{job.location}</td>
                      <td className="py-3">{job.type}</td>
                      <td className="py-3">{job.requirements.length} requirements</td>
                      <td className="py-3">{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</td>
                      <td className="py-3">
                        <Badge
                          variant={
                            job.status === 'active' ? 'success' :
                            job.status === 'draft' ? 'warning' :
                            'default'
                          }
                        >
                          {job.status}
                        </Badge>
                      </td>
                      <td className="py-3">{job.applicants.length}</td>
                      <td className="py-3">
                        <div className="text-sm">
                          {job.posted ? format(new Date(job.posted), 'PP') : 'Not posted'}
                        </div>
                      </td>
                      <td className="py-3 relative">
                        <div className="relative dropdown-container">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDropdownToggle(job.id);
                            }}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          {activeDropdown === job.id.toString() && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1" role="menu">
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => {
                                    handleViewJob(job);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  View Details
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => {
                                    startEditingJob(job);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  Edit Job
                                </button>
                                <button
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  onClick={() => {
                                    const updatedJobs = jobs.filter(j => j.id !== job.id);
                                    setJobs(updatedJobs);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  Delete Job
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* Candidates */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Candidates</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Search candidates..."
              icon={Search}
              className="w-64"
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        <Card>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Role</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Experience</th>
                    <th className="pb-2">Skills</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Salary</th>
                    <th className="pb-2">Source</th>
                    <th className="pb-2">Applied</th>
                    <th className="pb-2">Rating</th>
                    <th className="pb-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((candidate) => (
                    <tr key={candidate.id} className="border-b last:border-b-0">
                      <td className="py-3">
                        <div className="font-medium">{candidate.name}</div>
                      </td>
                      <td className="py-3">{candidate.role}</td>
                      <td className="py-3">
                        <Badge
                          variant={
                            candidate.status === 'interview' ? 'success' :
                            candidate.status === 'screening' ? 'warning' :
                            'default'
                          }
                        >
                          {candidate.status}
                        </Badge>
                      </td>
                      <td className="py-3">{candidate.experience.years} years</td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          {candidate.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="default" size="sm">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="default" size="sm">
                              +{candidate.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3">{candidate.location || 'Not specified'}</td>
                      <td className="py-3">{formatSalary(candidate.salary.min, candidate.salary.max, candidate.salary.currency)}</td>
                      <td className="py-3">{candidate.source || 'Direct'}</td>
                      <td className="py-3">
                        <div className="text-sm">
                          {format(new Date(candidate.appliedDate), 'PP')}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < (candidate.rating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      {/* New Job Modal */}
      {showNewJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[600px] overflow-y-auto">
            <form onSubmit={handleAddJob} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create New Job Posting</h2>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowNewJobModal(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    placeholder="Enter job title"
                    value={newJob.title}
                    onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                    error={formErrors.title}
                  />
                  {formErrors.title && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <Select<string>
                    value={newJob.department ? { value: newJob.department, label: newJob.department } : []}
                    onChange={(selected) => setNewJob(prev => ({ 
                      ...prev, 
                      department: selected && !Array.isArray(selected) ? selected.value : '' 
                    }))}
                    options={departments.map(dept => ({ value: dept, label: dept }))}
                    placeholder="Select department"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    placeholder="Enter location"
                    value={newJob.location}
                    onChange={(e) => setNewJob(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Employment Type</label>
                  <Select<JobType>
                    value={newJob.type ? { value: newJob.type, label: newJob.type } : []}
                    onChange={(selected) => setNewJob(prev => ({ 
                      ...prev, 
                      type: selected && !Array.isArray(selected) ? selected.value : 'full-time'
                    }))}
                    options={jobTypes.map(type => ({ value: type, label: type }))}
                    placeholder="Select employment type"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Salary Range</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={newJob.salary.min}
                      onChange={(e) => setNewJob(prev => ({ 
                        ...prev, 
                        salary: { ...prev.salary, min: Number(e.target.value) } 
                      }))}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={newJob.salary.max}
                      onChange={(e) => setNewJob(prev => ({ 
                        ...prev, 
                        salary: { ...prev.salary, max: Number(e.target.value) } 
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Closing Date</label>
                  <Input
                    type="date"
                    value={newJob.closingDate}
                    onChange={(e) => setNewJob(prev => ({ ...prev, closingDate: e.target.value }))}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="Enter job description"
                    value={newJob.description}
                    onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Requirements</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                    placeholder="Enter requirements (one per line)"
                    value={newJob.requirements.join('\n')}
                    onChange={(e) => setNewJob(prev => ({ 
                      ...prev, 
                      requirements: e.target.value.split('\n').filter(Boolean)
                    }))}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowNewJobModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Job Posting
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}