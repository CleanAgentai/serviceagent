import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface GlobalPopupProps {
  onClose: () => void;
  onDismissPermanently: () => void;
}

export function GlobalPopup({ onClose, onDismissPermanently }: GlobalPopupProps) {
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
    navigate("/dashboard/onboarding");
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
        <h2 className="text-xl font-semibold mb-3">Welcome to ServiceAgent!</h2>

        {/* Body Text */}
        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          Let's get you set up in just a few quick steps. <br />
          ServiceAgent helps you streamline hiring using AI-powered interviews.
          Follow our simple onboarding process to create your first interview,
          share it with candidates, and review responses.
        </p>

        {/* Checkbox */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            id="dont-show-again"
            className="form-checkbox"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
          />
          <label htmlFor="dont-show-again" className="text-sm text-gray-600">
            Don't show this again
          </label>
        </div>

        {/* CTA */}
        <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" onClick={handleGetStarted}>
          Get Started
        </Button>
      </div>
    </div>
  );
}
