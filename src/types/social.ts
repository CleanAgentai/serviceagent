import { LucideIcon } from 'lucide-react';

export type Platform = 'FACEBOOK' | 'TWITTER' | 'LINKEDIN' | 'INSTAGRAM';

export interface SocialPost {
  id: string;
  content: string;
  platforms: Platform[];
  scheduledTime: Date;
  hashtags: string[];
  images: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  analytics?: {
    likes: number;
    shares: number;
    comments: number;
    reach: number;
    engagement: number;
  };
  error?: string;
}

export interface PlatformConfig {
  platform: Platform;
  connected: boolean;
  lastSynced?: Date;
  error?: string;
}

export const platformIcons: Record<Platform, LucideIcon> = {
  FACEBOOK: () => null,
  TWITTER: () => null,
  LINKEDIN: () => null,
  INSTAGRAM: () => null,
};

export interface ContentSuggestion {
  id: string;
  content: string;
  platforms: Platform[];
  hashtags: string[];
  type: 'text' | 'image' | 'video';
  score: number;
  reasoning: string;
}

export interface PostMetrics {
  postId: string;
  platform: Platform;
  likes: number;
  comments: number;
  shares: number;
  clicks: number;
  reach: number;
  engagement: number;
  timestamp: Date;
}

export interface PostingTimeRecommendation {
  platform: Platform;
  dayOfWeek: number;
  hour: number;
  expectedEngagement: number;
  confidence: number;
  audienceActivity: number;
  competitorActivity: number;
}

export interface SocialMediaStats {
  platform: Platform;
  followers: number;
  following: number;
  totalPosts: number;
  averageEngagement: number;
  topPerformingTimes: {
    dayOfWeek: number;
    hour: number;
    engagement: number;
  }[];
  recentGrowth: {
    followers: number;
    engagement: number;
    period: 'day' | 'week' | 'month';
  };
}

export interface HashtagAnalytics {
  tag: string;
  volume: number;
  engagement: number;
  relevance: number;
  trending: boolean;
  relatedTags: string[];
  competitorUsage: number;
} 