import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { supabase } from "@/app/lib/supabase";
import { usePlan } from "@/hooks/usePlan";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, X, Star, Shield, ArrowRight, Eye, Lock, Lightbulb, AlertCircle, ArrowDown, Sparkles } from "lucide-react";
import { useLocation } from "react-router-dom";
import { cn } from "@/app/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CandidateStats, getTextColorForScore, getColorForScoreHex, getBgColorForScore } from "@/components/ui/statbar";

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
  const [activeTab, setActiveTab] = useState<"questions" | "reviews" | "pdf" | "transcript">("reviews");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [transcriptUrl, setTranscriptUrl] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const { hasAccess } = usePlan();
  const [evaluationData, setEvaluationData] = useState<any | null>(null);
  const location = useLocation();
  const { candidateName: passedName, interviewTitle: passedTitle } =
    location.state || {};
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [fileName, setFileName] = useState<string | null>(null);
  const [isMetricsOpen, setIsMetricsOpen] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);
  
  const canDownload = hasAccess('LAUNCH');

  const scrollToAISummary = () => {
    const element = document.getElementById('summary-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowScrollButton(false);
    }
  };

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isMetricsOpen) {
      // Store original overflow value
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      // Cleanup function
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMetricsOpen]);

  // Show scroll button when scrolling back up
  useEffect(() => {
    const handleScroll = () => {
      const overallRatingElement = document.getElementById('summary-section');
      if (overallRatingElement) {
        const rect = overallRatingElement.getBoundingClientRect();
        const elementHeight = rect.height;
        const elementTopPosition = rect.top;
        const elementBottomPosition = rect.bottom;
        const viewportHeight = window.innerHeight;
        
        const isHalfwayOutFromTop = elementTopPosition > viewportHeight * 0.65;
        const isHalfwayOutFromBottom = elementBottomPosition < viewportHeight * 0.65;
        
        setShowScrollButton(isHalfwayOutFromTop || isHalfwayOutFromBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchResponse = async () => {
      try {

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

      

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



  function ProgressOnLoad({ rating }: { rating?: number | null }) {
    const target = Math.max(0, Math.min(100, (rating ?? 0) * 10));
    const [value, setValue] = useState(0);
  
    useEffect(() => {
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }, [target]);
  
    return (
      <div className="w-[100px] h-[100px]">
        <CircularProgressbar
          value={value}
          styles={buildStyles({
            pathColor: getColorForScoreHex(rating),
            pathTransitionDuration: 0.7,
            pathTransition: "stroke-dashoffset 0.7s ease 0.3s"
          })}
        />
      </div>
    );
  }

  const renderProgress = (rating: number | null | undefined) => (
    <ProgressOnLoad rating={rating} />
  );

 
    const downloadPdf = async (type: 'transcript' | 'analysis') => {
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
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold">
                  Overall Rating: <span className={` text-xl font-bold ${getTextColorForScore(response.overallRating)}`}>{response.overallRating}/10</span>
                </h2>
                <Button 
                  onClick={() => setIsMetricsOpen(true)}
                  className="group inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full
                  border-0 shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-8 "
                >
                  View Metrics
                  <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

              </div>
              <div className="w-full">
                <div className="flex items-center mb-4">
                  <CandidateStats categories={[
                    { label: "Communication", value: response.metrics.communication },
                    { label: "Experience", value: response.metrics.experience },
                    { label: "Professionalism", value: response.metrics.professionalism },
                    { label: "Reliability", value: response.metrics.reliability },
                    { label: "Problem Solving", value: response.metrics.problemSolving },
                    { label: "Cognitive Ability", value: response.metrics.cognitiveAbility },
                  ]} />
                </div>
              </div>
            </Card>

            <div id="summary-section">
              <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>
              <Card className="p-6 mb-4 bg-gradient-to-br from-card to-accent/5 shadow-lg border-2 border-accent/40">
                <div className="flex items-start gap-3">
                  <Lightbulb className="flex-shrink-0 w-4 h-4 text-accent mt-1" />
                  <div>
                    <h3 className="font-medium text-accent mb-2">
                      Key Observations
                    </h3>
                    <p className="text-blue-700">
                      {response.aiAnalysis.keyObservations}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 bg-gradient-to-br from-card to-teal/5 shadow-lg border-2 border-teal/40">
                  <div className="flex items-start gap-3">
                    <Shield className="flex-shrink-0 w-4 h-4 text-teal mt-1" />
                    <div>
                      <h3 className="font-medium text-teal mb-3">Strengths</h3>
                    <p>
                      <ul className="space-y-2">
                      {response.aiAnalysis.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start text-teal-500">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          <span>{strength.replace(/^[-•]\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  </p>
                  </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-card to-terracotta/5 shadow-lg border-2 border-terracotta/40">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="flex-shrink-0 w-4 h-4 text-terracotta mt-1" />
                    <div>
                      <h3 className="font-medium text-terracotta mb-3">Weaknesses</h3>
                      <ul className="space-y-2">
                        {response.aiAnalysis.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start text-red-600">
                            <span className="w-2 h-2 bg-red-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                            <span>{weakness.replace(/^[-•]\s*/, "")}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
                  activeTab === "reviews"
                    ? "text-purple-500 border-b-2 border-purple-500"
                    : "text-gray-600 hover:text-purple-500"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                <Star className="w-4 h-4 inline-block mr-2" />
                Reviews & Ratings
              </button>
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
            </div>

            {/* Right side labels */}
            <div className="flex gap-4">
              <TooltipProvider>
              <Tooltip>
              <TooltipTrigger asChild>
              <button
                className={cn(
                  "px-4 py-2 font-medium whitespace-nowrap",
                  !canDownload
                    ? "text-gray-400"
                    : activeTab === "transcript"
                    ? "text-teal border-b-2 border-teal"
                    : "text-gray-600 hover:text-teal"
                )}
                disabled={!canDownload}
                onClick={async () => {
                  if (!canDownload) return;
                  setActiveTab("transcript");
                  const candidateName = passedName || response?.candidateName || 'Candidate';
                  const position = passedTitle || response?.appliedPosition || 'Interview';
                  const sanitizedName = candidateName.replace(/[^a-zA-Z0-9]/g, '_');
                  const sanitizedPosition = position.replace(/[^a-zA-Z0-9]/g, '_');
                  const customFileName = `${sanitizedName}_${sanitizedPosition}_transcript.pdf`;
                  setFileName(customFileName);
                }}
              >
                {(!canDownload
                  ? <Lock className="w-4 h-4 inline-block mr-2 text-red-500 cursor-pointer" />
                  : <Eye className="w-4 h-4 inline-block mr-2" />)}
                View Transcript PDF 
              </button>
              </TooltipTrigger>
              {!canDownload && (
                <TooltipContent>Upgrade to Launch to unlock this feature</TooltipContent>
              )}
              </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
              <Tooltip>
              <TooltipTrigger asChild>
              <button
                className={cn(
                  "px-4 py-2 font-medium whitespace-nowrap",
                  !canDownload
                    ? "text-gray-400"
                    : activeTab === "pdf"
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                )}
                disabled={!canDownload}
                onClick={async () => {
                  if (!canDownload) return;
                  setActiveTab("pdf");
                  const candidateName = passedName || response?.candidateName || 'Candidate';
                  const position = passedTitle || response?.appliedPosition || 'Interview';
                  const sanitizedName = candidateName.replace(/[^a-zA-Z0-9]/g, '_');
                  const sanitizedPosition = position.replace(/[^a-zA-Z0-9]/g, '_');
                  const customFileName = `${sanitizedName}_${sanitizedPosition}_analysis.pdf`;
                  setFileName(customFileName);
                }}
              >
                {(!canDownload
                  ? <Lock className="w-4 h-4 inline-block mr-2 text-red-500 cursor-pointer" />
                  : <Eye className="w-4 h-4 inline-block mr-2" />)}
                View Analysis PDF
              </button>
              </TooltipTrigger>
              {!canDownload && (
                <TooltipContent>Upgrade to Launch to unlock this feature</TooltipContent>
              )}
              </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {renderContent()}
      
       {/* Mobile floating button to scroll to overall rating */}
       <div className={`lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center z-50 transition-opacity duration-500 ${showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <Button
           onClick={scrollToAISummary}
           className="bg-blue-600 border-2 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-12 py-6 text-xl font-semibold"
         >
           <Sparkles className="w-4 h-4 mr-2" />
           View Summary
         </Button>
       </div>
      
      {/* Evaluation Dialog */}
      {isMetricsOpen && createPortal(
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center rounded-lg shadow-lg">
          <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh]">
            {/* Fixed Header */}
            <div className="flex justify-between items-center p-8 pb-4 border-b bg-white rounded-t-lg">
              <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold">
                Detailed Metrics: {response?.candidateName}
              </h2>
              <p className="text-gray-600">Applied for: {passedTitle || response?.appliedPosition || "Interview"}</p>
              </div>
              <button
                onClick={() => setIsMetricsOpen(false)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-red-600 h-10 w-10 hover:bg-red-50"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-8 pt-4 no-scrollbar">
              <div className="space-y-6">
                <div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className={`${getBgColorForScore(response?.metrics.communication)} p-4 rounded-lg`}>
                        <h4 className="text-gray-900 font-medium mb-2">Communication</h4>
                        <p className="text-2xl font-bold mb-2 text-blue-600">{response?.metrics.communication}/10</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{response?.metricEvaluations.communication}</p>
                      </div>  
                      <div className={`${getBgColorForScore(response?.metrics.experience)} p-4 rounded-lg`}>
                        <h4 className="text-gray-900 font-medium mb-2">Experience</h4>
                        <p className="text-2xl font-bold mb-2 text-blue-600">{response?.metrics.experience}/10</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{response?.metricEvaluations.experience}</p>
                      </div>
                      <div className={`${getBgColorForScore(response?.metrics.professionalism)} p-4 rounded-lg`}>
                        <h4 className="text-gray-900 font-medium mb-2">Professionalism</h4>
                        <p className="text-2xl font-bold mb-2 text-blue-600">{response?.metrics.professionalism}/10</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{response?.metricEvaluations.professionalism}</p>
                      </div>
                      <div className={`${getBgColorForScore(response?.metrics.reliability)} p-4 rounded-lg`}>
                        <h4 className="text-gray-900 font-medium mb-2">Reliability</h4>
                        <p className="text-2xl font-bold mb-2 text-blue-600">{response?.metrics.reliability}/10</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{response?.metricEvaluations.reliability}</p>
                      </div>
                      <div className={`${getBgColorForScore(response?.metrics.problemSolving)} p-4 rounded-lg`}>
                        <h4 className="text-gray-900 font-medium mb-2">Problem Solving</h4>
                        <p className="text-2xl font-bold mb-2 text-blue-600">{response?.metrics.problemSolving}/10</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{response?.metricEvaluations.problemSolving}</p>
                      </div>
                      <div className={`${getBgColorForScore(response?.metrics.cognitiveAbility)} p-4 rounded-lg`}>
                        <h4 className="text-gray-900 font-medium mb-2">Cognitive Ability</h4>
                        <p className="text-2xl font-bold mb-2 text-blue-600">{response?.metrics.cognitiveAbility}/10</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{response?.metricEvaluations.cognitiveAbility}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-2">
                  <Button
                    onClick={() => setIsMetricsOpen(false)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>, document.body)
      }
      
      {/* <MetricEvaluationDialog /> */}
    </div>
  );
}