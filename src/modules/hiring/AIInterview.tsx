import React, { useState, useEffect, useRef } from 'react';
import { Send, Video, VideoOff, Mic, MicOff, Play, Pause } from 'lucide-react';
import { InterviewSession, InterviewScenario } from '@/types/hiring';

interface AIInterviewProps {
  session: InterviewSession;
  scenario?: InterviewScenario;
  onComplete: (session: InterviewSession) => void;
  onSaveTranscript: (transcript: InterviewSession['transcript']) => void;
}

const AIInterview: React.FC<AIInterviewProps> = ({
  session,
  scenario,
  onComplete,
  onSaveTranscript
}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(session.type === 'VIDEO');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [transcript, setTranscript] = useState<InterviewSession['transcript']>(session.transcript || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Simulate AI typing effect
  useEffect(() => {
    if (scenario && currentQuestionIndex < scenario.questions.length) {
      setIsTyping(true);
      const question = scenario.questions[currentQuestionIndex].text;
      const timer = setTimeout(() => {
        setTranscript(prev => [
          ...prev,
          {
            timestamp: new Date().toISOString(),
            speaker: 'AI',
            message: question
          }
        ]);
        setIsTyping(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, scenario]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newTranscript = [
      ...transcript,
      {
        timestamp: new Date().toISOString(),
        speaker: 'CANDIDATE' as const,
        message: currentMessage.trim()
      }
    ];

    setTranscript(newTranscript);
    onSaveTranscript(newTranscript);
    setCurrentMessage('');

    // Move to next question after a brief delay
    if (scenario && currentQuestionIndex < scenario.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 1500);
    } else if (currentQuestionIndex === scenario.questions.length - 1) {
      // Interview complete
      onComplete({
        ...session,
        transcript: newTranscript,
        endTime: new Date().toISOString()
      });
    }
  };

  const toggleVideo = () => {
    if (videoRef.current && isVideoEnabled) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      videoRef.current.srcObject = null;
    } else if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
          videoRef.current!.srcObject = stream;
        })
        .catch(err => console.error('Error accessing camera:', err));
    }
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleAudio = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getAudioTracks().forEach(track => {
          track.enabled = !isAudioEnabled;
        });
      }
    }
    setIsAudioEnabled(!isAudioEnabled);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement actual recording logic here
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Video Section */}
      {session.type === 'VIDEO' && (
        <div className="w-1/2 bg-gray-900 p-4 relative">
          <video
            ref={videoRef}
            autoPlay
            muted={!isAudioEnabled}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
              } text-white`}
            >
              {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${
                isAudioEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'
              } text-white`}
            >
              {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full ${
                isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isRecording ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
          </div>
        </div>
      )}

      {/* Chat Section */}
      <div className={`${session.type === 'VIDEO' ? 'w-1/2' : 'w-full'} flex flex-col bg-white`}>
        {/* Interview Info */}
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {scenario ? scenario.title : 'AI Interview'}
          </h2>
          {scenario && (
            <p className="text-sm text-gray-500 mt-1">
              {scenario.description}
            </p>
          )}
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {transcript.map((entry, index) => (
            <div
              key={index}
              className={`flex ${entry.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  entry.speaker === 'AI'
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <p className="text-sm">{entry.message}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex space-x-4">
            <input
              type="text"
              value={currentMessage}
              onChange={e => setCurrentMessage(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your response..."
              className="flex-1 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isTyping}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInterview; 