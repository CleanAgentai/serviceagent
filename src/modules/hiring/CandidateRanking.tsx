import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText, MessageSquare, Star, Edit2, ExternalLink } from 'lucide-react';
import { Candidate, CandidateStatus, InterviewEvaluation } from '@/types/hiring';
import { formatDistanceToNow } from 'date-fns';

interface CandidateRankingProps {
  candidates: Candidate[];
  onUpdateCandidate: (id: string, updates: Partial<Candidate>) => void;
  onViewResume: (url: string) => void;
  onViewTranscript: (candidateId: string) => void;
}

const CandidateRanking: React.FC<CandidateRankingProps> = ({
  candidates,
  onUpdateCandidate,
  onViewResume,
  onViewTranscript
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [sortField, setSortField] = useState<keyof Candidate>('aiScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: keyof Candidate) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredCandidates = candidates
    .filter(candidate => 
      (statusFilter === 'ALL' || candidate.currentStatus === statusFilter) &&
      (searchTerm === '' || 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortField === 'aiScore') {
        return sortDirection === 'asc' 
          ? (a.aiScore || 0) - (b.aiScore || 0)
          : (b.aiScore || 0) - (a.aiScore || 0);
      }
      return 0;
    });

  const renderEvaluationBreakdown = (evaluation: InterviewEvaluation) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">Overall Score</h4>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">{evaluation.overallScore}</span>
            <span className="text-gray-500 ml-1">/100</span>
          </div>
        </div>

        <div className="space-y-3">
          {evaluation.categories.map((category, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{category.name}</span>
                <span className="font-medium">{category.score}/100</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${category.score}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{category.feedback}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Key Strengths</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {evaluation.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Areas for Improvement</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {evaluation.improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </div>

        {evaluation.flags.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-red-600">Flags</h4>
            <ul className="list-disc list-inside text-sm text-red-600">
              {evaluation.flags.map((flag, index) => (
                <li key={index}>{flag}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t pt-4 mt-4">
          <h4 className="font-medium text-gray-900 mb-2">AI Notes</h4>
          <p className="text-sm text-gray-700">{evaluation.aiNotes}</p>
          {evaluation.managerNotes && (
            <>
              <h4 className="font-medium text-gray-900 mb-2 mt-4">Manager Notes</h4>
              <p className="text-sm text-gray-700">{evaluation.managerNotes}</p>
            </>
          )}
        </div>
      </div>
    );
  };

  const mockCandidates: Candidate[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      resumeUrl: '/resumes/john-doe.pdf',
      appliedFor: 'Software Engineer',
      currentStatus: 'APPLIED',
      experience: [
        {
          company: 'Tech Corp',
          title: 'Senior Developer',
          startDate: '2019-01',
          endDate: '2024-02',
          description: '5 years of full-stack development experience'
        }
      ],
      skills: ['React', 'TypeScript', 'Node.js'],
      education: [
        {
          institution: 'University of California',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          graduationYear: 2019
        }
      ],
      interviews: [
        {
          id: 'int1',
          type: 'technical',
          scheduledAt: new Date('2024-03-05'),
          interviewerId: 'interviewer1',
          status: 'completed',
          feedback: {
            rating: 8.5,
            strengths: ['Technical knowledge', 'Problem-solving'],
            weaknesses: ['Could improve communication'],
            notes: 'Strong candidate overall'
          },
          questions: [
            {
              id: 'q1',
              question: 'Describe your experience with React',
              answer: 'I have 3 years of experience building React applications...',
              rating: 9
            }
          ]
        }
      ],
      aiScore: 85,
      tags: ['frontend', 'senior'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [
        {
          id: 'note1',
          content: 'Strong technical background',
          createdAt: new Date().toISOString(),
          createdBy: 'recruiter1'
        }
      ]
    }
  ];

  const renderReferenceSection = (reference: any) => (
    <div key={reference.id} className="mb-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium text-gray-900">{reference.name}</div>
          <div className="text-gray-500">{reference.position} at {reference.company}</div>
          <div className="text-gray-500">{reference.phone} | {reference.email}</div>
        </div>
      </div>
      {reference.feedback && (
        <div className="mt-2">
          <div className="text-sm text-gray-600">{reference.feedback}</div>
        </div>
      )}
    </div>
  );

  const renderInterviewSection = (interview: any) => (
    <div key={interview.id} className="mb-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium text-gray-900">
            {interview.type.charAt(0).toUpperCase() + interview.type.slice(1)} Interview
          </div>
          <div className="text-gray-500">
            {new Date(interview.scheduledAt).toLocaleDateString()}
          </div>
          <div className="text-gray-500">
            Status: {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
          </div>
        </div>
      </div>
      {interview.feedback && (
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-900">Feedback</div>
          <div className="text-sm text-gray-600">Rating: {interview.feedback.rating}/10</div>
          <div className="text-sm text-gray-600">Notes: {interview.feedback.notes}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Candidate Rankings</h1>
        <div className="flex space-x-4">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as CandidateStatus | 'ALL')}
            className="rounded-md border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="SCREENING">Screening</option>
            <option value="INTERVIEWED">Interviewed</option>
            <option value="OFFERED">Offered</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search candidates..."
            className="rounded-md border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Candidates Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50">
            <div className="grid grid-cols-6 divide-x divide-gray-200">
              <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </div>
              <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </div>
              <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </div>
              <div
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('aiScore')}
              >
                <div className="flex items-center">
                  <span>AI Score</span>
                  {sortField === 'aiScore' && (
                    sortDirection === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </div>
              </div>
              <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied
              </div>
              <div className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </div>
            </div>
          </div>
          <div className="bg-white divide-y divide-gray-200">
            {filteredCandidates.map(candidate => (
              <div key={candidate.id} className="grid grid-cols-6 divide-x divide-gray-200">
                <div className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidate.appliedFor}</div>
                </div>
                <div className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${candidate.currentStatus === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                    candidate.currentStatus === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    candidate.currentStatus === 'OFFERED' ? 'bg-purple-100 text-purple-800' :
                    candidate.currentStatus === 'INTERVIEWED' ? 'bg-blue-100 text-blue-800' :
                    candidate.currentStatus === 'SCREENING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'}`}>
                    {candidate.currentStatus.charAt(0) + candidate.currentStatus.slice(1).toLowerCase()}
                  </span>
                </div>
                <div className="px-6 py-4 whitespace-nowrap">
                  {candidate.aiScore ? (
                    <div className="flex items-center">
                      <Star className={`h-4 w-4 ${
                        candidate.aiScore >= 80 ? 'text-yellow-400' :
                        candidate.aiScore >= 60 ? 'text-blue-400' :
                        'text-gray-400'
                      }`} />
                      <span className="ml-2 text-sm font-medium text-gray-900">{candidate.aiScore}</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Not evaluated</span>
                  )}
                </div>
                <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDistanceToNow(new Date(candidate.createdAt), { addSuffix: true })}
                </div>
                <div className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onViewResume(candidate.resumeUrl)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onViewTranscript(candidate.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setSelectedCandidate(candidate)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Details Panel */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-3/4 shadow-lg rounded-lg bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                <p className="text-sm text-gray-500">{selectedCandidate.email}</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              {/* Left Column: Basic Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  <dl className="mt-2 space-y-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Applied Position</dt>
                      <dd className="text-sm text-gray-900">{selectedCandidate.appliedFor}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="text-sm text-gray-900">{selectedCandidate.location}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Applied</dt>
                      <dd className="text-sm text-gray-900">
                        {formatDistanceToNow(new Date(selectedCandidate.createdAt), { addSuffix: true })}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900">Tags</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCandidate.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCandidate.references && selectedCandidate.references.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">References</h3>
                    <ul className="mt-2 space-y-3">
                      {selectedCandidate.references.map((ref, index) => (
                        <li key={index} className="text-sm">
                          <div className="font-medium text-gray-900">{ref.name}</div>
                          <div className="text-gray-500">{ref.relationship}</div>
                          <div className="text-gray-500">{ref.phone} | {ref.email}</div>
                          {ref.notes && <div className="text-gray-700 mt-1">{ref.notes}</div>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Middle Column: Interview Evaluation */}
              <div className="col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Interview Evaluation</h3>
                {selectedCandidate.interviews.length > 0 ? (
                  <div className="space-y-6">
                    {selectedCandidate.interviews.map((interview, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        {renderInterviewSection(interview)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No interviews conducted yet.</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => onViewResume(selectedCandidate.resumeUrl)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Resume
              </button>
              <button
                onClick={() => onViewTranscript(selectedCandidate.id)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                View Transcripts
              </button>
              <button
                onClick={() => {
                  // Handle status update
                  const newStatus: CandidateStatus = 
                    selectedCandidate.currentStatus === 'APPLIED' ? 'SCREENING' :
                    selectedCandidate.currentStatus === 'SCREENING' ? 'INTERVIEWED' :
                    selectedCandidate.currentStatus === 'INTERVIEWED' ? 'OFFERED' :
                    selectedCandidate.currentStatus === 'OFFERED' ? 'ACCEPTED' :
                    'REJECTED';
                  
                  onUpdateCandidate(selectedCandidate.id, { currentStatus: newStatus });
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Move to Next Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateRanking; 