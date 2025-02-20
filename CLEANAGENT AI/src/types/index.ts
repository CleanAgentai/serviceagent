// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  type: 'text' | 'file' | 'media';
  createdAt: Date;
  readAt?: Date;
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  value: number;
  createdAt: Date;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'ads' | 'content';
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  budget: number;
  startDate: Date;
  endDate: Date;
  metrics: {
    reach: number;
    engagement: number;
    conversion: number;
  };
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'draft' | 'published' | 'closed';
  applicants: number;
  createdAt: Date;
}

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  rating: number;
  appliedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  startDate: Date;
  endDate: Date;
  teamMembers: string[];
}

export interface Integration {
  id: string;
  name: string;
  type: 'crm' | 'marketing' | 'communication' | 'productivity';
  status: 'connected' | 'disconnected';
  lastSync?: Date;
}

export interface HelpArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  views: number;
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}