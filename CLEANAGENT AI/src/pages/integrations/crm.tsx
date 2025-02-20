import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Database, CheckCircle2, AlertCircle, 
  RefreshCw, Settings, ChevronRight, Globe
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';

interface CRMProvider {
  id: string;
  name: string;
  logo: React.ComponentType<{ className?: string }>;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
}

interface DataMapping {
  id: string;
  source: string;
  target: string;
  type: string;
  enabled: boolean;
}

export default function CRMIntegration() {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showMappingModal, setShowMappingModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [mappings, setMappings] = useState<DataMapping[]>([
    {
      id: '1',
      source: 'contact.email',
      target: 'email',
      type: 'string',
      enabled: true
    },
    {
      id: '2',
      source: 'contact.name',
      target: 'fullName',
      type: 'string',
      enabled: true
    }
  ]);

  const providers: CRMProvider[] = [
    {
      id: 'salesforce',
      name: 'Salesforce',
      logo: Database,
      description: 'Connect with Salesforce CRM',
      status: 'disconnected'
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      logo: Database,
      description: 'Connect with HubSpot CRM',
      status: 'disconnected'
    },
    {
      id: 'zoho',
      name: 'Zoho CRM',
      logo: Database,
      description: 'Connect with Zoho CRM',
      status: 'disconnected'
    }
  ];

  const handleConnect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleSaveConnection = () => {
    // Save connection logic here
    navigate('/launchpad');
  };

  const handleToggleMapping = (mappingId: string) => {
    setMappings(prev => prev.map(mapping =>
      mapping.id === mappingId
        ? { ...mapping, enabled: !mapping.enabled }
        : mapping
    ));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/launchpad')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Connect CRM</h1>
        </div>
      </div>

      {!selectedProvider ? (
        <div className="grid grid-cols-1 gap-4">
          {providers.map(provider => (
            <Card key={provider.id}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gray-100">
                      <Database className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{provider.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant={
                            provider.status === 'connected' ? 'success' :
                            provider.status === 'error' ? 'error' :
                            'default'
                          }
                        >
                          {provider.status === 'connected' ? (
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Connected</span>
                            </div>
                          ) : provider.status === 'error' ? (
                            <div className="flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              <span>Error</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              <span>Not Connected</span>
                            </div>
                          )}
                        </Badge>
                        {provider.lastSync && (
                          <span className="text-sm text-gray-500">
                            Last synced: {provider.lastSync.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{provider.description}</p>
                    </div>
                  </div>
                  <Button onClick={() => handleConnect(provider.id)}>
                    Connect
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* Connection Setup */}
          <Card>
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Connection Setup</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">API Key</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Environment</label>
                  <Select
                    options={[
                      { value: 'production', label: 'Production' },
                      { value: 'sandbox', label: 'Sandbox' }
                    ]}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Data Mapping */}
          <Card>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Data Mapping</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMappingModal(true)}
                >
                  Add Mapping
                </Button>
              </div>
              <div className="space-y-2">
                {mappings.map(mapping => (
                  <div
                    key={mapping.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{mapping.source}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{mapping.target}</span>
                      </div>
                      <Badge variant="default">{mapping.type}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleMapping(mapping.id)}
                      >
                        {mapping.enabled ? 'Disable' : 'Enable'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Save Connection */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedProvider(null)}
            >
              Back
            </Button>
            <Button
              onClick={handleSaveConnection}
              disabled={!apiKey}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Test & Save Connection
            </Button>
          </div>
        </>
      )}
    </div>
  );
} 

