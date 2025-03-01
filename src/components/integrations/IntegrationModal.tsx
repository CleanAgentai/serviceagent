import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Integration, IntegrationCredentials } from '../../types/integrations';
import { integrationsService } from '../../services/integrations/integrationsService';

interface IntegrationModalProps {
  integration: Integration;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({
  integration,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [credentials, setCredentials] = useState<IntegrationCredentials>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await integrationsService.connectIntegration(integration, credentials);
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFields = () => {
    switch (integration.type) {
      case 'EMAIL':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                API Key
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={credentials.apiKey || ''}
                onChange={(e) =>
                  setCredentials({ ...credentials, apiKey: e.target.value })
                }
                required
              />
            </div>
          </div>
        );

      case 'CRM':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client ID
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={credentials.clientId || ''}
                onChange={(e) =>
                  setCredentials({ ...credentials, clientId: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client Secret
              </label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={credentials.clientSecret || ''}
                onChange={(e) =>
                  setCredentials({ ...credentials, clientSecret: e.target.value })
                }
                required
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-gray-500">
            No configuration required for this integration.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Configure {integration.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
            {renderFields()}
            {error && (
              <div className="mt-4 text-sm text-red-600">{error}</div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`
                px-4 py-2 bg-blue-500 text-white rounded-md
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
              `}
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IntegrationModal; 