import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/app/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface InterviewAttempt {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  createdAt: string;
  interviewTitle: string;
}

export function ViewResponses() {
  const [attempts, setAttempts] = useState<InterviewAttempt[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedAttempt, setSelectedAttempt] =
    useState<InterviewAttempt | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttempts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("interview_attempts")
        .select(
          `
          id,
          interview_id,
          candidate_id,
          created_at,
          candidates(email,name,phone),
          interviews(title)
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching attempts:", error);
        setAttempts([]);
      } else {
        const formatted = data.map((item: any) => ({
          id: item.id,
          candidateName: item.candidates?.name || "Unknown",
          email: item.candidates?.email || "N/A",
          phone: item.candidates?.phone || "N/A",
          createdAt: new Date(item.created_at).toLocaleDateString(),
          interviewTitle: item.interviews?.title || "Untitled Interview",
        }));
        setAttempts(formatted);
      }

      setLoading(false);
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Interview Attempts</h1>
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
        <div className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 rounded-lg font-semibold">
          <button
            onClick={() => handleSort("name")}
            className="flex items-center gap-2"
          >
            Candidate
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <div>Interview</div>
          <button
            onClick={() => handleSort("date")}
            className="flex items-center gap-2"
          >
            Submitted
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <div>Contact Info</div>
          <div>Actions</div>
        </div>

        {filtered.map((attempt) => (
          <Card key={attempt.id} className="p-4">
            <div className="grid grid-cols-5 gap-4 items-center">
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
              <div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedAttempt(attempt)}
                >
                  View AI Analysis
                </Button>
              </div>
            </div>
          </Card>
        ))}
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
                  Overall Performance Rating
                </h3>
                <Card className="p-4 bg-blue-50">
                  <div className="flex items-center gap-2">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                    <Star className="w-4 h-4 text-yellow-400 fill-current opacity-50" />
                    <span className="ml-2 text-sm text-gray-600">9.0 / 10</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-800">
                    Strong candidate well-suited for the position.
                  </p>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 mb-4">
                    Excellent product vision and leadership qualities. Good fit
                    for the role.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {[
                          "Strong product strategy background",
                          "Excellent stakeholder management",
                          "Proven track record of successful product launches",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-blue-800"
                          >
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">
                        Weaknesses
                      </h4>
                      <ul className="space-y-1">
                        {[
                          "Could improve technical understanding",
                          "Limited experience in our specific industry",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-blue-800"
                          >
                            <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                            <span>{item}</span>
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
