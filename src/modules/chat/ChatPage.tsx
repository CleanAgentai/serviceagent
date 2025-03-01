import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Settings, Bot, Send, Paperclip, Mic, Video, User, RefreshCw, MessageSquare, Pin, MoreVertical, ChevronDown, Sparkles, X, Edit } from 'lucide-react';
import { AIEditableContent } from '@/app/shared/components/ai';
import { Card } from '@/app/shared/components/Card';
import { tokens } from '@/app/shared/styles/tokens';
import { AIInsightsPanel } from '@/app/shared/components/ai';
import { AdvancedChatControls } from './AdvancedChatControls';

// Types
export type AgentType = 'sales' | 'hiring' | 'operations' | 'general';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  agentType?: AgentType;
  attachments?: {
    type: 'image' | 'file' | 'video' | 'audio';
    url: string;
    name: string;
    size?: number;
    previewUrl?: string;
  }[];
  isRead: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: {
    content: string;
    timestamp: Date;
    sender: 'user' | 'agent';
  };
  unreadCount: number;
  pinned?: boolean;
  agentType?: AgentType;
}

// Helper components
const ConversationList: React.FC<{
  conversations: Conversation[];
  activeConversationId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}> = ({ conversations, activeConversationId, onSelectConversation, onNewConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState(conversations);

  // Filter conversations based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredConversations(conversations);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = conversations.filter(
      (conv) => 
        conv.name.toLowerCase().includes(query) || 
        conv.lastMessage?.content.toLowerCase().includes(query)
    );
    
    setFilteredConversations(filtered);
  }, [searchQuery, conversations]);

  // Group conversations by pinned status
  const pinnedConversations = filteredConversations.filter(conv => conv.pinned);
  const regularConversations = filteredConversations.filter(conv => !conv.pinned);

  return (
    <div className="flex flex-col h-full border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={onNewConversation}
          aria-label="New conversation"
        >
          <Plus className="h-5 w-5 text-blue-600" />
        </button>
      </div>
      
      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {/* Pinned Conversations */}
        {pinnedConversations.length > 0 && (
          <div className="mb-2">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider px-2 mb-1">Pinned</h3>
            {pinnedConversations.map((conversation) => (
              <ConversationItem 
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversationId}
                onClick={() => onSelectConversation(conversation.id)}
              />
            ))}
          </div>
        )}
        
        {/* Regular Conversations */}
        <div>
          {regularConversations.length > 0 ? (
            regularConversations.map((conversation) => (
              <ConversationItem 
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversationId}
                onClick={() => onSelectConversation(conversation.id)}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-10 w-10 mx-auto mb-2 text-gray-300" />
              <p>No conversations found</p>
              {searchQuery && (
                <button 
                  className="mt-2 text-blue-600 hover:text-blue-800"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConversationItem: React.FC<{
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}> = ({ conversation, isActive, onClick }) => {
  // Format timestamp
  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const isThisYear = date.getFullYear() === now.getFullYear();
    if (isThisYear) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: '2-digit' });
  };

  // Get agent icon based on type
  const getAgentIcon = (type?: AgentType) => {
    switch (type) {
      case 'sales':
        return <div className="h-2 w-2 rounded-full bg-green-500 absolute bottom-0 right-0" />;
      case 'hiring':
        return <div className="h-2 w-2 rounded-full bg-purple-500 absolute bottom-0 right-0" />;
      case 'operations':
        return <div className="h-2 w-2 rounded-full bg-orange-500 absolute bottom-0 right-0" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-blue-500 absolute bottom-0 right-0" />;
    }
  };

  return (
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer ${
        isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {conversation.avatar ? (
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            {conversation.name.charAt(0).toUpperCase()}
          </div>
        )}
        {conversation.agentType && getAgentIcon(conversation.agentType)}
      </div>
      
      {/* Content */}
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 truncate">{conversation.name}</h3>
          {conversation.lastMessage && (
            <span className="text-xs text-gray-500">
              {formatTime(conversation.lastMessage.timestamp)}
            </span>
          )}
        </div>
        <div className="flex items-center">
          {conversation.lastMessage && (
            <p className="text-xs text-gray-500 truncate flex-1">
              {conversation.lastMessage.sender === 'user' ? 'You: ' : ''}
              {conversation.lastMessage.content}
            </p>
          )}
          {conversation.unreadCount > 0 && (
            <span className="ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500 text-white">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatPanel: React.FC<{
  messages: Message[];
  activeAgentType: AgentType;
}> = ({ messages, activeAgentType }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get agent icon based on type
  const getAgentIcon = (type: AgentType) => {
    switch (type) {
      case 'sales':
        return <div className="h-2 w-2 rounded-full bg-green-500 absolute bottom-0 right-0" />;
      case 'hiring':
        return <div className="h-2 w-2 rounded-full bg-purple-500 absolute bottom-0 right-0" />;
      case 'operations':
        return <div className="h-2 w-2 rounded-full bg-orange-500 absolute bottom-0 right-0" />;
      default:
        return <div className="h-2 w-2 rounded-full bg-blue-500 absolute bottom-0 right-0" />;
    }
  };

  // Get agent avatar based on type
  const getAgentAvatar = (type: AgentType) => {
    switch (type) {
      case 'sales':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <Bot className="h-4 w-4 text-green-600" />
          </div>
        );
      case 'hiring':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Bot className="h-4 w-4 text-purple-600" />
          </div>
        );
      case 'operations':
        return (
          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
            <Bot className="h-4 w-4 text-orange-600" />
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot className="h-4 w-4 text-blue-600" />
          </div>
        );
    }
  };

  // Get agent name based on type
  const getAgentName = (type: AgentType) => {
    switch (type) {
      case 'sales':
        return 'Sales Agent';
      case 'hiring':
        return 'Hiring Agent';
      case 'operations':
        return 'Operations Agent';
      default:
        return 'General Assistant';
    }
  };

  // Get agent color based on type (for UI elements)
  const getAgentColor = (type: AgentType) => {
    switch (type) {
      case 'sales':
        return 'bg-green-50 border-green-100';
      case 'hiring':
        return 'bg-purple-50 border-purple-100';
      case 'operations':
        return 'bg-orange-50 border-orange-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  // Get agent text color based on type
  const getAgentTextColor = (type: AgentType) => {
    switch (type) {
      case 'sales':
        return 'text-green-600';
      case 'hiring':
        return 'text-purple-600';
      case 'operations':
        return 'text-orange-600';
      default:
        return 'text-blue-600';
    }
  };

  // Get agent accent color based on type
  const getAgentAccentColor = (type: AgentType) => {
    switch (type) {
      case 'sales':
        return 'bg-green-600';
      case 'hiring':
        return 'bg-purple-600';
      case 'operations':
        return 'bg-orange-600';
      default:
        return 'bg-blue-600';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'agent' && (
              <div className="flex-shrink-0 mr-2">
                {getAgentAvatar(message.agentType || 'general')}
              </div>
            )}
            <div
              className={`max-w-lg rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : `${getAgentColor(message.agentType || 'general')} text-gray-800`
              } ${message.status === 'sending' ? 'opacity-70' : ''}`}
            >
              {message.sender === 'agent' && message.agentType && (
                <div className={`text-xs font-medium mb-1 ${getAgentTextColor(message.agentType)}`}>
                  {getAgentName(message.agentType)}
                </div>
              )}
              {message.content}
              <div className="mt-1 flex items-center justify-end space-x-1">
                <span className="text-xs opacity-70">
                  {formatMessageTime(message.timestamp)}
                </span>
                {message.sender === 'user' && (
                  <span className="text-xs">
                    {message.status === 'read' && '✓✓'}
                    {message.status === 'delivered' && '✓✓'}
                    {message.status === 'sent' && '✓'}
                    {message.status === 'sending' && '⋯'}
                    {message.status === 'failed' && '!'}
                  </span>
                )}
              </div>
            </div>
            {message.sender === 'user' && (
              <div className="flex-shrink-0 ml-2">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

// Main component
const ChatPage: React.FC = () => {
  // State for conversations
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Sales Team',
      unreadCount: 2,
      pinned: true,
      agentType: 'sales',
      lastMessage: {
        content: 'Let me analyze those sales figures for you',
        timestamp: new Date(Date.now() - 25 * 60000),
        sender: 'agent',
      },
    },
    {
      id: '2',
      name: 'Hiring Assistant',
      unreadCount: 0,
      agentType: 'hiring',
      lastMessage: {
        content: 'I\'ve found 5 potential candidates for the position',
        timestamp: new Date(Date.now() - 4 * 3600000),
        sender: 'agent',
      },
    },
    {
      id: '3',
      name: 'Operations Bot',
      unreadCount: 0,
      agentType: 'operations',
      lastMessage: {
        content: 'Schedule optimized based on your requirements',
        timestamp: new Date(Date.now() - 2 * 24 * 3600000),
        sender: 'agent',
      },
    },
    {
      id: '4',
      name: 'General Assistant',
      unreadCount: 0,
      lastMessage: {
        content: 'How else can I help you today?',
        timestamp: new Date(Date.now() - 7 * 24 * 3600000),
        sender: 'agent',
      },
    },
  ]);

  // State for active conversation
  const [activeConversationId, setActiveConversationId] = useState(conversations[0]?.id || '');
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const [activeAgentType, setActiveAgentType] = useState<AgentType>(activeConversation?.agentType || 'general');

  // State for messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! How can I help with your sales needs today?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 60 * 60000),
      status: 'read',
      agentType: 'sales',
      isRead: true,
    },
    {
      id: '2',
      content: 'I need help analyzing our Q4 sales performance. Can you help me understand why we saw a drop in the last month?',
      sender: 'user',
      timestamp: new Date(Date.now() - 55 * 60000),
      status: 'read',
      isRead: true,
    },
    {
      id: '3',
      content: 'I\'ll analyze your Q4 sales data. Based on initial review, the drop appears to coincide with the holiday season and reduced B2B purchasing. Would you like me to prepare a detailed report with recommendations?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 45 * 60000),
      status: 'read',
      agentType: 'sales',
      isRead: true,
    },
    {
      id: '4',
      content: 'Yes, that would be great. Can you also compare our performance with seasonal trends from previous years?',
      sender: 'user',
      timestamp: new Date(Date.now() - 30 * 60000),
      status: 'read',
      isRead: true,
    },
    {
      id: '5',
      content: 'Absolutely. I\'ll prepare a comprehensive report comparing this year\'s Q4 performance with previous years, accounting for seasonal trends. I\'ll also include actionable recommendations to improve performance in similar periods in the future. Would you like me to include any specific metrics or focus areas?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 25 * 60000),
      status: 'read',
      agentType: 'sales',
      isRead: true,
    },
  ]);

  // State for message input
  const [messageInput, setMessageInput] = useState('');
  
  // State for AI suggestion
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiSuggestionLoading, setAiSuggestionLoading] = useState(false);
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);

  // Update active agent type when conversation changes
  useEffect(() => {
    if (activeConversation?.agentType) {
      setActiveAgentType(activeConversation.agentType);
    }
  }, [activeConversationId, activeConversation]);

  // Generate AI suggestion when agent type changes or after user sends a message
  useEffect(() => {
    const generateSuggestion = async () => {
      // Only generate suggestions if we have previous messages
      if (messages.length === 0) return;
      
      setAiSuggestionLoading(true);
      
      try {
        // Simulate API call to generate suggestion
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Generate different suggestions based on agent type
        let suggestion = '';
        
        const lastMessage = messages[messages.length - 1];
        const isLastFromUser = lastMessage.sender === 'user';
        
        if (!isLastFromUser) {
          // Don't generate a suggestion if the agent just sent a message
          setAiSuggestion('');
          return;
        }
        
        switch (activeAgentType) {
          case 'sales':
            suggestion = 'I can help analyze these sales figures in more detail or suggest strategies to improve performance in this area. Which would be more valuable to you?';
            break;
          case 'hiring':
            suggestion = 'Would you like me to prepare a candidate shortlist based on our previous discussions about the role requirements?';
            break;
          case 'operations':
            suggestion = 'I notice this might impact your current workflow. Would you like me to suggest process improvements to address this issue?';
            break;
          default:
            suggestion = 'Is there anything specific you\'d like me to help you with regarding this topic?';
        }
        
        setAiSuggestion(suggestion);
      } catch (error) {
        console.error('Failed to generate AI suggestion:', error);
        setAiSuggestion('');
      } finally {
        setAiSuggestionLoading(false);
      }
    };
    
    generateSuggestion();
  }, [activeAgentType, messages]);

  // Handler for sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Create a new message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: messageInput,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
      isRead: true,
    };
    
    // Add the message to the thread
    setMessages([...messages, newMessage]);
    
    // Clear the input
    setMessageInput('');
    
    // Simulate message being sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
      
      // Simulate message being delivered
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        );
        
        // Simulate message being read
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
            )
          );
          
          // Simulate agent response
          setTimeout(() => {
            // Generate agent response based on agent type
            let responseContent = '';
            
            switch (activeAgentType) {
              case 'sales':
                responseContent = 'Thanks for the additional information. I\'ll include this in my analysis of your sales performance. Is there anything else you\'d like me to focus on in particular?';
                break;
              case 'hiring':
                responseContent = 'I understand your requirements. I\'ll start reviewing our talent pool for candidates that match this profile.';
                break;
              case 'operations':
                responseContent = 'I\'ll optimize your operational workflow based on these parameters. Would you like me to prepare an implementation timeline as well?';
                break;
              default:
                responseContent = 'I understand. Let me look into this for you and get back to you with more information.';
            }
            
            const agentResponse: Message = {
              id: Date.now().toString(),
              content: responseContent,
              sender: 'agent',
              timestamp: new Date(),
              status: 'sent',
              agentType: activeAgentType,
              isRead: true,
            };
            
            setMessages(prev => [...prev, agentResponse]);
            
            // Update conversation last message
            setConversations(prev => 
              prev.map(conv => 
                conv.id === activeConversationId 
                  ? { 
                      ...conv, 
                      lastMessage: {
                        content: responseContent,
                        timestamp: agentResponse.timestamp,
                        sender: 'agent',
                      },
                      unreadCount: 0,
                    } 
                  : conv
              )
            );
          }, 1500);
        }, 500);
      }, 500);
    }, 1000);
    
    // Update conversation last message immediately
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversationId 
          ? { 
              ...conv, 
              lastMessage: {
                content: messageInput,
                timestamp: newMessage.timestamp,
                sender: 'user',
              },
              unreadCount: 0,
            } 
          : conv
      )
    );
  };

  // Handler for using AI suggestion
  const handleUseSuggestion = () => {
    setMessageInput(aiSuggestion);
    setAiSuggestion('');
  };

  // Handler for creating a new conversation
  const handleNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation: Conversation = {
      id: newId,
      name: 'New Conversation',
      unreadCount: 0,
    };
    
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newId);
    setMessages([]);
  };

  // Handle agent type change
  const handleAgentTypeChange = (type: AgentType) => {
    // Only add system message if agent type is actually changing
    if (type !== activeAgentType) {
      setActiveAgentType(type);
      
      // Update conversation agent type
      setConversations(prev => 
        prev.map(conv => 
          conv.id === activeConversationId 
            ? { ...conv, agentType: type } 
            : conv
        )
      );
      
      // Add a system message about agent change
      const systemMessage: Message = {
        id: Date.now().toString(),
        content: `Switched to ${getAgentName(type)}`,
        sender: 'agent',
        timestamp: new Date(),
        status: 'sent',
        agentType: type,
        isRead: true,
      };
      
      setMessages(prev => [...prev, systemMessage]);
      
      // Generate a welcome message from the new agent
      setTimeout(() => {
        let welcomeContent = '';
        
        switch (type) {
          case 'sales':
            welcomeContent = "I'm your Sales Agent now. I can help with sales analytics, pipeline management, customer outreach strategies, and market insights. How can I assist with your sales objectives today?";
            break;
          case 'hiring':
            welcomeContent = "I'm your Hiring Agent now. I can help with job descriptions, candidate screening, interview preparation, and recruitment strategy. What hiring challenges would you like to address?";
            break;
          case 'operations':
            welcomeContent = "I'm your Operations Agent now. I can help optimize workflows, improve processes, manage resources, and enhance productivity. What operational area would you like to focus on?";
            break;
          default:
            welcomeContent = "I'm your General Assistant now. I can help with a wide range of tasks and questions. Feel free to ask me about anything you need assistance with.";
        }
        
        const welcomeMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: welcomeContent,
          sender: 'agent',
          timestamp: new Date(),
          status: 'sent',
          agentType: type,
          isRead: true,
        };
        
        setMessages(prev => [...prev, welcomeMessage]);
      }, 500);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversation Sidebar */}
      <div className="w-80 h-full bg-white shadow-sm flex flex-col">
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onNewConversation={handleNewConversation}
        />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3">
              {activeConversation?.avatar ? (
                <img
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  {activeConversation?.name.charAt(0).toUpperCase() || 'C'}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {activeConversation?.name || 'Chat'}
              </h2>
            </div>
          </div>
          
          {/* Agent Selector */}
          <div className="flex items-center space-x-2">
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className={`inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none ${getAgentAccentColor(activeAgentType)}`}
                  id="agent-menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={() => {
                    const dropdown = document.getElementById('agent-dropdown');
                    if (dropdown) {
                      dropdown.classList.toggle('hidden');
                    }
                  }}
                >
                  {getAgentName(activeAgentType)}
                  <ChevronDown className="-mr-1 ml-2 h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              
              <div
                id="agent-dropdown"
                className="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="agent-menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  {/* Agent Options */}
                  <button
                    className={`flex items-center px-4 py-3 text-sm w-full text-left ${
                      activeAgentType === 'general' ? 'bg-gray-100' : ''
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => {
                      handleAgentTypeChange('general');
                      document.getElementById('agent-dropdown')?.classList.add('hidden');
                    }}
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">General Assistant</div>
                      <div className="text-xs text-gray-500">All-purpose AI assistant</div>
                    </div>
                  </button>
                  
                  <button
                    className={`flex items-center px-4 py-3 text-sm w-full text-left ${
                      activeAgentType === 'sales' ? 'bg-gray-100' : ''
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => {
                      handleAgentTypeChange('sales');
                      document.getElementById('agent-dropdown')?.classList.add('hidden');
                    }}
                  >
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium">Sales Agent</div>
                      <div className="text-xs text-gray-500">Specialized in sales and marketing</div>
                    </div>
                  </button>
                  
                  <button
                    className={`flex items-center px-4 py-3 text-sm w-full text-left ${
                      activeAgentType === 'hiring' ? 'bg-gray-100' : ''
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => {
                      handleAgentTypeChange('hiring');
                      document.getElementById('agent-dropdown')?.classList.add('hidden');
                    }}
                  >
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Hiring Agent</div>
                      <div className="text-xs text-gray-500">Specialized in recruitment and HR</div>
                    </div>
                  </button>
                  
                  <button
                    className={`flex items-center px-4 py-3 text-sm w-full text-left ${
                      activeAgentType === 'operations' ? 'bg-gray-100' : ''
                    }`}
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => {
                      handleAgentTypeChange('operations');
                      document.getElementById('agent-dropdown')?.classList.add('hidden');
                    }}
                  >
                    <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                      <Bot className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium">Operations Agent</div>
                      <div className="text-xs text-gray-500">Specialized in workflow and processes</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <ChatPanel messages={messages} activeAgentType={activeAgentType} />
        
        {/* AI Suggestion */}
        {aiSuggestion && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <Sparkles className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">AI Recommendation</span>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setAiSuggestion('')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-700 mb-2">{aiSuggestion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 italic">AI-generated. Review before sending.</span>
                  <div className="flex space-x-2">
                    <button 
                      className="px-3 py-1 text-xs font-medium text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                      onClick={() => {
                        setMessageInput(aiSuggestion);
                        setAiSuggestion('');
                      }}
                    >
                      Copy to Edit
                    </button>
                    <button 
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      onClick={() => {
                        const currentInput = messageInput;
                        setMessageInput(aiSuggestion);
                        handleSendMessage();
                        // If the send doesn't work because the button is disabled, restore the original input
                        if (!aiSuggestion.trim()) {
                          setMessageInput(currentInput);
                        }
                      }}
                    >
                      Send Directly
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-full hover:bg-gray-100 mr-2"
              title="Attach file"
            >
              <Paperclip className="h-5 w-5 text-gray-500" />
            </button>
            
            <div className="relative flex-1">
              <textarea
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Type your message..."
                rows={1}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              
              <div className="absolute right-2 top-2 flex">
                <button 
                  className="p-1 rounded-full hover:bg-gray-100 mr-1"
                  title="AI suggestions"
                  onClick={() => {
                    setAiSuggestionLoading(true);
                    setTimeout(() => {
                      generateAiSuggestion();
                      setAiSuggestionLoading(false);
                    }, 1000);
                  }}
                >
                  <Sparkles className="h-5 w-5 text-blue-500" />
                </button>
                
                <button 
                  className="p-1 rounded-full hover:bg-gray-100"
                  title="Advanced AI mode"
                  onClick={() => setShowAdvancedControls(true)}
                >
                  <Edit className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <button 
              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 ml-2 text-white"
              onClick={() => handleSendMessage()}
              disabled={!messageInput.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Advanced AI Controls */}
      {showAdvancedControls && (
        <AdvancedChatControls
          activeAgentType={activeAgentType}
          onGenerateResponse={handleSendMessage}
          onClose={() => setShowAdvancedControls(false)}
          initialPrompt={messageInput}
        />
      )}
    </div>
  );
};

export { ChatPage }; 