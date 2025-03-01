import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, Circle, Play, Pause, Tag, Clock, AlertTriangle, X, Users } from 'lucide-react';

interface VideoChatProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  jobTitle: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ isOpen, onClose, candidateName, jobTitle }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPermissionGranted, setRecordingPermissionGranted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [showRecordingPrompt, setShowRecordingPrompt] = useState(false);
  const [recordingName, setRecordingName] = useState(`${candidateName} - ${jobTitle}`);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [recordedVideos, setRecordedVideos] = useState<Array<{
    id: string;
    name: string;
    duration: number;
    date: string;
    tags: string[];
  }>>([]);
  const [participantStatus, setParticipantStatus] = useState({
    interviewer: 'online',
    candidate: 'connecting'
  });
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Initialize camera when the modal opens
      initializeCamera();
    } else {
      // Clean up when modal closes
      cleanupVideoChat();
    }

    return () => {
      cleanupVideoChat();
    };
  }, [isOpen]);

  useEffect(() => {
    // Timer for recording
    if (isRecording) {
      timerInterval.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isRecording]);

  // Simulate candidate joining after a delay
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setParticipantStatus(prev => ({
          ...prev,
          candidate: 'online'
        }));
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Simulate remote video with a slight delay
      setTimeout(() => {
        if (remoteVideoRef.current) {
          // In a real implementation, this would come from the WebRTC connection
          // For demo purposes, we're using the same stream
          remoteVideoRef.current.srcObject = stream;
        }
      }, 3000);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setVideoEnabled(false);
      setAudioEnabled(false);
    }
  };

  const cleanupVideoChat = () => {
    // Stop all tracks on the media stream
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      const stream = remoteVideoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    // Reset states
    setIsRecording(false);
    setElapsedTime(0);
    setVideoEnabled(true);
    setAudioEnabled(true);
    setShowRecordingPrompt(false);
    setRecordingPermissionGranted(false);
  };

  const toggleVideo = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const videoTracks = stream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  const toggleAudio = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject as MediaStream;
      const audioTracks = stream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const startRecording = () => {
    setShowRecordingPrompt(true);
  };

  const confirmRecording = () => {
    setRecordingPermissionGranted(true);
    setShowRecordingPrompt(false);
    setIsRecording(true);
    setElapsedTime(0);
  };

  const cancelRecording = () => {
    setShowRecordingPrompt(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Add the recording to the list (in a real app, this would save the actual recording)
    const newRecording = {
      id: Date.now().toString(),
      name: recordingName,
      duration: elapsedTime,
      date: new Date().toLocaleDateString(),
      tags: [...tags]
    };
    
    setRecordedVideos(prev => [newRecording, ...prev]);
    
    // Reset states
    setElapsedTime(0);
    setTags([]);
    setRecordingName(`${candidateName} - ${jobTitle}`);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
      setShowTagInput(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900">Interview with {candidateName}</h2>
            <div className="ml-4 flex items-center space-x-2">
              <span className="text-sm text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {formatTime(elapsedTime)}
              </span>
              {isRecording && (
                <span className="flex items-center text-red-600 bg-red-100 px-2 py-0.5 rounded-full text-xs font-medium animate-pulse">
                  <Circle className="h-2 w-2 mr-1 fill-current" /> Recording
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close video chat"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 bg-gray-900 relative overflow-hidden">
          {/* Remote Video (Candidate) */}
          <video
            ref={remoteVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted={false}
          />
          
          {/* Local Video (Interviewer) */}
          <div className="absolute bottom-4 right-4 w-1/4 max-w-[200px] rounded-lg overflow-hidden shadow-lg border-2 border-gray-700">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </div>

          {/* Participant Status Indicators */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            <div className="bg-gray-800 bg-opacity-70 rounded-lg px-3 py-1.5 text-sm font-medium text-white flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full ${participantStatus.interviewer === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              <span>You (Interviewer)</span>
            </div>
            <div className="bg-gray-800 bg-opacity-70 rounded-lg px-3 py-1.5 text-sm font-medium text-white flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full ${
                participantStatus.candidate === 'online' ? 'bg-green-500' : 
                participantStatus.candidate === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
              <span>{candidateName} {participantStatus.candidate === 'connecting' ? '(Connecting...)' : ''}</span>
            </div>
          </div>

          {/* Tags Display (when recording) */}
          {isRecording && tags.length > 0 && (
            <div className="absolute top-4 right-4 flex flex-wrap max-w-md justify-end gap-2">
              {tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center"
                >
                  {tag}
                  <button 
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-700 hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Control Bar */}
        <div className="bg-gray-100 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${videoEnabled ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
              aria-label={videoEnabled ? 'Turn off camera' : 'Turn on camera'}
            >
              {videoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${audioEnabled ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-100 text-red-600 hover:bg-red-200'}`}
              aria-label={audioEnabled ? 'Mute microphone' : 'Unmute microphone'}
            >
              {audioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {isRecording ? (
              <>
                {/* Recording options */}
                <button
                  onClick={() => setShowTagInput(true)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Add Tag
                </button>
                <button
                  onClick={stopRecording}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  <Circle className="h-4 w-4 mr-1 fill-current" />
                  Stop Recording
                </button>
              </>
            ) : (
              <button
                onClick={startRecording}
                className="flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                disabled={isRecording}
              >
                <Circle className="h-4 w-4 mr-1 fill-current" />
                Record Interview
              </button>
            )}
            <button
              onClick={onClose}
              className="flex items-center px-3 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              End Call
            </button>
          </div>
        </div>

        {/* Tag Input Modal */}
        {showTagInput && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add an Interview Tag</h3>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tag (e.g., 'Technical', 'Cultural Fit')"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowTagInput(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Tag
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recording Permission Modal */}
        {showRecordingPrompt && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 text-yellow-500">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Recording Permission</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    This interview will be recorded for review purposes. Please confirm that you have informed {candidateName} and obtained their consent.
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recording Name
                </label>
                <input
                  type="text"
                  value={recordingName}
                  onChange={(e) => setRecordingName(e.target.value)}
                  placeholder="Enter recording name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  onClick={cancelRecording}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRecording}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Start Recording
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recordings Library (shows automatically if there are any recorded videos) */}
        {recordedVideos.length > 0 && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-900">Recent Recordings</h3>
              <button className="text-blue-600 text-sm hover:text-blue-800">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recordedVideos.slice(0, 3).map(video => (
                <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 aspect-video flex items-center justify-center">
                    <Play className="h-12 w-12 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-gray-900 truncate">{video.name}</h4>
                    <div className="flex items-center justify-between mt-1 text-sm text-gray-600">
                      <span>{video.date}</span>
                      <span>{formatTime(video.duration)}</span>
                    </div>
                    {video.tags.length > 0 && (
                      <div className="flex flex-wrap mt-2 gap-1">
                        {video.tags.map(tag => (
                          <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoChat; 