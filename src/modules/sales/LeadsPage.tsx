import React, { useState, useEffect } from 'react';
import { Plus, Upload, Download, Filter, Settings } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import LeadTable from './LeadTable';
import LeadForm from './LeadForm';
import CSVImport from './CSVImport';
import LeadDetailsPanel from './LeadDetailsPanel';
import LeadScoringSettings from './LeadScoringSettings';
import { Lead, LeadFormData, LeadStatus } from '@/types/leads';
import { getDefaultScoringSettings, calculateLeadScore, applyAIScoreAdjustments } from '@/services/leadScoringService';
import { PipelineStage } from '@/types/pipeline';

// Mock sales reps data
const mockSalesReps = [
  { id: 'rep1', name: 'Sarah Thompson' },
  { id: 'rep2', name: 'Michael Rodriguez' },
  { id: 'rep3', name: 'Jessica Chen' },
  { id: 'rep4', name: 'David Kim' }
];

// Mock data for initial leads
const initialLeads: Lead[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    company: 'Acme Inc',
    source: 'Website',
    status: 'New',
    score: 65,
    createdAt: new Date().toISOString(),
    tags: ['Interested', 'Product A'],
    budget: 15000,
    interactionCount: 2,
    lastInteraction: new Date().toISOString(),
    scoreBreakdown: [
      {
        ruleId: '1',
        ruleName: 'Has company information',
        points: 10,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '2',
        ruleName: 'High budget',
        points: 25,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '3',
        ruleName: 'Has interacted',
        points: 15,
        appliedAt: new Date().toISOString()
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    company: 'XYZ Corp',
    source: 'LinkedIn',
    status: 'Contacted',
    score: 85,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ['High Priority', 'Enterprise'],
    budget: 50000,
    interactionCount: 5,
    lastInteraction: new Date().toISOString(),
    scoreBreakdown: [
      {
        ruleId: '1',
        ruleName: 'Lead from LinkedIn',
        points: 20,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '2',
        ruleName: 'Has company information',
        points: 10,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '3',
        ruleName: 'High budget',
        points: 25,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '4',
        ruleName: 'Has interacted multiple times',
        points: 15,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '5',
        ruleName: 'AI: High engagement pattern detected',
        points: 15,
        appliedAt: new Date().toISOString()
      }
    ],
    aiAdjusted: true
  },
  {
    id: uuidv4(),
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '(555) 987-6543',
    status: 'Lost',
    score: 20,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    tags: ['Cold'],
    interactionCount: 1,
    scoreBreakdown: [
      {
        ruleId: '1',
        ruleName: 'No company information',
        points: -5,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '2',
        ruleName: 'No budget specified',
        points: -5,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '3',
        ruleName: 'Low interaction count',
        points: 5,
        appliedAt: new Date().toISOString()
      },
      {
        ruleId: '4',
        ruleName: 'Status is Lost',
        points: -15,
        appliedAt: new Date().toISOString()
      }
    ]
  }
];

interface LeadsPageProps {
  initialLeads?: Lead[];
  pipelineStages?: PipelineStage[];
  onUpdateLead?: (lead: Lead) => void;
}

const LeadsPage: React.FC<LeadsPageProps> = ({ 
  initialLeads: propsInitialLeads = initialLeads, 
  pipelineStages,
  onUpdateLead
}) => {
  const [leads, setLeads] = useState<Lead[]>(propsInitialLeads);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isCSVImportOpen, setIsCSVImportOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);
  const [isScoringSettingsOpen, setIsScoringSettingsOpen] = useState(false);
  const [scoringSettings, setScoringSettings] = useState(getDefaultScoringSettings());

  const filteredLeads = statusFilter === 'All' 
    ? leads 
    : leads.filter(lead => lead.status === statusFilter);

  const handleAddLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'score' | 'scoreBreakdown'>) => {
    const newLead: Lead = {
      ...lead,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      score: 0,
      scoreBreakdown: []
    };
    
    // Calculate score for the new lead
    const { score, breakdown } = calculateLeadScore(newLead, scoringSettings);
    newLead.score = score;
    newLead.scoreBreakdown = breakdown;
    
    // Apply AI adjustments if enabled
    if (scoringSettings.aiAssist) {
      const aiResult = applyAIScoreAdjustments(newLead, scoringSettings);
      newLead.score = aiResult.score;
      newLead.scoreBreakdown = aiResult.breakdown;
      newLead.aiAdjusted = aiResult.breakdown.length > breakdown.length;
    }
    
    setLeads([newLead, ...leads]);
    setIsLeadFormOpen(false);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
    setIsLeadFormOpen(true);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    // Recalculate score for the updated lead
    const { score, breakdown } = calculateLeadScore(updatedLead, scoringSettings);
    updatedLead.score = score;
    updatedLead.scoreBreakdown = breakdown;
    
    // Apply AI adjustments if enabled
    if (scoringSettings.aiAssist) {
      const aiResult = applyAIScoreAdjustments(updatedLead, scoringSettings);
      updatedLead.score = aiResult.score;
      updatedLead.scoreBreakdown = aiResult.breakdown;
      updatedLead.aiAdjusted = aiResult.breakdown.length > breakdown.length;
    }
    
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
    setEditingLead(null);
    setIsLeadFormOpen(false);
    
    // If this was the selected lead, update it in the details panel
    if (selectedLead && selectedLead.id === updatedLead.id) {
      setSelectedLead(updatedLead);
    }
  };

  const handleDeleteLead = (id: string) => {
    setLeads(leads.filter(lead => lead.id !== id));
    
    // If the deleted lead was selected, close the details panel
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(null);
      setIsDetailsPanelOpen(false);
    }
  };

  const handleImportLeads = (importedLeads: Omit<Lead, 'id' | 'createdAt' | 'score' | 'scoreBreakdown'>[]) => {
    const newLeads = importedLeads.map(lead => {
      const newLead: Lead = {
        ...lead,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        score: 0,
        scoreBreakdown: []
      };
      
      // Calculate score for each imported lead
      const { score, breakdown } = calculateLeadScore(newLead, scoringSettings);
      newLead.score = score;
      newLead.scoreBreakdown = breakdown;
      
      // Apply AI adjustments if enabled
      if (scoringSettings.aiAssist) {
        const aiResult = applyAIScoreAdjustments(newLead, scoringSettings);
        newLead.score = aiResult.score;
        newLead.scoreBreakdown = aiResult.breakdown;
        newLead.aiAdjusted = aiResult.breakdown.length > breakdown.length;
      }
      
      return newLead;
    });
    
    setLeads([...newLeads, ...leads]);
    setIsCSVImportOpen(false);
  };

  const handleExportLeads = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Source', 'Status', 'Score', 'Created Date', 'Notes', 'Tags'];
    const rows = leads.map(lead => [
      lead.name,
      lead.email,
      lead.phone || '',
      lead.company || '',
      lead.source,
      lead.status,
      lead.score.toString(),
      new Date(lead.createdAt).toLocaleDateString(),
      lead.notes || '',
      (lead.tags || []).join(', ')
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleViewLeadDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDetailsPanelOpen(true);
  };

  const handleUpdateLeadDetails = (updatedLead: Lead) => {
    const updatedLeads = leads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    );
    setLeads(updatedLeads);
    
    // Call the parent's onUpdateLead if provided
    if (onUpdateLead) {
      onUpdateLead(updatedLead);
    }
  };

  const handleSaveScoringSettings = (newSettings: typeof scoringSettings) => {
    setScoringSettings(newSettings);
    
    // Recalculate scores for all leads with the new settings
    const updatedLeads = leads.map(lead => {
      const { score, breakdown } = calculateLeadScore(lead, newSettings);
      const updatedLead = { ...lead, score, scoreBreakdown: breakdown };
      
      // Apply AI adjustments if enabled
      if (newSettings.aiAssist) {
        const aiResult = applyAIScoreAdjustments(updatedLead, newSettings);
        updatedLead.score = aiResult.score;
        updatedLead.scoreBreakdown = aiResult.breakdown;
        updatedLead.aiAdjusted = aiResult.breakdown.length > breakdown.length;
      } else {
        updatedLead.aiAdjusted = false;
      }
      
      return updatedLead;
    });
    
    setLeads(updatedLeads);
    
    // Update selected lead if it exists
    if (selectedLead) {
      const updatedSelectedLead = updatedLeads.find(lead => lead.id === selectedLead.id);
      if (updatedSelectedLead) {
        setSelectedLead(updatedSelectedLead);
      }
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsScoringSettingsOpen(true)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Settings className="h-4 w-4 mr-2" />
            Scoring Settings
          </button>
          <button
            onClick={() => setIsCSVImportOpen(true)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button
            onClick={() => {
              setEditingLead(null);
              setIsLeadFormOpen(true);
            }}
            className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </button>
        </div>
      </div>
      
      {/* Lead metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm font-medium text-gray-500">Total Leads</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{leads.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm font-medium text-gray-500">New Leads</div>
          <div className="mt-1 text-2xl font-semibold text-blue-600">
            {leads.filter(lead => lead.status === 'New').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm font-medium text-gray-500">Qualified Leads</div>
          <div className="mt-1 text-2xl font-semibold text-green-600">
            {leads.filter(lead => lead.status === 'Qualified').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm font-medium text-gray-500">Avg. Lead Score</div>
          <div className="mt-1 text-2xl font-semibold text-purple-600">
            {leads.length > 0 
              ? Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length) 
              : 0}
          </div>
        </div>
      </div>
      
      {/* Lead table */}
      <LeadTable 
        leads={filteredLeads} 
        onEditLead={handleEditLead} 
        onDeleteLead={handleDeleteLead}
        onViewDetails={handleViewLeadDetails}
      />
      
      {/* Lead form modal */}
      <LeadForm 
        isOpen={isLeadFormOpen}
        onClose={() => setIsLeadFormOpen(false)}
        onSubmit={editingLead ? handleUpdateLead : handleAddLead}
        initialData={editingLead}
        title={editingLead ? 'Edit Lead' : 'Add New Lead'}
      />
      
      {/* CSV import modal */}
      <CSVImport 
        isOpen={isCSVImportOpen}
        onClose={() => setIsCSVImportOpen(false)}
        onImport={handleImportLeads}
      />

      {/* Lead details panel */}
      <LeadDetailsPanel
        isOpen={isDetailsPanelOpen}
        onClose={() => setIsDetailsPanelOpen(false)}
        lead={selectedLead}
        onUpdateLead={handleUpdateLeadDetails}
        salesReps={mockSalesReps}
        isCrmConnected={true}
        pipelineStages={pipelineStages}
      />

      {isScoringSettingsOpen && (
        <LeadScoringSettings
          isOpen={isScoringSettingsOpen}
          onClose={() => setIsScoringSettingsOpen(false)}
          settings={scoringSettings}
          onSave={handleSaveScoringSettings}
        />
      )}
    </div>
  );
};

export default LeadsPage; 