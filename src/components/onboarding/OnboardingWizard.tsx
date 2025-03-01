import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  isOptional?: boolean;
}

interface OnboardingWizardProps {
  steps: OnboardingStep[];
  onComplete: () => void;
  onSkip?: () => void;
}

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  steps,
  onComplete,
  onSkip,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCompletedSteps(prev => new Set([...prev, currentStep.id]));
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStepIndex(prev => prev - 1);
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      handleNext();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Progress bar */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${
                      completedSteps.has(step.id)
                        ? 'bg-green-500 text-white'
                        : index === currentStepIndex
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {completedSteps.has(step.id) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`
                      w-24 h-1 mx-2
                      ${
                        completedSteps.has(step.id)
                          ? 'bg-green-500'
                          : 'bg-gray-200'
                      }
                    `}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold mb-2">{currentStep.title}</h2>
          <p className="text-gray-600 mb-6">{currentStep.description}</p>
          <div className="mb-6">{currentStep.component}</div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-between">
          <button
            onClick={handleBack}
            disabled={isFirstStep}
            className={`
              flex items-center px-4 py-2 rounded-md
              ${
                isFirstStep
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }
            `}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </button>
          <div className="flex space-x-3">
            {currentStep.isOptional && (
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isLastStep ? 'Complete' : 'Next'}
              {!isLastStep && <ChevronRight className="w-5 h-5 ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard; 