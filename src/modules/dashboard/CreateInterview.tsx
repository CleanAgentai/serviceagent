import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  ChevronRight, 
  Plus, 
  X, 
  Sliders, 
  ArrowLeft,
  Info,
  CheckCircle2,
  AlertCircle,
  Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateInterview = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  
  // Form data state
  const [formData, setFormData] = useState({
    candidateName: '',
    position: '',
    date: '',
    time: '',
    department: '',
    experienceLevel: '',
    jobDescription: '',
    keyResponsibilities: '',
    aiStyle: 'conversational',
    duration: '30',
    aiPersonality: 'professional',
    followUpDepth: 3,
    settings: {
      realTimeFeedback: false,
      adaptiveQuestioning: false,
      sentimentAnalysis: false
    }
  });

  const steps = [
    { 
      number: 1, 
      title: 'Basic Details', 
      icon: <User />,
      description: 'Enter candidate and scheduling information'
    },
    { 
      number: 2, 
      title: 'Job Requirements', 
      icon: <Briefcase />,
      description: 'Define position requirements and responsibilities'
    },
    { 
      number: 3, 
      title: 'Interview Questions', 
      icon: <MessageSquare />,
      description: 'Prepare interview questions and topics'
    },
    { 
      number: 4, 
      title: 'AI Configuration', 
      icon: <Settings />,
      description: 'Configure AI interviewer settings'
    }
  ];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle settings toggle
  const handleSettingToggle = (setting: string) => {
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: !prev.settings[setting as keyof typeof prev.settings]
      }
    }));
  };

  // Handle form submission
  const handleCreateInterview = async () => {
    try {
      const interviewData = {
        ...formData,
        skills,
        questions,
        createdAt: new Date().toISOString()
      };

      // Here you would typically make an API call to create the interview
      console.log('Creating interview:', interviewData);
      
      // Show success message
      alert('Interview created successfully!');
      
      // Navigate back to interviews list
      navigate('/dashboard/view-interviews');
    } catch (error) {
      console.error('Error creating interview:', error);
      alert('Failed to create interview. Please try again.');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() && !questions.includes(newQuestion.trim())) {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion('');
    }
  };

  const handleRemoveQuestion = (questionToRemove: string) => {
    setQuestions(questions.filter(question => question !== questionToRemove));
  };

  const handleQuestionKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddQuestion();
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-white">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-blue-100 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold">Create Interview</h1>
            <p className="mt-2 text-blue-100">Set up a new AI-powered interview session</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                step === 1
                  ? 'bg-white/10 text-white/40 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              disabled={step === 1}
            >
              Previous
            </button>
            <button
              onClick={step === 4 ? handleCreateInterview : () => setStep(Math.min(4, step + 1))}
              className="px-5 py-2.5 bg-white text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-sm"
            >
              {step === 4 ? 'Create Interview' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {steps.map((s, index) => (
            <div
              key={index}
              className={`flex items-center ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                  step > s.number
                    ? 'bg-green-50 text-green-600'
                    : step === s.number
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                {step > s.number ? <CheckCircle2 className="h-6 w-6" /> : s.icon}
              </div>
              <div className="ml-4 flex-1">
                <p
                  className={`text-sm font-medium ${
                    step >= s.number ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  Step {s.number} - {s.title}
                </p>
                <p className="text-sm text-gray-500 mt-0.5">{s.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="hidden md:block h-5 w-5 text-gray-300 mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {steps[step - 1].title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {steps[step - 1].description}
              </p>
            </div>
            {step === 4 && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <Brain className="h-4 w-4" />
                AI Configuration
              </div>
            )}
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      name="candidateName"
                      value={formData.candidateName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter candidate name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter position"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <div className="relative">
                      <Clock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select department</option>
                      <option value="engineering">Engineering</option>
                      <option value="product">Product</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select experience level</option>
                      <option value="entry">Entry Level (0-2 years)</option>
                      <option value="mid">Mid Level (3-5 years)</option>
                      <option value="senior">Senior Level (6+ years)</option>
                      <option value="lead">Lead/Manager (8+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Required Skills
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Add a required skill"
                          />
                        </div>
                        <button
                          onClick={handleAddSkill}
                          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100"
                          >
                            <span className="text-sm font-medium">{skill}</span>
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-2 focus:outline-none"
                            >
                              <X className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Description
                    </label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter detailed job description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Key Responsibilities
                    </label>
                    <textarea
                      name="keyResponsibilities"
                      value={formData.keyResponsibilities}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter key responsibilities for this position"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Questions
                    </label>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <textarea
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            onKeyPress={handleQuestionKeyPress}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Add an interview question"
                            rows={2}
                          />
                        </div>
                        <button
                          onClick={handleAddQuestion}
                          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 h-fit transition-colors"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {questions.map((question, index) => (
                          <div
                            key={index}
                            className="flex items-start justify-between p-3 bg-gray-50 rounded-lg group border border-gray-100"
                          >
                            <p className="text-sm text-gray-700 flex-1 mr-4">{question}</p>
                            <button
                              onClick={() => handleRemoveQuestion(question)}
                              className="text-gray-400 hover:text-red-500 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-800 mb-4">
                      <Info className="h-5 w-5" />
                      <h3 className="text-sm font-medium">Suggested Questions</h3>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={() => setNewQuestion("Can you describe a challenging project you've worked on and how you handled it?")}
                        className="w-full text-left p-3 text-sm text-blue-700 hover:bg-blue-100/50 rounded-lg transition-colors"
                      >
                        Can you describe a challenging project you've worked on and how you handled it?
                      </button>
                      <button
                        onClick={() => setNewQuestion("How do you approach problem-solving in your work?")}
                        className="w-full text-left p-3 text-sm text-blue-700 hover:bg-blue-100/50 rounded-lg transition-colors"
                      >
                        How do you approach problem-solving in your work?
                      </button>
                      <button
                        onClick={() => setNewQuestion("What are your career goals and how does this position align with them?")}
                        className="w-full text-left p-3 text-sm text-blue-700 hover:bg-blue-100/50 rounded-lg transition-colors"
                      >
                        What are your career goals and how does this position align with them?
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AI Interview Style
                    </label>
                    <select
                      name="aiStyle"
                      value={formData.aiStyle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="conversational">Conversational</option>
                      <option value="structured">Structured</option>
                      <option value="technical">Technical</option>
                      <option value="behavioral">Behavioral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interview Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AI Personality
                    </label>
                    <select
                      name="aiPersonality"
                      value={formData.aiPersonality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="professional">Professional</option>
                      <option value="friendly">Friendly</option>
                      <option value="technical">Technical Expert</option>
                      <option value="casual">Casual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follow-up Question Depth
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        name="followUpDepth"
                        min="1"
                        max="5"
                        value={formData.followUpDepth}
                        onChange={handleInputChange}
                        className="w-full accent-blue-600"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Basic</span>
                        <span>Moderate</span>
                        <span>In-depth</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Advanced Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Real-time Feedback</p>
                          <p className="text-sm text-gray-500 mt-0.5">Provide immediate feedback during the interview</p>
                        </div>
                        <div className="relative inline-block w-12 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={formData.settings.realTimeFeedback}
                            onChange={() => handleSettingToggle('realTimeFeedback')}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                            style={{
                              transform: formData.settings.realTimeFeedback ? 'translateX(100%)' : 'translateX(0)',
                              borderColor: formData.settings.realTimeFeedback ? '#2563eb' : '#d1d5db'
                            }}
                          />
                          <label
                            className={`toggle-label block h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                              formData.settings.realTimeFeedback ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          ></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Adaptive Questioning</p>
                          <p className="text-sm text-gray-500 mt-0.5">Adjust questions based on candidate responses</p>
                        </div>
                        <div className="relative inline-block w-12 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={formData.settings.adaptiveQuestioning}
                            onChange={() => handleSettingToggle('adaptiveQuestioning')}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                            style={{
                              transform: formData.settings.adaptiveQuestioning ? 'translateX(100%)' : 'translateX(0)',
                              borderColor: formData.settings.adaptiveQuestioning ? '#2563eb' : '#d1d5db'
                            }}
                          />
                          <label
                            className={`toggle-label block h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                              formData.settings.adaptiveQuestioning ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          ></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Sentiment Analysis</p>
                          <p className="text-sm text-gray-500 mt-0.5">Analyze candidate's emotional responses</p>
                        </div>
                        <div className="relative inline-block w-12 align-middle select-none">
                          <input
                            type="checkbox"
                            checked={formData.settings.sentimentAnalysis}
                            onChange={() => handleSettingToggle('sentimentAnalysis')}
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                            style={{
                              transform: formData.settings.sentimentAnalysis ? 'translateX(100%)' : 'translateX(0)',
                              borderColor: formData.settings.sentimentAnalysis ? '#2563eb' : '#d1d5db'
                            }}
                          />
                          <label
                            className={`toggle-label block h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                              formData.settings.sentimentAnalysis ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Progress */}
        <div className="p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                <span className="text-sm text-gray-600">Step {step} of 4</span>
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  step === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
                disabled={step === 1}
              >
                Previous
              </button>
              <button
                onClick={step === 4 ? handleCreateInterview : () => setStep(Math.min(4, step + 1))}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {step === 4 ? 'Create Interview' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInterview; 