import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Calendar,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Mail,
  MousePointer,
  UserMinus,
  DollarSign
} from 'lucide-react';

interface CampaignMetrics {
  id: string;
  name: string;
  sentAt: string;
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    bounced: number;
    revenue?: number;
  };
}

interface DateRange {
  startDate: string;
  endDate: string;
}

const EmailReports: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Mock data - replace with actual API call
  const [campaigns] = useState<CampaignMetrics[]>([
    {
      id: '1',
      name: 'Welcome Series',
      sentAt: '2024-02-15',
      metrics: {
        sent: 1000,
        delivered: 980,
        opened: 450,
        clicked: 120,
        unsubscribed: 5,
        bounced: 20,
        revenue: 2500
      }
    },
    {
      id: '2',
      name: 'Product Launch',
      sentAt: '2024-02-20',
      metrics: {
        sent: 2500,
        delivered: 2450,
        opened: 1200,
        clicked: 350,
        unsubscribed: 8,
        bounced: 50,
        revenue: 7500
      }
    },
    {
      id: '3',
      name: 'Monthly Newsletter',
      sentAt: '2024-02-25',
      metrics: {
        sent: 5000,
        delivered: 4900,
        opened: 2200,
        clicked: 580,
        unsubscribed: 15,
        bounced: 100,
        revenue: 4200
      }
    }
  ]);

  const calculateMetrics = (campaign: CampaignMetrics) => {
    const { metrics } = campaign;
    return {
      openRate: ((metrics.opened / metrics.delivered) * 100).toFixed(1),
      clickRate: ((metrics.clicked / metrics.opened) * 100).toFixed(1),
      bounceRate: ((metrics.bounced / metrics.sent) * 100).toFixed(1),
      unsubscribeRate: ((metrics.unsubscribed / metrics.delivered) * 100).toFixed(1),
      revenue: metrics.revenue?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }) || '$0'
    };
  };

  const aggregateMetrics = () => {
    const totals = campaigns.reduce((acc, campaign) => ({
      sent: acc.sent + campaign.metrics.sent,
      delivered: acc.delivered + campaign.metrics.delivered,
      opened: acc.opened + campaign.metrics.opened,
      clicked: acc.clicked + campaign.metrics.clicked,
      unsubscribed: acc.unsubscribed + campaign.metrics.unsubscribed,
      bounced: acc.bounced + campaign.metrics.bounced,
      revenue: acc.revenue + (campaign.metrics.revenue || 0)
    }), {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      unsubscribed: 0,
      bounced: 0,
      revenue: 0
    });

    return {
      openRate: ((totals.opened / totals.delivered) * 100).toFixed(1),
      clickRate: ((totals.clicked / totals.opened) * 100).toFixed(1),
      bounceRate: ((totals.bounced / totals.sent) * 100).toFixed(1),
      unsubscribeRate: ((totals.unsubscribed / totals.delivered) * 100).toFixed(1),
      revenue: totals.revenue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
    };
  };

  const chartData = campaigns.map(campaign => {
    const metrics = calculateMetrics(campaign);
    return {
      name: campaign.name,
      'Open Rate': parseFloat(metrics.openRate),
      'Click Rate': parseFloat(metrics.clickRate),
      'Bounce Rate': parseFloat(metrics.bounceRate),
      'Unsubscribe Rate': parseFloat(metrics.unsubscribeRate)
    };
  });

  const totalMetrics = aggregateMetrics();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Email Campaign Reports</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Open Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{totalMetrics.openRate}%</p>
            </div>
            <Mail className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">2.1% vs last period</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Click Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{totalMetrics.clickRate}%</p>
            </div>
            <MousePointer className="h-8 w-8 text-blue-500" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">1.5% vs last period</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bounce Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{totalMetrics.bounceRate}%</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-500" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">0.3% vs last period</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unsubscribe Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{totalMetrics.unsubscribeRate}%</p>
            </div>
            <UserMinus className="h-8 w-8 text-yellow-500" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingDown className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">0.1% vs last period</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">{totalMetrics.revenue}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500">12.5% vs last period</span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Campaign Performance Comparison</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Open Rate" fill="#3B82F6" />
              <Bar dataKey="Click Rate" fill="#10B981" />
              <Bar dataKey="Bounce Rate" fill="#EF4444" />
              <Bar dataKey="Unsubscribe Rate" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Details Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Campaign Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Click Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unsubscribes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => {
                const metrics = calculateMetrics(campaign);
                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.sentAt}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.metrics.sent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {metrics.openRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {metrics.clickRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {metrics.bounceRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.metrics.unsubscribed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {metrics.revenue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmailReports; 