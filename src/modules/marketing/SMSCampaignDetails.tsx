import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  ThumbsUp, 
  ThumbsDown,
  MessageCircle,
  Phone,
  UserX,
  Download
} from 'lucide-react';
import { SMSCampaign } from './SMSCampaignCreator';

interface SMSCampaignDetailsProps {
  campaign: SMSCampaign;
  onClose: () => void;
}

// Mock recipient data structure
interface Recipient {
  id: string;
  name: string;
  phone: string;
  status: 'Delivered' | 'Failed' | 'Pending' | 'Replied' | 'Opted Out';
  reply?: string;
  replyTimestamp?: string;
  needsFollowUp?: boolean;
}

const SMSCampaignDetails: React.FC<SMSCampaignDetailsProps> = ({ campaign, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'recipients'>('overview');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock recipients data - in a real app, this would come from the campaign or an API
  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: '1',
      name: 'John Doe',
      phone: '+1234567890',
      status: 'Delivered',
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+1987654321',
      status: 'Replied',
      reply: 'Yes, I'm interested. Please send more information.',
      replyTimestamp: '2023-06-15T14:30:00Z',
      needsFollowUp: true,
    },
    {
      id: '3',
      name: 'Robert Johnson',
      phone: '+1122334455',
      status: 'Opted Out',
      reply: 'Please remove me from your list.',
      replyTimestamp: '2023-06-15T12:45:00Z',
    },
    {
      id: '4',
      name: 'Emily Davis',
      phone: '+1555666777',
      status: 'Failed',
    },
    {
      id: '5',
      name: 'Michael Wilson',
      phone: '+1999888777',
      status: 'Delivered',
    },
  ]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status icon
  const getStatusIcon = (status: Recipient['status']) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Replied':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'Opted Out':
        return <UserX className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  // Toggle follow-up status
  const toggleFollowUp = (id: string) => {
    setRecipients(recipients.map(recipient => 
      recipient.id === id 
        ? { ...recipient, needsFollowUp: !recipient.needsFollowUp } 
        : recipient
    ));
  };

  // Filter recipients based on status and search term
  const filteredRecipients = recipients.filter(recipient => {
    const matchesStatus = filterStatus === 'all' || recipient.status === filterStatus;
    const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          recipient.phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Calculate stats
  const stats = {
    delivered: recipients.filter(r => r.status === 'Delivered' || r.status === 'Replied').length,
    replied: recipients.filter(r => r.status === 'Replied').length,
    optedOut: recipients.filter(r => r.status === 'Opted Out').length,
    failed: recipients.filter(r => r.status === 'Failed').length,
    pending: recipients.filter(r => r.status === 'Pending').length,
    needsFollowUp: recipients.filter(r => r.needsFollowUp).length,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{campaign.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('recipients')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recipients'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recipients
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' ? (
            <div className="space-y-6">
              {/* Campaign details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Campaign Details</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-500">Status</div>
                      <div className="text-sm font-medium text-gray-900 mt-1">{campaign.status}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Created</div>
                      <div className="text-sm font-medium text-gray-900 mt-1">{formatDate(campaign.createdAt)}</div>
                    </div>
                    {campaign.sentAt && (
                      <div>
                        <div className="text-xs text-gray-500">Sent</div>
                        <div className="text-sm font-medium text-gray-900 mt-1">{formatDate(campaign.sentAt)}</div>
                      </div>
                    )}
                    {campaign.status === 'Scheduled' && (
                      <div>
                        <div className="text-xs text-gray-500">Scheduled For</div>
                        <div className="text-sm font-medium text-gray-900 mt-1">
                          {campaign.schedule.scheduledDate} at {campaign.schedule.scheduledTime}
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-gray-500">Segment</div>
                      <div className="text-sm font-medium text-gray-900 mt-1">{campaign.segment}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-800">
                    {campaign.message}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {campaign.message.length} characters
                  </div>
                </div>
              </div>

              {/* Campaign metrics */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Campaign Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Delivery Rate</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {recipients.length > 0 
                            ? `${Math.round((stats.delivered / recipients.length) * 100)}%` 
                            : '0%'}
                        </div>
                      </div>
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {stats.delivered} of {recipients.length} messages delivered
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Response Rate</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {recipients.length > 0 
                            ? `${Math.round((stats.replied / recipients.length) * 100)}%` 
                            : '0%'}
                        </div>
                      </div>
                      <MessageCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {stats.replied} responses received
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Opt-Out Rate</div>
                        <div className="mt-1 text-2xl font-semibold text-gray-900">
                          {recipients.length > 0 
                            ? `${Math.round((stats.optedOut / recipients.length) * 100)}%` 
                            : '0%'}
                        </div>
                      </div>
                      <UserX className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {stats.optedOut} recipients opted out
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                  <span className="mr-2">✨</span> AI Insights
                </h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  {stats.replied > 0 && (
                    <li className="flex items-start">
                      <ThumbsUp className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      <span>
                        Your response rate of {Math.round((stats.replied / recipients.length) * 100)}% is 
                        {Math.round((stats.replied / recipients.length) * 100) > 15 ? ' above' : ' below'} the industry average of 15%.
                      </span>
                    </li>
                  )}
                  {stats.optedOut > 0 && (
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                      <span>
                        {stats.optedOut} recipients opted out. Consider reviewing your message content for clarity and value.
                      </span>
                    </li>
                  )}
                  {stats.needsFollowUp > 0 && (
                    <li className="flex items-start">
                      <MessageCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      <span>
                        {stats.needsFollowUp} responses require follow-up. Prioritize these to maximize conversion.
                      </span>
                    </li>
                  )}
                  {campaign.message.length > 140 && (
                    <li className="flex items-start">
                      <ThumbsDown className="h-4 w-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                      <span>
                        Your message is {campaign.message.length} characters long. Consider shortening to under 140 characters for better engagement.
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Filters and search */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="rounded-md border border-gray-300 text-sm py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Replied">Replied</option>
                    <option value="Opted Out">Opted Out</option>
                    <option value="Failed">Failed</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                    <Download className="h-4 w-4 mr-1" />
                    Export CSV
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipients..."
                    className="rounded-md border border-gray-300 text-sm py-1.5 pl-3 pr-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Stats summary */}
              <div className="grid grid-cols-6 gap-2 text-xs">
                <div className="bg-gray-50 rounded p-2 text-center">
                  <div className="font-medium text-gray-500">Total</div>
                  <div className="mt-1 font-semibold text-gray-900">{recipients.length}</div>
                </div>
                <div className="bg-green-50 rounded p-2 text-center">
                  <div className="font-medium text-green-700">Delivered</div>
                  <div className="mt-1 font-semibold text-green-800">{stats.delivered}</div>
                </div>
                <div className="bg-blue-50 rounded p-2 text-center">
                  <div className="font-medium text-blue-700">Replied</div>
                  <div className="mt-1 font-semibold text-blue-800">{stats.replied}</div>
                </div>
                <div className="bg-yellow-50 rounded p-2 text-center">
                  <div className="font-medium text-yellow-700">Pending</div>
                  <div className="mt-1 font-semibold text-yellow-800">{stats.pending}</div>
                </div>
                <div className="bg-red-50 rounded p-2 text-center">
                  <div className="font-medium text-red-700">Failed</div>
                  <div className="mt-1 font-semibold text-red-800">{stats.failed}</div>
                </div>
                <div className="bg-gray-50 rounded p-2 text-center">
                  <div className="font-medium text-gray-700">Opted Out</div>
                  <div className="mt-1 font-semibold text-gray-800">{stats.optedOut}</div>
                </div>
              </div>

              {/* Recipients table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Response
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRecipients.length > 0 ? (
                      filteredRecipients.map((recipient) => (
                        <tr key={recipient.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{recipient.name}</div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-1" />
                              {recipient.phone}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center text-sm">
                              {getStatusIcon(recipient.status)}
                              <span className="ml-1.5">{recipient.status}</span>
                            </div>
                            {recipient.replyTimestamp && recipient.status === 'Replied' && (
                              <div className="text-xs text-gray-500 mt-1">
                                {formatDate(recipient.replyTimestamp)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {recipient.reply ? (
                              <div className="text-sm text-gray-900 max-w-md">
                                "{recipient.reply}"
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {recipient.status === 'Replied' && (
                              <button
                                onClick={() => toggleFollowUp(recipient.id)}
                                className={`inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded ${
                                  recipient.needsFollowUp
                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                              >
                                {recipient.needsFollowUp ? 'Needs Follow-up' : 'Mark for Follow-up'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-sm text-gray-500">
                          No recipients found matching your filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SMSCampaignDetails; 