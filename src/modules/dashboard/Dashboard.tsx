import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  Calendar,
  Plus,
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  UserCheck,
  UserPlus,
  MapPin,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/app/lib/supabase";

interface Interview {
  id: string;
  title: string;
  location: string;
  deadline: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentInterviews, setRecentInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [appliedCount, setAppliedCount] = useState(0);
  const [qualifiedCount, setQualifiedCount] = useState(0);
  const [hiredCount, setHiredCount] = useState(0);
  const [averageTimeToHire, setAverageTimeToHire] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchRecentInterviews = async () => {
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("id, title, created_at, deadline, language")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching interviews:", error);
        setRecentInterviews([]);
      } else if (data && data.length > 0) {
        const formattedInterviews = data.map((interview) => ({
          id: interview.id,
          title: interview.title,
          location: interview.language || "Remote",
          deadline: interview.deadline
            ? new Date(interview.deadline).toLocaleDateString("en-US")
            : "No deadline",
          createdAt: new Date(interview.created_at).toLocaleDateString("en-US"),
        }));

        setRecentInterviews(formattedInterviews);
      } else {
        setRecentInterviews([]);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
      setRecentInterviews([]);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCandidatesApplied = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profile, error: profileError } = await supabase
      .from("company_profiles")
      .select("willo_company_key")
      .eq("created_by_user_id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching company key:", profileError);
      return;
    }

    const companyKey = profile.willo_company_key;
    // 1. Fetch all attempts for the company
    const { data: attempts, error: attemptsError } = await supabase
      .from("interview_attempts")
      .select("candidate_id, qualified, status")
      .eq("department_key", companyKey)
      .not("candidate_id", "is", null); // remove nulls

    if (attemptsError || !attempts) {
      console.error("Error fetching attempts:", attemptsError);
      return;
    }

    // 2. Deduplicate by candidate_id
    const uniqueCandidates = new Map(); // candidate_id -> { qualified, status }

    for (const attempt of attempts) {
      if (!uniqueCandidates.has(attempt.candidate_id)) {
        uniqueCandidates.set(attempt.candidate_id, attempt);
      }
    }

    const appC = uniqueCandidates.size;
    const qualifiedCount = [...uniqueCandidates.values()].filter(
      (c) => c.qualified === true
    ).length;
    const hiredCount = [...uniqueCandidates.values()].filter(
      (c) => c.status === "Hired"
    ).length;

    const { data, error } = await supabase
      .from("company_analytics")
      .select("total_days_to_hire, total_hired_cases")
      .eq("department_key", companyKey)
      .single();
    if (error || !data || data.total_hired_cases === 0) {
      console.error("Error fetching average time to hire:", error);
      setAverageTimeToHire(0);
    } else {
      const avg =
        Math.round((data.total_days_to_hire / data.total_hired_cases) * 10) / 10;
      setAverageTimeToHire(avg);
    }

    // 3. Set to state
    setAppliedCount(appC);
    setQualifiedCount(qualifiedCount);
    setHiredCount(hiredCount);
  };

  useEffect(() => {
    document.title = "dashboard.fsagent.com";
    const fetchAll = async () => {
      try {
        await Promise.all([fetchRecentInterviews(), fetchCandidatesApplied()]);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const metrics = [
    {
      title: "Candidates Applied",
      value: appliedCount.toString(),
      change: "",
      icon: UserPlus,
      description: "Total applications received",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Qualified Candidates",
      value: qualifiedCount.toString(),
      change: "",
      icon: Users,
      description: "Candidates with a 7+ rating",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Candidates Hired",
      value: hiredCount.toString(),
      change: "",
      icon: UserCheck,
      description: "Successfully hired candidates",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Average Time to Hire",
      value: averageTimeToHire.toString(),
      change: "",
      icon: Clock,
      description: "Average days to complete hire",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  const quickActions = [
    {
      title: "Create Interview",
      description: "Set up a new interview session",
      icon: <Plus className="h-5 w-5 text-blue-600" />,
      action: () => navigate("/interviews/create"),
      color:
        "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200",
    },
    {
      title: "View Interviews",
      description: "Review past interview sessions",
      icon: <Calendar className="h-5 w-5 text-green-600" />,
      action: () => navigate("/interviews"),
      color:
        "bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200",
    },
    {
      title: "View Candidates",
      description: "Review candidate responses",
      icon: <Users className="h-5 w-5 text-violet-600" />,
      action: () => navigate("/interviews/responses"),
      color:
        "bg-gradient-to-br from-violet-50 to-violet-100 hover:from-violet-100 hover:to-violet-200",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to ServiceAgent!</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.title} className="p-6 shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                                      <div className={`${metric.bgColor} p-3 rounded-lg shadow-md ring-2 ring-white/50`}>
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {metric.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-semibold text-gray-900">
                        {metric.value}
                      </p>
                      <span
                        className={
                          metric.change.startsWith("+")
                            ? "text-green-600 text-sm"
                            : "text-red-600 text-sm"
                        }
                      >
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Create Interview Card */}
            <Card
              className="p-6 cursor-pointer hover:bg-gray-50 transition-all duration-300 shadow-lg border-0 bg-white hover:shadow-xl hover:scale-105"
              onClick={() => navigate("/interviews/create")}
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg shadow-md ring-2 ring-blue-100">
                  <Plus className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Create Interview</h3>
                  <p className="text-sm text-gray-500">
                    Set up a new interview session
                  </p>
                </div>
              </div>
            </Card>

            {/* View Responses Card */}
            <Card
              className="p-6 cursor-pointer hover:bg-gray-50 transition-all duration-300 shadow-lg border-0 bg-white hover:shadow-xl hover:scale-105"
              onClick={() => navigate("/interviews/responses")}
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-lg shadow-md ring-2 ring-purple-100">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium">View Candidates</h3>
                  <p className="text-sm text-gray-500">
                    Review candidate responses
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Interviews */}
        <div className="bg-white rounded-xl shadow-lg border-0 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Interviews
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Your latest interviews
              </p>
            </div>
            <button
              onClick={() => navigate("/interviews")}
              className="text-sm text-[#1E529D] font-medium flex items-center hover:text-[#1E529D]/90 transition-colors"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading interviews...</p>
            </div>
          ) : recentInterviews.length === 0 ? (
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 shadow-lg ring-4 ring-gray-50">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No interviews yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first interview to get started
              </p>
              <button
                onClick={() => navigate("/interviews/create")}
                className="inline-flex items-center px-6 py-2 bg-[#004aad] hover:bg-[#004aad]/80 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Interview
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentInterviews.map((interview, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => navigate(`/interviews/${interview.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3 shadow-md ring-2 ring-white">
                        {interview.title.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {interview.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Created on {interview.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center text-xs text-gray-500">
                        <Languages className="h-3 w-3 mr-1" />
                        {interview.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {interview.deadline}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
