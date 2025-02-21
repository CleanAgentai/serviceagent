import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/AuthContext';
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
  Lock,
  Mail,
  Phone,
  Globe,
  Key,
  Check,
  AlertCircle
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
    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
    <ChevronRight className={`ml-auto h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
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
    <div className="flex min-h-screen bg-gray-50">
      {/* Settings Navigation */}
      <div className="w-72 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-sm text-gray-600">Manage your account preferences</p>
        </div>
        
        <div className="space-y-2">
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
          <SettingsNavItem
            icon={<Bell className="h-5 w-5" />}
            label="Notifications"
            isActive={activeSection === 'notifications'}
            onClick={() => setActiveSection('notifications')}
          />
          <SettingsNavItem
            icon={<CreditCard className="h-5 w-5" />}
            label="Billing"
            isActive={activeSection === 'billing'}
            onClick={() => setActiveSection('billing')}
          />
          <SettingsNavItem
            icon={<Shield className="h-5 w-5" />}
            label="Security"
            isActive={activeSection === 'security'}
            onClick={() => setActiveSection('security')}
          />
        </div>

        <div className="mt-auto pt-6 border-t border-gray-200 mt-6">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">
        {activeSection === 'profile' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-600 mt-1">Manage your personal information</p>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Notification Preferences</h1>
                <p className="text-gray-600 mt-1">Choose how you want to be notified</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
              {notificationSettings.map((setting) => (
                <div key={setting.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{setting.title}</h3>
                      <p className="text-gray-600 mt-1">{setting.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => toggleNotification(setting.id, 'email')}
                      className={`flex items-center px-4 py-2 rounded-xl border transition-colors ${
                        setting.email
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </button>
                    <button
                      onClick={() => toggleNotification(setting.id, 'push')}
                      className={`flex items-center px-4 py-2 rounded-xl border transition-colors ${
                        setting.push
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Push
                    </button>
                    <button
                      onClick={() => toggleNotification(setting.id, 'sms')}
                      className={`flex items-center px-4 py-2 rounded-xl border transition-colors ${
                        setting.sms
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
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
        )}

        {activeSection === 'security' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account security</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Password</h3>
                    <p className="text-gray-600">Last changed 3 months ago</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChangePasswordModal(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Change
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-gray-600">Add an extra layer of security</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTwoFactorModal(true)}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Enable
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'company' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
                <p className="text-gray-600 mt-1">Manage your company information</p>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl hover:opacity-90 transition-opacity">
                Save Changes
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Acme Inc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="123 Business St, Suite 100&#10;City, State 12345"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'billing' && (
          <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Billing Settings</h1>
                <p className="text-gray-600 mt-1">Manage your subscription and payment methods</p>
              </div>
              <button
                onClick={() => setShowAddCardModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Add Payment Method
              </button>
            </div>

            <div className="space-y-6">
              {/* Current Plan */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">$299</span>
                  <span className="ml-1 text-gray-600">/month</span>
                </div>
                <p className="mt-2 text-gray-600">All-In-One AI Solution</p>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                      Default
                    </span>
                  </div>
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