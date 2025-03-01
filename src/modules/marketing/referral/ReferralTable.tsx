import React, { useState } from 'react';
import { Edit2, Trash2, ExternalLink, Mail } from 'lucide-react';
import { Referral, ReferralStatus } from '@/types/referral';

interface ReferralTableProps {
  referrals: Referral[];
  onUpdateReferral: (referral: Referral) => void;
  onDeleteReferral: (id: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  qualified: 'bg-purple-100 text-purple-800',
  converted: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

export const ReferralTable: React.FC<ReferralTableProps> = ({
  referrals,
  onUpdateReferral,
  onDeleteReferral,
}) => {
  const [sortField, setSortField] = useState<keyof Referral>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filter, setFilter] = useState<ReferralStatus | 'all'>('all');

  const handleSort = (field: keyof Referral) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedReferrals = referrals
    .filter(referral => filter === 'all' || referral.status === filter)
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const modifier = sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * modifier;
      }
      if (aValue instanceof Date && bValue instanceof Date) {
        return (aValue.getTime() - bValue.getTime()) * modifier;
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * modifier;
      }
      return 0;
    });

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex space-x-2">
          {(['all', ...Object.keys(statusColors)] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === status
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('referrerName')}
            >
              Referrer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('referredName')}
            >
              Referred Lead
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('rewardAmount')}
            >
              Reward
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('createdAt')}
            >
              Date
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredAndSortedReferrals.map((referral) => (
            <tr key={referral.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {referral.referrerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {referral.referrerEmail}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {referral.referredName}
                </div>
                <div className="text-sm text-gray-500">
                  {referral.referredEmail}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    statusColors[referral.status as keyof typeof statusColors]
                  }`}
                >
                  {referral.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${referral.rewardAmount?.toLocaleString() || '0'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(referral.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      // Open edit modal or form
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDeleteReferral(referral.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = `mailto:${referral.referredEmail}`;
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 