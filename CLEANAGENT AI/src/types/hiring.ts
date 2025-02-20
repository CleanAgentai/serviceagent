export type JobStatus = 'active' | 'draft' | 'closed' | 'published';
export type CandidateStatus = 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected' | 'applied' | 'offered';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'remote';
export type Priority = 'low' | 'medium' | 'high';

export interface Experience {
  years: number;
  level: string;
  details?: string;
}

export interface Salary {
  min: number;
  max: number;
  currency: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface Interview {
  date: string;
  type: string;
  interviewer: string;
  feedback: string;
  score: number;
}

export interface Job {
  id: string | number;
  title: string;
  department: string;
  location: string;
  type: JobType;
  status: JobStatus;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: Salary;
  applicants: Candidate[];
  qualified: Candidate[];
  interviews: Candidate[];
  offers: Candidate[];
  createdAt: string;
  closingDate: string;
  updatedAt: string;
  priority: Priority;
  views?: number;
  posted?: string;
}

export interface Candidate {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: CandidateStatus;
  experience: Experience;
  skills: string[];
  education?: string[];
  salary: Salary;
  resume?: string;
  coverLetter?: string;
  appliedDate: string;
  createdAt: string;
  lastUpdated: string;
  notes?: string;
  location?: string;
  source?: string;
  rating?: number;
  interviews?: Interview[];
  lastContact?: string;
  nextStep?: string;
}

export interface JobFilters {
  department?: string[];
  location?: string[];
  status?: JobStatus[];
  type?: JobType[];
  datePosted?: {
    start: string;
    end: string;
  };
  salary?: Salary;
}

export interface CandidateFilters {
  role?: string[];
  status?: CandidateStatus[];
  skills?: string[];
  location?: string[];
  experience?: Experience;
  salary?: Salary;
}

export interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: Salary;
  closingDate: string;
}

export interface HiringMetrics {
  openPositions: number;
  totalCandidates: number;
  activeInterviews: number;
  timeToHire: number;
  offerAcceptanceRate: number;
  costPerHire: number;
  qualifiedRate: number;
  candidateExperience: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export const departments = [
  'Engineering',
  'Product',
  'Design',
  'Marketing',
  'Sales',
  'Customer Support',
  'HR',
  'Finance',
  'Legal',
  'Operations'
] as const;

export const employmentTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Remote'
] as const;

export const experienceLevels = [
  'Entry Level',
  'Junior',
  'Mid-Level',
  'Senior',
  'Lead',
  'Manager',
  'Director',
  'Executive'
] as const;

export const candidateStatuses = [
  'new',
  'screening',
  'interview',
  'offer',
  'hired',
  'rejected',
  'applied',
  'offered'
] as const;

export const jobStatuses = [
  'active',
  'draft',
  'closed',
  'published'
] as const;

export const jobTypes = [
  'full-time',
  'part-time',
  'contract',
  'remote'
] as const;

export const priorityLevels = [
  'low',
  'medium',
  'high'
] as const; 