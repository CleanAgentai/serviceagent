import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MessageSquare, Search, Plus, DollarSign, Megaphone, 
  Briefcase, Settings, Bot, ChevronRight, ChevronLeft,
  Image, Paperclip, X, Menu
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import { cn } from '../lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  agentType?: 'sales' | 'marketing' | 'hiring' | 'operations';
  fileAttachment?: {
    name: string;
    type: string;
    url: string;
  };
}

interface ChatHistory {
  id: string;
  summary: string;
  lastMessage: Date;
  agentType: 'sales' | 'marketing' | 'hiring' | 'operations';
  messages: ChatMessage[];
}

export default function Chat() {
  const location = useLocation();
  const { state } = location;

  const [message, setMessage] = useState('');
  const [showHistory, setShowHistory] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<'sales' | 'marketing' | 'hiring' | 'operations' | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      summary: 'Discussion about Q3 marketing strategy and social media campaigns',
      lastMessage: new Date(Date.now() - 1000 * 60 * 30),
      agentType: 'marketing',
      messages: []
    },
    {
      id: '2',
      summary: 'Sales pipeline review and lead qualification process',
      lastMessage: new Date(Date.now() - 1000 * 60 * 60),
      agentType: 'sales',
      messages: []
    }
  ]);

  const [currentChat, setCurrentChat] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [filteredChatHistory, setFilteredChatHistory] = useState<ChatHistory[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const agents = [
    { type: 'marketing', icon: Megaphone, label: 'Marketing Agent', color: 'purple' },
    { type: 'sales', icon: DollarSign, label: 'Sales Agent', color: 'blue' },
    { type: 'hiring', icon: Briefcase, label: 'Hiring Agent', color: 'emerald' },
    { type: 'operations', icon: Settings, label: 'Operations Agent', color: 'orange' }
  ] as const;

  // Handle automatic agent selection from navigation state
  useEffect(() => {
    if (state?.agentType && state?.autoStart) {
      handleAgentSelect(state.agentType);
    }
  }, [state]);

  const getWelcomeMessage = (agentType: 'sales' | 'marketing' | 'hiring' | 'operations') => {
    const messages = {
      sales: "Hello! I'm your Sales Agent. I can help you with lead generation, sales pipeline management, and customer relationships. How can I assist you today?",
      marketing: "Hi there! I'm your Marketing Agent. I can help with campaign planning, content creation, and marketing analytics. What would you like to work on?",
      hiring: "Welcome! I'm your Hiring Agent. I can help with job postings, candidate screening, and interview scheduling. How can I help you today?",
      operations: "Hello! I'm your Operations Agent. I can help with workflow automation, task management, and process optimization. What can I do for you?"
    };
    return messages[agentType];
  };

  const handleAgentSelect = (agentType: 'sales' | 'marketing' | 'hiring' | 'operations') => {
    setSelectedAgent(agentType);
    
    // Create welcome message
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      content: getWelcomeMessage(agentType),
      sender: 'agent',
      timestamp: new Date(),
      agentType: agentType
    };
    
    // Set as current chat
    setCurrentChat([welcomeMessage]);

    // Create a new chat history entry
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      agentType: agentType,
      messages: [welcomeMessage],
      lastMessage: new Date(),
      summary: welcomeMessage.content.slice(0, 50) + '...'
    };

    // Add to chat history only if it's a new conversation
    const existingChat = chatHistory.find(chat => 
      chat.agentType === agentType && 
      chat.messages.length === 1 && 
      chat.messages[0].content === welcomeMessage.content
    );

    if (!existingChat) {
      setChatHistory(prev => [newChat, ...prev]);
    }
  };

  const simulateAgentResponse = async (userMessage: ChatMessage) => {
    if (!selectedAgent) return;

    setIsTyping(true);
    
    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const responses = {
      sales: "I understand you're interested in sales. Could you provide more details about your specific needs?",
      marketing: "Thanks for sharing. Let me help you with your marketing needs. Could you elaborate on your goals?",
      hiring: "I'll help you with your hiring process. What specific aspects would you like to focus on?",
      operations: "I can assist with optimizing your operations. What areas would you like to improve?"
    };

    const agentResponse: ChatMessage = {
      id: Date.now().toString(),
      content: responses[selectedAgent],
      sender: 'agent',
      timestamp: new Date(),
      agentType: selectedAgent
    };

    // Add agent response to current chat
    const updatedChat = [...currentChat, agentResponse];
    setCurrentChat(updatedChat);

    // Update chat history with agent response
    const existingChatIndex = chatHistory.findIndex(chat => 
      chat.agentType === selectedAgent && 
      chat.messages.some(msg => msg.id === currentChat[0]?.id)
    );

    if (existingChatIndex !== -1) {
      const updatedHistory = [...chatHistory];
      updatedHistory[existingChatIndex] = {
        ...updatedHistory[existingChatIndex],
        messages: updatedChat,
        lastMessage: new Date()
      };
      setChatHistory(updatedHistory);
    }

    setIsTyping(false);
    scrollToBottom();
  };

  const handleSend = () => {
    if (!message.trim() || !selectedAgent) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
      agentType: selectedAgent
    };

    // Add the new message to current chat
    const updatedChat = [...currentChat, newMessage];
    setCurrentChat(updatedChat);
    setMessage('');

    // Create or update chat history entry
    const chatId = Date.now().toString();
    const existingChatIndex = chatHistory.findIndex(chat => 
      chat.agentType === selectedAgent && 
      chat.messages.some(msg => msg.id === currentChat[0]?.id)
    );

    if (existingChatIndex !== -1) {
      // Update existing chat
      const updatedHistory = [...chatHistory];
      updatedHistory[existingChatIndex] = {
        ...updatedHistory[existingChatIndex],
        messages: updatedChat,
        lastMessage: new Date(),
        summary: newMessage.content.slice(0, 50) + '...'
      };
      setChatHistory(updatedHistory);
    } else {
      // Create new chat entry
      const newChatEntry: ChatHistory = {
        id: chatId,
        agentType: selectedAgent,
        messages: updatedChat,
        lastMessage: new Date(),
        summary: newMessage.content.slice(0, 50) + '...'
      };
      setChatHistory(prev => [newChatEntry, ...prev]);
    }

    // Simulate agent response
    simulateAgentResponse(newMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setFilteredChatHistory([]);
      return;
    }

    setIsSearching(true);
    const filtered = chatHistory.filter(chat => 
      chat.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredChatHistory(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const allowedFileTypes = ".png,.jpg,.jpeg,.pdf,.csv";

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.split('/')[1];
      if (!allowedFileTypes.includes(fileType)) {
        alert('Please upload only PNG, JPG, PDF, or CSV files');
        return;
      }
      // TODO: Implement file upload logic
      const newMessage: ChatHistory = {
        id: Date.now().toString(),
        agentType: selectedAgent!,
        messages: [
          {
            id: Date.now().toString(),
            content: `Uploaded file: ${file.name}`,
            sender: 'user',
            timestamp: new Date(),
            agentType: selectedAgent!,
            fileAttachment: {
              name: file.name,
              type: file.type,
              url: URL.createObjectURL(file)
            }
          }
        ],
        lastMessage: new Date(),
        summary: `Uploaded file: ${file.name}`
      };
      setChatHistory(prev => [newMessage, ...prev]);
      simulateAgentResponse(newMessage.messages[0]);
    }
  };

  // Function to scroll to latest message
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Update the chat history click handler
  const handleChatHistoryClick = (chat: ChatHistory) => {
    setSelectedAgent(chat.agentType);
    setCurrentChat(chat.messages);
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar */}
      <div className={cn(
        "w-80 bg-white flex flex-col border-r border-gray-100 transition-transform duration-200 ease-in-out",
        showHistory ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Search and New Chat */}
        <div className="p-4 border-b border-gray-100">
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              onClick={() => {
                setSelectedAgent(null);
                setCurrentChat([]);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {(isSearching ? filteredChatHistory : chatHistory).map((chat) => (
            <button
              key={chat.id}
              onClick={() => handleChatHistoryClick(chat)}
              className={cn(
                "w-full p-4 text-left hover:bg-gray-50 border-b border-gray-100 transition-colors",
                chat.messages.some(msg => msg.id === currentChat[0]?.id) && "bg-blue-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  chat.agentType === 'sales' && "bg-blue-50 text-blue-600",
                  chat.agentType === 'marketing' && "bg-purple-50 text-purple-600",
                  chat.agentType === 'hiring' && "bg-emerald-50 text-emerald-600",
                  chat.agentType === 'operations' && "bg-orange-50 text-orange-600"
                )}>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{chat.summary}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {formatDistanceToNow(chat.lastMessage, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Toggle History Button */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="absolute left-4 top-4 z-10 p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
          aria-label={showHistory ? "Hide chat history" : "Show chat history"}
        >
          <Menu className="w-4 h-4" />
        </button>

        {currentChat.length === 0 ? (
          <div className="flex-1 flex flex-col items-start justify-start p-4 pt-24">
            <div className="max-w-2xl w-full mx-auto space-y-8">
              <h1 className="text-2xl font-bold text-center text-gray-900">Choose an Agent to Start Chat</h1>
              <div className="grid grid-cols-2 gap-4">
                {agents.map(({ type, icon: Icon, label, color }) => (
                  <button
                    key={type}
                    onClick={() => handleAgentSelect(type)}
                    className={cn(
                      "p-6 rounded-xl transition-all hover:shadow-md flex flex-col items-center",
                      "transform hover:scale-[1.02] active:scale-[0.98] duration-200",
                      type === selectedAgent && "ring-2 ring-offset-2",
                      color === 'blue' && "bg-blue-50 text-blue-600 ring-blue-600",
                      color === 'purple' && "bg-purple-50 text-purple-600 ring-purple-600",
                      color === 'emerald' && "bg-emerald-50 text-emerald-600 ring-emerald-600",
                      color === 'orange' && "bg-orange-50 text-orange-600 ring-orange-600"
                    )}
                  >
                    <Icon className="w-8 h-8 mb-3" />
                    <div className="text-base font-medium">{label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Welcome Message - Fixed at top */}
            {currentChat[0] && currentChat[0].sender === 'agent' && (
              <div className="bg-white border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-4 py-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {currentChat[0].content}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chat Messages Area - Scrollable */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto scroll-smooth"
              style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(156, 163, 175, 0.3) transparent',
                overscrollBehavior: 'contain',
                paddingBottom: '300px' // Increase padding significantly to account for higher input area
              }}
            >
              <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
                {currentChat.slice(1).map((msg, index) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex animate-fade-in transition-opacity duration-200",
                      msg.sender === 'user' ? "justify-end" : "justify-start",
                      index > 0 && currentChat[index].sender !== currentChat[index - 1].sender ? "mt-6" : "",
                      index > 0 && currentChat[index].sender === currentChat[index - 1].sender ? "mt-2" : ""
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-5 py-3.5 shadow-sm",
                        msg.sender === 'user' 
                          ? "bg-blue-600 text-white" 
                          : "bg-white text-gray-700",
                        msg.sender === 'user' ? "rounded-br-sm" : "rounded-bl-sm",
                        index > 0 && currentChat[index].sender === currentChat[index - 1].sender
                          ? msg.sender === 'user'
                            ? "rounded-tr-md"
                            : "rounded-tl-md"
                          : ""
                      )}
                    >
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                      {msg.fileAttachment && (
                        <div className={cn(
                          "mt-2 p-2.5 rounded-lg transition-colors",
                          msg.sender === 'user' 
                            ? "bg-blue-500 hover:bg-blue-400" 
                            : "bg-gray-50 hover:bg-gray-100"
                        )}>
                          <a 
                            href={msg.fileAttachment.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-sm flex items-center gap-2 hover:opacity-80 transition-opacity"
                          >
                            <Paperclip className="w-4 h-4" />
                            <span className="truncate">{msg.fileAttachment.name}</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-gray-500 animate-fade-in pl-4">
                    <Bot className="w-4 h-4" />
                    <span className="text-sm">Typing...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area - Positioned much higher */}
            <div className="absolute bottom-32 left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-lg mx-8">
              <div className="max-w-3xl mx-auto w-full px-4 py-4">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                    accept={allowedFileTypes}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 py-2.5 px-4 focus:ring-2 focus:ring-blue-500 border-gray-200"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!message.trim() || !selectedAgent}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 transition-colors disabled:opacity-50"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}