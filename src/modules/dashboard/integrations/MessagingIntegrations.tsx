import React, { useState } from 'react';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';

interface MessagingPlatform {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'available' | 'pending';
  color: string;
}

export default function MessagingIntegrations() {
  const [platforms, setPlatforms] = useState<MessagingPlatform[]>([
    {
      id: 'facebook-messenger',
      name: 'Facebook Messenger',
      description: 'Connect your Facebook pages to manage Messenger conversations',
      icon: 'https://cdn.svgporn.com/logos/facebook-messenger.svg',
      status: 'available',
      color: '#0084FF'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Integrate with Slack to send and receive messages from your workspace',
      icon: 'https://cdn.svgporn.com/logos/slack-icon.svg',
      status: 'connected',
      color: '#4A154B'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Connect with the WhatsApp Business API to manage customer conversations',
      icon: 'https://cdn.svgporn.com/logos/whatsapp.svg',
      status: 'available',
      color: '#25D366'
    },
    {
      id: 'website-chat',
      name: 'Website Live Chat',
      description: 'Add a live chat widget to your website to talk with visitors',
      icon: 'https://cdn.svgporn.com/logos/livechat.svg',
      status: 'connected',
      color: '#FF5A00'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      description: 'Integrate with Telegram to manage bot conversations',
      icon: 'https://cdn.svgporn.com/logos/telegram.svg',
      status: 'available',
      color: '#0088CC'
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Connect your Discord server to manage conversations',
      icon: 'https://cdn.svgporn.com/logos/discord.svg',
      status: 'available',
      color: '#5865F2'
    }
  ]);

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<MessagingPlatform | null>(null);
  const [connectionStep, setConnectionStep] = useState<'initial' | 'auth' | 'configure' | 'success'>('initial');
  const [notificationPreferences, setNotificationPreferences] = useState({
    newMessage: true,
    mention: true,
    systemAlert: true
  });

  const handleConnectPlatform = (platform: MessagingPlatform) => {
    setSelectedPlatform(platform);
    setConnectionStep('initial');
    setShowConnectModal(true);
  };

  const handleDisconnectPlatform = (platform: MessagingPlatform) => {
    setPlatforms(
      platforms.map(p => p.id === platform.id ? { ...p, status: 'available' } : p)
    );
  };

  const progressConnection = () => {
    if (connectionStep === 'initial') {
      setConnectionStep('auth');
    } else if (connectionStep === 'auth') {
      setConnectionStep('configure');
    } else if (connectionStep === 'success') {
      setShowConnectModal(false);
      setConnectionStep('initial');
      if (selectedPlatform) {
        setPlatforms(
          platforms.map(p => p.id === selectedPlatform.id ? { ...p, status: 'connected' } : p)
        );
      }
    } else {
      setConnectionStep('success');
    }
  };

  const toggleNotificationPreference = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: !notificationPreferences[key]
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messaging Integrations</h1>
          <p className="mt-2 text-sm text-gray-600">Connect your messaging platforms to streamline communication</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map(platform => (
          <div key={platform.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ backgroundColor: `${platform.color}20` }}>
                  <img
                    src={platform.icon}
                    alt={`${platform.name} logo`}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    {platform.name}
                  </h3>
                  <span className="text-sm text-gray-500">Messaging Platform</span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  platform.status === 'connected'
                    ? 'bg-green-100 text-green-800'
                    : platform.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {platform.status === 'connected' ? 'Connected' : 
                 platform.status === 'pending' ? 'Pending' : 'Available'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {platform.description}
            </p>
            <button
              onClick={() => platform.status === 'connected' 
                ? handleDisconnectPlatform(platform) 
                : handleConnectPlatform(platform)
              }
              className={`w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                platform.status === 'connected'
                  ? 'text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 bg-red-50 hover:bg-red-100'
                  : 'text-white bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {platform.status === 'connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      {/* Connection Modal */}
      {showConnectModal && selectedPlatform && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <button 
                  onClick={() => connectionStep !== 'initial' 
                    ? setConnectionStep('initial') 
                    : setShowConnectModal(false)
                  }
                  className="p-2 rounded-full hover:bg-gray-100 mr-2"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-500" />
                </button>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: `${selectedPlatform.color}20` }}>
                    <img
                      src={selectedPlatform.icon}
                      alt={`${selectedPlatform.name} logo`}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div className="ml-3">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Connect {selectedPlatform.name}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {connectionStep === 'initial' && (
                <div>
                  <p className="text-gray-700 mb-6">
                    Connecting to {selectedPlatform.name} will allow you to:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-700">
                        Receive and respond to messages from {selectedPlatform.name} directly in this platform
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-700">
                        Use AI-powered responses with your {selectedPlatform.name} conversations
                      </p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-700">
                        Get notified of new messages and important updates
                      </p>
                    </li>
                  </ul>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          You'll need to authorize this application to access your {selectedPlatform.name} account.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {connectionStep === 'auth' && (
                <div className="text-center py-8">
                  <p className="text-gray-700 mb-6">
                    Click the button below to authenticate with {selectedPlatform.name}. This will open a new window.
                  </p>
                  <button 
                    onClick={progressConnection}
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Authenticate with {selectedPlatform.name}
                  </button>
                </div>
              )}

              {connectionStep === 'configure' && (
                <div>
                  <p className="text-gray-700 mb-6">
                    Configure your {selectedPlatform.name} notification preferences:
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">New message notifications</h3>
                        <p className="text-sm text-gray-500">Get notified when you receive a new message</p>
                      </div>
                      <button 
                        onClick={() => toggleNotificationPreference('newMessage')}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                          notificationPreferences.newMessage ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                            notificationPreferences.newMessage ? 'translate-x-5' : 'translate-x-0'
                          }`} 
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Mention notifications</h3>
                        <p className="text-sm text-gray-500">Get notified when you are mentioned in a message</p>
                      </div>
                      <button 
                        onClick={() => toggleNotificationPreference('mention')}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                          notificationPreferences.mention ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                            notificationPreferences.mention ? 'translate-x-5' : 'translate-x-0'
                          }`} 
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">System alert notifications</h3>
                        <p className="text-sm text-gray-500">Get notified about system alerts and updates</p>
                      </div>
                      <button 
                        onClick={() => toggleNotificationPreference('systemAlert')}
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none ${
                          notificationPreferences.systemAlert ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span 
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                            notificationPreferences.systemAlert ? 'translate-x-5' : 'translate-x-0'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {connectionStep === 'success' && (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Connection Successful!</h3>
                  <p className="text-gray-700 mb-6">
                    You have successfully connected {selectedPlatform.name}. You can now receive and respond to messages directly from this platform.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              {connectionStep === 'success' ? (
                <button
                  onClick={progressConnection}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowConnectModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors mr-4"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={progressConnection}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {connectionStep === 'initial' ? 'Continue' : 
                     connectionStep === 'auth' ? 'Next' : 'Save Settings'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 