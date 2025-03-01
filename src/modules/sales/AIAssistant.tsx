import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Calendar, Mail, Phone, MessageSquare, X, ChevronRight, ChevronDown } from 'lucide-react';
import { Lead } from '@/types/leads';

interface AIAssistantProps {
  lead: Lead;
  onDismiss?: () => void;
  onActionTaken?: (action: string) => void;
}

interface SuggestedAction {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'task';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ lead, onDismiss, onActionTaken }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [suggestedActions, setSuggestedActions] = useState<SuggestedAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading AI suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuggestedActions(generateSuggestions(lead));
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [lead]);

  // Generate AI suggestions based on lead data
  const generateSuggestions = (lead: Lead): SuggestedAction[] => {
    const suggestions: SuggestedAction[] = [];
    const now = new Date();
    const lastInteractionDate = lead.lastInteraction ? new Date(lead.lastInteraction) : null;
    
    // Check if it's been more than 7 days since last interaction
    if (lastInteractionDate && (now.getTime() - lastInteractionDate.getTime()) > 7 * 24 * 60 * 60 * 1000) {
      suggestions.push({
        id: '1',
        type: 'email',
        title: 'Send follow-up email',
        description: `It's been ${Math.floor((now.getTime() - lastInteractionDate.getTime()) / (24 * 60 * 60 * 1000))} days since your last contact with ${lead.name}. Consider sending a follow-up email to maintain engagement.`,
        priority: 'high',
        dueDate: new Date(now.setDate(now.getDate() + 1)).toISOString()
      });
    }
    
    // Suggestion based on lead score
    if (lead.score > 70) {
      suggestions.push({
        id: '2',
        type: 'call',
        title: 'Schedule a discovery call',
        description: `${lead.name} has a high lead score (${lead.score}). This is a good opportunity to schedule a discovery call to understand their needs better.`,
        priority: 'high',
        dueDate: new Date(now.setDate(now.getDate() + 2)).toISOString()
      });
    }
    
    // Suggestion based on lead status
    if (lead.status === 'Qualified') {
      suggestions.push({
        id: '3',
        type: 'meeting',
        title: 'Present proposal',
        description: `${lead.name} is qualified and ready for the next step. Prepare and present a proposal tailored to their needs.`,
        priority: 'medium',
        dueDate: new Date(now.setDate(now.getDate() + 5)).toISOString()
      });
    }
    
    // Suggestion based on missing information
    if (!lead.company) {
      suggestions.push({
        id: '4',
        type: 'task',
        title: 'Research company information',
        description: `Company information is missing for ${lead.name}. Research their company to better understand their business context.`,
        priority: 'low'
      });
    }
    
    // If no suggestions were generated, add a default one
    if (suggestions.length === 0) {
      suggestions.push({
        id: '5',
        type: 'email',
        title: 'Introduce yourself',
        description: `This is a new lead. Send an introduction email to establish contact with ${lead.name}.`,
        priority: 'medium',
        dueDate: new Date(now.setDate(now.getDate() + 1)).toISOString()
      });
    }
    
    return suggestions;
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'meeting':
        return <Calendar className="h-4 w-4" />;
      case 'task':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleActionTaken = (actionId: string) => {
    const action = suggestedActions.find(a => a.id === actionId);
    if (action && onActionTaken) {
      onActionTaken(action.title);
      // Remove the action from the list
      setSuggestedActions(suggestedActions.filter(a => a.id !== actionId));
    }
  };

  if (suggestedActions.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
      <div 
        className="flex justify-between items-center p-3 bg-blue-50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-sm font-medium text-blue-700">AI Suggested Actions</h3>
        </div>
        <div className="flex items-center">
          {onDismiss && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="text-gray-400 hover:text-gray-600 mr-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-blue-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-blue-500" />
          )}
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-pulse flex space-x-2 items-center">
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-blue-500 ml-2">Analyzing lead data...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {suggestedActions.map((action) => (
                <div key={action.id} className="border border-gray-100 rounded-md p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className={`p-1.5 rounded-md ${action.type === 'email' ? 'bg-blue-100 text-blue-600' : action.type === 'call' ? 'bg-green-100 text-green-600' : action.type === 'meeting' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'} mr-3`}>
                        {getActionIcon(action.type)}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{action.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(action.priority)}`}>
                        {action.priority}
                      </span>
                      {action.dueDate && (
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Due {formatDate(action.dueDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => handleActionTaken(action.id)}
                      className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                    >
                      Mark as done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAssistant; 