import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BarChart2, Users, TrendingUp, Calendar, MessageSquare, 
  Megaphone, Download, X, ArrowUp, ArrowDown, Plus,
  FileText, Settings, Bell, Search, Filter, Mail,
  Phone, UserPlus, Target, Briefcase, DollarSign,
  UserCheck, Building, Clock, Zap, Send, PlayCircle,
  CheckCircle2, AlertCircle, Circle, Bot, Cog, Star, HelpCircle,
  Activity, ChevronRight, RefreshCw
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Select from '../components/common/Select';
import Input from '../components/common/Input';
import Tooltip from '../components/common/Tooltip';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';

// Utility function to generate unique IDs
const generateUniqueId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  action: string;
  completed: boolean;
  type: 'marketing' | 'hiring' | 'sales';
}

interface Activity {
  id: string;
  type: 'sales' | 'marketing' | 'hiring' | 'operations';
  message: string;
  time: string;
  status?: 'success' | 'error' | 'active' | 'scheduled' | 'completed' | 'failed';
}

interface ModalContent {
  title: string;
  content: string;
  action: () => void;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  category: string;
  lastUsed?: Date;
  favorite?: boolean;
  order?: number;
  tooltip: string;
}

// Define task name type and routes at the top of the file
type TaskName = 'Set up hiring agent' | 'Connect social media accounts' | 'Configure email templates' | 'Set up workflow automations' | 'Connect CRM';

const taskRoutes: Record<TaskName, string> = {
  'Set up hiring agent': '/hiring/setup',
  'Connect social media accounts': '/integrations/social-media',
  'Configure email templates': '/settings/templates',
  'Set up workflow automations': '/operations/automations/new',
  'Connect CRM': '/integrations/crm'
};

interface OnboardingTask {
  id: number;
  task: TaskName; // Update the task type
  completed: boolean;
  description: string;
  priority: number;
}

interface QuickStat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  tooltip: string;
  notifyThreshold?: number;
}

interface SearchResult {
  type: 'action' | 'automation' | 'task' | 'activity';
  title: string;
  description: string;
  icon: React.ElementType;
  path?: string;
  action?: () => void;
}

// Add new interface for automation details
interface AutomationDetail {
  id: string;
  name: string;
  type: 'sales' | 'hiring' | 'marketing' | 'operations';
  status: 'active' | 'scheduled' | 'completed' | 'failed';
  lastRun?: Date;
  nextRun?: Date;
  successRate: number;
  description: string;
  icon: React.ElementType;
}

// Add new interfaces for agent highlights and notifications
interface AgentHighlight {
  agentType: 'sales' | 'hiring' | 'marketing' | 'operations';
  title: string;
  metric: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
  color: string;
}

interface NotificationItem {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  agentType?: 'sales' | 'hiring' | 'marketing' | 'operations';
  actionUrl?: string;
}

// Add activity type and period options
const activityTypeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'hiring', label: 'Hiring' },
  { value: 'operations', label: 'Operations' }
];

const activityPeriodOptions = [
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: 'all', label: 'All Time' }
];

type ActivityType = 'all' | 'sales' | 'marketing' | 'hiring' | 'operations';
type ActivityPeriod = '24h' | '7d' | '30d' | 'all';

interface SelectOption<T extends string> {
  value: T;
  label: string;
}

// Update the ActivityContext type
interface ActivityFilters {
  type: ActivityType;
  period: ActivityPeriod;
}

const ActivityContext = createContext<{
  activityFilters: ActivityFilters;
  setActivityFilters: React.Dispatch<React.SetStateAction<ActivityFilters>>;
}>({
  activityFilters: {
    type: 'all',
    period: '7d'
  },
  setActivityFilters: () => {}
});

interface ModalStates {
  automations: boolean;
  activity: boolean;
  settings: boolean;
  help: boolean;
}

// Update the Select components with proper typing
interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string; }[];
  placeholder?: string;
  className?: string;
}

export default function Launchpad() {
  const navigate = useNavigate();
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [reportPeriod, setReportPeriod] = useState('7d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [hiringStats, setHiringStats] = useState({
    totalApplicants: 248,
    weeklyChange: 12,
    activeJobs: 12,
    newJobs: 2,
    timeToHire: 18,
    timeToHireChange: -2
  });

  // Track automation progress
  const [automationStats, setAutomationStats] = useState({
    agentsConfigured: 75,
    activeWorkflows: 8,
    totalAutomations: 12,
    recentAutomations: [
      {
        id: '1',
        name: 'Email Follow-up',
        type: 'sales',
        status: 'active',
        lastRun: new Date(Date.now() - 3600000),
        nextRun: new Date(Date.now() + 3600000),
        successRate: 98,
        description: 'Automatically follows up with leads after initial contact',
        icon: Mail
      },
      {
        id: '2',
        name: 'Job Post Distribution',
        type: 'hiring',
        status: 'active',
        lastRun: new Date(Date.now() - 7200000),
        nextRun: new Date(Date.now() + 7200000),
        successRate: 95,
        description: 'Distributes job postings across multiple platforms',
        icon: UserPlus
      },
      {
        id: '3',
        name: 'Social Media Posts',
        type: 'marketing',
        status: 'scheduled',
        lastRun: new Date(Date.now() - 86400000),
        nextRun: new Date(Date.now() + 3600000),
        successRate: 92,
        description: 'Schedules and publishes social media content',
        icon: Megaphone
      }
    ] as AutomationDetail[]
  });

  // Enhanced onboarding tasks with descriptions and priority
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([
    { 
      id: 1, 
      task: 'Set up hiring agent', 
      completed: true,
      description: 'Configure the hiring agent to automate your recruitment process',
      priority: 1
    },
    { 
      id: 2, 
      task: 'Connect social media accounts', 
      completed: false,
      description: 'Link your social media accounts for automated posting and analytics',
      priority: 2
    },
    { 
      id: 3, 
      task: 'Configure email templates', 
      completed: true,
      description: 'Set up email templates for automated communications',
      priority: 3
    },
    { 
      id: 4, 
      task: 'Set up workflow automations', 
      completed: false,
      description: 'Create automated workflows for repetitive tasks',
      priority: 4
    },
    { 
      id: 5, 
      task: 'Connect CRM', 
      completed: false,
      description: 'Integrate your CRM system for better lead management',
      priority: 5
    }
  ]);

  // Calculate completion percentage
  const completionPercentage = Math.round(
    (onboardingTasks.filter(task => task.completed).length / onboardingTasks.length) * 100
  );

  // Calculate next recommended task
  const getNextTask = () => {
    const incompleteTasks = onboardingTasks.filter(task => !task.completed);
    return incompleteTasks.length > 0 ? incompleteTasks.reduce((a, b) => a.priority < b.priority ? a : b) : null;
  };

  // Update progress when tasks change
  const [setupProgress, setSetupProgress] = useState(65); // Percentage complete
  useEffect(() => {
    const completed = onboardingTasks.filter(task => task.completed).length;
    const total = onboardingTasks.length;
    const progress = Math.round((completed / total) * 100);
    setSetupProgress(progress);
  }, [onboardingTasks]);

  // Personalized recommendations
  const [recommendedActions, setRecommendedActions] = useState<RecommendedAction[]>([
    {
      id: '1',
      title: 'Complete Profile Setup',
      description: 'Add your company details and preferences',
      action: 'Complete Setup',
      completed: false,
      type: 'marketing'
    },
    {
      id: '2',
      title: 'Connect CRM',
      description: 'Integrate with your existing CRM system',
      action: 'Connect',
      completed: false,
      type: 'sales'
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 'sales-1',
      type: 'sales',
      message: 'New sales lead generated',
      time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: 'success'
    },
    {
      id: 'marketing-1',
      type: 'marketing',
      message: 'Campaign "Summer Sale" launched',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      status: 'success'
    }
  ]);

  const [favorites, setFavorites] = useState<string[]>([]);

  const quickActions: QuickAction[] = [
    {
      id: 'post-job',
      title: 'Post New Job',
      description: 'Create and publish a new job listing',
      icon: Briefcase,
      path: '/hiring/new',
      category: 'hiring',
      tooltip: 'Create a new job posting and distribute it across multiple platforms'
    },
    {
      id: 'send-followup',
      title: 'Send Follow-up',
      description: 'Send automated follow-up emails to leads',
      icon: DollarSign,
      path: '/sales/followup',
      category: 'sales',
      tooltip: 'Automatically send personalized follow-up emails to your leads'
    },
    {
      id: 'create-campaign',
      title: 'Create Campaign',
      description: 'Start a new marketing campaign',
      icon: Megaphone,
      path: '/marketing/campaigns/new',
      category: 'marketing',
      tooltip: 'Launch a new marketing campaign across multiple channels'
    },
    {
      id: 'start-automation',
      title: 'Start Automation',
      description: 'Create a new automated workflow',
      icon: Settings,
      path: '/operations/automations/new',
      category: 'operations',
      tooltip: 'Set up a new automated workflow to streamline your processes'
    },
    {
      id: 'chat-agent',
      title: 'Chat with Agent',
      description: 'Start a conversation with AI assistant',
      icon: MessageSquare,
      path: '/chat',
      category: 'communication',
      tooltip: 'Get instant help from your AI assistant for any task'
    },
    {
      id: 'view-metrics',
      title: 'View Metrics',
      description: 'Check your performance metrics',
      icon: BarChart2,
      path: '/metrics',
      category: 'analytics',
      tooltip: 'View detailed performance metrics and analytics'
    }
  ];

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'communication', label: 'Communication' },
    { value: 'sales', label: 'Sales' },
    { value: 'hiring', label: 'Hiring' },
    { value: 'operations', label: 'Operations' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'marketing', label: 'Marketing' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Recently Used' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'favorites', label: 'Favorites First' }
  ];

  // Function to generate time string
  const getTimeString = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  // Function to update activities
  const updateActivities = async () => {
    try {
      setIsLoading(prev => ({ ...prev, activities: true }));
      setErrors(prev => ({ ...prev, activities: undefined }));

      const newActivities: Activity[] = [];

      // Add hiring activities
      if (hiringStats.weeklyChange > 0) {
        newActivities.push({
          id: generateUniqueId('hiring'),
          type: 'hiring',
          message: `${hiringStats.weeklyChange} new job applications received`,
          time: getTimeString(new Date(Date.now() - Math.random() * 3600000)),
        });
      }

      // Add automation activities
      automationStats.recentAutomations.forEach((automation) => {
        newActivities.push({
          id: generateUniqueId('automation'),
          type: automation.type,
          message: `${automation.name} automation ${automation.status === 'active' ? 'running' : 'scheduled'}`,
          time: getTimeString(new Date(Date.now() - Math.random() * 7200000)),
          status: automation.status,
        });
      });

      // Add task completion activities
      onboardingTasks
        .filter(task => task.completed)
        .forEach((task) => {
          newActivities.push({
            id: generateUniqueId('task'),
            type: 'operations',
            message: `Task completed: ${task.task}`,
            time: getTimeString(new Date(Date.now() - Math.random() * 86400000)),
          });
        });

      // Sort by time
      const sortedActivities = [...newActivities].sort((a, b) => {
        const timeA = getMinutesFromTimeString(a.time);
        const timeB = getMinutesFromTimeString(b.time);
        return timeB - timeA; // Most recent first
      });

      setActivities(sortedActivities);
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        activities: error instanceof Error ? error.message : 'Failed to update activities' 
      }));
    } finally {
      setIsLoading(prev => ({ ...prev, activities: false }));
    }
  };

  // Helper function to parse time strings
  const getMinutesFromTimeString = (timeString: string): number => {
    const timeMatch = timeString.match(/(\d+)\s*(minutes?|hours?|days?)/);
    if (!timeMatch) return 0;

    const value = parseInt(timeMatch[1]);
    const unit = timeMatch[2];

    if (unit.startsWith('minute')) return value;
    if (unit.startsWith('hour')) return value * 60;
    if (unit.startsWith('day')) return value * 24 * 60;
    return 0;
  };

  // Update activities periodically
  useEffect(() => {
    updateActivities();
    const interval = setInterval(updateActivities, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [hiringStats, automationStats, onboardingTasks]);

  // Replace the static allActivity array with the dynamic activities state
  const displayedActivity = showAllActivity ? activities : activities.slice(0, 4);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHiringStats(prev => ({
        ...prev,
        totalApplicants: prev.totalApplicants + Math.floor(Math.random() * 3),
        weeklyChange: prev.weeklyChange + Math.random() * 2,
        activeJobs: prev.activeJobs + (Math.random() > 0.8 ? 1 : 0),
        timeToHire: Math.max(15, prev.timeToHire + (Math.random() > 0.5 ? 1 : -1)),
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<{id: string, message: string}[]>([]);

  const quickStats: QuickStat[] = [
    { 
      label: 'Agents Configured', 
      value: `${automationStats.agentsConfigured}%`, 
      change: `${automationStats.activeWorkflows} active workflows`, 
      trend: 'up', 
      icon: Bot,
      tooltip: 'Percentage of AI agents that are fully configured and active',
      notifyThreshold: 80
    },
    { 
      label: 'Active Automations', 
      value: automationStats.totalAutomations.toString(), 
      change: '+3 this week', 
      trend: 'up', 
      icon: Zap,
      tooltip: 'Number of automated workflows currently running',
      notifyThreshold: 10
    },
    { 
      label: 'Response Time', 
      value: '2.5m', 
      change: '-30s from last week', 
      trend: 'up', 
      icon: Clock,
      tooltip: 'Average time taken for AI agents to respond to requests',
      notifyThreshold: 2
    },
    { 
      label: 'Success Rate', 
      value: '94.2%', 
      change: '+2.4% this month', 
      trend: 'up', 
      icon: BarChart2,
      tooltip: 'Percentage of successful task completions by AI agents',
      notifyThreshold: 95
    }
  ];

  // Check metrics and create notifications
  useEffect(() => {
    const newNotifications = [];
    
    // Check agents configured
    if (automationStats.agentsConfigured >= quickStats[0].notifyThreshold!) {
      newNotifications.push({
        id: 'agents-configured',
        message: `${automationStats.agentsConfigured}% of agents are now configured - Great job!`
      });
    }

    // Check response time
    const responseTime = parseFloat('2.5');
    if (responseTime <= quickStats[2].notifyThreshold!) {
      newNotifications.push({
        id: 'response-time',
        message: 'Response time has improved to 2.5m - Performance target achieved!'
      });
    }

    // Check success rate
    const successRate = 94.2;
    if (successRate >= quickStats[3].notifyThreshold!) {
      newNotifications.push({
        id: 'success-rate',
        message: 'Success rate has reached 94.2% - Exceeding expectations!'
      });
    }

    setNotifications(newNotifications);
  }, [automationStats]);

  const shortcuts = [
    { id: 'post-job', icon: UserPlus, label: 'Post New Job', path: '/hiring', color: 'bg-emerald-100 text-emerald-600' },
    { id: 'send-followup', icon: Send, label: 'Send Follow-Up', path: '/sales', color: 'bg-blue-100 text-blue-600' },
    { id: 'run-campaign', icon: Megaphone, label: 'Run Campaign', path: '/marketing', color: 'bg-purple-100 text-purple-600' },
    { id: 'view-automations', icon: Cog, label: 'View Automations', path: '/operations', color: 'bg-orange-100 text-orange-600' },
    { id: 'chat', icon: MessageSquare, label: 'Open Chat', path: '/chat', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings', color: 'bg-gray-100 text-gray-600' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>({ title: '', content: '', action: () => {} });

  const handleShortcutClick = (path: string) => {
    navigate(path);
  };

  const handleActionClick = (actionId: string) => {
    const action = recommendedActions.find(a => a.id === actionId);
    if (!action) return;

    switch (action.type) {
      case 'marketing':
        setShowModal(true);
        setModalContent({
          title: 'Connect Facebook',
          content: 'Connect your Facebook Business account to enable automated campaign management and performance tracking.',
          action: () => {
            setRecommendedActions(prev => 
              prev.map(a => a.id === actionId ? { ...a, completed: true } : a)
            );
            setShowModal(false);
            navigate('/marketing');
          }
        });
        break;
      case 'hiring':
        setShowModal(true);
        setModalContent({
          title: 'Enable Automated Screening',
          content: 'Activate AI-powered candidate screening to automatically evaluate resumes and rank candidates based on job requirements.',
          action: () => {
            setRecommendedActions(prev => 
              prev.map(a => a.id === actionId ? { ...a, completed: true } : a)
            );
            setShowModal(false);
            navigate('/hiring');
          }
        });
        break;
      case 'sales':
        setShowModal(true);
        setModalContent({
          title: 'Configure Follow-up Sequences',
          content: 'Set up automated email sequences to nurture leads and improve conversion rates.',
          action: () => {
            setRecommendedActions(prev => 
              prev.map(a => a.id === actionId ? { ...a, completed: true } : a)
            );
            setShowModal(false);
            navigate('/sales');
          }
        });
        break;
    }
  };

  // Update the activity state management
  const [activityFilter, setActivityFilter] = useState<ActivityType>('all');
  const [activityPeriod, setActivityPeriod] = useState<ActivityPeriod>('24h');

  // Update the ActivityContext value
  <ActivityContext.Provider 
    value={{
      activityFilters: {
        type: activityFilter,
        period: activityPeriod
      },
      setActivityFilters: (value) => {
        if (typeof value === 'function') {
          const newValue = value({ type: activityFilter, period: activityPeriod });
          setActivityFilter(newValue.type);
          setActivityPeriod(newValue.period);
        } else {
          setActivityFilter(value.type);
          setActivityPeriod(value.period);
        }
      }
    }}
  >
    {/* Component content */}
  </ActivityContext.Provider>

  // Load completed tasks from localStorage
  useEffect(() => {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    setOnboardingTasks(prev =>
      prev.map(task => ({
        ...task,
        completed: completedTasks.includes(task.id)
      }))
    );
  }, []);

  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Add your refresh logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // Update activities with new data
    } catch (error) {
      console.error('Error refreshing activities:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filterActivities = (activities: Activity[]) => {
    return activities.filter(activity => {
      // Filter by type
      if (activityFilter !== 'all' && activity.type !== activityFilter) {
        return false;
      }

      // Filter by time period
      const activityTime = new Date(activity.time).getTime();
      const now = Date.now();
      const periodInMs = {
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000,
        'all': Infinity
      }[activityPeriod];

      return now - activityTime <= periodInMs;
    });
  };

  // Enhanced search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const query = e.target.value.toLowerCase();
      setSearchQuery(query);

      if (!query) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      const results: SearchResult[] = [];

      // Search in quick actions
      quickActions.forEach(action => {
        if (
          action.title.toLowerCase().includes(query) ||
          action.description.toLowerCase().includes(query)
        ) {
          results.push({
            type: 'action',
            title: action.title,
            description: action.description,
            icon: action.icon,
            path: action.path
          });
        }
      });

      // Search in automations
      automationStats.recentAutomations.forEach(automation => {
        if (automation.name.toLowerCase().includes(query)) {
          results.push({
            type: 'automation',
            title: automation.name,
            description: `${automation.type} automation - ${automation.status}`,
            icon: Zap
          });
        }
      });

      // Search in tasks
      onboardingTasks.forEach(task => {
        if (task.task.toLowerCase().includes(query)) {
          results.push({
            type: 'task',
            title: task.task,
            description: task.description,
            icon: task.completed ? CheckCircle2 : Circle,
            action: () => handleTaskCompletion(task.id)
          });
        }
      });

      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle filter toggle
  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const [showAutomationsModal, setShowAutomationsModal] = useState(false);
  const [selectedAutomation, setSelectedAutomation] = useState<AutomationDetail | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Enhanced activity view with pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filterActivities(activities).length / ITEMS_PER_PAGE);
  
  const paginatedActivities = filterActivities(activities).slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Function to handle automation click
  const handleAutomationClick = (automation: AutomationDetail) => {
    setSelectedAutomation(automation);
    setShowAutomationsModal(true);
  };

  // Add new state for agent highlights and notifications
  const [agentHighlights, setAgentHighlights] = useState<AgentHighlight[]>([
    {
      agentType: 'sales',
      title: 'Sales Performance',
      metric: '127%',
      change: '+27% this month',
      trend: 'up',
      icon: DollarSign,
      color: 'emerald'
    },
    {
      agentType: 'hiring',
      title: 'Hiring Efficiency',
      metric: '85%',
      change: '+15% this week',
      trend: 'up',
      icon: UserCheck,
      color: 'yellow'
    },
    {
      agentType: 'marketing',
      title: 'Campaign ROI',
      metric: '3.2x',
      change: '+0.8x this quarter',
      trend: 'up',
      icon: Target,
      color: 'purple'
    },
    {
      agentType: 'operations',
      title: 'Process Automation',
      metric: '92%',
      change: '+12% this month',
      trend: 'up',
      icon: Settings,
      color: 'blue'
    }
  ]);

  const [notificationHub, setNotificationHub] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'success',
      title: 'Sales Target Achieved',
      message: 'Monthly sales target exceeded by 27%',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      agentType: 'sales',
      actionUrl: '/sales'
    },
    {
      id: '2',
      type: 'info',
      title: 'New Candidate Applications',
      message: '5 new candidates applied for Senior Developer position',
      timestamp: new Date(Date.now() - 7200000),
      read: false,
      agentType: 'hiring',
      actionUrl: '/hiring'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Marketing Campaign Update',
      message: 'Social media campaign requires attention',
      timestamp: new Date(Date.now() - 10800000),
      read: true,
      agentType: 'marketing',
      actionUrl: '/marketing'
    }
  ]);

  const [showNotificationHub, setShowNotificationHub] = useState(false);

  // Function to mark notification as read
  const markNotificationAsRead = (notificationId: string) => {
    setNotificationHub(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Function to mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotificationHub(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const [metrics, setMetrics] = useState<QuickStat[]>([
    {
      label: 'Response Time',
      value: '1.2s',
      change: '-15%',
      trend: 'down',
      icon: Clock,
      tooltip: 'Average time taken to respond to user requests',
      notifyThreshold: 2.0
    },
    {
      label: 'Active Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      tooltip: 'Number of users currently active on the platform',
      notifyThreshold: 1000
    },
    {
      label: 'Tasks Completed',
      value: '847',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle2,
      tooltip: 'Total number of tasks completed across all workflows',
      notifyThreshold: 500
    },
    {
      label: 'System Health',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Activity,
      tooltip: 'Overall system uptime and performance',
      notifyThreshold: 98
    }
  ]);

  // Handle metric click
  const handleMetricClick = (label: string) => {
    const routes: Record<string, string> = {
      'Agents Configured': '/settings/agents',
      'Active Automations': '/operations/automations',
      'Response Time': '/metrics/performance',
      'Success Rate': '/metrics/overview'
    };
    navigate(routes[label] || '/metrics');
  };

  // Handle action dismissal
  const handleDismissAction = (actionId: string) => {
    setRecommendedActions(prev => prev.filter(action => action.id !== actionId));
  };

  const QuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {quickStats.map((stat) => (
        <Card key={`stat-${stat.label}`}>
          <div className="p-4 relative">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <Tooltip content={stat.tooltip} className="inline-block">
                <div className="cursor-help">
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </div>
              </Tooltip>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className={`text-sm ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  // Modal states
  const [modalStates, setModalStates] = useState<ModalStates>({
    automations: false,
    activity: false,
    settings: false,
    help: false
  });

  const closeAllModals = useCallback(() => {
    setModalStates({
      automations: false,
      activity: false,
      settings: false,
      help: false
    });
    setSelectedAutomation(null);
  }, []);

  // Add escape key handler for modals
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllModals();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [closeAllModals]);

  // Add proper loading states
  const [isLoading, setIsLoading] = useState({
    activities: false,
    automations: false,
    search: false
  });

  // Add error handling for data fetching
  const [errors, setErrors] = useState<{
    activities?: string;
    automations?: string;
    search?: string;
  }>({});

  // Add task completion handler
  const handleTaskCompletion = (taskId: number) => {
    setOnboardingTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Add the Select components back
  const ActivityTypeSelect = () => {
    const { activityFilters, setActivityFilters } = useContext(ActivityContext);
    
    const handleChange = (value: string) => {
      const activityType = value as ActivityType;
      setActivityFilters(prev => ({ ...prev, type: activityType }));
    };

    return (
      <Select
        value={activityFilters.type}
        onChange={handleChange}
        options={activityTypeOptions}
        placeholder="Filter by type"
        className="min-w-[150px]"
      />
    );
  };

  const ActivityPeriodSelect = () => {
    const { activityFilters, setActivityFilters } = useContext(ActivityContext);
    
    const handleChange = (value: string) => {
      const periodType = value as ActivityPeriod;
      setActivityFilters(prev => ({ ...prev, period: periodType }));
    };

    return (
      <Select
        value={activityFilters.period}
        onChange={handleChange}
        options={activityPeriodOptions}
        placeholder="Filter by period"
        className="min-w-[150px]"
      />
    );
  };

  // Add the getTaskRoute function
  const getTaskRoute = (taskId: number): string => {
    const task = onboardingTasks.find(t => t.id === taskId);
    if (!task) return '/';
    return taskRoutes[task.task] || '/';
  };

  return (
    <ActivityContext.Provider value={{ activityFilters: { type: activityFilter, period: activityPeriod }, setActivityFilters: (value) => {
      if (typeof value === 'function') {
        const newValue = value({ type: activityFilter, period: activityPeriod });
        setActivityFilter(newValue.type);
        setActivityPeriod(newValue.period);
      } else {
        setActivityFilter(value.type);
        setActivityPeriod(value.period);
      }
    } }}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome back!</h1>
            <p className="text-gray-500">Here's what's happening across your workspace</p>
          </div>
        </div>

        {/* Search Bar */}
        <div ref={searchRef} className="relative">
          <Card>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search across all tools and resources..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <Card className="absolute w-full mt-2 z-50 max-h-96 overflow-y-auto">
              <div className="p-2 space-y-2">
                {isLoading.search ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Searching...</p>
                  </div>
                ) : errors.search ? (
                  <div className="text-center py-4">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-red-500">{errors.search}</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">No results found</p>
                  </div>
                ) : (
                  searchResults.map((result, index) => (
                    <div
                      key={`search-result-${index}-${result.title}`}
                      className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => {
                        if (result.path) {
                          navigate(result.path);
                        } else if (result.action) {
                          result.action();
                        }
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <result.icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{result.title}</h4>
                          <p className="text-xs text-gray-500">{result.description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          )}
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="space-y-2">
            {notifications.map(notification => (
              <Card key={`notification-${notification.id}`} className="bg-emerald-50 border-emerald-200">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-500" size={20} />
                    <p className="text-emerald-700">{notification.message}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Overview Metrics */}
        <QuickStats />

        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <div className="flex items-center gap-3">
              <ActivityTypeSelect />
              <ActivityPeriodSelect />
            </div>
          </div>
          <div className="space-y-4">
            {filterActivities(activities).length === 0 ? (
              <div className="text-center py-8">
                <div className="p-4 rounded-full bg-gray-100 inline-block mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">Your activity will appear here as you use CleanAgent.AI</p>
                <p className="text-sm text-gray-400 mb-4">Try different filters or start using our AI agents to see your activity</p>
                <Button
                  onClick={() => navigate('/chat')}
                  className="gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Get Started
                </Button>
              </div>
            ) : (
              filterActivities(activities).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      activity.type === 'sales' && "bg-blue-50 text-blue-600",
                      activity.type === 'hiring' && "bg-emerald-50 text-emerald-600",
                      activity.type === 'marketing' && "bg-purple-50 text-purple-600",
                      activity.type === 'operations' && "bg-orange-50 text-orange-600"
                    )}>
                      {activity.type === 'sales' && <DollarSign className="w-4 h-4" />}
                      {activity.type === 'hiring' && <Briefcase className="w-4 h-4" />}
                      {activity.type === 'marketing' && <Megaphone className="w-4 h-4" />}
                      {activity.type === 'operations' && <Settings className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  {activity.status && (
                    <Badge
                      variant={activity.status === 'success' ? 'success' : 'error'}
                    >
                      {activity.status}
                    </Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Getting Started */}
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">Getting Started</h2>
                <p className="text-sm text-gray-500">Complete these tasks to set up your workspace</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{setupProgress}% Complete</div>
                <div className="text-xs text-gray-500">
                  {onboardingTasks.filter(t => t.completed).length} of {onboardingTasks.length} tasks done
                </div>
              </div>
            </div>
            
            <div className="relative w-full h-2 bg-gray-100 rounded-full mb-6">
              <div 
                className="absolute left-0 top-0 h-full bg-blue-600 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${setupProgress}%` }}
              />
            </div>

            <div className="space-y-4">
              {onboardingTasks.map(task => (
                <div 
                  key={`task-${task.id}`} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    task.completed ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                        task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                      onClick={() => handleTaskCompletion(task.id)}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className={`font-medium ${task.completed ? 'text-gray-500' : 'text-gray-900'}`}>
                        {task.task}
                      </h3>
                      <p className="text-sm text-gray-500">{task.description}</p>
                    </div>
                  </div>
                  {!task.completed && (
                    <Button 
                      size="sm"
                      onClick={() => navigate(getTaskRoute(task.id))}
                      className="flex items-center gap-2"
                    >
                      Start Task
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {getNextTask() && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900">Next Recommended Task</h3>
                <p className="text-sm text-blue-700 mt-1">{getNextTask()?.description}</p>
                <Button 
                  className="mt-3 flex items-center gap-2"
                  size="sm"
                  onClick={() => navigate(getTaskRoute(getNextTask()?.id || 0))}
                >
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map(action => (
                <Tooltip key={`action-${action.id}`} content={action.tooltip}>
                  <div className="relative group">
                    <Card className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
                      <div 
                        className="p-4 flex items-center gap-3 cursor-pointer"
                        onClick={() => navigate(action.path)}
                      >
                        <div className={cn(
                          "p-2 rounded-lg",
                          action.category === 'hiring' && "bg-emerald-50 text-emerald-600",
                          action.category === 'sales' && "bg-blue-50 text-blue-600",
                          action.category === 'marketing' && "bg-purple-50 text-purple-600",
                          action.category === 'operations' && "bg-orange-50 text-orange-600",
                          action.category === 'communication' && "bg-yellow-50 text-yellow-600",
                          action.category === 'analytics' && "bg-gray-50 text-gray-600"
                        )}>
                          <action.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{action.title}</h3>
                          <p className="text-sm text-gray-500">{action.description}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </Card>

        {/* Recent Automations */}
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">Recent Automations</h2>
                <p className="text-sm text-gray-500">Monitor your active automation workflows</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/operations/automations')}
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {isLoading.automations ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4" />
                  <p className="text-gray-500">Loading automations...</p>
                </div>
              ) : errors.automations ? (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                  <p className="text-red-500">{errors.automations}</p>
                </div>
              ) : automationStats.recentAutomations.length === 0 ? (
                <div className="text-center py-8">
                  <Zap className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No recent automations</p>
                </div>
              ) : (
                automationStats.recentAutomations.map(automation => (
                  <Card key={`automation-${automation.id}`} className="hover:shadow-md transition-shadow">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            automation.type === 'sales' ? 'bg-emerald-50 text-emerald-600' :
                            automation.type === 'marketing' ? 'bg-purple-50 text-purple-600' :
                            automation.type === 'hiring' ? 'bg-blue-50 text-blue-600' :
                            'bg-orange-50 text-orange-600'
                          }`}>
                            <automation.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{automation.name}</h3>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge variant={automation.status === 'active' ? 'success' : 'warning'}>
                                {automation.status}
                              </Badge>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-500">
                                Last run: {automation.lastRun ? getTimeString(automation.lastRun) : 'Never'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">Success Rate</div>
                            <div className={`text-lg font-bold ${
                              automation.successRate >= 90 ? 'text-emerald-600' :
                              automation.successRate >= 75 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {automation.successRate}%
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Tooltip content="View details and analytics">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAutomationClick(automation)}
                              >
                                <BarChart2 className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Configure automation settings">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/operations/automations/${automation.id}/settings`)}
                              >
                                <Settings className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </Card>

        {/* Automation Details Modal */}
        {showAutomationsModal && selectedAutomation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      selectedAutomation.type === 'sales' ? 'bg-emerald-50 text-emerald-600' :
                      selectedAutomation.type === 'marketing' ? 'bg-purple-50 text-purple-600' :
                      selectedAutomation.type === 'hiring' ? 'bg-blue-50 text-blue-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      <selectedAutomation.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{selectedAutomation.name}</h2>
                      <p className="text-sm text-gray-500">{selectedAutomation.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAutomationsModal(false);
                      setSelectedAutomation(null);
                    }}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card>
                    <div className="p-4">
                      <div className="text-sm text-gray-500">Success Rate</div>
                      <div className={`text-2xl font-bold ${
                        selectedAutomation.successRate >= 90 ? 'text-emerald-600' :
                        selectedAutomation.successRate >= 75 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedAutomation.successRate}%
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="p-4">
                      <div className="text-sm text-gray-500">Last Run</div>
                      <div className="text-lg font-medium">
                        {selectedAutomation.lastRun ? getTimeString(selectedAutomation.lastRun) : 'Never'}
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="p-4">
                      <div className="text-sm text-gray-500">Next Run</div>
                      <div className="text-lg font-medium">
                        {selectedAutomation.nextRun ? getTimeString(selectedAutomation.nextRun) : 'Not scheduled'}
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Performance History</h3>
                    <div className="h-48 bg-gray-50 rounded-lg p-4">
                      <div className="text-center text-gray-400">
                        Performance chart will be displayed here
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Activity</h3>
                    <div className="space-y-2">
                      {[
                        { message: 'Automation completed successfully', time: '2 hours ago', status: 'success' },
                        { message: 'Task processed: Send follow-up emails', time: '4 hours ago', status: 'success' },
                        { message: 'Automation started', time: '4 hours ago', status: 'info' }
                      ].map((item, i) => (
                        <div key={`activity-item-${i}`} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            {item.status === 'success' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Clock className="w-4 h-4 text-blue-500" />
                            )}
                            <span className="text-sm">{item.message}</span>
                          </div>
                          <span className="text-sm text-gray-500">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAutomationsModal(false);
                      setSelectedAutomation(null);
                    }}
                  >
                    Close
                  </Button>
                  <Button onClick={() => navigate(`/operations/automations/${selectedAutomation.id}/settings`)}>
                    Configure
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </ActivityContext.Provider>
  );
}