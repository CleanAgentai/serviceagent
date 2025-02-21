import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
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
    <p>In today's competitive cleaning industry, efficiency is key to success. Artificial Intelligence (AI) is revolutionizing how cleaning businesses operate, offering unprecedented opportunities for automation, optimization, and growth.</p>

    <h2>The Impact of AI on Cleaning Operations</h2>
    <p>AI technology is transforming every aspect of cleaning business operations:</p>
    <ul>
      <li>Automated scheduling and route optimization</li>
      <li>Real-time quality monitoring and feedback</li>
      <li>Predictive maintenance for equipment</li>
      <li>Smart inventory management</li>
    </ul>

    <h2>Implementing AI in Your Business</h2>
    <p>Getting started with AI doesn't have to be complicated. Here's a step-by-step approach:</p>
    <ol>
      <li>Identify key areas for automation</li>
      <li>Choose the right AI tools and platforms</li>
      <li>Train your team on new systems</li>
      <li>Monitor and optimize performance</li>
    </ol>

    <h2>Measuring Success</h2>
    <p>Track these key metrics to measure the impact of AI implementation:</p>
    <ul>
      <li>Time saved on administrative tasks</li>
      <li>Increase in customer satisfaction</li>
      <li>Reduction in operational costs</li>
      <li>Growth in revenue and profitability</li>
    </ul>
  `,
  author: {
    name: 'Porter Stanley',
    avatar: '/porter-avatar.png',
    bio: 'Founder & CEO at CleanAgent.AI. Serial entrepreneur with a passion for AI and business automation.'
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

export default function BlogPost() {
  const { slug } = useParams();

  return (
    <>
      <Helmet>
        <title>{post.title} - CleanAgent Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} - CleanAgent Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://cleanagent.ai/blog/${post.slug}`} />
        <meta property="og:image" content={`https://cleanagent.ai${post.image}`} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:author" content={post.author.name} />
        {post.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - CleanAgent Blog`} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={`https://cleanagent.ai${post.image}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                to="/blog"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Blog
              </Link>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Linkedin className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <header className="mb-12">
            <div className="text-sm text-blue-600 mb-4">{post.category}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {post.readTime}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-white rounded-xl p-8 mb-12">
            <div className="flex items-start space-x-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.author.name}
                </h3>
                <p className="text-gray-600">
                  {post.author.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                      <span className="mx-2">·</span>
                      <Clock className="h-4 w-4 mr-2" />
                      {post.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </div>
    </>
  );
} 