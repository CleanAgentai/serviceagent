export type IntegrationType = 
  | 'EMAIL' 
  | 'CRM' 
  | 'CALENDAR' 
  | 'MESSAGING' 
  | 'SOCIAL_MEDIA' 
  | 'ANALYTICS' 
  | 'PAYMENT' 
  | 'STORAGE';

export type IntegrationStatus = 'CONNECTED' | 'DISCONNECTED' | 'PENDING' | 'ERROR';

export interface IntegrationConfig {
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  scopes?: string[];
  customFields?: Record<string, string>;
}

export interface Integration {
  id: string;
  type: IntegrationType;
  name: string;
  description: string;
  status: IntegrationStatus;
  icon: string;
  config?: IntegrationConfig;
  lastSynced?: Date;
  connectedAt?: Date;
  error?: string;
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