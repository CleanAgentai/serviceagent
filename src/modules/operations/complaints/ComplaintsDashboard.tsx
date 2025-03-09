import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  MoreVertical,
  Search,
  TrendingUp,
  Users
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Complaint,
  ComplaintCategory,
  ComplaintMetrics,
  ComplaintPriority,
  ComplaintStatus
} from '@/types/operations';

interface ComplaintsDashboardProps {
  complaints: Complaint[];
  metrics: ComplaintMetrics;
  onUpdateStatus: (complaintId: string, status: ComplaintStatus) => Promise<void>;
  onAssignComplaints: (complaintIds: string[], assigneeId: string) => Promise<void>;
  onSendAIResponse: (complaintId: string) => Promise<void>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const ComplaintsDashboard: React.FC<ComplaintsDashboardProps> = ({
  complaints,
  metrics,
  onUpdateStatus,
  onAssignComplaints,
  onSendAIResponse
}) => {
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    category?: ComplaintCategory;
    priority?: ComplaintPriority;
    status?: ComplaintStatus;
    dateRange?: [Date, Date];
  }>({});
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  const getStatusIcon = (status: ComplaintStatus) => {
    switch (status) {
      case 'RESOLVED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'ESCALATED':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'IN_PROGRESS':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: ComplaintPriority) => {
    switch (priority) {
      case 'URGENT':
        return 'text-red-600 bg-red-50';
      case 'HIGH':
        return 'text-orange-600 bg-orange-50';
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const renderMetricsCards = () => {
    return (
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Complaints</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.totalComplaints}
            </p>
            <p className="ml-2 flex items-center text-sm text-gray-500">
              this month
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Open Complaints</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.openComplaints}
            </p>
            <p className="ml-2 flex items-center text-sm text-red-600">
              needs attention
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg Resolution Time</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.avgResolutionTime}h
            </p>
            <p className="ml-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              12%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Resolution Rate</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {((metrics.resolvedComplaints / metrics.totalComplaints) * 100).toFixed(1)}%
            </p>
            <p className="ml-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              5%
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderComplaintsTable = () => {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Complaints
              </h3>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
              <button
                disabled={selectedComplaints.length === 0}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Assign Selected
              </button>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <div className="flex-1">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search complaints..."
                />
              </div>
            </div>

            <button
              onClick={() => {/* Open filters modal */}}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          <div className="mt-6 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedComplaints.length === complaints.length}
                            onChange={(e) => {
                              setSelectedComplaints(
                                e.target.checked ? complaints.map(c => c.id) : []
                              );
                            }}
                          />
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Customer
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Category
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Priority
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Created
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {complaints.map((complaint) => (
                        <tr
                          key={complaint.id}
                          className={selectedComplaints.includes(complaint.id) ? 'bg-gray-50' : undefined}
                        >
                          <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={selectedComplaints.includes(complaint.id)}
                              onChange={(e) => {
                                setSelectedComplaints(
                                  e.target.checked
                                    ? [...selectedComplaints, complaint.id]
                                    : selectedComplaints.filter(id => id !== complaint.id)
                                );
                              }}
                            />
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="font-medium text-gray-900">
                              {complaint.customerName}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {complaint.category}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getPriorityColor(complaint.priority)}`}>
                              {complaint.priority}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              {getStatusIcon(complaint.status)}
                              <span className="ml-2">{complaint.status}</span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => setSelectedComplaint(complaint)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View<span className="sr-only">, {complaint.id}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    return (
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Complaints by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={metrics.categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                nameKey="category"
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
              >
                {metrics.categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Complaint Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow rounded-lg p-6 col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Common Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {metrics.commonKeywords.map((keyword, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                  keyword.sentiment === 'NEGATIVE'
                    ? 'bg-red-100 text-red-800'
                    : keyword.sentiment === 'POSITIVE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {keyword.keyword}
                <span className="ml-2 text-xs">({keyword.count})</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Complaint Management
        </h2>
      </div>

      {renderMetricsCards()}
      {renderComplaintsTable()}
      {renderAnalytics()}

      {/* Complaint Detail Modal would go here */}
    </div>
  );
};

export default ComplaintsDashboard; 