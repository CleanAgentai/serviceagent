import { ReactNode } from 'react';

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
export type JobPlatform = 'INDEED' | 'FACEBOOK' | 'CRAIGSLIST' | 'LINKEDIN';
export type InterviewType = 'CHAT' | 'VIDEO';
export type CandidateStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEWED' | 'OFFERED' | 'REJECTED' | 'ACCEPTED';
export type PostingStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'EXPIRED' | 'FILLED';
export type BackgroundCheckStatus = 'NOT_STARTED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type DocumentStatus = 'NOT_SENT' | 'SENT' | 'VIEWED' | 'SIGNED' | 'EXPIRED';
export type NotificationType = 'OFFER' | 'REJECTION' | 'BACKGROUND_CHECK' | 'DOCUMENT_REQUEST';

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'HOURLY' | 'MONTHLY' | 'YEARLY';
}

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  location: string;
  salaryRange: SalaryRange;
  jobType: JobType;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  platforms: {
    platform: JobPlatform;
    status: 'PENDING' | 'POSTED' | 'FAILED';
    postingId?: string;
    postingUrl?: string;
    error?: string;
  }[];
  status: PostingStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  applicantCount: number;
  department: string;
  hiringManager: string;
}

export interface InterviewScenario {
  id: string;
  title: string;
  description: string;
  type: 'CUSTOMER_SERVICE' | 'TECHNICAL' | 'BEHAVIORAL' | 'ROLEPLAY';
  difficulty: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  questions: {
    id: string;
    text: string;
    expectedPoints: string[];
    followUps: string[];
  }[];
  roleplayPrompt?: string;
}

export interface InterviewSession {
  id: string;
  candidateId: string;
  jobPostingId: string;
  type: InterviewType;
  scenarioId?: string;
  startTime: string;
  endTime?: string;
  transcript: {
    timestamp: string;
    speaker: 'AI' | 'CANDIDATE';
    message: string;
  }[];
  evaluation: InterviewEvaluation;
  recordingUrl?: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export interface InterviewEvaluation {
  overallScore: number;
  categories: {
    name: string;
    score: number;
    feedback: string;
  }[];
  strengths: string[];
  improvements: string[];
  flags: string[];
  aiNotes: string;
  managerNotes?: string;
}

export interface BackgroundCheck {
  id: string;
  candidateId: string;
  status: BackgroundCheckStatus;
  provider: string;
  initiatedAt: string;
  estimatedCompletionDate?: string;
  completedAt?: string;
  results?: {
    passed: boolean;
    summary: string;
    flags: string[];
    reportUrl: string;
  };
  error?: string;
}

export interface OnboardingDocument {
  id: string;
  candidateId: string;
  type: 'CONTRACT' | 'W4' | 'I9' | 'DIRECT_DEPOSIT' | 'NDA' | 'BENEFITS' | 'CUSTOM';
  title: string;
  description: string;
  status: DocumentStatus;
  docusignId?: string;
  documentUrl: string;
  sentAt?: string;
  viewedAt?: string;
  signedAt?: string;
  expiresAt?: string;
  reminder?: {
    lastSent: string;
    nextScheduled: string;
    count: number;
  };
}

export interface NotificationLog {
  id: string;
  candidateId: string;
  type: NotificationType;
  channel: 'EMAIL' | 'SMS';
  templateId: string;
  status: 'SENT' | 'DELIVERED' | 'FAILED';
  sentAt: string;
  deliveredAt?: string;
  error?: string;
  metadata: {
    subject?: string;
    preview: string;
    recipientEmail?: string;
    recipientPhone?: string;
  };
}

export interface HiringMetrics {
  timeRange: {
    start: string;
    end: string;
  };
  funnel: {
    stage: CandidateStatus;
    count: number;
    dropOffRate: number;
    averageDuration: number;
  }[];
  platformMetrics: {
    platform: JobPlatform;
    metrics: {
      applicants: number;
      qualified: number;
      hired: number;
      averageScore: number;
      costPerHire: number;
    };
  }[];
  insights: {
    type: 'SUCCESS' | 'WARNING' | 'IMPROVEMENT';
    message: string;
    metric: string;
    recommendation: string;
  }[];
  trends: {
    date: string;
    applications: number;
    interviews: number;
    offers: number;
    acceptances: number;
  }[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  resumeUrl: string;
  appliedFor: string;
  currentStatus: CandidateStatus;
  interviews: InterviewSession[];
  aiScore?: number;
  tags: string[];
  notes: {
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }[];
  references?: {
    name: string;
    relationship: string;
    contact: string;
    notes?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  backgroundCheck?: BackgroundCheck;
  onboarding?: {
    documents: OnboardingDocument[];
    progress: number;
    startDate?: string;
    completedAt?: string;
  };
  notifications: NotificationLog[];
}

export interface JobPostFormData {
  title: string;
  description: string;
  location: string;
  salaryRange: SalaryRange;
  jobType: JobType;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  platforms: JobPlatform[];
  department: string;
  hiringManager: string;
  expiresAt?: string;
} 