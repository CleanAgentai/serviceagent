import React, { useState } from 'react';
import { 
  MessageSquare, 
  Plus, 
  Users, 
  BarChart3, 
  Mail,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import EmailTemplateManager from './EmailTemplateManager';
import EmailSequenceManager from './EmailSequenceManager';
import EmailReports from './EmailReports';
import SMSCampaignCreator, { SMSCampaign, Segment } from './SMSCampaignCreator';
import SMSCampaignList from './SMSCampaignList';

type MarketingTab = 'sms' | 'email' | 'analytics';
type EmailSubTab = 'templates' | 'sequences' | 'reports';

const MarketingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MarketingTab>('email');
  const [emailSubTab, setEmailSubTab] = useState<EmailSubTab>('templates');
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  
  // Mock data for segments
  const [segments, setSegments] = useState<Segment[]>([
    { id: '1', name: 'All Leads', count: 1250 },
    { id: '2', name: 'High Value Prospects', count: 450 },
    { id: '3', name: 'Recent Website Visitors', count: 320 },
    { id: '4', name: 'Dormant Leads (90+ days)', count: 275 },
    { id: '5', name: 'Newsletter Subscribers', count: 890 },
  ]);
  
  // Mock data for leads
  const [leads, setLeads] = useState([
    // This would be populated with actual lead data
    // We're just using it for the campaign creator
  ]);
  
  // Mock data for campaigns
  const [campaigns, setCampaigns] = useState<SMSCampaign[]>([
    {
      id: '1',
      name: 'Summer Promotion',
      message: 'Get 20% off our premium services this summer! Limited time offer. Reply YES to learn more or STOP to opt out.',
      segment: 'All Leads',
      schedule: { sendNow: false, scheduledDate: '2023-07-15', scheduledTime: '09:00 AM' },
      status: 'Scheduled',
      createdAt: '2023-07-01T10:30:00Z',
      stats: {
        totalRecipients: 1250,
        responseRate: 0,
        optOutRate: 0
      }
    },
    {
      id: '2',
      name: 'Product Launch Announcement',
      message: 'Exciting news! Our new product is launching next week. Reply INFO for details or STOP to opt out.',
      segment: 'High Value Prospects',
      schedule: { sendNow: true },
      status: 'Completed',
      createdAt: '2023-06-15T14:20:00Z',
      sentAt: '2023-06-15T14:30:00Z',
      stats: {
        totalRecipients: 450,
        responseRate: 22,
        optOutRate: 3
      }
    },
    {
      id: '3',
      name: 'Webinar Invitation',
      message: 'Join our exclusive webinar on industry trends next Thursday at 2 PM. Reply YES to confirm or STOP to opt out.',
      segment: 'Recent Website Visitors',
      schedule: { sendNow: true },
      status: 'In Progress',
      createdAt: '2023-07-05T09:15:00Z',
      sentAt: '2023-07-05T10:00:00Z',
      stats: {
        totalRecipients: 320,
        responseRate: 15,
        optOutRate: 2
      }
    },
    {
      id: '4',
      name: 'Re-engagement Campaign',
      message: "We miss you! It's been a while since we connected. Reply CHAT to schedule a call with your account manager or STOP to opt out.",
      segment: "Dormant Leads (90+ days)",
      schedule: { sendNow: false, scheduledDate: '2023-07-20', scheduledTime: '10:00 AM' },
      status: 'Draft',
      createdAt: '2023-07-03T16:45:00Z',
      stats: {
        totalRecipients: 275,
        responseRate: 0,
        optOutRate: 0
      }
    }
  ]);

  const renderEmailContent = () => {
    switch (emailSubTab) {
      case 'templates':
        return <EmailTemplateManager />;
      case 'sequences':
        return <EmailSequenceManager />;
      case 'reports':
        return <EmailReports />;
      default:
        return null;
    }
  };

  // Handle saving a new campaign
  const handleSaveCampaign = (campaign: SMSCampaign) => {
    setCampaigns([...campaigns, campaign]);
    setIsCreatingCampaign(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Marketing Dashboard</h1>
        <button
          onClick={() => setIsCreatingCampaign(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </button>
      </div>

      {/* Marketing overview cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Total Leads</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">1,250</div>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 text-xs text-green-600">+5.3% from last month</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Email Campaigns</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">12</div>
            </div>
            <Mail className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 text-xs text-green-600">+3 this month</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">SMS Campaigns</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">8</div>
            </div>
            <Smartphone className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 text-xs text-green-600">+2 this month</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Avg. Response Rate</div>
              <div className="mt-1 text-2xl font-semibold text-gray-900">18.5%</div>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 text-xs text-green-600">+2.1% from last month</div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('email')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'email'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex items-center`}
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Marketing
          </button>
          <button
            onClick={() => setActiveTab('sms')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex items-center`}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            SMS Campaigns
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } flex items-center`}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </button>
        </nav>
      </div>

      {/* Email Marketing Sub-tabs */}
      {activeTab === 'email' && (
        <div className="mb-6">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setEmailSubTab('templates')}
              className={`py-2 px-4 text-sm font-medium ${
                emailSubTab === 'templates'
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setEmailSubTab('sequences')}
              className={`py-2 px-4 text-sm font-medium ${
                emailSubTab === 'sequences'
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sequences
            </button>
            <button
              onClick={() => setEmailSubTab('reports')}
              className={`py-2 px-4 text-sm font-medium ${
                emailSubTab === 'reports'
                  ? 'text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reports
            </button>
          </div>
        </div>
      )}

      {/* Tab content */}
      <div className="bg-white rounded-lg shadow-sm">
        {activeTab === 'email' && renderEmailContent()}
        {activeTab === 'sms' && (
          <SMSCampaignList campaigns={campaigns} />
        )}
        {activeTab === 'analytics' && (
          <div className="p-8 text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Marketing Analytics</h3>
            <p className="mt-1 text-sm text-gray-500">
              View comprehensive analytics across all your marketing campaigns.
            </p>
          </div>
        )}
      </div>

      {/* Campaign creator modal */}
      {isCreatingCampaign && (
        <SMSCampaignCreator
          isOpen={isCreatingCampaign}
          onClose={() => setIsCreatingCampaign(false)}
          onSave={handleSaveCampaign}
          leads={leads}
          segments={segments}
        />
      )}
    </div>
  );
};

export default MarketingDashboard; 