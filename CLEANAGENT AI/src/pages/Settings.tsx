import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  User,
  Lock,
  Globe,
  Database,
  Mail,
  Zap,
  Shield,
  Clock,
  Palette,
  Volume2,
  Eye,
  Save,
  X,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  CreditCard
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Switch from '../components/common/Switch';
import Badge from '../components/common/Badge';
import Tooltip from '../components/common/Tooltip';
import Profile from './Settings/Profile';
import Billing from './Settings/Billing';
import Notifications from './Settings/Notifications';
import Security from './Settings/Security';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    desktop: boolean;
    slack: boolean;
    mobile: boolean;
  };
  sound: boolean;
  autoSave: boolean;
  compactView: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  ipWhitelist: string[];
  lastPasswordChange: string;
  passwordStrength: 'weak' | 'medium' | 'strong';
}

interface SystemSettings {
  maxConcurrentTasks: number;
  taskTimeout: number;
  retryAttempts: number;
  logRetention: number;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  errorNotificationThreshold: number;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle save changes
  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setSaveSuccess(true);
      setHasChanges(false);
    } catch (error) {
      setSaveError('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    {
      value: 'profile',
      label: 'Profile',
      icon: User,
      content: <Profile />
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: CreditCard,
      content: <Billing />
    },
    {
      value: 'notifications',
      label: 'Notifications',
      icon: Bell,
      content: <Notifications />
    },
    {
      value: 'security',
      label: 'Security',
      icon: Shield,
      content: <Security />
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Settings</h1>
          <p className="text-gray-500">
            Manage your preferences and system settings
          </p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-4">
            {saveError && (
              <div className="text-red-500 flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>{saveError}</span>
              </div>
            )}
            {saveSuccess && (
              <div className="text-green-500 flex items-center gap-2">
                <CheckCircle size={16} />
                <span>Changes saved successfully</span>
              </div>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save size={16} className="mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>

      {/* Settings Navigation */}
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <Card>
            <div className="p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 ${
                    activeTab === tab.value
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(tab.value)}
                >
                  <tab.icon size={20} />
                  <span>{tab.label}</span>
                  <ChevronRight size={16} className="ml-auto" />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Content Area */}
        <div className="col-span-3">
          {tabs.find(tab => tab.value === activeTab)?.content}
        </div>
      </div>
    </div>
  );
}