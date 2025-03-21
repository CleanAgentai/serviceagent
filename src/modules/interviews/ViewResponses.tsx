import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Calendar,
  User,
  ArrowUpDown,
  ExternalLink,
  Filter,
  X,
  FileText,
  Star,
  Check,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/app/lib/supabase';

interface Response {
  id: string;
  candidateName: string;
  submissionDate: string;
  email: string;
  phone: string;
  position: string;
  interviewTitle: string;
  interviewId: string;
  status: 'completed' | 'in_progress' | 'pending';
  aiAnalysis?: {
    keyObservations: string;
    strengths: string[];
    weaknesses: string[];
  };
  overallRating?: number;
}

export function ViewResponses() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'interview'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        
        // Try to fetch responses from the database with join to interviews
        const { data, error } = await supabase
          .from('responses')
          .select(`
            id,
            interview_id,
            candidate_name,
            candidate_email,
            candidate_phone,
            status,
            created_at,
            ai_analysis,
            overall_rating,
            interviews(id, title)
          `)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching responses:', error);
          
          // Mock data as fallback
          setResponses([
            {
              id: 'demo-1',
              candidateName: 'John Doe',
              submissionDate: '2024-03-18',
              email: 'john.doe@example.com',
              phone: '+1 (555) 123-4567',
              position: 'Senior Software Engineer',
              interviewTitle: 'Software Engineer Position',
              interviewId: 'int-1',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Strong technical skills and good communication. Shows potential for senior roles.',
                strengths: [
                  'Excellent problem-solving abilities',
                  'Strong communication skills',
                  'Extensive experience with required technologies'
                ],
                weaknesses: [
                  'Limited experience with enterprise architecture',
                  'Could improve on team leadership aspects'
                ]
              },
              overallRating: 8.5
            },
            {
              id: 'demo-2',
              candidateName: 'Jane Smith',
              submissionDate: '2024-03-17',
              email: 'jane.smith@example.com',
              phone: '+1 (555) 987-6543',
              position: 'Product Manager',
              interviewTitle: 'Product Manager Interview',
              interviewId: 'int-2',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Excellent product vision and leadership qualities. Good fit for the role.',
                strengths: [
                  'Strong product strategy background',
                  'Excellent stakeholder management',
                  'Proven track record of successful product launches'
                ],
                weaknesses: [
                  'Could improve technical understanding',
                  'Limited experience in our specific industry'
                ]
              },
              overallRating: 9.0
            },
            {
              id: 'demo-3',
              candidateName: 'Michael Johnson',
              submissionDate: '2024-03-16',
              email: 'michael.johnson@example.com',
              phone: '+1 (555) 456-7890',
              position: 'UX Designer',
              interviewTitle: 'Senior UX Designer Interview',
              interviewId: 'int-3',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Creative approach to user-centered design with a strong portfolio. Demonstrates excellent understanding of design systems.',
                strengths: [
                  'Exceptional portfolio showcasing diverse projects',
                  'Strong understanding of accessibility standards',
                  'Experience with design systems and component libraries'
                ],
                weaknesses: [
                  'Could strengthen knowledge of user research methodologies',
                  'Limited experience with B2B applications'
                ]
              },
              overallRating: 8.7
            },
            {
              id: 'demo-4',
              candidateName: 'Emily Davis',
              submissionDate: '2024-03-15',
              email: 'emily.davis@example.com',
              phone: '+1 (555) 234-5678',
              position: 'Marketing Director',
              interviewTitle: 'Marketing Leadership Position',
              interviewId: 'int-4',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Strategic thinker with a data-driven approach to marketing. Excellent leadership potential.',
                strengths: [
                  'Proven track record of successful marketing campaigns',
                  'Strong analytical skills and data-driven decision making',
                  'Experience with cross-functional team leadership'
                ],
                weaknesses: [
                  'Limited experience with B2B SaaS marketing',
                  'Could strengthen international marketing experience'
                ]
              },
              overallRating: 9.2
            },
            {
              id: 'demo-5',
              candidateName: 'Robert Wilson',
              submissionDate: '2024-03-14',
              email: 'robert.wilson@example.com',
              phone: '+1 (555) 876-5432',
              position: 'Data Scientist',
              interviewTitle: 'Data Science Team Lead',
              interviewId: 'int-5',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Highly analytical with strong statistical background. Excellent understanding of machine learning algorithms.',
                strengths: [
                  'Deep expertise in statistical analysis and modeling',
                  'Experience with leading ML frameworks and tools',
                  'Strong programming skills in Python and R'
                ],
                weaknesses: [
                  'Could improve communication of technical concepts to non-technical stakeholders',
                  'Limited experience with big data technologies'
                ]
              },
              overallRating: 8.9
            },
            {
              id: 'demo-6',
              candidateName: 'Sophia Chen',
              submissionDate: '2024-03-13',
              email: 'sophia.chen@example.com',
              phone: '+1 (555) 321-6789',
              position: 'DevOps Engineer',
              interviewTitle: 'Senior DevOps Position',
              interviewId: 'int-6',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Strong technical background with excellent understanding of CI/CD pipelines and cloud infrastructure.',
                strengths: [
                  'Extensive experience with AWS and Azure cloud platforms',
                  'Strong knowledge of containerization and orchestration',
                  'Experience with infrastructure as code tools'
                ],
                weaknesses: [
                  'Limited experience with GCP',
                  'Could improve security implementation knowledge'
                ]
              },
              overallRating: 8.3
            },
            {
              id: 'demo-7',
              candidateName: 'Daniel Brown',
              submissionDate: '2024-03-12',
              email: 'daniel.brown@example.com',
              phone: '+1 (555) 654-3210',
              position: 'Sales Executive',
              interviewTitle: 'Enterprise Sales Position',
              interviewId: 'int-7',
              status: 'in_progress',
              aiAnalysis: null,
              overallRating: null
            },
            {
              id: 'demo-8',
              candidateName: 'Olivia Martinez',
              submissionDate: '2024-03-11',
              email: 'olivia.martinez@example.com',
              phone: '+1 (555) 789-0123',
              position: 'Customer Success Manager',
              interviewTitle: 'Customer Success Team Lead',
              interviewId: 'int-8',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Excellent communication skills and customer-focused approach. Strong problem-solving abilities.',
                strengths: [
                  'Proven track record of improving customer retention',
                  'Strong empathy and relationship-building skills',
                  'Experience with CRM systems and customer success tools'
                ],
                weaknesses: [
                  'Limited experience with enterprise clients',
                  'Could improve technical product knowledge'
                ]
              },
              overallRating: 8.8
            },
            {
              id: 'demo-9',
              candidateName: 'William Taylor',
              submissionDate: '2024-03-10',
              email: 'william.taylor@example.com',
              phone: '+1 (555) 012-3456',
              position: 'Frontend Developer',
              interviewTitle: 'React Developer Position',
              interviewId: 'int-9',
              status: 'in_progress',
              aiAnalysis: null,
              overallRating: null
            },
            {
              id: 'demo-10',
              candidateName: 'Ava Thompson',
              submissionDate: '2024-03-09',
              email: 'ava.thompson@example.com',
              phone: '+1 (555) 543-2109',
              position: 'Project Manager',
              interviewTitle: 'Technical Project Manager',
              interviewId: 'int-10',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Well-organized with strong stakeholder management skills. Good understanding of agile methodologies.',
                strengths: [
                  'PMP certification with extensive project management experience',
                  'Strong leadership skills and team management',
                  'Experience with various project management tools and methodologies'
                ],
                weaknesses: [
                  'Could improve technical understanding of software development',
                  'Limited experience with hardware projects'
                ]
              },
              overallRating: 7.9
            },
            {
              id: 'demo-11',
              candidateName: 'Ethan Garcia',
              submissionDate: '2024-03-08',
              email: 'ethan.garcia@example.com',
              phone: '+1 (555) 678-9012',
              position: 'Backend Developer',
              interviewTitle: 'Node.js Developer Position',
              interviewId: 'int-11',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Strong technical skills with excellent understanding of backend architecture. Good problem-solving abilities.',
                strengths: [
                  'Deep expertise in Node.js and Express',
                  'Strong database knowledge (SQL and NoSQL)',
                  'Experience with API design and microservices'
                ],
                weaknesses: [
                  'Limited experience with serverless architecture',
                  'Could improve documentation practices'
                ]
              },
              overallRating: 8.2
            },
            {
              id: 'demo-12',
              candidateName: 'Isabella Anderson',
              submissionDate: '2024-03-07',
              email: 'isabella.anderson@example.com',
              phone: '+1 (555) 890-1234',
              position: 'HR Manager',
              interviewTitle: 'HR Director Position',
              interviewId: 'int-12',
              status: 'completed',
              aiAnalysis: {
                keyObservations: 'Strategic approach to HR with focus on employee development. Strong understanding of HR policies and procedures.',
                strengths: [
                  'Extensive experience with talent acquisition and retention',
                  'Strong knowledge of employment law and compliance',
                  'Experience with HRIS implementation and management'
                ],
                weaknesses: [
                  'Limited experience with international HR',
                  'Could improve data analysis skills for HR metrics'
                ]
              },
              overallRating: 8.6
            }
          ]);
        } else if (data && data.length > 0) {
          // Map the database response to our interface
          const formattedResponses = data.map(item => {
            const interview = Array.isArray(item.interviews) ? item.interviews[0] : item.interviews;
            return {
              id: item.id,
              candidateName: item.candidate_name || 'Unknown Candidate',
              submissionDate: new Date(item.created_at).toLocaleDateString(),
              email: item.candidate_email || 'No email provided',
              phone: item.candidate_phone || 'No phone provided',
              position: interview?.title || 'Unknown Position',
              interviewTitle: interview?.title || 'Unknown Interview',
              interviewId: item.interview_id,
              status: item.status || 'completed',
              aiAnalysis: item.ai_analysis ? JSON.parse(item.ai_analysis) : undefined,
              overallRating: item.overall_rating
            };
          });
          
          setResponses(formattedResponses);
        } else {
          setResponses([]);
        }
      } catch (error) {
        console.error('Error fetching responses:', error);
        setResponses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const handleSort = (field: 'date' | 'name' | 'interview') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredResponses = responses
    .filter(response =>
      response.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.interviewTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.submissionDate).getTime() - new Date(b.submissionDate).getTime()
          : new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      } else if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.candidateName.localeCompare(b.candidateName)
          : b.candidateName.localeCompare(a.candidateName);
      } else {
        return sortOrder === 'asc'
          ? a.interviewTitle.localeCompare(b.interviewTitle)
          : b.interviewTitle.localeCompare(a.interviewTitle);
      }
    });

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating / 2);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} / 10
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Interview Responses</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      <Card className="p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by candidate name or interview..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 rounded-lg font-semibold">
          <button
            className="flex items-center gap-2"
            onClick={() => handleSort('name')}
          >
            Candidate
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2"
            onClick={() => handleSort('interview')}
          >
            Interview
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-2"
            onClick={() => handleSort('date')}
          >
            Submission Date
            <ArrowUpDown className="w-4 h-4" />
          </button>
          <div>Contact Info</div>
          <div>Analysis</div>
        </div>

        {filteredResponses.map((response) => (
          <Card key={response.id} className="p-4">
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  {response.candidateName.charAt(0)}
                </div>
                <span>{response.candidateName}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                {response.interviewTitle}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                {response.submissionDate}
              </div>
              <div className="text-sm text-gray-600">
                <div>{response.email}</div>
                <div>{response.phone}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={response.status === 'completed' ? "outline" : "secondary"}
                  onClick={() => setSelectedResponse(response)}
                  className="flex items-center gap-2"
                  disabled={response.status !== 'completed'}
                >
                  {response.status === 'completed' ? (
                    <>
                      <Star className="w-4 h-4" />
                      View AI Analysis
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      In Progress
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredResponses.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No responses found matching your search criteria.
        </div>
      )}

      {/* Candidate Details Modal */}
      {selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">AI Analysis: {selectedResponse.candidateName}</h2>
              <button
                onClick={() => setSelectedResponse(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Candidate Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedResponse.candidateName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Position</p>
                    <p className="font-medium">{selectedResponse.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{selectedResponse.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Submission Date</p>
                    <p className="font-medium">{selectedResponse.submissionDate}</p>
                  </div>
                </div>
              </div>
              
              {selectedResponse.overallRating && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Overall Performance Rating</h3>
                  <Card className="p-4 bg-blue-50">
                    {renderStars(selectedResponse.overallRating)}
                    <p className="mt-2 text-sm text-blue-800">
                      {selectedResponse.overallRating >= 9 ? 'Exceptional candidate highly recommended for the role.' :
                       selectedResponse.overallRating >= 8 ? 'Strong candidate well-suited for the position.' :
                       selectedResponse.overallRating >= 7 ? 'Good candidate with relevant qualifications.' :
                       'Candidate may need additional evaluation.'}
                    </p>
                  </Card>
                </div>
              )}
              
              {selectedResponse.aiAnalysis && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
                  <Card className="p-4 bg-blue-50">
                    <p className="mb-4 text-blue-800">{selectedResponse.aiAnalysis.keyObservations}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">Strengths</h4>
                        <ul className="space-y-1">
                          {selectedResponse.aiAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2 text-blue-800">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">Areas for Improvement</h4>
                        <ul className="space-y-1">
                          {selectedResponse.aiAnalysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2 text-blue-800">
                              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
              
              <div className="pt-4 flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedResponse(null)}
                  className="w-full"
                >
                  Close
                </Button>
                <Button
                  onClick={() => navigate(`/interviews/responses/${selectedResponse.id}`)}
                  className="w-full"
                >
                  Full Response Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 