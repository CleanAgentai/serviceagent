import React, { useState, useEffect } from 'react';
import { Video, Search, Filter, Download, Play, Pause, Clock, User } from 'lucide-react';

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  duration: string;
  status: 'completed' | 'in-progress' | 'scheduled';
  videoUrl?: string;
  transcript?: string;
}

export default function ViewInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        // In a real implementation, this would be an API call to Willo
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockInterviews: Interview[] = [
          {
            id: '1',
            candidateName: 'John Smith',
            position: 'Software Engineer',
            date: '2024-03-15T14:30:00Z',
            duration: '45:20',
            status: 'completed',
            videoUrl: 'https://example.com/interview-1.mp4',
            transcript: `
Interviewer: Can you tell us about your experience with React?
Candidate: I've been working with React for over 3 years now. I've built several large-scale applications using React, Redux, and TypeScript.
Interviewer: What's your approach to state management?
Candidate: I prefer using a combination of React Context for global state and local state with hooks for component-level state...
            `
          },
          // Add more mock interviews...
        ];

        setInterviews(mockInterviews);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || interview.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="h-full flex flex-col space-y-4 max-h-full overflow-hidden">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">View Interviews</h1>
        <p className="text-sm text-gray-600">Review interview recordings and transcripts</p>
      </div>

      <div className="flex-1 flex space-x-4 min-h-0">
        {/* Interviews List */}
        <div className="w-1/3 bg-white rounded-xl shadow-sm p-6 flex flex-col">
          {/* Search and Filter */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search interviews..."
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Interviews List */}
          <div className="flex-1 overflow-auto">
            <div className="space-y-3">
              {filteredInterviews.map(interview => (
                <button
                  key={interview.id}
                  onClick={() => setSelectedInterview(interview)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedInterview?.id === interview.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'hover:bg-gray-50 border-gray-200'
                  } border`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                      <p className="text-sm text-gray-500">{interview.position}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                      interview.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {interview.status.replace('-', ' ')}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {interview.duration}
                    </span>
                    <span>{formatDate(interview.date)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interview Viewer */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6 flex flex-col">
          {selectedInterview ? (
            <>
              {/* Video Player */}
              <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative">
                {selectedInterview.videoUrl && (
                  <>
                    <video
                      src={selectedInterview.videoUrl}
                      className="w-full h-full rounded-lg"
                      onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget.currentTime)}
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center space-x-4">
                      <button
                        onClick={handlePlayPause}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6 text-gray-900" />
                        ) : (
                          <Play className="h-6 w-6 text-gray-900" />
                        )}
                      </button>
                      <div className="flex-1 h-1 bg-gray-700 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(currentTime / 100) * 100}%` }}
                        />
                      </div>
                      <span className="text-white font-medium">
                        {selectedInterview.duration}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Interview Details */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedInterview.candidateName}
                    </h2>
                    <p className="text-gray-500">{selectedInterview.position}</p>
                  </div>
                  <button className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Download className="h-5 w-5 mr-2" />
                    Download Recording
                  </button>
                </div>
              </div>

              {/* Transcript */}
              <div className="flex-1 overflow-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transcript</h3>
                <div className="space-y-4">
                  {selectedInterview.transcript?.split('\n').map((line, index) => {
                    if (!line.trim()) return null;
                    const [speaker, ...text] = line.split(':');
                    if (!text.length) return null;
                    
                    return (
                      <div key={index} className="flex space-x-4">
                        <div className="w-24 flex-shrink-0">
                          <span className="font-medium text-gray-900">{speaker.trim()}</span>
                        </div>
                        <p className="text-gray-600">{text.join(':').trim()}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>Select an interview to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 