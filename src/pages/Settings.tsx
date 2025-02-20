import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  CreditCard,
  Bell,
  Shield,
  User,
  Building,
  LogOut,
  ChevronRight,
  Plus,
  X,
  Check,
  AlertCircle,
  Lock,
  Mail,
  Phone,
  Globe,
  Key,
  CreditCardIcon,
  Calendar,
  FileText,
  Download
} from 'lucide-react';

interface SettingsNavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface BillingHistory {
  id: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
  invoice: string;
}

interface SecurityLog {
  id: string;
  event: string;
  date: string;
  location: string;
  device: string;
}

const SettingsNavItem: React.FC<SettingsNavItemProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
    <ChevronRight className={`ml-auto h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
  </button>
);

export default function Settings() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('billing');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: '1',
      title: 'New Automation Alert',
      description: 'Get notified when a new automation is created or modified',
      email: true,
      push: true,
      sms: false
    },
    {
      id: '2',
      title: 'Performance Updates',
      description: 'Receive updates about automation performance and metrics',
      email: true,
      push: false,
      sms: false
    },
    {
      id: '3',
      title: 'Security Alerts',
      description: 'Important alerts about your account security',
      email: true,
      push: true,
      sms: true
    }
  ]);

  const [billingHistory] = useState<BillingHistory[]>([
    {
      id: '1',
      date: 'Feb 19, 2025',
      amount: '$299.00',
      status: 'paid',
      invoice: 'INV-2025-001'
    },
    {
      id: '2',
      date: 'Jan 19, 2025',
      amount: '$299.00',
      status: 'paid',
      invoice: 'INV-2025-002'
    }
  ]);

  const [securityLogs] = useState<SecurityLog[]>([
    {
      id: '1',
      event: 'Login successful',
      date: 'Feb 19, 2025 14:23',
      location: 'Tampa, FL',
      device: 'Chrome on MacOS'
    },
    {
      id: '2',
      event: 'Password changed',
      date: 'Feb 18, 2025 10:15',
      location: 'Tampa, FL',
      device: 'Chrome on MacOS'
    }
  ]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNotification = (id: string, type: 'email' | 'push' | 'sms') => {
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, [type]: !setting[type] }
          : setting
      )
    );
  };

  return (
    <div className="flex h-full">
      {/* Settings Navigation */}
      <div className="w-64 border-r border-gray-200 p-4 space-y-2">
        <SettingsNavItem
          icon={<CreditCard className="h-5 w-5" />}
          label="Billing"
          isActive={activeSection === 'billing'}
          onClick={() => setActiveSection('billing')}
        />
        <SettingsNavItem
          icon={<Bell className="h-5 w-5" />}
          label="Notifications"
          isActive={activeSection === 'notifications'}
          onClick={() => setActiveSection('notifications')}
        />
        <SettingsNavItem
          icon={<Shield className="h-5 w-5" />}
          label="Security"
          isActive={activeSection === 'security'}
          onClick={() => setActiveSection('security')}
        />
        <SettingsNavItem
          icon={<User className="h-5 w-5" />}
          label="Profile"
          isActive={activeSection === 'profile'}
          onClick={() => setActiveSection('profile')}
        />
        <SettingsNavItem
          icon={<Building className="h-5 w-5" />}
          label="Company"
          isActive={activeSection === 'company'}
          onClick={() => setActiveSection('company')}
        />
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-3">Sign Out</span>
          {isLoading && (
            <div className="ml-auto">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
            </div>
          )}
        </button>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-8">
        {activeSection === 'billing' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Billing & Subscription</h2>
              <button
                onClick={() => setShowAddCardModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            {/* Current Plan */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">Professional Plan</p>
                  <p className="text-gray-600">$299/month • Renews on March 19, 2025</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Change Plan
                </button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-8 w-12 bg-gray-200 rounded" />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">•••• 4242</p>
                      <p className="text-sm text-gray-600">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                      Default
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {billingHistory.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4">{item.date}</td>
                      <td className="py-4">{item.amount}</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-blue-600 hover:text-blue-700">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Notification Preferences</h2>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{setting.title}</h4>
                        <p className="text-gray-600">{setting.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => toggleNotification(setting.id, 'email')}
                        className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                          setting.email
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </button>
                      <button
                        onClick={() => toggleNotification(setting.id, 'push')}
                        className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                          setting.push
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Push
                      </button>
                      <button
                        onClick={() => toggleNotification(setting.id, 'sms')}
                        className={`flex items-center justify-center px-4 py-2 rounded-lg border ${
                          setting.sms
                            ? 'bg-blue-50 border-blue-200 text-blue-600'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        SMS
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
            </div>

            {/* Password & Authentication */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Authentication</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 text-gray-400" />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Password</p>
                      <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChangePasswordModal(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Change
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Key className="h-5 w-5 text-gray-400" />
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowTwoFactorModal(true)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Enable
                  </button>
                </div>
              </div>
            </div>

            {/* Security Log */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Security Activity</h3>
              <div className="space-y-4">
                {securityLogs.map((log) => (
                  <div key={log.id} className="flex items-start p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{log.event}</p>
                      <p className="text-sm text-gray-600">{log.date}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Globe className="h-4 w-4 mr-1" />
                        {log.location}
                        <span className="mx-2">•</span>
                        <span>{log.device}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Save Changes
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'company' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Company Settings</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                Save Changes
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Address
                  </label>
                  <textarea
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="123 Business St, Suite 100&#10;City, State 12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax ID / EIN
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="XX-XXXXXXX"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Payment Method Modal */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Payment Method</h3>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123"
                  />
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Add Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Enable Two-Factor Authentication</h3>
              <button
                onClick={() => setShowTwoFactorModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-center mb-4">
                  {/* Placeholder for QR Code */}
                  <div className="w-48 h-48 bg-gray-200 rounded-lg"></div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Scan this QR code with your authenticator app
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 6-digit code"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Verify and Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 