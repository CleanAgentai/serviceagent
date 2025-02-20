import React, { useState, useEffect, useRef } from 'react';
import { 
  DollarSign, Users, TrendingUp, Calendar,
  BarChart2, Filter, Download, RefreshCw,
  Plus, Search, ChevronDown, MoreVertical,
  Phone, Mail, MessageSquare, Clock, Star,
  CheckCircle2, XCircle, AlertCircle, Target,
  ArrowUp, ArrowDown, Info, X, FileText, Table,
  Code, Loader2, Bot, ArrowUpRight, ArrowDownRight,
  ChevronRight, Tag, Building, Settings, Trash2,
  ChevronUp, Minus
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Badge from '../components/common/Badge';
import JSZip from 'jszip';
import { format } from 'date-fns';
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
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

// Custom hook for number animation
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * (end - startValue) + startValue));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

// Format number with commas
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface Deal {
  id: string;
  name: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  probability: number;
  company: string;
  contact: string;
  lastActivity: string;
  nextAction: string;
  dueDate: string;
  tags: string[];
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  metrics: {
    dealsClosed: number;
  revenue: number;
    avgDealSize: number;
    winRate: number;
    activities: {
      calls: number;
      emails: number;
      meetings: number;
    };
  };
  deals: Deal[];
}

interface SalesMetrics {
  revenue: number;
  deals: number;
  pipeline: number;
  conversion: number;
  avgDealSize: number;
  salesCycle: number;
  meetings: number;
  activities: number;
}

// Add new interfaces for export and deal details
interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  dateRange: string;
  includeMetrics: boolean;
  includePipeline: boolean;
  includeDeals: boolean;
}

interface DealDetails extends Deal {
  description: string;
  history: Array<{
    date: string;
    action: string;
    user: string;
    notes?: string;
  }>;
  tasks: Array<{
    id: string;
    title: string;
    dueDate: string;
    status: 'pending' | 'completed';
    assignee: string;
  }>;
  files: Array<{
    name: string;
    size: number;
    uploadedAt: string;
    uploadedBy: string;
  }>;
}

export default function Sales() {
  const navigate = useNavigate();

  // Time range state
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    stage: [] as string[],
    owner: [] as string[],
    source: [] as string[],
    value: [] as string[]
  });
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Deals state
  const [deals, setDeals] = useState<Deal[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<DealDetails | null>(null);
  const [showDealModal, setShowDealModal] = useState(false);
  const [newDeal, setNewDeal] = useState<Partial<Deal>>({});
  
  // Team performance state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [showTeamMemberModal, setShowTeamMemberModal] = useState(false);
  
  // Metrics state
  const [metrics, setMetrics] = useState<SalesMetrics>({
    revenue: 850000,
    deals: 45,
    pipeline: 2500000,
    conversion: 32.5,
    avgDealSize: 35416,
    salesCycle: 45,
    meetings: 120,
    activities: 450
  });

  // Export state
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    dateRange: '30d',
    includeMetrics: true,
    includePipeline: true,
    includeDeals: true
  });
  const [isExporting, setIsExporting] = useState(false);

  // Refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Agent interaction state
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agentCommand, setAgentCommand] = useState('');
  const [agentResponse, setAgentResponse] = useState('');
  const [isAgentProcessing, setIsAgentProcessing] = useState(false);

  // Deal details state
  const [showDealDetails, setShowDealDetails] = useState(false);

  // Sample data for pipeline stages
  const pipelineStages = [
    { name: 'Lead', value: 450000, count: 25, color: '#60A5FA' },
    { name: 'Qualified', value: 320000, count: 18, color: '#34D399' },
    { name: 'Proposal', value: 280000, count: 12, color: '#FBBF24' },
    { name: 'Negotiation', value: 150000, count: 8, color: '#F87171' },
    { name: 'Closed', value: 250000, count: 15, color: '#8B5CF6' }
  ];

  // Sample data for revenue trend
  const revenueTrend = [
    { month: 'Jan', revenue: 180000, target: 200000 },
    { month: 'Feb', revenue: 220000, target: 200000 },
    { month: 'Mar', revenue: 250000, target: 220000 },
    { month: 'Apr', revenue: 190000, target: 220000 },
    { month: 'May', revenue: 280000, target: 240000 },
    { month: 'Jun', revenue: 260000, target: 240000 }
  ];

  // New state for chat interface
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
  }>>([]);
  const [chatMode, setChatMode] = useState<'pipeline' | 'general'>('pipeline');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Enhanced filter state
  const [filterOptions, setFilterOptions] = useState({
    stage: 'all',
    dateRange: '7d',
    agent: 'all',
    dealValue: 'all'
  });

  // Loading states
  const [isLoadingDeals, setIsLoadingDeals] = useState(false);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  // Enhanced refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setIsLoadingMetrics(true);
    try {
      // Simulate API call to refresh metrics
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update metrics with new values
      setMetrics(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 50000),
        deals: prev.deals + Math.floor(Math.random() * 2),
        pipeline: prev.pipeline + Math.floor(Math.random() * 100000),
        conversion: Math.min(100, prev.conversion + (Math.random() > 0.5 ? 1 : -1)),
        avgDealSize: prev.avgDealSize + Math.floor(Math.random() * 1000)
      }));
    } finally {
      setIsRefreshing(false);
      setIsLoadingMetrics(false);
    }
  };

  // Enhanced deal search function
  const handleDealSearch = (query: string) => {
    setSearchQuery(query);
    setIsLoadingDeals(true);
    
    // Simulate API call for deal search
    setTimeout(() => {
      const filteredDeals = deals.filter(deal => 
        deal.name.toLowerCase().includes(query.toLowerCase()) ||
        deal.company.toLowerCase().includes(query.toLowerCase()) ||
        deal.stage.toLowerCase().includes(query.toLowerCase())
      );
      setDeals(filteredDeals);
      setIsLoadingDeals(false);
    }, 500);
  };

  // Chat functions
  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;

    const newMessage = {
      role: 'user' as const,
      content: chatMessage,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, newMessage]);
    setChatMessage('');

    // Simulate agent response
    setIsAgentProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const agentResponse = {
      role: 'agent' as const,
      content: `This is a simulated response to your question about ${chatMode === 'pipeline' ? 'the sales pipeline' : 'general sales information'}.`,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, agentResponse]);
    setIsAgentProcessing(false);
  };

  const handleClearChat = () => {
    setChatHistory([]);
    setChatMessage('');
  };

  // Pipeline stage click handler
  const handleStageClick = (stage: string) => {
    setShowDealDetails(true);
    // Load stage details...
  };

  useEffect(() => {
    // Load initial data
    loadSalesData();
  }, [selectedTimeRange, filters]);

  const loadSalesData = async () => {
    // Simulate API call
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update metrics with new random values
    setMetrics(prev => ({
      ...prev,
      revenue: prev.revenue + Math.floor(Math.random() * 50000),
      deals: prev.deals + Math.floor(Math.random() * 2),
      conversion: Math.min(100, prev.conversion + (Math.random() > 0.5 ? 1 : -1))
    }));

    setIsRefreshing(false);
  };

  // Add export function
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const data = {
        metrics: exportOptions.includeMetrics ? metrics : null,
        pipeline: exportOptions.includePipeline ? pipelineStages : null,
        deals: exportOptions.includeDeals ? deals : null
      };

      // Create export file based on format
      if (exportOptions.format === 'csv') {
        // Convert data to CSV
        const csv = convertToCSV(data);
        downloadFile(csv, 'sales_data.csv', 'text/csv');
      } else if (exportOptions.format === 'excel') {
        // Convert data to Excel
        const excel = await convertToExcel(data);
        downloadFile(excel, 'sales_data.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      } else {
        // Convert data to PDF
        const pdf = await convertToPDF(data);
        downloadFile(pdf, 'sales_data.pdf', 'application/pdf');
      }
    } finally {
      setIsExporting(false);
      setShowExportModal(false);
    }
  };

  // Add helper functions for export
  const convertToCSV = (data: any) => {
    // Implementation for CSV conversion
    return 'csv data';
  };

  const convertToExcel = async (data: any) => {
    // Implementation for Excel conversion
    return 'excel data';
  };

  const convertToPDF = async (data: any) => {
    // Implementation for PDF conversion
    return 'pdf data';
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add function to load deal details
  const loadDealDetails = async (dealId: string) => {
    // Simulate API call
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    // Simulate loading additional details
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSelectedDeal({
      ...deal,
      description: 'Detailed description of the deal...',
      history: [
        {
          date: '2024-03-15',
          action: 'Stage updated',
          user: 'John Smith',
          notes: 'Moved to negotiation stage after positive meeting'
        },
        {
          date: '2024-03-10',
          action: 'Email sent',
          user: 'Sarah Johnson',
          notes: 'Sent follow-up proposal'
        }
      ],
      tasks: [
        {
          id: '1',
          title: 'Schedule follow-up call',
          dueDate: '2024-03-20',
          status: 'pending',
          assignee: 'John Smith'
        },
        {
          id: '2',
          title: 'Send updated pricing',
          dueDate: '2024-03-18',
          status: 'completed',
          assignee: 'Sarah Johnson'
        }
      ],
      files: [
        {
          name: 'proposal.pdf',
          size: 2500000,
          uploadedAt: '2024-03-10',
          uploadedBy: 'Sarah Johnson'
        },
        {
          name: 'contract.docx',
          size: 1800000,
          uploadedAt: '2024-03-15',
          uploadedBy: 'John Smith'
        }
      ]
    });
    setShowDealDetails(true);
  };

  const handleAddDeal = () => {
    if (!newDeal.name || !newDeal.value) return;

      const deal: Deal = {
        id: Date.now().toString(),
        name: newDeal.name,
        value: Number(newDeal.value),
        stage: newDeal.stage || 'lead',
        probability: 20,
        company: newDeal.company || '',
        contact: newDeal.contact || '',
        lastActivity: new Date().toISOString(),
        nextAction: newDeal.nextAction || '',
        dueDate: newDeal.dueDate || new Date().toISOString().split('T')[0],
        tags: newDeal.tags || [],
      } as Deal;

    setDeals(prev => [...prev, deal]);
    setNewDeal({});
    setShowDealModal(false);
  };

  const handleAgentCommand = async () => {
    if (!agentCommand.trim()) return;
    
    setIsAgentProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate contextual response based on command
    let response = '';
    const command = agentCommand.toLowerCase();
    
    if (command.includes('pipeline')) {
      response = `Current pipeline status:\n- Total value: $${metrics.pipeline.toLocaleString()}\n- Active deals: ${metrics.deals}\n- Conversion rate: ${metrics.conversion}%`;
    } else if (command.includes('deal') || command.includes('opportunity')) {
      response = 'To create a new deal:\n1. Click "New Deal"\n2. Enter deal details\n3. Select stage\n4. Add company info\n5. Set follow-up tasks';
    } else if (command.includes('performance') || command.includes('metrics')) {
      response = `Sales performance metrics:\n- Revenue: $${metrics.revenue.toLocaleString()}\n- Avg deal size: $${metrics.avgDealSize.toLocaleString()}\n- Meetings scheduled: ${metrics.meetings}`;
    } else {
      response = 'I can help you with:\n- Pipeline management\n- Deal creation\n- Performance tracking\n- Sales forecasting';
    }
    
    setAgentResponse(response);
    setIsAgentProcessing(false);
    setAgentCommand('');
  };

  // Add minimize states
  const [isMinimizedChat, setIsMinimizedChat] = useState(false);
  const [isMinimizedDeal, setIsMinimizedDeal] = useState(false);
  const [isMinimizedDealDetails, setIsMinimizedDealDetails] = useState(false);

  const handleChatWithAgent = () => {
    navigate('/chat', { 
      state: { 
        agentType: 'sales',
        autoStart: true 
      }
    });
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Sales Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowExportModal(true)}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Tooltip content="Refresh metrics">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={cn(
                  'w-4 h-4',
                  isRefreshing && 'animate-spin'
                )} />
              </Button>
            </Tooltip>
            <Button
              onClick={handleChatWithAgent}
              className="gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Talk to Sales Agent
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6 p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Select
                label="Stage"
                value={filterOptions.stage}
                onChange={(value) => setFilterOptions(prev => ({ ...prev, stage: value }))}
                options={[
                  { value: 'all', label: 'All Stages' },
                  { value: 'lead', label: 'Lead' },
                  { value: 'qualified', label: 'Qualified' },
                  { value: 'proposal', label: 'Proposal' },
                  { value: 'negotiation', label: 'Negotiation' },
                  { value: 'closed', label: 'Closed' }
                ]}
              />
              <Select
                label="Date Range"
                value={filterOptions.dateRange}
                onChange={(value) => setFilterOptions(prev => ({ ...prev, dateRange: value }))}
                options={[
                  { value: '7d', label: 'Last 7 Days' },
                  { value: '30d', label: 'Last 30 Days' },
                  { value: '90d', label: 'Last Quarter' },
                  { value: 'ytd', label: 'Year to Date' }
                ]}
              />
              <Select
                label="Sales Agent"
                value={filterOptions.agent}
                onChange={(value) => setFilterOptions(prev => ({ ...prev, agent: value }))}
                options={[
                  { value: 'all', label: 'All Agents' },
                  { value: 'john', label: 'John Smith' },
                  { value: 'sarah', label: 'Sarah Johnson' }
                ]}
              />
              <Select
                label="Deal Value"
                value={filterOptions.dealValue}
                onChange={(value) => setFilterOptions(prev => ({ ...prev, dealValue: value }))}
                options={[
                  { value: 'all', label: 'All Values' },
                  { value: 'small', label: '< $10k' },
                  { value: 'medium', label: '$10k - $50k' },
                  { value: 'large', label: '> $50k' }
                ]}
              />
            </div>
          </Card>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <Tooltip content="Click for detailed pipeline analysis">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Pipeline Value</span>
                {isLoadingMetrics ? (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                ) : null}
              </div>
              <div className="text-2xl font-bold">
                ${formatNumber(metrics.pipeline)}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">12.5% vs last period</span>
              </div>
            </div>
          </Card>
        </Tooltip>

        <Tooltip content="View conversion rate trends">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Conversion Rate</span>
                {isLoadingMetrics ? (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                ) : null}
              </div>
              <div className="text-2xl font-bold">
                {metrics.conversion}%
              </div>
              <div className="mt-2 flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">2.3% vs last period</span>
              </div>
            </div>
          </Card>
        </Tooltip>

        <Tooltip content="Analyze average deal size history">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Average Deal Size</span>
                {isLoadingMetrics ? (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                ) : null}
              </div>
              <div className="text-2xl font-bold">
                ${formatNumber(metrics.avgDealSize)}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500">4.2% vs last period</span>
              </div>
            </div>
          </Card>
        </Tooltip>

        <Tooltip content="View sales cycle analytics">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Sales Cycle</span>
                {isLoadingMetrics ? (
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                ) : null}
              </div>
              <div className="text-2xl font-bold">
                {metrics.salesCycle} days
              </div>
              <div className="mt-2 flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-500">1.5 days faster</span>
              </div>
            </div>
          </Card>
        </Tooltip>
      </div>

      {/* Pipeline Stages */}
      <Card className="mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Pipeline Stages</h2>
          <div className="space-y-4">
            {pipelineStages.map(stage => (
              <div
                key={stage.name}
                className="cursor-pointer hover:bg-gray-50 rounded-lg p-3 transition-colors"
                onClick={() => handleStageClick(stage.name)}
              >
                <Tooltip content={`${stage.name}: ${stage.count} deals worth $${formatNumber(stage.value)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stage.name}</span>
                      <Badge variant="outline">{stage.count} deals</Badge>
                    </div>
                    <span className="text-gray-500">${formatNumber(stage.value)}</span>
                  </div>
                </Tooltip>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                    style={{ width: `${(stage.value / metrics.pipeline) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Deals Section */}
      <Card>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Deals</h2>
            <div className="flex items-center gap-4">
              <div className="w-64">
                <Input
                  icon={Search}
                  placeholder="Search deals..."
                  value={searchQuery}
                  onChange={(e) => handleDealSearch(e.target.value)}
                />
              </div>
              <Button onClick={() => setShowDealModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Deal
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Deal Name</th>
                  <th className="text-left py-3 px-4">Company</th>
                  <th className="text-left py-3 px-4">Stage</th>
                  <th className="text-right py-3 px-4">Value</th>
                  <th className="text-left py-3 px-4">Next Follow-Up</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoadingDeals ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
                    </td>
                  </tr>
                ) : deals.map(deal => (
                  <tr
                    key={deal.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">{deal.name}</td>
                    <td className="py-3 px-4">{deal.company}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          deal.stage === 'closed' ? 'success' :
                          deal.stage === 'negotiation' ? 'warning' :
                          'default'
                        }
                      >
                        {deal.stage}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      ${formatNumber(deal.value)}
                    </td>
                    <td className="py-3 px-4">
                      <Tooltip content={`Last activity: ${deal.lastActivity}`}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{deal.dueDate ? format(new Date(deal.dueDate), 'MMM d, yyyy') : 'No date set'}</span>
                        </div>
                      </Tooltip>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Chat Modal */}
      {showChat && (
        <div className={cn(
          "fixed bg-black bg-opacity-50 flex items-center justify-center z-50",
          isMinimizedChat ? "bottom-0 right-0 w-auto h-auto p-4" : "inset-0"
        )}>
          <Card className={cn(
            "w-full flex flex-col",
            isMinimizedChat ? "max-w-[300px] h-[60px]" : "max-w-2xl h-[80vh]"
          )}>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary-500" />
                <h2 className="font-semibold">Sales Assistant</h2>
              </div>
              <div className="flex items-center gap-2">
                {!isMinimizedChat && (
                  <Select
                    value={{ value: chatMode, label: chatMode === 'pipeline' ? 'Pipeline Questions' : 'General Questions' }}
                    onChange={(option) => {
                      if (option) {
                        setChatMode(option.value as 'pipeline' | 'general');
                      }
                    }}
                    options={[
                      { value: 'pipeline', label: 'Pipeline Questions' },
                      { value: 'general', label: 'General Questions' }
                    ]}
                    className="w-48"
                  />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimizedChat(!isMinimizedChat)}
                >
                  {isMinimizedChat ? <ChevronUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </Button>
                {!isMinimizedChat && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearChat}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowChat(false);
                    setIsMinimizedChat(false);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {!isMinimizedChat && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        'max-w-[80%] rounded-lg p-3',
                        message.role === 'user' ? 'ml-auto bg-primary-500 text-white' : 'bg-gray-100'
                      )}
                    >
                      <p>{message.content}</p>
                      <div className="text-xs mt-1 opacity-70">
                        {format(message.timestamp, 'HH:mm')}
                      </div>
                    </div>
                  ))}
                  {isAgentProcessing && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Assistant is typing...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <div className="p-4 border-t">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={`Ask about ${chatMode === 'pipeline' ? 'pipeline status, deals, or metrics' : 'general sales questions'}...`}
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!chatMessage.trim() || isAgentProcessing}
                    >
                      Send
                    </Button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {chatMode === 'pipeline' ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setChatMessage('Show pipeline status')}
                        >
                          Show pipeline status
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setChatMessage('What are the top deals?')}
                        >
                          Top deals
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setChatMessage('How can I improve conversion rate?')}
                        >
                          Improve conversion
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setChatMessage('Sales best practices')}
                        >
                          Best practices
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Export Data</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExportModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Format</label>
                  <Select
                    value={{ value: exportOptions.format, label: exportOptions.format.toUpperCase() }}
                    onChange={(option) => 
                      setExportOptions(prev => ({ ...prev, format: option?.value || 'csv' }))}
                    options={[
                      { value: 'csv', label: 'CSV' },
                      { value: 'excel', label: 'Excel' },
                      { value: 'pdf', label: 'PDF' }
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date Range</label>
                  <Select
                    value={{ value: exportOptions.dateRange, label: {
                      '7d': 'Last 7 Days',
                      '30d': 'Last 30 Days',
                      '90d': 'Last Quarter',
                      'ytd': 'Year to Date',
                      'all': 'All Time'
                    }[exportOptions.dateRange] }}
                    onChange={(option) => 
                      setExportOptions(prev => ({ ...prev, dateRange: option?.value || '30d' }))}
                    options={[
                      { value: '7d', label: 'Last 7 Days' },
                      { value: '30d', label: 'Last 30 Days' },
                      { value: '90d', label: 'Last Quarter' },
                      { value: 'ytd', label: 'Year to Date' },
                      { value: 'all', label: 'All Time' }
                    ]}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-2">Include Data</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeMetrics}
                      onChange={(e) => 
                        setExportOptions(prev => ({ ...prev, includeMetrics: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span>Metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exportOptions.includePipeline}
                      onChange={(e) => 
                        setExportOptions(prev => ({ ...prev, includePipeline: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span>Pipeline Stages</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={exportOptions.includeDeals}
                      onChange={(e) => 
                        setExportOptions(prev => ({ ...prev, includeDeals: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <span>Deals</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowExportModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleExport}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Deal Details Modal */}
      {showDealDetails && selectedDeal && (
        <div className={cn(
          "fixed bg-black bg-opacity-50 flex items-center justify-center z-50",
          isMinimizedDealDetails ? "bottom-0 right-0 w-auto h-auto p-4" : "inset-0"
        )}>
          <Card className={cn(
            "w-full flex flex-col",
            isMinimizedDealDetails ? "max-w-[300px] h-[60px]" : "max-w-4xl h-[90vh]"
          )}>
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{selectedDeal.name}</h2>
                {!isMinimizedDealDetails && (
                  <p className="text-sm text-gray-500">{selectedDeal.company}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimizedDealDetails(!isMinimizedDealDetails)}
                >
                  {isMinimizedDealDetails ? <ChevronUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowDealDetails(false);
                    setIsMinimizedDealDetails(false);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {!isMinimizedDealDetails && (
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 grid grid-cols-3 gap-6">
                  {/* Deal Overview */}
                  <div className="col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Overview</h3>
                      <p className="text-gray-600">{selectedDeal.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">History</h3>
                      <div className="space-y-4">
                        {selectedDeal.history.map((event, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="w-32 text-sm text-gray-500">
                              {format(new Date(event.date), 'MMM d, yyyy')}
                            </div>
                            <div>
                              <div className="font-medium">{event.action}</div>
                              <div className="text-sm text-gray-500">
                                by {event.user}
                              </div>
                              {event.notes && (
                                <div className="mt-1 text-sm text-gray-600">
                                  {event.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Tasks</h3>
                    <div className="space-y-2">
                      {selectedDeal.tasks.map(task => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={task.status === 'completed'}
                              className="rounded border-gray-300"
                            />
                            <span className={cn(
                              task.status === 'completed' && 'line-through text-gray-500'
                            )}>
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                              {format(new Date(task.dueDate), 'MMM d')}
                            </span>
                            <span className="text-sm text-gray-500">
                              {task.assignee}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Deal Details Sidebar */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-500">Stage</label>
                        <div className="font-medium">
                          <Badge
                            variant={
                              selectedDeal.stage === 'closed' ? 'success' :
                              selectedDeal.stage === 'negotiation' ? 'warning' :
                              'default'
                            }
                          >
                            {selectedDeal.stage}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Value</label>
                        <div className="font-medium">
                          ${formatNumber(selectedDeal.value)}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Probability</label>
                        <div className="font-medium">
                          {selectedDeal.probability}%
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Next Follow-up</label>
                        <div className="font-medium">
                          {selectedDeal.dueDate ? format(new Date(selectedDeal.dueDate), 'MMM d, yyyy') : 'No date set'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Files</h3>
                    <div className="space-y-2">
                      {selectedDeal.files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span>{file.name}</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Deal Modal */}
      {showDealModal && (
        <div className={cn(
          "fixed bg-black bg-opacity-50 flex items-center justify-center z-50",
          isMinimizedDeal ? "bottom-0 right-0 w-auto h-auto p-4" : "inset-0"
        )}>
          <Card className={cn(
            "w-full",
            isMinimizedDeal ? "max-w-[300px] h-[60px]" : "max-w-md"
          )}>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <h2 className="font-semibold">Add New Deal</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimizedDeal(!isMinimizedDeal)}
                >
                  {isMinimizedDeal ? <ChevronUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowDealModal(false);
                    setIsMinimizedDeal(false);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {!isMinimizedDeal && (
              <div className="p-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Deal Name</label>
                  <Input
                    value={newDeal.name || ''}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter deal name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <Input
                    value={newDeal.company || ''}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Value</label>
                  <Input
                    type="number"
                    value={newDeal.value || ''}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                    placeholder="Enter deal value"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stage</label>
                  <Select
                    value={{ value: newDeal.stage || 'lead', label: (newDeal.stage || 'lead').charAt(0).toUpperCase() + (newDeal.stage || 'lead').slice(1) }}
                    onChange={(option) => setNewDeal(prev => ({ ...prev, stage: option?.value || 'lead' }))}
                    options={[
                      { value: 'lead', label: 'Lead' },
                      { value: 'qualified', label: 'Qualified' },
                      { value: 'proposal', label: 'Proposal' },
                      { value: 'negotiation', label: 'Negotiation' },
                      { value: 'closed', label: 'Closed' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact</label>
                  <Input
                    value={newDeal.contact || ''}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, contact: e.target.value }))}
                    placeholder="Enter contact person"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Next Action</label>
                  <Input
                    value={newDeal.nextAction || ''}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, nextAction: e.target.value }))}
                    placeholder="Enter next action"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <Input
                    type="date"
                    value={newDeal.dueDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewDeal(prev => ({ ...prev, dueDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowDealModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddDeal}
                disabled={!newDeal.name || !newDeal.value}
              >
                Add Deal
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}