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

  const updateBitmask = async (index: number) => {
    if (!companyProfileId) return;

    const newBits = completionBitmask.split("");
    if (newBits[index] === "1") return;

    newBits[index] = "1";
    const updated = newBits.join("");

    setCompletionBitmask(updated);

    await supabase
      .from("company_profiles")
      .update({ completion_bitmask: updated })
      .eq("id", companyProfileId);
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
              <div className="w-5 h-5 flex items-center justify-center rounded-sm bg-gray-200 shrink-0">
                {isCompleted[id as keyof typeof isCompleted] && (
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6">
        {activeStep === "create" && <CreateInterview hasInterview={!!firstInterviewId} />}
        {activeStep === "copy" && (
          <CopyInterviewLink
            firstInterviewId={firstInterviewId}
            onComplete={() => updateBitmask(0)}
          />
        )}
        {activeStep === "candidate" && (
          <FirstCandidate
            hasCandidate={hasCandidate}
            attemptId={attemptId}
            onComplete={() => updateBitmask(1)}
          />
        )}
        {activeStep === "edit" && (
          <EditInterview
            firstInterviewId={firstInterviewId}
            onComplete={() => updateBitmask(2)}
          />
        )}
        {activeStep === "connect" && (
          <ConnectATS onComplete={() => updateBitmask(3)} />
        )}
      </main>
    </div>
  );
}

function CreateInterview({ hasInterview }: { hasInterview: boolean }) {
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

      {hasInterview ? (
        <div className="space-y-4 max-w-xl">
          <p className="text-blue-600 text-lg font-semibold">
            First Interview Successfully Created!
          </p>
          <p className="text-blue-600 text-lg font-semibold">
            You can now move to the next step.
          </p>
        </div>
      ) : (
        <Button className="bg-blue-500 text-white" onClick={() => navigate("/interviews/create")}>
          Go to Create Interview
        </Button>
      )}
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
  const [interviewLink, setInterviewLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Copy Interview Link</h2>
      <VideoEmbed src={"https://www.loom.com/embed/395e38d76853447fb6d673be2e2f36ce?sid=5d9b2bf7-7572-4a34-895e-3fad4d2f86be"} />
      <p className="mb-4">Copy your interview link and share it with candidates.</p>

      {loading ? (
        <p>Loading...</p>
      ) : interviewLink ? (
        <div className="space-y-4">
          <p className="text-gray-700 leading-snug">
            Your interview has been successfully created. Use the link below to share the interview
            with potential candidates. Once candidates complete the interview, their responses will be
            available for your review. Click the button to copy the link and begin collecting applications.
            <br /><br />
            Interviews can also be deleted in the main Interviews page.
          </p>

          <div className="flex gap-2 items-center">
            <input
              readOnly
              value={interviewLink}
              className="border rounded px-3 py-1 w-96"
            />
            <Button variant="outline" onClick={handleCopy}>
              Copy Link
            </Button>
            <CheckCircle className="text-green-500" />
          </div>
        </div>
      ) : (
        <p>No Interviews Exist</p>
      )}
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
    <div>
      <h2 className="text-2xl font-semibold mb-2">Edit Interview</h2>
      <p className="mb-4">Make changes to your interview setup.</p>

      {firstInterviewId ? (
        <div className="space-y-4">
          <p className="text-gray-700 leading-snug">
            Need to make changes to your interview? You can update the interview details, questions, or
            settings at any time before sharing the link with candidates.
            <br /><br />
            Click the <strong>Edit</strong> button below to make updates. If no changes are needed, you can skip this step and continue.
          </p>
          <Button onClick={handleEdit}>Edit Interview</Button>
        </div>
      ) : (
        <p>No Interviews Exist</p>
      )}
    </div>
  );
}

function FirstCandidate({
  hasCandidate,
  attemptId,
  onComplete,
}: {
  hasCandidate: boolean;
  attemptId: string | null;
  onComplete: () => void;
}) {
  const navigate = useNavigate();

  const handleView = () => {
    if (attemptId) {
      onComplete();
      navigate(`/interviews/responses/${attemptId}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">First Candidate</h2>
      <VideoEmbed src={"https://www.loom.com/embed/650a5ef732684cc5a63f72dbb8cfcdd8?sid=c453200f-84ef-427c-ac4e-e7bfa8316150"} />
      <p className="mb-4">Review your first candidate's submission.</p>

      {attemptId ? (
        <div className="space-y-4">
          <p className="text-gray-700 leading-snug">
            Your first candidate has submitted their interview. You can now review their responses
            and analyze how they performed. Click the "View Candidate" button below to view their
            response and start your evaluation. The AI-powered analysis will provide insights into
            the candidate's strengths and areas for improvement.
          </p>
          <Button className="bg-blue-500 text-white" onClick={handleView}>View Candidate</Button>
        </div>
      ) : (
        <p>
          No candidates have submitted their interview yet. 
          Once a candidate completes the interview, you'll be able to 
          review their responses and see AI-powered analysis of their performance, 
          including strengths and areas for improvement. Share your interview link to start 
          receiving submissions.
        </p>
      )}
    </div>
  );
}

function ConnectATS({ onComplete }: { onComplete: () => void }) {
  const handleConnect = () => {
    // Trigger your integration logic here if needed
    onComplete();
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
        Connect
      </Button>
    </div>
  );
}
