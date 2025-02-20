import React, { useState, FormEvent } from 'react';
import {
  Play,
  ChevronDown,
  ChevronUp,
  Copy,
  Mail,
  Lightbulb,
  Video,
  HelpCircle,
  MessageSquare,
  Loader,
  CheckCircle,
  Volume2,
  Maximize,
  X
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Input from '../components/common/Input';

const TUTORIALS = [
  {
    id: 1,
    title: 'Getting Started with CleanAgent',
    duration: '3:45',
    thumbnail: '/tutorials/getting-started.jpg',
    videoUrl: 'https://www.youtube.com/embed/...'
  },
  {
    id: 2,
    title: 'Setting Up Your First Workflow',
    duration: '5:20',
    thumbnail: '/tutorials/workflows.jpg',
    videoUrl: 'https://www.youtube.com/embed/...'
  },
  {
    id: 3,
    title: 'Advanced Automation Tips',
    duration: '4:15',
    thumbnail: '/tutorials/automation.jpg',
    videoUrl: 'https://www.youtube.com/embed/...'
  },
  {
    id: 4,
    title: 'Integrating with Other Tools',
    duration: '6:30',
    thumbnail: '/tutorials/integrations.jpg',
    videoUrl: 'https://www.youtube.com/embed/...'
  }
];

const FAQS = [
  {
    question: 'How do I get started with CleanAgent?',
    answer: 'Getting started is easy! First, connect your primary tools through our Integrations page. Then, visit the Launchpad to create your first workflow. Our AI agents will guide you through the process step by step.'
  },
  {
    question: 'What integrations are currently supported?',
    answer: 'We currently support major platforms including Salesforce, HubSpot, Slack, Microsoft Teams, Google Workspace, Zoom, Asana, and Zendesk. We're constantly adding new integrations based on user requests.'
  },
  {
    question: 'How secure is my data?',
    answer: 'Security is our top priority. We use industry-standard encryption, regular security audits, and comply with major data protection regulations. Your data is encrypted both in transit and at rest.'
  },
  {
    question: 'Can I customize the AI agents?',
    answer: 'Yes! Each AI agent can be customized to match your specific needs. Visit the agent's settings page to adjust parameters, workflow rules, and communication style.'
  }
];

interface FeatureRequest {
  title: string;
  description: string;
}

const VideoTutorial = ({ tutorial, onPlay }: { tutorial: typeof TUTORIALS[0], onPlay: (id: number) => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group relative cursor-pointer" onClick={() => onPlay(tutorial.id)}>
      <div className="aspect-video relative rounded-lg overflow-hidden bg-gray-100">
        <img 
          src={tutorial.thumbnail} 
          alt={tutorial.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-gray-900 ml-1" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs rounded">
          {tutorial.duration}
        </span>
      </div>
      <h3 className="mt-3 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
        {tutorial.title}
      </h3>
    </div>
  );
};

const VideoPlayer = ({ 
  video, 
  onClose 
}: { 
  video: typeof TUTORIALS[0], 
  onClose: () => void 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleFullscreen = () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      if (!document.fullscreenElement) {
        iframe.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold">{video.title}</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="hover:bg-gray-100"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreen}
              className="hover:bg-gray-100"
            >
              <Maximize className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="aspect-video relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          )}
          <iframe
            src={`${video.videoUrl}${isMuted ? '&mute=1' : ''}`}
            className="w-full h-full"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ faq, isOpen, onToggle }: { faq: typeof FAQS[0], isOpen: boolean, onToggle: () => void }) => (
  <div className="border-b border-gray-200 last:border-0">
    <button
      className="w-full py-4 flex justify-between items-center text-left"
      onClick={onToggle}
    >
      <span className="font-medium text-gray-900">{faq.question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
    </button>
    {isOpen && (
      <div className="pb-4 text-gray-600">
        {faq.answer}
      </div>
    )}
  </div>
);

export default function HelpPage() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<FeatureRequest>>({});
  const [featureRequest, setFeatureRequest] = useState<FeatureRequest>({
    title: '',
    description: ''
  });
  const supportEmail = 'support@cleanagent.ai';

  const validateForm = (): boolean => {
    const errors: Partial<FeatureRequest> = {};
    if (!featureRequest.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!featureRequest.description.trim()) {
      errors.description = 'Description is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFeatureRequest({ title: '', description: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting feature request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(supportEmail);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy email:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
        <p className="text-gray-500 mt-1">Get help with CleanAgent</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <Video className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Video Tutorials</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TUTORIALS.map(tutorial => (
              <VideoTutorial
                key={tutorial.id}
                tutorial={tutorial}
                onPlay={setActiveVideo}
              />
            ))}
          </div>
          {activeVideo && (
            <VideoPlayer
              video={TUTORIALS.find(t => t.id === activeVideo)!}
              onClose={() => setActiveVideo(null)}
            />
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y">
            {FAQS.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-6 h-6 text-amber-600" />
            <h2 className="text-xl font-semibold">Request a Feature</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Have an idea for improving CleanAgent? We'd love to hear it!
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Feature title"
                className={`w-full ${formErrors.title ? 'border-red-500' : ''}`}
                value={featureRequest.title}
                onChange={(e) => setFeatureRequest(prev => ({
                  ...prev,
                  title: e.target.value
                }))}
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>
            <div>
              <textarea
                className={`w-full h-32 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  formErrors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your feature request..."
                value={featureRequest.description}
                onChange={(e) => setFeatureRequest(prev => ({
                  ...prev,
                  description: e.target.value
                }))}
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full relative" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : submitSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submitted!
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-semibold">Contact Support</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Need help? Our support team is here for you.
          </p>
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Mail className="w-5 h-5 text-gray-500" />
            <span className="text-gray-900 font-medium">{supportEmail}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={handleCopyEmail}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 