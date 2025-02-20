export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export class AgentError extends AppError {
  constructor(message: string, public agentId?: string) {
    super(message);
    this.name = 'AgentError';
  }
}

export class StorageError extends AppError {
  constructor(message: string, public key?: string) {
    super(message);
    this.name = 'StorageError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function createErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }
  if (error instanceof Error) {
    return new AppError(error.message);
  }
  return new AppError(createErrorMessage(error));
} 