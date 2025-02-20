import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Settings,
  Link,
  MessageSquare,
  Bot,
  ArrowLeft,
  Plug
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { useNavigate } from 'react-router-dom';

interface SetupStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function IntegrationsAgentSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    {
      id: 1,
      title: 'Integration Settings',
      description: 'Configure your integration preferences',
      isCompleted: false
    },
    {
      id: 2,
      title: 'Connection Setup',
      description: 'Set up API connections and authentication',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Data Mapping',
      description: 'Configure data synchronization rules',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Review & Enable',
      description: 'Review settings and enable your integrations',
      isCompleted: false
    }
  ]);

  // Form states for each step
  const [integrationSettings, setIntegrationSettings] = useState({
    agentName: '',
    platforms: [],
    syncFrequency: 'realtime',
    environment: 'production'
  });

  const [connectionSetup, setConnectionSetup] = useState({
    apiKeys: '',
    authMethod: 'oauth',
    webhookEndpoints: [],
    securityProtocol: 'https'
  });

  const [dataMapping, setDataMapping] = useState({
    mappingRules: [],
    transformations: [],
    validationRules: true,
    errorHandling: 'retry'
  });

  const handleStepComplete = (stepId: number) => {
    setSetupSteps(steps =>
      steps.map(step =>
        step.id === stepId ? { ...step, isCompleted: true } : step
      )
    );
    if (stepId < 4) {
      setCurrentStep(stepId + 1);
    }
  };

  const calculateProgress = () => {
    const completedSteps = setupSteps.filter(step => step.isCompleted).length;
    return (completedSteps / setupSteps.length) * 100;
  };

  const handleFinish = () => {
    // Save all settings
    console.log('Saving settings:', {
      integrationSettings,
      connectionSetup,
      dataMapping
    });
    navigate('/integrations');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Set Up Integrations Agent</h1>
          <p className="text-gray-500">Configure your AI integrations assistant</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/integrations')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Integrations
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Setup Progress</span>
          <span className="text-gray-500">{Math.round(calculateProgress())}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="grid grid-cols-4 gap-4">
        {setupSteps.map((step) => (
          <div
            key={step.id}
            className={`cursor-pointer ${
              step.isCompleted ? 'opacity-100' : 'opacity-60'
            } ${currentStep === step.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => step.isCompleted && setCurrentStep(step.id)}
          >
            <Card>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{step.title}</span>
                  {step.isCompleted && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Integration Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name</label>
                  <Input
                    value={integrationSettings.agentName}
                    onChange={(e) => setIntegrationSettings({ ...integrationSettings, agentName: e.target.value })}
                    placeholder="Enter agent name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Integration Platforms</label>
                  <Select
                    isMulti
                    value={integrationSettings.platforms}
                    onChange={(value) => setIntegrationSettings({ ...integrationSettings, platforms: value })}
                    options={[
                      { value: 'salesforce', label: 'Salesforce' },
                      { value: 'slack', label: 'Slack' },
                      { value: 'github', label: 'GitHub' },
                      { value: 'jira', label: 'Jira' },
                      { value: 'zendesk', label: 'Zendesk' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sync Frequency</label>
                  <Select
                    value={integrationSettings.syncFrequency}
                    onChange={(value) => setIntegrationSettings({ ...integrationSettings, syncFrequency: value })}
                    options={[
                      { value: 'realtime', label: 'Real-time' },
                      { value: 'hourly', label: 'Hourly' },
                      { value: 'daily', label: 'Daily' },
                      { value: 'weekly', label: 'Weekly' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Environment</label>
                  <Select
                    value={integrationSettings.environment}
                    onChange={(value) => setIntegrationSettings({ ...integrationSettings, environment: value })}
                    options={[
                      { value: 'development', label: 'Development' },
                      { value: 'staging', label: 'Staging' },
                      { value: 'production', label: 'Production' }
                    ]}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => handleStepComplete(1)}>
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Connection Setup</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">API Keys</label>
                  <Input
                    type="password"
                    value={connectionSetup.apiKeys}
                    onChange={(e) => setConnectionSetup({ ...connectionSetup, apiKeys: e.target.value })}
                    placeholder="Enter API keys (comma separated)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Authentication Method</label>
                  <Select
                    value={connectionSetup.authMethod}
                    onChange={(value) => setConnectionSetup({ ...connectionSetup, authMethod: value })}
                    options={[
                      { value: 'oauth', label: 'OAuth 2.0' },
                      { value: 'apikey', label: 'API Key' },
                      { value: 'jwt', label: 'JWT' },
                      { value: 'basic', label: 'Basic Auth' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Webhook Endpoints</label>
                  <Select
                    isMulti
                    value={connectionSetup.webhookEndpoints}
                    onChange={(value) => setConnectionSetup({ ...connectionSetup, webhookEndpoints: value })}
                    options={[
                      { value: 'events', label: 'Event Notifications' },
                      { value: 'updates', label: 'Data Updates' },
                      { value: 'alerts', label: 'System Alerts' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Security Protocol</label>
                  <Select
                    value={connectionSetup.securityProtocol}
                    onChange={(value) => setConnectionSetup({ ...connectionSetup, securityProtocol: value })}
                    options={[
                      { value: 'https', label: 'HTTPS' },
                      { value: 'ssl', label: 'SSL/TLS' },
                      { value: 'vpn', label: 'VPN' }
                    ]}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => handleStepComplete(2)}>
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Data Mapping</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Mapping Rules</label>
                  <Select
                    isMulti
                    value={dataMapping.mappingRules}
                    onChange={(value) => setDataMapping({ ...dataMapping, mappingRules: value })}
                    options={[
                      { value: 'field-mapping', label: 'Field Mapping' },
                      { value: 'data-conversion', label: 'Data Type Conversion' },
                      { value: 'custom-logic', label: 'Custom Logic' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Data Transformations</label>
                  <Select
                    isMulti
                    value={dataMapping.transformations}
                    onChange={(value) => setDataMapping({ ...dataMapping, transformations: value })}
                    options={[
                      { value: 'format', label: 'Format Conversion' },
                      { value: 'filter', label: 'Data Filtering' },
                      { value: 'enrich', label: 'Data Enrichment' }
                    ]}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Validation Rules</label>
                  <input
                    type="checkbox"
                    checked={dataMapping.validationRules}
                    onChange={(e) => setDataMapping({
                      ...dataMapping,
                      validationRules: e.target.checked
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Error Handling</label>
                  <Select
                    value={dataMapping.errorHandling}
                    onChange={(value) => setDataMapping({ ...dataMapping, errorHandling: value })}
                    options={[
                      { value: 'retry', label: 'Retry Operation' },
                      { value: 'skip', label: 'Skip Record' },
                      { value: 'manual', label: 'Manual Resolution' }
                    ]}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => handleStepComplete(3)}>
                  Next Step
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Review & Enable</h2>
              <div className="space-y-6">
                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Integration Settings</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Agent Name:</div>
                      <div>{integrationSettings.agentName}</div>
                      <div className="text-gray-500">Platforms:</div>
                      <div>{integrationSettings.platforms.join(', ')}</div>
                      <div className="text-gray-500">Sync Frequency:</div>
                      <div>{integrationSettings.syncFrequency}</div>
                      <div className="text-gray-500">Environment:</div>
                      <div>{integrationSettings.environment}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Connection Setup</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Auth Method:</div>
                      <div>{connectionSetup.authMethod}</div>
                      <div className="text-gray-500">Webhooks:</div>
                      <div>{connectionSetup.webhookEndpoints.join(', ')}</div>
                      <div className="text-gray-500">Security:</div>
                      <div>{connectionSetup.securityProtocol}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Data Mapping</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Mapping Rules:</div>
                      <div>{dataMapping.mappingRules.join(', ')}</div>
                      <div className="text-gray-500">Transformations:</div>
                      <div>{dataMapping.transformations.join(', ')}</div>
                      <div className="text-gray-500">Validation Rules:</div>
                      <div>{dataMapping.validationRules ? 'Enabled' : 'Disabled'}</div>
                      <div className="text-gray-500">Error Handling:</div>
                      <div>{dataMapping.errorHandling}</div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleFinish}>
                  Enable Integrations
                  <Bot className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 