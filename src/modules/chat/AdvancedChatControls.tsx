import React, { useState } from 'react';
import { 
  Edit, 
  X, 
  Maximize2, 
  Minimize2, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { AIEditableContent } from '@/app/shared/components/ai';
import { AgentType } from './ChatPage';
import { tokens } from '@/app/shared/styles/tokens';

interface AdvancedChatControlsProps {
  activeAgentType: AgentType;
  onGenerateResponse: (content: string) => void;
  onClose: () => void;
  initialPrompt?: string;
}

/**
 * AdvancedChatControls component provides an expanded UI for generating
 * more complex AI responses with direct editing capabilities.
 */
export const AdvancedChatControls: React.FC<AdvancedChatControlsProps> = ({
  activeAgentType,
  onGenerateResponse,
  onClose,
  initialPrompt = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate a tailored prompt based on agent type
  const getPromptForAgentType = (): string => {
    switch (activeAgentType) {
      case 'sales':
        return initialPrompt || 'Create a sales outreach message to a potential client interested in our platform...';
      case 'hiring':
        return initialPrompt || 'Draft a job description for a position we need to fill...';
      case 'operations':
        return initialPrompt || 'Create a process optimization plan for our current workflow...';
      default:
        return initialPrompt || 'Generate a detailed response about...';
    }
  };

  // Generate title based on agent type
  const getTitleForAgentType = (): string => {
    switch (activeAgentType) {
      case 'sales':
        return 'Sales Assistant';
      case 'hiring':
        return 'Hiring Assistant';
      case 'operations':
        return 'Operations Assistant';
      default:
        return 'AI Assistant';
    }
  };

  // Simulate generating content based on agent type
  const generateContent = async (): Promise<string> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let generatedContent = '';
    
    switch (activeAgentType) {
      case 'sales':
        generatedContent = `Dear [Client Name],

I hope this message finds you well. Based on our previous conversation about your interest in CleanAgent's sales automation features, I wanted to share some additional information that might be valuable to you.

Our platform offers:
• Automated lead scoring and qualification
• Customizable sales sequences with AI-powered follow-ups
• Integration with your existing CRM
• Detailed analytics and performance dashboards

Many of our clients in your industry have seen a 35% increase in sales efficiency within the first 3 months of implementation.

Would you be interested in scheduling a personalized demo to see these features in action? I'm available this week and would be happy to walk you through how our platform could address your specific needs.

Looking forward to your response,
[Your Name]`;
        break;
        
      case 'hiring':
        generatedContent = `Position: Senior Full-Stack Developer

About CleanAgent:
We're a fast-growing SaaS company focused on revolutionizing business automation through AI-powered solutions. Our collaborative team values innovation, ownership, and excellence.

Responsibilities:
• Develop and maintain robust, scalable features for our core product
• Collaborate with product, design, and data science teams
• Mentor junior developers and contribute to engineering best practices
• Participate in code reviews and architectural decisions

Requirements:
• 5+ years of professional experience with React, Node.js, and TypeScript
• Strong understanding of database design and optimization
• Experience with cloud services (AWS/Azure/GCP)
• Excellent problem-solving skills and attention to detail

Benefits:
• Competitive salary and equity options
• Flexible work arrangements
• Comprehensive health benefits
• Professional development budget
• Collaborative and supportive team culture

Location: Remote (with quarterly team meetups)

To apply, please submit your resume and a brief explanation of why you're interested in joining our team.`;
        break;
        
      case 'operations':
        generatedContent = `Operational Workflow Optimization Plan

Current Challenges:
Based on our analysis, the current customer onboarding process has several bottlenecks that are causing delays and reduced satisfaction scores:
1. Manual data entry creating a 48-hour backlog
2. Inconsistent training procedures across teams
3. Limited visibility into process status for customers

Proposed Optimization:
We recommend implementing the following changes:

Phase 1 (Immediate - 2 weeks):
• Automate customer data import through API integration with your CRM
• Create standardized training modules for all onboarding team members
• Implement status tracking dashboard accessible to customers

Phase 2 (Medium-term - 1 month):
• Establish automated email sequences for customer guidance
• Create satisfaction surveys at key touchpoints
• Develop performance metrics dashboard for internal teams

Phase 3 (Long-term - 3 months):
• Implement predictive analytics to identify at-risk onboarding processes
• Develop personalized onboarding paths based on customer segment
• Create feedback loop for continuous process improvement

Expected Results:
• 65% reduction in onboarding time
• 40% decrease in support tickets during onboarding
• 25% improvement in customer satisfaction scores

Implementation Resources Required:
• 2 developers for integration work (2 weeks)
• 1 project manager to oversee changes
• Training time for team members (12 hours total)

Would you like me to proceed with developing detailed requirements for Phase 1?`;
        break;
        
      default:
        generatedContent = `I've analyzed your request and prepared the following response:

Based on the information provided, here are my recommendations:

1. First, we should consider the key objectives you're trying to achieve:
   • Improving efficiency in your current process
   • Addressing the challenges you've mentioned
   • Ensuring scalability for future growth

2. A potential approach could involve:
   • Implementing automated workflows for repetitive tasks
   • Creating standardized documentation for team consistency
   • Establishing metrics to track progress and success

3. For implementation, I suggest:
   • Starting with a small pilot to validate the approach
   • Gathering feedback from key stakeholders
   • Iteratively improving based on real-world usage

Would you like me to elaborate on any particular aspect of this plan? I'm happy to provide more specific details or adjust the approach based on additional requirements you might have.`;
    }
    
    setLoading(false);
    return generatedContent;
  };

  // Handle content acceptance
  const handleAccept = (content: string) => {
    onGenerateResponse(content);
    onClose();
  };

  return (
    <div className={`fixed inset-x-0 bottom-0 z-10 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out ${
      isExpanded ? 'h-[80vh]' : 'max-h-96'
    }`}>
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2" style={{ color: tokens.colors.primary.blue }} />
          <h3 className="font-medium text-gray-800">{getTitleForAgentType()}</h3>
          <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
            Advanced Mode
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Minimize editor' : 'Maximize editor'}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
            onClick={onClose}
            aria-label="Close editor"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4 h-full overflow-y-auto">
        <AIEditableContent
          title=""
          content={getPromptForAgentType()}
          onRegenerate={generateContent}
          onAccept={handleAccept}
          loading={loading}
          showVersionControls={true}
          placeholder="AI will generate a detailed response based on your request..."
          rows={isExpanded ? 15 : 6}
          multiline={true}
        />
        
        <div className="mt-4 text-xs text-gray-500 flex items-center">
          <HelpCircle className="h-3 w-3 mr-1" />
          <span>
            This advanced mode allows you to generate and edit complex AI responses before sending.
            You can edit the text directly, regenerate content, or accept it when ready.
          </span>
        </div>
      </div>
    </div>
  );
}; 