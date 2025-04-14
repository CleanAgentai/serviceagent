import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, X, Star, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// interface MetricEvaluation {
//   title: string;
//   analysis: string;
//   strengths: string[];
//   weaknesses: string[];
// }

interface Response {
  id: string;
  candidateName: string;
  appliedPosition: string;
  overallRating: number;
  metrics: {
    communication: number;
    experience: number;
    professionalism: number;
    reliability: number;
    problemSolving: number;
    cognitiveAbility: number;
  };
  metricEvaluations: {
    communication: string;
    experience: string;
    professionalism: string;
    reliability: string;
    problemSolving: string;
    cognitiveAbility: string;
  };
  aiAnalysis: {
    keyObservations: string;
    strengths: string[];
    weaknesses: string[];
  };
  questions: Array<{
    id: string;
    question: string;
    answer: string;
    //videoUrl?: string;
  }>;
}

interface QuestionData {
  id: string;
  responses_text: string;
  questions: { question_text: string } | null;
}

export function ResponseDetails() {
  const { responseId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"questions" | "reviews">(
    "questions"
  );
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [evaluationData, setEvaluationData] = useState<any | null>(null);
  const location = useLocation();
  const { candidateName: passedName, interviewTitle: passedTitle } =
    location.state || {};

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchResponse = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { data: rawQuestionData, error: questionError } = await supabase
          .from("responses")
          .select(
            `
          id,
          responses_text,
          question_id,
          questions ( question_text )
        `
          )
          .eq("interview_attempt_id", responseId);

        if (questionError) {
          console.error("Error fetching questions:", questionError);
        }
        console.log("supabase data type:", rawQuestionData);
        const questionData = rawQuestionData as unknown as QuestionData[];

        const mappedQuestions = (questionData || []).map((item) => ({
          id: item.id,
          question: item.questions?.question_text || "Unknown question",
          answer: item.responses_text || "",
        }));

        //fetch eval_results
        const { data: evalData, error: evalError } = await supabase
          .from("evaluation_results")
          .select("*")
          .eq("interview_attempt_id", responseId)
          .single();

        if (evalError || !evalData)
          throw evalError || new Error("Evaluation data not found");

        // Mock data - replace with actual API data
        setResponse({
          id: responseId || "",
          candidateName: passedName || "Unknown",
          appliedPosition: "Unknown Position",
          overallRating: evalData.general_score ?? 0,
          metrics: {
            communication: evalData.communication_score ?? 0,
            experience: evalData.experience_score ?? 0,
            professionalism: evalData.professionalism_score ?? 0,
            reliability: evalData.reliability_score ?? 0,
            problemSolving: evalData.problem_solving_score ?? 0,
            cognitiveAbility: evalData.cognitive_ability_score ?? 0,
          },
          metricEvaluations: {
            communication: evalData.communication_justification ?? "",
            experience: evalData.experience_justification ?? "",
            professionalism: evalData.professionalism_justification ?? "",
            reliability: evalData.reliability_justification ?? "",
            problemSolving: evalData.problem_solving_justification ?? "",
            cognitiveAbility: evalData.cognitive_ability_justification ?? "",
          },
          aiAnalysis: {
            keyObservations: evalData.general_summary ?? "",
            strengths: Array.isArray(evalData.general_strengths)
              ? evalData.general_strengths
              : typeof evalData.general_strengths === "string"
              ? evalData.general_strengths.split("\n")
              : [],
            weaknesses: Array.isArray(evalData.general_weaknesses)
              ? evalData.general_weaknesses
              : typeof evalData.general_weaknesses === "string"
              ? evalData.general_weaknesses.split("\n")
              : [],
          },
          questions: mappedQuestions,
        });
      } catch (error) {
        console.error("Error fetching response:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [responseId]);

  const renderStars = (rating: number | null | undefined) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "w-6 h-6",
          rating !== null && rating / 2 > i
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        )}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Response Not Found</h2>
        <Button onClick={() => navigate("/interviews/responses")}>
          Back to Responses
        </Button>
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === "questions") {
      return (
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Interview Questions</h2>
            <div className="space-y-4">
              {response.questions.map((q) => (
                <button
                  key={q.id}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selectedQuestion === q.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                  onClick={() => setSelectedQuestion(q.id)}
                >
                  <p className="text-sm font-medium text-gray-900">
                    {q.question}
                  </p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Transcript</h2>
            {selectedQuestion ? (
              <div className="text-gray-600">
                {response.questions.find((q) => q.id === selectedQuestion)
                  ?.answer || "Select a question to view its transcript"}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a question to view its transcript
              </div>
            )}
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Overall Rating</h2>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-blue-600">
              {response.overallRating}/10
            </span>
            <div className="flex">{renderStars(response.overallRating)}</div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Ratings</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">
                    Metric
                  </th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">
                    Rating
                  </th>
                  <th className="text-left py-2 px-4 font-semibold text-gray-700">
                    Evaluation and Feedback
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">Communication</td>
                  <td className="py-2 px-4">
                    {response.metrics.communication}/10
                  </td>
                  <td className="py-2 px-4">
                    {response.metricEvaluations.communication}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Experience</td>
                  <td className="py-2 px-4">
                    {response.metrics.experience}/10
                  </td>
                  <td className="py-2 px-4">
                    {response.metricEvaluations.experience}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Professionalism</td>
                  <td className="py-2 px-4">
                    {response.metrics.professionalism}/10
                  </td>
                  <td className="py-2 px-4">
                    {response.metricEvaluations.professionalism}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Reliability</td>
                  <td className="py-2 px-4">
                    {response.metrics.reliability}/10
                  </td>
                  <td className="py-2 px-4">
                    {response.metricEvaluations.reliability}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Problem Solving</td>
                  <td className="py-2 px-4">
                    {response.metrics.problemSolving}/10
                  </td>
                  <td className="py-2 px-4">
                    {response.metricEvaluations.problemSolving}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Cognitive Ability</td>
                  <td className="py-2 px-4">
                    {response.metrics.cognitiveAbility}/10
                  </td>
                  <td className="py-2 px-4">
                    {response.metricEvaluations.cognitiveAbility}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <div>
          <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>
          <Card className="p-6 mb-4 bg-blue-50">
            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">
                  Key Observations
                </h3>
                <p className="text-blue-800">
                  {response.aiAnalysis.keyObservations}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-green-50">
              <h3 className="font-medium text-green-900 mb-3">Strengths</h3>
              <ul className="space-y-2">
                {response.aiAnalysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-center text-green-800">
                    <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    {strength.replace(/^[-•]\s*/, "")}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-red-50">
              <h3 className="font-medium text-red-900 mb-3">Weaknesses</h3>
              <ul className="space-y-2">
                {response.aiAnalysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center text-red-800">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    {weakness.replace(/^[-•]\s*/, "")}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            size="icon"
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">
              {passedName || "Candidate"}
            </h1>
            <p className="text-gray-600">
              Applied for{" "}
              {passedTitle || response?.appliedPosition || "Interview"}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          size="icon"
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-4 border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "questions"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("questions")}
        >
          <Video className="w-4 h-4 inline-block mr-2" />
          Video & Transcripts
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "reviews"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          <Star className="w-4 h-4 inline-block mr-2" />
          Reviews & Ratings
        </button>
      </div>

      {renderContent()}
      {/* <MetricEvaluationDialog /> */}
    </div>
  );
}
