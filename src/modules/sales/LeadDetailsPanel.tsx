import React, { useState, useEffect } from 'react';
import { X, User, Calendar, MessageSquare, Paperclip, Edit, ExternalLink, RefreshCw, ChevronRight, Sparkles } from 'lucide-react';
import { Lead, LeadStatus } from '@/types/leads';
import AIAssistant from './AIAssistant';
import { PipelineStage } from '@/types/pipeline';

interface LeadDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onUpdateLead?: (lead: Lead) => void;
  salesReps: Array<{ id: string; name: string; }>;
  isCrmConnected?: boolean;
  pipelineStages?: PipelineStage[];
}

// Pipeline stages with descriptions
const pipelineStages: { value: LeadStatus; label: string; description: string }[] = [
  { 
    value: 'New', 
    label: 'New', 
    description: 'Lead has been added to the system but no contact has been made yet.' 
  },
  { 
    value: 'Contacted', 
    label: 'Contacted', 
    description: 'Initial contact has been made with the lead.' 
  },
  { 
    value: 'Qualified', 
    label: 'Qualified', 
    description: 'Lead has been qualified as a potential customer.' 
  },
  { 
    value: 'Lost', 
    label: 'Lost', 
    description: 'Lead is no longer interested or has chosen a competitor.' 
  },
  { 
    value: 'Converted', 
    label: 'Converted', 
    description: 'Lead has been converted to a customer.' 
  }
];

// Mock conversation history
const mockConversations = [
  {
    id: '1',
    date: '2023-06-20T14:30:00Z',
    type: 'email',
    summary: 'Initial outreach email sent introducing our services.',
    agent: 'Sarah Thompson'
  },
  {
    id: '2',
    date: '2023-06-22T10:15:00Z',
    type: 'call',
    summary: 'Follow-up call to discuss specific needs. Lead expressed interest in premium plan.',
    agent: 'Sarah Thompson'
  },
  {
    id: '3',
    date: '2023-06-25T16:45:00Z',
    type: 'email',
    summary: 'Sent detailed proposal with pricing options based on our call.',
    agent: 'Sarah Thompson'
  }
];

// Mock attachments
const mockAttachments = [
  {
    id: '1',
    name: 'Proposal_Document.pdf',
    size: '2.4 MB',
    date: '2023-06-25T16:45:00Z'
  },
  {
    id: '2',
    name: 'Product_Brochure.pdf',
    size: '1.8 MB',
    date: '2023-06-20T14:30:00Z'
  }
];

// Mock AI insights
const mockInsights = [
  'Lead has shown consistent interest in enterprise features',
  'Response time is typically within 24 hours',
  'Most engaged with email communications vs. calls',
  'Pricing appears to be a key decision factor based on conversation patterns'
];

const LeadDetailsPanel: React.FC<LeadDetailsPanelProps> = ({
  isOpen,
  onClose,
  lead,
  onUpdateLead,
  salesReps,
  isCrmConnected = false,
  pipelineStages = []
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'conversations' | 'attachments' | 'notes'>('overview');
  const [assignedTo, setAssignedTo] = useState<string>('');
  const [currentStage, setCurrentStage] = useState<LeadStatus>('New');
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Array<{ id: string; text: string; date: string }>>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(true);

  useEffect(() => {
    if (lead) {
      setCurrentStage(lead.status);
      setAssignedTo(lead.assignedTo || '');
      
      // Mock notes based on lead ID to simulate persistence
      const mockNotes = lead.id === '1' ? [
        { id: '1', text: 'Interested in our enterprise plan, should follow up next week.', date: '2023-06-18T09:30:00Z' },
        { id: '2', text: 'Has concerns about implementation timeline, needs reassurance.', date: '2023-06-21T11:15:00Z' }
      ] : [];
      
      setNotes(mockNotes);
    }
  }, [lead]);

  if (!isOpen || !lead) return null;

  // Use the provided pipeline stages or fall back to the default ones
  const stages = pipelineStages.length > 0 
    ? pipelineStages 
    : [
        { id: 'new', name: 'New', description: 'Lead has just entered the pipeline', color: '#3B82F6', order: 1 },
        { id: 'contacted', name: 'Contacted', description: 'Initial contact has been made', color: '#10B981', order: 2 },
        { id: 'qualified', name: 'Qualified', description: 'Lead has been qualified as a potential customer', color: '#F59E0B', order: 3 },
        { id: 'proposal', name: 'Proposal', description: 'Proposal has been sent to the lead', color: '#8B5CF6', order: 4 },
        { id: 'negotiation', name: 'Negotiation', description: 'In active negotiation with the lead', color: '#EC4899', order: 5 },
        { id: 'closed-won', name: 'Closed Won', description: 'Deal has been successfully closed', color: '#059669', order: 6 },
        { id: 'closed-lost', name: 'Closed Lost', description: 'Deal has been lost', color: '#EF4444', order: 7 }
      ];

  const handleStageChange = (newStage: string) => {
    setCurrentStage(newStage);
    if (lead && onUpdateLead) {
      onUpdateLead({
        ...lead,
        status: newStage
      });
    }
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAssignee = e.target.value;
    setAssignedTo(newAssignee);
    if (lead && onUpdateLead) {
      onUpdateLead({
        ...lead,
        assignedTo: newAssignee
      });
    }
  };

  const handleAddNote = () => {
    if (note.trim()) {
      const newNote = {
        id: Date.now().toString(),
        text: note,
        date: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
      setNote('');
    }
  };

  const handleSyncWithCrm = () => {
    setIsSyncing(true);
    // Simulate API call to sync with CRM
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleActionTaken = (action: string) => {
    // Add a note about the action taken
    const newNote = {
      id: Date.now().toString(),
      text: `AI suggested action completed: ${action}`,
      createdAt: new Date().toISOString(),
      createdBy: 'Current User'
    };
    
    setNotes([newNote, ...notes]);
    
    // Update the lead with the new note
    if (onUpdateLead) {
      onUpdateLead({
        ...lead,
        notes: [newNote, ...(lead.notes || [])]
      });
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 md:w-[32rem] bg-white shadow-xl transform ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } transition-transform duration-300 ease-in-out z-50 flex flex-col`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Lead Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Add AI Assistant below the header */}
      {showAIAssistant && lead && (
        <div className="px-4 py-2">
          <AIAssistant 
            lead={lead} 
            onDismiss={() => setShowAIAssistant(false)} 
            onActionTaken={handleActionTaken}
          />
        </div>
      )}

      {/* Lead Summary */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-start">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
            <User className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{lead.name}</h3>
            <p className="text-sm text-gray-600">{lead.company || 'No company'}</p>
            <div className="mt-1 flex items-center space-x-3">
              <span className="text-sm text-gray-500">{lead.email}</span>
              {lead.phone && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{lead.phone}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Lead Score</div>
            <div className="text-lg font-semibold text-gray-900">{lead.score}/100</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Created</div>
            <div className="text-sm font-medium text-gray-900">{formatDate(lead.createdAt)}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'conversations' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('conversations')}
        >
          Conversations
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'attachments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('attachments')}
        >
          Attachments
        </button>
        <button
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === 'notes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('notes')}
        >
          Notes
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Pipeline Stage */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pipeline Stage</h4>
              <div className="flex flex-wrap gap-2 mt-4">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      currentStage === stage.name
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => handleStageChange(stage.name)}
                    title={stage.description}
                    style={{
                      backgroundColor: currentStage === stage.name ? `${stage.color}20` : '',
                      color: currentStage === stage.name ? stage.color : '',
                      borderColor: currentStage === stage.name ? stage.color : ''
                    }}
                  >
                    {stage.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Assign to Sales Rep */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Assign to Sales Rep</h4>
              <select
                value={assignedTo}
                onChange={handleAssigneeChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Unassigned</option>
                {salesReps.map(rep => (
                  <option key={rep.id} value={rep.id}>{rep.name}</option>
                ))}
              </select>
            </div>

            {/* Source & Tags */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Source</h4>
                <div className="px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm text-gray-700">
                  {lead.source}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {lead.tags && lead.tags.length > 0 ? (
                    lead.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">No tags</span>
                  )}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">AI Insights</h4>
              <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                <ul className="space-y-2">
                  {mockInsights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block h-5 w-5 rounded-full bg-purple-200 text-purple-700 flex-shrink-0 mr-2">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </span>
                      <span className="text-sm text-purple-800">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CRM Integration */}
            {isCrmConnected && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-700">CRM Integration</h4>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleSyncWithCrm}
                      className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={isSyncing}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                      {isSyncing ? 'Syncing...' : 'Sync with CRM'}
                    </button>
                    <a 
                      href="#" 
                      className="flex items-center px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View in CRM
                    </a>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  Last synced: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'conversations' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-700">Conversation History</h4>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Add Interaction
              </button>
            </div>
            
            <div className="space-y-4">
              {mockConversations.map((conversation) => (
                <div key={conversation.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                        conversation.type === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {conversation.type === 'email' ? (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {conversation.type === 'email' ? 'Email' : 'Phone Call'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(conversation.date)}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      by {conversation.agent}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {conversation.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-gray-700">Attachments</h4>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Upload File
              </button>
            </div>
            
            <div className="space-y-3">
              {mockAttachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                  <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-blue-600 hover:underline cursor-pointer">
                      {attachment.name}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{attachment.size}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDate(attachment.date)}</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
              
              {mockAttachments.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Paperclip className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>No attachments yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Add Note</h4>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Type your note here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleAddNote}
                  disabled={!note.trim()}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    note.trim() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add Note
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              {notes.map((noteItem) => (
                <div key={noteItem.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">{formatDate(noteItem.date)}</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">{noteItem.text}</p>
                </div>
              ))}
              
              {notes.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  <MessageSquare className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>No notes yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add button to show AI Assistant if hidden */}
      {!showAIAssistant && (
        <button 
          onClick={() => setShowAIAssistant(true)}
          className="absolute bottom-4 right-4 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition-colors"
          title="Show AI suggestions"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default LeadDetailsPanel; 