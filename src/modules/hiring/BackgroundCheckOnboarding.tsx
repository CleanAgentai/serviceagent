import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send, 
  RefreshCw,
  CheckSquare,
  XSquare,
  Mail,
  MessageSquare
} from 'lucide-react';
import { 
  Candidate, 
  BackgroundCheck, 
  OnboardingDocument, 
  NotificationLog,
  BackgroundCheckStatus,
  DocumentStatus,
  NotificationType
} from '@/types/hiring';
import { formatDistanceToNow, format } from 'date-fns';

interface BackgroundCheckOnboardingProps {
  candidate: Candidate;
  onInitiateBackgroundCheck: (candidateId: string) => Promise<void>;
  onSendDocument: (candidateId: string, documentType: OnboardingDocument['type']) => Promise<void>;
  onResendDocument: (documentId: string) => Promise<void>;
  onSendNotification: (candidateId: string, type: NotificationType, template: string) => Promise<void>;
  onUpdateCandidateStatus: (candidateId: string, status: 'ACCEPTED' | 'REJECTED') => Promise<void>;
}

const BackgroundCheckOnboarding: React.FC<BackgroundCheckOnboardingProps> = ({
  candidate,
  onInitiateBackgroundCheck,
  onSendDocument,
  onResendDocument,
  onSendNotification,
  onUpdateCandidateStatus
}) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [selectedNotificationType, setSelectedNotificationType] = useState<NotificationType | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const getBackgroundCheckStatusIcon = (status: BackgroundCheckStatus) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'IN_PROGRESS':
      case 'PENDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'FAILED':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <RefreshCw className="h-5 w-5 text-gray-400" />;
    }
  };

  const getDocumentStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'SIGNED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'VIEWED':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'SENT':
        return <Send className="h-5 w-5 text-yellow-500" />;
      case 'EXPIRED':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleNotificationSend = async () => {
    if (!selectedNotificationType || !selectedTemplate) return;
    
    await onSendNotification(candidate.id, selectedNotificationType, selectedTemplate);
    setIsNotificationModalOpen(false);
    setSelectedNotificationType(null);
    setSelectedTemplate('');
  };

  const renderBackgroundCheckSection = () => {
    const check = candidate.backgroundCheck;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Background Check</h3>
        
        {check ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getBackgroundCheckStatusIcon(check.status)}
                <span className="text-sm font-medium text-gray-900">
                  {check.status.replace('_', ' ')}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Initiated {formatDistanceToNow(new Date(check.initiatedAt), { addSuffix: true })}
              </span>
            </div>

            {check.estimatedCompletionDate && check.status === 'IN_PROGRESS' && (
              <div className="text-sm text-gray-500">
                Estimated completion: {format(new Date(check.estimatedCompletionDate), 'MMM d, yyyy')}
              </div>
            )}

            {check.results && (
              <div className="mt-4 space-y-3">
                <div className={`text-sm font-medium ${check.results.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {check.results.passed ? 'PASSED' : 'FAILED'}
                </div>
                <p className="text-sm text-gray-700">{check.results.summary}</p>
                {check.results.flags.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-red-600">
                    {check.results.flags.map((flag, index) => (
                      <li key={index}>{flag}</li>
                    ))}
                  </ul>
                )}
                <a
                  href={check.results.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View Full Report
                </a>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => onInitiateBackgroundCheck(candidate.id)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Initiate Background Check
          </button>
        )}
      </div>
    );
  };

  const renderOnboardingDocuments = () => {
    const documents = candidate.onboarding?.documents || [];
    const progress = candidate.onboarding?.progress || 0;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Onboarding Documents</h3>
          <div className="flex items-center">
            <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
              <div
                className="bg-blue-600 rounded-full h-2"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{progress}% Complete</span>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {getDocumentStatusIcon(doc.status)}
                <div>
                  <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                  <div className="text-xs text-gray-500">{doc.description}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {doc.status === 'SIGNED' ? (
                  <div className="text-sm text-gray-500">
                    Signed {formatDistanceToNow(new Date(doc.signedAt!), { addSuffix: true })}
                  </div>
                ) : (
                  <>
                    {doc.status === 'NOT_SENT' ? (
                      <button
                        onClick={() => onSendDocument(candidate.id, doc.type)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Send Document
                      </button>
                    ) : (
                      <button
                        onClick={() => onResendDocument(doc.id)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Resend
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {documents.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-4">
              No documents have been sent yet.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderNotificationHistory = () => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification History</h3>
        
        <div className="space-y-4">
          {candidate.notifications.map(notification => (
            <div key={notification.id} className="flex items-start space-x-3 py-3 border-b border-gray-200">
              {notification.channel === 'EMAIL' ? (
                <Mail className="h-5 w-5 text-gray-400" />
              ) : (
                <MessageSquare className="h-5 w-5 text-gray-400" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {notification.type.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification.sentAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{notification.metadata.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Background Check & Onboarding</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setSelectedNotificationType('REJECTION');
              setIsNotificationModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <XSquare className="h-4 w-4 mr-2" />
            Reject
          </button>
          <button
            onClick={() => {
              setSelectedNotificationType('OFFER');
              setIsNotificationModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            <CheckSquare className="h-4 w-4 mr-2" />
            Hire
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          {renderBackgroundCheckSection()}
          {renderOnboardingDocuments()}
        </div>
        <div>
          {renderNotificationHistory()}
        </div>
      </div>

      {/* Notification Modal */}
      {isNotificationModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                Send {selectedNotificationType?.toLowerCase()} Notification
              </h3>
              <button
                onClick={() => setIsNotificationModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Template</label>
              <select
                value={selectedTemplate}
                onChange={e => setSelectedTemplate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select a template</option>
                <option value="standard_offer">Standard Offer</option>
                <option value="senior_offer">Senior Position Offer</option>
                <option value="polite_rejection">Polite Rejection</option>
                <option value="position_filled">Position Filled</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsNotificationModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleNotificationSend}
                disabled={!selectedTemplate}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                Send Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundCheckOnboarding; 