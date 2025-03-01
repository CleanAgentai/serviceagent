import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Form, TextField, CheckBox } from '../form';
import { Loader2, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { primaryGradientClass } from '@/app/shared/styles/theme';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface IntegrationConfig {
  name: string;
  logo: string;
  description: string;
  fields: {
    id: string;
    label: string;
    placeholder?: string;
    type: 'text' | 'password' | 'checkbox';
    required?: boolean;
    helperText?: string;
  }[];
  isOAuth?: boolean;
  oAuthUrl?: string;
  learnMoreUrl?: string;
  documentationUrl?: string;
}

export interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: IntegrationConfig;
  onConnect: (formData: Record<string, any>) => Promise<boolean>;
  onDisconnect?: () => Promise<boolean>;
  connectionStatus: ConnectionStatus;
  connectionError?: string;
}

/**
 * IntegrationModal component for connecting to third-party services
 */
export const IntegrationModal: React.FC<IntegrationModalProps> = ({
  isOpen,
  onClose,
  integration,
  onConnect,
  onDisconnect,
  connectionStatus,
  connectionError,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(connectionError);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const success = await onConnect(formData);
      if (!success) {
        setError('Failed to connect. Please check your credentials and try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle OAuth connection
  const handleOAuthConnect = () => {
    if (integration.oAuthUrl) {
      window.open(integration.oAuthUrl, '_blank', 'width=600,height=700');
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    if (!onDisconnect) return;
    
    setLoading(true);
    try {
      await onDisconnect();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect');
    } finally {
      setLoading(false);
    }
  };

  // Render the connection status badge
  const renderStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-1" />
            Connected
          </div>
        );
      case 'connecting':
        return (
          <div className="flex items-center text-blue-600 text-sm font-medium">
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            Connecting...
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-600 text-sm font-medium">
            <AlertCircle className="h-4 w-4 mr-1" />
            Connection Error
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-500 text-sm font-medium">
            Not Connected
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center space-x-3">
          <img 
            src={integration.logo} 
            alt={`${integration.name} logo`} 
            className="h-8 w-8" 
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-900">
                {integration.name}
              </h3>
              {renderStatusBadge()}
            </div>
          </div>
        </div>
      }
      size="lg"
    >
      <div className="space-y-6">
        {/* Description */}
        <div>
          <p className="text-sm text-gray-500">{integration.description}</p>

          {/* Links */}
          <div className="mt-2 flex space-x-4 text-sm">
            {integration.learnMoreUrl && (
              <a 
                href={integration.learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                Learn more
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
            {integration.documentationUrl && (
              <a 
                href={integration.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                Documentation
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Connected State */}
        {connectionStatus === 'connected' && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Successfully connected</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Your account is now linked to {integration.name}.</p>
                </div>
                {onDisconnect && (
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      disabled={loading}
                      className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      {loading && <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />}
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {(error || connectionStatus === 'error') && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Connection error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error || connectionError || 'There was an error connecting to the service.'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Connection Form - Only show if not connected */}
        {connectionStatus !== 'connected' && (
          <Form
            onSubmit={handleSubmit}
            className="space-y-4"
            submitButton={
              integration.isOAuth ? (
                <button
                  type="button"
                  onClick={handleOAuthConnect}
                  disabled={loading || connectionStatus === 'connecting'}
                  className={`
                    w-full ${primaryGradientClass} text-white rounded-md py-2 px-4
                    text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    disabled:opacity-60
                  `}
                >
                  {loading || connectionStatus === 'connecting' ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </span>
                  ) : (
                    'Connect with OAuth'
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || connectionStatus === 'connecting'}
                  className={`
                    w-full ${primaryGradientClass} text-white rounded-md py-2 px-4
                    text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                    disabled:opacity-60
                  `}
                >
                  {loading || connectionStatus === 'connecting' ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Connecting...
                    </span>
                  ) : (
                    'Connect'
                  )}
                </button>
              )
            }
          >
            {!integration.isOAuth && (
              <>
                {integration.fields.map((field) => (
                  field.type === 'checkbox' ? (
                    <CheckBox
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      helperText={field.helperText}
                      required={field.required}
                      checked={formData[field.id] || false}
                      onChange={handleChange}
                    />
                  ) : (
                    <TextField
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      placeholder={field.placeholder}
                      helperText={field.helperText}
                      required={field.required}
                      type={field.type}
                      value={formData[field.id] || ''}
                      onChange={handleChange}
                    />
                  )
                ))}
              </>
            )}
          </Form>
        )}
      </div>
    </Modal>
  );
}; 