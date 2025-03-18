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
  AlertCircle,
  Settings as SettingsIcon,
  Computer,
  Smartphone,
  LogIn,
  Monitor
} from 'lucide-react';
import { CompanyProfileForm } from './CompanyProfileForm';

interface SettingsNavItemProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  isActive?: boolean;
  onClick: () => void;
}

interface SecurityLog {
  id: string;
  event: string;
  date: string;
  location: string;
  device: string;
}

interface BillingHistory {
  id: string;
  date: string;
  amount: string;
  status: string;
  invoice: string;
}

const SettingsNavItem: React.FC<SettingsNavItemProps> = ({
  icon,
  label,
  description,
  isActive,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center px-6 py-4 rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'
        : 'hover:bg-gray-50'
    }`}
  >
    <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
      {React.cloneElement(icon as React.ReactElement, {
        className: `h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
      })}
    </div>
    <div className="ml-4 flex-1 text-left">
      <span className={`block text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
        {label}
      </span>
      {description && (
        <span className="block text-sm text-gray-500 mt-0.5">{description}</span>
      )}
    </div>
    <ChevronRight className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
  </button>
);

export default function Settings() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [messagingNotifications, setMessagingNotifications] = useState([
    {
      id: 'slack',
      name: 'Slack',
      icon: 'https://cdn.svgporn.com/logos/slack-icon.svg',
      color: '#4A154B',
      enabled: true,
      newMessage: true,
      mentions: true,
      directMessages: true
    },
    {
      id: 'facebook-messenger',
      name: 'Facebook Messenger',
      icon: 'https://cdn.svgporn.com/logos/facebook-messenger.svg',
      color: '#0084FF',
      enabled: true,
      newMessage: true,
      mentions: false,
      directMessages: true
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: 'https://cdn.svgporn.com/logos/whatsapp.svg',
      color: '#25D366',
      enabled: true,
      newMessage: true,
      mentions: false,
      directMessages: true
    },
    {
      id: 'website-chat',
      name: 'Website Live Chat',
      icon: 'https://cdn.svgporn.com/logos/livechat.svg',
      color: '#FF5A00',
      enabled: true,
      newMessage: true,
      mentions: false,
      directMessages: true
    }
  ]);

  const [platforms, setPlatforms] = useState([
    // ... existing platforms ...
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState(null);

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

  const navigationItems = [
    {
      icon: <User />,
      label: 'Profile',
      description: 'Manage your personal information',
      id: 'profile'
    },
    {
      icon: <Building />,
      label: 'Company',
      description: 'Update company details and branding',
      id: 'company'
    },
    {
      icon: <CreditCard />,
      label: 'Billing',
      description: 'Manage subscription and payments',
      id: 'billing'
    },
    {
      icon: <Shield />,
      label: 'Security',
      description: 'Password and authentication settings',
      id: 'security'
    }
  ];

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

  const toggleMessagingNotification = (platformId: string, setting: 'enabled' | 'newMessage' | 'mentions' | 'directMessages') => {
    setMessagingNotifications(prev =>
      prev.map(platform =>
        platform.id === platformId
          ? { ...platform, [setting]: !platform[setting] }
          : platform
      )
    );
  };

  const handlePlatformChange = (platformId: string) => {
    const platform = platforms.find(p => p.id === parseInt(platformId, 10));
    if (platform) {
      setSelectedPlatform(platform);
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Settings Navigation */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 shadow-sm h-16 flex items-center">
          <div className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 flex-shrink-0">
              <svg viewBox="0 0 496 496" className="w-full h-full text-gray-900">
                <path fill="currentColor" d="M311.748962,337.178955 C313.113892,338.804657 314.979553,339.627838 315.223663,341.663330 C283.895691,367.985901 219.840118,374.012787 176.038116,333.793335 C130.167435,291.674408 127.204659,219.818512 169.653152,174.999817 C212.780640,129.464249 283.037201,127.997818 327.743408,170.253326 C373.264771,213.279297 370.044434,280.021301 341.758026,315.158813 C340.017395,315.241119 339.167908,313.853485 338.143799,312.834137 C326.926941,301.669525 315.863373,290.346222 304.453583,279.383026 C301.143738,276.202759 302.154419,273.207947 303.102081,269.868195 C307.600586,254.013779 307.292725,238.534744 298.796509,223.992462 C289.243713,207.641800 274.756104,198.610580 256.002136,196.407776 C254.426407,196.222702 252.700226,195.905045 251.170807,196.935608 C250.918030,198.607025 252.295486,199.264099 253.168854,200.141724 C261.277039,208.289627 269.499207,216.325272 277.542755,224.536072 C290.788910,238.057663 292.393890,258.649109 281.488892,273.427521 C270.156311,288.785370 250.590515,293.216766 233.347641,284.371552 C230.188843,282.751160 227.506775,280.556763 225.021042,278.067657 C217.133652,270.169464 209.238556,262.279022 201.333710,254.398315 C200.078812,253.147247 198.758224,251.962067 196.650894,249.976562 C195.807281,258.901367 197.838501,266.213348 200.916855,273.108765 C211.473724,296.755737 236.149490,311.719940 265.161652,303.999725 C273.663605,301.737366 278.809113,303.135437 284.470947,309.563232 C292.933380,319.170502 302.441803,327.856445 311.748962,337.178955 M166.551010,215.034134 C149.531631,254.525772 163.454025,298.908173 193.826370,323.257538 C224.345383,347.724487 264.855164,346.256226 283.091614,336.184967 C279.268768,332.364105 275.481354,328.646637 271.779175,324.846130 C270.219818,323.245361 268.592499,323.684662 266.724243,324.073181 C257.340271,326.024567 247.924698,325.987122 238.473175,324.402008 C189.400818,316.172241 162.266708,262.791534 184.604187,218.321823 C185.385132,216.767090 185.776108,214.798813 189.196991,213.776993 C193.545517,218.379562 198.228027,223.533340 203.123047,228.476685 C214.377777,239.842514 225.743423,251.098434 237.049057,262.413910 C243.000076,268.370148 249.920197,270.759125 257.975616,267.514740 C270.029663,262.659790 272.836731,247.972519 263.365814,238.249924 C248.252502,222.735001 232.831436,207.520035 217.568298,192.150635 C216.204361,190.777161 214.341232,189.705093 214.064575,186.733734 C214.267258,186.616959 214.852173,186.279022 215.437988,185.942719 C216.303848,185.445663 217.138062,184.879639 218.041306,184.463562 C241.712128,173.559738 265.234497,173.701202 287.974060,186.640594 C316.651428,202.958771 329.979950,233.137024 324.047333,266.633881 C323.787750,268.099396 322.923706,269.611908 324.161316,270.890045 C328.236389,275.098572 332.400024,279.221375 336.941040,283.791138 C343.464722,267.669800 344.245361,252.047318 341.684296,236.201569 C335.108521,195.515823 301.817291,162.255630 257.062714,159.504013 C217.387161,157.064636 183.752457,178.144135 166.551010,215.034134" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">Settings</h2>
              <p className="text-sm text-gray-500 truncate">Manage your preferences</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigationItems.map((item) => (
          <SettingsNavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              description={item.description}
              isActive={activeSection === item.id}
              onClick={() => setActiveSection(item.id)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10">
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="w-full flex items-center px-6 py-4 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <div className="p-2 rounded-lg bg-red-100">
              <LogOut className="h-5 w-5 text-red-600" />
            </div>
            <span className="ml-4 text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0 h-screen overflow-y-auto">
        <div className="max-w-3xl mx-auto py-8 px-8">
        {activeSection === 'profile' && (
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
              </div>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Save Changes
              </button>
            </div>

              <div className="space-y-6">
                  {/* Profile Photo */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Photo</h2>
                    <div className="flex items-center space-x-6">
                      <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Change Photo
                          </button>
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Remove
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">
                          Recommended: Square JPG, PNG. Max size 1MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                          className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Display Name
                        </label>
                        <input
                          type="text"
                          className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                          placeholder="johndoe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                        <div className="relative">
                  <input
                    type="email"
                            className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    placeholder="john@example.com"
                  />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                            Verified
                          </span>
                        </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                          className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                    placeholder="(123) 456-7890"
                  />
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive email updates about your account</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="emailNotifications"
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
                          <p className="text-sm text-gray-500">Get important updates via text message</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="smsNotifications"
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Marketing Communications</h3>
                          <p className="text-sm text-gray-500">Receive updates about new features and promotions</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                          <input
                            type="checkbox"
                            name="marketingNotifications"
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                          />
                          <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Time Zone */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Time Zone</h2>
                    <div>
                      <select
                        className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      </select>
                      <p className="mt-2 text-sm text-gray-500">
                        This will be used for all dates and times across your account
                      </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'security' && (
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your account security and authentication</p>
                  </div>
                </div>

          <div className="space-y-6">
                  {/* Password & Authentication */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Password & Authentication</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <Key className="h-5 w-5 text-blue-600" />
                          </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Password</p>
                            <p className="text-sm text-gray-600">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChangePasswordModal(true)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                          Change Password
                  </button>
                </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-purple-100">
                            <Shield className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-600">Add an extra layer of security</p>
                          </div>
                        </div>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Enable 2FA
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-green-100">
                            <Mail className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">Recovery Email</p>
                            <p className="text-sm text-gray-600">Used to recover your account</p>
                          </div>
                        </div>
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Update Email
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Active Sessions */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-gray-900">Active Sessions</h2>
                      <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                        Sign out all devices
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-white">
                            <Computer className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">Current Device</p>
                            <p className="text-sm text-gray-600">Chrome on MacOS • Tampa, FL</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Active Now
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-gray-100">
                            <Smartphone className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">iPhone 12</p>
                            <p className="text-sm text-gray-600">Safari on iOS • Miami, FL</p>
                          </div>
                        </div>
                        <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                          Sign out
                        </button>
                      </div>
              </div>
            </div>

            {/* Security Log */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-medium text-gray-900">Recent Security Activity</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View all activity
                      </button>
                    </div>
              <div className="space-y-4">
                {securityLogs.map((log) => (
                        <div key={log.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="p-2 rounded-lg bg-gray-100">
                            {log.event.includes('Login') ? (
                              <LogIn className="h-5 w-5 text-green-600" />
                            ) : (
                              <Shield className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{log.event}</p>
                              <span className="text-sm text-gray-500">{log.date}</span>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-600">
                        <Globe className="h-4 w-4 mr-1" />
                        {log.location}
                        <span className="mx-2">•</span>
                              <Monitor className="h-4 w-4 mr-1" />
                              {log.device}
                      </div>
                    </div>
                  </div>
                ))}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'company' && (
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
                    <p className="text-gray-600 mt-1">Manage your company information and branding</p>
              </div>
            </div>

                <CompanyProfileForm />
            </div>
          </div>
        )}

        {activeSection === 'billing' && (
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Billing Settings</h1>
                <p className="text-gray-600 mt-1">Manage your subscription and payment methods</p>
              </div>
              <button
                onClick={() => setShowAddCardModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                    <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            <div className="space-y-6">
              {/* Current Plan */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                        <h2 className="text-lg font-medium text-gray-900">Current Plan</h2>
                    <p className="text-sm text-gray-600 mt-1">All-In-One AI Solution</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      Active
                    </span>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold text-gray-900">$299</span>
                      <span className="ml-1 text-gray-600">/month</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3">Plan Details</h3>
                    <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Billing Period</span>
                              <span className="text-gray-900">Monthly</span>
                    </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Next Billing Date</span>
                              <span className="text-gray-900">March 19, 2025</span>
                    </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Payment Method</span>
                              <span className="text-gray-900">•••• 4242</span>
                            </div>
                          </div>
                    </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-900 mb-3">Usage Overview</h3>
                    <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">API Calls</span>
                                <span className="text-gray-900">85% used</span>
                    </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                            </div>
                      <div>
                              <div className="flex items-center justify-between text-sm mb-1">
                                <span className="text-gray-600">Storage</span>
                                <span className="text-gray-900">40% used</span>
                      </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: '40%' }} />
                              </div>
                    </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-3 mt-6">
                        <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                          Change Plan
                        </button>
                        <button className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          Cancel Subscription
                        </button>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Manage Auto-Pay
                      </button>
                    </div>
                <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-white">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/25</p>
                      </div>
                    </div>
                        <div className="flex items-center space-x-3">
                          <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Default
                    </span>
                          <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                          <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
                  </div>
                </div>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-gray-100">
                            <CreditCard className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">•••• •••• •••• 8888</p>
                            <p className="text-sm text-gray-600">Expires 08/24</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button className="text-sm text-gray-600 hover:text-gray-900">
                            Set as Default
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
                          <button className="text-sm text-red-600 hover:text-red-700">Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-medium text-gray-900">Billing History</h2>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Download All
                      </button>
                    </div>
                    <div className="overflow-hidden">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Invoice
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {billingHistory.map((item) => (
                            <tr key={item.id}>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.date}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                                {item.amount}
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {item.status}
                                </span>
                              </td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-700">
                                <button>Download {item.invoice}</button>
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
        )}
        </div>
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
    </div>
  );
} 