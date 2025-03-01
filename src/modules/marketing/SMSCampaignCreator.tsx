import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Send, Sparkles, AlertCircle, X, Info } from 'lucide-react';
import { Lead } from '@/types/leads';

interface SMSCampaignCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaign: SMSCampaign) => void;
  leads: Lead[];
  segments: Segment[];
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  count: number;
  criteria: {
    field: string;
    operator: string;
    value: string;
  }[];
}

export interface SMSCampaign {
  id: string;
  name: string;
  message: string;
  segmentId: string;
  schedule: {
    sendNow: boolean;
    scheduledDate?: string;
    scheduledTime?: string;
  };
  status: 'Draft' | 'Scheduled' | 'In Progress' | 'Completed';
  createdAt: string;
  sentAt?: string;
  stats?: {
    totalRecipients: number;
    delivered: number;
    responses: number;
    optOuts: number;
    responseRate: number;
  };
}

const MAX_SMS_LENGTH = 160;

const SMSCampaignCreator: React.FC<SMSCampaignCreatorProps> = ({
  isOpen,
  onClose,
  onSave,
  leads,
  segments
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [segmentId, setSegmentId] = useState('');
  const [sendNow, setSendNow] = useState(true);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [selectedTone, setSelectedTone] = useState<'professional' | 'friendly' | 'urgent'>('professional');

  // Calculate remaining characters
  const remainingChars = MAX_SMS_LENGTH - message.length;
  const isOverLimit = remainingChars < 0;

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  // Generate AI suggestions based on campaign details and selected tone
  const generateAISuggestions = () => {
    setIsGeneratingSuggestions(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const segment = segments.find(s => s.id === segmentId);
      const segmentName = segment ? segment.name : 'customers';
      
      let suggestions: string[] = [];
      
      if (selectedTone === 'professional') {
        suggestions = [
          `Thank you for your interest in our services. Reply YES to schedule a consultation with our team. Reply STOP to opt out.`,
          `We value your business. Our team is available to answer any questions about our latest offerings. Reply STOP to opt out.`,
          `Your feedback matters to us. How would you rate your recent experience? Reply 1-5 or STOP to opt out.`
        ];
      } else if (selectedTone === 'friendly') {
        suggestions = [
          `Hey there! 👋 We've got something special just for you! Reply INFO to learn more or STOP to opt out.`,
          `Missing you! It's been a while since we connected. Any questions we can help with? Reply STOP to opt out.`,
          `Quick update: We've launched something new we think you'll love! Check it out: [link]. Reply STOP to opt out.`
        ];
      } else if (selectedTone === 'urgent') {
        suggestions = [
          `Limited time offer: 24 hours only! Reply YES to claim your exclusive discount before it expires. Reply STOP to opt out.`,
          `Last chance! Your reserved item will be released in 2 hours. Reply HOLD to keep it. Reply STOP to opt out.`,
          `Action required: Please confirm your appointment for tomorrow by replying YES. Reply NO to reschedule or STOP to opt out.`
        ];
      }
      
      setAiSuggestions(suggestions);
      setIsGeneratingSuggestions(false);
    }, 1500);
  };

  // Apply an AI suggestion to the message field
  const applySuggestion = (suggestion: string) => {
    setMessage(suggestion);
    setShowAISuggestions(false);
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Campaign name is required';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message text is required';
    } else if (message.length > MAX_SMS_LENGTH) {
      newErrors.message = `Message exceeds maximum length of ${MAX_SMS_LENGTH} characters`;
    }
    
    if (!segmentId) {
      newErrors.segmentId = 'Please select a recipient segment';
    }
    
    if (!sendNow) {
      if (!scheduledDate) {
        newErrors.scheduledDate = 'Please select a date';
      }
      
      if (!scheduledTime) {
        newErrors.scheduledTime = 'Please select a time';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const campaign: SMSCampaign = {
      id: Date.now().toString(),
      name,
      message,
      segmentId,
      schedule: {
        sendNow,
        scheduledDate: !sendNow ? scheduledDate : undefined,
        scheduledTime: !sendNow ? scheduledTime : undefined
      },
      status: sendNow ? 'In Progress' : 'Scheduled',
      createdAt: new Date().toISOString(),
      sentAt: sendNow ? new Date().toISOString() : undefined,
      stats: {
        totalRecipients: segments.find(s => s.id === segmentId)?.count || 0,
        delivered: 0,
        responses: 0,
        optOuts: 0,
        responseRate: 0
      }
    };
    
    onSave(campaign);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Create SMS Campaign</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Campaign Name */}
          <div>
            <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name
            </label>
            <input
              id="campaign-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Summer Promotion"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          {/* Message Text */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="message-text" className="block text-sm font-medium text-gray-700">
                Message Text
              </label>
              <span className={`text-xs ${isOverLimit ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
              </span>
            </div>
            <div className="relative">
              <textarea
                id="message-text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border ${errors.message ? 'border-red-300' : isOverLimit ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Enter your message here..."
              />
              <button
                onClick={() => setShowAISuggestions(!showAISuggestions)}
                className="absolute right-2 bottom-2 p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                title="Get AI suggestions"
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
            {isOverLimit && !errors.message && (
              <p className="mt-1 text-sm text-red-600">Message is too long</p>
            )}
            
            {/* AI Suggestions Panel */}
            {showAISuggestions && (
              <div className="mt-3 border border-blue-100 rounded-md bg-blue-50 p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-blue-800 flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    AI Message Suggestions
                  </h3>
                  <button
                    onClick={() => setShowAISuggestions(false)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mb-3">
                  <label className="block text-xs font-medium text-blue-700 mb-1">
                    Select tone:
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedTone('professional')}
                      className={`px-2 py-1 text-xs rounded-md ${selectedTone === 'professional' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-300'}`}
                    >
                      Professional
                    </button>
                    <button
                      onClick={() => setSelectedTone('friendly')}
                      className={`px-2 py-1 text-xs rounded-md ${selectedTone === 'friendly' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-300'}`}
                    >
                      Friendly
                    </button>
                    <button
                      onClick={() => setSelectedTone('urgent')}
                      className={`px-2 py-1 text-xs rounded-md ${selectedTone === 'urgent' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-300'}`}
                    >
                      Urgent
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={generateAISuggestions}
                  className="w-full mb-3 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 flex items-center justify-center"
                  disabled={isGeneratingSuggestions}
                >
                  {isGeneratingSuggestions ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      Generating suggestions...
                    </>
                  ) : (
                    <>Generate Suggestions</>
                  )}
                </button>
                
                {!isGeneratingSuggestions && aiSuggestions.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {aiSuggestions.map((suggestion, index) => (
                      <div 
                        key={index}
                        className="p-2 bg-white rounded border border-blue-200 text-sm cursor-pointer hover:bg-blue-100"
                        onClick={() => applySuggestion(suggestion)}
                      >
                        {suggestion}
                        <div className="mt-1 flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {suggestion.length} characters
                          </span>
                          <button
                            className="text-xs text-blue-600 hover:text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              applySuggestion(suggestion);
                            }}
                          >
                            Use this
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Recipient Segment */}
          <div>
            <label htmlFor="segment" className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Segment
            </label>
            {segments.length > 0 ? (
              <div className="relative">
                <select
                  id="segment"
                  value={segmentId}
                  onChange={(e) => setSegmentId(e.target.value)}
                  className={`w-full px-3 py-2 border ${errors.segmentId ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none`}
                >
                  <option value="">Select a segment</option>
                  {segments.map((segment) => (
                    <option key={segment.id} value={segment.id}>
                      {segment.name} ({segment.count} recipients)
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">No segments defined</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>You need to create a segment before you can send an SMS campaign.</p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      >
                        Create Segment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {errors.segmentId && (
              <p className="mt-1 text-sm text-red-600">{errors.segmentId}</p>
            )}
          </div>
          
          {/* Schedule */}
          <div>
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-1">Schedule</legend>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="send-now"
                    name="schedule"
                    type="radio"
                    checked={sendNow}
                    onChange={() => setSendNow(true)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="send-now" className="ml-3 block text-sm font-medium text-gray-700">
                    Send immediately
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="schedule-later"
                    name="schedule"
                    type="radio"
                    checked={!sendNow}
                    onChange={() => setSendNow(false)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="schedule-later" className="ml-3 block text-sm font-medium text-gray-700">
                    Schedule for later
                  </label>
                </div>
              </div>
            </fieldset>
            
            {!sendNow && (
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="scheduled-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      id="scheduled-date"
                      type="date"
                      min={today}
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className={`w-full px-3 py-2 border ${errors.scheduledDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {errors.scheduledDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.scheduledDate}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="scheduled-time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <div className="relative">
                    <input
                      id="scheduled-time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className={`w-full px-3 py-2 border ${errors.scheduledTime ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {errors.scheduledTime && (
                    <p className="mt-1 text-sm text-red-600">{errors.scheduledTime}</p>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Compliance Notice */}
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">SMS Compliance Notice</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    All SMS messages must include opt-out instructions (e.g., "Reply STOP to opt out").
                    Ensure your message complies with local regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Send className="h-4 w-4 mr-2" />
              {sendNow ? 'Send Campaign' : 'Schedule Campaign'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSCampaignCreator; 