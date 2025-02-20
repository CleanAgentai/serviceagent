import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  variant?: 'full' | 'card' | 'inline';
  message?: string;
}

export default function LoadingState({ variant = 'inline', message }: Props) {
  if (variant === 'full') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">{message || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-2" />
          <p className="text-sm text-gray-600">{message || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
      <span className="text-sm text-gray-600">{message || 'Loading...'}</span>
    </div>
  );
} 