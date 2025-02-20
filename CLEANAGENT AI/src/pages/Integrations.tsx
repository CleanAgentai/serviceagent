import React, { useState, useEffect } from 'react';
import { 
  Plug,
  Plus,
  Search,
  Filter,
  Settings,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  X,
  ChevronRight,
  Bot,
  Grid,
  List,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Badge from '../components/common/Badge';
import Select from '../components/common/Select';
import Switch from '../components/common/Switch';
import Tooltip from '../components/common/Tooltip';
import { cn } from '../lib/utils';

interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: 'crm' | 'communication' | 'productivity' | 'analytics' | 'marketing';
  status: 'connected' | 'error' | 'not_connected';
  isPopular?: boolean;
  config?: {
    apiKey?: string;
    webhookUrl?: string;
    syncInterval?: string;
    customFields?: Record<string, string>;
  };
}

interface Category {
  id: string;
  name: string;
  count: number;
}

// Update company logos mapping to use local assets
const COMPANY_LOGOS = {
  salesforce: '/assets/logos/salesforce.svg',
  hubspot: '/assets/logos/hubspot.svg',
  slack: '/assets/logos/slack.svg',
  zoom: '/assets/logos/zoom.svg',
  'google-calendar': '/assets/logos/google-calendar.svg',
  'microsoft-teams': '/assets/logos/microsoft-teams.svg',
  asana: '/assets/logos/asana.svg',
  jira: '/assets/logos/jira.svg',
  zendesk: '/assets/logos/zendesk.svg',
  mailchimp: '/assets/logos/mailchimp.svg',
  'google-analytics': '/assets/logos/google-analytics.svg',
  segment: '/assets/logos/segment.svg',
  intercom: '/assets/logos/intercom.svg',
  stripe: '/assets/logos/stripe.svg',
  notion: '/assets/logos/notion.svg',
  pipedrive: '/assets/logos/pipedrive.svg',
  amplitude: '/assets/logos/amplitude.svg',
  marketo: '/assets/logos/marketo.svg',
  sendgrid: '/assets/logos/sendgrid.svg',
  mixpanel: '/assets/logos/mixpanel.svg',
  freshdesk: '/assets/logos/freshdesk.svg',
  trello: '/assets/logos/trello.svg',
  linkedin: '/assets/logos/linkedin.svg',
  twitter: '/assets/logos/twitter.svg'
};

export default function Integrations() {
  // View state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sample categories
  const categories: Category[] = [
    { id: 'all', name: 'All Integrations', count: 24 },
    { id: 'crm', name: 'CRM', count: 6 },
    { id: 'marketing', name: 'Marketing', count: 8 },
    { id: 'communication', name: 'Communication', count: 4 },
    { id: 'analytics', name: 'Analytics', count: 3 },
    { id: 'productivity', name: 'Productivity', count: 3 }
  ];

  // Sample integrations with enhanced data
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect your Salesforce CRM to sync contacts, leads, and opportunities.',
      logo: '/logos/salesforce.svg',
      category: 'crm',
      status: 'connected',
      isPopular: true
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Integrate with HubSpot for seamless marketing automation and CRM.',
      logo: '/logos/hubspot.svg',
      category: 'crm',
      status: 'not_connected',
      isPopular: true
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notifications and updates directly in your Slack channels.',
      logo: '/logos/slack.svg',
      category: 'communication',
      status: 'connected',
      isPopular: true
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Schedule and manage video meetings directly from the platform.',
      logo: '/logos/zoom.svg',
      category: 'communication',
      status: 'not_connected'
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync your calendar for seamless scheduling and time management.',
      logo: '/logos/google-calendar.svg',
      category: 'productivity',
      status: 'error'
    },
    {
      id: 'microsoft-teams',
      name: 'Microsoft Teams',
      description: 'Collaborate and communicate with your team through Microsoft Teams.',
      logo: '/logos/microsoft-teams.svg',
      category: 'communication',
      status: 'not_connected'
    },
    {
      id: 'asana',
      name: 'Asana',
      description: 'Manage tasks and projects with Asana integration.',
      logo: '/logos/asana.svg',
      category: 'productivity',
      status: 'not_connected'
    },
    {
      id: 'jira',
      name: 'Jira',
      description: 'Track issues and manage agile projects with Jira integration.',
      logo: '/logos/jira.svg',
      category: 'productivity',
      status: 'not_connected'
    },
    {
      id: 'zendesk',
      name: 'Zendesk',
      description: 'Provide customer support through Zendesk integration.',
      logo: '/logos/zendesk.svg',
      category: 'communication',
      status: 'not_connected'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Automate email marketing campaigns and manage subscriber lists.',
      logo: '/logos/mailchimp.svg',
      category: 'marketing',
      status: 'not_connected',
      isPopular: true
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track and analyze website traffic and user behavior.',
      logo: '/logos/google-analytics.svg',
      category: 'analytics',
      status: 'not_connected',
      isPopular: true
    },
    {
      id: 'segment',
      name: 'Segment',
      description: 'Collect, clean, and control customer data for better insights.',
      logo: '/logos/segment.svg',
      category: 'analytics',
      status: 'not_connected'
    },
    {
      id: 'intercom',
      name: 'Intercom',
      description: 'Engage customers with targeted messages and support.',
      logo: '/logos/intercom.svg',
      category: 'communication',
      status: 'not_connected',
      isPopular: true
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Process payments and manage financial transactions securely.',
      logo: '/logos/stripe.svg',
      category: 'productivity',
      status: 'not_connected',
      isPopular: true
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Connect and sync your team workspace and documentation.',
      logo: '/logos/notion.svg',
      category: 'productivity',
      status: 'not_connected'
    },
    {
      id: 'pipedrive',
      name: 'Pipedrive',
      description: 'Manage your sales pipeline and track deals effectively.',
      logo: '/logos/pipedrive.svg',
      category: 'crm',
      status: 'not_connected'
    },
    {
      id: 'amplitude',
      name: 'Amplitude',
      description: 'Analyze user behavior and product analytics.',
      logo: '/logos/amplitude.svg',
      category: 'analytics',
      status: 'not_connected'
    },
    {
      id: 'marketo',
      name: 'Marketo',
      description: 'Automate marketing processes and lead generation.',
      logo: '/logos/marketo.svg',
      category: 'marketing',
      status: 'not_connected'
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Send transactional and marketing emails reliably.',
      logo: '/logos/sendgrid.svg',
      category: 'marketing',
      status: 'not_connected'
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      description: 'Track user interactions and analyze product usage.',
      logo: '/logos/mixpanel.svg',
      category: 'analytics',
      status: 'not_connected'
    },
    {
      id: 'freshdesk',
      name: 'Freshdesk',
      description: 'Streamline customer support and ticket management.',
      logo: '/logos/freshdesk.svg',
      category: 'communication',
      status: 'not_connected'
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Manage projects and tasks with visual boards.',
      logo: '/logos/trello.svg',
      category: 'productivity',
      status: 'not_connected'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Connect with professional networks and share updates.',
      logo: '/logos/linkedin.svg',
      category: 'marketing',
      status: 'not_connected'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      description: 'Engage with your audience and monitor social mentions.',
      logo: '/logos/twitter.svg',
      category: 'marketing',
      status: 'not_connected'
    }
  ]);

  // Load integrations on mount
  useEffect(() => {
    const loadIntegrations = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Data is already set in state
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load integrations');
        setIsLoading(false);
      }
    };

    loadIntegrations();
  }, []);

  // Update the integrations data to use the new logo URLs
  useEffect(() => {
    setIntegrations(prev => prev.map(integration => ({
      ...integration,
      logo: COMPANY_LOGOS[integration.id as keyof typeof COMPANY_LOGOS] || integration.logo
    })));
  }, []);

  // Filter integrations based on search and category
  const filteredIntegrations = integrations.filter(integration =>
    (selectedCategory === 'all' || integration.category === selectedCategory) &&
    (integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     integration.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle integration connection
  const handleConnect = async (integration: Integration) => {
    try {
      setSelectedIntegration(integration);
      setShowConnectModal(true);
      setError(null);
      
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update integration status
      const updatedIntegrations = integrations.map(i =>
        i.id === integration.id
          ? { ...i, status: 'connected' as const }
          : i
      );
      
      setIntegrations(updatedIntegrations);
      setSuccessMessage(`Successfully connected to ${integration.name}`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setShowConnectModal(false);
    } catch (err) {
      setError(`Failed to connect to ${integration.name}`);
    }
  };

  // Handle integration configuration
  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowConfigureModal(true);
  };

  // Get active integrations count
  const activeIntegrations = integrations.filter(i => i.status === 'connected').length;

  // Update the renderLogo function to use a local fallback icon
  const renderLogo = (integration: Integration) => {
    const logoUrl = COMPANY_LOGOS[integration.id as keyof typeof COMPANY_LOGOS];
    
    return (
      <div className={cn(
        "relative flex items-center justify-center bg-white rounded-lg overflow-hidden",
        "w-12 h-12 border border-gray-100 shadow-sm"
      )}>
        <img
          src={logoUrl || integration.logo}
          alt={`${integration.name} logo`}
          className="w-8 h-8 object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/logos/default.svg'; // Local fallback icon
            target.onerror = null;
            target.className = cn(target.className, 'opacity-50');
          }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Integrations</h1>
          <p className="text-gray-500">Connect and manage your integrations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? (
              <><List className="w-4 h-4" /> List View</>
            ) : (
              <><Grid className="w-4 h-4" /> Grid View</>
            )}
          </Button>
        </div>
      </div>

      {/* Enhanced Filter Section */}
      <Card className="bg-white shadow-sm">
        <div className="p-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Input
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "whitespace-nowrap",
                    selectedCategory === category.id
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {category.name}
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/20">
                    {category.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Status Messages */}
      {(error || successMessage) && (
        <div
          className={cn(
            "p-4 rounded-lg",
            error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
          )}
        >
          {error ? (
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-gray-500">Loading integrations...</p>
          </div>
        </div>
      ) : filteredIntegrations.length === 0 ? (
        // Empty State
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="p-4 rounded-full bg-gray-100 mb-4">
            <Plug className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No integrations found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Get started by connecting a new service"}
          </p>
          <Button
            onClick={() => setShowConnectModal(true)}
            className="transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </Button>
        </div>
      ) : (
        // Integrations Grid/List
        <div className={cn(
          "grid gap-4",
          viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}>
          {filteredIntegrations.map(integration => (
            <Card key={integration.id} className="overflow-hidden">
              <div className={cn(
                "p-4",
                viewMode === 'list' ? "flex items-center gap-4" : "space-y-4"
              )}>
                {/* Logo Section with improved styling */}
                <div className={cn(
                  "flex items-center justify-center",
                  viewMode === 'list' ? "flex-shrink-0" : "mb-4"
                )}>
                  {renderLogo(integration)}
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {integration.description}
                      </p>
                    </div>
                    <Badge
                      variant={
                        integration.status === 'connected' ? 'success' :
                        integration.status === 'error' ? 'error' :
                        'default'
                      }
                      className="flex-shrink-0"
                    >
                      {integration.status === 'connected' ? 'Connected' :
                       integration.status === 'error' ? 'Error' :
                       'Not Connected'}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      variant={integration.status === 'connected' ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => integration.status === 'connected' 
                        ? handleConfigure(integration)
                        : handleConnect(integration)
                      }
                    >
                      {integration.status === 'connected' ? 'Configure' : 'Connect'}
                    </Button>
                    {integration.isPopular && (
                      <div className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded">
                        Popular
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Connect Modal */}
      {showConnectModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedIntegration.logo}
                    alt={selectedIntegration.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      Connect to {selectedIntegration.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedIntegration.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConnectModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    API Key
                  </label>
                  <Input type="password" placeholder="Enter your API key" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Webhook URL (Optional)
                  </label>
                  <Input placeholder="https://your-webhook-url.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Sync Interval
                  </label>
                  <Select
                    options={[
                      { value: '15m', label: 'Every 15 minutes' },
                      { value: '30m', label: 'Every 30 minutes' },
                      { value: '1h', label: 'Every hour' },
                      { value: '6h', label: 'Every 6 hours' },
                      { value: '12h', label: 'Every 12 hours' },
                      { value: '24h', label: 'Every 24 hours' }
                    ]}
                    value="1h"
                    onChange={(value) => {
                      // Handle sync interval change
                      if (selectedIntegration && selectedIntegration.config) {
                        selectedIntegration.config.syncInterval = value as string;
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowConnectModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleConnect(selectedIntegration)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Configure Modal */}
      {showConfigureModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedIntegration.logo}
                    alt={selectedIntegration.name}
                    className="w-12 h-12 rounded-lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      Configure {selectedIntegration.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Manage your integration settings
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfigureModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    API Key
                  </label>
                  <Input
                    type="password"
                    value={selectedIntegration.config?.apiKey || ''}
                    placeholder="••••••••"
                    onChange={(e) => {
                      if (selectedIntegration) {
                        selectedIntegration.config = {
                          ...selectedIntegration.config,
                          apiKey: e.target.value
                        };
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Webhook URL
                  </label>
                  <Input
                    value={selectedIntegration.config?.webhookUrl || ''}
                    placeholder="https://your-webhook-url.com"
                    onChange={(e) => {
                      if (selectedIntegration) {
                        selectedIntegration.config = {
                          ...selectedIntegration.config,
                          webhookUrl: e.target.value
                        };
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Sync Interval
                  </label>
                  <Select
                    options={[
                      { value: '15m', label: 'Every 15 minutes' },
                      { value: '30m', label: 'Every 30 minutes' },
                      { value: '1h', label: 'Every hour' },
                      { value: '6h', label: 'Every 6 hours' },
                      { value: '12h', label: 'Every 12 hours' },
                      { value: '24h', label: 'Every 24 hours' }
                    ]}
                    value={selectedIntegration.config?.syncInterval || '1h'}
                    onChange={(value) => {
                      if (selectedIntegration) {
                        selectedIntegration.config = {
                          ...selectedIntegration.config,
                          syncInterval: value as string
                        };
                      }
                    }}
                  />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Custom Fields</h3>
                  {Object.entries(selectedIntegration.config?.customFields || {}).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 mb-2">
                      <Input value={key} placeholder="Field name" className="flex-1" />
                      <Input value={value} placeholder="Field value" className="flex-1" />
                      <Button variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    // Handle disconnect
                    setShowConfigureModal(false);
                  }}
                >
                  Disconnect
                </Button>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfigureModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setShowConfigureModal(false)}>
                    Save Changes
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