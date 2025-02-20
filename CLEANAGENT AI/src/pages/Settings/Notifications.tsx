import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Calendar, AlertCircle, Loader2, Check } from 'lucide-react';
import Card from '../../components/common/Card';
import Switch from '../../components/common/Switch';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import { cn } from '../../lib/utils';

interface NotificationCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  email: boolean;
  push: boolean;
  slack: boolean;
  frequency: 'realtime' | 'daily' | 'weekly' | 'never';
}

export default function Notifications() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      id: 'tasks',
      name: 'Task Updates',
      description: 'Get notified about task assignments, updates, and completions',
      icon: Calendar,
      email: true,
      push: true,
      slack: false,
      frequency: 'realtime'
    },
    {
      id: 'workflows',
      name: 'Workflow Alerts',
      description: 'Receive alerts about workflow status changes and issues',
      icon: MessageSquare,
      email: true,
      push: true,
      slack: true,
      frequency: 'realtime'
    },
    {
      id: 'system',
      name: 'System Notifications',
      description: 'Stay informed about system updates and maintenance',
      icon: AlertCircle,
      email: true,
      push: false,
      slack: false,
      frequency: 'weekly'
    }
  ]);

  const frequencyOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Summary' },
    { value: 'never', label: 'Never' }
  ];

  const handleToggle = (categoryId: string, type: 'email' | 'push' | 'slack') => {
    setCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? { ...category, [type]: !category[type] }
          : category
      )
    );
  };

  const handleFrequencyChange = (categoryId: string, frequency: NotificationCategory['frequency']) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? { ...category, frequency }
          : category
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError('Failed to save notification preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
            <p className="text-sm text-gray-500">
              Manage how and when you receive notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saveError && (
              <div className="text-red-500 text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{saveError}</span>
              </div>
            )}
            {saveSuccess && (
              <div className="text-green-500 text-sm flex items-center gap-2">
                <Check size={16} />
                <span>Preferences saved successfully</span>
              </div>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="relative transition-all duration-200 hover:scale-105"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {categories.map(category => (
            <div
              key={category.id}
              className="border rounded-lg p-4 transition-all duration-200 hover:border-blue-500 hover:shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-50">
                  <category.icon className="w-5 h-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {category.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Email Notifications</span>
                        </div>
                        <Switch
                          checked={category.email}
                          onCheckedChange={() => handleToggle(category.id, 'email')}
                          className="transition-all duration-200"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Push Notifications</span>
                        </div>
                        <Switch
                          checked={category.push}
                          onCheckedChange={() => handleToggle(category.id, 'push')}
                          className="transition-all duration-200"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Slack Notifications</span>
                        </div>
                        <Switch
                          checked={category.slack}
                          onCheckedChange={() => handleToggle(category.id, 'slack')}
                          className="transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Notification Frequency
                      </label>
                      <Select
                        value={category.frequency}
                        onChange={(value) => handleFrequencyChange(category.id, value as NotificationCategory['frequency'])}
                        options={frequencyOptions}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
} 


