import React from 'react';
import { Mail, PlayCircle } from 'lucide-react';

const gettingStartedVideos = [
  {
    id: 1,
    title: "Introduction to CleanAgent.AI",
    embedId: "your-video-id-1",
    description: "Learn the basics of CleanAgent.AI and how it can transform your business operations."
  },
  {
    id: 2,
    title: "Setting Up Your Account",
    embedId: "your-video-id-2",
    description: "A step-by-step guide to configuring your CleanAgent.AI account for optimal performance."
  },
  {
    id: 3,
    title: "Using AI Sales Features",
    embedId: "your-video-id-3",
    description: "Discover how to leverage our AI sales tools to boost your business."
  },
  {
    id: 4,
    title: "Marketing Automation Guide",
    embedId: "your-video-id-4",
    description: "Master the marketing automation features to enhance your campaigns."
  }
];

export default function Help() {
  const handleEmailSupport = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:porter@cleanagent.ai';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to CleanAgent.AI Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with our comprehensive video guides to make the most of CleanAgent.AI's powerful features
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {gettingStartedVideos.map((video) => (
            <div 
              key={video.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{video.title}</h3>
                <p className="text-gray-600 leading-relaxed">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-6">Need Additional Help?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Our support team is ready to assist you with any questions you may have.
            </p>
            <a
              href="mailto:porter@cleanagent.ai"
              onClick={handleEmailSupport}
              className="inline-flex items-center px-8 py-4 border-2 border-white rounded-xl text-lg font-medium text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              <Mail className="h-6 w-6 mr-3" />
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}