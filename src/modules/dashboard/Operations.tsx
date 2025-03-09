import React, { useState, useEffect } from 'react';
import { RefreshCcw, Plus, Zap, Clock, BarChart2, Search, Settings, X, MessageSquare, Users, Target, Gift, UserPlus } from 'lucide-react';
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

interface AutomationRequest {
  title: string;
  description: string;
  importance: number;
}

interface NewAutomationFormData {
  title: string;
  description: string;
  importance: number;
}

interface Automation extends AutomationItemProps {
  id: string;
  type: string;
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
    importance: 5
  });
  const [formErrors, setFormErrors] = useState<Partial<NewAutomationFormData>>({});
  const [activeTab, setActiveTab] = useState('automation');

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
    if (formData.importance < 1 || formData.importance > 10) {
      errors.importance = 'Importance must be between 1 and 10';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateAutomation = () => {
    if (!validateForm()) return;

    const newAutomationRequest: AutomationRequest = {
      title: formData.title,
      description: formData.description,
      importance: formData.importance
    };

    // TODO: Send automation request to backend
    console.log('New automation request:', newAutomationRequest);

    setFormData({
      title: '',
      description: '',
      importance: 5
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Operations Dashboard</h1>
            <p className="text-gray-600">Manage your business operations and workflows</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/chat', { state: { agentType: 'operations' } })}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Talk to Operations Agent
          </button>
        </div>
      </div>

      {/* Operations Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-6" aria-label="Operations sections">
            <button
              onClick={() => setActiveTab('automation')}
              className={`px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'automation' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Automation
            </button>
            <button
              onClick={() => setActiveTab('workflows')}
              className={`px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'workflows' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Workflows
            </button>
            <button
              onClick={() => setActiveTab('referral')}
              className={`px-3 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'referral' 
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Referral Program
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Automation Section */}
          {activeTab === 'automation' && (
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
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full mx-4">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Request New Automation</h2>
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
                          placeholder="Enter the name for your automation request"
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
                          rows={4}
                          className={`block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            formErrors.description ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Describe what you want this automation to do for your business"
                        />
                        {formErrors.description && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="importance" className="block text-sm font-medium text-gray-700 mb-1">
                          Importance Level (1-10)*
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="range"
                            id="importance"
                            name="importance"
                            min="1"
                            max="10"
                            value={formData.importance}
                            onChange={handleInputChange}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <span className="text-sm font-medium text-gray-700 w-8">{formData.importance}</span>
                        </div>
                        {formErrors.importance && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.importance}</p>
                        )}
                      </div>
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
                        Submit Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Workflows Section */}
          {activeTab === 'workflows' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Workflows</h3>
                {/* Workflow content here */}
              </div>
            </div>
          )}

          {/* Referral Program Section */}
          {activeTab === 'referral' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Referral Program Management</h2>
                <button 
                  onClick={() => navigate('/dashboard/chat', {
                    state: {
                      agentType: 'operations',
                      context: 'referral_program',
                      features: {
                        programSetup: true,
                        rewardManagement: true,
                        tracking: true
                      }
                    }
                  })}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Referral Program
                </button>
              </div>

              {/* Referral Program Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Referrals"
                  value="156"
                  change="+12.5%"
                  icon={<Users className="h-5 w-5 ml-2" />}
                />
                <MetricCard
                  title="Conversion Rate"
                  value="35.2%"
                  change="+5.8%"
                  icon={<Target className="h-5 w-5 ml-2" />}
                />
                <MetricCard
                  title="Rewards Given"
                  value="$4,850"
                  change="+18.2%"
                  icon={<Gift className="h-5 w-5 ml-2" />}
                />
                <MetricCard
                  title="Active Referrers"
                  value="89"
                  change="+8.5%"
                  icon={<UserPlus className="h-5 w-5 ml-2" />}
                />
              </div>

              {/* Referral Program Settings */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium">Program Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Reward Structure</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Referrer Reward: $50 per successful referral</p>
                        <p className="text-sm text-gray-600">Referee Discount: 20% off first purchase</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Program Rules</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Minimum Purchase: $100</p>
                        <p className="text-sm text-gray-600">Reward Expiry: 90 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Referrals */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium">Recent Referrals</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Add referral rows here */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 