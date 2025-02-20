import React, { useState, useEffect } from 'react';
import { RefreshCcw, Plus, Zap, Clock, BarChart2, Search, Settings, Filter, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
}

interface AutomationItemProps {
  title: string;
  description: string;
  status: 'active' | 'inactive' | 'error';
  lastRun: string;
  nextRun: string;
  successRate: string;
  totalRuns: number;
}

interface Automation extends AutomationItemProps {
  id: string;
  type: string;
}

interface NewAutomationFormData {
  title: string;
  description: string;
  type: string;
  schedule: string;
  trigger: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        {icon}
        <h3 className="text-gray-600 ml-2">{title}</h3>
      </div>
    </div>
    <div className="flex items-baseline">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="ml-2 text-sm text-green-500">{change}</p>
    </div>
  </div>
);

const AutomationItem: React.FC<AutomationItemProps & { onSettings: () => void; onMetrics: () => void }> = ({
  title,
  description,
  status,
  lastRun,
  nextRun,
  successRate,
  totalRuns,
  onSettings,
  onMetrics
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Zap className="h-5 w-5 text-blue-500 mr-3" />
          <div>
            <h3 className="font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
            {status}
          </span>
          <button 
            onClick={onSettings}
            className="text-gray-400 hover:text-gray-600"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button 
            onClick={onMetrics}
            className="text-gray-400 hover:text-gray-600"
          >
            <BarChart2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Last run</div>
          <div className="flex items-center mt-1">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            {lastRun}
          </div>
        </div>
        <div>
          <div className="text-gray-500">Next run</div>
          <div className="flex items-center mt-1">
            <Clock className="h-4 w-4 text-gray-400 mr-1" />
            {nextRun}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Success Rate</div>
          <div className="font-medium text-green-500">{successRate}</div>
        </div>
        <div>
          <div className="text-gray-500">Total Runs</div>
          <div className="font-medium">{totalRuns}</div>
        </div>
      </div>
    </div>
  );
};

export default function Operations() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNewAutomationModal, setShowNewAutomationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      title: "Lead Assignment",
      description: "Automatically assign new leads to sales representatives",
      status: "active",
      type: "sales",
      lastRun: "2/19/2025, 10:25:31 PM",
      nextRun: "2/20/2025, 12:25:31 AM",
      successRate: "98%",
      totalRuns: 1250
    },
    {
      id: '2',
      title: "Document Processing",
      description: "Process and categorize incoming documents",
      status: "active",
      type: "operations",
      lastRun: "2/19/2025, 10:20:00 PM",
      nextRun: "2/20/2025, 12:20:00 AM",
      successRate: "95%",
      totalRuns: 850
    }
  ]);
  const [formData, setFormData] = useState<NewAutomationFormData>({
    title: '',
    description: '',
    type: 'operations',
    schedule: 'hourly',
    trigger: 'scheduled'
  });
  const [formErrors, setFormErrors] = useState<Partial<NewAutomationFormData>>({});

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, you would fetch fresh data here
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleNewAutomation = () => {
    setShowNewAutomationModal(true);
  };

  const handleSettings = (automationId: string) => {
    navigate(`/dashboard/operations/automation/${automationId}/settings`);
  };

  const handleMetrics = (automationId: string) => {
    navigate(`/dashboard/operations/automation/${automationId}/metrics`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (formErrors[name as keyof NewAutomationFormData]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const errors: Partial<NewAutomationFormData> = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateAutomation = () => {
    if (!validateForm()) return;

    const newAutomation: Automation = {
      id: String(Date.now()),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      status: 'active',
      lastRun: 'Never',
      nextRun: new Date(Date.now() + 3600000).toLocaleString(),
      successRate: '0%',
      totalRuns: 0
    };

    setAutomations(prev => [...prev, newAutomation]);
    setFormData({
      title: '',
      description: '',
      type: 'operations',
      schedule: 'hourly',
      trigger: 'scheduled'
    });
    setShowNewAutomationModal(false);
  };

  const filteredAutomations = automations
    .filter(automation => {
      const matchesSearch = automation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          automation.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || automation.status === statusFilter;
      const matchesType = typeFilter === 'all' || automation.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Operations</h1>
          <p className="text-gray-500 mt-1">Manage and monitor your automated workflows</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm disabled:opacity-50"
          >
            <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button 
            onClick={handleNewAutomation}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Automation
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Active Automations"
          value={automations.filter(a => a.status === 'active').length}
          change="+2"
          icon={<Zap className="h-5 w-5 text-blue-500" />}
        />
        <MetricCard
          title="Success Rate"
          value="98%"
          change="+3"
          icon={<BarChart2 className="h-5 w-5 text-green-500" />}
        />
        <MetricCard
          title="Total Runs"
          value="2550"
          change="+150"
          icon={<RefreshCcw className="h-5 w-5 text-purple-500" />}
        />
        <MetricCard
          title="Average Runtime"
          value="2.5"
          change="-0.3"
          icon={<Clock className="h-5 w-5 text-orange-500" />}
        />
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search automations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="error">Error</option>
        </select>
        <select 
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm"
        >
          <option value="all">All Types</option>
          <option value="sales">Sales</option>
          <option value="operations">Operations</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {filteredAutomations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No automations found</p>
          </div>
        ) : (
          filteredAutomations.map((automation) => (
            <AutomationItem
              key={automation.id}
              {...automation}
              onSettings={() => handleSettings(automation.id)}
              onMetrics={() => handleMetrics(automation.id)}
            />
          ))
        )}
      </div>

      {/* New Automation Modal */}
      {showNewAutomationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Create New Automation</h2>
              <button 
                onClick={() => setShowNewAutomationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Automation Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter automation title"
                />
                {formErrors.title && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Describe what this automation does"
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="operations">Operations</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label htmlFor="trigger" className="block text-sm font-medium text-gray-700 mb-1">
                  Trigger Type
                </label>
                <select
                  id="trigger"
                  name="trigger"
                  value={formData.trigger}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="event">Event-based</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              {formData.trigger === 'scheduled' && (
                <div>
                  <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule
                  </label>
                  <select
                    id="schedule"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="hourly">Every Hour</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => setShowNewAutomationModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateAutomation}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Create Automation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 