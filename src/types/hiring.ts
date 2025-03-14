import { ReactNode } from 'react';

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT';
export type JobPlatform = 'INDEED' | 'FACEBOOK' | 'CRAIGSLIST' | 'LINKEDIN';
export type InterviewType = 'VIDEO';
export type CandidateStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEWED' | 'OFFERED' | 'ACCEPTED' | 'REJECTED' | 'HIRED';
export type PostingStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'EXPIRED' | 'FILLED';
export type BackgroundCheckStatus = 'NOT_STARTED' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type DocumentStatus = 'SIGNED' | 'VIEWED' | 'SENT' | 'EXPIRED';

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  period: 'HOURLY' | 'MONTHLY' | 'YEARLY';
}

export interface CompensationDetails {
  salary: SalaryRange;
  benefits: {
    id: string;
    name: string;
    description: string;
    category: 'HEALTH' | 'FINANCIAL' | 'LIFESTYLE' | 'OTHER';
  }[];
  additionalPerks?: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  description: string;
  location: string;
  compensation: CompensationDetails;
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
  applicationUrl?: string;
  candidateUrls: {
    candidateId: string;
    interviewUrl: string;
    status: 'PENDING' | 'ACTIVE' | 'EXPIRED';
    createdAt: string;
    expiresAt: string;
  }[];
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

export interface InterviewQuestion {
  id: string;
  text: string;
  type: 'TECHNICAL' | 'BEHAVIORAL' | 'EXPERIENCE';
  expectedAnswer?: string;
  score?: number;
  feedback?: string;
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
  questions?: InterviewQuestion[];
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
  status: BackgroundCheckStatus;
  documents: {
    id: string;
    name: string;
    status: DocumentStatus;
    url?: string;
  }[];
  initiatedAt?: string;
  estimatedCompletionDate?: string;
  results?: {
    passed: boolean;
    summary: string;
    flags: string[];
    reportUrl: string;
  };
}

export interface OnboardingDocument {
  id: string;
  name: string;
  status: 'pending' | 'completed';
  url?: string;
  type?: string;
  description?: string;
}

export interface NotificationLog {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: string;
  read: boolean;
}

export type NotificationType = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';

export interface HiringMetrics {
  openPositions: number;
  activeApplications: number;
  interviewsScheduled: number;
  hiringRate: number;
  insights: string[];
  funnel: {
    stage: CandidateStatus;
    count: number;
    dropOffRate: number;
    averageDuration: number;
    applications?: number;
    screenings?: number;
    interviews?: number;
    offers?: number;
    rejections?: number;
  }[];
  overview: {
    totalApplications: number;
    previousTotalApplications: number;
    avgTimeToHire: number;
    previousAvgTimeToHire: number;
    offerAcceptanceRate: number;
    previousOfferAcceptanceRate: number;
    costPerHire: number;
    previousCostPerHire: number;
  };
  quality: {
    highQuality: number;
    mediumQuality: number;
    lowQuality: number;
  };
  timeSeries: Array<{
    date: string;
    applications: number;
    interviews: number;
    offers: number;
    hires: number;
  }>;
  aiInsights?: Array<{
    title: string;
    description: string;
    recommendation?: string;
  }>;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  appliedFor: string;
  currentStatus: CandidateStatus;
  location?: string;
  tags?: string[];
  aiScore?: number;
  experience: Array<{
    company: string;
    title: string;
    startDate: string;
    endDate?: string;
    description: string;
  }>;
  skills: string[];
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationYear: number;
  }>;
  evaluation?: {
    technicalScore: number;
    culturalScore: number;
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
    notes: string;
  };
  interviews: Array<{
    id: string;
    type: 'screening' | 'technical' | 'cultural' | 'final';
    scheduledAt: Date;
    interviewerId: string;
    status: 'completed' | 'scheduled' | 'cancelled';
    feedback?: {
      rating: number;
      strengths: string[];
      weaknesses: string[];
      notes: string;
    };
    questions?: Array<{
      id: string;
      question: string;
      answer?: string;
      rating?: number;
      notes?: string;
    }>;
  }>;
  references?: Array<{
    name: string;
    position: string;
    company: string;
    phone: string;
    email: string;
    relationship: string;
    feedback?: string;
    notes?: string;
  }>;
  notes?: Array<{
    id: string;
    content: string;
    createdAt: string;
    createdBy: string;
  }>;
  onboarding?: {
    progress: number;
    documents: Array<{
      id: string;
      name: string;
      status: 'pending' | 'completed';
      url?: string;
    }>;
  };
  notifications?: Array<{
    id: string;
    type: 'offer' | 'rejection' | 'interview' | 'document';
    message: string;
    createdAt: string;
    read: boolean;
  }>;
  createdAt: string;
  updatedAt?: string;
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

export interface CandidateDetailModalProps {
  isOpen: boolean;
  candidate: Candidate;
  onClose: () => void;
}

export interface VideoChatProps {
  isOpen: boolean;
  candidateName: string;
  jobTitle: string;
  interviewerName: string;
  onClose: () => void;
} 