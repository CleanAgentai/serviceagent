export type ReferralStatus = 'pending' | 'contacted' | 'qualified' | 'converted' | 'lost';

export interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  referrerEmail: string;
  referredName: string;
  referredEmail: string;
  referredPhone?: string;
  referredCompany?: string;
  status: ReferralStatus;
  notes?: string;
  createdAt: Date;
  lastUpdated: Date;
  rewardAmount?: number;
  rewardStatus?: 'pending' | 'paid' | 'cancelled';
  conversionValue?: number;
  tags?: string[];
}

export type RewardType = 'monetary' | 'coupon' | 'gift' | 'points';

export interface ReferralProgramSettings {
  rewardType: RewardType;
  rewardAmount: number;
  minimumPurchaseAmount: number;
  expirationDays: number;
  autoGenerateLinks: boolean;
  eligibilityRules: {
    mustBeCustomer: boolean;
    minimumPurchases: number;
    accountAgeDays: number;
  };
  doubleRewards: boolean;
  customMessage: string;
}

export interface ReminderTemplate {
  subject: string;
  body: string;
  previewText: string;
  variables?: {
    [key: string]: string;
  };
}

export interface ReminderSchedule {
  id: string;
  frequency: 'monthly' | 'quarterly';
  dayOfMonth: number;
  template: ReminderTemplate;
  enabled: boolean;
  lastSent: Date | null;
  targetAudience: 'all' | 'active' | 'inactive' | 'high_value';
}

export interface ReferralStats {
  totalReferrals: number;
  activeReferrers: number;
  conversionRate: number;
  totalRewards: number;
  averageReward: number;
  topReferrers: {
    referrerId: string;
    name: string;
    referralCount: number;
    conversionRate: number;
    totalRewards: number;
  }[];
  monthlyStats: {
    month: string;
    referrals: number;
    conversions: number;
    rewards: number;
  }[];
}

export interface ReferralLink {
  id: string;
  referrerId: string;
  code: string;
  url: string;
  createdAt: Date;
  expiresAt: Date | null;
  clicks: number;
  conversions: number;
  isActive: boolean;
}

export interface ReferralCampaign {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  rewardMultiplier: number;
  targetAudience: string[];
  isActive: boolean;
  stats: {
    participants: number;
    referrals: number;
    conversions: number;
    totalRewards: number;
  };
} 