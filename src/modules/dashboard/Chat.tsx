import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Megaphone, DollarSign, Users, Cog, Send, Bot, Video, Upload, Image, Calendar, Globe } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import VideoChat from './hiring/VideoChat';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  channel?: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}

interface Agent {
  id: string;
  title: string;
  iconComponent: React.ReactElement;
  color: string;
  description: string;
}

const agents: Agent[] = [
  {
    id: 'marketing',
    title: 'Marketing Agent',
    iconComponent: <Megaphone className="h-8 w-8" />,
    color: 'bg-purple-100 text-purple-600',
    description: 'Expert in digital marketing, SEO, and content strategy'
  },
  {
    id: 'sales',
    title: 'Sales Agent',
    iconComponent: <DollarSign className="h-8 w-8" />,
    color: 'bg-blue-100 text-blue-600',
    description: 'Specializes in lead conversion and sales optimization'
  },
  {
    id: 'hiring',
    title: 'Hiring Agent',
    iconComponent: <Users className="h-8 w-8" />,
    color: 'bg-green-100 text-green-600',
    description: 'Assists with recruitment and HR processes'
  },
  {
    id: 'operations',
    title: 'Operations Agent',
    iconComponent: <Cog className="h-8 w-8" />,
    color: 'bg-orange-100 text-orange-600',
    description: 'Helps optimize business operations and workflows'
  }
];

export default function Chat() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    candidateName: 'Candidate',
    jobTitle: 'Position'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [chatHistory, setChatHistory] = useState<{ id: string; title: string; timestamp: string; agent: Agent }[]>([
    {
      id: '1',
      title: 'Discussion about Q3 marketing strategy',
      timestamp: '30 minutes ago',
      agent: agents[0] // Marketing Agent
    },
    {
      id: '2',
      title: 'Sales pipeline review and lead qualification',
      timestamp: 'about 1 hour ago',
      agent: agents[1] // Sales Agent
    }
  ]);
  const { agentType, context, features } = location.state || {};
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [postContent, setPostContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  
  // Handle social media post creation if coming from marketing page
  const isSocialMediaPost = context === 'social_media_post';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if this is a hiring-related chat from URL params
  useEffect(() => {
    const context = searchParams.get('context');
    if (context === 'hiring') {
      const hiringAgent = agents.find(agent => agent.id === 'hiring');
      if (hiringAgent) {
        setSelectedAgent(hiringAgent);
        
        // Set initial message for hiring context
        setMessages([{
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Hello! I\'m the Hiring Assistant. How can I help you with your recruitment needs today? You can start a video interview at any time by clicking the video button in the top right.',
          timestamp: new Date()
        }]);
      }
    }
  }, [searchParams]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedAgent) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage('');

    // Save messages to localStorage with expiration
    if (messages.length === 0) {
      const chatId = Date.now().toString();
      const newChat = {
        id: chatId,
        title: inputMessage.slice(0, 30) + '...',
        timestamp: 'Just now',
        agent: selectedAgent,
        expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days from now
      };
      
      const updatedHistory = [newChat, ...chatHistory];
      setChatHistory(updatedHistory);
      
      // Save chat history with expiration
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
    }

    const chatKey = `chat_${messages.length === 0 ? Date.now().toString() : chatHistory[0].id}`;
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));

    // Simulate agent response
    try {
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response from the ${selectedAgent.title}. In the actual implementation, this would be replaced with the AI agent's response.`,
        timestamp: new Date()
      };
      
      setTimeout(() => {
        const updatedMessagesWithResponse = [...updatedMessages, agentResponse];
        setMessages(updatedMessagesWithResponse);
        localStorage.setItem(chatKey, JSON.stringify(updatedMessagesWithResponse));
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    }
  };

  const startNewChat = () => {
    setSelectedAgent(null);
    setMessages([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredHistory = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const loadChat = (chat: typeof chatHistory[0]) => {
    setSelectedAgent(chat.agent);
    
    // Load chat messages from localStorage
    const chatKey = `chat_${chat.id}`;
    const savedMessages = localStorage.getItem(chatKey);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  const handleStartVideoInterview = () => {
    if (selectedAgent?.id === 'hiring') {
      // Extract candidate name from conversation if possible
      const candidateNameMatch = messages.find(msg => 
        msg.content.toLowerCase().includes('interview') && 
        msg.content.toLowerCase().includes('with')
      );
      
      // Set default or extracted candidate name
      let candidateName = 'Candidate';
      let jobTitle = 'Position';
      
      if (candidateNameMatch) {
        const content = candidateNameMatch.content;
        // Simple extraction logic - in a real app this would be more sophisticated
        const nameMatch = content.match(/interview with\s+([A-Za-z\s]+)/i);
        const positionMatch = content.match(/for\s+([A-Za-z\s]+position)/i);
        
        if (nameMatch && nameMatch[1]) {
          candidateName = nameMatch[1].trim();
        }
        
        if (positionMatch && positionMatch[1]) {
          jobTitle = positionMatch[1].trim();
        }
      }
      
      setInterviewDetails({
        candidateName,
        jobTitle
      });
      
      setIsVideoChatOpen(true);
    }
  };

  // Add cleanup of expired chats
  useEffect(() => {
    // Clean up expired chats
    const cleanupExpiredChats = () => {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        const now = Date.now();
        
        const validChats = history.filter((chat: any) => {
          if (chat.expiresAt && chat.expiresAt < now) {
            // Remove associated messages
            localStorage.removeItem(`chat_${chat.id}`);
            return false;
          }
          return true;
        });
        
        localStorage.setItem('chatHistory', JSON.stringify(validChats));
        setChatHistory(validChats);
      }
    };

    cleanupExpiredChats();
    
    // Load saved chat history on component mount
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setMediaFiles(prev => [...prev, ...files]);
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const renderSocialMediaPostInterface = () => {
    if (!isSocialMediaPost) return null;

    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Create Social Media Post</h2>
        
        {/* Platform Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Platforms</label>
          <div className="flex gap-3">
            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map(platform => (
              <button
                key={platform}
                onClick={() => handlePlatformToggle(platform)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedPlatforms.includes(platform)
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Media Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Media</label>
          <div className="flex gap-4">
            <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <Upload className="h-4 w-4 mr-2" />
              <span className="text-sm">Upload Files</span>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            {mediaFiles.length > 0 && (
              <div className="flex gap-2">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="relative">
                    {file.type.startsWith('image/') ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="h-16 w-16 object-cover rounded"
                      />
                    ) : (
                      <video
                        src={URL.createObjectURL(file)}
                        className="h-16 w-16 object-cover rounded"
                      />
                    )}
                    <button
                      onClick={() => setMediaFiles(prev => prev.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Post Scheduling */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Post</label>
          <input
            type="datetime-local"
            onChange={(e) => setScheduledDate(new Date(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex relative">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* New Chat Button */}
        <div className="p-4">
          <button 
            onClick={startNewChat}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search conversations..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4">
          {filteredHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => loadChat(chat)}
              className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer mb-2 text-left"
            >
              <div className={`p-2 rounded-lg ${chat.agent.color} mr-3`}>
                {chat.agent.iconComponent}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{chat.title}</p>
                <p className="text-sm text-gray-500">{chat.timestamp}</p>
            </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {selectedAgent ? (
          <>
            {/* Chat Header - Simplified */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${selectedAgent.color}`}>
                    {selectedAgent.iconComponent}
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">{selectedAgent.title}</h2>
                    <p className="text-sm text-gray-500">{selectedAgent.description}</p>
                  </div>
                </div>
                
                {selectedAgent.id === 'hiring' && (
                  <button
                    onClick={() => setIsVideoChatOpen(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Interview
                  </button>
                )}
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'assistant' ? 'justify-start' : 'justify-end'
                  } mb-4`}
                >
                  {message.role === 'assistant' && (
                    <div className={`p-2 rounded-lg ${selectedAgent?.color} mr-2`}>
                      {selectedAgent?.iconComponent}
                    </div>
                  )}
                  <div
                    className={`max-w-3xl rounded-lg px-4 py-2 ${
                      message.role === 'assistant'
                        ? 'bg-white border border-gray-200'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Updated for bottom positioning after chat starts */}
            <div className={`bg-white border-t border-gray-200 ${messages.length === 0 ? 'h-1/3 items-center' : 'py-4'} flex justify-center`}>
              <form onSubmit={handleSendMessage} className="w-1/2 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything"
                  className="w-full border border-gray-300 rounded-full px-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
                <button
                  type="button"
                  className="absolute left-3 bottom-2.5 text-gray-500 hover:text-gray-700"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => {
                      // Handle file upload logic here
                      console.log('File selected:', e.target.files?.[0]);
                    }}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-5 w-5" />
                  </label>
                </button>
                <button
                  type="submit"
                  className="absolute right-3 bottom-2.5 text-blue-600 hover:text-blue-700"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          // Agent Selection
          <div className="max-w-3xl mx-auto w-full p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Choose an Agent to Start Chat</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className={`p-4 rounded-full mb-4 ${agent.color}`}>
                    {agent.iconComponent}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{agent.title}</h3>
                  <p className="text-gray-600 text-sm">{agent.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Chat Component */}
      <VideoChat 
        isOpen={isVideoChatOpen}
        onClose={() => setIsVideoChatOpen(false)}
        candidateName={interviewDetails.candidateName}
        jobTitle={interviewDetails.jobTitle}
      />

      {/* Render social media post interface if coming from marketing page */}
      {renderSocialMediaPostInterface()}
    </div>
  );
} 