import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, Users, BarChart3, PlusCircle } from 'lucide-react';
import LeadsPage from './LeadsPage';
import SalesAnalytics from './SalesAnalytics';
import PipelineConfig from './PipelineConfig';
import { Lead } from '@/types/leads';
import { PipelineStage } from '@/types/pipeline';

// Mock data for initial pipeline stages
const initialPipelineStages: PipelineStage[] = [
  { id: '1', name: 'New', description: 'Lead has just entered the pipeline', color: '#3B82F6', order: 1 },
  { id: '2', name: 'Contacted', description: 'Initial contact has been made', color: '#10B981', order: 2 },
  { id: '3', name: 'Qualified', description: 'Lead has been qualified as a potential customer', color: '#F59E0B', order: 3 },
  { id: '4', name: 'Proposal', description: 'Proposal has been sent to the lead', color: '#8B5CF6', order: 4 },
  { id: '5', name: 'Negotiation', description: 'In active negotiation with the lead', color: '#EC4899', order: 5 },
  { id: '6', name: 'Closed Won', description: 'Deal has been successfully closed', color: '#059669', order: 6 },
  { id: '7', name: 'Closed Lost', description: 'Deal has been lost', color: '#EF4444', order: 7 }
];

// Mock data for leads
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    company: 'Acme Inc.',
    source: 'Website',
    status: 'New',
    score: 85,
    createdAt: '2023-06-15T10:30:00Z',
    notes: [
      { id: '1', text: 'Initial contact made via contact form', createdAt: '2023-06-15T10:30:00Z', createdBy: 'System' }
    ],
    tags: ['enterprise', 'high-value'],
    assignedTo: '101',
    scoreBreakdown: {
      rules: [
        { id: '1', name: 'High-value source', points: 30, field: 'source' },
        { id: '2', name: 'Complete contact info', points: 25, field: 'contactInfo' },
        { id: '3', name: 'Enterprise tag', points: 30, field: 'tags' }
      ],
      aiAdjustment: 0,
      total: 85
    },
    budget: '$50,000+',
    lastInteraction: '2023-06-20T14:45:00Z',
    interactionCount: 3
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@smallbusiness.co',
    phone: '(555) 987-6543',
    company: 'Small Business Co.',
    source: 'LinkedIn',
    status: 'Contacted',
    score: 65,
    createdAt: '2023-06-10T09:15:00Z',
    notes: [
      { id: '1', text: 'Responded to LinkedIn campaign', createdAt: '2023-06-10T09:15:00Z', createdBy: 'System' },
      { id: '2', text: 'Sent follow-up email', createdAt: '2023-06-12T11:20:00Z', createdBy: 'Jane Doe' }
    ],
    tags: ['small-business'],
    assignedTo: '102',
    scoreBreakdown: {
      rules: [
        { id: '1', name: 'Medium-value source', points: 20, field: 'source' },
        { id: '2', name: 'Complete contact info', points: 25, field: 'contactInfo' },
        { id: '3', name: 'Small business tag', points: 15, field: 'tags' }
      ],
      aiAdjustment: 5,
      total: 65
    },
    budget: '$10,000-$25,000',
    lastInteraction: '2023-06-12T11:20:00Z',
    interactionCount: 2
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@techinnovators.com',
    phone: '(555) 456-7890',
    company: 'Tech Innovators',
    source: 'Referral',
    status: 'Qualified',
    score: 90,
    createdAt: '2023-06-05T14:00:00Z',
    notes: [
      { id: '1', text: 'Referred by existing client', createdAt: '2023-06-05T14:00:00Z', createdBy: 'System' },
      { id: '2', text: 'Initial call completed', createdAt: '2023-06-07T10:30:00Z', createdBy: 'John Smith' },
      { id: '3', text: 'Sent product demo', createdAt: '2023-06-09T15:45:00Z', createdBy: 'John Smith' }
    ],
    tags: ['enterprise', 'tech', 'referral'],
    assignedTo: '101',
    scoreBreakdown: {
      rules: [
        { id: '1', name: 'High-value source', points: 35, field: 'source' },
        { id: '2', name: 'Complete contact info', points: 25, field: 'contactInfo' },
        { id: '3', name: 'Enterprise tag', points: 30, field: 'tags' }
      ],
      aiAdjustment: 0,
      total: 90
    },
    budget: '$100,000+',
    lastInteraction: '2023-06-09T15:45:00Z',
    interactionCount: 5
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@retailgroup.com',
    phone: '(555) 789-0123',
    company: 'Retail Group',
    source: 'Trade Show',
    status: 'Proposal',
    score: 75,
    createdAt: '2023-05-28T11:20:00Z',
    notes: [
      { id: '1', text: 'Met at industry trade show', createdAt: '2023-05-28T11:20:00Z', createdBy: 'System' },
      { id: '2', text: 'Follow-up call scheduled', createdAt: '2023-05-30T09:00:00Z', createdBy: 'Sarah Lee' }
    ],
    tags: ['retail', 'mid-market'],
    assignedTo: '103',
    scoreBreakdown: {
      rules: [
        { id: '1', name: 'Medium-value source', points: 20, field: 'source' },
        { id: '2', name: 'Complete contact info', points: 25, field: 'contactInfo' },
        { id: '3', name: 'Mid-market tag', points: 20, field: 'tags' }
      ],
      aiAdjustment: 10,
      total: 75
    },
    budget: '$25,000-$50,000',
    lastInteraction: '2023-06-15T13:30:00Z',
    interactionCount: 4
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@healthcare.org',
    phone: '(555) 234-5678',
    company: 'Healthcare Solutions',
    source: 'Webinar',
    status: 'Negotiation',
    score: 80,
    createdAt: '2023-05-20T15:45:00Z',
    notes: [
      { id: '1', text: 'Attended product webinar', createdAt: '2023-05-20T15:45:00Z', createdBy: 'System' },
      { id: '2', text: 'Requested pricing information', createdAt: '2023-05-22T10:15:00Z', createdBy: 'Michael Chen' }
    ],
    tags: ['healthcare', 'enterprise'],
    assignedTo: '102',
    scoreBreakdown: {
      rules: [
        { id: '1', name: 'Medium-value source', points: 20, field: 'source' },
        { id: '2', name: 'Complete contact info', points: 25, field: 'contactInfo' },
        { id: '3', name: 'Enterprise tag', points: 30, field: 'tags' }
      ],
      aiAdjustment: 5,
      total: 80
    },
    budget: '$75,000-$100,000',
    lastInteraction: '2023-06-18T11:00:00Z',
    interactionCount: 7
  }
];

// Mock data for marketing spend
const marketingSpendData = {
  'Website': 5000,
  'LinkedIn': 7500,
  'Referral': 1000,
  'Trade Show': 15000,
  'Webinar': 3500
};

const SalesDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(initialPipelineStages);
  const [isPipelineConfigOpen, setIsPipelineConfigOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const handleSavePipelineStages = (updatedStages: PipelineStage[]) => {
    setPipelineStages(updatedStages);
    setIsPipelineConfigOpen(false);
  };

  const handleUpdateLead = (updatedLead: Lead) => {
    setLeads(leads.map(lead => lead.id === updatedLead.id ? updatedLead : lead));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setIsPipelineConfigOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Configure Pipeline
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="leads" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Leads
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <LeadsPage 
            initialLeads={leads} 
            pipelineStages={pipelineStages}
            onUpdateLead={handleUpdateLead}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <SalesAnalytics 
            leads={leads} 
            marketingSpendData={marketingSpendData}
            pipelineStages={pipelineStages}
          />
        </TabsContent>
      </Tabs>

      {isPipelineConfigOpen && (
        <PipelineConfig
          isOpen={isPipelineConfigOpen}
          onClose={() => setIsPipelineConfigOpen(false)}
          stages={pipelineStages}
          onSave={handleSavePipelineStages}
        />
      )}
    </div>
  );
};

export default SalesDashboard; 