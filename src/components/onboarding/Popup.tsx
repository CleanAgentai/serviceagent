import React, { useState, useEffect } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface GlobalPopupProps {
  onClose: () => void;
  onDismissPermanently: () => void;
}

export function GlobalPopup({ onClose, onDismissPermanently }: GlobalPopupProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  

  // Load the user's preference on component mount
  useEffect(() => {
    const savedPreference = localStorage.getItem("hide_welcome_popup") === "true";
    setDontShowAgain(savedPreference);
  }, []);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (dontShowAgain) {
        onDismissPermanently();
      } else {
        onClose();
      }
    }, 300);
  };

  const handleGetStarted = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (dontShowAgain) {
        onDismissPermanently();
      } else {
        onClose();
      }
      // Fixed navigation - use the correct getting started route
      navigate("/getting-started"); // Changed from "/dashboard/onboarding"
    }, 300);
  };

  const handleCheckboxChange = () => {
    const newValue = !dontShowAgain;
    setDontShowAgain(newValue);
    // Immediately save preference when changed
    if (newValue) {
      localStorage.setItem("hide_welcome_popup", "true");
    } else {
      localStorage.removeItem("hide_welcome_popup");
    }
  };

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [dontShowAgain]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
      isClosing ? "bg-black/0" : "bg-black/40"
    }`}>
      <div className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 relative transition-all duration-300 ${
        isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}>
        {/* Dismiss (X) Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          onClick={handleDismiss}
          aria-label="Close popup"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3 hyphens-none break-words">
          Welcome to ServiceAgent!
        </h2>
        
        <h4 className="text-sm text-gray-700 leading-relaxed mb-4">
          Let's get your first interview live in a few minutes.
        </h4>

        {/* Body Text */}
        <ul className="text-sm text-gray-700 mb-4 leading-relaxed space-y-2">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Create your interview in 3-5 minutes</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Share it with candidates via link</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">•</span>
            <span>Review AI-scored candidate responses</span>
          </li>
        </ul>

        {/* Checkbox */}
        <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg bg-gray-50">
          <button
            type="button"
            onClick={handleCheckboxChange}
            className={`w-6 h-6 flex items-center justify-center rounded-xl shrink-0 transition-all duration-200 border-2 ${
              dontShowAgain 
                ? 'bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700' 
                : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
            aria-checked={dontShowAgain}
            role="checkbox"
          >
            {dontShowAgain && (
              <Check className="w-4 h-4 text-white" />
            )}
          </button>
          <label 
            className="text-sm text-gray-600 cursor-pointer select-none flex-1"
            onClick={handleCheckboxChange}
          >
            Don't show this again
          </label>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col space-y-3">
          <Button 
            className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" 
            onClick={handleGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-3 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300"
            onClick={handleDismiss}
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
}