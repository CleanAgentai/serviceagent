import { 
  Integration, 
  IntegrationConnection, 
  IntegrationCredentials, 
  IntegrationStatus 
} from '../../types/integrations';

class IntegrationsService {
  private static instance: IntegrationsService;
  private connections: Map<string, IntegrationConnection>;

  private constructor() {
    this.connections = new Map();
  }

  public static getInstance(): IntegrationsService {
    if (!IntegrationsService.instance) {
      IntegrationsService.instance = new IntegrationsService();
    }
    return IntegrationsService.instance;
  }

  public async connectIntegration(
    integration: Integration,
    credentials: IntegrationCredentials
  ): Promise<IntegrationConnection> {
    try {
      // Validate credentials
      await this.validateCredentials(integration, credentials);

      // Create connection
      const connection: IntegrationConnection = {
        integration: {
          ...integration,
          status: 'CONNECTED',
          connectedAt: new Date(),
          lastSynced: new Date()
        },
        credentials,
        status: 'CONNECTED'
      };

      // Store connection
      this.connections.set(integration.id, connection);

      // Trigger initial sync
      await this.syncIntegration(integration.id);

      return connection;
    } catch (error: unknown) {
      const failedConnection: IntegrationConnection = {
        integration: {
          ...integration,
          status: 'ERROR',
          error: error instanceof Error ? error.message : 'An unknown error occurred'
        },
        credentials,
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };

      this.connections.set(integration.id, failedConnection);
      return failedConnection;
    }
  }

  public async disconnectIntegration(integrationId: string): Promise<void> {
    const connection = this.connections.get(integrationId);
    if (!connection) {
      throw new Error('Integration not found');
    }

    try {
      // Revoke access tokens if applicable
      if (connection.credentials.accessToken) {
        await this.revokeAccess(connection);
      }

      // Update connection status
      connection.status = 'DISCONNECTED';
      connection.integration.status = 'DISCONNECTED';
      connection.integration.connectedAt = undefined;
      connection.integration.lastSynced = undefined;

      this.connections.set(integrationId, connection);
    } catch (error: unknown) {
      throw new Error(`Failed to disconnect integration: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  public async syncIntegration(integrationId: string): Promise<void> {
    const connection = this.connections.get(integrationId);
    if (!connection) {
      throw new Error('Integration not found');
    }

    try {
      // Refresh token if needed
      if (this.shouldRefreshToken(connection.credentials)) {
        await this.refreshToken(connection);
      }

      // Perform sync based on integration type
      switch (connection.integration.type) {
        case 'EMAIL':
          await this.syncEmailIntegration(connection);
          break;
        case 'CRM':
          await this.syncCRMIntegration(connection);
          break;
        // Add other integration types here
        default:
          throw new Error(`Unsupported integration type: ${connection.integration.type}`);
      }

      // Update last synced timestamp
      connection.integration.lastSynced = new Date();
      this.connections.set(integrationId, connection);
    } catch (error: unknown) {
      connection.status = 'ERROR';
      connection.error = error instanceof Error ? error.message : 'An unknown error occurred';
      this.connections.set(integrationId, connection);
      throw error;
    }
  }

  public getIntegrationStatus(integrationId: string): IntegrationStatus {
    const connection = this.connections.get(integrationId);
    return connection?.status || 'DISCONNECTED';
  }

  public getConnection(integrationId: string): IntegrationConnection | undefined {
    return this.connections.get(integrationId);
  }

  public getAllConnections(): IntegrationConnection[] {
    return Array.from(this.connections.values());
  }

  private async validateCredentials(
    integration: Integration,
    credentials: IntegrationCredentials
  ): Promise<void> {
    // Implement validation logic based on integration type
    switch (integration.type) {
      case 'EMAIL':
        if (!credentials.apiKey) {
          throw new Error('API key is required for email integration');
        }
        break;
      case 'CRM':
        if (!credentials.clientId || !credentials.clientSecret) {
          throw new Error('Client ID and secret are required for CRM integration');
        }
        break;
      // Add validation for other integration types
    }
  }

  private shouldRefreshToken(credentials: IntegrationCredentials): boolean {
    if (!credentials.expiresAt) return false;
    const expirationBuffer = 5 * 60 * 1000; // 5 minutes
    return new Date(credentials.expiresAt).getTime() - expirationBuffer < Date.now();
  }

  private async refreshToken(connection: IntegrationConnection): Promise<void> {
    try {
      // Implement token refresh logic
      // This is a placeholder - actual implementation would depend on the integration
      const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: connection.credentials.refreshToken,
          integrationId: connection.integration.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const { accessToken, refreshToken, expiresAt } = await response.json();
      connection.credentials = {
        ...connection.credentials,
        accessToken,
        refreshToken,
        expiresAt: new Date(expiresAt)
      };
    } catch (error: unknown) {
      throw new Error(`Token refresh failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async revokeAccess(connection: IntegrationConnection): Promise<void> {
    // Implement token revocation logic
    // This is a placeholder - actual implementation would depend on the integration
    try {
      const response = await fetch('/api/revoke-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          accessToken: connection.credentials.accessToken,
          integrationId: connection.integration.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to revoke access');
      }
    } catch (error: unknown) {
      throw new Error(`Failed to revoke access: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async syncEmailIntegration(connection: IntegrationConnection): Promise<void> {
    // Implement email integration sync logic
    console.log('Syncing email integration...', connection);
  }

  private async syncCRMIntegration(connection: IntegrationConnection): Promise<void> {
    // Implement CRM integration sync logic
    console.log('Syncing CRM integration...', connection);
  }
}

export const integrationsService = IntegrationsService.getInstance(); 