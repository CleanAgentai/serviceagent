import React, { useState } from 'react';
import {
  ChevronRight,
  CheckCircle,
  Settings,
  Cog,
  MessageSquare,
  Bot,
  ArrowLeft,
  BarChart
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

export default function OperationsAgentSetup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    {
      id: 1,
      title: 'Process Settings',
      description: 'Configure operational process preferences',
      isCompleted: false
    },
    {
      id: 2,
      title: 'Workflow Rules',
      description: 'Define workflow automation and rules',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Monitoring Setup',
      description: 'Configure monitoring and alerts',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Review & Deploy',
      description: 'Review settings and deploy your operations agent',
      isCompleted: false
    }
  ]);

  // Form states for each step
  const [processSettings, setProcessSettings] = useState({
    agentName: '',
    department: 'general',
    operatingHours: 'business',
    priorityLevels: []
  });

  const [workflowRules, setWorkflowRules] = useState({
    automationRules: [],
    escalationPaths: '',
    approvalWorkflow: 'sequential',
    taskAssignment: 'round-robin'
  });

  const [monitoringSetup, setMonitoringSetup] = useState({
    metrics: [],
    alertThresholds: true,
    reportingFrequency: 'daily',
    notificationChannels: []
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
      processSettings,
      workflowRules,
      monitoringSetup
    });
    navigate('/operations');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Set Up Operations Agent</h1>
          <p className="text-gray-500">Configure your AI operations assistant</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/operations')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Operations
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
              <h2 className="text-lg font-semibold">Process Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Agent Name</label>
                  <Input
                    value={processSettings.agentName}
                    onChange={(e) => setProcessSettings({ ...processSettings, agentName: e.target.value })}
                    placeholder="Enter agent name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <Select
                    value={processSettings.department}
                    onChange={(value) => setProcessSettings({ ...processSettings, department: value })}
                    options={[
                      { value: 'general', label: 'General Operations' },
                      { value: 'it', label: 'IT Operations' },
                      { value: 'facilities', label: 'Facilities Management' },
                      { value: 'supply', label: 'Supply Chain' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Operating Hours</label>
                  <Select
                    value={processSettings.operatingHours}
                    onChange={(value) => setProcessSettings({ ...processSettings, operatingHours: value })}
                    options={[
                      { value: 'business', label: 'Business Hours (9-5)' },
                      { value: 'extended', label: 'Extended Hours (7-7)' },
                      { value: '24-7', label: '24/7 Operations' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority Levels</label>
                  <Select
                    isMulti
                    value={processSettings.priorityLevels}
                    onChange={(value) => setProcessSettings({ ...processSettings, priorityLevels: value })}
                    options={[
                      { value: 'low', label: 'Low Priority' },
                      { value: 'medium', label: 'Medium Priority' },
                      { value: 'high', label: 'High Priority' },
                      { value: 'critical', label: 'Critical' }
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
              <h2 className="text-lg font-semibold">Workflow Rules</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Automation Rules</label>
                  <Select
                    isMulti
                    value={workflowRules.automationRules}
                    onChange={(value) => setWorkflowRules({ ...workflowRules, automationRules: value })}
                    options={[
                      { value: 'task-assignment', label: 'Automatic Task Assignment' },
                      { value: 'notifications', label: 'Automated Notifications' },
                      { value: 'escalation', label: 'Automatic Escalations' },
                      { value: 'reporting', label: 'Automated Reporting' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Escalation Paths</label>
                  <Input
                    value={workflowRules.escalationPaths}
                    onChange={(e) => setWorkflowRules({ ...workflowRules, escalationPaths: e.target.value })}
                    placeholder="Define escalation paths (comma separated)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Approval Workflow</label>
                  <Select
                    value={workflowRules.approvalWorkflow}
                    onChange={(value) => setWorkflowRules({ ...workflowRules, approvalWorkflow: value })}
                    options={[
                      { value: 'sequential', label: 'Sequential Approval' },
                      { value: 'parallel', label: 'Parallel Approval' },
                      { value: 'hybrid', label: 'Hybrid Approval' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Task Assignment</label>
                  <Select
                    value={workflowRules.taskAssignment}
                    onChange={(value) => setWorkflowRules({ ...workflowRules, taskAssignment: value })}
                    options={[
                      { value: 'round-robin', label: 'Round Robin' },
                      { value: 'load-balanced', label: 'Load Balanced' },
                      { value: 'skill-based', label: 'Skill Based' }
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
              <h2 className="text-lg font-semibold">Monitoring Setup</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Key Metrics</label>
                  <Select
                    isMulti
                    value={monitoringSetup.metrics}
                    onChange={(value) => setMonitoringSetup({ ...monitoringSetup, metrics: value })}
                    options={[
                      { value: 'response-time', label: 'Response Time' },
                      { value: 'resolution-time', label: 'Resolution Time' },
                      { value: 'sla-compliance', label: 'SLA Compliance' },
                      { value: 'resource-utilization', label: 'Resource Utilization' }
                    ]}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Enable Alert Thresholds</label>
                  <input
                    type="checkbox"
                    checked={monitoringSetup.alertThresholds}
                    onChange={(e) => setMonitoringSetup({
                      ...monitoringSetup,
                      alertThresholds: e.target.checked
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reporting Frequency</label>
                  <Select
                    value={monitoringSetup.reportingFrequency}
                    onChange={(value) => setMonitoringSetup({ ...monitoringSetup, reportingFrequency: value })}
                    options={[
                      { value: 'daily', label: 'Daily Reports' },
                      { value: 'weekly', label: 'Weekly Reports' },
                      { value: 'monthly', label: 'Monthly Reports' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Notification Channels</label>
                  <Select
                    isMulti
                    value={monitoringSetup.notificationChannels}
                    onChange={(value) => setMonitoringSetup({ ...monitoringSetup, notificationChannels: value })}
                    options={[
                      { value: 'email', label: 'Email' },
                      { value: 'slack', label: 'Slack' },
                      { value: 'teams', label: 'Microsoft Teams' },
                      { value: 'sms', label: 'SMS' }
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
              <h2 className="text-lg font-semibold">Review & Deploy</h2>
              <div className="space-y-6">
                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Process Settings</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Agent Name:</div>
                      <div>{processSettings.agentName}</div>
                      <div className="text-gray-500">Department:</div>
                      <div>{processSettings.department}</div>
                      <div className="text-gray-500">Operating Hours:</div>
                      <div>{processSettings.operatingHours}</div>
                      <div className="text-gray-500">Priority Levels:</div>
                      <div>{processSettings.priorityLevels.join(', ')}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Workflow Rules</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Automation Rules:</div>
                      <div>{workflowRules.automationRules.join(', ')}</div>
                      <div className="text-gray-500">Escalation Paths:</div>
                      <div>{workflowRules.escalationPaths}</div>
                      <div className="text-gray-500">Approval Workflow:</div>
                      <div>{workflowRules.approvalWorkflow}</div>
                      <div className="text-gray-500">Task Assignment:</div>
                      <div>{workflowRules.taskAssignment}</div>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="p-4 space-y-2">
                    <h3 className="font-medium">Monitoring Setup</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Key Metrics:</div>
                      <div>{monitoringSetup.metrics.join(', ')}</div>
                      <div className="text-gray-500">Alert Thresholds:</div>
                      <div>{monitoringSetup.alertThresholds ? 'Enabled' : 'Disabled'}</div>
                      <div className="text-gray-500">Reporting Frequency:</div>
                      <div>{monitoringSetup.reportingFrequency}</div>
                      <div className="text-gray-500">Notification Channels:</div>
                      <div>{monitoringSetup.notificationChannels.join(', ')}</div>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleFinish}>
                  Deploy Operations Agent
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