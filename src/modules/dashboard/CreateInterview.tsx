import React, { useState } from 'react';
import { Plus, X, Save, ArrowRight, Clock, Video, FileText, List } from 'lucide-react';

type QuestionType = 'text' | 'video' | 'multiple-choice';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  timeLimit?: number;
}

export default function CreateInterview() {
  const [interviewName, setInterviewName] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: '',
    type: 'text',
    text: '',
    options: [],
    timeLimit: 60
  });

  const handleAddQuestion = () => {
    setCurrentQuestion({
      id: Date.now().toString(),
      type: 'text',
      text: '',
      options: [],
      timeLimit: 60
    });
    setShowQuestionModal(true);
  };

  const handleSaveQuestion = () => {
    if (currentQuestion.text.trim() === '') return;

    setQuestions(prev => [...prev, currentQuestion]);
    setShowQuestionModal(false);
    setCurrentQuestion({
      id: '',
      type: 'text',
      text: '',
      options: [],
      timeLimit: 60
    });
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const handleAddOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt)
    }));
  };

  const handleRemoveOption = (index: number) => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index)
    }));
  };

  const handleSaveInterview = async () => {
    try {
      // Integration with Willo API
      const response = await fetch('https://api.willo.video/v1/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.WILLO_API_KEY}`
        },
        body: JSON.stringify({
          name: interviewName,
          description,
          questions: questions.map(q => ({
            type: q.type,
            text: q.text,
            options: q.options,
            timeLimit: q.timeLimit
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create interview');
      }

      // Reset form
      setInterviewName('');
      setDescription('');
      setQuestions([]);
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  const getQuestionTypeIcon = (type: QuestionType) => {
    switch (type) {
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'multiple-choice':
        return <List className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="space-y-6">
          {/* Interview Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interview Name
              </label>
              <input
                type="text"
                value={interviewName}
                onChange={(e) => setInterviewName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter interview name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Enter interview description"
              />
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
              <button
                onClick={handleAddQuestion}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Question
              </button>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="flex flex-col items-center">
                  <Plus className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No questions added</h3>
                  <p className="text-gray-500 mb-4">Get started by adding your first question</p>
                  <button
                    onClick={handleAddQuestion}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="flex items-start justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="font-medium text-gray-900">{question.text}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {getQuestionTypeIcon(question.type)}
                          <span className="ml-1">{question.type}</span>
                        </span>
                        {question.timeLimit && (
                          <span className="flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {question.timeLimit}s
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveQuestion(question.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={handleSaveInterview}
              disabled={!interviewName || questions.length === 0}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Interview
            </button>
          </div>
        </div>
      </div>

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Question</h3>
              <button
                onClick={() => setShowQuestionModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type
                </label>
                <select
                  value={currentQuestion.type}
                  onChange={(e) => setCurrentQuestion(prev => ({
                    ...prev,
                    type: e.target.value as QuestionType,
                    options: e.target.value === 'multiple-choice' ? [''] : []
                  }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="text">Text Response</option>
                  <option value="video">Video Response</option>
                  <option value="multiple-choice">Multiple Choice</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <textarea
                  value={currentQuestion.text}
                  onChange={(e) => setCurrentQuestion(prev => ({
                    ...prev,
                    text: e.target.value
                  }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter your question"
                />
              </div>

              {currentQuestion.type === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Limit (seconds)
                  </label>
                  <input
                    type="number"
                    value={currentQuestion.timeLimit}
                    onChange={(e) => setCurrentQuestion(prev => ({
                      ...prev,
                      timeLimit: parseInt(e.target.value)
                    }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>
              )}

              {currentQuestion.type === 'multiple-choice' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Options</label>
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`Option ${index + 1}`}
                      />
                      <button
                        onClick={() => handleRemoveOption(index)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddOption}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Option
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveQuestion}
                disabled={!currentQuestion.text.trim()}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight className="h-5 w-5 mr-2" />
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 