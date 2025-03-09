import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  Clock as ClockIcon, 
  ChevronRight, 
  Search,
  ArrowUpDown
} from 'lucide-react';
import { SMSCampaign } from './SMSCampaignCreator';
import SMSCampaignDetails from './SMSCampaignDetails';

interface SMSCampaignListProps {
  campaigns: SMSCampaign[];
}

const SMSCampaignList: React.FC<SMSCampaignListProps> = ({ campaigns }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'createdAt' | 'status'>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedCampaign, setSelectedCampaign] = useState<SMSCampaign | null>(null);

  // Handle sorting
  const handleSort = (field: 'name' | 'createdAt' | 'status') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort campaigns
  const filteredAndSortedCampaigns = campaigns
    .filter(campaign => 
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

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

  // Get status badge color
  const getStatusBadgeColor = (status: SMSCampaign['status']) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: SMSCampaign['status']) => {
    switch (status) {
      case 'Scheduled':
        return <ClockIcon className="h-4 w-4" />;
      case 'In Progress':
        return <MessageSquare className="h-4 w-4" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'Draft':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Campaign metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm font-medium text-gray-500">Total Campaigns</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{campaigns.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm font-medium text-gray-500">Active Campaigns</div>
          <div className="mt-1 text-2xl font-semibold text-blue-600">
            {campaigns.filter(c => c.status === 'In Progress').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm font-medium text-gray-500">Scheduled Campaigns</div>
          <div className="mt-1 text-2xl font-semibold text-yellow-600">
            {campaigns.filter(c => c.status === 'Scheduled').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-sm font-medium text-gray-500">Avg. Response Rate</div>
          <div className="mt-1 text-2xl font-semibold text-green-600">
            {campaigns.length > 0 && campaigns.some(c => c.stats?.responseRate !== undefined)
              ? `${Math.round(campaigns
                  .filter(c => c.stats?.responseRate !== undefined)
                  .reduce((sum, c) => sum + (c.stats?.responseRate || 0), 0) / 
                  campaigns.filter(c => c.stats?.responseRate !== undefined).length
                )}%`
              : '0%'}
          </div>
        </div>
      </div>

      {/* Campaign list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">SMS Campaigns</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search campaigns..."
                className="block w-64 pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Campaign Name</span>
                    {sortField === 'name' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipients
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortField === 'status' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Rate
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date</span>
                    {sortField === 'createdAt' && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedCampaigns.length > 0 ? (
                filteredAndSortedCampaigns.map((campaign) => (
                  <tr 
                    key={campaign.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {campaign.message.length > 50 
                          ? `${campaign.message.substring(0, 50)}...` 
                          : campaign.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        {campaign.stats?.totalRecipients || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(campaign.status)}`}>
                        <span className="flex items-center">
                          {getStatusIcon(campaign.status)}
                          <span className="ml-1">{campaign.status}</span>
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.status === 'Completed' || campaign.status === 'In Progress' ? (
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ width: `${campaign.stats?.responseRate || 0}%` }}
                            ></div>
                          </div>
                          <span className="ml-2">{campaign.stats?.responseRate || 0}%</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.status === 'Scheduled' ? (
                        <div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                            {campaign.schedule.scheduledDate}
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            {campaign.schedule.scheduledTime}
                          </div>
                        </div>
                      ) : campaign.sentAt ? (
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-gray-400" />
                          {formatDate(campaign.sentAt)}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCampaign(campaign);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    No campaigns found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign details modal */}
      {selectedCampaign && (
        <SMSCampaignDetails
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
};

export default SMSCampaignList; 