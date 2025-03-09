import React from 'react';

export default function Help() {
  const helpSections = [
    {
      title: 'Getting Started',
      items: [
        { question: 'How do I create my first agent?', answer: 'Navigate to the Chat section and click "New Agent" to begin the setup process.' },
        { question: 'What can CleanAgent AI do?', answer: 'CleanAgent AI can help automate customer service, sales, marketing, and hiring processes.' },
      ],
    },
    {
      title: 'Account & Settings',
      items: [
        { question: 'How do I change my password?', answer: 'Go to Settings > Account > Security to update your password.' },
        { question: 'Can I change the interface language?', answer: 'Yes, visit Settings > Language to choose your preferred language.' },
      ],
    },
    {
      title: 'Troubleshooting',
      items: [
        { question: 'What should I do if an agent is not responding?', answer: 'Try refreshing the page or check the Operations dashboard for system status.' },
        { question: 'How do I report a bug?', answer: 'Use the "Report Issue" button in the Help menu or contact our support team.' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Help Center</h1>

      <div className="space-y-8">
        {helpSections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-indigo-50 rounded-lg p-6">
        <h2 className="text-lg font-medium text-indigo-900 mb-2">Need more help?</h2>
        <p className="text-indigo-700 mb-4">Our support team is available 24/7 to assist you.</p>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          Contact Support
        </button>
      </div>
    </div>
  );
} 