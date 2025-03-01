import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Clock, Mail, Wand2 } from 'lucide-react';
import { ReminderSchedule, ReminderTemplate } from '@/types/referral';
import { generateEmailTemplate } from '@/services/ai/emailAI';

interface ReferralRemindersProps {
  isOpen: boolean;
  onClose: () => void;
  initialSchedules?: ReminderSchedule[];
  onSave?: (schedules: ReminderSchedule[]) => void;
}

export const ReferralReminders: React.FC<ReferralRemindersProps> = ({
  isOpen,
  onClose,
  initialSchedules,
  onSave,
}) => {
  const [schedules, setSchedules] = useState<ReminderSchedule[]>(
    initialSchedules || [
      {
        id: '1',
        frequency: 'monthly',
        dayOfMonth: 1,
        template: {
          subject: 'Refer a Friend and Earn Rewards!',
          body: 'Don\'t forget to refer your friends and colleagues to earn rewards!',
          previewText: 'Earn rewards through our referral program',
        },
        enabled: true,
        lastSent: null,
        targetAudience: 'all',
      },
    ]
  );

  const [editingSchedule, setEditingSchedule] = useState<ReminderSchedule | null>(
    null
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTemplate = async (schedule: ReminderSchedule) => {
    setIsGenerating(true);
    try {
      const template = await generateEmailTemplate({
        type: 'referral_reminder',
        frequency: schedule.frequency,
        audience: schedule.targetAudience,
      });

      setSchedules(
        schedules.map((s) =>
          s.id === schedule.id ? { ...s, template } : s
        )
      );
    } catch (error) {
      console.error('Error generating template:', error);
    }
    setIsGenerating(false);
  };

  const handleAddSchedule = () => {
    const newSchedule: ReminderSchedule = {
      id: Date.now().toString(),
      frequency: 'monthly',
      dayOfMonth: 1,
      template: {
        subject: '',
        body: '',
        previewText: '',
      },
      enabled: true,
      lastSent: null,
      targetAudience: 'all',
    };
    setSchedules([...schedules, newSchedule]);
    setEditingSchedule(newSchedule);
  };

  const handleSave = () => {
    onSave?.(schedules);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-semibold">
              Referral Reminders
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {schedule.frequency.charAt(0).toUpperCase() +
                          schedule.frequency.slice(1)}{' '}
                        Reminder
                      </h3>
                      <p className="text-sm text-gray-500">
                        Sent on day {schedule.dayOfMonth} of{' '}
                        {schedule.frequency === 'monthly' ? 'each month' : 'every quarter'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingSchedule(schedule)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setSchedules(
                            schedules.filter((s) => s.id !== schedule.id)
                          )
                        }
                        className="text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {editingSchedule?.id === schedule.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Frequency
                          </label>
                          <select
                            value={schedule.frequency}
                            onChange={(e) =>
                              setSchedules(
                                schedules.map((s) =>
                                  s.id === schedule.id
                                    ? { ...s, frequency: e.target.value as any }
                                    : s
                                )
                              )
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Day of {schedule.frequency === 'monthly' ? 'Month' : 'Quarter'}
                          </label>
                          <input
                            type="number"
                            min="1"
                            max={schedule.frequency === 'monthly' ? '28' : '90'}
                            value={schedule.dayOfMonth}
                            onChange={(e) =>
                              setSchedules(
                                schedules.map((s) =>
                                  s.id === schedule.id
                                    ? { ...s, dayOfMonth: parseInt(e.target.value) }
                                    : s
                                )
                              )
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Email Template
                          </label>
                          <button
                            onClick={() => handleGenerateTemplate(schedule)}
                            disabled={isGenerating}
                            className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                          >
                            <Wand2 className="w-4 h-4 mr-1" />
                            Generate Template
                          </button>
                        </div>
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={schedule.template.subject}
                            onChange={(e) =>
                              setSchedules(
                                schedules.map((s) =>
                                  s.id === schedule.id
                                    ? {
                                        ...s,
                                        template: {
                                          ...s.template,
                                          subject: e.target.value,
                                        },
                                      }
                                    : s
                                )
                              )
                            }
                            placeholder="Email Subject"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          <textarea
                            value={schedule.template.body}
                            onChange={(e) =>
                              setSchedules(
                                schedules.map((s) =>
                                  s.id === schedule.id
                                    ? {
                                        ...s,
                                        template: {
                                          ...s.template,
                                          body: e.target.value,
                                        },
                                      }
                                    : s
                                )
                              )
                            }
                            rows={4}
                            placeholder="Email Body"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Target Audience
                        </label>
                        <select
                          value={schedule.targetAudience}
                          onChange={(e) =>
                            setSchedules(
                              schedules.map((s) =>
                                s.id === schedule.id
                                  ? { ...s, targetAudience: e.target.value as any }
                                  : s
                              )
                            )
                          }
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="all">All Participants</option>
                          <option value="active">Active Referrers</option>
                          <option value="inactive">Inactive Referrers</option>
                          <option value="high_value">High-Value Referrers</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={schedule.enabled}
                          onChange={(e) =>
                            setSchedules(
                              schedules.map((s) =>
                                s.id === schedule.id
                                  ? { ...s, enabled: e.target.checked }
                                  : s
                              )
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          Enable this reminder
                        </label>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => setEditingSchedule(null)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                          Done Editing
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Subject: {schedule.template.subject}
                      </p>
                      <p className="text-sm text-gray-500">
                        Target: {schedule.targetAudience}
                      </p>
                      {schedule.lastSent && (
                        <p className="text-sm text-gray-500">
                          Last sent: {new Date(schedule.lastSent).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleAddSchedule}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Reminder Schedule
            </button>
          </div>

          <div className="flex justify-end p-6 border-t">
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 