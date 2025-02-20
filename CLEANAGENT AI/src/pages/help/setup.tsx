import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Settings,
  HelpCircle,
  MessageSquare,
  Bot,
  ArrowLeft,
  LifeBuoy
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

export default function HelpAgentSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    {
      id: 1,
      title: 'Support Settings',
      description: 'Configure your help desk preferences',
      isCompleted: false
    },
    {
      id: 2,
      title: 'Knowledge Base',
      description: 'Set up knowledge base and documentation',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Response Settings',
      description: 'Configure automated responses and routing',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Review & Launch',
      description: 'Review settings and launch your help agent',
      isCompleted: false
    }
  ]);

  // Form states for each step
  const [supportSettings, setSupportSettings] = useState({
    agentName: '',
    supportLanguages: [],
    supportHours: 'business',
    ticketCategories: []
  });

  const [knowledgeBase, setKnowledgeBase] = useState({
    documentationSources: [],
    articleCategories: [],
    searchEnabled: true,
    autoSuggestions: true
  });

  const [responseSettings, setResponseSettings] = useState({
    autoRespond: true,
    responseTemplates: [],
    routingRules: 'round-robin',
    priorityLevels: []
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
      supportSettings,
      knowledgeBase,
      responseSettings
    });
    navigate('/help');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Set Up Help Agent</h1>
          <p className="text-gray-500">Configure your AI help desk assistant</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/help')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Help
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
              <h2 className="text-lg font-semibold">Support Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name</label>
                  <Input
                    value={supportSettings.agentName}
                    onChange={(e) => setSupportSettings({ ...supportSettings, agentName: e.target.value })}
                    placeholder="Enter agent name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Support Languages</label>
                  <Select
                    isMulti
                    value={supportSettings.supportLanguages}
                    onChange={(value) => setSupportSettings({ ...supportSettings, supportLanguages: value })}
                    options={[
                      { value: 'english', label: 'English' },
                      { value: 'spanish', label: 'Spanish' },
                      { value: 'french', label: 'French' },
                      { value: 'german', label: 'German' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Support Hours</label>
                  <Select
                    value={supportSettings.supportHours}
                    onChange={(value) => setSupportSettings({ ...supportSettings, supportHours: value })}
                    options={[
                      { value: 'business', label: 'Business Hours (9-5)' },
                      { value: 'extended', label: 'Extended Hours (7-7)' },
                      { value: '24-7', label: '24/7 Support' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ticket Categories</label>
                  <Select
                    isMulti
                    value={supportSettings.ticketCategories}
                    onChange={(value) => setSupportSettings({ ...supportSettings, ticketCategories: value })}
                    options={[
                      { value: 'technical', label: 'Technical Support' },
                      { value: 'billing', label: 'Billing & Payments' },
                      { value: 'account', label: 'Account Management' },
                      { value: 'product', label: 'Product Questions' }
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
              <h2 className="text-lg font-semibold">Knowledge Base</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Documentation Sources</label>
                  <Select
                    isMulti
                    value={knowledgeBase.documentationSources}
                    onChange={(value) => setKnowledgeBase({ ...knowledgeBase, documentationSources: value })}
                    options={[
                      { value: 'user-guide', label: 'User Guide' },
                      { value: 'faq', label: 'FAQ' },
                      { value: 'api-docs', label: 'API Documentation' },
                      { value: 'tutorials', label: 'Tutorials' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Article Categories</label>
                  <Select
                    isMulti
                    value={knowledgeBase.articleCategories}
                    onChange={(value) => setKnowledgeBase({ ...knowledgeBase, articleCategories: value })}
                    options={[
                      { value: 'getting-started', label: 'Getting Started' },
                      { value: 'troubleshooting', label: 'Troubleshooting' },
                      { value: 'best-practices', label: 'Best Practices' },
                      { value: 'integrations', label: 'Integrations' }
                    ]}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Smart Search</label>
                  <input
                    type="checkbox"
                    checked={knowledgeBase.searchEnabled}
                    onChange={(e) => setKnowledgeBase({
                      ...knowledgeBase,
                      searchEnabled: e.target.checked
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Auto-suggestions</label>
                  <input
                    type="checkbox"
                    checked={knowledgeBase.autoSuggestions}
                    onChange={(e) => setKnowledgeBase({
                      ...knowledgeBase,
                      autoSuggestions: e.target.checked
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
              <h2 className="text-lg font-semibold">Response Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Auto-responses</label>
                  <input
                    type="checkbox"
                    checked={responseSettings.autoRespond}
                    onChange={(e) => setResponseSettings({
                      ...responseSettings,
                      autoRespond: e.target.checked
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Response Templates</label>
                  <Select
                    isMulti
                    value={responseSettings.responseTemplates}
                    onChange={(value) => setResponseSettings({ ...responseSettings, responseTemplates: value })}
                    options={[
                      { value: 'greeting', label: 'Greeting Template' },
                      { value: 'acknowledgment', label: 'Ticket Acknowledgment' },
                      { value: 'resolution', label: 'Resolution Template' },
                      { value: 'escalation', label: 'Escalation Notice' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Routing Rules</label>
                  <Select
                    value={responseSettings.routingRules}
                    onChange={(value) => setResponseSettings({ ...responseSettings, routingRules: value })}
                    options={[
                      { value: 'round-robin', label: 'Round Robin' },
                      { value: 'skill-based', label: 'Skill Based' },
                      { value: 'load-balanced', label: 'Load Balanced' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority Levels</label>
                  <Select
                    isMulti
                    value={responseSettings.priorityLevels}
                    onChange={(value) => setResponseSettings({ ...responseSettings, priorityLevels: value })}
                    options={[
                      { value: 'low', label: 'Low Priority' },
                      { value: 'medium', label: 'Medium Priority' },
                      { value: 'high', label: 'High Priority' },
                      { value: 'urgent', label: 'Urgent' }
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
              <h2 className="text-lg font-semibold">Review & Launch</h2>
              <div className="space-y-6">
                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Support Settings</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Agent Name:</div>
                      <div>{supportSettings.agentName}</div>
                      <div className="text-gray-500">Languages:</div>
                      <div>{supportSettings.supportLanguages.join(', ')}</div>
                      <div className="text-gray-500">Support Hours:</div>
                      <div>{supportSettings.supportHours}</div>
                      <div className="text-gray-500">Categories:</div>
                      <div>{supportSettings.ticketCategories.join(', ')}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Knowledge Base</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Documentation:</div>
                      <div>{knowledgeBase.documentationSources.join(', ')}</div>
                      <div className="text-gray-500">Categories:</div>
                      <div>{knowledgeBase.articleCategories.join(', ')}</div>
                      <div className="text-gray-500">Smart Search:</div>
                      <div>{knowledgeBase.searchEnabled ? 'Enabled' : 'Disabled'}</div>
                      <div className="text-gray-500">Auto-suggestions:</div>
                      <div>{knowledgeBase.autoSuggestions ? 'Enabled' : 'Disabled'}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Response Settings</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Auto-respond:</div>
                      <div>{responseSettings.autoRespond ? 'Enabled' : 'Disabled'}</div>
                      <div className="text-gray-500">Templates:</div>
                      <div>{responseSettings.responseTemplates.join(', ')}</div>
                      <div className="text-gray-500">Routing Rules:</div>
                      <div>{responseSettings.routingRules}</div>
                      <div className="text-gray-500">Priority Levels:</div>
                      <div>{responseSettings.priorityLevels.join(', ')}</div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleFinish}>
                  Launch Help Agent
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