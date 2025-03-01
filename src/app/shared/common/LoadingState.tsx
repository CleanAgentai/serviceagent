import React from 'react';

interface LoadingStateProps {
  variant?: 'full' | 'inline';
  message?: string;
}

export function LoadingState({ 
  variant = 'inline',
  message = 'Loading...'
}: LoadingStateProps) {
  if (variant === 'full') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
      <p className="ml-2 text-gray-600">{message}</p>
    </div>
  );
} 