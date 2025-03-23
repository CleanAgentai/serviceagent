import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  hourlyRate: string;
  description: string;
  questions: Question[];
  showHints: boolean;
  showAvailability: boolean;
  deadline?: Date;
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

export default function CreateInterview() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("basic-details");

  const [loading, setLoading] = useState(false);
  const [interviewLink, setInterviewLink] = useState<string | null>(null);

  // Initialize form data
  const [formData, setFormData] = useState<InterviewFormData>({
    title: "",
    language: "English",
    hourlyRate: "",
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
  });

  // Handle basic details changes
  const handleBasicDetailsChange = (
    field: keyof InterviewFormData,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle question changes
  const handleQuestionChange = (
    id: string,
    field: keyof Question,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      ),
    }));
  };

  // Add a new question
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

  // Remove a question
  const removeQuestion = useCallback(
    (id: string) => {
      if (formData.questions.length <= 1) {
        toast.error("You must have at least one question");
        return;
      }

      setFormData((prev) => {
        const filteredQuestions = prev.questions.filter((q) => q.id !== id);
        // Reorder questions
        const reorderedQuestions = filteredQuestions.map((q, index) => ({
          ...q,
          order: index + 1,
        }));

        return {
          ...prev,
          questions: reorderedQuestions,
        };
      });
    },
    [formData.questions]
  );

  // Navigate to next tab
  const nextTab = () => {
    if (activeTab === "basic-details") {
      // Validate basic details
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
      // Validate questions
      const invalidQuestions = formData.questions.filter((q) => !q.text.trim());
      if (invalidQuestions.length > 0) {
        toast.error("All questions must have text");
        return;
      }

      setActiveTab("settings");
    }
  };

  // Navigate to previous tab
  const prevTab = () => {
    if (activeTab === "questions") {
      setActiveTab("basic-details");
    } else if (activeTab === "settings") {
      setActiveTab("questions");
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create an interview");
      return;
    }

    setLoading(true);

    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("You must be logged in to create an interview");
        setLoading(false);
        return;
      }

      // Generate a unique interview ID and link
      const interviewId = uuidv4();
      const generatedLink = `${window.location.origin}/interview/${interviewId}`;

      const transformedQuestions = formData.questions.map((q, index) => ({
        text: q.text,
        order: index + 1,
        answer_type: q.answerType,
        max_duration: q.maxDuration || null,
        max_retakes: q.maxRetakes || null,
        max_characters: q.maxCharacters || null,
        thinking_time: q.thinkingTime || null,
      }));

      // Prepare the interview data
      const interviewData = {
        id: interviewId,
        user_id: user.id,
        title: formData.title,
        default_language: formData.language,
        department: "f451bd9ef1c94fd3a7e3b1a583cc3fa0", //hardcoding
        description: formData.description,
        message_templates: {
          invitation_email: null,
          invitation_sms: null,
          reminder_email: null,
          reminder_sms: null,
          interview_completed_email: null,
        },
        questions: transformedQuestions,
        //hourly_rate: formData.hourlyRate,
        settings: {
          show_hints_and_tips: formData.showHints,
          show_availability_calendar: formData.showAvailability,
          deadline: formData.deadline ? formData.deadline.toISOString() : null,
        },
        // deadline: formData.deadline ? formData.deadline.toISOString() : null,
        // created_at: new Date().toISOString(),
        // interview_link: generatedLink,
      };

      console.log("Sending interview data:", interviewData);

      // Directly insert data into the interviews table
      // const { error: saveError } = await supabase
      //   .from('interviews')
      //   .insert(interviewData);

      // if (saveError) {
      //   console.error('Error saving interview:', saveError);

      //   if (saveError.message) {
      //     if (saveError.message.includes('does not exist')) {
      //       // Table likely doesn't exist - show clear message
      //       toast.error('The interviews table does not exist. Please contact your administrator to set up the database.');
      //     } else if (saveError.message.includes('column')) {
      //       // Column mismatch issue
      //       toast.error('Database structure issue. Some fields may not match the current database structure.');
      //     } else {
      //       // Other database error
      //       toast.error(`Database error: ${saveError.message}`);
      //     }
      //   } else {
      //     toast.error('Failed to create interview. Please try again.');
      //   }

      //   setLoading(false);
      //   return;
      // }
      const response = await fetch("http://localhost:5000/api/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to create interview");
      }

      const result = await response.json();
      console.log("Willow response:", result);
      // Set the interview link to display to the user
      setInterviewLink(generatedLink);

      toast.success("Interview created successfully!");
      navigate("/interviews");
    } catch (error) {
      console.error("Error in handleSubmit:", error);

      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  // Copy interview link to clipboard
  const copyLinkToClipboard = () => {
    if (interviewLink) {
      navigator.clipboard
        .writeText(interviewLink)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link"));
    }
  };

  // View all interviews
  const viewAllInterviews = () => {
    navigate("/interviews");
  };

  // Render the appropriate content based on the active tab
  const renderTabContent = () => {
    if (interviewLink) {
      return (
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              Interview Created Successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Share this link with your candidates:
            </p>
          </div>

          <div className="flex items-center w-full max-w-xl p-3 bg-gray-50 border rounded-md">
            <input
              type="text"
              value={interviewLink}
              readOnly
              className="flex-1 bg-transparent border-none focus:outline-none text-sm"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={copyLinkToClipboard}
              className="ml-2"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={viewAllInterviews}>
              View All Interviews
            </Button>
            <Button
              onClick={() => {
                setInterviewLink(null);
                setFormData({
                  title: "",
                  language: "English",
                  hourlyRate: "",
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
                });
                setActiveTab("basic-details");
              }}
            >
              Create Another Interview
            </Button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case "basic-details":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="required">
                Title of Interview/Position
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  handleBasicDetailsChange("title", e.target.value)
                }
                placeholder="e.g. Software Engineer Interview"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language (Optional)</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    handleBasicDetailsChange("language", value)
                  }
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
                <Label htmlFor="hourlyRate">Hourly Rate (Optional)</Label>
                <Input
                  id="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={(e) =>
                    handleBasicDetailsChange("hourlyRate", e.target.value)
                  }
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
                onChange={(e) =>
                  handleBasicDetailsChange("description", e.target.value)
                }
                placeholder="Describe the interview process and what candidates should expect..."
                rows={5}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="button" onClick={nextTab}>
                Next: Questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case "questions":
        return (
          <div className="space-y-8">
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
                    <Label
                      htmlFor={`question-${question.id}`}
                      className="required"
                    >
                      Question Text
                    </Label>
                    <Textarea
                      id={`question-${question.id}`}
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(
                          question.id,
                          "text",
                          e.target.value
                        )
                      }
                      placeholder="Enter your question here..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`answerType-${question.id}`}
                        className="required"
                      >
                        Answer Type
                      </Label>
                      <Select
                        value={question.answerType}
                        onValueChange={(value) => {
                          const answerType = value as Question["answerType"];
                          handleQuestionChange(
                            question.id,
                            "answerType",
                            answerType
                          );
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
                        <Label htmlFor={`maxDuration-${question.id}`}>
                          Max Duration (seconds)
                        </Label>
                        <Input
                          id={`maxDuration-${question.id}`}
                          type="number"
                          min="10"
                          value={question.maxDuration || ""}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.id,
                              "maxDuration",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="e.g. 60"
                        />
                      </div>
                    )}

                    {question.answerType === "text" && (
                      <div className="space-y-2">
                        <Label htmlFor={`maxCharacters-${question.id}`}>
                          Max Characters
                        </Label>
                        <Input
                          id={`maxCharacters-${question.id}`}
                          type="number"
                          min="10"
                          value={question.maxCharacters || ""}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.id,
                              "maxCharacters",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="e.g. 500"
                        />
                      </div>
                    )}
                  </div>

                  {(question.answerType === "video" ||
                    question.answerType === "text") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`maxRetakes-${question.id}`}>
                          Max Retakes
                        </Label>
                        <Input
                          id={`maxRetakes-${question.id}`}
                          type="number"
                          min="0"
                          value={question.maxRetakes || ""}
                          onChange={(e) =>
                            handleQuestionChange(
                              question.id,
                              "maxRetakes",
                              e.target.value
                                ? parseInt(e.target.value)
                                : undefined
                            )
                          }
                          placeholder="e.g. 3"
                        />
                      </div>

                      {question.answerType === "video" && (
                        <div className="space-y-2">
                          <Label htmlFor={`thinkingTime-${question.id}`}>
                            Thinking Time (seconds)
                          </Label>
                          <Input
                            id={`thinkingTime-${question.id}`}
                            type="number"
                            min="0"
                            value={question.thinkingTime || ""}
                            onChange={(e) =>
                              handleQuestionChange(
                                question.id,
                                "thinkingTime",
                                e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined
                              )
                            }
                            placeholder="e.g. 30"
                          />
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

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevTab}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating..." : "Create Interview"}
              </Button>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Interview Settings</h3>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="showHints"
                      className="text-base font-medium"
                    >
                      Show Hints and Tips
                    </Label>
                    <p className="text-sm text-gray-500">
                      Display helpful hints to candidates during the interview
                    </p>
                  </div>
                  <Switch
                    id="showHints"
                    checked={formData.showHints}
                    onCheckedChange={(checked) =>
                      handleBasicDetailsChange("showHints", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="showAvailability"
                      className="text-base font-medium"
                    >
                      Show Availability
                    </Label>
                    <p className="text-sm text-gray-500">
                      Allow candidates to see when the interview is available
                    </p>
                  </div>
                  <Switch
                    id="showAvailability"
                    checked={formData.showAvailability}
                    onCheckedChange={(checked) =>
                      handleBasicDetailsChange("showAvailability", checked)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-base font-medium">
                    Interview Deadline
                  </Label>
                  <p className="text-sm text-gray-500 mb-2">
                    Set a deadline for when candidates must complete the
                    interview
                  </p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.deadline
                          ? format(formData.deadline, "PPP")
                          : "Select a deadline"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={formData.deadline}
                        onSelect={(date) =>
                          handleBasicDetailsChange("deadline", date)
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={prevTab}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Creating..." : "Create Interview"}
                </Button>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create Interview</h1>
        <p className="text-gray-600 mt-2">
          Set up an interview process for your candidates
        </p>
      </div>

      {!interviewLink && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic-details">Basic Details</TabsTrigger>
            <TabsTrigger value="questions">Interview Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="mt-6">{renderTabContent()}</div>
        </Tabs>
      )}

      {interviewLink && renderTabContent()}
    </div>
  );
}
