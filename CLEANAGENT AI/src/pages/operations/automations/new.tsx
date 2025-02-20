import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Plus, Trash2, Settings, Play,
  Mail, Calendar, Users, FileText, MessageSquare,
  Database, ChevronRight, CheckCircle2
} from 'lucide-react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import Select from '../../../components/common/Select';

interface WorkflowStep {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  name: string;
  description: string;
  icon: React.ElementType;
  config: Record<string, any>;
}

export default function NewWorkflowAutomation() {
  const navigate = useNavigate();
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [showStepPicker, setShowStepPicker] = useState(false);

  const availableSteps = {
    triggers: [
      {
        type: 'trigger',
        name: 'New Email Received',
        description: 'Trigger when a new email is received',
        icon: Mail
      },
      {
        type: 'trigger',
        name: 'Calendar Event',
        description: 'Trigger based on calendar events',
        icon: Calendar
      },
      {
        type: 'trigger',
        name: 'Form Submission',
        description: 'Trigger when a form is submitted',
        icon: FileText
      }
    ],
    actions: [
      {
        type: 'action',
        name: 'Send Email',
        description: 'Send an automated email',
        icon: Mail
      },
      {
        type: 'action',
        name: 'Create Task',
        description: 'Create a new task',
        icon: FileText
      },
      {
        type: 'action',
        name: 'Update CRM',
        description: 'Update CRM record',
        icon: Database
      }
    ],
    conditions: [
      {
        type: 'condition',
        name: 'Email Contains',
        description: 'Check if email contains specific text',
        icon: MessageSquare
      },
      {
        type: 'condition',
        name: 'User Role',
        description: 'Check user role or permissions',
        icon: Users
      }
    ]
  };

  const handleAddStep = (step: Partial<WorkflowStep>) => {
    const newStep: WorkflowStep = {
      id: String(steps.length + 1),
      type: step.type || 'action',
      name: step.name || '',
      description: step.description || '',
      icon: step.icon || Mail,
      config: {}
    };
    setSteps(prev => [...prev, newStep]);
    setShowStepPicker(false);
  };

  const handleRemoveStep = (stepId: string) => {
    setSteps(prev => prev.filter(step => step.id !== stepId));
  };

  const handleSaveWorkflow = () => {
    // Save workflow logic here
    navigate('/operations/automations');
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
          <h1 className="text-2xl font-bold">Create New Workflow</h1>
        </div>
      </div>

      {/* Workflow Details */}
      <Card>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Workflow Name</label>
            <Input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              placeholder="e.g., New Lead Processing"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <Input
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              placeholder="Describe what this workflow does"
            />
          </div>
        </div>
      </Card>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card key={step.id}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    step.type === 'trigger' ? 'bg-purple-50 text-purple-600' :
                    step.type === 'action' ? 'bg-blue-50 text-blue-600' :
                    'bg-orange-50 text-orange-600'
                  }`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Step {index + 1}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm font-medium capitalize">{step.type}</span>
                    </div>
                    <h3 className="font-medium">{step.name}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {/* Configure step */}}
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveStep(step.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Add Step Button */}
        <Button
          variant="outline"
          className="w-full py-6 border-dashed"
          onClick={() => setShowStepPicker(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Workflow Step
        </Button>
      </div>

      {/* Step Picker Modal */}
      {showStepPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-semibold">Add Workflow Step</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Triggers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {availableSteps.triggers.map((trigger, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                        onClick={() => handleAddStep(trigger)}
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                              <trigger.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{trigger.name}</h4>
                              <p className="text-sm text-gray-500">{trigger.description}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {availableSteps.actions.map((action, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                        onClick={() => handleAddStep(action)}
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                              <action.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{action.name}</h4>
                              <p className="text-sm text-gray-500">{action.description}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Conditions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {availableSteps.conditions.map((condition, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
                        onClick={() => handleAddStep(condition)}
                      >
                        <div className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                              <condition.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{condition.name}</h4>
                              <p className="text-sm text-gray-500">{condition.description}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowStepPicker(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Save Workflow */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => navigate('/launchpad')}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveWorkflow}
          disabled={!workflowName || steps.length === 0}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Save & Activate Workflow
        </Button>
      </div>
    </div>
  );
} 