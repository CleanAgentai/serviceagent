import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Integrations() {
  const navigate = useNavigate();
  const [integrations] = useState([
    {
      id: 1,
      name: 'Gmail',
      description: 'Connect your Gmail account for email automation and management.',
      status: 'Available',
      logo: 'https://cdn.svgporn.com/logos/google-gmail.svg',
    },
    {
      id: 2,
      name: 'Outlook',
      description: 'Integrate with Microsoft Outlook for email synchronization.',
      status: 'Available',
      logo: 'https://cdn.svgporn.com/logos/microsoft-office.svg',
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
    }
  ]);

  const handleContactSales = (integrationName?: string) => {
    const subject = integrationName 
      ? `Integration Request: ${integrationName}`
      : 'Integration Support Request';
    
    const body = integrationName
      ? `Hi,\n\nI'm interested in setting up the ${integrationName} integration with CleanAgent AI. Please provide more information about the integration process and requirements.\n\nBest regards`
      : `Hi,\n\nI'd like to learn more about CleanAgent AI's integration capabilities. Please provide information about the setup process and available options.\n\nBest regards`;

    const mailtoUrl = `mailto:porter@cleanagent.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
          <p className="mt-2 text-sm text-gray-600">Connect your essential business tools with CleanAgent AI</p>
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
              onClick={() => handleContactSales(integration.name)}
              className="w-full px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Contact Sales to Connect
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Need Help Setting Up?</h2>
          <p className="text-gray-600 mb-6">
            Get in touch with our sales team to learn more about our integrations and how we can help streamline your business processes.
          </p>
          <button 
            onClick={() => handleContactSales()}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 transition-opacity"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
} 