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

const steps = [
  { id: "create", title: "Create Interview", icon: Rocket },
  { id: "copy", title: "Copy Interview Link", icon: ClipboardCopy },
  { id: "candidate", title: "First Candidate", icon: User },
  { id: "edit", title: "Edit Interview Link (Optional)", icon: Pencil },
  { id: "connect", title: "Connect ATS (Optional)", icon: Plug },
];

export default function GettingStarted() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState("create");

  // Completion states
  const [firstInterviewId, setFirstInterviewId] = useState<string | null>(null);
  const [hasCandidate, setHasCandidate] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load all status info once
  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("company_profiles")
        .select("first_interview_id")
        .eq("created_by_user_id", user.id)
        .single();

      const interviewId = profile?.first_interview_id;
      setFirstInterviewId(interviewId);

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

          if (attempts && attempts.length > 0) {
            setHasCandidate(true);
          }
        }
      }

      setLoading(false);
    };

    fetchStatus();
  }, [user]);

  const isCompleted = {
    create: !!firstInterviewId,
    copy: !!firstInterviewId,
    candidate: !!firstInterviewId && hasCandidate,
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
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
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-2" />
                {title}
              </div>
              {["create", "copy", "candidate"].includes(id) && (
                <div
                  className="w-5 h-5 flex items-center justify-center rounded-sm bg-gray-200"
                >
                  {isCompleted[id as keyof typeof isCompleted] && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {activeStep === "create" && <CreateInterview hasInterview={!!firstInterviewId} />}
        {activeStep === "copy" && <CopyInterviewLink firstInterviewId={firstInterviewId} />}
        {activeStep === "candidate" && <FirstCandidate hasCandidate={hasCandidate} />}
        {activeStep === "edit" && <EditInterview firstInterviewId={firstInterviewId} />}
        {activeStep === "connect" && <ConnectATS />}
      </main>
    </div>
  );
}

function CreateInterview({ hasInterview }: { hasInterview: boolean }) {
  const navigate = useNavigate();
  if (hasInterview) {
    return (
      <div className="space-y-4 max-w-xl">
        <h2 className="text-3xl font-semibold">First Interview Successfully Created!</h2>
        <p className="text-gray-600">You can now move to the next step.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-3xl font-semibold">Create Interview</h2>
      <p>
        Start by creating your first interview. Customize questions and settings to suit your hiring process.
      </p>
      <Button onClick={() => navigate("/interviews/create")}>
        Go to Create Interview
      </Button>
    </div>
  );
}

function CopyInterviewLink({ firstInterviewId }: { firstInterviewId: string | null }) {
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Copy Interview Link</h2>
      <p className="mb-4">Copy your interview link and share it with candidates.</p>
      {loading ? (
        <p>Loading...</p>
      ) : interviewLink ? (
        <div className="flex gap-2 items-center">
          <input
            readOnly
            value={interviewLink}
            className="border rounded px-3 py-1 w-96"
          />
          <Button
            variant="outline"
            onClick={() => navigator.clipboard.writeText(interviewLink)}
          >
            Copy Link
          </Button>
          <CheckCircle className="text-green-500" />
        </div>
      ) : (
        <p>No Interviews Exist</p>
      )}
    </div>
  );
}

function EditInterview({ firstInterviewId }: { firstInterviewId: string | null }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Edit Interview</h2>
      <p className="mb-4">Make changes to your interview setup.</p>
      {firstInterviewId ? (
        <Button onClick={() => navigate(`/interviews/edit/${firstInterviewId}`)}>
          Edit Interview
        </Button>
      ) : (
        <p>No Interviews Exist</p>
      )}
    </div>
  );
}

function FirstCandidate({ hasCandidate }: { hasCandidate: boolean }) {
  const { user } = useAuth();
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFirst = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from("company_profiles")
        .select("first_interview_id")
        .eq("created_by_user_id", user.id)
        .single();

      const interviewId = profile?.first_interview_id;
      if (!interviewId) {
        setLoading(false);
        return;
      }

      const { data: interview } = await supabase
        .from("interviews")
        .select("willo_interview_key")
        .eq("id", interviewId)
        .single();

      const willoKey = interview?.willo_interview_key;
      if (!willoKey) {
        setLoading(false);
        return;
      }

      const { data: attempts } = await supabase
        .from("interview_attempts")
        .select("id")
        .eq("interview_id", willoKey)
        .limit(1);

      if (attempts?.[0]) {
        setAttemptId(attempts[0].id);
      }

      setLoading(false);
    };

    fetchFirst();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">First Candidate</h2>
      <p className="mb-4">Review your first candidate’s submission.</p>
      {loading ? (
        <p>Loading...</p>
      ) : attemptId ? (
        <Button onClick={() => navigate(`/interviews/responses/${attemptId}`)}>
          View Candidate
        </Button>
      ) : (
        <p>No candidates have submitted yet.</p>
      )}
    </div>
  );
}

function ConnectATS() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Connect ATS</h2>
      <p className="mb-4">Link your ATS for seamless workflow integration.</p>
      <Button className="bg-blue-500 text-white">Connect</Button>
    </div>
  );
}
