import React from 'react';
import { Card } from '../Card';
import { CheckBox } from '../form';
import { Bot, Sparkles, MessageSquare, Zap, Clock, Lock, Info } from 'lucide-react';
import { tokens } from '@/app/shared/styles/tokens';

export interface AIFeature {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
  enabled: boolean;
  requiresPremium?: boolean;
  requiresPermission?: boolean;
  category?: string;
}

export interface AIAutomationSettingsProps {
  features: AIFeature[];
  onChange: (featureId: string, enabled: boolean) => void;
  title?: string;
  description?: string;
  className?: string;
  isPremium?: boolean;
  onUpgrade?: () => void;
  loading?: boolean;
  disabled?: boolean;
  showInfoLinks?: boolean;
  groupByCategory?: boolean;
}

/**
 * AIAutomationSettings component for controlling AI features and automations
 */
export const AIAutomationSettings: React.FC<AIAutomationSettingsProps> = ({
  features,
  onChange,
  title = 'AI Automation Settings',
  description = 'Configure which AI features to enable in your workspace',
  className = '',
  isPremium = false,
  onUpgrade,
  loading = false,
  disabled = false,
  showInfoLinks = true,
  groupByCategory = true,
}) => {
  // Helper to render feature icon
  const renderFeatureIcon = (feature: AIFeature) => {
    if (feature.icon) {
      return feature.icon;
    }

    // Default icons based on feature ID pattern
    if (feature.id.includes('suggestion')) {
      return <Sparkles className="h-5 w-5 text-blue-500" />;
    } else if (feature.id.includes('reply') || feature.id.includes('message')) {
      return <MessageSquare className="h-5 w-5 text-green-500" />;
    } else if (feature.id.includes('automate') || feature.id.includes('action')) {
      return <Zap className="h-5 w-5 text-amber-500" />;
    } else if (feature.id.includes('schedule')) {
      return <Clock className="h-5 w-5 text-purple-500" />;
    } else {
      return <Bot className="h-5 w-5 text-blue-500" />;
    }
  };

  // Group features by category if needed
  const getGroupedFeatures = () => {
    if (!groupByCategory) {
      return { 'All Features': features };
    }

    return features.reduce<Record<string, AIFeature[]>>((acc, feature) => {
      const category = feature.category || 'General';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(feature);
      return acc;
    }, {});
  };

  const groupedFeatures = getGroupedFeatures();

  return (
    <Card
      title={
        <div className="flex items-center">
          <Bot 
            className="h-5 w-5 mr-2"
            style={{ color: tokens.colors.primary.blue }}
          />
          <span>{title}</span>
        </div>
      }
      description={description}
      className={`border border-gray-200 ${className}`}
      shadow="sm"
      padding="lg"
    >
      <div className="space-y-6">
        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
          <div key={category}>
            {groupByCategory && Object.keys(groupedFeatures).length > 1 && (
              <h4 className="font-medium text-gray-900 text-sm mb-3">{category}</h4>
            )}
            
            <div className="space-y-4">
              {categoryFeatures.map((feature) => {
                const isDisabled = 
                  disabled || 
                  loading || 
                  (feature.requiresPremium && !isPremium) ||
                  feature.requiresPermission;
                
                return (
                  <div 
                    key={feature.id} 
                    className={`
                      relative rounded-lg border border-gray-200 p-4
                      ${isDisabled ? 'bg-gray-50 opacity-80' : 'bg-white'}
                      ${feature.enabled ? 'border-blue-200' : ''}
                    `}
                  >
                    {feature.requiresPremium && !isPremium && (
                      <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <Lock className="h-3 w-3 mr-1" />
                          Premium
                        </span>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {renderFeatureIcon(feature)}
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <label 
                            htmlFor={`feature-${feature.id}`}
                            className="text-sm font-medium text-gray-900 hover:cursor-pointer"
                          >
                            {feature.name}
                          </label>
                          
                          <CheckBox
                            id={`feature-${feature.id}`}
                            label=""
                            checked={feature.enabled}
                            disabled={isDisabled}
                            onChange={(e) => onChange(feature.id, e.target.checked)}
                            containerClassName="m-0"
                          />
                        </div>
                        
                        <p className="mt-1 text-sm text-gray-500">
                          {feature.description}
                        </p>
                        
                        {/* Premium Upgrade Button */}
                        {feature.requiresPremium && !isPremium && onUpgrade && (
                          <button
                            type="button"
                            onClick={onUpgrade}
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                          >
                            Upgrade to Premium
                          </button>
                        )}
                        
                        {/* Info Link */}
                        {showInfoLinks && (
                          <div className="mt-2">
                            <a 
                              href={`#feature-info-${feature.id}`}
                              className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center"
                            >
                              <Info className="h-3 w-3 mr-1" />
                              Learn more about this feature
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}; 