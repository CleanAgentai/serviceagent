import { Lead, ScoreRule, ScoreBreakdown, ScoringSettings } from '@/types/leads';
import { v4 as uuidv4 } from 'uuid';

/**
 * Calculate a lead's score based on the scoring rules
 */
export const calculateLeadScore = (
  lead: Lead, 
  settings: ScoringSettings
): { score: number; breakdown: ScoreBreakdown[] } => {
  const breakdown: ScoreBreakdown[] = [];
  let totalScore = 0;
  
  // Only process active rules
  const activeRules = settings.rules.filter(rule => rule.isActive);
  
  for (const rule of activeRules) {
    const points = evaluateRule(lead, rule);
    
    if (points !== 0) {
      // Rule was applied, add to breakdown
      breakdown.push({
        ruleId: rule.id,
        ruleName: rule.name,
        points: points,
        appliedAt: new Date().toISOString()
      });
      
      totalScore += points;
    }
  }
  
  // Ensure score is within min/max bounds
  totalScore = Math.max(settings.minScore, Math.min(settings.maxScore, totalScore));
  
  return { score: totalScore, breakdown };
};

/**
 * Evaluate a single rule against a lead
 */
const evaluateRule = (lead: Lead, rule: ScoreRule): number => {
  const { field, operator, value, points } = rule;
  
  // Get the field value from the lead
  const fieldValue = lead[field as keyof Lead];
  
  // If the field doesn't exist on the lead and we're not checking for existence
  if (fieldValue === undefined && operator !== 'exists' && operator !== 'not_exists') {
    return 0;
  }
  
  // Evaluate based on operator
  switch (operator) {
    case 'equals':
      return fieldValue === value ? points : 0;
      
    case 'contains':
      if (Array.isArray(fieldValue)) {
        // For arrays like tags
        return fieldValue.includes(value) ? points : 0;
      } else if (typeof fieldValue === 'string') {
        // For strings
        return fieldValue.toLowerCase().includes(String(value).toLowerCase()) ? points : 0;
      }
      return 0;
      
    case 'greater_than':
      if (typeof fieldValue === 'number' && typeof value === 'number') {
        return fieldValue > value ? points : 0;
      }
      return 0;
      
    case 'less_than':
      if (typeof fieldValue === 'number' && typeof value === 'number') {
        return fieldValue < value ? points : 0;
      }
      return 0;
      
    case 'exists':
      return fieldValue !== undefined && fieldValue !== null ? points : 0;
      
    case 'not_exists':
      return fieldValue === undefined || fieldValue === null ? points : 0;
      
    default:
      return 0;
  }
};

/**
 * Get default scoring settings
 */
export const getDefaultScoringSettings = (): ScoringSettings => {
  return {
    rules: [
      {
        id: uuidv4(),
        name: 'Lead from LinkedIn',
        field: 'source',
        operator: 'equals',
        value: 'LinkedIn',
        points: 20,
        isActive: true
      },
      {
        id: uuidv4(),
        name: 'Has budget specified',
        field: 'budget',
        operator: 'exists',
        value: true,
        points: 15,
        isActive: true
      },
      {
        id: uuidv4(),
        name: 'High budget',
        field: 'budget',
        operator: 'greater_than',
        value: 10000,
        points: 25,
        isActive: true
      },
      {
        id: uuidv4(),
        name: 'Has company information',
        field: 'company',
        operator: 'exists',
        value: true,
        points: 10,
        isActive: true
      },
      {
        id: uuidv4(),
        name: 'Has interacted multiple times',
        field: 'interactionCount',
        operator: 'greater_than',
        value: 3,
        points: 15,
        isActive: true
      },
      {
        id: uuidv4(),
        name: 'No recent interaction',
        field: 'lastInteraction',
        operator: 'not_exists',
        value: true,
        points: -10,
        isActive: true
      }
    ],
    minScore: 0,
    maxScore: 100,
    aiAssist: true
  };
};

/**
 * Apply AI adjustments to lead scores (simulated)
 */
export const applyAIScoreAdjustments = (
  lead: Lead, 
  settings: ScoringSettings
): { score: number; breakdown: ScoreBreakdown[] } => {
  // Only apply if AI assist is enabled
  if (!settings.aiAssist) {
    return { score: lead.score, breakdown: lead.scoreBreakdown || [] };
  }
  
  // Clone the existing breakdown
  const breakdown = [...(lead.scoreBreakdown || [])];
  let score = lead.score;
  
  // Simulate AI insights based on lead data
  const aiAdjustments: { condition: boolean; points: number; reason: string }[] = [
    { 
      condition: lead.tags?.includes('Interested') || false, 
      points: 10, 
      reason: 'AI: Lead showed interest in product demo' 
    },
    { 
      condition: lead.interactionCount !== undefined && lead.interactionCount > 5, 
      points: 15, 
      reason: 'AI: High engagement pattern detected' 
    },
    { 
      condition: lead.company?.includes('Inc') || false, 
      points: 5, 
      reason: 'AI: Lead from established company' 
    }
  ];
  
  // Apply AI adjustments
  for (const adjustment of aiAdjustments) {
    if (adjustment.condition) {
      score += adjustment.points;
      
      breakdown.push({
        ruleId: uuidv4(),
        ruleName: adjustment.reason,
        points: adjustment.points,
        appliedAt: new Date().toISOString()
      });
    }
  }
  
  // Ensure score is within min/max bounds
  score = Math.max(settings.minScore, Math.min(settings.maxScore, score));
  
  return { score, breakdown };
}; 