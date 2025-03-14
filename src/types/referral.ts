export type ReferralStatus = 'pending' | 'contacted' | 'qualified' | 'converted' | 'rejected';

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
  updatedAt: Date;
  convertedAt?: Date;
  reward?: {
    type: 'cash' | 'points' | 'gift';
    amount: number;
    status: 'pending' | 'approved' | 'paid';
    paidAt?: Date;
  };
  metadata?: {
    source?: string;
    campaign?: string;
    [key: string]: any;
  };
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

export interface ReferralProgram {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  rewards: Array<{
    type: 'cash' | 'points' | 'gift';
    amount: number;
    conditions?: {
      minPurchaseAmount?: number;
      validDays?: number;
      maxRewards?: number;
    };
  }>;
  rules: {
    maxReferrals?: number;
    validDays?: number;
    restrictions?: string[];
  };
  startDate: Date;
  endDate?: Date;
}

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  conversionRate: number;
  totalRewards: number;
  averageRewardValue: number;
  timeSeries: Array<{
    date: Date;
    referrals: number;
    conversions: number;
    rewards: number;
  }>;
  topReferrers: Array<{
    id: string;
    name: string;
    referrals: number;
    conversions: number;
    totalRewards: number;
  }>;
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