import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw, MessageSquare, Plus, Search, Filter, ChevronDown, TrendingUp, TrendingDown, MoreHorizontal, Edit2, Trash2, DollarSign, Users, Facebook, Twitter, Instagram, Linkedin, MoreVertical, Mail, MousePointer, Target, UserMinus, CheckCircle, MessageCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
}

interface SocialCardProps {
  platform: 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn';
  followers: number;
  engagement: string;
  reach: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-600 flex items-center">
        {title}
        {icon}
      </h3>
    </div>
    <div className="flex items-baseline">
      <p className="text-3xl font-semibold text-blue-600">{value}</p>
      <p className="ml-2 text-sm text-green-500">{change}</p>
    </div>
  </div>
);

const SocialCard: React.FC<SocialCardProps> = ({ platform, followers, engagement, reach }) => {
  const getPlatformIcon = () => {
    switch (platform) {
      case 'Facebook':
        return <Facebook className="h-6 w-6 text-blue-600" />;
      case 'Twitter':
        return <Twitter className="h-6 w-6 text-blue-400" />;
      case 'Instagram':
        return <Instagram className="h-6 w-6 text-pink-500" />;
      case 'LinkedIn':
        return <Linkedin className="h-6 w-6 text-blue-700" />;
    }
  };

  const getPlatformBg = () => {
    switch (platform) {
      case 'Facebook':
        return 'bg-blue-50';
      case 'Twitter':
        return 'bg-blue-50';
      case 'Instagram':
        return 'bg-pink-50';
      case 'LinkedIn':
        return 'bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg ${getPlatformBg()} mr-3`}>
            {getPlatformIcon()}
          </div>
          <span className="font-medium">{platform}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <div className="text-gray-500 mb-1">Followers</div>
          <div className="font-semibold">{followers.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Engagement</div>
          <div className="font-semibold">{engagement}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Reach</div>
          <div className="font-semibold">{reach.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default function Marketing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      name: 'Summer Sale Campaign',
      platform: 'Facebook',
      status: 'Active',
      budget: 5000,
      spend: 2500,
      roi: '2.5x'
    },
    {
      id: '2',
      name: 'Product Launch',
      platform: 'Instagram',
      status: 'Planning',
      budget: 10000,
      spend: 0,
      roi: '-'
    }
  ]);
  const [activeTab, setActiveTab] = useState('social');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Here you would typically fetch new data
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTalkToAgent = () => {
    navigate('/dashboard/chat', {
      state: {
        agentType: 'marketing',
        context: 'marketing_dashboard',
        autoStart: true
      }
    });
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlatform(e.target.value);
  };

  const handleCreatePost = () => {
    // Navigate to the social media marketing agent
    navigate('/dashboard/chat', {
      state: {
        agentType: 'marketing',
        context: 'social_media_post',
        features: {
          mediaUpload: true,
          scheduling: true,
          platformSelection: true,
          contentSuggestions: true
        }
      }
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleToggleFilters = () => {
    setShowFiltersModal(!showFiltersModal);
  };

  const handleEditCampaign = (campaignId: string) => {
    // Navigate to campaign edit page
    navigate(`/marketing/campaigns/${campaignId}/edit`);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
    }
  };

  // Filter campaigns based on search term
  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-refresh effect
  useEffect(() => {
    handleRefresh();
    const interval = setInterval(handleRefresh, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[100vw] overflow-hidden">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marketing Dashboard</h1>
              <p className="text-gray-600">Track and optimize your marketing campaigns</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className={`flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button 
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                onClick={handleTalkToAgent}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Talk to Marketing Agent
              </button>
            </div>
          </div>
        </div>

        {/* Marketing Sections Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 px-6" aria-label="Marketing sections">
              <button
                onClick={() => setActiveTab('social')}
                className={`px-3 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'social' 
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Social Media Marketing
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`px-3 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'email' 
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Email Marketing
              </button>
              <button
                onClick={() => setActiveTab('sms')}
                className={`px-3 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'sms' 
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                SMS Marketing
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Social Media Marketing Section */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Social Media Marketing Analytics</h2>
                  <button 
                    onClick={() => navigate('/dashboard/chat', {
                      state: {
                        agentType: 'marketing',
                        context: 'social_media',
                        features: {
                          mediaUpload: true,
                          scheduling: true,
                          platformSelection: true,
                          contentSuggestions: true
                        }
                      }
                    })}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Social Media Marketing Agent
                  </button>
                </div>
                
                {/* Existing Social Media Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <SocialCard
                    platform="Facebook"
                    followers={25401}
                    engagement="4.7%"
                    reach={47178}
                  />
                  <SocialCard
                    platform="Twitter"
                    followers={18691}
                    engagement="2.7%"
                    reach={32929}
                  />
                  <SocialCard
                    platform="Instagram"
                    followers={33265}
                    engagement="5%"
                    reach={59774}
                  />
                  <SocialCard
                    platform="LinkedIn"
                    followers={16480}
                    engagement="5.9%"
                    reach={31781}
                  />
                </div>
              </div>
            )}

            {/* Email Marketing Section */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Email Marketing Analytics</h2>
                  <button 
                    onClick={() => navigate('/dashboard/chat', {
                      state: {
                        agentType: 'marketing',
                        context: 'email_marketing',
                        features: {
                          emailEditor: true,
                          templateLibrary: true,
                          scheduling: true,
                          documentUpload: true
                        }
                      }
                    })}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Email Marketing Agent
                  </button>
                </div>

                {/* Email Campaign Performance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard
                    title="Open Rate"
                    value="24.8%"
                    change="+2.3%"
                    icon={<Mail className="h-5 w-5 ml-2" />}
                  />
                  <MetricCard
                    title="Click Rate"
                    value="3.6%"
                    change="+0.8%"
                    icon={<MousePointer className="h-5 w-5 ml-2" />}
                  />
                  <MetricCard
                    title="Conversion Rate"
                    value="2.1%"
                    change="+0.3%"
                    icon={<Target className="h-5 w-5 ml-2" />}
                  />
                  <MetricCard
                    title="Unsubscribe Rate"
                    value="0.4%"
                    change="-0.1%"
                    icon={<UserMinus className="h-5 w-5 ml-2" />}
                  />
                </div>

                {/* Email Campaign List */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">Email Campaigns</h3>
                  </div>
                  <div className="overflow-x-auto">
                    {/* Add email campaign table here */}
                  </div>
                </div>
              </div>
            )}

            {/* SMS Marketing Section */}
            {activeTab === 'sms' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">SMS Marketing Analytics</h2>
                  <button 
                    onClick={() => navigate('/dashboard/chat', {
                      state: {
                        agentType: 'marketing',
                        context: 'sms_marketing',
                        features: {
                          smsEditor: true,
                          templateLibrary: true,
                          scheduling: true,
                          contactLists: true
                        }
                      }
                    })}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    SMS Marketing Agent
                  </button>
                </div>

                {/* SMS Campaign Performance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricCard
                    title="Delivery Rate"
                    value="98.2%"
                    change="+0.5%"
                    icon={<CheckCircle className="h-5 w-5 ml-2" />}
                  />
                  <MetricCard
                    title="Response Rate"
                    value="12.4%"
                    change="+1.7%"
                    icon={<MessageCircle className="h-5 w-5 ml-2" />}
                  />
                  <MetricCard
                    title="Click Rate"
                    value="8.9%"
                    change="+0.6%"
                    icon={<MousePointer className="h-5 w-5 ml-2" />}
                  />
                  <MetricCard
                    title="Opt-out Rate"
                    value="0.3%"
                    change="-0.1%"
                    icon={<UserMinus className="h-5 w-5 ml-2" />}
                  />
                </div>

                {/* SMS Campaign List */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">SMS Campaigns</h3>
                  </div>
                  <div className="overflow-x-auto">
                    {/* Add SMS campaign table here */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Campaign Performance Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Campaign Performance</h2>
                <p className="text-sm text-gray-600">Track and analyze your marketing campaigns</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search campaigns..."
                    className="block w-64 pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button 
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                  onClick={handleToggleFilters}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilters > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                      {activeFilters}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign Name</th>
                      <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spend</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROI</th>
                      <th className="w-1/8 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCampaigns.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500 text-sm">
                          No campaigns found
                        </td>
                      </tr>
                    ) : (
                      filteredCampaigns.map((campaign) => (
                        <tr key={campaign.id}>
                          <td className="px-6 py-4 text-sm text-gray-900">{campaign.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{campaign.platform}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              campaign.status === 'Active' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {campaign.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">${campaign.budget.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">${campaign.spend.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{campaign.roi}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditCampaign(campaign.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCampaign(campaign.id)}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedPlatform === 'all' ? 'facebook' : selectedPlatform}
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Write your post content..."
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowCreatePostModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle post creation
                  setShowCreatePostModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Modal */}
      {showFiltersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Filter Campaigns</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="planning">Planning</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">All</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => {
                  setActiveFilters(0);
                  setShowFiltersModal(false);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
              <button
                onClick={() => {
                  setActiveFilters(2); // Example: update with actual filter count
                  setShowFiltersModal(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}