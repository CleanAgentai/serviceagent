import React, { useState } from 'react';
import { Users, Gift, TrendingUp, Settings as SettingsIcon } from 'lucide-react';
import { ReferralSettings } from './ReferralSettings';
import { ReferralTable } from './ReferralTable';
import { ReferralReminders } from './ReferralReminders';
import { Referral, ReferralStatus } from '@/types/referral';

interface ReferralDashboardProps {
  referrals: Referral[];
  onUpdateReferral: (referral: Referral) => void;
  onDeleteReferral: (id: string) => void;
}

export const ReferralDashboard: React.FC<ReferralDashboardProps> = ({
  referrals,
  onUpdateReferral,
  onDeleteReferral,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRemindersOpen, setIsRemindersOpen] = useState(false);

  const totalReferrals = referrals.length;
  const totalConversions = referrals.filter(r => r.status === 'converted').length;
  const totalRewards = referrals.reduce((sum, r) => sum + (r.rewardAmount || 0), 0);
  const conversionRate = totalReferrals > 0 
    ? ((totalConversions / totalReferrals) * 100).toFixed(1) 
    : '0';

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Referral Program</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsRemindersOpen(true)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Manage Reminders
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            Program Settings
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Referrals</p>
              <h3 className="text-xl font-semibold text-gray-900">{totalReferrals}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <h3 className="text-xl font-semibold text-gray-900">{conversionRate}%</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Gift className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Rewards</p>
              <h3 className="text-xl font-semibold text-gray-900">
                ${totalRewards.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Referrers</p>
              <h3 className="text-xl font-semibold text-gray-900">
                {new Set(referrals.map(r => r.referrerId)).size}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Table */}
      <div className="bg-white rounded-lg shadow">
        <ReferralTable
          referrals={referrals}
          onUpdateReferral={onUpdateReferral}
          onDeleteReferral={onDeleteReferral}
        />
      </div>

      {/* Settings Modal */}
      <ReferralSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Reminders Modal */}
      <ReferralReminders
        isOpen={isRemindersOpen}
        onClose={() => setIsRemindersOpen(false)}
      />
    </div>
  );
}; 