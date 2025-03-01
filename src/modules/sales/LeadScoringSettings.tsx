import React, { useState } from 'react';
import { X, Plus, Trash, AlertCircle, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ScoreRule, ScoreOperator, ScoreFieldType, ScoringSettings } from '@/types/leads';

interface LeadScoringSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ScoringSettings;
  onSave: (settings: ScoringSettings) => void;
}

const fieldOptions: { value: ScoreFieldType; label: string }[] = [
  { value: 'source', label: 'Lead Source' },
  { value: 'status', label: 'Lead Status' },
  { value: 'tags', label: 'Tags' },
  { value: 'budget', label: 'Budget' },
  { value: 'company', label: 'Company' },
  { value: 'interactionCount', label: 'Interaction Count' },
  { value: 'lastInteraction', label: 'Last Interaction Date' }
];

const operatorOptions: Record<ScoreFieldType, { value: ScoreOperator; label: string }[]> = {
  source: [
    { value: 'equals', label: 'Equals' },
    { value: 'contains', label: 'Contains' }
  ],
  status: [
    { value: 'equals', label: 'Equals' }
  ],
  tags: [
    { value: 'contains', label: 'Contains' },
    { value: 'exists', label: 'Has any tags' },
    { value: 'not_exists', label: 'Has no tags' }
  ],
  budget: [
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'equals', label: 'Equals' },
    { value: 'exists', label: 'Has budget specified' },
    { value: 'not_exists', label: 'Has no budget specified' }
  ],
  company: [
    { value: 'exists', label: 'Has company specified' },
    { value: 'not_exists', label: 'Has no company specified' },
    { value: 'contains', label: 'Company name contains' }
  ],
  interactionCount: [
    { value: 'greater_than', label: 'Greater than' },
    { value: 'less_than', label: 'Less than' },
    { value: 'equals', label: 'Equals' }
  ],
  lastInteraction: [
    { value: 'exists', label: 'Has interacted' },
    { value: 'not_exists', label: 'Has not interacted' }
  ]
};

const LeadScoringSettings: React.FC<LeadScoringSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSave
}) => {
  const [currentSettings, setCurrentSettings] = useState<ScoringSettings>(settings);
  const [newRule, setNewRule] = useState<Partial<ScoreRule>>({
    field: 'source',
    operator: 'equals',
    value: '',
    points: 10,
    isActive: true
  });
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAddRule = () => {
    if (!newRule.field || !newRule.operator || newRule.value === '' || newRule.points === undefined) {
      setError('Please fill in all fields for the new rule');
      return;
    }

    const rule: ScoreRule = {
      id: uuidv4(),
      name: `${fieldOptions.find(f => f.value === newRule.field)?.label} ${
        operatorOptions[newRule.field as ScoreFieldType].find(o => o.value === newRule.operator)?.label
      } ${newRule.value}`,
      field: newRule.field as ScoreFieldType,
      operator: newRule.operator as ScoreOperator,
      value: newRule.value,
      points: newRule.points,
      isActive: true
    };

    setCurrentSettings(prev => ({
      ...prev,
      rules: [...prev.rules, rule]
    }));

    // Reset new rule form
    setNewRule({
      field: 'source',
      operator: 'equals',
      value: '',
      points: 10,
      isActive: true
    });
    setError(null);
  };

  const handleDeleteRule = (ruleId: string) => {
    setCurrentSettings(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== ruleId)
    }));
  };

  const handleToggleRule = (ruleId: string) => {
    setCurrentSettings(prev => ({
      ...prev,
      rules: prev.rules.map(rule => 
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    }));
  };

  const handleToggleAI = () => {
    setCurrentSettings(prev => ({
      ...prev,
      aiAssist: !prev.aiAssist
    }));
  };

  const handleScoreRangeChange = (field: 'minScore' | 'maxScore', value: string) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;

    setCurrentSettings(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleSaveSettings = () => {
    onSave(currentSettings);
    onClose();
  };

  const handleFieldChange = (field: ScoreFieldType) => {
    const defaultOperator = operatorOptions[field][0].value;
    setNewRule(prev => ({
      ...prev,
      field,
      operator: defaultOperator,
      value: defaultOperator === 'exists' || defaultOperator === 'not_exists' ? true : ''
    }));
  };

  const handleOperatorChange = (operator: ScoreOperator) => {
    setNewRule(prev => ({
      ...prev,
      operator,
      value: operator === 'exists' || operator === 'not_exists' ? true : ''
    }));
  };

  const renderValueInput = () => {
    const { field, operator } = newRule;
    
    if (!field || !operator) return null;
    
    if (operator === 'exists' || operator === 'not_exists') {
      return null; // No value input needed for exists/not_exists operators
    }
    
    if (field === 'budget' || field === 'interactionCount') {
      return (
        <input
          type="number"
          value={newRule.value as number}
          onChange={(e) => setNewRule(prev => ({ ...prev, value: parseFloat(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder={field === 'budget' ? "Budget amount" : "Number of interactions"}
        />
      );
    }
    
    if (field === 'source') {
      return (
        <select
          value={newRule.value as string}
          onChange={(e) => setNewRule(prev => ({ ...prev, value: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select source</option>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Social Media">Social Media</option>
          <option value="Email Campaign">Email Campaign</option>
          <option value="Event">Event</option>
          <option value="Other">Other</option>
        </select>
      );
    }
    
    if (field === 'status') {
      return (
        <select
          value={newRule.value as string}
          onChange={(e) => setNewRule(prev => ({ ...prev, value: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
          <option value="Converted">Converted</option>
        </select>
      );
    }
    
    return (
      <input
        type="text"
        value={newRule.value as string}
        onChange={(e) => setNewRule(prev => ({ ...prev, value: e.target.value }))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        placeholder="Value"
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Lead Scoring Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Score Range Settings */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-medium text-gray-700 mb-3">Score Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Score
                </label>
                <input
                  type="number"
                  id="minScore"
                  value={currentSettings.minScore}
                  onChange={(e) => handleScoreRangeChange('minScore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="maxScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Score
                </label>
                <input
                  type="number"
                  id="maxScore"
                  value={currentSettings.maxScore}
                  onChange={(e) => handleScoreRangeChange('maxScore', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* AI Assist Toggle */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-medium text-blue-700">AI-Assisted Scoring</h3>
                <p className="text-sm text-blue-600 mt-1">
                  Allow AI to adjust scores based on lead behavior and chat interactions
                </p>
              </div>
              <button
                onClick={handleToggleAI}
                className="text-blue-600 hover:text-blue-800"
              >
                {currentSettings.aiAssist ? (
                  <ToggleRight className="h-8 w-8" />
                ) : (
                  <ToggleLeft className="h-8 w-8" />
                )}
              </button>
            </div>
          </div>
          
          {/* Existing Rules */}
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-3">Scoring Rules</h3>
            
            {currentSettings.rules.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No scoring rules defined yet</p>
                <p className="text-sm text-gray-400 mt-1">Add rules below to automatically score leads</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentSettings.rules.map((rule) => (
                  <div 
                    key={rule.id} 
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      rule.isActive ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        rule.points >= 0 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {rule.points >= 0 ? '+' : ''}{rule.points}
                      </div>
                      <div>
                        <div className={`font-medium ${rule.isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                          {rule.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {fieldOptions.find(f => f.value === rule.field)?.label} • 
                          {operatorOptions[rule.field].find(o => o.value === rule.operator)?.label} • 
                          {typeof rule.value === 'boolean' ? (rule.value ? 'Yes' : 'No') : rule.value}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleRule(rule.id)}
                        className={`text-gray-400 hover:text-gray-600 ${!rule.isActive && 'opacity-50'}`}
                      >
                        {rule.isActive ? (
                          <ToggleRight className="h-5 w-5" />
                        ) : (
                          <ToggleLeft className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Add New Rule */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-md font-medium text-gray-700 mb-3">Add New Rule</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Field
                </label>
                <select
                  value={newRule.field}
                  onChange={(e) => handleFieldChange(e.target.value as ScoreFieldType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {fieldOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operator
                </label>
                <select
                  value={newRule.operator}
                  onChange={(e) => handleOperatorChange(e.target.value as ScoreOperator)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {newRule.field && operatorOptions[newRule.field as ScoreFieldType].map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                {renderValueInput()}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Points
                </label>
                <input
                  type="number"
                  value={newRule.points}
                  onChange={(e) => setNewRule(prev => ({ ...prev, points: parseInt(e.target.value, 10) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddRule}
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadScoringSettings; 