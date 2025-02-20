import { Briefcase, DollarSign, Megaphone, Settings } from 'lucide-react';

export interface Agent {
  id: string;
  name: string;
  type: 'hiring' | 'sales' | 'marketing' | 'operations';
  description: string;
  icon: any;
  commands: AgentCommand[];
  automations: AgentAutomation[];
  requiredIntegrations: string[];
  isActive: boolean;
  history?: AgentHistory[];
}

export interface AgentCommand {
  id: string;
  label: string;
  command: string;
  description: string;
}

export interface AgentAutomation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  isActive: boolean;
  lastRun?: Date;
}

export interface AgentHistory {
  id: string;
  action: string;
  timestamp: Date;
  details: string;
  status: 'success' | 'pending' | 'failed';
  metadata?: Record<string, any>;
}

export const getTimelineData = (agent: Agent, period: '7d' | '1m' | '3m' | '12m') => {
  if (!agent.history) return [];
  
  const now = new Date();
  const cutoff = new Date();
  
  switch (period) {
    case '7d':
      cutoff.setDate(now.getDate() - 7);
      break;
    case '1m':
      cutoff.setMonth(now.getMonth() - 1);
      break;
    case '3m':
      cutoff.setMonth(now.getMonth() - 3);
      break;
    case '12m':
      cutoff.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  return agent.history.filter(item => new Date(item.timestamp) >= cutoff);
};

export const agents: Agent[] = [
  {
    id: 'hiring-agent',
    name: 'Hiring Assistant',
    type: 'hiring',
    description: 'Automates job posting, candidate screening, and interview scheduling',
    icon: Briefcase,
    commands: [
      {
        id: 'post-job',
        label: 'Post New Job',
        command: 'post job',
        description: 'Create and distribute a new job posting'
      },
      {
        id: 'screen-candidates',
        label: 'Screen Candidates',
        command: 'screen candidates',
        description: 'Review and rank new job applications'
      }
    ],
    automations: [
      {
        id: 'auto-screen',
        name: 'Automatic Candidate Screening',
        description: 'Automatically screens new applications based on job requirements',
        trigger: 'New application received',
        isActive: true
      }
    ],
    requiredIntegrations: ['gmail', 'linkedin', 'calendly'],
    isActive: true,
    history: [
      {
        id: '1',
        action: 'Job Posted',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        details: 'Posted new Software Engineer position',
        status: 'success',
        metadata: {
          jobId: 'SE-001',
          platform: 'LinkedIn'
        }
      },
      {
        id: '2',
        action: 'Candidates Screened',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        details: 'Screened 15 candidates for Software Engineer position',
        status: 'success',
        metadata: {
          jobId: 'SE-001',
          candidatesScreened: 15
        }
      }
    ]
  },
  {
    id: 'sales-agent',
    name: 'Sales Assistant',
    type: 'sales',
    description: 'Manages lead follow-ups and sales pipeline automation',
    icon: DollarSign,
    commands: [
      {
        id: 'follow-up',
        label: 'Send Follow-up',
        command: 'send follow-up',
        description: 'Send automated follow-up to leads'
      },
      {
        id: 'create-proposal',
        label: 'Create Proposal',
        command: 'create proposal',
        description: 'Generate a sales proposal'
      }
    ],
    automations: [
      {
        id: 'lead-nurture',
        name: 'Lead Nurturing Sequence',
        description: 'Automatically nurtures leads with timed follow-ups',
        trigger: 'New lead added',
        isActive: true
      }
    ],
    requiredIntegrations: ['gmail', 'salesforce', 'hubspot'],
    isActive: true,
    history: [
      {
        id: '1',
        action: 'Lead Follow-up',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        details: 'Sent follow-up emails to 5 leads',
        status: 'success',
        metadata: {
          emailsSent: 5,
          openRate: '80%'
        }
      }
    ]
  },
  {
    id: 'marketing-agent',
    name: 'Marketing Assistant',
    type: 'marketing',
    description: 'Handles campaign management and social media automation',
    icon: Megaphone,
    commands: [
      {
        id: 'new-campaign',
        label: 'Create Campaign',
        command: 'create campaign',
        description: 'Set up a new marketing campaign'
      },
      {
        id: 'analyze-performance',
        label: 'Analyze Performance',
        command: 'analyze performance',
        description: 'Get campaign performance metrics'
      }
    ],
    automations: [
      {
        id: 'social-post',
        name: 'Social Media Scheduler',
        description: 'Automatically schedules and posts content',
        trigger: 'Content approved',
        isActive: true
      }
    ],
    requiredIntegrations: ['facebook', 'twitter', 'instagram', 'linkedin'],
    isActive: true,
    history: [
      {
        id: '1',
        action: 'Campaign Created',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        details: 'Created Q2 Product Launch Campaign',
        status: 'success',
        metadata: {
          campaignId: 'Q2-2024-01',
          budget: 50000
        }
      }
    ]
  },
  {
    id: 'operations-agent',
    name: 'Operations Assistant',
    type: 'operations',
    description: 'Manages workflows and operational tasks',
    icon: Settings,
    commands: [
      {
        id: 'start-workflow',
        label: 'Start Workflow',
        command: 'start workflow',
        description: 'Initialize an operational workflow'
      },
      {
        id: 'track-progress',
        label: 'Track Progress',
        command: 'track progress',
        description: 'Check workflow progress'
      }
    ],
    automations: [
      {
        id: 'task-assignment',
        name: 'Automatic Task Assignment',
        description: 'Assigns tasks based on team availability',
        trigger: 'New task created',
        isActive: true
      }
    ],
    requiredIntegrations: ['slack', 'asana', 'github'],
    isActive: true,
    history: [
      {
        id: '1',
        action: 'Workflow Started',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        details: 'Initiated new employee onboarding workflow',
        status: 'success',
        metadata: {
          workflowId: 'WF-001',
          assignee: 'HR Team'
        }
      }
    ]
  }
]; 