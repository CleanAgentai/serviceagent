import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Lead, ScoreBreakdown } from '@/types/leads';

interface LeadScoreIndicatorProps {
  lead?: Lead;
  score?: number;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LeadScoreIndicator: React.FC<LeadScoreIndicatorProps> = ({
  lead,
  score,
  showDetails = false,
  size = 'md'
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  
  // Use either the lead's score or the direct score prop
  const scoreValue = lead?.score ?? score ?? 0;
  
  // Determine score category and color
  const getScoreCategory = (score: number): { label: string; color: string } => {
    if (score >= 80) {
      return { label: 'Hot', color: 'bg-red-500 text-white' };
    } else if (score >= 50) {
      return { label: 'Warm', color: 'bg-orange-400 text-white' };
    } else if (score >= 30) {
      return { label: 'Cool', color: 'bg-blue-400 text-white' };
    } else {
      return { label: 'Cold', color: 'bg-blue-200 text-gray-700' };
    }
  };

  const scoreCategory = getScoreCategory(scoreValue);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base'
  };
  
  // Render breakdown of score
  const renderScoreBreakdown = () => {
    if (!lead?.scoreBreakdown || lead.scoreBreakdown.length === 0) {
      return <p className="text-gray-500 italic">No score breakdown available</p>;
    }
    
    return (
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {lead.scoreBreakdown.map((item, index) => (
          <div key={index} className="flex justify-between text-sm border-b border-gray-100 pb-1">
            <span className="text-gray-700">{item.ruleName}</span>
            <span className={item.points > 0 ? 'text-green-600' : 'text-red-600'}>
              {item.points > 0 ? '+' : ''}{item.points}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="relative inline-flex items-center">
      <div 
        className={`${sizeClasses[size]} ${scoreCategory.color} rounded-full flex items-center justify-center font-medium relative`}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
      >
        {scoreValue}
        
        {/* Info icon for detailed view */}
        {showDetails && (
          <div className="absolute -top-1 -right-1 bg-white rounded-full border border-gray-200">
            <Info className="h-3 w-3 text-gray-500" />
          </div>
        )}
      </div>
      
      {/* Label */}
      {showDetails && (
        <span className="ml-2 text-sm font-medium text-gray-700">
          {scoreCategory.label}
        </span>
      )}
      
      {/* Tooltip */}
      {tooltipVisible && lead && (
        <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-gray-100">
            <h4 className="font-medium text-gray-900">Lead Score: {scoreValue}</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs ${scoreCategory.color}`}>
              {scoreCategory.label}
            </span>
          </div>
          
          {renderScoreBreakdown()}
          
          {lead.scoreBreakdown && lead.scoreBreakdown.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
              {lead.aiAdjusted && (
                <div className="flex items-center">
                  <span className="inline-block h-2 w-2 rounded-full bg-purple-400 mr-1"></span>
                  <span>AI-adjusted based on lead behavior</span>
                </div>
              )}
            </div>
          )}
          
          {/* Arrow pointing to the score indicator */}
          <div className="absolute -bottom-2 left-3 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default LeadScoreIndicator; 