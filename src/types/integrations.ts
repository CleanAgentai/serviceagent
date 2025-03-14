export type IntegrationType = 'CRM' | 'EMAIL' | 'CALENDAR' | 'SOCIAL' | 'ATS' | 'ANALYTICS';
export type IntegrationStatus = 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'PENDING';

export interface IntegrationConfig {
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  webhookUrl?: string;
  scopes?: string[];
  settings?: Record<string, any>;
}

export interface Integration {
  id: string;
  type: IntegrationType;
  name: string;
  description: string;
  icon: string;
  status: IntegrationStatus;
  config?: IntegrationConfig;
  lastSynced?: Date;
  connectedAt?: Date;
  error?: string;
  metadata?: {
    version?: string;
    features?: string[];
    limits?: Record<string, number>;
    [key: string]: any;
  };
}

export interface IntegrationStats {
  totalConnections: number;
  activeConnections: number;
  failedConnections: number;
  dataTransferred: number;
  lastSync: Date;
  syncHistory: Array<{
    timestamp: Date;
    status: 'SUCCESS' | 'FAILED';
    recordsProcessed: number;
    errors?: string[];
  }>;
}

export interface IntegrationAction {
  id: string;
  type: 'SYNC' | 'IMPORT' | 'EXPORT' | 'WEBHOOK';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  startedAt: Date;
  completedAt?: Date;
  progress?: number;
  error?: string;
  metadata?: Record<string, any>;
}

export interface IntegrationCredentials {
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export interface IntegrationConnection {
  integration: Integration;
  credentials: IntegrationCredentials;
  status: IntegrationStatus;
  error?: string;
} 