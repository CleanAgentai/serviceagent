import { z } from 'zod';
import { isValid as isValidDate } from 'date-fns';

// Common validation schemas
export const emailSchema = z
  .string()
  .email('Please enter a valid email address')
  .min(1, 'Email is required');

export const phoneSchema = z
  .string()
  .regex(
    /^(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    'Please enter a valid phone number'
  )
  .optional();

export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .optional();

export const salarySchema = z.object({
  min: z.number().min(0, 'Minimum salary must be positive'),
  max: z.number().min(0, 'Maximum salary must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  period: z.enum(['HOURLY', 'MONTHLY', 'YEARLY'])
}).refine(data => data.max > data.min, {
  message: 'Maximum salary must be greater than minimum salary',
  path: ['max']
});

// Form validation helpers
export const validateRequired = (value: any, fieldName: string): string | null => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  const result = emailSchema.safeParse(email);
  return result.success ? null : result.error.errors[0].message;
};

export const validatePhone = (phone: string): string | null => {
  const result = phoneSchema.safeParse(phone);
  return result.success ? null : result.error.errors[0].message;
};

export const validateUrl = (url: string): string | null => {
  const result = urlSchema.safeParse(url);
  return result.success ? null : result.error.errors[0].message;
};

export const validateDate = (date: string | Date): string | null => {
  if (!date) return 'Date is required';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return isValidDate(dateObj) ? null : 'Please enter a valid date';
};

// Data validation helpers
export const validateJobPosting = (data: any) => {
  const schema = z.object({
    title: z.string().min(1, 'Job title is required'),
    description: z.string().min(50, 'Description must be at least 50 characters'),
    location: z.string().min(1, 'Location is required'),
    salaryRange: salarySchema,
    jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT']),
    requirements: z.array(z.string()).min(1, 'At least one requirement is needed'),
    responsibilities: z.array(z.string()).min(1, 'At least one responsibility is needed'),
    benefits: z.array(z.string()),
    department: z.string().min(1, 'Department is required'),
    hiringManager: z.string().min(1, 'Hiring manager is required'),
    platforms: z.array(z.enum(['INDEED', 'FACEBOOK', 'CRAIGSLIST', 'LINKEDIN']))
  });

  return schema.safeParse(data);
};

export const validateFeedbackRequest = (data: any) => {
  const schema = z.object({
    type: z.enum(['SURVEY', 'NPS', 'REVIEW', 'CUSTOM']),
    customerSegment: z.string().optional(),
    customers: z.array(z.string()).min(1, 'At least one customer must be selected'),
    questions: z.array(z.object({
      type: z.enum(['RATING', 'TEXT', 'MULTIPLE_CHOICE']),
      question: z.string().min(1, 'Question text is required'),
      options: z.array(z.string()).optional()
    })).min(1, 'At least one question is required'),
    scheduledAt: z.string().refine(date => isValidDate(new Date(date)), {
      message: 'Please enter a valid scheduled date'
    })
  });

  return schema.safeParse(data);
};

export const validateComplaint = (data: any) => {
  const schema = z.object({
    customerId: z.string().min(1, 'Customer ID is required'),
    customerName: z.string().min(1, 'Customer name is required'),
    category: z.enum(['BILLING', 'SERVICE', 'TECHNICAL', 'PRODUCT', 'OTHER']),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    assignedTo: z.string().optional()
  });

  return schema.safeParse(data);
};

// Performance optimization helpers
export interface CacheConfig {
  maxAge: number; // in milliseconds
  maxSize: number; // maximum number of items
}

export class Cache<T> {
  private cache: Map<string, { data: T; timestamp: number }>;
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.cache = new Map();
    this.config = config;
  }

  set(key: string, data: T): void {
    this.cleanup();
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key: string): T | null {
    this.cleanup();
    const item = this.cache.get(key);
    if (!item) return null;
    return item.data;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.config.maxAge) {
        this.cache.delete(key);
      }
    }
    
    if (this.cache.size > this.config.maxSize) {
      const entriesToDelete = this.cache.size - this.config.maxSize;
      const entries = Array.from(this.cache.entries());
      entries
        .sort((a, b) => a[1].timestamp - b[1].timestamp)
        .slice(0, entriesToDelete)
        .forEach(([key]) => this.cache.delete(key));
    }
  }
}

// AI response caching
export const aiResponseCache = new Cache<any>({
  maxAge: 5 * 60 * 1000, // 5 minutes
  maxSize: 100
});

// Data table pagination helper
export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
}

export const getPaginationRange = (config: PaginationConfig) => {
  const { page, pageSize, totalItems } = config;
  const totalPages = Math.ceil(totalItems / pageSize);
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, totalItems);

  return {
    start,
    end,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

// Chart data optimization
export const optimizeChartData = <T extends Record<string, any>>(
  data: T[],
  maxPoints: number = 50
): T[] => {
  if (data.length <= maxPoints) return data;

  const step = Math.ceil(data.length / maxPoints);
  return data.filter((_, index) => index % step === 0);
}; 