import React, { useState } from 'react';
import { X, ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

interface GlobalPopupProps {
  onClose: () => void;
  onDismissPermanently: () => void;
}

export function GlobalPopup({
  onClose,
  onDismissPermanently,
}: GlobalPopupProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const navigate = useNavigate();

  const handleDismiss = () => {
    if (dontShowAgain) {
      onDismissPermanently();
    } else {
      onClose();
    }
  };

  const handleGetStarted = () => {
    if (dontShowAgain) {
      onDismissPermanently();
    } else {
      onClose();
    }
    navigate('/dashboard/onboarding');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        {/* Dismiss (X) Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={handleDismiss}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 whitespace-nowrap hyphens-none break-words">
          Welcome to ServiceAgent!
        </h2>
        <h4 className="text-sm text-gray-700 leading-relaxed mb-4">
          Let's get your first interview live in a few minutes.
        </h4>

        {/* Body Text */}
        <ul className="text-sm text-gray-700 mb-4 leading-relaxed list-disc list-inside pl-4">
          <li>Create your interview</li>
          <li>Share it with candidates</li>
          <li>Review candidate responses</li>
        </ul>

        {/* Checkbox */}
        <div className="flex items-center space-x-3 mb-4">
          <button
            type="button"
            onClick={() => setDontShowAgain(!dontShowAgain)}
            className={`w-6 h-6 flex items-center justify-center rounded-xl shrink-0 transition-colors duration-200 ${
              dontShowAgain
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {dontShowAgain && <Check className="w-4 h-4 text-white" />}
          </button>
          <label
            htmlFor="dont-show-again"
            className="text-sm text-gray-600 cursor-pointer"
            onClick={() => setDontShowAgain(!dontShowAgain)}
          >
            Don't show this again
          </label>
        </div>

        {/* CTA */}
        <Button
          className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
          border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          onClick={handleGetStarted}
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
}
