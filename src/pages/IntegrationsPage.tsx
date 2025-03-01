import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Users, 
  Calendar, 
  MessageCircle, 
  Share2, 
  BarChart2, 
  CreditCard,
  HardDrive,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Integration, IntegrationType } from '../types/integrations';
import { integrationsService } from '../services/integrations/integrationsService';
import IntegrationModal from '../components/integrations/IntegrationModal';
import Tooltip from '../components/common/Tooltip';

const AVAILABLE_INTEGRATIONS: Integration[] = [
  {
    id: 'email',
    type: 'EMAIL',
    name: 'Email Integration',
    description: 'Connect your email service to automate communications.',
    status: 'DISCONNECTED',
    icon: 'mail'
  },
  {
    id: 'crm',
    type: 'CRM',
    name: 'CRM Integration',
    description: 'Sync customer data with your CRM system.',
    status: 'DISCONNECTED',
    icon: 'users'
  },
  {
    id: 'calendar',
    type: 'CALENDAR',
    name: 'Calendar Integration',
    description: 'Manage appointments and schedules.',
    status: 'DISCONNECTED',
    icon: 'calendar'
  },
  {
    id: 'messaging',
    type: 'MESSAGING',
    name: 'Messaging Integration',
    description: 'Connect messaging platforms for communication.',
    status: 'DISCONNECTED',
    icon: 'message-circle'
  },
  {
    id: 'social',
    type: 'SOCIAL_MEDIA',
    name: 'Social Media Integration',
    description: 'Connect and manage social media accounts.',
    status: 'DISCONNECTED',
    icon: 'share2'
  },
  {
    id: 'analytics',
    type: 'ANALYTICS',
    name: 'Analytics Integration',
    description: 'Track and analyze performance metrics.',
    status: 'DISCONNECTED',
    icon: 'bar-chart-2'
  },
  {
    id: 'payment',
    type: 'PAYMENT',
    name: 'Payment Integration',
    description: 'Process payments and manage transactions.',
    status: 'DISCONNECTED',
    icon: 'credit-card'
  },
  {
    id: 'storage',
    type: 'STORAGE',
    name: 'Storage Integration',
    description: 'Connect cloud storage for file management.',
    status: 'DISCONNECTED',
    icon: 'hard-drive'
  }
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'mail':
      return Mail;
    case 'users':
      return Users;
    case 'calendar':
      return Calendar;
    case 'message-circle':
      return MessageCircle;
    case 'share2':
      return Share2;
    case 'bar-chart-2':
      return BarChart2;
    case 'credit-card':
      return CreditCard;
    case 'hard-drive':
      return HardDrive;
    default:
      return Mail;
  }
};

const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(AVAILABLE_INTEGRATIONS);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load integration statuses
    const connections = integrationsService.getAllConnections();
    const updatedIntegrations = integrations.map(integration => {
      const connection = connections.find(c => c.integration.id === integration.id);
      return connection ? { ...integration, status: connection.status } : integration;
    });
    setIntegrations(updatedIntegrations);
  }, []);

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleDisconnect = async (integration: Integration) => {
    try {
      await integrationsService.disconnectIntegration(integration.id);
      const updatedIntegrations = integrations.map(i =>
        i.id === integration.id ? { ...i, status: 'DISCONNECTED' } : i
      );
      setIntegrations(updatedIntegrations);
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  const handleSync = async (integration: Integration) => {
    setIsSyncing(prev => ({ ...prev, [integration.id]: true }));
    try {
      await integrationsService.syncIntegration(integration.id);
      const connection = integrationsService.getConnection(integration.id);
      if (connection) {
        const updatedIntegrations = integrations.map(i =>
          i.id === integration.id ? { ...i, status: connection.status } : i
        );
        setIntegrations(updatedIntegrations);
      }
    } catch (error) {
      console.error('Failed to sync:', error);
    } finally {
      setIsSyncing(prev => ({ ...prev, [integration.id]: false }));
    }
  };

  const handleModalSuccess = () => {
    const connection = selectedIntegration && integrationsService.getConnection(selectedIntegration.id);
    if (connection) {
      const updatedIntegrations = integrations.map(i =>
        i.id === connection.integration.id ? { ...i, status: connection.status } : i
      );
      setIntegrations(updatedIntegrations);
    }
  };

  const renderStatus = (integration: Integration) => {
    switch (integration.status) {
      case 'CONNECTED':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Connected
          </span>
        );
      case 'ERROR':
        return (
          <Tooltip content={integration.error || 'Connection error'}>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              Error
            </span>
          </Tooltip>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Disconnected
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Integrations</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map(integration => {
          const IconComponent = getIconComponent(integration.icon);
          const isConnected = integration.status === 'CONNECTED';

          return (
            <div
              key={integration.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <IconComponent className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium">{integration.name}</h3>
                    {renderStatus(integration)}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {integration.description}
              </p>

              <div className="flex space-x-3">
                {isConnected ? (
                  <>
                    <button
                      onClick={() => handleSync(integration)}
                      className={`
                        flex items-center px-3 py-2 text-sm
                        ${
                          isSyncing[integration.id]
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }
                        rounded-md
                      `}
                      disabled={isSyncing[integration.id]}
                    >
                      <RefreshCw
                        className={`w-4 h-4 mr-1 ${
                          isSyncing[integration.id] ? 'animate-spin' : ''
                        }`}
                      />
                      {isSyncing[integration.id] ? 'Syncing...' : 'Sync'}
                    </button>
                    <button
                      onClick={() => handleDisconnect(integration)}
                      className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleConnect(integration)}
                    className="px-3 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded-md"
                  >
                    Connect
                  </button>
                )}
              </div>

              {integration.error && (
                <div className="mt-3 flex items-center text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {integration.error}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedIntegration && (
        <IntegrationModal
          integration={selectedIntegration}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedIntegration(null);
          }}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};

export default IntegrationsPage; 