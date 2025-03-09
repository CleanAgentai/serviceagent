import React, { useState } from 'react';
import { X, ChevronLeft, Video, FileText, Star, MessageCircle, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import { Candidate, InterviewSession } from '@/types/hiring';

interface CandidateDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
}

export default function CandidateDetailModal({ isOpen, onClose, candidate }: CandidateDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'video' | 'reviews'>('video');
  const [reviewComment, setReviewComment] = useState('');
  const [selectedRating, setSelectedRating] = useState<'SHORTLIST' | 'REJECT' | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);

  const handleSaveReview = () => {
    // TODO: Implement save review logic
    console.log('Saving review:', {
      comment: reviewComment,
      rating: selectedRating,
      candidateId: candidate.id
    });
  };

  const handleQuestionSelect = (interviewId: string, questionId: string) => {
    setSelectedInterviewId(interviewId);
    setSelectedQuestion(questionId);
  };

  if (!isOpen) return null;

  // Get the selected interview and its details
  const selectedInterview = candidate.interviews.find(i => i.id === selectedInterviewId) || candidate.interviews[0];
  const selectedQuestionDetails = selectedInterview?.questions?.find(q => q.id === selectedQuestion);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90vw] max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
              <p className="text-sm text-gray-600">Applied for {candidate.appliedFor}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('video')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'video'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Video className="h-5 w-5 mr-2" />
              Video & Transcripts
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Star className="h-5 w-5 mr-2" />
              Reviews & Ratings
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'video' ? (
            <div className="grid grid-cols-12 gap-6">
              {/* Questions Panel - Left Side */}
              <div className="col-span-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Interview Questions</h3>
                </div>
                <div className="divide-y divide-gray-200 max-h-[calc(90vh-240px)] overflow-y-auto">
                  {candidate.interviews.map((interview) => (
                    <div key={interview.id} className="bg-gray-50">
                      <div className="p-4 flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          Session {new Date(interview.startTime).toLocaleDateString()}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          interview.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                          interview.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {interview.status}
                        </span>
                      </div>
                      <div className="bg-white">
                        {interview.questions?.map((question) => (
                          <button
                            key={question.id}
                            onClick={() => handleQuestionSelect(interview.id, question.id)}
                            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                              selectedQuestion === question.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{question.text}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Duration: {question.duration}s
                                </p>
                              </div>
                              <div className={`flex items-center gap-2 text-xs font-medium ${
                                question.score >= 8 ? 'text-green-600' :
                                question.score >= 6 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {question.score}/10
                                <ChevronDown className="h-4 w-4" />
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video and Transcript Panel - Right Side */}
              <div className="col-span-8 space-y-6">
                {/* Video Player */}
                {selectedInterview?.recordingUrl && (
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="aspect-video bg-black">
                      <video
                        key={`${selectedInterview.id}-${selectedQuestion}`}
                        src={`${selectedInterview.recordingUrl}#t=${selectedQuestionDetails?.startTime || 0}`}
                        controls
                        className="w-full h-full"
                      />
                    </div>
                    {selectedQuestionDetails && (
                      <div className="p-4 border-t border-gray-200">
                        <h3 className="text-sm font-medium text-gray-900">Current Question</h3>
                        <p className="text-sm text-gray-600 mt-1">{selectedQuestionDetails.text}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Transcript */}
                <div className="bg-white rounded-lg border border-gray-200">
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Transcript</h3>
                    {selectedQuestionDetails && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">AI Score:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedQuestionDetails.score >= 8 ? 'bg-green-100 text-green-800' :
                          selectedQuestionDetails.score >= 6 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {selectedQuestionDetails.score}/10
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 max-h-[calc(90vh-600px)] overflow-y-auto space-y-4">
                    {selectedQuestionDetails ? (
                      <>
                        {/* AI Feedback */}
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-medium text-blue-900">AI Analysis</h4>
                          <p className="text-sm text-blue-800 mt-1">
                            {selectedQuestionDetails.aiFeedback}
                          </p>
                        </div>
                        
                        {/* Question Transcript */}
                        {selectedQuestionDetails.transcript.map((entry, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex-shrink-0 w-24">
                              <span className="text-xs text-gray-500">
                                {new Date(entry.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <span className="text-xs font-medium text-blue-600 block mb-1">
                                {entry.speaker}
                              </span>
                              <p className="text-sm text-gray-700">{entry.message}</p>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">
                        Select a question to view its transcript
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Overall Rating */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Rating</h3>
                <div className="flex items-center space-x-2">
                  <div className="text-3xl font-bold text-blue-600">
                    {candidate.aiScore}/10
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.round((candidate.aiScore || 0) / 2)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Comments Section */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">AI Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <MessageCircle className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Key Observations</h4>
                        <p className="text-sm text-blue-800 mt-1">
                          {candidate.aiAnalysis?.summary || "The candidate demonstrates strong potential with notable experience in the field. Their communication skills and technical knowledge align well with the position requirements."}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-green-900 mb-2">Strengths</h4>
                      <ul className="list-disc list-inside text-sm text-green-800 space-y-1">
                        {candidate.aiAnalysis?.strengths?.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        )) || [
                          "Strong communication skills",
                          "Relevant industry experience",
                          "Problem-solving abilities"
                        ].map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-yellow-900 mb-2">Areas for Discussion</h4>
                      <ul className="list-disc list-inside text-sm text-yellow-800 space-y-1">
                        {candidate.aiAnalysis?.areasForDiscussion?.map((area, index) => (
                          <li key={index}>{area}</li>
                        )) || [
                          "Previous project outcomes",
                          "Team collaboration style",
                          "Career growth expectations"
                        ].map((area, index) => (
                          <li key={index}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Ratings */}
              {candidate.interviews[0]?.evaluation.categories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">{category.name}</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-blue-600">{category.score}/10</div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(category.score / 2)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{category.feedback}</p>
                  </div>
                </div>
              ))}

              {/* Review Input */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Your Review</h3>
                <div className="space-y-4">
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter your review comments..."
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedRating('SHORTLIST')}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                          selectedRating === 'SHORTLIST'
                            ? 'bg-green-100 text-green-800 border-2 border-green-500'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <ThumbsUp className={`h-4 w-4 mr-2 ${
                          selectedRating === 'SHORTLIST' ? 'text-green-600' : 'text-gray-500'
                        }`} />
                        Shortlist
                      </button>
                      <button
                        onClick={() => setSelectedRating('REJECT')}
                        className={`flex items-center px-4 py-2 rounded-lg ${
                          selectedRating === 'REJECT'
                            ? 'bg-red-100 text-red-800 border-2 border-red-500'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <ThumbsDown className={`h-4 w-4 mr-2 ${
                          selectedRating === 'REJECT' ? 'text-red-600' : 'text-gray-500'
                        }`} />
                        Reject
                      </button>
                    </div>
                    
                    <button
                      onClick={handleSaveReview}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Review
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Previous Notes</h3>
                <div className="space-y-4">
                  {candidate.notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{note.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(note.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{note.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 