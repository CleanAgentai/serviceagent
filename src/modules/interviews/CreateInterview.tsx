import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/app/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import {
  Trash2,
  Plus,
  ArrowRight,
  ArrowLeft,
  Copy,
  Calendar,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useAuth } from '@/app/providers/AuthContext';

// Define types for our form
interface Question {
  id: string;
  text: string;
  order: number;
  answerType: 'video' | 'text';
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
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Arabic',
  'Russian',
  'Portuguese',
  'Hindi',
];

export default function CreateInterview() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('basic-details');

  const [loading, setLoading] = useState(false);
  const [interviewLink, setInterviewLink] = useState<string | null>(null);

  // Initialize form data
  const [formData, setFormData] = useState<InterviewFormData>({
    title: '',
    language: 'English',
    hourlyRate: '',
    description: '',
    questions: [
      {
        id: uuidv4(),
        text: '',
        order: 1,
        answerType: 'video',
      },
    ],
    showHints: true,
    showAvailability: true,
  });

  // Handle basic details changes
  const handleBasicDetailsChange = (
    field: keyof InterviewFormData,
    value: any,
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
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q,
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
          text: '',
          order: newOrder,
          answerType: 'video',
        },
      ],
    }));
  }, [formData.questions]);

  // Remove a question
  const removeQuestion = useCallback(
    (id: string) => {
      if (formData.questions.length <= 1) {
        toast.error('You must have at least one question');
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
    [formData.questions],
  );

  // Navigate to next tab
  const nextTab = () => {
    if (activeTab === 'basic-details') {
      // Validate basic details
      if (!formData.title.trim()) {
        toast.error('Interview title is required');
        return;
      }
      if (!formData.description.trim()) {
        toast.error('Interview description is required');
        return;
      }
      setActiveTab('questions');
    } else if (activeTab === 'questions') {
      // Validate questions
      const invalidQuestions = formData.questions.filter((q) => !q.text.trim());
      if (invalidQuestions.length > 0) {
        toast.error('All questions must have text');
        return;
      }

      setActiveTab('settings');
    }
  };

  // Navigate to previous tab
  const prevTab = () => {
    if (activeTab === 'questions') {
      setActiveTab('basic-details');
    } else if (activeTab === 'settings') {
      setActiveTab('questions');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in to create an interview');
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
        toast.error('You must be logged in to create an interview');
        setLoading(false);
        return;
      }
      //bring willo_company_key from company_profiles
      const { data: companyProfile, error: profileError } = await supabase
        .from('company_profiles')
        .select('willo_company_key')
        .eq('created_by_user_id', user.id)
        .single();

      if (profileError || !companyProfile?.willo_company_key) {
        toast.error('Could not find your company profile or Willow key.');
        setLoading(false);
        return;
      }

      const departmentKey = companyProfile.willo_company_key;

      // Generate a unique interview ID and link
      const interviewId = uuidv4();
      const generatedLink = `${window.location.origin}/interview/${interviewId}`;

      const transformedQuestions = formData.questions.map((q, index) => {
        const base = {
          text: q.text,
          order: index + 1,
          answer_type: q.answerType,
          max_retakes: q.maxRetakes ?? 0,
        };

        if (q.answerType === 'video') {
          return {
            ...base,
            max_duration: q.maxDuration ?? 60, // 반드시 있어야 함
            thinking_time: q.thinkingTime ?? 3, // 반드시 있어야 함
          };
        }

        if (q.answerType === 'text') {
          return {
            ...base,
            max_characters: q.maxCharacters ?? 500, // 반드시 있어야 함
          };
        }

        return base;
      });

      // Prepare the interview data
      const interviewData = {
        id: interviewId,
        user_id: user.id,
        title: formData.title,
        default_language: formData.language,
        department: departmentKey, //hardcoding
        description: formData.description,
        message_templates: {
          invitation_email: null,
          invitation_sms: null,
          reminder_email: null,
          reminder_sms: null,
          interview_completed_email: null,
        },
        questions: transformedQuestions,
        salary: formData.hourlyRate,
        settings: {
          show_hints_and_tips: formData.showHints,
          show_availability_calendar: formData.showAvailability,
          deadline: formData.deadline ? formData.deadline.toISOString() : null,
        },

        // created_at: new Date().toISOString(),
        // interview_link: generatedLink,
      };

      console.log('Sending interview data:', interviewData);

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

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/api/interviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to create interview');
      }

      const result = await response.json();
      console.log('Willow response:', result);
      const {
        key: willo_interview_key,
        invite_link: interview_link,
        settings,
      } = result;
      const show_hints_and_tips = settings?.show_hints_and_tips;
      const show_availability_calendar = settings?.show_availability_calendar;
      console.log('invite_link', interview_link);

      const { error: insertError } = await supabase.from('interviews').insert({
        user_id: user.id,
        willo_interview_key,
        title: formData.title,
        description: formData.description,
        department: departmentKey,
        deadline: formData.deadline ? formData.deadline.toISOString() : null,
        language: formData.language,
        interview_link,
        show_hints_and_tips,
        show_availability_calendar,
        hourly_wage: formData.hourlyRate,
      });

      if (!insertError) {
        const { data: insertedInterview, error: fetchError } = await supabase
          .from('interviews')
          .select('id')
          .eq('willo_interview_key', willo_interview_key)
          .eq('user_id', user.id)
          .single();

        if (!fetchError && insertedInterview?.id) {
          const { data: profile, error: profileError } = await supabase
            .from('company_profiles')
            .select('first_interview_id')
            .eq('willo_company_key', departmentKey)
            .single();

          if (!profileError && !profile?.first_interview_id) {
            const { error: updateError } = await supabase
              .from('company_profiles')
              .update({
                first_interview_id: insertedInterview.id,
              })
              .eq('willo_company_key', departmentKey);
          }
        }
      }

      if (insertError) {
        console.error('❌ Supabase insert error:', insertError);
        throw new Error(insertError.message);
      }

      // Insert questions into Supabase
      const { error: questionInsertError } = await supabase
        .from('questions')
        .insert(
          formData.questions.map((q, index) => ({
            interview_id: willo_interview_key,
            question_text: q.text,
            question_type: q.answerType,
            question_order: index + 1,
            max_duration: q.maxDuration || null,
            max_retakes: q.maxRetakes || null,
            max_characters: q.maxCharacters || null,
            thinking_time: q.thinkingTime || null,
            created_at: new Date().toISOString(),
          })),
        );

      if (questionInsertError) {
        console.error('❌ Failed to insert questions:', questionInsertError);
        throw new Error('Question insert failed');
      }

      // Set the interview link to display to the user
      setInterviewLink(generatedLink);

      toast.success('Interview created successfully!');
      navigate('/interviews');
    } catch (error) {
      console.error('Error in handleSubmit:', error);

      if (error instanceof Error) {
        toast.error(`An error occurred: ${error.message}`);
      } else {
        toast.error('An unexpected error occurred');
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
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };

  // View all interviews
  const viewAllInterviews = () => {
    navigate('/interviews');
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
                  title: '',
                  language: 'English',
                  hourlyRate: '',
                  description: '',
                  questions: [
                    {
                      id: uuidv4(),
                      text: '',
                      order: 1,
                      answerType: 'video',
                    },
                  ],
                  showHints: true,
                  showAvailability: true,
                  deadline: undefined,
                });
                setActiveTab('basic-details');
              }}
            >
              Create Another Interview
            </Button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'basic-details':
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
                  handleBasicDetailsChange('title', e.target.value)
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
                    handleBasicDetailsChange('language', value)
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
                    handleBasicDetailsChange('hourlyRate', e.target.value)
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
                  handleBasicDetailsChange('description', e.target.value)
                }
                placeholder="Describe the interview process and what candidates should expect..."
                rows={5}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={nextTab}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 px-6 py-3"
              >
                Next: Questions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'questions':
        return (
          <div className="space-y-8">
            {formData.questions.map((question, index) => (
              <Card
                key={question.id}
                className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
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
                          'text',
                          e.target.value,
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
                          const answerType = value as Question['answerType'];
                          handleQuestionChange(
                            question.id,
                            'answerType',
                            answerType,
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

                    {question.answerType === 'video' && (
                      <div className="space-y-2">
                        <Label
                          htmlFor={`maxDuration-${question.id}`}
                          className="required"
                        >
                          Max Duration (seconds)
                        </Label>
                        <Select
                          //id={`maxDuration-${question.id}`}
                          value={question.maxDuration?.toString() || ''}
                          onValueChange={(value) =>
                            handleQuestionChange(
                              question.id,
                              'maxDuration',
                              Number(value),
                            )
                          }

                          //placeholder="e.g. 60"
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

                    {question.answerType === 'text' && (
                      <div className="space-y-2">
                        <Label
                          htmlFor={`maxCharacters-${question.id}`}
                          className="required"
                        >
                          Max Characters
                        </Label>
                        <Select
                          //id={`maxDuration-${question.id}`}
                          value={question.maxCharacters?.toString() || ''}
                          onValueChange={(value) =>
                            handleQuestionChange(
                              question.id,
                              'maxCharacters',
                              Number(value),
                            )
                          }

                          //placeholder="e.g. 60"
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

                  {(question.answerType === 'video' ||
                    question.answerType === 'text') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`maxRetakes-${question.id}`}>
                          Max Retakes
                        </Label>
                        <Select
                          value={question.maxRetakes?.toString() || ''}
                          onValueChange={(value) =>
                            handleQuestionChange(
                              question.id,
                              'maxRetakes',
                              Number(value),
                            )
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

                      {question.answerType === 'video' && (
                        <div className="space-y-2">
                          <Label htmlFor={`thinkingTime-${question.id}`}>
                            Thinking Time (seconds)
                          </Label>
                          <Select
                            value={question.thinkingTime?.toString() || ''}
                            onValueChange={(value) =>
                              handleQuestionChange(
                                question.id,
                                'thinkingTime',
                                Number(value),
                              )
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

            <Button
              variant="outline"
              onClick={addQuestion}
              className="w-full bg-white text-black shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 border border-gray-200 focus:z-10"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Question
            </Button>

            <div className="flex justify-between items-center mt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={prevTab}
                className="bg-white text-black shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 border border-gray-200 focus:z-10 relative"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                type="button"
                onClick={nextTab}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 px-6 py-3"
              >
                Next: Settings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );

      case 'settings':
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
                    <p className="text-sm text-gray-500 pr-8 max-sm:text-wrap">
                      Display helpful hints to candidates during the interview
                    </p>
                  </div>
                  {/* Mobile: Select, Desktop: Switch */}
                  <div className="md:hidden">
                    <Select
                      value={formData.showHints ? 'yes' : 'no'}
                      onValueChange={(value) =>
                        handleBasicDetailsChange('showHints', value === 'yes')
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
                      onCheckedChange={(checked) =>
                        handleBasicDetailsChange('showHints', checked)
                      }
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="showAvailability"
                      className="text-base font-medium"
                    >
                      Show Availability
                    </Label>
                    <p className="text-sm text-gray-500 pr-8 max-sm:pr-0">
                      Allow candidates to see when the interview is available
                    </p>
                  </div>
                  {/* Mobile: Select, Desktop: Switch */}
                  <div className="md:hidden">
                    <Select
                      value={formData.showAvailability ? 'yes' : 'no'}
                      onValueChange={(value) =>
                        handleBasicDetailsChange(
                          'showAvailability',
                          value === 'yes',
                        )
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
                      onCheckedChange={(checked) =>
                        handleBasicDetailsChange('showAvailability', checked)
                      }
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-base font-medium">
                    Interview Deadline
                  </Label>
                  <p className="text-sm text-gray-500 mb-4 pr-8">
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
                          ? format(formData.deadline, 'PPP')
                          : 'Select a deadline'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={formData.deadline}
                        onSelect={(date) =>
                          handleBasicDetailsChange('deadline', date)
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevTab}
                  className="bg-white text-black shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 border border-gray-200 focus:z-10 relative"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 px-6 py-3"
                >
                  {loading ? 'Creating...' : 'Create Interview'}
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
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold">Create Interview</h1>
        <p className="text-gray-600 mt-2">
          Set up an interview process for your candidates
        </p>
      </div>

      {!interviewLink && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full h-full grid-cols-3 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <TabsTrigger value="basic-details">
              <p className="max-sm:text-wrap">Basic Details</p>
            </TabsTrigger>
            <TabsTrigger value="questions">
              <p className="max-sm:text-wrap">Interview Questions</p>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <p className="max-sm:text-wrap">Settings</p>
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">{renderTabContent()}</div>
        </Tabs>
      )}

      {interviewLink && renderTabContent()}
    </div>
  );
}
