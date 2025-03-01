import React from 'react';
import { Rocket, BarChart2, Users, CheckCircle } from 'lucide-react';

export const WelcomeStep: React.FC = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <Rocket className="w-16 h-16 text-blue-500" />
      </div>
      <h3 className="text-lg font-semibold mb-4">Welcome to CleanAgent</h3>
      <p className="text-gray-600">
        We're excited to help you streamline your business operations. Let's get
        started by setting up your essential preferences and integrations.
      </p>
    </div>
  );
};

export const MarketingSetupStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <BarChart2 className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="font-semibold">Marketing Preferences</h3>
          <p className="text-gray-600">Configure your marketing channels and analytics preferences</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="email-marketing" className="rounded text-blue-500" />
          <label htmlFor="email-marketing">Enable Email Marketing</label>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="social-media" className="rounded text-blue-500" />
          <label htmlFor="social-media">Enable Social Media Integration</label>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="analytics" className="rounded text-blue-500" />
          <label htmlFor="analytics">Enable Analytics Tracking</label>
        </div>
      </div>
    </div>
  );
};

export const HiringSetupStep: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Users className="w-8 h-8 text-blue-500" />
        <div>
          <h3 className="font-semibold">Hiring Workflow</h3>
          <p className="text-gray-600">Set up your hiring process and preferences</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Job Posting Template
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option>Standard Template</option>
            <option>Technical Roles Template</option>
            <option>Sales Roles Template</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interview Process
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="screening" className="rounded text-blue-500" />
              <label htmlFor="screening">Initial Screening</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="technical" className="rounded text-blue-500" />
              <label htmlFor="technical">Technical Interview</label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="cultural" className="rounded text-blue-500" />
              <label htmlFor="cultural">Cultural Fit Interview</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompleteStep: React.FC = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h3 className="text-lg font-semibold mb-4">Setup Complete!</h3>
      <p className="text-gray-600">
        You're all set to start using CleanAgent. We've configured your preferences
        and you can always adjust them later in the settings.
      </p>
      <div className="mt-6">
        <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Start Using CleanAgent
        </button>
      </div>
    </div>
  );
}; 