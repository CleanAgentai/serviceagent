import React, { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Video, X, Star, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MetricEvaluation {
  title: string;
  analysis: string;
  strengths: string[];
  weaknesses: string[];
}

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
  };
  metricEvaluations: {
    communication: MetricEvaluation;
    experience: MetricEvaluation;
    professionalism: MetricEvaluation;
    reliability: MetricEvaluation;
    problemSolving: MetricEvaluation;
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

        // Mock data - replace with actual API data
        setResponse({
          id: responseId || "",
          candidateName: passedName || "John Smith",
          appliedPosition: "Software Engineer – Technical Round 1",
          overallRating: 8.5,
          metrics: {
            communication: 8.5,
            experience: 7.5,
            professionalism: 9,
            reliability: 8,
            problemSolving: 7,
          },
          metricEvaluations: {
            communication: {
              title: "Communication Evaluation",
              analysis:
                "John demonstrated strong verbal communication skills, effectively conveying his ideas with clarity and confidence. He maintained a professional and engaging tone, adapting well to the interviewer's prompts. However, his responses occasionally included unnecessary details, making them slightly longer than needed. Refining his answers to be more structured and concise would improve overall effectiveness.",
              strengths: [
                "Articulates ideas clearly and confidently",
                "Engages well in conversation and adapts tone appropriately",
                "Demonstrates active listening skills",
              ],
              weaknesses: [
                "Could streamline responses to be more concise",
                "Needs to focus on delivering key points efficiently without over-explaining",
              ],
            },
            experience: {
              title: "Experience Evaluation",
              analysis:
                "The candidate shows solid foundational experience in software development with practical knowledge of key technologies. Their project work demonstrates hands-on experience, though some areas could benefit from deeper technical exposure.",
              strengths: [
                "Strong practical coding experience",
                "Good understanding of software development lifecycle",
                "Proven track record of project delivery",
              ],
              weaknesses: [
                "Limited experience with enterprise-scale applications",
                "Could benefit from more exposure to modern frameworks",
              ],
            },
            professionalism: {
              title: "Professionalism Evaluation",
              analysis:
                "Candidate exhibited excellent professional conduct throughout the interview. Their demeanor, preparation, and approach to discussion demonstrated strong professional maturity.",
              strengths: [
                "Well-prepared for technical discussions",
                "Maintains professional composure",
                "Shows respect and courtesy in communication",
              ],
              weaknesses: [
                "Could improve time management in responses",
                "May benefit from more structured presentation of ideas",
              ],
            },
            reliability: {
              title: "Reliability Evaluation",
              analysis:
                "The candidate demonstrated good reliability through consistent responses and clear commitment to project delivery. Their examples showed dedication to meeting deadlines and handling responsibilities.",
              strengths: [
                "Strong track record of meeting deadlines",
                "Consistent approach to problem-solving",
                "Takes ownership of assigned tasks",
              ],
              weaknesses: [
                "Could provide more specific examples of handling setbacks",
                "Needs more emphasis on proactive communication",
              ],
            },
            problemSolving: {
              title: "Problem Solving Evaluation",
              analysis:
                "Shows good analytical capabilities and systematic approach to problem-solving. The candidate demonstrated ability to break down complex problems, though sometimes could be more efficient in solution development.",
              strengths: [
                "Methodical approach to problem analysis",
                "Good understanding of algorithmic thinking",
                "Ability to consider multiple solutions",
              ],
              weaknesses: [
                "Could improve efficiency in solution implementation",
                "Needs to better prioritize optimization approaches",
              ],
            },
          },
          aiAnalysis: {
            keyObservations:
              "The candidate demonstrates strong potential with notable experience in the field. Their communication skills and technical knowledge align well with the position requirements.",
            strengths: [
              "Strong communication skills",
              "Relevant industry experience",
              "Problem-solving abilities",
            ],
            weaknesses: [
              "Previous project outcomes",
              "Team collaboration style",
              "Career growth expectations",
            ],
          },
          questions: mappedQuestions,
          // [
          //   {
          //     id: "1",
          //     question: "Tell us about your experience in software development",
          //     answer: "I have 5 years of experience in software development...",
          //     //videoUrl: "https://example.com/video1",
          //   },
          //   {
          //     id: "2",
          //     question:
          //       "How do you handle technical challenges in your projects?",
          //     answer:
          //       "My approach to handling technical challenges involves...",
          //     //videoUrl: "https://example.com/video2",
          //   },
          // ],
        });
      } catch (error) {
        console.error("Error fetching response:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [responseId]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
        );
      } else {
        stars.push(<Star key={i} className="w-6 h-6 text-gray-300" />);
      }
    }
    return stars;
  };

  const MetricEvaluationDialog = () => {
    if (!selectedMetric || !response) return null;

    const evaluation =
      response.metricEvaluations[
        selectedMetric as keyof typeof response.metricEvaluations
      ];

    return (
      <Dialog
        open={!!selectedMetric}
        onOpenChange={() => setSelectedMetric(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
              <span>Candidate Evaluation – {evaluation.title}</span>
            </DialogTitle>
            <div className="flex flex-col gap-2 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">{response.candidateName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">
                  Position/Interview Applied:
                </span>
                <span className="font-medium">{response.appliedPosition}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Metric:</span>
                <span className="font-medium">{selectedMetric}</span>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <Card className="p-6 bg-blue-50">
                <p className="text-blue-800">{evaluation.analysis}</p>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-green-50">
                <h3 className="font-medium text-green-900 mb-3">Strengths</h3>
                <ul className="space-y-2">
                  {evaluation.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-center text-green-800"
                    >
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-red-50">
                <h3 className="font-medium text-red-900 mb-3">Weaknesses</h3>
                <ul className="space-y-2">
                  {evaluation.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-center text-red-800">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
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
                    <Button
                      variant="link"
                      className="text-blue-600 p-0"
                      onClick={() => setSelectedMetric("communication")}
                    >
                      View Communication Assessment
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Experience</td>
                  <td className="py-2 px-4">
                    {response.metrics.experience}/10
                  </td>
                  <td className="py-2 px-4">
                    <Button
                      variant="link"
                      className="text-blue-600 p-0"
                      onClick={() => setSelectedMetric("experience")}
                    >
                      View Technical Background
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Professionalism</td>
                  <td className="py-2 px-4">
                    {response.metrics.professionalism}/10
                  </td>
                  <td className="py-2 px-4">
                    <Button
                      variant="link"
                      className="text-blue-600 p-0"
                      onClick={() => setSelectedMetric("professionalism")}
                    >
                      View Professional Conduct
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Reliability</td>
                  <td className="py-2 px-4">
                    {response.metrics.reliability}/10
                  </td>
                  <td className="py-2 px-4">
                    <Button
                      variant="link"
                      className="text-blue-600 p-0"
                      onClick={() => setSelectedMetric("reliability")}
                    >
                      View Dependability Report
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Problem Solving</td>
                  <td className="py-2 px-4">
                    {response.metrics.problemSolving}/10
                  </td>
                  <td className="py-2 px-4">
                    <Button
                      variant="link"
                      className="text-blue-600 p-0"
                      onClick={() => setSelectedMetric("problemSolving")}
                    >
                      View Analytical Skills
                    </Button>
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
                    {strength}
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
                    {weakness}
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
      <MetricEvaluationDialog />
    </div>
  );
}
