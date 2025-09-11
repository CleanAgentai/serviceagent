import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Rocket,
  CheckCircle,
  ClipboardCopy,
  User,
  Pencil,
  Plug,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";
import { useAuth } from "@/app/providers/AuthContext";
import { Button } from "@/components/ui/button";
import { VideoEmbed } from "../ui/video";

const steps = [
  { id: "create", title: "Create Interview", icon: Rocket },
  { id: "copy", title: "Copy Interview Link", icon: ClipboardCopy },
  { id: "candidate", title: "First Candidate", icon: User },
  { id: "edit", title: "Edit Interview Link(Optional)", icon: Pencil },
  { id: "connect", title: "Connect ATS (Optional)", icon: Plug },
];

export default function GettingStarted() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState("create");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  // Load completion state from localStorage
  useEffect(() => {
    const loadCompletionState = () => {
      if (!user) return;
      
      const savedState = localStorage.getItem(`gettingStarted_${user.id}`);
      if (savedState) {
        try {
          setCompletedSteps(JSON.parse(savedState));
        } catch (error) {
          console.error('Failed to parse saved completion state:', error);
        }
      }
      setLoading(false);
    };

    loadCompletionState();
  }, [user]);

  // Save completion state to localStorage when it changes
  useEffect(() => {
    if (user && Object.keys(completedSteps).length > 0) {
      localStorage.setItem(`gettingStarted_${user.id}`, JSON.stringify(completedSteps));
    }
  }, [completedSteps, user]);

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  return (
    <div className="flex h-fill">
      <aside className="w-64 border-r p-4 bg-gray-50">
        <h2 className="text-xl font-semibold">Getting Started</h2>
        <p className="text-[10px] text-gray-500 mb-4 leading-snug">
          Follow these quick steps to set up ServiceAgent and start hiring with AI.
        </p>
        <ul className="space-y-2">
          {steps.map(({ id, title, icon: Icon }) => (
            <li
              key={id}
              onClick={() => setActiveStep(id)}
              className={`flex items-center justify-between p-2 rounded cursor-pointer transition ${
                activeStep === id
                  ? "bg-blue-100 text-blue-800 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-sm break-words">{title}</span>
              </div>
              <div 
                className="w-5 h-5 flex items-center justify-center rounded-sm bg-gray-200 shrink-0 cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStepCompletion(id);
                }}
              >
                {completedSteps[id] && (
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        {activeStep === "create" && <CreateInterview />}
        {activeStep === "copy" && <CopyInterviewLink />}
        {activeStep === "candidate" && <FirstCandidate />}
        {activeStep === "edit" && <EditInterview />}
        {activeStep === "connect" && <ConnectATS />}
      </main>
    </div>
  );
}

function CreateInterview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Create Interview</h2>
      <VideoEmbed src={"https://www.loom.com/embed/dbf03e1878d5497389971199c7b2419d?sid=95f31335-a69f-4861-9d4c-5096515f686c"} />
      <p>
        The first step to using ServiceAgent is to create your initial interview. This interview will be used
        to assess candidates applying for the role you're hiring. You can customize your questions and tailor
        the experience to fit your company's needs. Follow the steps below to get started.
      </p>

      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h3 className="font-semibold">Interview Details</h3>
          <ul className="list-disc list-outside pl-6">
            <li>
              <strong>Title of Interview / Position:</strong> Enter the job title or position name you are
              hiring for (e.g., Delivery Driver, House Cleaner).
            </li>
            <li>
              <strong>Language (Optional):</strong> Select the language in which the interview will be
              conducted. Default: English
            </li>
            <li>
              <strong>Hourly Rate (Optional):</strong> Enter the hourly wage for this position. This will be
              shown to candidates during the interview.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Interview Questions</h3>
          <p className="mb-2">
            You can add one or more questions to assess candidates. Each question can be configured with its
            own format and constraints. You may remove or reorder questions at any time.
          </p>
          <ul className="list-disc list-outside pl-6">
            <li>
              <strong>Question Text:</strong> Type your interview question here.
            </li>
            <li>
              <strong>Answer Type:</strong> Choose how candidates will respond. Options include:
              <ul className="list-disc list-outside pl-6 mt-1">
                <li>
                  <strong>Video</strong>
                  <ul className="list-disc list-outside pl-6 mt-1">
                    <li>Max Duration (seconds)</li>
                    <li>Max Retakes</li>
                    <li>Thinking Time (seconds)</li>
                  </ul>
                </li>
                <li>
                  <strong>Text</strong>
                  <ul className="list-disc list-outside pl-6 mt-1">
                    <li>Max Characters</li>
                    <li>Max Retakes</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              You may add more questions by clicking "Add Question". Each question will appear in order during
              the interview.
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Interview Settings</h3>
          <ul className="list-disc list-outside pl-6">
            <li>
              <strong>Show Hints and Tips:</strong> Enables helpful guidance before each question.
            </li>
            <li>
              <strong>Show Availability:</strong> Allows candidates to submit their availability for
              next-stage interviews.
            </li>
            <li>
              <strong>Interview Deadline:</strong> Set a date/time using the picker by which candidates must
              complete the interview.
            </li>
          </ul>
        </div>
      </div>

      <Button className="bg-blue-500 text-white" onClick={() => navigate("/interviews/create")}>
        Go to Create Interview
      </Button>
    </div>
  );
}

function CopyInterviewLink() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Copy Interview Link</h2>
      <VideoEmbed src={"https://www.loom.com/embed/395e38d76853447fb6d673be2e2f36ce?sid=5d9b2bf7-7572-4a34-895e-3fad4d2f86be"} />
      <p className="mb-4">Copy your interview link and share it with candidates.</p>

      <div className="space-y-4">
        <p className="text-gray-700 leading-snug">
          View your interviews and copy the interview links to share with potential candidates. 
          Once candidates complete the interview, their responses will be available for your review. 
          Click the button below to access your interviews and copy the links to begin collecting applications.
          <br /><br />
          You can also edit or delete interviews from the main Interviews page.
        </p>

        <Button className="bg-blue-500 text-white" onClick={() => navigate("/interviews")}>
          View My Interviews
        </Button>
      </div>
    </div>
  );
}

function EditInterview() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Edit Interview</h2>
      <p className="mb-4">Make changes to your interview setup.</p>

      <div className="space-y-4">
        <p className="text-gray-700 leading-snug">
          Need to make changes to your interview? You can update the interview details, questions, or
          settings at any time before sharing the link with candidates.
          <br /><br />
          Click the <strong>View Interviews</strong> button below to see your interviews and make edits. If no changes are needed, you can skip this step and continue.
        </p>
        <Button onClick={() => navigate("/interviews")}>View Interviews</Button>
      </div>
    </div>
  );
}

function FirstCandidate() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">First Candidate</h2>
      <VideoEmbed src={"https://www.loom.com/embed/650a5ef732684cc5a63f72dbb8cfcdd8?sid=c453200f-84ef-427c-ac4e-e7bfa8316150"} />
      <p className="mb-4">Review your first candidate's submission.</p>

      <div className="space-y-4">
        <p className="text-gray-700 leading-snug">
          Once candidates start submitting their interviews, you'll be able to review their responses
          and analyze how they performed. The AI-powered analysis will provide insights into
          candidates' strengths and areas for improvement. Click below to view your candidates and their submissions.
        </p>
        <Button className="bg-blue-500 text-white" onClick={() => navigate("/interviews/responses")}>View Candidates</Button>
      </div>
    </div>
  );
}

function ConnectATS() {
  const navigate = useNavigate();

  const handleConnect = () => {
    // Navigate to integrations page
    navigate('/integrations');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Connect ATS</h2>

      <p className="text-gray-700 leading-snug mb-4">
        Link your existing Applicant Tracking System (ATS) to streamline your hiring workflow.
        Integrating your ATS allows you to automatically sync candidate data, track interview
        progress, and manage applications in one place.
        <br /><br />
        Supported platforms include <strong>Greenhouse</strong>, <strong>Lever</strong>, <strong>Workable</strong>, and more. Click the button below to connect your ATS account.
      </p>

      <Button className="bg-blue-500 text-white" onClick={handleConnect}>
        Connect ATS
      </Button>
    </div>
  );
}
