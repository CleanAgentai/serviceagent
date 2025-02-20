import React, { useState, useEffect } from 'react';
import { 
  Settings, Zap, BarChart2, Clock, AlertCircle, CheckCircle2,
  PlayCircle, PauseCircle, RefreshCw, Filter, Plus, Search,
  ChevronRight, MoreVertical, Calendar, Users, FileText
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Badge from '../components/common/Badge';
import Tooltip from '../components/common/Tooltip';
import { cn } from '../lib/utils';

interface Automation {
  id: string;
  name: string;
  description: string;
  type: 'workflow' | 'integration' | 'notification' | 'data';
  status: 'active' | 'paused' | 'error' | 'draft';
  lastRun?: string;
  nextRun?: string;
  successRate: number;
  runCount: number;
  createdAt: string;
  updatedAt: string;
  triggers: string[];
  actions: string[];
}

interface Metric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ElementType;
}

interface SelectOption {
  value: string;
  label: string;
}

export default function Operations() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Lead Assignment',
      description: 'Automatically assign new leads to sales representatives',
      type: 'workflow',
      status: 'active',
      lastRun: new Date(Date.now() - 3600000).toISOString(),
      nextRun: new Date(Date.now() + 3600000).toISOString(),
      successRate: 98,
      runCount: 1250,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-03-10T15:30:00Z',
      triggers: ['New Lead Created', 'Lead Status Changed'],
      actions: ['Assign Lead', 'Send Notification', 'Update CRM']
    },
    {
      id: '2',
      name: 'Document Processing',
      description: 'Process and categorize incoming documents',
      type: 'workflow',
      status: 'active',
      lastRun: new Date(Date.now() - 7200000).toISOString(),
      nextRun: new Date(Date.now() + 1800000).toISOString(),
      successRate: 95,
      runCount: 850,
      createdAt: '2024-02-01T09:00:00Z',
      updatedAt: '2024-03-15T11:20:00Z',
      triggers: ['New Document Uploaded', 'Document Updated'],
      actions: ['Process Document', 'Update Database', 'Send Alert']
    },
    {
      id: '3',
      name: 'Calendar Sync',
      description: 'Synchronize calendars across platforms',
      type: 'integration',
      status: 'error',
      lastRun: new Date(Date.now() - 86400000).toISOString(),
      successRate: 75,
      runCount: 450,
      createdAt: '2024-02-15T14:00:00Z',
      updatedAt: '2024-03-16T09:45:00Z',
      triggers: ['Calendar Event Created', 'Event Updated'],
      actions: ['Sync Calendar', 'Send Confirmation']
    }
  ]);

  const [metrics, setMetrics] = useState<Metric[]>([
    {
      label: 'Active Automations',
      value: 15,
      change: 2,
      trend: 'up',
      icon: Zap
    },
    {
      label: 'Success Rate',
      value: 98,
      change: 3,
      trend: 'up',
      icon: CheckCircle2
    },
    {
      label: 'Total Runs',
      value: 2550,
      change: 150,
      trend: 'up',
      icon: RefreshCw
    },
    {
      label: 'Average Runtime',
      value: 2.5,
      change: -0.3,
      trend: 'down',
      icon: Clock
    }
  ]);

  const [filter, setFilter] = useState({
    status: 'all',
    type: 'all',
    search: ''
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNewAutomationModal, setShowNewAutomationModal] = useState(false);
  const [newAutomation, setNewAutomation] = useState({
    name: '',
    description: '',
    type: 'workflow' as const,
    triggers: [] as string[],
    actions: [] as string[]
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update metrics and automations here
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleAddAutomation = () => {
    if (!newAutomation.name || !newAutomation.description) return;

    const automation: Automation = {
      id: Date.now().toString(),
      ...newAutomation,
      status: 'draft',
      successRate: 0,
      runCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setAutomations(prev => [automation, ...prev]);
    setShowNewAutomationModal(false);
    setNewAutomation({
      name: '',
      description: '',
      type: 'workflow',
      triggers: [],
      actions: []
    });
  };

  const filteredAutomations = automations.filter(automation => {
    if (filter.status !== 'all' && automation.status !== filter.status) return false;
    if (filter.type !== 'all' && automation.type !== filter.type) return false;
    if (filter.search && !automation.name.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Operations</h1>
          <p className="text-gray-500">Manage and monitor your automated workflows</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
          <Button 
            className="gap-2"
            onClick={() => setShowNewAutomationModal(true)}
          >
            <Plus className="w-4 h-4" />
            New Automation
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500">{metric.label}</span>
                <div className={cn(
                  "p-2 rounded-lg",
                  "bg-gray-50"
                )}>
                  <metric.icon className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold">
                  {metric.value}{metric.label === 'Success Rate' ? '%' : ''}
                </span>
                <span className={cn(
                  "text-sm",
                  metric.trend === 'up' ? "text-green-500" : "text-red-500"
                )}>
                  {metric.trend === 'up' ? '+' : ''}{metric.change}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Search automations..."
                value={filter.search}
                onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                className="w-full pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select
              value={filter.status}
              onChange={(value) => setFilter(prev => ({ ...prev, status: value }))}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'paused', label: 'Paused' },
                { value: 'error', label: 'Error' },
                { value: 'draft', label: 'Draft' }
              ]}
              className="w-40"
            />
            <Select
              value={filter.type}
              onChange={(value) => setFilter(prev => ({ ...prev, type: value }))}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'workflow', label: 'Workflow' },
                { value: 'integration', label: 'Integration' },
                { value: 'notification', label: 'Notification' },
                { value: 'data', label: 'Data' }
              ]}
              className="w-40"
            />
          </div>
        </div>
      </Card>

      {/* New Automation Modal */}
      {showNewAutomationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Create New Automation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewAutomationModal(false)}
                >
                  <AlertCircle className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={newAutomation.name}
                    onChange={(e) => setNewAutomation(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter automation name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Input
                    value={newAutomation.description}
                    onChange={(e) => setNewAutomation(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter automation description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <Select
                    value={newAutomation.type}
                    onChange={(value) => setNewAutomation(prev => ({ ...prev, type: value as typeof prev.type }))}
                    options={[
                      { value: 'workflow', label: 'Workflow' },
                      { value: 'integration', label: 'Integration' },
                      { value: 'notification', label: 'Notification' },
                      { value: 'data', label: 'Data' }
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Triggers</label>
                  <Select
                    value={newAutomation.triggers.join(',')}
                    onChange={(value) => setNewAutomation(prev => ({ 
                      ...prev, 
                      triggers: value.split(',').filter(Boolean)
                    }))}
                    options={[
                      { value: 'New Lead Created', label: 'New Lead Created' },
                      { value: 'Document Updated', label: 'Document Updated' },
                      { value: 'Calendar Event Created', label: 'Calendar Event Created' },
                      { value: 'Task Completed', label: 'Task Completed' }
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Actions</label>
                  <Select
                    value={newAutomation.actions.join(',')}
                    onChange={(value) => setNewAutomation(prev => ({ 
                      ...prev, 
                      actions: value.split(',').filter(Boolean)
                    }))}
                    options={[
                      { value: 'Send Notification', label: 'Send Notification' },
                      { value: 'Update Database', label: 'Update Database' },
                      { value: 'Create Task', label: 'Create Task' },
                      { value: 'Send Email', label: 'Send Email' }
                    ]}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setShowNewAutomationModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAutomation}
                  disabled={!newAutomation.name || !newAutomation.description}
                >
                  Create Automation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Automations List */}
      <div className="space-y-4">
        {filteredAutomations.map(automation => (
          <Card key={automation.id}>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    automation.type === 'workflow' && "bg-blue-50 text-blue-500",
                    automation.type === 'integration' && "bg-purple-50 text-purple-500",
                    automation.type === 'notification' && "bg-yellow-50 text-yellow-500",
                    automation.type === 'data' && "bg-green-50 text-green-500"
                  )}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{automation.name}</h3>
                      <Badge
                        variant={
                          automation.status === 'active' ? 'success' :
                          automation.status === 'paused' ? 'warning' :
                          automation.status === 'error' ? 'error' :
                          'default'
                        }
                      >
                        {automation.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{automation.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        Last run: {new Date(automation.lastRun || '').toLocaleString()}
                      </div>
                      {automation.nextRun && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          Next run: {new Date(automation.nextRun).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip content={automation.status === 'active' ? 'Pause automation' : 'Start automation'}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAutomations(prev => prev.map(a => 
                          a.id === automation.id
                            ? { ...a, status: a.status === 'active' ? 'paused' : 'active' }
                            : a
                        ));
                      }}
                    >
                      {automation.status === 'active' ? (
                        <PauseCircle className="w-4 h-4" />
                      ) : (
                        <PlayCircle className="w-4 h-4" />
                      )}
                    </Button>
                  </Tooltip>
                  <Tooltip content="View details">
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <BarChart2 className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Settings">
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
              
              {/* Progress and Stats */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                    <div className={cn(
                      "text-lg font-semibold",
                      automation.successRate >= 90 ? "text-green-600" :
                      automation.successRate >= 75 ? "text-yellow-600" :
                      "text-red-600"
                    )}>
                      {automation.successRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Runs</div>
                    <div className="text-lg font-semibold">{automation.runCount}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {automation.triggers.slice(0, 2).map((trigger, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {trigger}
                    </Badge>
                  ))}
                  {automation.triggers.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{automation.triggers.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}