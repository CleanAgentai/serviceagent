import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Rocket,
  CheckCircle,
  ClipboardCopy,
  Copy,
  User,
  Pencil,
  Plug,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/providers/AuthContext";
import { Button } from "@/components/ui/button";
import { VideoEmbed } from "../ui/video";
import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Settings } from "lucide-react";

export const useConfetti = () => {
  const triggerConfetti = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 1000,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return triggerConfetti;
};

const steps = [
  { id: "create", title: "Create Interview", icon: Rocket },
  { id: "copy", title: "Share Interview Link", icon: ClipboardCopy },
  { id: "candidate", title: "First Candidate", icon: User },
  { id: "edit", title: "Edit Interview Link (Optional)", icon: Pencil },
  { id: "connect", title: "Connect ATS (Optional)", icon: Plug },
];

function ResponsiveVideo({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative min-w-80 max-w-4xl aspect-[16/9] bg-card border-2 border-primary/20 rounded-3xl shadow-3xl overflow-hidden hover:border-primary/40 hover:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-500 max-sm:pb-[54.270833333333336%]">
      <iframe
        src={src}
        title={title}
        className="absolute aspect-[16/9] w-full border-0 top-0 left-0 h-full"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function GettingStarted() {
  const triggerConfetti = useConfetti();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState("create");
  const [showResetOption, setShowResetOption] = useState(false);

  const resetPopupPreference = () => {
    localStorage.removeItem("hide_welcome_popup");
    sessionStorage.removeItem("hide_welcome_popup_this_session");
    alert("Popup preference reset! The welcome popup will show again.");
    setShowResetOption(false);
  };

  // Completion states
  const [firstInterviewId, setFirstInterviewId] = useState<string | null>(null);
  const [companyProfileId, setCompanyProfileId] = useState<string | null>(null);
  const [completionBitmask, setCompletionBitmask] = useState("0000");

  const [hasCandidate, setHasCandidate] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load all status info once
  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("company_profiles")
        .select("id, first_interview_id, completion_bitmask")
        .eq("created_by_user_id", user.id)
        .single();

      const interviewId = profile?.first_interview_id;
      setFirstInterviewId(interviewId);
      setCompanyProfileId(profile?.id ?? null);
      setCompletionBitmask(profile?.completion_bitmask ?? "0000");

      if (interviewId) {
        const { data: interview } = await supabase
          .from("interviews")
          .select("willo_interview_key")
          .eq("id", interviewId)
          .single();

        const willoKey = interview?.willo_interview_key;

        if (willoKey) {
          const { data: attempts } = await supabase
            .from("interview_attempts")
            .select("id")
            .eq("interview_id", willoKey)
            .limit(1);

          if (attempts?.[0]) {
            setHasCandidate(true);
            setAttemptId(attempts[0].id);
          }
        }
      }

      setLoading(false);
    };

    fetchStatus();
  }, [user]);

  const isCompleted = {
    create: !!firstInterviewId,
    copy: completionBitmask[0] === "1",
    candidate: completionBitmask[1] === "1",
    edit: completionBitmask[2] === "1",
    connect: completionBitmask[3] === "1",
  };

  const updateBitmask = async (index: number, newValue: boolean) => {
    if (!companyProfileId) return;

    const newBits = completionBitmask.split("");
    newBits[index] = newValue ? "1" : "0";
    const updated = newBits.join("");

    setCompletionBitmask(updated);

    // Only trigger confetti when completing a task, not when unchecking
    if (newValue) {
      triggerConfetti();
    }

    await supabase
      .from("company_profiles")
      .update({ completion_bitmask: updated })
      .eq("id", companyProfileId);
  };

  const getStepBitmaskIndex = (stepId: string): number => {
    const stepMapping: { [key: string]: number } = {
      create: 0,    // This should already be completed when interview is created
      copy: 0,      // Bitmask index 0
      candidate: 1, // Bitmask index 1
      edit: 2,      // Bitmask index 2
      connect: 3,   // Bitmask index 3
    };
    return stepMapping[stepId];
  };  

  const resetAllProgress = async () => {
    if (!companyProfileId) return;

    // Reset bitmask to all zeros
    const resetBitmask = "0000";
    setCompletionBitmask(resetBitmask);
    
    // Update in database
    await supabase
      .from("company_profiles")
      .update({ 
        completion_bitmask: resetBitmask,
      })
      .eq("id", companyProfileId);

    // Reset local states
    setHasCandidate(false);
    setAttemptId(null);
  };

  const toggleStepCompletion = (stepId: string) => {
    const stepIndex = getStepBitmaskIndex(stepId);
    const isStepCompleted = isCompleted[stepId as keyof typeof isCompleted];
    
    // Toggle the completion status
    updateBitmask(stepIndex, !isStepCompleted);
  };

  return (
    <div className="flex h-fill">
      <aside className="w-48 border-r p-4 pl-0 bg-transparent">
        <h2 className="text-xl text-left font-semibold mb-2 hyphens-none break-words">Getting Started</h2>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed hyphens-none break-words">
          Follow these quick steps to set up ServiceAgent and start hiring with AI.
        </p>
{/*         
        <button
          onClick={resetAllProgress}
          className="text-xs text-gray-500 hover:text-red-600 transition-colors duration-200 mb-4"
          title="Reset all progress"
        >
          Reset All Progress
        </button> */}
        
        <ul className="space-y-4">
          {steps.map(({ id, title, icon: Icon }) => {
            const isStepCompleted = isCompleted[id as keyof typeof isCompleted];
            const isActiveStep = activeStep === id;
            
            return (
              <li
                key={id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition ${
                  isActiveStep
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                <div 
                  className="flex items-center space-x-2 flex-1"
                  onClick={() => setActiveStep(id)}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm break-words hyphens-none whitespace-wrap pr-4">
                    {title}
                  </span>
                </div>
                
                {/* Checkbox - Only enabled when step is active */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (isActiveStep) {
                      toggleStepCompletion(id);
                    }
                  }}
                  className={`w-6 h-6 flex items-center justify-center rounded-xl shrink-0 transition-all duration-300 ${
                    isStepCompleted 
                      ? 'bg-green-600 hover:bg-red-600 cursor-pointer' 
                      : isActiveStep
                      ? 'bg-gray-200 hover:bg-gray-300 cursor-pointer hover:scale-110'
                      : 'bg-gray-100 cursor-not-allowed opacity-50'
                  }`}
                  title={
                    !isActiveStep 
                      ? "Select this step to mark as complete" 
                      : isStepCompleted 
                      ? "Click to mark as incomplete" 
                      : "Click to mark as complete"
                  }
                  disabled={!isActiveStep}
                >
                  {isStepCompleted && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="flex-1 p-6 min-w-0">
        {activeStep === "create" && <CreateInterview hasInterview={!!firstInterviewId} setActiveStep={setActiveStep} />}
        {activeStep === "copy" && (
          <CopyInterviewLink
            firstInterviewId={firstInterviewId}
            onComplete={() => updateBitmask(0, true)}
          />
        )}
        {activeStep === "candidate" && (
          <FirstCandidate
            hasCandidate={hasCandidate}
            attemptId={attemptId}
            onComplete={() => updateBitmask(1, true)}
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === "edit" && (
          <EditInterview
            firstInterviewId={firstInterviewId}
            onComplete={() => updateBitmask(2, true)}
          />
        )}
        {activeStep === "connect" && (
          <ConnectATS onComplete={() => updateBitmask(3, true)} />
        )}
      </main>
    </div>
  );
}

function CreateInterview({ hasInterview, setActiveStep }: { hasInterview: boolean; setActiveStep: (step: string) => void }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">Step 1: Create Your First Interview</h2>
      <h3 className="text-md text-left text-gray-700 mb-8 hyphens-none break-words">This only takes 3–5 minutes. We'll guide you through the basics, and you can customize later.</h3>
      <ResponsiveVideo src="https://www.loom.com/embed/92a3d28944824836b1972930104e3ffc?sid=1a1c6339-3789-4b6a-973a-42da5f36ab23" title="How To Create An Interview" />

      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            1
          </div>
          <p className="text-gray-700 hyphens-none break-words"><strong>Add Details</strong> – job title, language (optional), hourly rate (optional).</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            2
          </div>
          <p className="text-gray-700 hyphens-none break-words"><strong>Write Questions</strong> – choose text or video, start with 5–7 questions.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <p className="text-gray-700 hyphens-none break-words"><strong>Set Options</strong> – deadline, availability, or hints if needed.</p>
        </div>
      </div>

      <div className="space-y-6">
      <details className="mt-6" onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
        <summary className="group flex items-center space-x-3 cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            <ChevronRight className={`w-3.5 h-3.5 text-blue-500 group-hover:text-white transition-all duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
          </div>
          <span className="text-gray-700 font-semibold whitespace-nowrap hyphens-none break-words"><strong>Advanced Settings</strong></span>
        </summary>
        <div className="mt-4 ml-8">
          <ul className="space-y-2 text-sm font-semibold text-gray-700 list-disc list-outside pl-6 whitespace-nowrap hyphens-none break-words">
            <li>
             Max Duration (seconds)
            </li>
            <li>
             Max Retakes
            </li>
            <li>
             Thinking Time (seconds)
            </li>
          </ul>
        </div>
      </details>
     

      {hasInterview ? (
        <div className="space-y-4 max-w-xl">
          <p className="text-blue-600 text-lg font-semibold hyphens-none break-words">
            First Interview Successfully Created!
          </p>
          <Button 
            className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
              border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" 
            onClick={() => setActiveStep("copy")}
          >
            <p className="text-sm">Go to Next Step</p>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      ) : (
        <Button className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
          border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" onClick={() => navigate("/interviews/create")}>
        Create My First Interview
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      )}
    </div>
    </div>
  );
}

function CopyInterviewLink({
  firstInterviewId,
  onComplete,
}: {
  firstInterviewId: string | null;
  onComplete: () => void;
}) {
  const navigate = useNavigate();
  const [interviewLink, setInterviewLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchLink = async () => {
      if (!firstInterviewId) {
        setLoading(false);
        return;
      }

      const { data: interview } = await supabase
        .from("interviews")
        .select("interview_link")
        .eq("id", firstInterviewId)
        .single();

      if (interview?.interview_link) {
        setInterviewLink(interview.interview_link);
      }

      setLoading(false);
    };

    fetchLink();
  }, [firstInterviewId]);

  const handleCopy = () => {
    if (interviewLink) {
      navigator.clipboard.writeText(interviewLink);
      onComplete();
      
      // Clear existing timeout if user clicks again
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
      
      // Set copied state
      setCopied(true);
      
      // Set new timeout to reset copied state
      const newTimeout = setTimeout(() => {
        setCopied(false);
        setCopyTimeout(null);
      }, 5000);
      
      setCopyTimeout(newTimeout);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">Step 2: Share Your Interview Link</h2>
      <h3 className="text-md text-left text-gray-700 mb-8 hyphens-none break-words">Share your link and send it to candidates to start receiving responses.</h3>
      <ResponsiveVideo src="https://www.loom.com/embed/2890b9551424470c939b5d37b8479d9f?sid=6ffae14c-e0fa-4a0e-998d-58a48634e155" title="How To Share Your Interview Link" />
      <div className="space-y-4">
      {loading ? (
        <p>Loading...</p>
      ) : interviewLink ? (
        <div className="space-y-4">
          <p className="max-w-4xl text-gray-700 leading-relaxed hyphens-none break-words">
            <strong>Your interview is now ready.</strong>
          </p>
          <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            1
          </div>
          <p className="text-gray-700 hyphens-none break-words">Copy the link below to share with candidates.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            2
          </div>
          <p className="text-gray-700 hyphens-none break-words">Candidate records and submits their interview.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <p className="text-gray-700 hyphens-none break-words">View their responses in the <Link className="inline-block min-h-0 hyphens-none break-words p-0 m-0 font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer" to="/interviews/responses">Candidates</Link> section of the dashboard.</p>
        </div>
      </div>

          <div className="flex gap-2 items-center">
            <input
              readOnly
              value={interviewLink}
              className={`border-2 rounded-xl px-3 py-2 w-96 focus:outline-none focus:ring-2 transition-colors duration-300 ${
                copied 
                  ? 'border-green-500 bg-green-50 focus:ring-green-500' 
                  : 'border-blue-600 focus:ring-blue-600'
              }`}
            />
            <Button 
              variant="outline" 
              onClick={handleCopy}
              className={`transition-all duration-300 text-wrap ${
                copied 
                  ? "group bg-green-50 border-green-300 text-green-700 hover:bg-green-600" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {copied ? (
                <>
                  Copied! <CheckCircle className="min-w-4 min-h-4 ml-2 h-4 w-4 text-green-600 group-hover:text-white transition-all duration-300" />
                </>
              ) : (
                <>
                  Copy Link <Copy className="min-w-4 min-h-4 ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-blue-600 text-lg font-semibold">
              No Interviews Exist
          </p>
          <Button className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
          border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" onClick={() => navigate("/interviews/create")}>
            Create My First Interview
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      )}
      </div>
    </div>
  );
}

function EditInterview({
  firstInterviewId,
  onComplete,
}: {
  firstInterviewId: string | null;
  onComplete: () => void;
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (firstInterviewId) {
      onComplete();
      navigate(`/interviews/edit/${firstInterviewId}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">Step 4: Edit Your Interview Link (Optional)</h2>
      <h3 className="text-md text-left text-gray-700 mb-8 hyphens-none break-words">Make changes to your interview questions or details anytime.</h3>
      <ResponsiveVideo src="https://www.loom.com/embed/9c8ee85cba654b99b09cd9e4e911cb8f?sid=938903e9-75db-4977-bf0b-b88751b75010" title="How To Edit Your Interview Link" />

      {firstInterviewId ? (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed hyphens-none break-words">
          Click below if you want to update your interview — otherwise, skip this step and continue.
          </p>
          <Button className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
            border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" onClick={handleEdit}>Edit Interview
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-blue-600 text-lg font-semibold">
              No Interviews Exist
          </p>
          <Button className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
          border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" onClick={() => navigate("/interviews/create")}>
            Create My First Interview
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
      </div>
      )}
    </div>
  );
}

function FirstCandidate({
  hasCandidate,
  attemptId,
  onComplete,
  setActiveStep,
}: {
  hasCandidate: boolean;
  attemptId: string | null;
  onComplete: () => void;
  setActiveStep: (step: string) => void;
}) {
  const navigate = useNavigate();

  const handleView = () => {
    if (attemptId) {
      onComplete();
      navigate(`/interviews/responses/${attemptId}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">Step 3: Review Your First Candidate</h2>
      <h3 className="text-md text-left text-gray-700 mb-8 hyphens-none break-words">See candidate responses and AI scores as soon as candidates complete your interview.</h3>
      <ResponsiveVideo src="https://www.loom.com/embed/1e6af556cdbe48c0ba45df67a0687f45?sid=3110a7a9-e2f8-44e5-94ac-ad24947b65ca" title="How To View Your First Candidate" />
      
      <p className="max-w-4xl text-gray-700 leading-relaxed hyphens-none break-words">Once a candidate submits their interview, you'll see their responses, AI score, and analysis in the <Link className="inline-block hyphens-none break-words p-0 m-0 font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer" to="/interviews/responses">Candidates</Link> tab. <br />Use this to quickly decide who to advance or reject. Click the button below or on the left side of your navigation bar to view your candidates.</p>
      
       <button 
         onClick={() => setActiveStep("copy")}
         className="p-0 *:text-left text-blue-600 font-semibold hyphens-none break-words hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer"
       >
         Share your link to start receiving submissions.
       </button>
      <Button className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
        border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center" onClick={() => navigate("/interviews/responses")}>
        View Candidates
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
      </div>
  );
}

function ConnectATS({ onComplete }: { onComplete: () => void }) {
  const handleConnect = () => {
    // Trigger your integration logic here if needed
    onComplete();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">Connect ATS</h2>

      <p className="text-gray-700 leading-relaxed mb-4 hyphens-none break-words">
        Link your existing Applicant Tracking System (ATS) to streamline your hiring workflow.
        Integrating your ATS allows you to automatically sync candidate data, track interview
        progress, and manage applications in one place.
        <br /><br />
        Supported platforms include <strong>Greenhouse</strong>, <strong>Lever</strong>, <strong>Workable</strong>, and more. Click the button below to connect your ATS account.
      </p>

      <Button className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
      border-0 shadow-lg hover:shadow-xl transition-all duration-300" onClick={handleConnect}>
        Connect
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
    </div>
  );
}