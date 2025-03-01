import React from 'react';
import { format } from 'date-fns';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  Send,
  User,
  X
} from 'lucide-react';
import { Complaint, ComplaintStatus } from '@/types/operations';

interface ComplaintDetailModalProps {
  complaint: Complaint;
  onClose: () => void;
  onUpdateStatus: (status: ComplaintStatus) => Promise<void>;
  onSendAIResponse: () => Promise<void>;
  onAddNote: (note: string) => Promise<void>;
}

const ComplaintDetailModal: React.FC<ComplaintDetailModalProps> = ({
  complaint,
  onClose,
  onUpdateStatus,
  onSendAIResponse,
  onAddNote
}) => {
  const [newNote, setNewNote] = React.useState('');

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await onAddNote(newNote);
    setNewNote('');
  };

  const renderStatusBadge = (status: ComplaintStatus) => {
    const statusConfig = {
      OPEN: { icon: Clock, color: 'text-yellow-500 bg-yellow-50' },
      IN_PROGRESS: { icon: Clock, color: 'text-blue-500 bg-blue-50' },
      ESCALATED: { icon: AlertCircle, color: 'text-red-500 bg-red-50' },
      RESOLVED: { icon: CheckCircle, color: 'text-green-500 bg-green-50' }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="h-4 w-4 mr-1" />
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Complaint Details
                  </h3>
                  {renderStatusBadge(complaint.status)}
                </div>

                <div className="mt-4 space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                    <div className="mt-2">
                      <p className="text-sm text-gray-900">{complaint.customerName}</p>
                      <p className="text-sm text-gray-500">ID: {complaint.customerId}</p>
                    </div>
                  </div>

                  {/* Complaint Description */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                    <div className="mt-2 prose prose-sm max-w-none text-gray-900">
                      {complaint.description}
                    </div>
                  </div>

                  {/* AI Response */}
                  {complaint.aiResponse && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-blue-900">AI Suggested Response</h4>
                      <div className="mt-2">
                        <p className="text-sm text-blue-700">{complaint.aiResponse.suggestedReply}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-blue-500">
                              Confidence: {(complaint.aiResponse.confidence * 100).toFixed(0)}%
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {complaint.aiResponse.keywords.map((keyword, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={onSendAIResponse}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Send Response
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Timeline</h4>
                    <div className="flow-root">
                      <ul className="-mb-8">
                        {complaint.timeline.map((event, index) => {
                          const isLast = index === complaint.timeline.length - 1;
                          return (
                            <li key={event.id}>
                              <div className="relative pb-8">
                                {!isLast && (
                                  <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  />
                                )}
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                                      <User className="h-5 w-5 text-gray-500" />
                                    </span>
                                  </div>
                                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        {event.details}{' '}
                                        <span className="font-medium text-gray-900">
                                          by {event.actor}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                      {format(new Date(event.timestamp), 'MMM d, h:mm a')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Notes</h4>
                    <div className="space-y-4">
                      {complaint.notes.map(note => (
                        <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{note.author}</span>
                            <span className="text-sm text-gray-500">
                              {format(new Date(note.timestamp), 'MMM d, h:mm a')}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{note.content}</p>
                        </div>
                      ))}

                      <div className="mt-4">
                        <label htmlFor="new-note" className="sr-only">
                          Add note
                        </label>
                        <div>
                          <textarea
                            id="new-note"
                            name="new-note"
                            rows={3}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Add a note..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                          />
                        </div>
                        <div className="mt-2 flex justify-end">
                          <button
                            onClick={handleAddNote}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Add Note
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              onClick={() => onUpdateStatus('RESOLVED')}
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Mark as Resolved
            </button>
            <button
              onClick={() => onUpdateStatus('ESCALATED')}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Escalate
            </button>
            <button
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailModal; 