import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

export default function Integrations() {
  const navigate = useNavigate();
  const [integrations, setIntegrations] = useState([
    {
      id: 1,
      name: 'Slack',
      description: 'Connect your Slack workspace to receive notifications and interact with CleanAgent AI.',
      status: 'Connected',
      logo: 'https://cdn.svgporn.com/logos/slack-icon.svg',
    },
    {
      id: 2,
      name: 'Microsoft Teams',
      description: 'Integrate with Microsoft Teams for seamless communication and collaboration.',
      status: 'Available',
      logo: 'https://cdn.svgporn.com/logos/microsoft-teams.svg',
    },
    {
      id: 3,
      name: 'Salesforce',
      description: 'Sync your Salesforce data with CleanAgent AI for enhanced customer insights.',
      status: 'Available',
      logo: 'https://cdn.svgporn.com/logos/salesforce.svg',
    },
    {
      id: 4,
      name: 'HubSpot',
      description: 'Connect your HubSpot CRM to streamline marketing and sales processes.',
      status: 'Available',
      logo: 'https://cdn.svgporn.com/logos/hubspot.svg',
    },
    {
      id: 5,
      name: 'Zendesk',
      description: 'Integrate with Zendesk to enhance customer support capabilities.',
      status: 'Available',
      logo: 'https://cdn.svgporn.com/logos/zendesk.svg',
    },
    {
      id: 6,
      name: 'Gmail',
      description: 'Connect your Gmail account for email automation and management.',
      status: 'Connected',
      logo: 'https://cdn.svgporn.com/logos/google-gmail.svg',
    },
  ]);

  const handleNavigateToMessagingIntegrations = () => {
    navigate('/dashboard/integrations/messaging');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-2 text-sm text-gray-600">Connect your favorite tools and services with CleanAgent AI</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-opacity">
          Browse Marketplace
        </button>
      </div>

      {/* Featured Integration - Messaging Platforms */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-1">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-xl mb-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Cross-Platform Messaging</h2>
            <p className="text-gray-600 mb-6 max-w-2xl">
              Connect with customers across multiple messaging platforms including Facebook Messenger, 
              WhatsApp, Slack, and more. Manage all your conversations from a single interface.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex -space-x-2">
                <img 
                  src="https://cdn.svgporn.com/logos/facebook-messenger.svg" 
                  className="w-10 h-10 rounded-full border-2 border-white bg-white p-1" 
                  alt="Facebook Messenger"
                />
                <img 
                  src="https://cdn.svgporn.com/logos/whatsapp.svg" 
                  className="w-10 h-10 rounded-full border-2 border-white bg-white p-1" 
                  alt="WhatsApp"
                />
                <img 
                  src="https://cdn.svgporn.com/logos/slack-icon.svg" 
                  className="w-10 h-10 rounded-full border-2 border-white bg-white p-1" 
                  alt="Slack"
                />
                <img 
                  src="https://cdn.svgporn.com/logos/telegram.svg" 
                  className="w-10 h-10 rounded-full border-2 border-white bg-white p-1" 
                  alt="Telegram"
                />
                <img 
                  src="https://cdn.svgporn.com/logos/discord.svg" 
                  className="w-10 h-10 rounded-full border-2 border-white bg-white p-1" 
                  alt="Discord"
                />
              </div>
            </div>
            <button 
              onClick={handleNavigateToMessagingIntegrations}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Set Up Messaging Integrations
            </button>
          </div>
          <div className="mt-6 md:mt-0 md:ml-8 flex-shrink-0">
            <img 
              src="/messaging-integration.svg" 
              alt="Messaging Integration" 
              className="w-56 h-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'https://via.placeholder.com/250x180?text=Messaging+Integration';
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={integration.logo}
                  alt={`${integration.name} logo`}
                  className="w-10 h-10 object-contain"
                />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {integration.name}
                  </h3>
                  <span className="text-sm text-gray-500">Integration</span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  integration.status === 'Connected'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {integration.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {integration.description}
            </p>
            <button
              className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                integration.status === 'Connected'
                  ? 'text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100'
                  : 'text-white bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Need a Custom Integration?</h2>
          <p className="text-gray-600 mb-6">
            Access our comprehensive API documentation to build custom integrations tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-opacity">
              View API Documentation
            </button>
            <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 