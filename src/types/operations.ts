import { ReactNode } from 'react';

// Complaint Management Types
export type ComplaintCategory = 'BILLING' | 'SERVICE' | 'TECHNICAL' | 'PRODUCT' | 'OTHER';
export type ComplaintPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type ComplaintStatus = 'OPEN' | 'IN_PROGRESS' | 'ESCALATED' | 'RESOLVED';

export interface Complaint {
  id: string;
  customerId: string;
  customerName: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  description: string;
  createdAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  aiResponse?: {
    suggestedReply: string;
    confidence: number;
    keywords: string[];
  };
  timeline: {
    id: string;
    action: 'CREATED' | 'UPDATED' | 'ESCALATED' | 'RESOLVED' | 'NOTE_ADDED' | 'AI_RESPONSE_SENT';
    timestamp: string;
    actor: string;
    details: string;
  }[];
  notes: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
}

export interface ComplaintMetrics {
  totalComplaints: number;
  openComplaints: number;
  resolvedComplaints: number;
  avgResolutionTime: number;
  categoryDistribution: {
    category: ComplaintCategory;
    count: number;
  }[];
  trends: {
    date: string;
    count: number;
    category: ComplaintCategory;
  }[];
  commonKeywords: {
    keyword: string;
    count: number;
    sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
  }[];
}

// Feedback Collection Types
export type FeedbackType = 'SURVEY' | 'NPS' | 'REVIEW' | 'CUSTOM';
export type FeedbackSentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export interface FeedbackRequest {
  id: string;
  type: FeedbackType;
  customerSegment?: string;
  customers: string[];
  questions: {
    id: string;
    type: 'RATING' | 'TEXT' | 'MULTIPLE_CHOICE';
    question: string;
    options?: string[];
  }[];
  scheduledAt: string;
  sentAt?: string;
  expiresAt?: string;
  status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'EXPIRED';
}

export interface FeedbackResponse {
  id: string;
  requestId: string;
  customerId: string;
  customerName: string;
  rating?: number;
  npsScore?: number;
  responses: {
    questionId: string;
    answer: string | number;
  }[];
  comments?: string;
  sentiment: FeedbackSentiment;
  submittedAt: string;
  aiAnalysis?: {
    themes: string[];
    keywords: string[];
    suggestions: string[];
  };
}

export interface FeedbackMetrics {
  averageRating: number;
  npsScore?: number;
  responseRate: number;
  sentimentDistribution: {
    sentiment: FeedbackSentiment;
    count: number;
    percentage: number;
  }[];
  trends: {
    date: string;
    averageRating: number;
    responseCount: number;
  }[];
  commonThemes: {
    theme: string;
    count: number;
    sentiment: FeedbackSentiment;
  }[];
}

// Conversion Analytics Types
export type FunnelStage = 'TRAFFIC' | 'LEADS' | 'QUALIFIED_LEADS' | 'OPPORTUNITIES' | 'SALES';
export type AdPlatform = 'GOOGLE_ADS' | 'FACEBOOK_ADS' | 'LINKEDIN_ADS' | 'OTHER';

export interface FunnelMetrics {
  stage: FunnelStage;
  count: number;
  percentage: number;
  potentialRevenue: number;
  dropOffRate: number;
  averageTimeInStage: number;
}

export interface AdPerformance {
  platform: AdPlatform;
  metrics: {
    clicks: number;
    impressions: number;
    ctr: number;
    cost: number;
    conversions: number;
    cpc: number;
    cpa: number;
  };
  benchmarks: {
    industryCpc: number;
    industryCtr: number;
    industryCpa: number;
  };
}

// Operations Analytics Types
export interface OperationsKPIs {
  complaints: {
    avgResolutionTime: number;
    previousAvgResolutionTime: number;
    satisfactionRate: number;
    previousSatisfactionRate: number;
  };
  feedback: {
    responseRate: number;
    previousResponseRate: number;
    averageRating: number;
    previousAverageRating: number;
  };
  hiring: {
    newHires: number;
    plannedHires: number;
    onboardingCompletionRate: number;
    previousOnboardingCompletionRate: number;
  };
  costs: {
    current: number;
    budget: number;
    variance: number;
    previousVariance: number;
  };
}

export interface OperationsInsight {
  category: 'COMPLAINTS' | 'FEEDBACK' | 'HIRING' | 'COSTS';
  type: 'SUCCESS' | 'WARNING' | 'INFO';
  metric: string;
  change: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  description: string;
  suggestion?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
} 