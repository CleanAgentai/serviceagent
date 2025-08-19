import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, X, Star, MessageCircle, ArrowRight, Eye } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
    videoUrl?: string | null;
  }>;
}

interface QuestionData {
  id: string;
  responses_text: string;
  questions: { question_text: string } | null;
  video_url: string | null;
}

export function ResponseDetails() {
  const { responseId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"questions" | "reviews" | "pdf" | "transcript">("questions");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [transcriptUrl, setTranscriptUrl] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [evaluationData, setEvaluationData] = useState<any | null>(null);
  const location = useLocation();
  const { candidateName: passedName, interviewTitle: passedTitle } =
    location.state || {};
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchResponse = async () => {
      try {

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        const { data: plan, error: planError } = await supabase
          .from("profiles")
          .select("subscription")
          .eq("id", user.id)
          .single();

        setPlan(plan.subscription);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { data: rawQuestionData, error: questionError } = await supabase
          .from("responses")
          .select(
            `
          id,
          responses_text,
          question_id,
          video_url,
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
          videoUrl: item.video_url || null,
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

  const getColorForScore = (score) => {
    if (score >= 8) return '#4caf50';       // Green
    if (score >= 5) return '#ff9800';       // Orange
    return '#f44336';                       // Red
  };

  const renderProgress = (rating: number | null | undefined) => {
    return (
      <div style={{ width: 50, height: 50 }}>
        <CircularProgressbar value={rating * 10}
          styles={buildStyles({
          pathColor: getColorForScore(rating),
          pathTransitionDuration: 0.5})} 
        />
      </div>
    )
  };

  const downloadPdf = async (type: 'transcript' | 'analysis') => {
    if (plan != "Scale" && plan != "Custom") return;
    
    try {
      const fileName = `${responseId}.pdf`;
      const bucket = type === 'transcript' ? 'interview-transcripts' : 'interview-pdfs';
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(fileName, 60);

      if (error || !data?.signedUrl) {
        console.error(`Failed to fetch ${type} PDF:`, error);
        return;
      }

      // Create custom filename
      const candidateName = passedName || response?.candidateName || 'Candidate';
      const position = passedTitle || response?.appliedPosition || 'Interview';
      const sanitizedName = candidateName.replace(/[^a-zA-Z0-9]/g, '_');
      const sanitizedPosition = position.replace(/[^a-zA-Z0-9]/g, '_');
      const customFileName = `${sanitizedName}_${sanitizedPosition}_${type}.pdf`;

      // Fetch the PDF and trigger download
      const pdfResponse = await fetch(data.signedUrl);
      const blob = await pdfResponse.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = customFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(`Error downloading ${type} PDF:`, err);
    }
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
          Back to Candidates
        </Button>
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === "questions") {
      return (
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg">
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

          <Card className="p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Transcript</h2>
            {selectedQuestion ? (
              <>
                {(() => {
                  const q = response.questions.find(
                    (q) => q.id === selectedQuestion
                  );
                  return q?.videoUrl ? (
                    <video
                      className="w-full mb-4 rounded-md"
                      controls
                      src={q.videoUrl}
                    />
                  ) : null;
                })()}
                <div className="text-gray-600">
                  {response.questions.find((q) => q.id === selectedQuestion)
                    ?.answer || "Select a question to view its transcript"}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a question to view its transcript
              </div>
            )}
          </Card>
        </div>
      );
    } else if (activeTab === "reviews") {
        return (
          <div className="space-y-6">
            <Card className="p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Overall Rating</h2>
              <div className="flex items-center justify-center gap-4">
                <span className="text-4xl font-bold text-blue-600">
                  {response.overallRating}/10
                </span>
                <div className="flex justify-center items-center">{renderProgress(response.overallRating)}</div>
              </div>
            </Card>

            <Card className="p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Ratings</h2>
              <div className="overflow-x-auto scrollbar-hide">
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
              <Card className="p-6 mb-4 bg-blue-50 shadow-lg">
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
                <Card className="p-6 bg-green-50 shadow-lg">
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

                <Card className="p-6 bg-red-50 shadow-lg">
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
      } else if (activeTab === "pdf") {
          return (
            <div className="w-full h-[80vh] border rounded-lg overflow-hidden">
                <iframe
                  src={`${apiBaseUrl}/api/pdf/download/${fileName}?responseId=${responseId}&type=analysis`}
                  title="Interview PDF"
                  className="w-full h-full border-none"
                  allow="fullscreen"
                  allowFullScreen
                />
            </div>
          );
        } else if (activeTab === "transcript") {
            return (
              <div className="w-full h-[80vh] border rounded-lg overflow-hidden">
                  <iframe
                    src={`${apiBaseUrl}/api/pdf/download/${fileName}?responseId=${responseId}&type=transcript`}
                    title="Transcript PDF"
                    className="w-full h-full border-none"
                    allow="fullscreen"
                    allowFullScreen
                  />
              </div>
            );
          }
  }

  return (
    <div className="relative z-0 md:container max-sm:mx-8 max-md:mt-8 md:mx-auto px-2 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          size="icon"
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex-1 text-center md:text-left px-4">
          <h1 className="text-2xl font-semibold">
            {passedName || "Candidate"}
          </h1>
          <p className="text-gray-600">
            Applied for{" "}
            {passedTitle || response?.appliedPosition || "Interview"}
          </p>
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

      <div className="border-b mb-6">
        {/* Scrollable tabs container */}
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-center min-w-max gap-4 px-4 py-2">
            {/* Left side tabs */}
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === "questions"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("questions")}
              >
                <Video className="w-4 h-4 inline-block mr-2" />
                Video & Transcripts
              </button>

              <button
                className={`px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === "reviews"
                    ? "text-purple-500 border-b-2 border-purple-500"
                    : "text-gray-600 hover:text-purple-500"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                <Star className="w-4 h-4 inline-block mr-2" />
                Reviews & Ratings
              </button>
            </div>

            {/* Right side labels */}
            <div className="flex gap-4">
              <button
                className={cn(
                  "px-4 py-2 font-medium whitespace-nowrap",
                  plan != "Scale" && plan != "Custom"
                    ? "text-gray-400 cursor-not-allowed"
                    : activeTab === "transcript"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-gray-600 hover:text-green-500"
                )}
                disabled={plan != "Scale" && plan != "Custom"}
                title={plan != "Scale" && plan != "Custom" ? "Upgrade your plan to access transcript PDF" : ""}
                onClick={async () => {
                  if (plan != "Scale" && plan != "Custom") return;
                  setActiveTab("transcript");
                  const candidateName = passedName || response?.candidateName || 'Candidate';
                  const position = passedTitle || response?.appliedPosition || 'Interview';
                  const sanitizedName = candidateName.replace(/[^a-zA-Z0-9]/g, '_');
                  const sanitizedPosition = position.replace(/[^a-zA-Z0-9]/g, '_');
                  const customFileName = `${sanitizedName}_${sanitizedPosition}_transcript.pdf`;
                  setFileName(customFileName);
                }}
              >
                <Eye className="w-4 h-4 inline-block mr-2" />
                View Transcript PDF
              </button>

              <button
                className={cn(
                  "px-4 py-2 font-medium whitespace-nowrap",
                  plan != "Scale" && plan != "Custom"
                    ? "text-gray-400 cursor-not-allowed"
                    : activeTab === "pdf"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                )}
                disabled={plan != "Scale" && plan != "Custom"}
                title={plan != "Scale" && plan != "Custom" ? "Upgrade your plan to access analysis PDF" : ""}
                onClick={async () => {
                  if (plan != "Scale" && plan != "Custom") return;
                  setActiveTab("pdf");
                  const candidateName = passedName || response?.candidateName || 'Candidate';
                  const position = passedTitle || response?.appliedPosition || 'Interview';
                  const sanitizedName = candidateName.replace(/[^a-zA-Z0-9]/g, '_');
                  const sanitizedPosition = position.replace(/[^a-zA-Z0-9]/g, '_');
                  const customFileName = `${sanitizedName}_${sanitizedPosition}_analysis.pdf`;
                  setFileName(customFileName);
                }}
              >
                <Eye className="w-4 h-4 inline-block mr-2" />
                View Analysis PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
      {/* <MetricEvaluationDialog /> */}
    </div>
  );
}
