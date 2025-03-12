import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Tag } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  excerpt: string;
}

// Sample blog post data (replace with real data)
const post: BlogPost = {
  slug: 'maximizing-efficiency-with-ai',
  title: 'Maximizing Efficiency with AI: A Guide for Cleaning Businesses',
  content: `
    <p>Artificial intelligence is revolutionizing the cleaning industry, offering new ways to optimize operations, improve service quality, and increase customer satisfaction. In this comprehensive guide, we'll explore how cleaning businesses can leverage AI to maximize efficiency and drive growth.</p>

    <h2>Understanding AI in the Cleaning Industry</h2>
    <p>AI technology is transforming how cleaning businesses operate, from scheduling and route optimization to quality control and customer communication. Here are some key areas where AI is making a significant impact:</p>
    
    <ul>
      <li>Automated scheduling and dispatch</li>
      <li>Real-time route optimization</li>
      <li>Predictive maintenance</li>
      <li>Quality control and inspection</li>
      <li>Customer communication and feedback</li>
    </ul>

    <h2>Implementing AI in Your Business</h2>
    <p>To successfully implement AI in your cleaning business, follow these steps:</p>

    <ol>
      <li>Assess your current operations and identify areas for improvement</li>
      <li>Research and select appropriate AI solutions</li>
      <li>Train your staff on new technologies</li>
      <li>Monitor and measure results</li>
      <li>Continuously optimize and improve</li>
    </ol>
  `,
  author: {
    name: 'John Smith',
    avatar: '/avatars/john-smith.jpg'
  },
  date: 'February 20, 2025',
  readTime: '5 min read',
  category: 'AI & Automation',
  image: '/blog/ai-efficiency.jpg',
  tags: ['AI', 'Automation', 'Efficiency', 'Business Growth'],
  excerpt: 'Discover how artificial intelligence is revolutionizing the cleaning industry and learn practical steps to implement AI in your business operations.'
};

// Sample related posts (replace with real data)
const relatedPosts = [
  {
    slug: 'ai-hiring-strategies',
    title: 'AI-Powered Hiring Strategies for Cleaning Businesses',
    image: '/blog/hiring.jpg',
    date: 'Feb 18, 2025',
    readTime: '4 min read'
  },
  // Add more related posts
];

export function BlogPost() {
  const { slug } = useParams();

  // Scroll to top on mount and when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Blog post not found</h1>
          <Link to="/blog" className="mt-4 text-blue-600 hover:text-blue-700">
            Return to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - ServiceAgent.ai Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} - ServiceAgent.ai Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://serviceagent.ai/blog/${slug}`} />
        <meta property="og:image" content={`https://serviceagent.ai${post.image}`} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:author" content={post.author.name} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - ServiceAgent.ai Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://serviceagent.ai${post.image}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Back to blog link */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to blog
          </Link>
        </div>

        {/* Article header */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="text-blue-600 mb-2">{post.category}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {post.readTime}
              </div>
            </div>
          </header>

          {/* Featured image */}
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="rounded-xl object-cover"
            />
          </div>

          {/* Article content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="h-4 w-4 text-gray-500" />
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-12 w-12 rounded-full"
              />
              <div className="ml-4">
                <div className="font-medium text-gray-900">{post.author.name}</div>
                <div className="text-gray-500">{post.author.bio}</div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
} 