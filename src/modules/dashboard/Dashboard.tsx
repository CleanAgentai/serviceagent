import React, { useState, useEffect } from 'react';
import { Users, UserCheck, UserX, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, BarChart } from '@/components/charts';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactElement;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
        {React.cloneElement(icon, {
          className: `h-6 w-6 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`
        })}
      </div>
      <span className={`flex items-center text-sm font-medium ${
        trend === 'up' ? 'text-green-600' : 'text-red-600'
      }`}>
        {trend === 'up' ? (
          <TrendingUp className="h-4 w-4 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 mr-1" />
        )}
        {change}
      </span>
    </div>
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

interface CandidateRowProps {
  name: string;
  position: string;
  status: 'pending' | 'interviewed' | 'hired' | 'rejected';
  date: string;
}

const CandidateRow: React.FC<CandidateRowProps> = ({ name, position, status, date }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    interviewed: 'bg-blue-100 text-blue-800',
    hired: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{position}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalCandidates: '156',
    hired: '45',
    rejected: '32',
    pendingReview: '79'
  });

  const recentCandidates = [
    { name: 'John Smith', position: 'Software Engineer', status: 'hired', date: '2h ago' },
    { name: 'Sarah Johnson', position: 'Product Manager', status: 'interviewed', date: '5h ago' },
    { name: 'Michael Brown', position: 'UX Designer', status: 'pending', date: '1d ago' },
    { name: 'Emily Davis', position: 'Marketing Lead', status: 'rejected', date: '2d ago' },
  ];

  return (
    <div className="h-full flex flex-col space-y-4 max-h-full overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600">Overview of your hiring pipeline</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Total Candidates"
          value={metrics.totalCandidates}
          change="+12% vs last month"
          trend="up"
          icon={<Users />}
        />
        <StatCard
          title="Candidates Hired"
          value={metrics.hired}
          change="+8% vs last month"
          trend="up"
          icon={<UserCheck />}
        />
        <StatCard
          title="Candidates Rejected"
          value={metrics.rejected}
          change="-5% vs last month"
          trend="down"
          icon={<UserX />}
        />
        <StatCard
          title="Pending Review"
          value={metrics.pendingReview}
          change="+15% vs last month"
          trend="up"
          icon={<Clock />}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* Hiring Trends Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hiring Trends</h2>
          <div className="h-64">
            <LineChart />
          </div>
        </div>

        {/* Candidate Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Candidate Distribution</h2>
          <div className="h-64">
            <BarChart />
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="bg-white rounded-xl shadow-sm p-6 col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Candidates</h2>
          <div className="space-y-2 overflow-auto max-h-[400px]">
            {recentCandidates.map((candidate, index) => (
              <CandidateRow
                key={index}
                name={candidate.name}
                position={candidate.position}
                status={candidate.status as any}
                date={candidate.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 