import React, { useState } from 'react';
import { AIInsightsPanel, AIAutomationSettings, AIEditableContent } from '../ai';
import { Card } from '../Card';
import { Bot, Sparkles, MessageSquare, Zap, Clock } from 'lucide-react';

/**
 * Example component demonstrating the usage of AI components
 */
export const AIComponentsExample: React.FC = () => {
  // Sample data for insights
  const [sampleInsights, setSampleInsights] = useState([
    {
      id: '1',
      title: 'Customer Engagement Opportunity',
      description: 'Several high-value customers haven\'t engaged with your platform in the last 30 days. Consider sending a personalized re-engagement email.',
      category: 'Engagement',
      priority: 'high' as const,
      actionable: true,
      action: {
        label: 'Create Campaign',
        onClick: () => alert('Creating re-engagement campaign')
      }
    },
    {
      id: '2',
      title: 'Content Performance Insight',
      description: 'Your blog post "10 Tips for Better Productivity" is performing 45% better than average. Consider creating more content on this topic.',
      category: 'Content',
      priority: 'medium' as const
    },
    {
      id: '3',
      title: 'Potential Revenue Opportunity',
      description: 'Based on usage patterns, 15 users on the free plan are approaching their limits. They may be good candidates for an upgrade to the premium plan.',
      category: 'Revenue',
      priority: 'medium' as const,
      actionable: true,
      action: {
        label: 'View Users',
        onClick: () => alert('Viewing potential upgrade candidates')
      }
    }
  ]);

  // Sample AI features for automation settings
  const [aiFeatures, setAiFeatures] = useState([
    {
      id: 'auto-reply',
      name: 'AI Auto-Replies',
      description: 'Automatically generate replies to common customer inquiries based on your previous responses and knowledge base.',
      enabled: true,
      category: 'Communication'
    },
    {
      id: 'content-suggestions',
      name: 'Content Suggestions',
      description: 'Receive AI-powered suggestions for blog posts, social media content, and marketing materials.',
      enabled: false,
      category: 'Content'
    },
    {
      id: 'meeting-summaries',
      name: 'Meeting Summaries',
      description: 'Automatically generate summaries of your meetings with action items and key points.',
      enabled: true,
      category: 'Productivity'
    },
    {
      id: 'data-insights',
      name: 'Data Insights',
      description: 'Get AI-powered insights from your business data to identify trends and opportunities.',
      enabled: true,
      category: 'Analytics'
    },
    {
      id: 'email-composer',
      name: 'AI Email Composer',
      description: 'Draft professional emails based on brief descriptions of what you want to communicate.',
      enabled: false,
      requiresPremium: true,
      category: 'Communication'
    },
    {
      id: 'schedule-optimizer',
      name: 'Schedule Optimizer',
      description: 'AI will analyze your calendar and suggest optimal meeting times and productivity blocks.',
      enabled: false,
      requiresPremium: true,
      category: 'Productivity'
    }
  ]);

  // Sample editable content
  const [emailContent, setEmailContent] = useState(
    `Dear valued customer,

Thank you for being a loyal CleanAgent user for the past 6 months. We've noticed you've been making great use of our platform, and we wanted to check in to see how things are going.

Based on your usage patterns, we thought you might be interested in our new Analytics Dashboard feature, which can help you gain deeper insights into your cleaning operations.

Would you be interested in a quick 15-minute demo of this new feature? If so, please let me know what time works best for you.

Best regards,
The CleanAgent Team`
  );

  // Handle feature toggle
  const handleFeatureToggle = (featureId: string, enabled: boolean) => {
    setAiFeatures(
      aiFeatures.map(feature => 
        feature.id === featureId ? { ...feature, enabled } : feature
      )
    );
  };

  // Handle insight feedback
  const handleInsightFeedback = (insightId: string, isHelpful: boolean) => {
    console.log(`Insight ${insightId} marked as ${isHelpful ? 'helpful' : 'not helpful'}`);
    // In a real app, you would send this feedback to your backend
  };

  // Simulate generating insights
  const generateInsights = async (data: any) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return sample insights
    return [
      {
        id: '4',
        title: 'New Market Opportunity',
        description: 'Based on recent search patterns, there appears to be growing interest in your services from the healthcare sector.',
        category: 'Growth',
        priority: 'high' as const
      },
      {
        id: '5',
        title: 'Workflow Optimization',
        description: 'Your team is spending 30% more time on administrative tasks compared to similar organizations. Consider implementing automation.',
        category: 'Operations',
        priority: 'medium' as const,
        actionable: true,
        action: {
          label: 'View Recommendations',
          onClick: () => alert('Viewing workflow recommendations')
        }
      }
    ];
  };

  // Simulate regenerating content
  const regenerateContent = async () => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `Dear valued customer,

I hope this message finds you well. As you approach your 6-month anniversary with CleanAgent, I wanted to personally thank you for your continued trust in our platform.

Our team has been analyzing usage patterns, and we've noticed you've been making excellent use of our core features. Based on your specific usage, I believe our new Analytics Dashboard would be particularly valuable for your business, as it provides deeper insights into cleaning operations efficiency and resource allocation.

Would you be interested in a brief 15-minute personalized demo of this feature? I'd be happy to schedule this at your convenience.

Warm regards,
The CleanAgent Team`;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">AI Components Examples</h1>
      
      {/* AI Insights Panel */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Insights Panel</h2>
        <p className="text-gray-600 mb-4">
          The AIInsightsPanel component displays AI-generated insights based on your data.
          It supports loading states, error handling, and user feedback.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">With Static Insights</h3>
            <AIInsightsPanel
              title="Business Insights"
              insights={sampleInsights}
              onFeedback={handleInsightFeedback}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">With Dynamic Loading</h3>
            <AIInsightsPanel
              title="Market Analysis"
              data={{ userId: '123', period: 'last30days' }}
              onGenerateInsights={generateInsights}
              onFeedback={handleInsightFeedback}
              emptyMessage="No market insights available for the selected period."
            />
          </div>
        </div>
      </section>
      
      {/* AI Automation Settings */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Automation Settings</h2>
        <p className="text-gray-600 mb-4">
          The AIAutomationSettings component allows users to control which AI features are enabled.
          It supports grouping by category, premium features, and detailed descriptions.
        </p>
        
        <AIAutomationSettings
          features={aiFeatures}
          onChange={handleFeatureToggle}
          isPremium={false}
          onUpgrade={() => alert('Upgrading to premium')}
        />
      </section>
      
      {/* AI Editable Content */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Editable Content</h2>
        <p className="text-gray-600 mb-4">
          The AIEditableContent component displays AI-generated content that users can edit,
          regenerate, or accept. It supports version history and copy functionality.
        </p>
        
        <AIEditableContent
          title="Customer Email Draft"
          content={emailContent}
          onEdit={setEmailContent}
          onRegenerate={regenerateContent}
          onAccept={(content) => alert('Email content accepted and ready to send')}
          showVersionControls={true}
        />
      </section>
      
      {/* Integration Example */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Integrated Example</h2>
        <p className="text-gray-600 mb-4">
          This example shows how all three AI components can work together in a real-world scenario.
        </p>
        
        <Card
          title="Customer Communication Center"
          description="Manage all your customer communications with AI assistance"
          className="border border-gray-200"
          shadow="md"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <AIEditableContent
                  title="Follow-up Email"
                  content="Draft your follow-up email here..."
                  placeholder="Click 'Generate' to create a follow-up email based on the customer's history"
                  onRegenerate={async () => {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return "Dear Customer,\n\nThank you for your recent purchase. We noticed you've been using our basic features extensively. Would you be interested in learning about our premium features?\n\nBest regards,\nThe Team";
                  }}
                  showControls={true}
                  rows={4}
                />
              </div>
              
              <div>
                <AIInsightsPanel
                  title="Customer Insights"
                  insights={[
                    {
                      id: 'c1',
                      title: 'Recent Activity',
                      description: 'This customer has logged in 5 times in the past week and used the reporting feature extensively.',
                      category: 'Usage'
                    },
                    {
                      id: 'c2',
                      title: 'Upsell Opportunity',
                      description: 'Based on usage patterns, this customer is a good candidate for the Premium plan.',
                      priority: 'medium' as const,
                      actionable: true,
                      action: {
                        label: 'View Upgrade Options',
                        onClick: () => alert('Viewing upgrade options')
                      }
                    }
                  ]}
                  maxHeight="300px"
                />
              </div>
            </div>
            
            <AIAutomationSettings
              title="Communication Settings"
              description="Configure how AI assists with customer communications"
              features={[
                {
                  id: 'auto-followup',
                  name: 'Automatic Follow-ups',
                  description: 'Send AI-generated follow-up emails after customer interactions',
                  enabled: true,
                  category: 'Emails'
                },
                {
                  id: 'sentiment-analysis',
                  name: 'Sentiment Analysis',
                  description: 'Analyze customer sentiment in emails and provide response suggestions',
                  enabled: true,
                  category: 'Analysis'
                },
                {
                  id: 'personalization',
                  name: 'Advanced Personalization',
                  description: 'Use customer history and preferences for highly personalized communications',
                  enabled: false,
                  requiresPremium: true,
                  category: 'Emails'
                }
              ]}
              onChange={(id, enabled) => console.log(`Setting ${id} to ${enabled}`)}
              isPremium={false}
            />
          </div>
        </Card>
      </section>
    </div>
  );
}; 