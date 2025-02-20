import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Settings,
  Users,
  MessageSquare,
  Bot,
  ArrowLeft,
  Briefcase
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

export default function HiringAgentSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    {
      id: 1,
      title: 'Basic Configuration',
      description: 'Configure your hiring agent preferences',
      isCompleted: false
    },
    {
      id: 2,
      title: 'Job Requirements',
      description: 'Set default job requirements and screening criteria',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Communication Settings',
      description: 'Configure automated responses and notifications',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Review & Activate',
      description: 'Review settings and activate your hiring agent',
      isCompleted: false
    }
  ]);

  // Form states for each step
  const [basicConfig, setBasicConfig] = useState({
    agentName: '',
    language: 'english',
    timezone: 'UTC',
    responseStyle: 'professional'
  });

  const [jobRequirements, setJobRequirements] = useState({
    defaultExperience: '',
    requiredSkills: '',
    educationLevel: '',
    remotePreference: 'hybrid'
  });

  const [communicationSettings, setCommunicationSettings] = useState({
    autoRespond: true,
    responseDelay: '1',
    notifyHiringManager: true,
    followUpDays: '3'
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
      basicConfig,
      jobRequirements,
      communicationSettings
    });
    navigate('/hiring');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Set Up Hiring Agent</h1>
          <p className="text-gray-500">Configure your AI hiring assistant</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/hiring')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Hiring
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
              <h2 className="text-lg font-semibold">Basic Configuration</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name</label>
                  <Input
                    value={basicConfig.agentName}
                    onChange={(e) => setBasicConfig({ ...basicConfig, agentName: e.target.value })}
                    placeholder="Enter agent name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <Select
                    value={basicConfig.language}
                    onChange={(value) => setBasicConfig({ ...basicConfig, language: value })}
                    options={[
                      { value: 'english', label: 'English' },
                      { value: 'spanish', label: 'Spanish' },
                      { value: 'french', label: 'French' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Response Style</label>
                  <Select
                    value={basicConfig.responseStyle}
                    onChange={(value) => setBasicConfig({ ...basicConfig, responseStyle: value })}
                    options={[
                      { value: 'professional', label: 'Professional' },
                      { value: 'casual', label: 'Casual' },
                      { value: 'friendly', label: 'Friendly' }
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
              <h2 className="text-lg font-semibold">Job Requirements</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Default Experience Level</label>
                  <Select
                    value={jobRequirements.defaultExperience}
                    onChange={(value) => setJobRequirements({ ...jobRequirements, defaultExperience: value })}
                    options={[
                      { value: 'entry', label: 'Entry Level (0-2 years)' },
                      { value: 'mid', label: 'Mid Level (3-5 years)' },
                      { value: 'senior', label: 'Senior Level (5+ years)' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Required Skills</label>
                  <Input
                    value={jobRequirements.requiredSkills}
                    onChange={(e) => setJobRequirements({ ...jobRequirements, requiredSkills: e.target.value })}
                    placeholder="Enter required skills (comma separated)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Education Level</label>
                  <Select
                    value={jobRequirements.educationLevel}
                    onChange={(value) => setJobRequirements({ ...jobRequirements, educationLevel: value })}
                    options={[
                      { value: 'high-school', label: 'High School' },
                      { value: 'bachelors', label: 'Bachelor's Degree' },
                      { value: 'masters', label: 'Master's Degree' }
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
              <h2 className="text-lg font-semibold">Communication Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Auto-respond to Applications</label>
                  <input
                    type="checkbox"
                    checked={communicationSettings.autoRespond}
                    onChange={(e) => setCommunicationSettings({
                      ...communicationSettings,
                      autoRespond: e.target.checked
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Response Delay (hours)</label>
                  <Input
                    type="number"
                    value={communicationSettings.responseDelay}
                    onChange={(e) => setCommunicationSettings({
                      ...communicationSettings,
                      responseDelay: e.target.value
                    })}
                    placeholder="Enter delay in hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Follow-up Days</label>
                  <Input
                    type="number"
                    value={communicationSettings.followUpDays}
                    onChange={(e) => setCommunicationSettings({
                      ...communicationSettings,
                      followUpDays: e.target.value
                    })}
                    placeholder="Enter days before follow-up"
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
              <h2 className="text-lg font-semibold">Review & Activate</h2>
              <div className="space-y-6">
                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Basic Configuration</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Agent Name:</div>
                      <div>{basicConfig.agentName}</div>
                      <div className="text-gray-500">Language:</div>
                      <div>{basicConfig.language}</div>
                      <div className="text-gray-500">Response Style:</div>
                      <div>{basicConfig.responseStyle}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Job Requirements</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Experience Level:</div>
                      <div>{jobRequirements.defaultExperience}</div>
                      <div className="text-gray-500">Required Skills:</div>
                      <div>{jobRequirements.requiredSkills}</div>
                      <div className="text-gray-500">Education Level:</div>
                      <div>{jobRequirements.educationLevel}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Communication Settings</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Auto-respond:</div>
                      <div>{communicationSettings.autoRespond ? 'Yes' : 'No'}</div>
                      <div className="text-gray-500">Response Delay:</div>
                      <div>{communicationSettings.responseDelay} hours</div>
                      <div className="text-gray-500">Follow-up After:</div>
                      <div>{communicationSettings.followUpDays} days</div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleFinish}>
                  Activate Hiring Agent
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
