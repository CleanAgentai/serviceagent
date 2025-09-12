import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';
import { useAuth } from '@/app/providers/AuthContext';
import { Button } from '@/components/ui/button';
import { VideoEmbed } from '../ui/video';

const steps = [
  { id: 'create', title: 'Create Interview', icon: Rocket },
  { id: 'copy', title: 'Copy Interview Link', icon: ClipboardCopy },
  { id: 'candidate', title: 'First Candidate', icon: User },
  { id: 'edit', title: 'Edit Interview Link (Optional)', icon: Pencil },
  { id: 'connect', title: 'Connect ATS (Optional)', icon: Plug },
];

function ResponsiveVideo({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative min-w-80 max-w-4xl aspect-[16/9] bg-card border-2 border-primary/20 rounded-3xl shadow-3xl overflow-hidden hover:border-primary/40 hover:shadow-[0_25px_80px_-12px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-500 max-sm:pb-[56.25%]">
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
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState('create');

  //Completion states
  const [mostRecentInterviewId, setMostRecentInterviewId] = useState<
    string | null
  >(null);
  // const [companyProfileId, setCompanyProfileId] = useState<string | null>(null);
  const [completionBitmask, setCompletionBitmask] = useState('0000');

  const [hasCandidate, setHasCandidate] = useState(false);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [knitConnected, setKnitConnected] = useState(false);
  const [mostRecentWilloKey, setMostRecentWilloKey] = useState<string | null>(null);


  // Load all status info once
  useEffect(() => {
    const fetchStatus = async () => {
      if (!user) return;

      const { data: profile } = await supabase
        .from('company_profiles')
        .select(
          'id, first_interview_id, completion_bitmask, willo_company_key, knit_integration_id, knit_connected_at, knit_app_id, knit_category_id',
        )
        .eq('created_by_user_id', user.id)
        .single();

      const connected =
        !!profile?.knit_integration_id ||
        !!profile?.knit_connected_at ||
        !!profile?.knit_app_id ||
        !!profile?.knit_category_id;

      setKnitConnected(connected);

      const selectMostRecentBy = async (filter: {
        key: string;
        value: string;
      }) => {
        const { data: interview }: { data: any } = await supabase
          .from('interviews')
          .select('id, willo_interview_key, created_at')
          .eq(filter.key as any, filter.value)
          .order('created_at', { ascending: false })
          .limit(1);
        return interview?.[0] ?? null;
      };

      // 1) Most recent interview created by the user
      let recent = await selectMostRecentBy({ key: 'user_id', value: user.id });

      // 2) Fallback: most recent interview tied to company via willo_company_key in department
      if (!recent && profile?.willo_company_key) {
        recent = await selectMostRecentBy({
          key: 'department',
          value: profile.willo_company_key,
        });
      }

      if (recent) {
        setMostRecentInterviewId(recent.id);
        setMostRecentWilloKey(recent.willo_interview_key ?? null);

        // If we have a Willo key, check if any attempts exist
        if (recent.willo_interview_key) {
          const { data: attempts } = await supabase
            .from('interview_attempts')
            .select('id')
            .eq('interview_id', recent.willo_interview_key) // this table stores the Willo key
            .limit(1);

          if (attempts?.[0]) {
            setHasCandidate(true);
            setAttemptId(attempts[0].id);
            markStepComplete('candidate');
          }
        }
      } else {
        setMostRecentInterviewId(null);
        setMostRecentWilloKey(null);
      }

      setLoading(false);
    };

    fetchStatus();
  }, [user, mostRecentInterviewId, mostRecentWilloKey]);

  // const isCompleted = {
  //   create: !!firstInterviewId,
  //   copy: completionBitmask[0] === '1',
  //   candidate: completionBitmask[1] === '1',
  //   edit: completionBitmask[2] === '1',
  //   connect: completionBitmask[3] === '1',
  // };

  // const updateBitmask = async (index: number) => {
  //   if (!companyProfileId) return;

  //   const newBits = completionBitmask.split('');
  //   if (newBits[index] === '1') return;

  //   newBits[index] = '1';
  //   const updated = newBits.join('');

  //   setCompletionBitmask(updated);

  //   await supabase
  //     .from('company_profiles')
  //     .update({ completion_bitmask: updated })
  //     .eq('id', companyProfileId);
  // };

  
  const defaultChecks = useMemo(
    () =>
      steps.reduce<Record<string, boolean>>((acc, s) => {
        acc[s.id] = false;
        return acc;
      }, {} as Record<string, boolean>),
    []
  );

  const storageKey = useMemo(
    () => `getting_started_checks_${user?.id ?? 'anon'}`,
    [user?.id]
  );

  

  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(defaultChecks);
  const [hydratedKey, setHydratedKey] = useState<string | null>(null);
  const [pendingConnectMark, setPendingConnectMark] = useState(false);

  // LOAD for current storageKey
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      setCheckedSteps(raw ? { ...defaultChecks, ...JSON.parse(raw) } : defaultChecks);
    } catch {
      setCheckedSteps(defaultChecks);
    }
    setHydratedKey(storageKey);
  }, [storageKey, defaultChecks]);

  // SAVE only after we hydrated for this storageKey
  useEffect(() => {
    if (hydratedKey !== storageKey) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(checkedSteps));
    } catch {}
  }, [checkedSteps, storageKey, hydratedKey]);

  // mark connect completed (queues until hydrated)
  const markConnectCompleted = useCallback(() => {
    if (hydratedKey !== storageKey) {
      setPendingConnectMark(true);
      return;
    }
    setCheckedSteps((prev) => (prev.connect ? prev : { ...prev, connect: true }));
  }, [hydratedKey, storageKey]);

  // apply queued connect mark post-hydration
  useEffect(() => {
    if (!pendingConnectMark) return;
    if (hydratedKey !== storageKey) return;
    setCheckedSteps((prev) => (prev.connect ? prev : { ...prev, connect: true }));
    setPendingConnectMark(false);
  }, [pendingConnectMark, hydratedKey, storageKey]);

  const toggleStep = (id: string)=>
    setCheckedSteps((prev) => ({ ...prev, [id]: !prev[id] }));

  const markStepComplete = React.useCallback((id: string) => {
    setCheckedSteps(prev => {
      if (prev[id]) return prev;                 // idempotent
      const next = { ...prev, [id]: true };
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [storageKey]);

  // === below your existing storageKey/useMemo ===
const lastInterviewKey = useMemo(
  () => `getting_started_last_interview_${user?.id ?? 'anon'}`,
  [user?.id]
);

// Reset "copy" when the most recent interview changes (after hydration)
useEffect(() => {
  if (hydratedKey !== storageKey) return;
  if (!mostRecentInterviewId) return;

  try {
    const last = localStorage.getItem(lastInterviewKey);

    // If we've seen an interview before AND it's different now → reset "copy"
    if (last && last !== mostRecentInterviewId) {
      setCheckedSteps(prev => {
        if (!prev.copy) return prev;                // already unchecked
        const next = { ...prev, copy: false };
        try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
        return next;
      });
    }

    // Update our last-seen interview id
    localStorage.setItem(lastInterviewKey, mostRecentInterviewId);
  } catch {}
}, [mostRecentInterviewId, hydratedKey, storageKey, lastInterviewKey, setCheckedSteps]);


  return (
    <div className="flex h-fill">
      <aside className="w-48 border-r p-4 pl-0 bg-transparent">
        <h2 className="text-xl text-left font-semibold mb-2 hyphens-none break-words">
          Getting Started
        </h2>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed hyphens-none break-words">
          Follow these quick steps to set up ServiceAgent and start hiring with
          AI.
        </p>
        <ul className="space-y-4">
          {steps.map(({ id, title, icon: Icon }) => {
            const isActive = activeStep === id;
            const isDone = checkedSteps[id];
            return (
              <li
                key={id}
                onClick={() => setActiveStep(id)}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition ${
                  isActive
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm break-words hyphens-none whitespace-wrap pr-4">
                    {title}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(id);
                    }}
                    aria-pressed={isDone}
                    aria-label={`${isDone ? 'Uncheck' : 'Check'} "${title}"`}
                    className={`w-6 h-6 grid place-items-center rounded-xl shrink-0 transition-colors duration-200
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500
              ${isDone ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {isDone && <Check className="w-4 h-4 text-white" />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </aside>

      <main className="flex-1 p-6 min-w-0">
        {activeStep === 'create' && (
          <CreateInterview
            hasInterview={!!mostRecentInterviewId}
            setActiveStep={setActiveStep}
            onComplete={() => markStepComplete('create')}
          />
        )}
        {activeStep === 'copy' && (
          <CopyInterviewLink 
            mostRecentInterviewId={mostRecentInterviewId}
            onComplete={() => markStepComplete('copy')}
          />
        )}
        {activeStep === 'candidate' && (
          <FirstCandidate
            hasCandidate={hasCandidate}
            attemptId={attemptId}
            setActiveStep={setActiveStep}
            onComplete={() => markStepComplete('candidate')}
          />
        )}
        {activeStep === 'edit' && (
          <EditInterview 
            mostRecentInterviewId={mostRecentInterviewId}
            onComplete={() => markStepComplete('edit')}
          />
        )}
        {activeStep === 'connect' && <ConnectATS knitConnected={knitConnected} onVerifyConnected={markConnectCompleted} />}
      </main>
    </div>
  );
}

function CreateInterview({
  hasInterview,
  setActiveStep,
  onComplete,
}: {
  hasInterview: boolean;
  setActiveStep: (step: string) => void;
  onComplete: () => void;
}) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">
        Step 1: Create Your First Interview
      </h2>
      <h3 className="text-md text-left text-gray-700 mb-8 hyphens-none break-words">
        This only takes 3–5 minutes. We’ll guide you through the basics, and you
        can customize later.
      </h3>
      <ResponsiveVideo
        src="https://www.loom.com/embed/dbf03e1878d5497389971199c7b2419d?sid=95f31335-a69f-4861-9d4c-5096515f686c"
        title="How To Create An Interview"
      />

      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            1
          </div>
          <p className="text-gray-700 hyphens-none break-words">
            <strong>Add Details</strong> – job title, language (optional),
            hourly rate (optional).
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            2
          </div>
          <p className="text-gray-700 hyphens-none break-words">
            <strong>Write Questions</strong> – choose text or video, start with
            5–7 questions.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            3
          </div>
          <p className="text-gray-700 hyphens-none break-words">
            <strong>Set Options</strong> – deadline, availability, or hints if
            needed.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <details
          className="mt-6"
          onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary className="group flex items-center space-x-3 cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <ChevronRight
                className={`w-3.5 h-3.5 text-blue-500 group-hover:text-white transition-all duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
              />
            </div>
            <span className="text-gray-700 font-semibold whitespace-nowrap hyphens-none break-words">
              <strong>Advanced Settings</strong>
            </span>
          </summary>
          <div className="mt-4 ml-8">
            <ul className="space-y-2 text-sm font-semibold text-gray-700 list-disc list-outside pl-6 whitespace-nowrap hyphens-none break-words">
              <li>Max Duration (seconds)</li>
              <li>Max Retakes</li>
              <li>Thinking Time (seconds)</li>
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
              onClick={() => {
                onComplete();
                setActiveStep('copy');
              }}
            >
              <p className="text-sm">Go to Next Step</p>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        ) : (
          <Button
            className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
          border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            onClick={() => navigate('/interviews/create')}
          >
            Create My First Interview
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        )}
      </div>
    </div>
  );
}

function CopyInterviewLink({
  mostRecentInterviewId,
  onComplete,
}: {
  mostRecentInterviewId: string | null;
  onComplete: () => void;
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [interviewLink, setInterviewLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMostRecentLink = async () => {
      try {
        if (!user) {
          setLoading(false);
          return;
        }

        // Grab the user's company profile (unique per user)
        const { data: profile } = await supabase
          .from('company_profiles')
          .select('willo_company_key, first_interview_id')
          .eq('created_by_user_id', user.id)
          .single();

        // Helper: read a link by interview UUID (text)
        const readLinkById = async (id: string | null) => {
          if (!id) return null;
          const { data } = await supabase
            .from('interviews')
            .select('interview_link')
            .eq('id', id)
            .single();
          return data?.interview_link ?? null;
        };

        // Helper: most recent interview with a non-null link by a filter
        const selectMostRecentBy = async (filter: {
          key: string;
          value: string;
        }): Promise<string | null> => {
          const { data: interview } = await supabase
            .from('interviews')
            .select('id, interview_link, created_at')
            .eq(filter.key as any, filter.value)
            .not('interview_link', 'is', null)
            .order('created_at', { ascending: false })
            .limit(1);
          if (interview && interview[0]) {
            return interview[0].interview_link as string | null;
          }
          return null;
        };

        // 1) Most recent interview created by this user
        let link = await selectMostRecentBy({ key: 'user_id', value: user.id });

        // 2) Fallback: most recent interview tied to this company via willo_company_key
        if (!link && profile?.willo_company_key) {
          link = await selectMostRecentBy({
            key: 'department',
            value: profile.willo_company_key,
          });
        }

        // 3) Final fallback: the profile's first_interview_id (uuid-as-text)
        if (!link && (profile?.first_interview_id || mostRecentInterviewId)) {
          link = await readLinkById(
            profile?.first_interview_id ?? mostRecentInterviewId,
          );
        }

        setInterviewLink(link ?? null);
      } finally {
        setLoading(false);
      }
    };

    fetchMostRecentLink();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mostRecentInterviewId, user?.id]);

  const handleCopy = () => {
    if (interviewLink) {
      navigator.clipboard.writeText(interviewLink);
      onComplete();

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
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">
        Step 2: Share Your Interview Link
      </h2>
      <h3 className="text-md text-left text-gray-700 mb-8 hyphens-none break-words">
        Copy your link and send it to candidates to start receiving responses.
      </h3>
      <ResponsiveVideo
        src="https://www.loom.com/embed/395e38d76853447fb6d673be2e2f36ce?sid=5d9b2bf7-7572-4a34-895e-3fad4d2f86be"
        title="How To Share Your Interview Link"
      />
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
                <p className="text-gray-700 hyphens-none break-words">
                  Copy the link below to share with candidates.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <p className="text-gray-700 hyphens-none break-words">
                  Candidate records and submits their interview.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <p className="text-gray-700 hyphens-none break-words">
                  View their responses in the{' '}
                  <Link
                    className="inline-block min-h-0 hyphens-none break-words p-0 m-0 font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer"
                    to="/interviews/responses"
                  >
                    Candidates
                  </Link>{' '}
                  section of the dashboard.
                </p>
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
                    ? 'group bg-green-50 border-green-300 text-green-700 hover:bg-green-600'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {copied ? (
                  <>
                    Copied!{' '}
                    <CheckCircle className="min-w-4 min-h-4 ml-2 h-4 w-4 text-green-600 group-hover:text-white transition-all duration-300" />
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
            <Button
              className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
          border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              onClick={() => navigate('/interviews/create')}
            >
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
  mostRecentInterviewId,
  onComplete,
}: {
  mostRecentInterviewId: string | null;
  onComplete: () => void;
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (mostRecentInterviewId) {
      onComplete();
      navigate(`/interviews/edit/${mostRecentInterviewId}`);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">
        Step 4: Edit Your Interview Link (Optional)
      </h2>
      <h3 className="text-md text-left text-gray-700 mb-8 hyphens-none break-words">
        Make changes to your interview questions or details anytime.
      </h3>
      <ResponsiveVideo
        src="https://www.loom.com/embed/650a5ef732684cc5a63f72dbb8cfcdd8?sid=c453200f-84ef-427c-ac4e-e7bfa8316150"
        title="How To Edit Your Interview Link"
      />

      {mostRecentInterviewId ? (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed hyphens-none break-words">
            Click below if you want to update your interview — otherwise, skip
            this step and continue.
          </p>
          <Button
            className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
            border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            onClick={handleEdit}
          >
            Edit Interview
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-blue-600 text-lg font-semibold">
            No Interviews Exist
          </p>
          <Button
            className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
          border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            onClick={() => navigate('/interviews/create')}
          >
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
  setActiveStep,
  onComplete,
}: {
  hasCandidate: boolean;
  attemptId: string | null;
  setActiveStep: (step: string) => void;
  onComplete: () => void;
}) {
  const navigate = useNavigate();

  const handleView = () => {
    onComplete();
    if (attemptId) {
      navigate(`/interviews/responses/${attemptId}`);
    } else {
      navigate('/interviews/responses');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">
        Step 3: Review Your First Candidate
      </h2>
      <h3 className="text-md text-left text-gray-700 mb-8 hyphens-none break-words">
        See candidate responses and AI scores as soon as candidates complete
        your interview.
      </h3>
      <ResponsiveVideo
        src="https://www.loom.com/embed/650a5ef732684cc5a63f72dbb8cfcdd8?sid=c453200f-84ef-427c-ac4e-e7bfa8316150"
        title="How To View Your First Candidate"
      />

      <p className="max-w-4xl text-gray-700 leading-relaxed hyphens-none break-words">
        Once a candidate submits their interview, you’ll see their responses, AI
        score, and analysis in the{' '}
        <Link
          className="inline-block hyphens-none break-words p-0 m-0 font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer"
          to="/interviews/responses"
        >
          Candidates
        </Link>{' '}
        tab. <br />
        Use this to quickly decide who to advance or reject. Click the button
        below or on the left side of your navigation bar to view your
        candidates.
      </p>

      <button
        onClick={() => setActiveStep('copy')}
        className="p-0 *:text-left text-blue-600 font-semibold hyphens-none break-words hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer"
      >
        Share your link to start receiving submissions.
      </button>
      <Button
        className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
        border-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        onClick={() => navigate('/interviews/responses')}
      >
        View Candidates
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
    </div>
  );
}

function ConnectATS({ knitConnected, onVerifyConnected }: { knitConnected: boolean, onVerifyConnected: () => void }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleVerify = async () => {
    if (!user) return;
    const { data: profile } = await supabase
      .from('company_profiles')
      .select('knit_integration_id, knit_connected_at, knit_app_id, knit_category_id')
      .eq('created_by_user_id', user.id)
      .single();

    const connected =
      !!profile?.knit_integration_id ||
      !!profile?.knit_connected_at ||
      !!profile?.knit_app_id ||
      !!profile?.knit_category_id;

    if (connected) onVerifyConnected();
  };

  const handleConnect = () => {
    navigate('/integrations/');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-3xl text-left font-semibold hyphens-none break-words">
        Connect ATS
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4 hyphens-none break-words">
        Link your existing Applicant Tracking System (ATS) to streamline your
        hiring workflow. Integrating your ATS allows you to automatically sync
        candidate data, track interview progress, and manage applications in one
        place.
        <br />
        <br />
        Supported platforms include <strong>Greenhouse</strong>,{' '}
        <strong>Lever</strong>, <strong>Workable</strong>, and more. Click the
        button below to connect your ATS account.
      </p>

      <Button
        className="group bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
      border-0 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={handleConnect}
      >
        Connect
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
      </Button>
    </div>
  );
}
