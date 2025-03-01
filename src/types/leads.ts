export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Converted';

export type LeadSource = 'Website' | 'Referral' | 'Social Media' | 'Email Campaign' | 'Event' | 'Other';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Converted';
  score: number;
  createdAt: string;
  notes?: string;
  tags?: string[];
  assignedTo?: string; // ID of the sales rep assigned to this lead
  scoreBreakdown?: ScoreBreakdown[];
  budget?: number;
  lastInteraction?: string;
  interactionCount?: number;
  aiAdjusted?: boolean;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: LeadSource;
  notes?: string;
  tags?: string[];
}

export interface CSVMappingField {
  csvHeader: string;
  leadField: keyof LeadFormData | null;
}

export interface CSVMapping {
  [key: string]: keyof LeadFormData | null;
}

export type ScoreOperator = 
  | 'equals' 
  | 'contains' 
  | 'greater_than' 
  | 'less_than' 
  | 'exists' 
  | 'not_exists';

export type ScoreFieldType = 
  | 'source' 
  | 'status' 
  | 'tags' 
  | 'budget' 
  | 'company' 
  | 'interactionCount' 
  | 'lastInteraction';

export interface ScoreRule {
  id: string;
  name: string;
  field: ScoreFieldType;
  operator: ScoreOperator;
  value: string | number | boolean;
  points: number;
  isActive: boolean;
}

export interface ScoreBreakdown {
  ruleId: string;
  ruleName: string;
  points: number;
  appliedAt: string;
}

export interface ScoringSettings {
  rules: ScoreRule[];
  minScore: number;
  maxScore: number;
  aiAssist: boolean;
} 