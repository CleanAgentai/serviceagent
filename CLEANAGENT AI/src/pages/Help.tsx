import React, { useState } from 'react';
import { 
  Search, Mail, Copy, ChevronDown, ChevronUp, 
  PlayCircle, Plus, Clock, Eye, X
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  priority: number;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  views: number;
  embedUrl?: string;
}

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState<string | null>(null);
  const [showFeatureForm, setShowFeatureForm] = useState(false);
  const [featureRequest, setFeatureRequest] = useState({ title: '', description: '' });
  const [emailCopied, setEmailCopied] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [thumbnailError, setThumbnailError] = useState<Record<string, boolean>>({});

  // Sample data - prioritized FAQs
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I get started with Clean Agent?',
      answer: 'To get started, simply log in to your account and follow the onboarding wizard. You will be guided through setting up your workspace and connecting with your first AI agent.',
      priority: 1
    },
    {
      id: '2',
      question: 'What types of tasks can the AI agents handle?',
      answer: 'Our AI agents can handle a wide range of tasks including sales outreach, marketing campaign management, hiring process automation, and operational workflow optimization.',
      priority: 2
    },
    {
      id: '3',
      question: 'How secure is my data?',
      answer: 'We take security seriously. All data is encrypted both in transit and at rest, and we comply with industry-standard security protocols.',
      priority: 3
    },
    {
      id: '4',
      question: 'How do I connect with different AI agents?',
      answer: 'You can connect with different AI agents (Sales, Marketing, Hiring, Operations) by clicking their respective icons in the chat interface or using the agent buttons throughout the platform.',
      priority: 1
    },
    {
      id: '5',
      question: 'Can I customize the AI agents behavior?',
      answer: 'Yes, you can customize each AI agent through their respective settings pages. This includes communication style, response preferences, and automation rules.',
      priority: 2
    }
  ].sort((a, b) => a.priority - b.priority);

  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Getting Started with Clean Agent',
      description: 'Learn the basics of Clean Agent and how to set up your workspace. This comprehensive guide will walk you through the initial setup process.',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-id-1',
      embedUrl: 'https://www.youtube.com/embed/your-video-id-1?autoplay=1&rel=0',
      thumbnail: '/assets/tutorials/getting-started.svg',
      duration: '3:45',
      views: 1250
    },
    {
      id: '2',
      title: 'Working with AI Agents',
      description: 'Discover how to effectively use our AI agents for different tasks. Learn about agent capabilities, customization, and best practices.',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-id-2',
      embedUrl: 'https://www.youtube.com/embed/your-video-id-2?autoplay=1&rel=0',
      thumbnail: '/assets/tutorials/ai-agents.svg',
      duration: '5:20',
      views: 850
    },
    {
      id: '3',
      title: 'Advanced Automation Features',
      description: 'Master the automation capabilities to streamline your workflow. Learn about triggers, actions, and complex automation scenarios.',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-id-3',
      embedUrl: 'https://www.youtube.com/embed/your-video-id-3?autoplay=1&rel=0',
      thumbnail: '/assets/tutorials/automation.svg',
      duration: '4:15',
      views: 750
    },
    {
      id: '4',
      title: 'Customizing Your AI Agents',
      description: 'Learn how to customize and optimize your AI agents for better results. Explore personality settings, response templates, and more.',
      videoUrl: 'https://www.youtube.com/watch?v=your-video-id-4',
      embedUrl: 'https://www.youtube.com/embed/your-video-id-4?autoplay=1&rel=0',
      thumbnail: '/assets/tutorials/customization.svg',
      duration: '6:30',
      views: 620
    }
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText('support@cleanagent.ai');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleFeatureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your feature request submission logic here
    setShowFeatureForm(false);
    setFeatureRequest({ title: '', description: '' });
  };

  const filteredContent = (query: string) => {
    const searchLower = query.toLowerCase();
    return {
      faqs: faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchLower) || 
        faq.answer.toLowerCase().includes(searchLower)
      ),
      tutorials: tutorials.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchLower) ||
        tutorial.description.toLowerCase().includes(searchLower)
      )
    };
  };

  const { faqs: filteredFaqs, tutorials: filteredTutorials } = filteredContent(searchQuery);

  // Handle thumbnail loading errors
  const handleThumbnailError = (tutorialId: string) => {
    setThumbnailError(prev => ({ ...prev, [tutorialId]: true }));
  };

  // Get placeholder image based on tutorial index
  const getPlaceholderGradient = (index: number) => {
    const gradients = [
      'from-blue-500 to-purple-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-pink-500 to-rose-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Header and Search */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Help Center
        </h1>
        <div className="max-w-2xl mx-auto relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tutorials and FAQs..."
            className="w-full h-12 text-lg pl-10"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Video Tutorials */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Video Tutorials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial, index) => (
            <Card 
              key={tutorial.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => setShowVideoPlayer(tutorial.id)}
            >
              <div className="aspect-video relative">
                {thumbnailError[tutorial.id] ? (
                  <div className={cn(
                    "w-full h-full flex items-center justify-center bg-gradient-to-br",
                    getPlaceholderGradient(index)
                  )}>
                    <PlayCircle className="w-16 h-16 text-white opacity-75" />
                  </div>
                ) : (
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                    onError={() => handleThumbnailError(tutorial.id)}
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {tutorial.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-lg group-hover:text-primary-600 transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {tutorial.description}
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <Eye className="w-4 h-4 mr-1" />
                  {tutorial.views.toLocaleString()} views
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {filteredFaqs.map(faq => (
            <Card key={faq.id} className="overflow-hidden">
              <button
                className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-50"
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
              >
                <h3 className="font-medium">{faq.question}</h3>
                {expandedFAQ === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {expandedFAQ === faq.id && (
                <div className="p-4 pt-0">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Request Features */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Request New Features</h2>
        {!showFeatureForm ? (
          <Card className="p-6 text-center">
            <p className="mb-4">Have an idea for improving Clean Agent? We'd love to hear it!</p>
            <Button onClick={() => setShowFeatureForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Submit Feature Request
            </Button>
          </Card>
        ) : (
          <Card className="p-6">
            <form onSubmit={handleFeatureSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Feature Title</label>
                <Input
                  value={featureRequest.title}
                  onChange={(e) => setFeatureRequest(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a brief title for your feature request"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={featureRequest.description}
                  onChange={(e) => setFeatureRequest(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the feature you'd like to see..."
                  className="w-full h-32 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowFeatureForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </Card>
        )}
      </section>

      {/* Contact Support */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Contact Support</h2>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-primary-500" />
              <span className="font-medium">support@cleanagent.ai</span>
            </div>
            <Button
              variant="outline"
              onClick={copyEmail}
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              {emailCopied ? 'Copied!' : 'Copy Email'}
            </Button>
          </div>
        </Card>
      </section>

      {/* Video Player Modal */}
      {showVideoPlayer && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 md:p-6"
          onClick={() => setShowVideoPlayer(null)}
        >
          <div 
            className="w-full max-w-4xl bg-white rounded-lg overflow-hidden relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideoPlayer(null)}
              className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video relative bg-gray-900">
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                </div>
              )}
              <iframe
                src={tutorials.find(t => t.id === showVideoPlayer)?.embedUrl}
                className={cn("w-full h-full", videoLoading ? 'opacity-0' : 'opacity-100')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => {
                  setTimeout(() => setVideoLoading(false), 500);
                }}
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold mb-2">
                {tutorials.find(t => t.id === showVideoPlayer)?.title}
              </h3>
              <p className="text-sm text-gray-500">
                {tutorials.find(t => t.id === showVideoPlayer)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}