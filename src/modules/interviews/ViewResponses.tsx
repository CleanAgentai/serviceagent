import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Search,
  ArrowUpDown,
  X,
  Check,
  AlertCircle,
  Star,
  FileText,
  Calendar,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface InterviewAttempt {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  createdAt: string;
  interviewTitle: string;
  status: string;
  qualified: boolean | null;
  generalScore: number | null;
}

export function ViewResponses() {
  const [attempts, setAttempts] = useState<InterviewAttempt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedAttempt, setSelectedAttempt] =
    useState<InterviewAttempt | null>(null);
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(
    null
  );
  const [selectedEvaluation, setSelectedEvaluation] = useState<{
    strengths: string[];
    weaknesses: string[];
    summary: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      setLoading(true);
      setError(null);

      // 1.auth.user.id
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      console.log("[ViewResponses] User Fetch:", { user, userError });

      if (!user) {
        console.error("[ViewResponses] User not logged in", userError);
        setAttempts([]);
        setLoading(false);
        return;
      }

      // 2. company_willo_key
      let companyKey: string | null = null;
      try {
        const { data: profile, error: profileError } = await supabase
          .from("company_profiles")
          .select("willo_company_key")
          .eq("created_by_user_id", user.id)
          .single();

        console.log("[ViewResponses] Profile Fetch:", {
          profile,
          profileError,
        });

        if (!profile || profileError) {
          console.error(
            "[ViewResponses] Company profile not found or error",
            profileError
          );
          setError("Failed to load company profile to fetch attempts.");
          setAttempts([]);
          setLoading(false);
          return;
        }
        companyKey = profile.willo_company_key;
      } catch (profileCatchError) {
        console.error(
          "[ViewResponses] Error fetching company profile:",
          profileCatchError
        );
        setError("Error loading company profile.");
        setAttempts([]);
        setLoading(false);
        return;
      }

      console.log("[ViewResponses] Using Company Key for Filter:", companyKey);

      if (!companyKey) {
        console.error(
          "[ViewResponses] Company Key is null or empty, cannot fetch attempts."
        );
        setError("Company key configuration missing.");
        setAttempts([]);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("interview_attempts")
          .select(
            `
            id,
            interview_id,
            candidate_id,
            created_at,
            status,
            qualified,
            candidates(email,name,phone),
            interviews(title),
            evaluation_results(general_score)
          `
          )
          .eq("department_key", companyKey)
          .order("created_at", { ascending: false });

        console.log("[ViewResponses] Attempts Fetch Result:", { data, error });

        if (error) {
          console.error("[ViewResponses] Error fetching attempts:", error);
          setError(error.message);
          setAttempts([]);
        } else if (data && data.length > 0) {
          try {
            const formatted = data.map((item: any) => ({
              id: item.id,
              candidateName: item.candidates?.name || "Unknown",
              email: item.candidates?.email || "N/A",
              phone: item.candidates?.phone || "N/A",
              createdAt: new Date(item.created_at).toLocaleDateString("en-US"),
              interviewTitle: item.interviews?.title || "Untitled Interview",
              status: item.status || "Pending",
              qualified: item.qualified ?? null,
              generalScore: item.evaluation_results?.general_score ?? null,
            }));
            console.log("[ViewResponses] Formatted Attempts:", formatted);
            setAttempts(formatted);
          } catch (mapError) {
            console.error(
              "[ViewResponses] Error formatting attempts data:",
              mapError
            );
            setError("Failed to process fetched attempts data.");
            setAttempts([]);
          }
        } else {
          console.log(
            "[ViewResponses] No attempts data returned from Supabase (data was empty or null)."
          );
          setAttempts([]);
        }
      } catch (fetchCatchError) {
        console.error(
          "[ViewResponses] Error in fetch attempts block:",
          fetchCatchError
        );
        setError("An unexpected error occurred while fetching attempts.");
        setAttempts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  const handleSort = (field: "date" | "name") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleLocalStatusChange = async (
    attemptId: string,
    newStatus: string
  ) => {
    setAttempts((prevAttempts) =>
      prevAttempts.map((attempt) =>
        attempt.id === attemptId ? { ...attempt, status: newStatus } : attempt
      )
    );

    const { error } = await supabase
      .from("interview_attempts")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", attemptId);

    if (error) {
      console.error("❌ Failed to update status in Supabase:", error.message);
      toast.error("Status update failed.");
    } else {
      console.log("✅ Status updated successfully");
      toast.success("Status updated.");
    }
  };

  const handleViewAnalysis = async (attempt: InterviewAttempt) => {
    setSelectedAttempt(attempt);
    setSelectedAttemptId(attempt.id);
    try {
      const { data, error } = await supabase
        .from("evaluation_results")
        .select("general_strengths, general_weaknesses, general_summary")
        .eq("interview_attempt_id", attempt.id)
        .single();

      if (error || !data) {
        toast.error("Fail to bring AI analysis data.");
        return;
      }

      const strengths = data.general_strengths?.split("\n") ?? [];
      const weaknesses = data.general_weaknesses?.split("\n") ?? [];
      const summary = data.general_summary ?? "";

      setSelectedEvaluation({ strengths, weaknesses, summary });
    } catch (err) {
      toast.error("An error occurred while fetching AI analysis data.");
    }
  };

  const filtered = attempts
    .filter(
      (a) =>
        a.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.interviewTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return sortOrder === "asc"
          ? a.candidateName.localeCompare(b.candidateName)
          : b.candidateName.localeCompare(a.candidateName);
      }
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Responses</h1>
      </div>

      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by candidate or interview..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="space-y-4">
        <div className="grid grid-cols-8 gap-2 px-4 py-2 bg-gray-100 rounded-lg text-xs font-medium text-gray-500 uppercase tracking-wider">
          <button
            onClick={() => handleSort("name")}
            className="flex items-center gap-2 text-left"
          >
            CANDIDATE
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <div>Interview</div>
          <button
            onClick={() => handleSort("date")}
            className="flex items-center gap-2 text-left"
          >
            SUBMITTED
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <div className="text-left">Contact Info</div>
          <div className="text-center">Qualified</div>
          <div className="text-center">Rating</div>
          <div className="text-left">Status</div>
          <div className="text-center">Actions</div>
        </div>

        {filtered.map((attempt, index) => {
          const lastChar = attempt.id.slice(-1);
          const isQualifiedDemo =
            !isNaN(parseInt(lastChar, 16)) && parseInt(lastChar, 16) % 2 === 0;
          const demoRating = index % 2 === 0 ? 7 : 8;

          return (
            <Card key={attempt.id} className="p-4">
              <div className="grid grid-cols-8 gap-2 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    {attempt.candidateName.charAt(0)}
                  </div>
                  <span>{attempt.candidateName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  {attempt.interviewTitle}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  {attempt.createdAt}
                </div>
                <div className="text-sm text-gray-600">
                  <div>{attempt.email}</div>
                  <div>{attempt.phone}</div>
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    variant="default"
                    size="sm"
                    className={cn(
                      "pointer-events-none h-7 px-2",
                      attempt.qualified
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    )}
                  >
                    {attempt.qualified ? "Qualified" : "Not Qualified"}
                  </Button>
                </div>
                <div className="text-center font-bold">
                  {attempt.generalScore
                    ? `${attempt.generalScore} / 10`
                    : "N/A"}
                </div>
                <div>
                  <Select
                    value={attempt.status}
                    onValueChange={(value) =>
                      handleLocalStatusChange(attempt.id, value)
                    }
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Pending", "Rejected", "Hired"].map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Button
                    variant="link"
                    onClick={() => handleViewAnalysis(attempt)}
                    className="text-blue-600"
                  >
                    View AI Analysis
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-500">No attempts found.</div>
      )}

      {selectedAttempt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                AI Analysis: {selectedAttempt.candidateName}
              </h2>
              <button
                onClick={() => setSelectedAttempt(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Candidate Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">
                      {selectedAttempt.candidateName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Position</p>
                    <p className="font-medium">
                      {selectedAttempt.interviewTitle}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedAttempt.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Submission Date</p>
                    <p className="font-medium">{selectedAttempt.createdAt}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Performance Rating
                </h3>
                <Card className="p-4 bg-blue-50">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          selectedAttempt.generalScore !== null &&
                            selectedAttempt.generalScore / 2 > i
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {selectedAttempt.generalScore} / 10
                    </span>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  {selectedEvaluation?.summary && (
                    <p className="text-blue-800 mb-4">
                      {selectedEvaluation.summary}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {selectedEvaluation?.strengths?.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-blue-800"
                          >
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{item.replace(/^-\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">
                        Weaknesses
                      </h4>
                      <ul className="space-y-1">
                        {selectedEvaluation?.weaknesses?.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-blue-800"
                          >
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                            <span>{item.replace(/^-\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedAttempt(null)}
                  className="w-full"
                >
                  Close
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/interviews/responses/${selectedAttempt.id}`, {
                      state: {
                        candidateName: selectedAttempt.candidateName,
                        interviewTitle: selectedAttempt.interviewTitle,
                      },
                    })
                  }
                  className="w-full"
                >
                  Full Response Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
