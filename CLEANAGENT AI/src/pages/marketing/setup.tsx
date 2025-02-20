import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Settings,
  Target,
  MessageSquare,
  Bot,
  ArrowLeft,
  Megaphone
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

export default function MarketingAgentSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    {
      id: 1,
      title: 'Campaign Settings',
      description: 'Configure your marketing campaign preferences',
      isCompleted: false
    },
    {
      id: 2,
      title: 'Content Strategy',
      description: 'Define content types and posting schedule',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Channel Settings',
      description: 'Configure marketing channels and automation',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Review & Launch',
      description: 'Review settings and launch your marketing agent',
      isCompleted: false
    }
  ]);

  // Form states for each step
  const [campaignSettings, setCampaignSettings] = useState({
    campaignName: '',
    targetAudience: '',
    industry: 'technology',
    goals: 'awareness'
  });

  const [contentStrategy, setContentStrategy] = useState({
    contentTypes: [],
    tone: 'professional',
    frequency: 'daily',
    keywords: ''
  });

  const [channelSettings, setChannelSettings] = useState({
    channels: [],
    autoSchedule: true,
    bestTimeToPost: true,
    engagementResponses: true
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
      campaignSettings,
      contentStrategy,
      channelSettings
    });
    navigate('/marketing');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Set Up Marketing Agent</h1>
          <p className="text-gray-500">Configure your AI marketing assistant</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/marketing')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketing
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
              <h2 className="text-lg font-semibold">Campaign Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Name</label>
                  <Input
                    value={campaignSettings.campaignName}
                    onChange={(e) => setCampaignSettings({ ...campaignSettings, campaignName: e.target.value })}
                    placeholder="Enter campaign name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Audience</label>
                  <Input
                    value={campaignSettings.targetAudience}
                    onChange={(e) => setCampaignSettings({ ...campaignSettings, targetAudience: e.target.value })}
                    placeholder="Describe your target audience"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <Select
                    value={campaignSettings.industry}
                    onChange={(value) => setCampaignSettings({ ...campaignSettings, industry: value })}
                    options={[
                      { value: 'technology', label: 'Technology' },
                      { value: 'healthcare', label: 'Healthcare' },
                      { value: 'finance', label: 'Finance' },
                      { value: 'retail', label: 'Retail' },
                      { value: 'education', label: 'Education' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Goals</label>
                  <Select
                    value={campaignSettings.goals}
                    onChange={(value) => setCampaignSettings({ ...campaignSettings, goals: value })}
                    options={[
                      { value: 'awareness', label: 'Brand Awareness' },
                      { value: 'leads', label: 'Lead Generation' },
                      { value: 'sales', label: 'Sales Conversion' },
                      { value: 'engagement', label: 'Community Engagement' }
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
              <h2 className="text-lg font-semibold">Content Strategy</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Types</label>
                  <Select
                    isMulti
                    value={contentStrategy.contentTypes}
                    onChange={(value) => setContentStrategy({ ...contentStrategy, contentTypes: value })}
                    options={[
                      { value: 'blog', label: 'Blog Posts' },
                      { value: 'social', label: 'Social Media Posts' },
                      { value: 'email', label: 'Email Campaigns' },
                      { value: 'video', label: 'Video Content' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content Tone</label>
                  <Select
                    value={contentStrategy.tone}
                    onChange={(value) => setContentStrategy({ ...contentStrategy, tone: value })}
                    options={[
                      { value: 'professional', label: 'Professional' },
                      { value: 'casual', label: 'Casual' },
                      { value: 'friendly', label: 'Friendly' },
                      { value: 'humorous', label: 'Humorous' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Posting Frequency</label>
                  <Select
                    value={contentStrategy.frequency}
                    onChange={(value) => setContentStrategy({ ...contentStrategy, frequency: value })}
                    options={[
                      { value: 'daily', label: 'Daily' },
                      { value: 'weekly', label: 'Weekly' },
                      { value: 'biweekly', label: 'Bi-weekly' },
                      { value: 'monthly', label: 'Monthly' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Target Keywords</label>
                  <Input
                    value={contentStrategy.keywords}
                    onChange={(e) => setContentStrategy({ ...contentStrategy, keywords: e.target.value })}
                    placeholder="Enter target keywords (comma separated)"
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
              <h2 className="text-lg font-semibold">Channel Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Marketing Channels</label>
                  <Select
                    isMulti
                    value={channelSettings.channels}
                    onChange={(value) => setChannelSettings({ ...channelSettings, channels: value })}
                    options={[
                      { value: 'facebook', label: 'Facebook' },
                      { value: 'twitter', label: 'Twitter' },
                      { value: 'linkedin', label: 'LinkedIn' },
                      { value: 'instagram', label: 'Instagram' },
                      { value: 'email', label: 'Email Marketing' }
                    ]}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto-schedule Posts</label>
                    <input
                      type="checkbox"
                      checked={channelSettings.autoSchedule}
                      onChange={(e) => setChannelSettings({
                        ...channelSettings,
                        autoSchedule: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Optimize Post Timing</label>
                    <input
                      type="checkbox"
                      checked={channelSettings.bestTimeToPost}
                      onChange={(e) => setChannelSettings({
                        ...channelSettings,
                        bestTimeToPost: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto-respond to Engagement</label>
                    <input
                      type="checkbox"
                      checked={channelSettings.engagementResponses}
                      onChange={(e) => setChannelSettings({
                        ...channelSettings,
                        engagementResponses: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
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
                    <h3 className="font-medium">Campaign Settings</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Campaign Name:</div>
                      <div>{campaignSettings.campaignName}</div>
                      <div className="text-gray-500">Target Audience:</div>
                      <div>{campaignSettings.targetAudience}</div>
                      <div className="text-gray-500">Industry:</div>
                      <div>{campaignSettings.industry}</div>
                      <div className="text-gray-500">Goals:</div>
                      <div>{campaignSettings.goals}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Content Strategy</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Content Types:</div>
                      <div>{contentStrategy.contentTypes.join(', ')}</div>
                      <div className="text-gray-500">Tone:</div>
                      <div>{contentStrategy.tone}</div>
                      <div className="text-gray-500">Frequency:</div>
                      <div>{contentStrategy.frequency}</div>
                      <div className="text-gray-500">Keywords:</div>
                      <div>{contentStrategy.keywords}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Channel Settings</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Channels:</div>
                      <div>{channelSettings.channels.join(', ')}</div>
                      <div className="text-gray-500">Auto-schedule:</div>
                      <div>{channelSettings.autoSchedule ? 'Yes' : 'No'}</div>
                      <div className="text-gray-500">Optimize Timing:</div>
                      <div>{channelSettings.bestTimeToPost ? 'Yes' : 'No'}</div>
                      <div className="text-gray-500">Auto-respond:</div>
                      <div>{channelSettings.engagementResponses ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleFinish}>
                  Launch Marketing Agent
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