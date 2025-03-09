export type Platform = 'instagram' | 'twitter' | 'facebook' | 'linkedin';

export interface SocialPost {
  id: string;
  content: string;
  platforms: Platform[];
  scheduledTime: Date;
  hashtags: string[];
  images: string[];
  metrics?: {
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
    reach: number;
    engagement: number;
  };
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  publishedUrl?: string;
  error?: string;
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

export interface ContentSuggestion {
  content: string;
  hashtags: string[];
  platforms: Platform[];
  estimatedEngagement: number;
  targetAudience: string[];
  mediaRecommendations?: {
    type: 'image' | 'video' | 'carousel';
    description: string;
  }[];
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