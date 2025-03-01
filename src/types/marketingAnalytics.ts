export interface ChannelMetrics {
  reach: number;
  engagement: number;
  leads: number;
  conversions: number;
  conversionRate: number;
}

export interface PeriodComparison {
  current: number;
  previous: number;
  percentageChange: number;
}

export interface ChannelPerformance extends Record<keyof ChannelMetrics, PeriodComparison> {
  channel: 'email' | 'sms' | 'social' | 'referral';
}

export interface TimeSeriesData {
  timestamp: Date;
  email: number;
  sms: number;
  social: number;
  referral: number;
}

export interface MarketingAnalytics {
  overview: {
    totalReach: PeriodComparison;
    totalEngagement: PeriodComparison;
    totalLeads: PeriodComparison;
    totalConversions: PeriodComparison;
    averageConversionRate: PeriodComparison;
  };
  channelPerformance: ChannelPerformance[];
  timeSeriesData: {
    reach: TimeSeriesData[];
    engagement: TimeSeriesData[];
    leads: TimeSeriesData[];
    conversions: TimeSeriesData[];
  };
  aiInsights: {
    summary: string[];
    suggestions: {
      channel: string;
      suggestion: string;
      confidence: number;
      potentialImpact: string;
    }[];
  };
}

export interface BestTimeToSend {
  channel: 'email' | 'sms' | 'social';
  dayOfWeek: number;
  hourOfDay: number;
  expectedEngagement: number;
  confidence: number;
} 