import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Download, RefreshCcw, MessageSquare, Plus, Search, Users } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  comparison: string;
  isPositive: boolean;
}

interface PipelineStageProps {
  stage: string;
  deals: number;
  value: string;
  progress: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, comparison, isPositive }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="text-gray-600 text-sm mb-4">{title}</div>
    <div className="text-2xl font-semibold text-gray-900 mb-2">{value}</div>
    <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '↑' : '↓'} {comparison}
    </div>
  </div>
);

const PipelineStage: React.FC<PipelineStageProps> = ({ stage, deals, value, progress }) => (
  <div className="flex items-center space-x-4">
    <div className="w-24 flex-shrink-0">
      <div className="font-medium text-gray-900">{stage}</div>
      <div className="text-sm text-gray-500">{deals} deals</div>
    </div>
    <div className="flex-1">
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
    <div className="w-24 flex-shrink-0 text-right">
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  </div>
);

export default function Sales() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('this_month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pipelineStages = [
    { stage: 'Lead', deals: 25, value: '$450,000', progress: 100 },
    { stage: 'Qualified', deals: 18, value: '$320,000', progress: 71 },
    { stage: 'Proposal', deals: 12, value: '$280,000', progress: 62 },
    { stage: 'Negotiation', deals: 8, value: '$150,000', progress: 33 },
    { stage: 'Closed', deals: 15, value: '$250,000', progress: 56 }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Here you would typically fetch new data
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    // Generate CSV data
    const csvData = [
      ['Stage', 'Deals', 'Value', 'Progress'],
      ...pipelineStages.map(stage => [
        stage.stage,
        stage.deals,
        stage.value,
        `${stage.progress}%`
      ])
    ].map(row => row.join(',')).join('\n');

    // Create and trigger download
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales_pipeline_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleTalkToAgent = () => {
    navigate('/dashboard/chat', { 
      state: { 
        agentType: 'sales',
        context: 'pipeline_review'
      }
    });
  };

  const handleAddDeal = () => {
    // Here you would typically open a modal or navigate to a new deal form
    console.log('Opening new deal form...');
  };

  const navigateToLeads = () => {
    navigate('/dashboard/sales/leads');
  };

  const handleTimeframeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimeframe(e.target.value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-[100vw] overflow-hidden">
      <div className="space-y-4 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Sales Dashboard</h1>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <select
                value={selectedTimeframe}
                onChange={handleTimeframeChange}
                className="bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 px-3 py-1.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
                <option value="this_quarter">This Quarter</option>
                <option value="this_year">This Year</option>
              </select>
            </div>
            <button 
              onClick={navigateToLeads}
              className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Users className="h-4 w-4 mr-2" />
              Manage Leads
            </button>
            <button 
              onClick={handleExport}
              className="flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button 
              onClick={handleTalkToAgent}
              className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Talk to Sales Agent
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            title="Pipeline Value"
            value="$2,500,000"
            comparison="12.5% vs last period"
            isPositive={true}
          />
          <MetricCard
            title="Conversion Rate"
            value="31.5%"
            comparison="2.3% vs last period"
            isPositive={true}
          />
          <MetricCard
            title="Average Deal Size"
            value="$35,416"
            comparison="4.2% vs last period"
            isPositive={false}
          />
          <MetricCard
            title="Sales Cycle"
            value="45 days"
            comparison="1.5 days faster"
            isPositive={true}
          />
        </div>

        {/* Pipeline Stages */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pipeline Stages</h2>
            <button
              onClick={handleRefresh}
              className={`text-gray-400 hover:text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`}
              disabled={isRefreshing}
            >
              <RefreshCcw className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <PipelineStage key={index} {...stage} />
            ))}
          </div>
        </div>

        {/* Deals */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Deals</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search deals..."
                  className="block w-64 pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button 
                onClick={handleAddDeal}
                className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </button>
            </div>
          </div>

          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Deal Name</th>
                <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Stage</th>
                <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Value</th>
                <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Next Follow-Up</th>
                <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500">
                  No deals found
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 