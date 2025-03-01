import React, { useState } from 'react';
import {
  Plus,
  Clock,
  BarChart2,
  Mail,
  ChevronRight,
  ChevronDown,
  Settings,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react';

interface EmailStep {
  id: string;
  templateId: string;
  templateName: string;
  delay: number; // delay in days
  subject: string;
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    bounced: number;
  };
}

interface EmailSequence {
  id: string;
  name: string;
  description: string;
  steps: EmailStep[];
  status: 'active' | 'paused' | 'draft';
  createdAt: string;
  updatedAt: string;
  metrics: {
    totalRecipients: number;
    completionRate: number;
    averageOpenRate: number;
    averageClickRate: number;
  };
}

const EmailSequenceManager: React.FC = () => {
  const [sequences, setSequences] = useState<EmailSequence[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<EmailSequence | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showStepEditor, setShowStepEditor] = useState(false);
  const [editingStep, setEditingStep] = useState<EmailStep | null>(null);

  const handleCreateSequence = () => {
    const newSequence: EmailSequence = {
      id: Date.now().toString(),
      name: 'Untitled Sequence',
      description: '',
      steps: [],
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: {
        totalRecipients: 0,
        completionRate: 0,
        averageOpenRate: 0,
        averageClickRate: 0
      }
    };
    setSelectedSequence(newSequence);
    setIsCreating(true);
  };

  const handleAddStep = () => {
    if (!selectedSequence) return;

    const newStep: EmailStep = {
      id: Date.now().toString(),
      templateId: '',
      templateName: '',
      delay: 1,
      subject: '',
      metrics: {
        sent: 0,
        opened: 0,
        clicked: 0,
        bounced: 0
      }
    };
    setEditingStep(newStep);
    setShowStepEditor(true);
  };

  const handleSaveStep = (step: EmailStep) => {
    if (!selectedSequence) return;

    const updatedSteps = editingStep
      ? selectedSequence.steps.map(s => s.id === editingStep.id ? step : s)
      : [...selectedSequence.steps, step];

    setSelectedSequence({
      ...selectedSequence,
      steps: updatedSteps,
      updatedAt: new Date().toISOString()
    });

    setEditingStep(null);
    setShowStepEditor(false);
  };

  const handleSaveSequence = () => {
    if (!selectedSequence) return;

    if (isCreating) {
      setSequences([...sequences, selectedSequence]);
    } else {
      setSequences(sequences.map(s =>
        s.id === selectedSequence.id ? selectedSequence : s
      ));
    }

    setIsCreating(false);
    setSelectedSequence(null);
  };

  const calculateStepMetrics = (step: EmailStep) => {
    const openRate = step.metrics.sent > 0
      ? (step.metrics.opened / step.metrics.sent) * 100
      : 0;
    const clickRate = step.metrics.opened > 0
      ? (step.metrics.clicked / step.metrics.opened) * 100
      : 0;
    const bounceRate = step.metrics.sent > 0
      ? (step.metrics.bounced / step.metrics.sent) * 100
      : 0;

    return { openRate, clickRate, bounceRate };
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sequences Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Email Sequences</h2>
            <button
              onClick={handleCreateSequence}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              title="Create new sequence"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {sequences.map((sequence) => (
            <div
              key={sequence.id}
              className="mb-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
              onClick={() => setSelectedSequence(sequence)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">{sequence.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  sequence.status === 'active' ? 'bg-green-100 text-green-800' :
                  sequence.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {sequence.status.charAt(0).toUpperCase() + sequence.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {sequence.steps.length} steps
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sequence Editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedSequence ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <input
                  type="text"
                  value={selectedSequence.name}
                  onChange={(e) => setSelectedSequence({
                    ...selectedSequence,
                    name: e.target.value
                  })}
                  className="text-2xl font-bold bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                <textarea
                  value={selectedSequence.description}
                  onChange={(e) => setSelectedSequence({
                    ...selectedSequence,
                    description: e.target.value
                  })}
                  placeholder="Add a description..."
                  className="mt-2 w-full text-gray-600 bg-transparent border-none focus:outline-none resize-none"
                  rows={2}
                />
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={selectedSequence.status}
                  onChange={(e) => setSelectedSequence({
                    ...selectedSequence,
                    status: e.target.value as EmailSequence['status']
                  })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
                <button
                  onClick={handleSaveSequence}
                  className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Sequence
                </button>
              </div>
            </div>

            {/* Sequence Timeline */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Sequence Steps</h3>
                <button
                  onClick={handleAddStep}
                  className="flex items-center px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </button>
              </div>

              <div className="space-y-4">
                {selectedSequence.steps.map((step, index) => {
                  const metrics = calculateStepMetrics(step);
                  
                  return (
                    <div
                      key={step.id}
                      className="relative pl-8 pb-8 last:pb-0"
                    >
                      {/* Timeline line */}
                      {index < selectedSequence.steps.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200" />
                      )}
                      
                      {/* Timeline dot */}
                      <div className="absolute left-2 top-2 w-4 h-4 rounded-full bg-blue-500" />
                      
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {step.templateName || 'Select Template'}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Delay: {step.delay} {step.delay === 1 ? 'day' : 'days'}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setEditingStep(step);
                                setShowStepEditor(true);
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedSequence({
                                  ...selectedSequence,
                                  steps: selectedSequence.steps.filter(s => s.id !== step.id)
                                });
                              }}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Step Metrics */}
                        <div className="grid grid-cols-4 gap-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Sent</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {step.metrics.sent}
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Open Rate</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {metrics.openRate.toFixed(1)}%
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Click Rate</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {metrics.clickRate.toFixed(1)}%
                            </p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500">Bounce Rate</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {metrics.bounceRate.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sequence Metrics */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Performance</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Total Recipients</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {selectedSequence.metrics.totalRecipients}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Completion Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {selectedSequence.metrics.completionRate.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Avg. Open Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {selectedSequence.metrics.averageOpenRate.toFixed(1)}%
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-500">Avg. Click Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {selectedSequence.metrics.averageClickRate.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Sequence Selected
              </h3>
              <p className="text-gray-500">
                Create a new sequence or select one from the library
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Step Editor Modal */}
      {showStepEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingStep ? 'Edit Step' : 'Add Step'}
              </h3>
              <button
                onClick={() => {
                  setShowStepEditor(false);
                  setEditingStep(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template
                </label>
                <select
                  value={editingStep?.templateId || ''}
                  onChange={(e) => setEditingStep(prev => prev ? {
                    ...prev,
                    templateId: e.target.value,
                    templateName: e.target.options[e.target.selectedIndex].text
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a template</option>
                  {/* Add your templates here */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delay (days)
                </label>
                <input
                  type="number"
                  min="0"
                  value={editingStep?.delay || 0}
                  onChange={(e) => setEditingStep(prev => prev ? {
                    ...prev,
                    delay: parseInt(e.target.value)
                  } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowStepEditor(false);
                    setEditingStep(null);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => editingStep && handleSaveStep(editingStep)}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Save Step
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailSequenceManager; 