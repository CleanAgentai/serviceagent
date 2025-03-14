import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export type Platform = 'Twitter' | 'LinkedIn' | 'Facebook' | 'Instagram';

export type MediaType = 'video' | 'image' | 'carousel';

export interface SocialPost {
  id: string;
  content: string;
  platforms: Platform[];
  scheduledTime: Date;
  hashtags: string[];
  images: string[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  };
  metadata?: Record<string, any>;
}

export interface PlatformConfig {
  platform: Platform;
  connected: boolean;
  lastSynced?: Date;
  error?: string;
}

export const platformIcons: Record<Platform, any> = {
  Twitter: 'twitter',
  LinkedIn: 'linkedin',
  Facebook: 'facebook',
  Instagram: 'instagram'
};

export interface MediaRecommendation {
  type: MediaType;
  description: string;
}

export interface ContentSuggestion {
  id: string;
  type: 'post';
  content: string;
  hashtags: string[];
  platforms: Platform[];
  estimatedEngagement: number;
  targetAudience: string[];
  mediaRecommendations: MediaRecommendation[];
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
  bestTimes: string[];
  timezone: string;
  reasoning: string;
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
  hashtag: string;
  popularity: number;
  reachPotential: number;
  relevanceScore: number;
  trending: boolean;
} 