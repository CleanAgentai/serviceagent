import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart2, TrendingUp, TrendingDown, Users, DollarSign, Clock,
  ArrowUp, ArrowDown, Filter, Download, RefreshCw,
  Briefcase, Target, MessageSquare, Zap, Calendar,
  ChevronDown, Search, Share2, Settings, X, FileText,
  Table, Code, Loader2, ChevronRight, Plus, Save,
  AlertCircle, CheckCircle2, Bot, Info, ArrowRight
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Badge from '../components/common/Badge';
import Tooltip from '../components/common/Tooltip';
import { cn } from '../lib/utils';
import { SelectOption } from '../types/hiring';

interface MetricCard {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

interface Campaign {
  name: string;
  type: string;
  status: 'active' | 'planning' | 'completed';
  budget: number;
}

interface ExportFormat {
  value: 'csv' | 'excel' | 'pdf' | 'json';
  label: string;
  icon: React.ElementType;
}

interface HiringStageDetails {
  stage: string;
  count: number;
  candidates: Array<{
    id: string;
    name: string;
    position: string;
    timeInStage: number;
    score: number;
    lastActivity: Date;
  }>;
  avgTimeInStage: number;
  conversionRate: number;
}

interface SalesDetails {
  category: string;
  data: {
    current: number;
    previous: number;
    change: number;
    breakdown: Array<{
      label: string;
      value: number;
      percentage: number;
    }>;
    trend: Array<{
      date: string;
      value: number;
    }>;
  };
}

interface MarketingCampaignDetails {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'planning' | 'completed';
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    roi: number;
  };
  channels: Array<{
    name: string;
    budget: number;
    performance: number;
  }>;
  targetAudience: string[];
  goals: string[];
}

interface WorkflowDetails {
  id: string;
  name: string;
  type: 'automated' | 'manual';
  status: 'active' | 'paused' | 'completed';
  efficiency: number;
  tasks: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  };
  lastRun: Date;
  nextRun: Date | null;
  averageTime: number;
}

interface CustomReport {
  id: string;
  name: string;
  description: string;
  metrics: string[];
  filters: Record<string, string>;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time?: string;
    day?: string;
  };
  lastRun?: Date;
}

interface AgentMetrics {
  id: string;
  name: string;
  type: 'sales' | 'marketing' | 'hiring' | 'operations';
  performance: {
    tasks: {
      completed: number;
      total: number;
      efficiency: number;
    };
    metrics: {
      key: string;
      value: number;
      change: number;
      target: number;
    }[];
    status: 'exceeding' | 'meeting' | 'below';
  };
  recommendations: {
    id: string;
    type: 'improvement' | 'alert' | 'achievement';
    message: string;
    priority: 'high' | 'medium' | 'low';
    action?: string;
  }[];
}

interface FilterState {
  department: string;
  status: string;
  source: string;
  agentType: string;
  performanceRange: string;
  teamMember: string;
  campaign: string;
}

interface DealOption {
  value: string;
  label: string;
}

interface NewDeal {
  name: string;
  value: number;
  stage: string;
  probability: number;
}

interface PeriodOption {
  value: string;
  label: string;
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterCategory {
  label: string;
  key: keyof FilterState;
  options: SelectOption[];
}

// Helper function to format numbers
const formatNumber = (value: number, options: { 
  decimals?: number;
  prefix?: string;
  suffix?: string;
} = {}) => {
  const { decimals = 0, prefix = '', suffix = '' } = options;
  return `${prefix}${value.toFixed(decimals)}${suffix}`;
};

// Helper function to format percentages
const formatPercentage = (value: number, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

// Helper function to format currency
const formatCurrency = (value: number, decimals = 0) => {
  return formatNumber(value, { decimals, prefix: '$' });
};

export default function Metrics() {
  // Period filter state
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Enhanced filter options
  const [filterOptions, setFilterOptions] = useState<FilterState>({
    department: 'all',
    status: 'all',
    source: 'all',
    agentType: 'all',
    performanceRange: 'all',
    teamMember: 'all',
    campaign: 'all'
  });

  // New states for details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  // Metrics state
  const [metrics, setMetrics] = useState({
    totalApplications: 248,
    weeklyChange: 12,
    activeJobs: 12,
    newJobs: 2,
    timeToHire: 18,
    timeToHireChange: -2,
    offerAcceptanceRate: 85.5,
    totalPipelineValue: 1250000,
    avgInterviewScore: 8.4,
    diversityRatio: 42,
    topSourceChannels: [
      { name: 'LinkedIn', value: 45 },
      { name: 'Company Website', value: 30 },
      { name: 'Referrals', value: 15 },
      { name: 'Job Boards', value: 10 }
    ],
    hiringProgress: {
      screening: 45,
      interviewing: 28,
      offering: 12,
      hired: 15
    }
  });

  // Sales metrics
  const [salesMetrics, setSalesMetrics] = useState({
    revenue: 850000,
    revenueChange: 15.2,
    deals: 24,
    dealsChange: 4,
    conversion: 32.5,
    conversionChange: 2.8,
    avgDealSize: 35416,
    pipeline: 2500000,
    meetings: 45,
    meetingsChange: 8
  });

  // Marketing metrics
  const [marketingMetrics, setMarketingMetrics] = useState({
    leads: 156,
    leadsChange: 12.5,
    campaigns: 8,
    engagement: 24.8,
    engagementChange: 3.2,
    roi: 285,
    roiChange: 15.5,
    websiteTraffic: 25400,
    socialReach: 85000,
    totalBudget: 100000,
    spentBudget: 45000,
    remainingBudget: 55000,
    activeCampaigns: [
      { name: 'Q4 Product Launch', type: 'Social Media Campaign', status: 'active', budget: 25000 },
      { name: 'Email Nurture Series', type: 'Lead Nurturing', status: 'active', budget: 15000 },
      { name: 'Website Optimization', type: 'Conversion Rate Optimization', status: 'planning', budget: 5000 }
    ] as Campaign[]
  });

  // Operations metrics
  const [operationsMetrics, setOperationsMetrics] = useState({
    activeWorkflows: 12,
    automationRate: 75,
    efficiency: 92.5,
    efficiencyChange: 4.2,
    taskCompletion: 88,
    responseTime: 2.5,
    uptime: 99.9
  });

  // New campaign state
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: '',
    status: 'planning',
    budget: 0,
    startDate: '',
    endDate: '',
    description: '',
    goals: '',
    targetAudience: '',
    channels: [] as string[]
  });

  // Export state
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [selectedExportFormat, setSelectedExportFormat] = useState<ExportFormat['value']>('csv');
  const [isExporting, setIsExporting] = useState(false);

  // New states for enhanced drill-down
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedSalesMetric, setSelectedSalesMetric] = useState<string | null>(null);
  const [showStageDetails, setShowStageDetails] = useState(false);
  const [showSalesDetails, setShowSalesDetails] = useState(false);

  // New states for marketing campaign details
  const [selectedCampaignMetrics, setSelectedCampaignMetrics] = useState<string[]>([]);
  const [showWorkflowDetails, setShowWorkflowDetails] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [showBudgetAdjustment, setShowBudgetAdjustment] = useState(false);

  // New states for custom reports
  const [customReports, setCustomReports] = useState<CustomReport[]>([]);
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [newReport, setNewReport] = useState<Partial<CustomReport>>({
    metrics: [],
    filters: {}
  });

  // Agent metrics state
  const [agentMetrics, setAgentMetrics] = useState<AgentMetrics[]>([
    {
      id: '1',
      name: 'Sales Agent',
      type: 'sales',
      performance: {
        tasks: {
          completed: 45,
          total: 50,
          efficiency: 90
        },
        metrics: [
          {
            key: 'Revenue Generated',
            value: 125000,
            change: 15,
            target: 100000
          },
          {
            key: 'Deals Closed',
            value: 12,
            change: 2,
            target: 10
          }
        ],
        status: 'exceeding'
      },
      recommendations: [
        {
          id: '1',
          type: 'achievement',
          message: 'Exceeded revenue target by 25%',
          priority: 'high'
        },
        {
          id: '2',
          type: 'improvement',
          message: 'Consider focusing on larger deal sizes',
          priority: 'medium',
          action: 'Review deal qualification criteria'
        }
      ]
    }
  ]);

  // Add new state variables for custom date range and report scheduling
  const [reportSchedule, setReportSchedule] = useState({
    frequency: 'weekly',
    day: 'Monday',
    time: '09:00',
    email: ''
  });

  // Add Deal state and handler
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [newDeal, setNewDeal] = useState<NewDeal>({
    name: '',
    value: 0,
    stage: 'prospect',
    probability: 50
  });

  const dealStageOptions: DealOption[] = [
    { value: 'prospect', label: 'Prospect' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' }
  ];

  const handleAddDeal = () => {
    if (!newDeal.name || newDeal.value <= 0) return;
    
    setSalesMetrics(prev => ({
      ...prev,
      deals: prev.deals + 1,
      pipeline: prev.pipeline + newDeal.value,
      revenue: prev.revenue + (newDeal.value * (newDeal.probability / 100))
    }));

    setShowAddDealModal(false);
    setNewDeal({
      name: '',
      value: 0,
      stage: 'prospect',
      probability: 50
    });
  };

  const periodOptions: SelectOption[] = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '12m', label: 'Last 12 months' }
  ];

  const filterCategories: FilterCategory[] = [
    {
      label: 'Department',
      key: 'department',
      options: [
        { value: 'all', label: 'All Departments' },
        { value: 'sales', label: 'Sales' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'operations', label: 'Operations' },
        { value: 'hiring', label: 'Hiring' }
      ]
    },
    {
      label: 'Status',
      key: 'status',
      options: [
        { value: 'all', label: 'All Statuses' },
        { value: 'active', label: 'Active' },
        { value: 'completed', label: 'Completed' },
        { value: 'planning', label: 'Planning' }
      ]
    },
    {
      label: 'Agent Type',
      key: 'agentType',
      options: [
        { value: 'all', label: 'All Agents' },
        { value: 'sales', label: 'Sales Agent' },
        { value: 'marketing', label: 'Marketing Agent' },
        { value: 'hiring', label: 'Hiring Agent' },
        { value: 'operations', label: 'Operations Agent' }
      ]
    }
  ];

  // Handle period change
  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    setShowCustomDatePicker(false);
    refreshMetrics();
  };

  // Handle filter change
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      [key]: value
    }));
    refreshMetrics();
  };

  // Toggle filters panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Apply filters
  const applyFilters = () => {
    refreshMetrics();
    setShowFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterOptions({
      department: 'all',
      status: 'all',
      source: 'all',
      agentType: 'all',
      performanceRange: 'all',
      teamMember: 'all',
      campaign: 'all'
    });
    refreshMetrics();
  };

  // Filter metrics based on current filters
  const getFilteredMetrics = () => {
    let filteredMetrics = {
      hiring: { ...metrics },
      sales: { ...salesMetrics },
      marketing: { ...marketingMetrics },
      operations: { ...operationsMetrics }
    };

    // Apply department filter
    if (filterOptions.department !== 'all') {
      const dept = filterOptions.department;
      filteredMetrics = {
        ...filteredMetrics,
        [dept]: filteredMetrics[dept as keyof typeof filteredMetrics]
      };
    }

    // Apply status filter
    if (filterOptions.status !== 'all') {
      if (filterOptions.status === 'active') {
        filteredMetrics.marketing.activeCampaigns = filteredMetrics.marketing.activeCampaigns.filter(
          campaign => campaign.status === 'active'
        );
      }
    }

    // Apply performance range filter
    if (filterOptions.performanceRange !== 'all') {
      const range = parseInt(filterOptions.performanceRange);
      if (range > 0) {
        filteredMetrics.operations = {
          ...filteredMetrics.operations,
          efficiency: filteredMetrics.operations.efficiency >= range ? filteredMetrics.operations.efficiency : 0
        };
      }
    }

    return filteredMetrics;
  };

  // Update metrics when filters change
  useEffect(() => {
    const filteredData = getFilteredMetrics();
    
    if (filterOptions.department === 'all' || filterOptions.department === 'hiring') {
      setMetrics(filteredData.hiring);
    }
    if (filterOptions.department === 'all' || filterOptions.department === 'sales') {
      setSalesMetrics(filteredData.sales);
    }
    if (filterOptions.department === 'all' || filterOptions.department === 'marketing') {
      setMarketingMetrics(filteredData.marketing);
    }
    if (filterOptions.department === 'all' || filterOptions.department === 'operations') {
      setOperationsMetrics(filteredData.operations);
    }
  }, [filterOptions]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      refreshMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update metrics with new values
    setMetrics(prev => ({
      ...prev,
      totalApplications: prev.totalApplications + Math.floor(Math.random() * 3),
      weeklyChange: prev.weeklyChange + Math.floor(Math.random() * 2),
      activeJobs: prev.activeJobs + (Math.random() > 0.8 ? 1 : 0),
      timeToHire: Math.max(15, prev.timeToHire + (Math.random() > 0.5 ? 1 : -1))
    }));

    setSalesMetrics(prev => ({
      ...prev,
      revenue: prev.revenue + Math.floor(Math.random() * 10000),
      deals: prev.deals + (Math.random() > 0.7 ? 1 : 0),
      conversion: Math.min(100, prev.conversion + (Math.random() > 0.5 ? 0.5 : -0.3))
    }));

    setMarketingMetrics(prev => ({
      ...prev,
      leads: prev.leads + Math.floor(Math.random() * 5),
      engagement: Math.min(100, prev.engagement + (Math.random() > 0.5 ? 0.3 : -0.2)),
      websiteTraffic: prev.websiteTraffic + Math.floor(Math.random() * 100)
    }));

    setOperationsMetrics(prev => ({
      ...prev,
      efficiency: Math.min(100, prev.efficiency + (Math.random() > 0.6 ? 0.2 : -0.1)),
      taskCompletion: Math.min(100, prev.taskCompletion + (Math.random() > 0.5 ? 0.5 : -0.3))
    }));

    setIsRefreshing(false);
  };

  // Update the metrics display with proper formatting
  const displayMetrics = {
    hiring: [
      {
        label: 'Total Applications',
        value: metrics.totalApplications,
        change: `${formatPercentage(metrics.weeklyChange)}%`,
        trend: metrics.weeklyChange > 0 ? 'up' : 'down',
        icon: Users,
        color: 'text-emerald-500'
      },
      {
        label: 'Time to Hire',
        value: `${metrics.timeToHire} days`,
        change: `${formatPercentage(metrics.timeToHireChange)}%`,
        trend: metrics.timeToHireChange < 0 ? 'up' : 'down',
        icon: Clock,
        color: 'text-blue-500'
      },
      {
        label: 'Offer Acceptance',
        value: `${formatPercentage(metrics.offerAcceptanceRate)}%`,
        change: '+2.5%',
        trend: 'up',
        icon: CheckCircle2,
        color: 'text-purple-500'
      }
    ],
    sales: [
      {
        label: 'Revenue',
        value: `${formatCurrency(salesMetrics.revenue)}`,
        change: `${formatPercentage(salesMetrics.revenueChange)}%`,
        trend: salesMetrics.revenueChange > 0 ? 'up' : 'down',
        icon: DollarSign,
        color: 'text-emerald-500'
      },
      {
        label: 'Conversion Rate',
        value: `${formatPercentage(salesMetrics.conversion)}%`,
        change: `${formatPercentage(salesMetrics.conversionChange)}%`,
        trend: salesMetrics.conversionChange > 0 ? 'up' : 'down',
        icon: Target,
        color: 'text-blue-500'
      }
    ],
    marketing: [
      {
        label: 'Lead Generation',
        value: marketingMetrics.leads,
        change: `${formatPercentage(marketingMetrics.leadsChange)}%`,
        trend: marketingMetrics.leadsChange > 0 ? 'up' : 'down',
        icon: Target,
        color: 'text-purple-500'
      },
      {
        label: 'Engagement Rate',
        value: `${formatPercentage(marketingMetrics.engagement)}%`,
        change: `${formatPercentage(marketingMetrics.engagementChange)}%`,
        trend: marketingMetrics.engagementChange > 0 ? 'up' : 'down',
        icon: MessageSquare,
        color: 'text-blue-500'
      }
    ]
  };

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Add your refresh logic here
      // For example: await fetchMetrics();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    } catch (error) {
      console.error('Error refreshing metrics:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            options={periodOptions}
            className="w-40"
          />
          <Button
            variant="outline"
            onClick={toggleFilters}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={refreshMetrics}
          className="flex items-center gap-2"
          disabled={isRefreshing}
        >
          <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-3 gap-4">
            {filterCategories.map(category => (
              <div key={category.key} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {category.label}
                </label>
                <Select
                  value={filterOptions[category.key]}
                  onChange={(value) => handleFilterChange(category.key, value)}
                  options={category.options}
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
            <Button onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(displayMetrics).map(([category, metrics]) => (
          <div key={category} className="space-y-6">
            <h2 className="text-lg font-semibold capitalize">{category} Metrics</h2>
            <div className="grid gap-4">
              {metrics.map((metric, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{metric.label}</span>
                    <metric.icon className={cn("w-5 h-5", metric.color)} />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{metric.value}</span>
                    <span className={cn(
                      "text-sm",
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    )}>
                      {metric.trend === 'up' ? '+' : ''}{metric.change}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedMetric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Detailed Analytics</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetailsModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {/* Modal content */}
            </div>
          </Card>
        </div>
      )}

      {/* Report Builder Modal */}
      {showReportBuilder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Create Custom Report</h2>
              {/* Add report builder form */}
            </div>
          </Card>
        </div>
      )}

      {/* Add Deal Modal */}
      {showAddDealModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add New Deal</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddDealModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Deal Name</label>
                  <Input
                    value={newDeal.name}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter deal name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Deal Value</label>
                  <Input
                    type="number"
                    value={newDeal.value}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                    placeholder="Enter deal value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stage</label>
                  <Select<string>
                    value={{ value: newDeal.stage, label: newDeal.stage.charAt(0).toUpperCase() + newDeal.stage.slice(1) }}
                    onChange={(selected) => {
                      if (selected && !Array.isArray(selected)) {
                        setNewDeal(prev => ({ ...prev, stage: selected.value }));
                      }
                    }}
                    options={dealStageOptions}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Win Probability (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={newDeal.probability}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, probability: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) }))}
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddDealModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddDeal}
                    disabled={!newDeal.name || newDeal.value <= 0}
                  >
                    Add Deal
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}