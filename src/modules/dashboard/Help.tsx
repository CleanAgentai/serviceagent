import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, Video, Mail, ExternalLink, ArrowRight, Users } from 'lucide-react';
import { openCalendly } from '@/app/shared/utils/calendly';

interface HelpCategory {
  title: string;
  description: string;
  articles: {
    id: string;
    title: string;
    description: string;
    link: string;
  }[];
}

const helpCategories: HelpCategory[] = [
  {
    title: "Getting Started",
    description: "Learn the basics of CleanAgent.AI and get up and running quickly",
    articles: [
      {
        id: "quickstart",
        title: "Quick Start Guide",
        description: "Get started with CleanAgent.AI in minutes",
        link: "/dashboard/help/articles/quickstart"
      },
      {
        id: "setup",
        title: "Initial Setup Guide",
        description: "Complete guide to configuring your account",
        link: "/dashboard/help/articles/setup"
      },
      {
        id: "dashboard",
        title: "Dashboard Overview",
        description: "Learn how to navigate and use the dashboard",
        link: "/dashboard/help/articles/dashboard"
      }
    ]
  },
  {
    title: "AI Features",
    description: "Detailed guides for each AI-powered feature",
    articles: [
      {
        id: "hiring",
        title: "AI Hiring Assistant",
        description: "Automate your hiring process",
        link: "/dashboard/help/articles/hiring"
      },
      {
        id: "sales",
        title: "AI Sales Agent",
        description: "Streamline your sales operations",
        link: "/dashboard/help/articles/sales"
      },
      {
        id: "marketing",
        title: "AI Marketing Tools",
        description: "Optimize your marketing campaigns",
        link: "/dashboard/help/articles/marketing"
      }
    ]
  },
  {
    title: "Account Management",
    description: "Manage your account settings and preferences",
    articles: [
      {
        id: "billing",
        title: "Billing & Subscriptions",
        description: "Manage your subscription and payments",
        link: "/dashboard/help/articles/billing"
      },
      {
        id: "team",
        title: "Team Management",
        description: "Add and manage team members",
        link: "/dashboard/help/articles/team"
      },
      {
        id: "security",
        title: "Security Settings",
        description: "Keep your account secure",
        link: "/dashboard/help/articles/security"
      }
    ]
  }
];

const popularVideos = [
  {
    title: "Getting Started with CleanAgent.AI",
    duration: "5:32",
    url: "https://www.youtube.com/watch?v=getting-started"
  },
  {
    title: "AI Hiring Assistant Tutorial",
    duration: "8:15",
    url: "https://www.youtube.com/watch?v=hiring-tutorial"
  },
  {
    title: "Advanced Dashboard Features",
    duration: "6:45",
    url: "https://www.youtube.com/watch?v=advanced-features"
  }
];

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleArticleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    window.location.href = link;
  };

  const handleVideoClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  const handleEmailSupport = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:support@cleanagent.ai';
  };

  const handleDocumentationClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('https://docs.cleanagent.ai', '_blank');
  };

  const handleTutorialsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('https://tutorials.cleanagent.ai', '_blank');
  };

  const handleCommunityClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('https://community.cleanagent.ai', '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          How can we help you?
        </h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Help Categories */}
          {helpCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <div className="space-y-4">
                {category.articles.map((article) => (
                  <Link
                    key={article.id}
                    to={article.link}
                    className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{article.title}</h3>
                    <p className="text-gray-600">{article.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Video Tutorials */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Popular Video Tutorials</h2>
            <div className="space-y-4">
              {popularVideos.map((video, index) => (
                <a
                  key={index}
                  href={video.url}
                  onClick={(e) => handleVideoClick(e, video.url)}
                  className="flex items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <Video className="h-8 w-8 text-gray-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{video.title}</h3>
                    <p className="text-gray-600">{video.duration}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-3">
              <a
                href="#"
                onClick={handleDocumentationClick}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Book className="h-5 w-5 mr-2" />
                Documentation
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
              <a
                href="#"
                onClick={handleTutorialsClick}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Video className="h-5 w-5 mr-2" />
                Video Tutorials
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
              <a
                href="#"
                onClick={handleCommunityClick}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <Users className="h-5 w-5 mr-2" />
                Community Forum
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Need More Help?</h2>
            <div className="space-y-4">
              <a
                href="mailto:support@cleanagent.ai"
                onClick={handleEmailSupport}
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Support
              </a>
              <button
                onClick={openCalendly}
                className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90"
              >
                Schedule a Call
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}