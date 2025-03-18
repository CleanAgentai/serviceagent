import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Calendar, User, Video, Download } from 'lucide-react';

interface Response {
  id: string;
  candidateName: string;
  submissionDate: string;
  duration: string;
  status: 'completed' | 'in_progress' | 'pending';
  answers: Array<{
    question: string;
    answer: string;
    videoUrl?: string;
  }>;
}

export function ResponseDetails() {
  const { responseId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchResponse = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API data
        setResponse({
          id: responseId || '',
          candidateName: 'John Doe',
          submissionDate: '2024-03-18',
          duration: '15 minutes',
          status: 'completed',
          answers: [
            {
              question: 'Tell us about your experience',
              answer: 'I have 5 years of experience...',
              videoUrl: 'https://example.com/video1'
            },
            // Add more mock answers as needed
          ]
        });
      } catch (error) {
        console.error('Error fetching response:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [responseId]);

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
        <Button onClick={() => navigate('/interviews/responses')}>
          Back to Responses
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/interviews/responses')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Responses
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Interview Response</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            {response.candidateName}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {response.submissionDate}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {response.duration}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {response.answers.map((answer, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-xl font-semibold mb-3">{answer.question}</h3>
            <p className="text-gray-700 mb-4">{answer.answer}</p>
            {answer.videoUrl && (
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <a
                  href={answer.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Video Response
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Button className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Response
        </Button>
      </div>
    </div>
  );
} 