import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Gift, Link, Clock, Users } from 'lucide-react';
import { ReferralProgramSettings } from '@/types/referral';

interface ReferralSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  initialSettings?: ReferralProgramSettings;
  onSave?: (settings: ReferralProgramSettings) => void;
}

export const ReferralSettings: React.FC<ReferralSettingsProps> = ({
  isOpen,
  onClose,
  initialSettings,
  onSave,
}) => {
  const [settings, setSettings] = useState<ReferralProgramSettings>(
    initialSettings || {
      rewardType: 'monetary',
      rewardAmount: 100,
      minimumPurchaseAmount: 0,
      expirationDays: 30,
      autoGenerateLinks: true,
      eligibilityRules: {
        mustBeCustomer: true,
        minimumPurchases: 0,
        accountAgeDays: 0,
      },
      doubleRewards: false,
      customMessage: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(settings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold">
              Referral Program Settings
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Reward Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Gift className="w-5 h-5 mr-2" />
                Reward Configuration
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reward Type
                  </label>
                  <select
                    value={settings.rewardType}
                    onChange={(e) =>
                      setSettings({ ...settings, rewardType: e.target.value as any })
                    }
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="monetary">Cash Reward</option>
                    <option value="coupon">Coupon Code</option>
                    <option value="gift">Gift Card</option>
                    <option value="points">Loyalty Points</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Reward Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      value={settings.rewardAmount}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          rewardAmount: parseFloat(e.target.value),
                        })
                      }
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Eligibility Rules */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Eligibility Rules
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.eligibilityRules.mustBeCustomer}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        eligibilityRules: {
                          ...settings.eligibilityRules,
                          mustBeCustomer: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Must be an existing customer
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum Required Purchases
                  </label>
                  <input
                    type="number"
                    value={settings.eligibilityRules.minimumPurchases}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        eligibilityRules: {
                          ...settings.eligibilityRules,
                          minimumPurchases: parseInt(e.target.value),
                        },
                      })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum Account Age (days)
                  </label>
                  <input
                    type="number"
                    value={settings.eligibilityRules.accountAgeDays}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        eligibilityRules: {
                          ...settings.eligibilityRules,
                          accountAgeDays: parseInt(e.target.value),
                        },
                      })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Program Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Link className="w-5 h-5 mr-2" />
                Program Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.autoGenerateLinks}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          autoGenerateLinks: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Auto-generate referral links
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.doubleRewards}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          doubleRewards: e.target.checked,
                        })
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Enable double rewards periods
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Referral Link Expiration (days)
                  </label>
                  <input
                    type="number"
                    value={settings.expirationDays}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        expirationDays: parseInt(e.target.value),
                      })
                    }
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Referral Message
                  </label>
                  <textarea
                    value={settings.customMessage}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        customMessage: e.target.value,
                      })
                    }
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter a custom message for referral emails..."
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Settings
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 