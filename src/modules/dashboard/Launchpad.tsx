import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Activity, CheckCircle2, MessageSquare, BarChart2, Plus, Settings, HelpCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
}

interface TaskProps {
  title: string;
  description: string;
}

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
}

interface AutomationItemProps {
  icon: React.ReactNode;
  name: string;
  status: 'active' | 'scheduled';
  lastRun: string;
  successRate: string;
  iconBg: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, subValue, icon }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="relative">
          <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
          <div className="absolute right-0 w-48 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity mt-1 z-10">
            {title === "Agents Configured" && "Number of AI agents set up and ready to use"}
            {title === "Active Automations" && "Currently running automated workflows"}
            {title === "Response Time" && "Average time for AI agents to complete tasks"}
            {title === "Success Rate" && "Percentage of successfully completed automations"}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-500">{subValue}</p>
      </div>
    </div>
  );
};

const Task: React.FC<TaskProps> = ({ title, description }) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  
  const handleStartTask = () => {
    switch (title) {
      case "Set up hiring agent":
        navigate('/dashboard/hiring');
        break;
      case "Connect social media accounts":
        navigate('/dashboard/marketing');
        break;
      case "Configure email templates":
        navigate('/dashboard/settings');
        break;
      case "Set up workflow automations":
        navigate('/dashboard/operations');
        break;
      case "Connect CRM":
        navigate('/dashboard/integrations');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="mt-1">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <button 
        onClick={handleStartTask}
        className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
      >
        Start Task
      </button>
    </div>
  );
};

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, description, iconBg }) => {
  const navigate = useNavigate();
  
  const handleQuickAction = () => {
    switch (title) {
      case "Post New Job":
        navigate('/dashboard/hiring');
        break;
      case "Send Follow-up":
        navigate('/dashboard/chat');
        break;
      case "Create Campaign":
        navigate('/dashboard/marketing');
        break;
      default:
        break;
    }
  };

  return (
    <button 
      onClick={handleQuickAction}
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all w-full text-left"
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className={`${iconBg} p-2 rounded-lg`}>
          {icon}
        </div>
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </button>
  );
};

const AutomationItem: React.FC<AutomationItemProps> = ({ icon, name, status, lastRun, successRate, iconBg }) => {
  const navigate = useNavigate();
  
  const handleSettings = () => {
    navigate('/dashboard/operations');
  };

  const handleMetrics = () => {
    navigate('/dashboard/metrics');
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`${iconBg} p-2 rounded-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <span className="text-xs text-gray-500">{status}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleSettings}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4 text-gray-400" />
          </button>
          <button 
            onClick={handleMetrics}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label="View metrics"
          >
            <BarChart2 className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="text-gray-500">
          Last run: {lastRun}
        </div>
        <div className="text-green-500">
          Success Rate: {successRate}
        </div>
      </div>
    </div>
  );
};

export default function Launchpad() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Implement search functionality here
  };

  const handleGetStarted = () => {
    navigate('/dashboard/chat');
  };

  const handleViewAllAutomations = () => {
    navigate('/dashboard/operations');
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Implement filter functionality here
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-sm text-gray-500">Here's what's happening across your workspace</p>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search across all tools and resources..."
          className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Agents Configured"
          value="75%"
          subValue="8 active workflows"
          icon={<Activity />}
        />
        <MetricCard
          title="Active Automations"
          value="12"
          subValue="+3 this week"
          icon={<Activity />}
        />
        <MetricCard
          title="Response Time"
          value="2.5m"
          subValue="-30s from last week"
          icon={<Activity />}
        />
        <MetricCard
          title="Success Rate"
          value="94.2%"
          subValue="+2.4% this month"
          icon={<Activity />}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <div className="flex items-center space-x-3">
            <select 
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
              onChange={handleFilterChange}
            >
              <option>All Types</option>
            </select>
            <select 
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5"
              onChange={handleFilterChange}
            >
              <option>Last 24 Hours</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Activity className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Your activity will appear here as you use CleanAgent.AI</p>
          <p className="text-xs text-gray-400">Set up your agents now. It should only take a few minutes.</p>
          <button 
            onClick={handleGetStarted}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Getting Started */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Getting Started</h2>
            <p className="text-xs text-gray-500">Complete these tasks to set up your workspace</p>
          </div>
          <div className="text-xs text-gray-500">
            <span className="font-medium">0% Complete</span>
            <span className="mx-2">•</span>
            <span>0 of 5 tasks done</span>
          </div>
        </div>
        <div className="space-y-2">
          <Task
            title="Set up hiring agent"
            description="Configure the hiring agent to automate your recruitment process"
          />
          <Task
            title="Connect social media accounts"
            description="Link your social media accounts for automated posting and analytics"
          />
          <Task
            title="Configure email templates"
            description="Set up email templates for automated communications"
          />
          <Task
            title="Set up workflow automations"
            description="Create automated workflows for repetitive tasks"
          />
          <Task
            title="Connect CRM"
            description="Integrate your CRM system for better lead management"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          <QuickAction
            icon={<Plus className="h-4 w-4 text-blue-600" />}
            title="Post New Job"
            description="Create and publish a new job listing"
            iconBg="bg-blue-50"
          />
          <QuickAction
            icon={<MessageSquare className="h-4 w-4 text-green-600" />}
            title="Send Follow-up"
            description="Send automated follow-up emails to leads"
            iconBg="bg-green-50"
          />
          <QuickAction
            icon={<BarChart2 className="h-4 w-4 text-purple-600" />}
            title="Create Campaign"
            description="Start a new marketing campaign"
            iconBg="bg-purple-50"
          />
        </div>
      </div>

      {/* Recent Automations */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Recent Automations</h2>
          <button 
            onClick={handleViewAllAutomations}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          <AutomationItem
            icon={<MessageSquare className="h-4 w-4 text-blue-600" />}
            name="Email Follow-up"
            status="active"
            lastRun="Last run 1 hours ago"
            successRate="98%"
            iconBg="bg-blue-50"
          />
          <AutomationItem
            icon={<Plus className="h-4 w-4 text-green-600" />}
            name="Job Post Distribution"
            status="active"
            lastRun="Last run 2 hours ago"
            successRate="95%"
            iconBg="bg-green-50"
          />
          <AutomationItem
            icon={<BarChart2 className="h-4 w-4 text-purple-600" />}
            name="Social Media Posts"
            status="scheduled"
            lastRun="Last run 1 days ago"
            successRate="92%"
            iconBg="bg-purple-50"
          />
        </div>
      </div>
    </div>
  );
} 