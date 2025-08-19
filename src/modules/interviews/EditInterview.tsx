import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/app/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Trash2,
  Plus,
  ArrowRight,
  ArrowLeft,
  Copy,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useAuth } from "@/app/providers/AuthContext";

// Define types for our form
interface Question {
  id: string;
  text: string;
  order: number;
  answerType: "video" | "text";
  maxDuration?: number;
  maxRetakes?: number;
  maxCharacters?: number;
  thinkingTime?: number;
}

interface InterviewFormData {
  title: string;
  language: string;
  description: string;
  questions: Question[];
  showHints: boolean;
  showAvailability: boolean;
  deadline?: Date;
  hourly_wage?: string;
}

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Arabic",
  "Russian",
  "Portuguese",
  "Hindi",
];

export default function EditInterview() {
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("basic-details");
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [formData, setFormData] = useState<InterviewFormData>({
    title: "",
    language: "English",
    description: "",
    questions: [
      {
        id: uuidv4(),
        text: "",
        order: 1,
        answerType: "video",
      },
    ],
    showHints: true,
    showAvailability: true,
    deadline: undefined,
    hourly_wage: "",
  });
  const [originalFormData, setOriginalFormData] = useState(formData);

  // Track if changes have been made
  const isChanged = JSON.stringify(formData) !== JSON.stringify(originalFormData);

  // Handlers for form fields (mirroring CreateInterview)
  const handleBasicDetailsChange = (field: keyof InterviewFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleQuestionChange = (id: string, field: keyof Question, value: any) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    }));
  };
  const addQuestion = useCallback(() => {
    const newOrder = formData.questions.length + 1;
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: uuidv4(),
          text: "",
          order: newOrder,
          answerType: "video",
        },
      ],
    }));
  }, [formData.questions]);
  const removeQuestion = useCallback(
    (id: string) => {
      if (formData.questions.length <= 1) {
        toast.error("You must have at least one question");
        return;
      }
      setFormData((prev) => {
        const filteredQuestions = prev.questions.filter((q) => q.id !== id);
        const reorderedQuestions = filteredQuestions.map((q, index) => ({
          ...q,
          order: index + 1,
        }));
        return { ...prev, questions: reorderedQuestions };
      });
    },
    [formData.questions]
  );

  // Tab navigation
  const nextTab = () => {
    if (activeTab === "basic-details") {
      if (!formData.title.trim()) {
        toast.error("Interview title is required");
        return;
      }
      if (!formData.description.trim()) {
        toast.error("Interview description is required");
        return;
      }
      setActiveTab("questions");
    } else if (activeTab === "questions") {
      const invalidQuestions = formData.questions.filter((q) => !q.text.trim());
      if (invalidQuestions.length > 0) {
        toast.error("All questions must have text");
        return;
      }
      setActiveTab("settings");
    }
  };
  const prevTab = () => {
    if (activeTab === "questions") {
      setActiveTab("basic-details");
    } else if (activeTab === "settings") {
      setActiveTab("questions");
    }
  };

  // Cancel logic with confirmation
  const handleCancel = () => {
    if (isChanged) {
      setShowConfirmCancel(true);
    } else {
      navigate("/interviews");
    }
  };
  const confirmCancel = () => {
    setShowConfirmCancel(false);
    navigate("/interviews");
  };
  const dismissCancel = () => setShowConfirmCancel(false);

  // Fetch interview data on mount
  useEffect(() => {
    async function fetchInterview() {
      setLoading(true);
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${apiBaseUrl}/api/interviews/${interviewId}`, {
          headers: {
            "ngrok-skip-browser-warning": "true",
          }
        });
        console.log('[EditInterview] Raw fetch response:', response);
        if (!response.ok) {
          toast.error("Failed to load interview data");
          setLoading(false);
          return;
        }
        const data = await response.json();
        console.log('[EditInterview] Parsed interview data:', data);
        if (!data.questions || !Array.isArray(data.questions)) {
          toast.error("No questions found for this interview.");
        }
        setFormData({
          title: data.title || "",
          language: data.language || "English",
          description: data.description || "",
          questions: Array.isArray(data.questions) && data.questions.length > 0
            ? data.questions.map((q: any, idx: number) => ({
                id: q.id || uuidv4(),
                text: q.question_text || "",
                order: q.question_order || idx + 1,
                answerType: q.question_type || "video",
                maxDuration: q.max_duration || undefined,
                maxRetakes: q.max_retakes || undefined,
                maxCharacters: q.max_characters || undefined,
                thinkingTime: q.thinking_time || undefined,
              }))
            : [],
          showHints: data.show_hints_and_tips ?? true,
          showAvailability: data.show_availability_calendar ?? true,
          deadline: data.deadline ? new Date(data.deadline) : undefined,
          hourly_wage: data.hourly_wage || "",
        });
        setOriginalFormData({
          title: data.title || "",
          language: data.language || "English",
          description: data.description || "",
          questions: Array.isArray(data.questions) && data.questions.length > 0
            ? data.questions.map((q: any, idx: number) => ({
                id: q.id || uuidv4(),
                text: q.question_text || "",
                order: q.question_order || idx + 1,
                answerType: q.question_type || "video",
                maxDuration: q.max_duration || undefined,
                maxRetakes: q.max_retakes || undefined,
                maxCharacters: q.max_characters || undefined,
                thinkingTime: q.thinking_time || undefined,
              }))
            : [],
          showHints: data.show_hints_and_tips ?? true,
          showAvailability: data.show_availability_calendar ?? true,
          deadline: data.deadline ? new Date(data.deadline) : undefined,
          hourly_wage: data.hourly_wage || "",
        });
      } catch (err) {
        toast.error("Error loading interview");
        console.error('[EditInterview] Error loading interview:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchInterview();
    // eslint-disable-next-line
  }, [interviewId]);

  // Update handleApply to use isUpdating
  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/api/interviews/${interviewId}`, {
        method: "PUT",
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          questions: formData.questions,
          settings: {
            show_hints_and_tips: formData.showHints,
            show_availability_calendar: formData.showAvailability,
            deadline: formData.deadline ? formData.deadline.toISOString() : null,
          },
        }),
      });
      if (!response.ok) {
        toast.error("Failed to update interview");
        setIsUpdating(false);
        return;
      }
      toast.success("Interview updated successfully!");
      setOriginalFormData(formData);
      setTimeout(() => {
        navigate("/interviews");
      }, 1200);
    } catch (err) {
      toast.error("Error updating interview");
    } finally {
      setIsUpdating(false);
    }
  };

  // Placeholder UI while loading or if formData is not ready
  if (loading || !formData) {
    return <div className="p-8 text-center">Loading interview data...</div>;
  }

  // Render the form UI (mirroring CreateInterview)
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {isUpdating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Saving Changes</h3>
            <p className="text-gray-600">Please wait while we update your interview...</p>
          </div>
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Interview</h1>
        <p className="text-gray-600 mt-2">
          Update the interview details and questions below.
        </p>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full h-full grid-cols-3 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <TabsTrigger value="basic-details"><p className="max-sm:text-wrap">Basic Details</p></TabsTrigger>
          <TabsTrigger value="questions"><p className="max-sm:text-wrap">Interview Questions</p></TabsTrigger>
          <TabsTrigger value="settings"><p className="max-sm:text-wrap">Settings</p></TabsTrigger>
        </TabsList>
        <div className="mt-6">
          {activeTab === "basic-details" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="required">
                  Title of Interview/Position
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleBasicDetailsChange("title", e.target.value)}
                  placeholder="e.g. Software Engineer Interview"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language (Optional)</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => handleBasicDetailsChange("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourly_wage">Hourly Rate (Optional)</Label>
                  <Input
                    id="hourly_wage"
                    type="text"
                    value={formData.hourly_wage || ""}
                    onChange={(e) => handleBasicDetailsChange("hourly_wage", e.target.value)}
                    placeholder="e.g. $25 - $35"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="required">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleBasicDetailsChange("description", e.target.value)}
                  placeholder="Describe the interview process and what candidates should expect..."
                  rows={5}
                  required
                />
              </div>
              <div className="flex justify-end">
                <Button type="button" onClick={nextTab} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 px-6 py-3">
                  Next: Questions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          {activeTab === "questions" && (
            <div className="space-y-8">
              {formData.questions.length === 0 && (
                <div className="text-center text-red-500 font-semibold">No questions found for this interview.</div>
              )}
              {formData.questions.map((question, index) => (
                <Card key={question.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">
                        Question {question.order}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove question</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`question-${question.id}`} className="required">
                        Question Text
                      </Label>
                      <Textarea
                        id={`question-${question.id}`}
                        value={question.text}
                        onChange={(e) =>
                          handleQuestionChange(question.id, "text", e.target.value)
                        }
                        placeholder="Enter your question here..."
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`answerType-${question.id}`} className="required">
                          Answer Type
                        </Label>
                        <Select
                          value={question.answerType}
                          onValueChange={(value) => {
                            const answerType = value as Question["answerType"];
                            handleQuestionChange(question.id, "answerType", answerType);
                          }}
                        >
                          <SelectTrigger id={`answerType-${question.id}`}>
                            <SelectValue placeholder="Select answer type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {question.answerType === "video" && (
                        <div className="space-y-2">
                          <Label htmlFor={`maxDuration-${question.id}`} className="required">
                            Max Duration (seconds)
                          </Label>
                          <Select
                            value={question.maxDuration?.toString() || ""}
                            onValueChange={(value) =>
                              handleQuestionChange(question.id, "maxDuration", Number(value))
                            }
                          >
                            <SelectTrigger id={`maxDuration-${question.id}`}>
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="60">60</SelectItem>
                              <SelectItem value="120">120</SelectItem>
                              <SelectItem value="180">180</SelectItem>
                              <SelectItem value="240">240</SelectItem>
                              <SelectItem value="300">300</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {question.answerType === "text" && (
                        <div className="space-y-2">
                          <Label htmlFor={`maxCharacters-${question.id}`} className="required">
                            Max Characters
                          </Label>
                          <Select
                            value={question.maxCharacters?.toString() || ""}
                            onValueChange={(value) =>
                              handleQuestionChange(question.id, "maxCharacters", Number(value))
                            }
                          >
                            <SelectTrigger id={`maxCharacters-${question.id}`}>
                              <SelectValue placeholder="Select max characters" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="200">200</SelectItem>
                              <SelectItem value="400">400</SelectItem>
                              <SelectItem value="600">600</SelectItem>
                              <SelectItem value="800">800</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                    {(question.answerType === "video" || question.answerType === "text") && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`maxRetakes-${question.id}`}>Max Retakes</Label>
                          <Select
                            value={question.maxRetakes?.toString() || ""}
                            onValueChange={(value) =>
                              handleQuestionChange(question.id, "maxRetakes", Number(value))
                            }
                          >
                            <SelectTrigger id={`maxRetakes-${question.id}`}>
                              <SelectValue placeholder="Select number of retakes" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                              <SelectItem value="3">3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {question.answerType === "video" && (
                          <div className="space-y-2">
                            <Label htmlFor={`thinkingTime-${question.id}`}>Thinking Time (seconds)</Label>
                            <Select
                              value={question.thinkingTime?.toString() || ""}
                              onValueChange={(value) =>
                                handleQuestionChange(question.id, "thinkingTime", Number(value))
                              }
                            >
                              <SelectTrigger id={`thinkingTime-${question.id}`}>
                                <SelectValue placeholder="Select thinking time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="30">30</SelectItem>
                                <SelectItem value="60">60</SelectItem>
                                <SelectItem value="90">90</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" onClick={addQuestion} className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                Add Question
              </Button>
              <div className="flex justify-between items-center mt-4 gap-2">
                <Button type="button" variant="outline" onClick={prevTab} className="bg-white text-black shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 border border-gray-200 focus:z-10 relative">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button type="button" onClick={nextTab} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 px-6 py-3">
                  Next: Settings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Interview Settings</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showHints" className="text-base font-medium">
                        Show Hints and Tips
                      </Label>
                      <p className="text-sm text-gray-500">
                        Display helpful hints to candidates during the interview
                      </p>
                    </div>
                    {/* Mobile: Select, Desktop: Switch */}
                    <div className="md:hidden">
                      <Select
                        value={formData.showHints ? "yes" : "no"}
                        onValueChange={(value) =>
                          handleBasicDetailsChange("showHints", value === "yes")
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="hidden md:flex justify-end">
                    <Switch
                      id="showHints"
                      checked={formData.showHints}
                      onCheckedChange={(checked) => handleBasicDetailsChange("showHints", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="showAvailability" className="text-base font-medium">
                        Show Availability
                      </Label>
                      <p className="text-sm text-gray-500">
                        Allow candidates to see when the interview is available
                      </p>
                    </div>
                    {/* Mobile: Select, Desktop: Switch */}
                    <div className="md:hidden">
                      <Select
                        value={formData.showAvailability ? "yes" : "no"}
                        onValueChange={(value) =>
                          handleBasicDetailsChange("showAvailability", value === "yes")
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="hidden md:flex justify-end">
                    <Switch
                      id="showAvailability"
                      checked={formData.showAvailability}
                      onCheckedChange={(checked) => handleBasicDetailsChange("showAvailability", checked)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deadline" className="text-base font-medium">
                      Interview Deadline
                    </Label>
                    <p className="text-sm text-gray-500 mb-2">
                      Set a deadline for when candidates must complete the interview
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.deadline ? format(formData.deadline, "PPP") : "Select a deadline"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={formData.deadline}
                          onSelect={(date) => handleBasicDetailsChange("deadline", date)}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={prevTab} className="bg-white text-black shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 border border-gray-200 focus:z-10 relative">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  <Button type="button" onClick={handleApply} disabled={!isChanged} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xlfocus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 px-6 py-3">
                    Apply
                  </Button>
                  <Button type="button" variant="destructive" onClick={handleCancel} className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 px-6 py-3">
                    Cancel
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </Tabs>
      {/* Confirm Cancel Dialog */}
      {showConfirmCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Discard Changes?
              </h3>
              <p className="text-gray-600 mb-8">
                You have unsaved changes. Are you sure you want to cancel and lose your edits?
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={dismissCancel} className="px-6 hover:bg-gray-50">
                  Go Back
                </Button>
                <Button variant="destructive" onClick={confirmCancel} className="bg-red-600 hover:bg-red-700 text-white px-6">
                  Discard Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 