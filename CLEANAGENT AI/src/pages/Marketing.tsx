import React, { useState, useEffect } from 'react';
import { 
  Megaphone, TrendingUp, Users, BarChart2,
  Filter, Download, RefreshCw, Plus,
  Search, Calendar, Globe, Mail,
  Facebook, Twitter, Instagram, Linkedin,
  ArrowUp, ArrowDown, Target, Zap,
  MessageSquare, Share2, MoreVertical,
  Grid, List, FileText, X, Info,
  BarChart3, MousePointerClick, Trash2,
  Bot, Loader2, Table, Code,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Settings,
  Maximize2,
  Minimize2,
  User,
  Send,
  Radio
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Badge from '../components/common/Badge';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import TooltipComponent from '../components/common/Tooltip';
import { cn } from '../lib/utils';
import Switch from '../components/common/Switch';
import { useNavigate } from 'react-router-dom';

interface Campaign {
  id: string;
  name: string;
  type: 'social' | 'email' | 'content' | 'ads';
  status: 'active' | 'draft' | 'completed' | 'paused';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  reach: number;
  engagement: number;
  leads: number;
  conversion: number;
  channels: string[];
  tags: string[];
  followers: number;
  engagementRate: number;
  leadsGenerated: number;
  websiteTraffic: number;
  targetAudience: string[];
  goals: string[];
  description: string;
  metrics: {
    impressions: number;
    clicks: number;
    ctr: number;
    cpc: number;
    roi: number;
  };
}

interface SocialMetrics {
  platform: string;
  followers: number;
  growth: number;
  engagement: number;
  posts: number;
  reach: number;
  icon: React.ElementType;
  metrics: {
    impressions: number;
    clicks: number;
    shares: number;
    comments: number;
    likes: number;
    ctr: number;
  };
  performance: {
    current: number;
    previous: number;
    change: number;
  };
  topPosts: Array<{
    id: string;
    type: string;
    engagement: number;
    reach: number;
    date: string;
  }>;
  color: string;
}

interface MarketingMetrics {
  campaigns: number;
  activeAds: number;
  totalBudget: number;
  spent: number;
  remaining: number;
  roi: number;
  leads: number;
  conversions: number;
}

export default function Marketing() {
  const navigate = useNavigate();

  // Time range state
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({ start: '', end: '' });
  
  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: [] as string[],
    type: [] as string[],
    budget: {
      min: 0,
      max: 100000
    },
    performance: {
      reach: 0,
      roi: 0
    }
  });
  
  // Export state
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'pdf' | 'json'>('csv');
  const [isExporting, setIsExporting] = useState(false);

  // Filters and view state
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  // Marketing metrics state
  const [metrics, setMetrics] = useState<MarketingMetrics>({
    campaigns: 0,
    activeAds: 0,
    totalBudget: 0,
    spent: 0,
    remaining: 0,
    roi: 0,
    leads: 0,
    conversions: 0
  });

  // Campaigns state
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  // Social media metrics
  const [socialMetrics, setSocialMetrics] = useState<SocialMetrics[]>([
    {
      platform: 'Facebook',
      followers: 25400,
      growth: 5.2,
      engagement: 3.8,
      posts: 45,
      reach: 45000,
      icon: Facebook,
      metrics: {
        impressions: 75000,
        clicks: 3200,
        shares: 850,
        comments: 1200,
        likes: 4500,
        ctr: 4.2
      },
      performance: {
        current: 6550,
        previous: 5800,
        change: 12.9
      },
      topPosts: [
        {
          id: '1',
          type: 'Product Launch Video',
          engagement: 8.5,
          reach: 12000,
          date: '2024-02-15'
        },
        {
          id: '2',
          type: 'Customer Success Story',
          engagement: 7.2,
          reach: 9500,
          date: '2024-02-10'
        }
      ],
      color: '#1877F2'
    },
    {
      platform: 'Twitter',
      followers: 18200,
      growth: 3.8,
      engagement: 2.5,
      posts: 128,
      reach: 32000,
      icon: Twitter,
      metrics: {
        impressions: 55000,
        clicks: 2100,
        shares: 1200,
        comments: 800,
        likes: 3200,
        ctr: 3.8
      },
      performance: {
        current: 5200,
        previous: 4800,
        change: 8.3
      },
      topPosts: [
        {
          id: '1',
          type: 'Industry News Update',
          engagement: 6.8,
          reach: 8500,
          date: '2024-02-14'
        },
        {
          id: '2',
          type: 'Product Feature Thread',
          engagement: 5.9,
          reach: 7200,
          date: '2024-02-12'
        }
      ],
      color: '#1DA1F2'
    },
    {
      platform: 'Instagram',
      followers: 32600,
      growth: 8.4,
      engagement: 4.2,
      posts: 36,
      reach: 58000,
      icon: Instagram,
      metrics: {
        impressions: 95000,
        clicks: 4800,
        shares: 2200,
        comments: 3500,
        likes: 12000,
        ctr: 5.1
      },
      performance: {
        current: 17700,
        previous: 14500,
        change: 22.1
      },
      topPosts: [
        {
          id: '1',
          type: 'Behind the Scenes',
          engagement: 12.5,
          reach: 15000,
          date: '2024-02-13'
        },
        {
          id: '2',
          type: 'Product Showcase',
          engagement: 10.8,
          reach: 12500,
          date: '2024-02-11'
        }
      ],
      color: '#E4405F'
    },
    {
      platform: 'LinkedIn',
      followers: 15800,
      growth: 12.5,
      engagement: 5.8,
      posts: 24,
      reach: 28000,
      icon: Linkedin,
      metrics: {
        impressions: 42000,
        clicks: 2800,
        shares: 950,
        comments: 680,
        likes: 2200,
        ctr: 6.7
      },
      performance: {
        current: 3830,
        previous: 3100,
        change: 23.5
      },
      topPosts: [
        {
          id: '1',
          type: 'Company Milestone',
          engagement: 9.2,
          reach: 8800,
          date: '2024-02-14'
        },
        {
          id: '2',
          type: 'Industry Insights',
          engagement: 8.5,
          reach: 7500,
          date: '2024-02-12'
        }
      ],
      color: '#0A66C2'
    }
  ]);

  // Add new state for campaign creation modal
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    type: 'social',
    status: 'draft',
    channels: [],
    tags: [],
    targetAudience: [],
    goals: []
  });

  // Campaign search state
  const [campaignSearchQuery, setCampaignSearchQuery] = useState('');
  const [campaignSearchResults, setCampaignSearchResults] = useState<Campaign[]>([]);

  // New useEffect to calculate metrics from campaigns
  useEffect(() => {
    const activeCampaigns = campaigns.filter(c => c.status === 'active');
    
    // Calculate total metrics from active campaigns
    const totalMetrics = activeCampaigns.reduce((acc, campaign) => ({
      campaigns: acc.campaigns + 1,
      activeAds: acc.activeAds + (campaign.type === 'ads' ? 1 : 0),
      totalBudget: acc.totalBudget + (campaign.budget || 0),
      spent: acc.spent + (campaign.spent || 0),
      remaining: acc.remaining + ((campaign.budget || 0) - (campaign.spent || 0)),
      roi: acc.roi + (campaign.metrics.roi || 0),
      leads: acc.leads + (campaign.leads || 0),
      conversions: acc.conversions + (campaign.conversion || 0)
    }), {
      campaigns: 0,
      activeAds: 0,
      totalBudget: 0,
      spent: 0,
      remaining: 0,
      roi: 0,
      leads: 0,
      conversions: 0
    });

    // If there are active campaigns, calculate average engagement rate
    if (activeCampaigns.length > 0) {
      totalMetrics.roi = totalMetrics.roi / activeCampaigns.length;
    }

    // Gradually update metrics over time
    const steps = 50; // Number of steps for the animation
    const duration = 2000; // Total duration in milliseconds
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(interval);
        setMetrics(totalMetrics);
        return;
      }

      const progress = (currentStep + 1) / steps;
      setMetrics(prev => ({
        campaigns: Math.floor(progress * totalMetrics.campaigns),
        activeAds: Math.floor(progress * totalMetrics.activeAds),
        totalBudget: Math.floor(progress * totalMetrics.totalBudget),
        spent: Math.floor(progress * totalMetrics.spent),
        remaining: Math.floor(progress * totalMetrics.remaining),
        roi: progress * totalMetrics.roi,
        leads: Math.floor(progress * totalMetrics.leads),
        conversions: Math.floor(progress * totalMetrics.conversions)
      }));

      currentStep++;
    }, stepDuration);

    return () => clearInterval(interval);
  }, [campaigns]);

  // Handle campaign search
  const handleCampaignSearch = (query: string) => {
    setCampaignSearchQuery(query);
    if (!query) {
      setCampaignSearchResults([]);
      return;
    }

    const results = campaigns.filter(campaign => 
      campaign.name.toLowerCase().includes(query.toLowerCase()) ||
      campaign.type.toLowerCase().includes(query.toLowerCase()) ||
      campaign.status.toLowerCase().includes(query.toLowerCase())
    );
    setCampaignSearchResults(results);
  };

  // Handle campaign creation
  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.type) return;

      const campaign: Campaign = {
        id: Date.now().toString(),
        name: newCampaign.name,
      type: newCampaign.type as Campaign['type'],
      status: 'draft',
        startDate: newCampaign.startDate || new Date().toISOString(),
      endDate: newCampaign.endDate || '',
      budget: newCampaign.budget || 0,
        spent: 0,
        reach: 0,
        engagement: 0,
        leads: 0,
        conversion: 0,
      channels: newCampaign.channels || [],
      tags: newCampaign.tags || [],
      followers: 0,
      engagementRate: 0,
      leadsGenerated: 0,
      websiteTraffic: 0,
      targetAudience: newCampaign.targetAudience || [],
      goals: newCampaign.goals || [],
      description: newCampaign.description || '',
      metrics: {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
        roi: 0
      }
    };

    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({
      type: 'social',
      status: 'draft',
      channels: [],
      tags: [],
      targetAudience: [],
      goals: []
    });
      setShowNewCampaign(false);
  };

  // Update handleDeleteCampaign to subtract budget from metrics
  const handleDeleteCampaign = (campaignId: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      const campaignToDelete = campaigns.find(c => c.id === campaignId);
      if (campaignToDelete) {
        setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
        // Update total budget and spent in metrics
        setMetrics(prev => ({
          ...prev,
          totalBudget: prev.totalBudget - campaignToDelete.budget,
          spent: prev.spent - campaignToDelete.spent
        }));
      }
    }
  };

  // Update handleEditCampaign to handle budget changes
  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setNewCampaign(campaign); // Set the form values to the current campaign
    setShowNewCampaign(true);
  };

  // Add function to handle campaign updates
  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    const oldCampaign = campaigns.find(c => c.id === updatedCampaign.id);
    if (oldCampaign) {
      setCampaigns(prev => prev.map(c => 
        c.id === updatedCampaign.id ? updatedCampaign : c
      ));
      // Update metrics with budget difference
      setMetrics(prev => ({
        ...prev,
        totalBudget: prev.totalBudget - oldCampaign.budget + updatedCampaign.budget,
        spent: prev.spent - oldCampaign.spent + updatedCampaign.spent
      }));
    }
    setShowNewCampaign(false);
    setEditingCampaign(null);
  };

  // Add function to handle campaign status toggle
  const handleToggleStatus = (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        return {
          ...campaign,
          status: campaign.status === 'active' ? 'paused' : 'active'
        };
      }
      return campaign;
    }));
  };

  // Add analytics data
  const [analytics, setAnalytics] = useState({
    facebook: {
      followers: 12500,
      engagement: 3.2,
      posts: 45,
      reach: 25000,
      growth: 15.2
    },
    instagram: {
      followers: 8900,
      engagement: 4.5,
      posts: 62,
      reach: 18000,
      growth: 22.1
    },
    linkedin: {
      followers: 5600,
      engagement: 2.8,
      posts: 28,
      reach: 12000,
      growth: 18.5
    }
  });

  // Simulate real-time updates
  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    
    try {
      // Simulate API call to fetch new data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update metrics with animation
      const newMetrics = {
        campaigns: Math.floor(Math.random() * 20) + 10,
        activeAds: Math.floor(Math.random() * 15) + 5,
        totalBudget: Math.floor(Math.random() * 100000) + 50000,
        spent: Math.floor(Math.random() * 50000) + 25000,
        remaining: Math.floor(Math.random() * 25000) + 10000,
        roi: (Math.random() * 5 + 2).toFixed(2),
        leads: Math.floor(Math.random() * 500) + 100,
        conversions: Math.floor(Math.random() * 200) + 50
      };

      // Animate metrics update
      const steps = 20;
      const duration = 1000;
      const stepDuration = duration / steps;

      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          setMetrics(prev => ({
            campaigns: Math.floor(prev.campaigns + (newMetrics.campaigns - prev.campaigns) / steps),
            activeAds: Math.floor(prev.activeAds + (newMetrics.activeAds - prev.activeAds) / steps),
            totalBudget: Math.floor(prev.totalBudget + (newMetrics.totalBudget - prev.totalBudget) / steps),
            spent: Math.floor(prev.spent + (newMetrics.spent - prev.spent) / steps),
            remaining: Math.floor(prev.remaining + (newMetrics.remaining - prev.remaining) / steps),
            roi: (Number(prev.roi) + (Number(newMetrics.roi) - Number(prev.roi)) / steps).toFixed(2),
            leads: Math.floor(prev.leads + (newMetrics.leads - prev.leads) / steps),
            conversions: Math.floor(prev.conversions + (newMetrics.conversions - prev.conversions) / steps)
          }));
        }, i * stepDuration);
      }

      // Update social metrics
      setSocialMetrics(prev => prev.map(platform => ({
        ...platform,
        followers: platform.followers + Math.floor(Math.random() * 1000),
        engagement: +(platform.engagement + Math.random()).toFixed(1),
        reach: platform.reach + Math.floor(Math.random() * 5000),
        growth: +(platform.growth + Math.random()).toFixed(1)
      })));

      // Update campaigns
      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        spent: campaign.spent + Math.floor(Math.random() * 1000),
        reach: campaign.reach + Math.floor(Math.random() * 2000),
        conversion: campaign.conversion + Math.floor(Math.random() * 50)
      })));

    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-600';
      case 'scheduled':
        return 'bg-blue-100 text-blue-600';
      case 'active':
        return 'bg-emerald-100 text-emerald-600';
      case 'completed':
        return 'bg-purple-100 text-purple-600';
      case 'paused':
        return 'bg-yellow-100 text-yellow-600';
    }
  };

  const getTypeIcon = (type: Campaign['type']) => {
    switch (type) {
      case 'social':
        return Share2;
      case 'email':
        return Mail;
      case 'content':
        return MessageSquare;
      case 'ads':
        return Target;
    }
  };

  const periodOptions = [
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = {
        metrics,
        campaigns,
        socialMetrics,
        timeRange: selectedTimeRange,
        filters,
        exportDate: new Date().toISOString()
      };

      let exportData;
      switch (exportFormat) {
        case 'csv':
          exportData = convertToCSV(data);
          break;
        case 'excel':
          exportData = await convertToExcel(data);
          break;
        case 'pdf':
          exportData = await convertToPDF(data);
          break;
        default:
          exportData = JSON.stringify(data, null, 2);
      }

      // Create download link
      const blob = new Blob([exportData], { 
        type: exportFormat === 'csv' ? 'text/csv' :
              exportFormat === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' :
              exportFormat === 'pdf' ? 'application/pdf' :
              'application/json'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `marketing-data-${format(new Date(), 'yyyy-MM-dd')}.${exportFormat}`;
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

  // Helper functions for data conversion
  const convertToCSV = (data: any) => {
    const headers = Object.keys(data).join(',');
    const values = Object.values(data).map(value => 
      typeof value === 'object' ? JSON.stringify(value) : value
    ).join(',');
    return `${headers}\n${values}`;
  };

  const convertToExcel = async (data: any) => {
    // This would use a library like xlsx in production
    return JSON.stringify(data);
  };

  const convertToPDF = async (data: any) => {
    // This would use a library like pdfmake in production
    return JSON.stringify(data);
  };

  // Campaign state
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Platform details state
  const [showPlatformDetails, setShowPlatformDetails] = useState(false);
  const [platformSetupStep, setPlatformSetupStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<{
    name: string;
    icon: any;
    color: string;
  } | null>(null);
  const [platformCredentials, setPlatformCredentials] = useState({
    apiKey: '',
    apiSecret: '',
    redirectUri: '',
    accessToken: ''
  });

  // Add agent modal state
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [agentCommand, setAgentCommand] = useState('');
  const [agentResponse, setAgentResponse] = useState('');
  const [isAgentProcessing, setIsAgentProcessing] = useState(false);

  // Handle agent command
  const handleAgentCommand = async () => {
    if (!agentCommand.trim()) return;
    
    setIsAgentProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate contextual response based on command
    let response = '';
    const command = agentCommand.toLowerCase();
    
    if (command.includes('campaign')) {
      response = 'To create a new campaign:\n1. Click the "New Campaign" button\n2. Fill in campaign details\n3. Set budget and timeline\n4. Choose target audience\n5. Launch campaign';
    } else if (command.includes('social')) {
      response = 'You can manage social media accounts by:\n1. Connecting your accounts\n2. Viewing analytics\n3. Scheduling posts\n4. Monitoring engagement';
    } else if (command.includes('budget')) {
      response = `Current marketing budget: $${metrics.totalBudget}\nROI: ${metrics.roi}x\nActive campaigns: ${metrics.campaigns}`;
    } else {
      response = 'I can help you with:\n- Campaign management\n- Social media analytics\n- Budget planning\n- Performance tracking';
    }
    
    setAgentResponse(response);
    setIsAgentProcessing(false);
    setAgentCommand('');
  };

  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    type: 'user' | 'agent';
    content: string;
    timestamp: Date;
  }>>([]);

  // Add filter handling functions
  const handleFilterChange = (
    category: 'status' | 'type',
    value: string,
    checked: boolean
  ) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter(v => v !== value)
    }));
  };

  const handleRangeChange = (
    category: 'budget' | 'performance',
    field: string,
    value: number
  ) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      type: [],
      budget: {
        min: 0,
        max: 100000
      },
      performance: {
        reach: 0,
        roi: 0
      }
    });
  };

  // Filter campaigns based on selected filters
  const filteredCampaigns = campaigns.filter(campaign => {
    const statusMatch = filters.status.length === 0 || filters.status.includes(campaign.status);
    const typeMatch = filters.type.length === 0 || filters.type.includes(campaign.type);
    const budgetMatch = campaign.budget >= filters.budget.min && campaign.budget <= filters.budget.max;
    const performanceMatch = 
      campaign.reach >= filters.performance.reach &&
      (campaign.metrics?.roi || 0) >= filters.performance.roi;

    return statusMatch && typeMatch && budgetMatch && performanceMatch;
  });

  const handleChatWithAgent = () => {
    navigate('/chat', { 
      state: { 
        agentType: 'marketing',
        autoStart: true 
      }
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Marketing</h1>
          <p className="text-gray-500">Manage campaigns and track performance</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={refreshData}
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
            Talk to Marketing Agent
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Active Campaigns</h3>
              <TooltipComponent content="Number of currently running campaigns">
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
              </TooltipComponent>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary">
                  {metrics.campaigns}
                </p>
                <p className="text-sm text-success-500 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +2 this month
                </p>
              </div>
              <div className="w-16 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { value: 10 },
                    { value: 15 },
                    { value: 13 },
                    { value: 17 },
                    { value: 20 },
                    { value: 18 },
                    { value: 22 }
                  ]}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0052CC"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Total Budget</h3>
              <TooltipComponent content="Total budget allocated for all campaigns">
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                </div>
              </TooltipComponent>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary">
                  ${metrics.totalBudget.toLocaleString()}
                </p>
                <p className="text-sm text-success-500 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  +5% from last month
                </p>
              </div>
              <div className="w-16 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Spent', value: metrics.spent },
                        { name: 'Remaining', value: metrics.totalBudget - metrics.spent }
                      ]}
                      innerRadius={25}
                      outerRadius={32}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      <Cell fill="#0052CC" />
                      <Cell fill="#E5F0FF" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium">Leads Generated</h3>
              <TooltipComponent content="Total leads generated from all campaigns">
                <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
              </TooltipComponent>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary">
                  {metrics.leads.toLocaleString()}
                </p>
                <p className="text-sm text-success-500 flex items-center mt-1">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  {((metrics.conversions / metrics.leads) * 100).toFixed(1)}% conversion
                </p>
              </div>
              <div className="w-16 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { value: 45 },
                    { value: 52 },
                    { value: 49 },
                    { value: 60 },
                    { value: 55 },
                    { value: 65 },
                    { value: 75 }
                  ]}>
                    <Bar dataKey="value" fill="#36B37E" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Social Media Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Social Media</h2>
          <Button
            variant="outline"
            onClick={() => setShowPlatformDetails(true)}
            className="hover:bg-primary-50 hover:text-primary-600 hover:border-primary-500 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Connect Platform
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialMetrics.map((platform) => (
            <Card
              key={platform.platform}
              className="hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        backgroundColor: `${platform.color}20`,
                        color: platform.color
                      }}
                    >
                      <platform.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{platform.platform}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Followers</span>
                    <span className="font-medium">{platform.followers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Engagement</span>
                    <span className="font-medium">{platform.engagement}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Reach</span>
                    <span className="font-medium">{platform.reach.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Growth</span>
                    <span className="text-success-500 flex items-center">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      {platform.growth}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Campaigns Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Campaigns</h2>
          <Button onClick={() => setShowNewCampaign(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      <Card>
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search campaigns..."
                  icon={Search}
                />
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "relative",
                    Object.values(filters).some(f => 
                      Array.isArray(f) ? f.length > 0 : 
                      typeof f === 'object' ? Object.values(f).some(v => v > 0) : false
                    ) && "border-primary-500"
                  )}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {Object.values(filters).some(f => 
                    Array.isArray(f) ? f.length > 0 : 
                    typeof f === 'object' ? Object.values(f).some(v => v > 0) : false
                  ) && (
                    <Badge className="ml-2 bg-primary-100 text-primary-600">
                      {Object.values(filters).reduce((acc, f) => 
                        acc + (Array.isArray(f) ? f.length : 0), 0
                      )}
                    </Badge>
                  )}
                </Button>

                {showFilters && (
                  <Card className="absolute right-0 mt-2 w-80 z-10 shadow-lg">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Filters</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          disabled={!Object.values(filters).some(f => 
                            Array.isArray(f) ? f.length > 0 : 
                            typeof f === 'object' ? Object.values(f).some(v => v > 0) : false
                          )}
                        >
                          Clear all
                        </Button>
                      </div>

                      <div className="space-y-4">
                        {/* Status Filter */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Status</label>
                          <div className="space-y-2">
                            {['active', 'draft', 'completed', 'paused'].map(status => (
                              <label key={status} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={filters.status.includes(status)}
                                  onChange={(e) => handleFilterChange('status', status, e.target.checked)}
                                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm capitalize">{status}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Type Filter */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Type</label>
                          <div className="space-y-2">
                            {['social', 'email', 'content', 'ads'].map(type => (
                              <label key={type} className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={filters.type.includes(type)}
                                  onChange={(e) => handleFilterChange('type', type, e.target.checked)}
                                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm capitalize">{type}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Budget Range */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Budget Range</label>
                          <div className="space-y-2">
                            <div>
                              <label className="text-sm text-gray-500">Minimum</label>
                              <Input
                                type="number"
                                value={filters.budget.min}
                                onChange={(e) => handleRangeChange('budget', 'min', Number(e.target.value))}
                                min={0}
                                step={1000}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-gray-500">Maximum</label>
                              <Input
                                type="number"
                                value={filters.budget.max}
                                onChange={(e) => handleRangeChange('budget', 'max', Number(e.target.value))}
                                min={0}
                                step={1000}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Performance</label>
                          <div className="space-y-2">
                            <div>
                              <label className="text-sm text-gray-500">Minimum Reach</label>
                              <Input
                                type="number"
                                value={filters.performance.reach}
                                onChange={(e) => handleRangeChange('performance', 'reach', Number(e.target.value))}
                                min={0}
                                step={100}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-gray-500">Minimum ROI</label>
                              <Input
                                type="number"
                                value={filters.performance.roi}
                                onChange={(e) => handleRangeChange('performance', 'roi', Number(e.target.value))}
                                min={0}
                                step={0.1}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button
                          onClick={() => setShowFilters(false)}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Type</th>
                    <th className="pb-2">Budget</th>
                    <th className="pb-2">Spent</th>
                    <th className="pb-2">Reach</th>
                    <th className="pb-2">Conversions</th>
                    <th className="pb-2">Timeline</th>
                    <th className="pb-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-b last:border-b-0">
                      <td className="py-3">
                        <div className="font-medium">{campaign.name}</div>
                      </td>
                      <td className="py-3">
                        <Badge
                          variant={
                            campaign.status === 'active' ? 'success' :
                            campaign.status === 'scheduled' ? 'warning' :
                            campaign.status === 'ended' ? 'error' :
                            'default'
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </td>
                      <td className="py-3">{campaign.type}</td>
                      <td className="py-3">${campaign.budget.toLocaleString()}</td>
                      <td className="py-3">${campaign.spent.toLocaleString()}</td>
                      <td className="py-3">{campaign.reach.toLocaleString()}</td>
                      <td className="py-3">{campaign.conversions}</td>
                      <td className="py-3">
                        <div className="text-sm">
                          <div>{campaign.startDate.toLocaleDateString()}</div>
                          <div className="text-gray-500">to</div>
                          <div>{campaign.endDate.toLocaleDateString()}</div>
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

      {/* Marketing Agent Chat */}
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
                    <h2 className="font-semibold">Marketing Agent</h2>
                    <p className="text-sm text-white/80">Your AI marketing assistant</p>
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
                  {agentResponse && (
                    <div className="flex gap-3 max-w-[80%]">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm whitespace-pre-line">{agentResponse}</p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {format(new Date(), 'HH:mm')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      className="flex-1"
                      placeholder="Ask about campaigns, analytics, or marketing strategies..."
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
                        'How do I create a campaign?',
                        'Show me social media stats',
                        'What is my marketing budget?',
                        'How can I improve ROI?'
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

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[600px] overflow-hidden">
            <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create New Campaign</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowNewCampaign(false)}>
                  <X className="w-5 h-5" />
              </Button>
            </div>

              <div className="grid grid-cols-2 gap-6">
              <div>
                  <label className="block text-sm font-medium mb-2">Campaign Name</label>
                <Input
                    placeholder="Enter campaign name"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
              </div>

              <div>
                  <label className="block text-sm font-medium mb-2">Campaign Type</label>
                <Select
                  value={newCampaign.type}
                  onChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                  options={[
                      { label: 'Social Media', value: 'social' },
                      { label: 'Email', value: 'email' },
                      { label: 'Content Marketing', value: 'content' },
                      { label: 'Paid Advertising', value: 'paid' }
                  ]}
                />
              </div>

              <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                    type="date"
                    value={newCampaign.startDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                />
              </div>

              <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                <Input
                    type="date"
                    value={newCampaign.endDate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                />
              </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Target Audience</label>
                <Input
                    placeholder="Define your target audience"
                    value={newCampaign.targetAudience}
                    onChange={(e) => setNewCampaign({ ...newCampaign, targetAudience: e.target.value })}
                />
              </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">Campaign Goals</label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={2}
                    placeholder="Enter campaign goals"
                    value={newCampaign.goals}
                    onChange={(e) => setNewCampaign({ ...newCampaign, goals: e.target.value })}
                />
              </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowNewCampaign(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign} disabled={!newCampaign.name}>
                  Create Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Platform Modal */}
      {showPlatformDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold">
                    {platformSetupStep === 1 ? 'Connect Social Media Platform' :
                     platformSetupStep === 2 ? `Connect ${selectedPlatform?.name}` :
                     'Configure Settings'}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {platformSetupStep === 1 ? 'Select a platform to connect' :
                     platformSetupStep === 2 ? 'Enter your API credentials' :
                     'Configure platform-specific settings'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPlatformDetails(false);
                    setPlatformSetupStep(1);
                    setSelectedPlatform(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Step Progress */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  {['Select Platform', 'Connect', 'Configure'].map((step, index) => (
                    <div
                      key={step}
                      className={cn(
                        "flex items-center",
                        index < platformSetupStep - 1 && "text-primary-500",
                        index === platformSetupStep - 1 && "text-primary-600 font-medium",
                        index > platformSetupStep - 1 && "text-gray-400"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        index < platformSetupStep - 1 && "bg-primary-100 text-primary-600",
                        index === platformSetupStep - 1 && "bg-primary-600 text-white",
                        index > platformSetupStep - 1 && "bg-gray-100"
                      )}>
                        {index + 1}
                      </div>
                      <span className="ml-2">{step}</span>
                      {index < 2 && (
                        <div className={cn(
                          "w-12 h-0.5 mx-2",
                          index < platformSetupStep - 1 ? "bg-primary-500" : "bg-gray-200"
                        )} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              {platformSetupStep === 1 && (
                <div className="space-y-4">
                  {[
                    { name: 'Facebook', icon: Facebook, color: '#1877F2' },
                    { name: 'Twitter', icon: Twitter, color: '#1DA1F2' },
                    { name: 'Instagram', icon: Instagram, color: '#E4405F' },
                    { name: 'LinkedIn', icon: Linkedin, color: '#0A66C2' }
                  ].map((platform) => (
                    <div
                      key={platform.name}
                      className={cn(
                        "p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors",
                        selectedPlatform?.name === platform.name && "border-primary-500 bg-primary-50"
                      )}
                      onClick={() => setSelectedPlatform(platform)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: `${platform.color}20`,
                              color: platform.color
                            }}
                          >
                            <platform.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-medium">{platform.name}</h3>
                            <p className="text-sm text-gray-500">
                              Connect your {platform.name} account
                            </p>
                          </div>
                        </div>
                        <Radio
                          checked={selectedPlatform?.name === platform.name}
                          onChange={() => setSelectedPlatform(platform)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {platformSetupStep === 2 && selectedPlatform && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">API Key</label>
                    <Input
                      value={platformCredentials.apiKey}
                      onChange={(e) => setPlatformCredentials(prev => ({
                        ...prev,
                        apiKey: e.target.value
                      }))}
                      placeholder="Enter your API key"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">API Secret</label>
                    <Input
                      type="password"
                      value={platformCredentials.apiSecret}
                      onChange={(e) => setPlatformCredentials(prev => ({
                        ...prev,
                        apiSecret: e.target.value
                      }))}
                      placeholder="Enter your API secret"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Redirect URI</label>
                    <Input
                      value={platformCredentials.redirectUri}
                      onChange={(e) => setPlatformCredentials(prev => ({
                        ...prev,
                        redirectUri: e.target.value
                      }))}
                      placeholder="Enter your redirect URI"
                    />
                  </div>
                </div>
              )}

              {platformSetupStep === 3 && selectedPlatform && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Auto-posting</label>
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      label="Automatically post content based on schedule"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content Type</label>
                    <Select
                      options={[
                        { value: 'all', label: 'All Content' },
                        { value: 'images', label: 'Images Only' },
                        { value: 'videos', label: 'Videos Only' },
                        { value: 'text', label: 'Text Only' }
                      ]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Posting Schedule</label>
                    <Select
                      options={[
                        { value: 'optimal', label: 'Optimal Times' },
                        { value: 'custom', label: 'Custom Schedule' },
                        { value: 'manual', label: 'Manual Posting' }
                      ]}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {platformSetupStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setPlatformSetupStep(prev => prev - 1)}
                  >
                    Previous
                  </Button>
                )}
                <div className="ml-auto">
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => {
                      setShowPlatformDetails(false);
                      setPlatformSetupStep(1);
                      setSelectedPlatform(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={
                      (platformSetupStep === 1 && !selectedPlatform) ||
                      (platformSetupStep === 2 && (!platformCredentials.apiKey || !platformCredentials.apiSecret))
                    }
                    onClick={() => {
                      if (platformSetupStep < 3) {
                        setPlatformSetupStep(prev => prev + 1);
                      } else {
                        // Handle platform connection
                        setShowPlatformDetails(false);
                        setPlatformSetupStep(1);
                        setSelectedPlatform(null);
                        // Add the platform to connected platforms
                        setSocialMetrics(prev => [
                          ...prev,
                          {
                            platform: selectedPlatform.name,
                            followers: 0,
                            growth: 0,
                            engagement: 0,
                            posts: 0,
                            reach: 0,
                            icon: selectedPlatform.icon,
                            metrics: {
                              impressions: 0,
                              clicks: 0,
                              shares: 0,
                              comments: 0,
                              likes: 0,
                              ctr: 0
                            },
                            performance: {
                              current: 0,
                              previous: 0,
                              change: 0
                            },
                            topPosts: [],
                            color: selectedPlatform.color
                          }
                        ]);
                      }
                    }}
                  >
                    {platformSetupStep === 3 ? 'Finish Setup' : 'Next'}
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